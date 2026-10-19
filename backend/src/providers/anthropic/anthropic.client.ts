import Anthropic from "@anthropic-ai/sdk";

let client: Anthropic | null = null;

export const get_anthropic_client = () => {
  if (!client) client = new Anthropic();
  return client;
};
