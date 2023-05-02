export const GPT_35_TURBO = "gpt-3.5-turbo" as const;
export const GPT_4 = "gpt-4" as const;
export const DAVINCI = "text-davinci-003" as const;

export const GPT_MODEL_NAMES = [GPT_35_TURBO, GPT_4, DAVINCI];

export const DEFAULT_MAX_LOOPS_CUSTOM_API_KEY = 100 as const;
export const DEFAULT_MAX_LOOPS_FREE = 4 as const;
export const DEFAULT_MAX_LOOPS_PAID = 16 as const;

export const getCopyrightText = () =>
  `© ${new Date().getFullYear()} GPTSmart, Inc. All rights reserved. Powered by Teizay Dev.`;

export const getCopyrightTextShort = () =>
  `© ${new Date().getFullYear()} GPTSmart, Inc. All rights reserved.`;
