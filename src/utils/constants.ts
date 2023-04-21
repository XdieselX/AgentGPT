export const GPT_35_TURBO = "gpt-3.5-turbo";
export const GPT_4 = "gpt-4";
export const DAVINCI = "text-davinci-003";

export const GPT_MODEL_NAMES = [GPT_35_TURBO, GPT_4, DAVINCI];

export const DEFAULT_MAX_LOOPS_CUSTOM_API_KEY = 100;
export const DEFAULT_MAX_LOOPS_FREE = 4;
export const DEFAULT_MAX_LOOPS_PAID = 16;

export const getCopyrightText = () =>
  `© ${new Date().getFullYear()} GPT, Inc. All rights reserved. Powered by Teizay Dev.`;
