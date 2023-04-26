import React, { useEffect, useState } from "react";
import {
  FaKey,
  FaMicrochip,
  FaExclamationCircle,
  FaThermometerFull,
  FaSyncAlt,
  FaCoins
} from "react-icons/fa";
import {
  Accordion,
  Button,
  Dialog,
  Dropdown,
  Input,
  ModelSettings,
  LanguageCombobox
} from "../..";
import {
  GPT_4,
  GPT_35_TURBO,
  GPT_MODEL_NAMES,
  DEFAULT_MAX_LOOPS_CUSTOM_API_KEY,
  DEFAULT_MAX_LOOPS_FREE,
  DEFAULT_MAX_LOOPS_PAID,
  isValidKey
} from "../../../utils";
import { useTypeSafeTranslation } from "../../../hooks/useTypeSafeTranslation";
import clsx from "clsx";
import { SettingsDialogProps } from "./index.props";
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

export const SettingsDialog : React.FC<SettingsDialogProps> = (props) => {

  const {
    show,
    close,
    customSettings: [customSettings, setCustomSettings],
  } = props;

  const [settings, setSettings] = React.useState<ModelSettings>({
    ...customSettings
  });
  const t = useTypeSafeTranslation();

  useEffect(() => {
    setSettings(customSettings);
  }, [customSettings, close]);

  const updateSettings = <Key extends keyof ModelSettings>(
    key: Key,
    value: ModelSettings[Key]
  ) => {
    setSettings((prev) => {
      return { ...prev, [key]: value };
    });
  };

  const handleSave = () => {
    if (!isValidKey(settings.customApiKey)) {
      confirmAlert({
        title: t('Invalid API key'),
        message: t("Are you sure you want to continue? If yes, the api key will be emptied."),
        buttons: [
          {
            label: t('Yes'),
            onClick: () => {
              setCustomSettings(settings);
              close();
            }
          },
          {
            label: t('No'),
            onClick: () => {}
          }
        ]
      });
      return;
    }
    setCustomSettings(settings);
    close();
    return;
  };

  const disabled = !settings.customApiKey;

  const advancedSettings = (
    <div className="flex flex-col gap-2">
      <Input
        left={
          <>
            <FaThermometerFull />
            <span className="ml-2">Temperature: </span>
          </>
        }
        value={settings.customTemperature}
        onChange={(e) => updateSettings("customTemperature", parseFloat(e.target.value))}
        type="range"
        toolTipProperties={{
          message: t("Higher temperature will make output more random, while lower temperature will make output more focused and deterministic."),
          disabled: false,
        }}
        attributes={{
          min: 0,
          max: 1,
          step: 0.01,
        }}
      />
      <br />
      <Input
        left={
          <>
            <FaSyncAlt />
            <span className="ml-2">Loop #: </span>
          </>
        }
        value={settings.customMaxLoops}
        disabled={disabled}
        onChange={(e) => updateSettings("customMaxLoops", parseFloat(e.target.value))}
        type="range"
        toolTipProperties={{
          message:
            t("Controls the maximum number of loops that the agent will run (higher value will make more API calls)."),
          disabled: false,
        }}
        attributes={{
          min: 1,
          max: 100,
          step: 1,
        }}
      />
      <br />
      <Input
        left={
          <>
            <FaCoins />
            <span className="ml-2">Max Tokens: </span>
          </>
        }
        value={settings.maxTokens ?? 750}
        onChange={(e) => updateSettings("maxTokens", parseFloat(e.target.value))}
        type="range"
        disabled={disabled}
        toolTipProperties={{
          message:
            "Controls the maximum number of tokens that the agent will generate (higher value will make more API calls).",
          disabled: false,
        }}
        attributes={{
          min: 250,
          max: 1500,
          step: 10,
        }}
      />
    </div>
  );

  return (
    <Dialog
      header={t("Settings ⚙")}
      isShown={show}
      close={close}
      footerButton={<Button onClick={handleSave}>Save</Button>}
      contentClassName="text-md relative flex flex-col gap-2 p-2 leading-relaxed"
    >
      <p>
        {t(`Here you can add your OpenAI API key. This will require you to pay for
        your own OpenAI usage but give you greater access to AgentGPT! You can
        additionally select any model OpenAI offers.`)}
      </p>
      <p
        className={clsx(
          "my-2",
          settings.customModelName === GPT_4 &&
            "rounded-md border-[2px] border-white/10 bg-yellow-300 text-black"
        )}
      >
        <FaExclamationCircle className="inline-block" />
        &nbsp;
        <b>
          {t(`To use the GPT-4 model, you need to also provide the API key for
          GPT-4. You can request for it`)}
          &nbsp;
          <a
            href="https://openai.com/waitlist/gpt-4-api"
            className="text-blue-500"
          >
            {t("here")}
          </a>
          .&nbsp; {t(("ChatGPT Plus subscription will not work"))}
        </b>
      </p>
      <br />
      <div className="text-md relative flex-auto p-2 leading-relaxed">
        <Input
          left={
            <>
              <FaMicrochip />
              <span className="ml-2">Model:</span>
            </>
          }
          type="combobox"
          value={settings.customModelName}
          onChange={() => null}
          setValue={(e) => updateSettings("customModelName", e)}
          attributes={{options : GPT_MODEL_NAMES}}
        />
        <LanguageCombobox />
        <Input
          left={
            <>
              <FaKey />
              <span className="ml-2">Key: </span>
            </>
          }
          placeholder={"sk-..."}
          value={settings.customApiKey}
          onChange={(e) => updateSettings("customApiKey", e.target.value)}
        />
        <br className="md:inline" />
          <Accordion
            child={advancedSettings}
            name="Advanced Settings"
          />
        <br />
        <strong className="mt-10">
          {t(`NOTE: To get a key, sign up for an OpenAI account and visit the
          following`)}{" "}
          <a
            href="https://platform.openai.com/account/api-keys"
            className="text-blue-500"
          >
            {t("link")}.
          </a>{" "}
          {t(`This key is only used in the current browser session.`)}
        </strong>
      </div>
    </Dialog>
  );
}
