export const GPT_35_TURBO = "gpt-3.5-turbo" as const;
export const GPT_4 = "gpt-4" as const;
export const GPT_35_TURBO_16k = "gpt-3.5-turbo-16k" as const;
export const GPT_4_16k = "gpt-4-16k" as const;
export const DAVINCI = "text-davinci-003" as const;

export const GPT_MODEL_NAMES = [
  GPT_35_TURBO,
  GPT_35_TURBO_16k,
  GPT_4,
  GPT_4_16k,
  DAVINCI
];

export const DEFAULT_MAX_LOOPS_CUSTOM_API_KEY = 100 as const;
export const DEFAULT_MAX_LOOPS_FREE = 4 as const;
export const DEFAULT_MAX_LOOPS_PAID = 16 as const;

export const getCopyrightText = () =>
  `© ${new Date().getFullYear()} GPTSmart, Inc. All rights reserved. Powered by Teizay Dev.`;

export const getCopyrightTextShort = () =>
  `© ${new Date().getFullYear()} GPTSmart, Inc. All rights reserved.`;
