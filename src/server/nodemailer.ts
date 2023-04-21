import Handlebars from "handlebars";
import nodemailer, { Transporter } from "nodemailer";
import { readFileSync } from "fs";
import path from "path";
import { SendVerificationRequestParams } from "next-auth/providers";
import { User } from "next-auth";
import toast from "react-hot-toast";
import { serverEnv } from "../env/schema.mjs";
import { getCopyrightTextShort } from "../utils";

const emailsTemplateDir = path.resolve(process.cwd(), 'src/components/template/emails');

const getTransporter = () : Transporter => {
  const { EMAIL_SERVER_HOST, EMAIL_SERVER_PORT, EMAIL_SERVER_USER, EMAIL_SERVER_PASSWORD } = serverEnv;

  if(!EMAIL_SERVER_HOST || !EMAIL_SERVER_PORT || !EMAIL_SERVER_USER || !EMAIL_SERVER_PASSWORD)
    throw new Error(`Missing email server configuration parameters.`);

  return nodemailer.createTransport({
    host: EMAIL_SERVER_HOST,
    port: Number(EMAIL_SERVER_PORT),
    auth: {
      user: EMAIL_SERVER_USER,
      pass: EMAIL_SERVER_PASSWORD,
    },
    secure: true,
  });
}

const sendWelcomeEmail = async (message: { user: User }) => {
  const { email } = message.user;
  const { EMAIL_FROM, NEXTAUTH_URL } = serverEnv;
  let toastId;

  try {
    toastId = toast.loading('Loading...');
    if(!email) throw new Error(`User email is missing.`);
    const transporter = getTransporter();
    const emailFile = readFileSync(path.join(emailsTemplateDir, 'welcome.html'), {
      encoding: 'utf8',
    });
    const emailTemplate = Handlebars.compile(emailFile);
    await transporter.sendMail({
      from: `"✨ GPTSmart" ${EMAIL_FROM}`,
      to: email,
      subject: 'Welcome to GPTSmart! 🎉',
      html: emailTemplate({
        base_url: NEXTAUTH_URL,
        support_email: 'moreezgo@gmail.com',
        copyright: getCopyrightTextShort()
      }),
    });
    toast.dismiss(toastId);
  } catch (error) {
    console.log(`❌ Unable to send welcome email to user (${email}). \nError: ${error}`);
    toast.error('Unable to sign in', { id: toastId });
    //save to logger
  }
};

const sendVerificationRequest = async (params: SendVerificationRequestParams) => {
  const { identifier, url } = params;
  const { EMAIL_FROM, NEXTAUTH_URL } = serverEnv;
  let toastId;

  try{
    toastId = toast.loading('Loading...');
    const transporter = getTransporter();

    const emailFile = readFileSync(path.join(emailsTemplateDir, 'confirm-email.html'), {
      encoding: 'utf8',
    });
    const emailTemplate = Handlebars.compile(emailFile);

    await transporter.sendMail({
      from: `"✨ GPTSmart" ${EMAIL_FROM}`,
      to: identifier,
      subject: 'Your sign-in link for GPTSmart',
      html: emailTemplate({
        base_url: NEXTAUTH_URL,
        signin_url: url,
        email: identifier,
        copyright: getCopyrightTextShort()
      }),
    });
    toast.dismiss(toastId);
  } catch (error) {
    console.log(`❌ Unable to send confirm email to user. \nError: ${error}`);
    toast.error('Unable to send confirm email.', { id: toastId });
    //save to logger
  }
};

export {
  sendWelcomeEmail,
  sendVerificationRequest
}
