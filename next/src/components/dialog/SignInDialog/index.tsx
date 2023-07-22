import React from "react";
import {
  Dialog,
  Button
} from "../..";
import { useAuth } from "../../../hooks/useAuth";
import type { SignInDialogProps } from "./index.props";

export const SignInDialog = (props: SignInDialogProps) => {
  const { show, close } = props;
  const { signIn } = useAuth();

  return (
    <Dialog
      header="Sign in 🔐"
      isShown={show}
      close={close}
      footerButton={<Button onClick={() => void signIn()}>Sign in</Button>}
    >
      <p>
        Please{" "}
        <a className="link" onClick={() => void signIn()}>
          sign in
        </a>{" "}
        to deploy an Agent! 🤖
      </p>
    </Dialog>
  );
};
