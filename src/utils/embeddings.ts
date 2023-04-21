import {
  CreateEmbeddingRequestInput,
  CreateEmbeddingRequest,
  CreateEmbeddingResponse,
  OpenAIApi,
  Configuration
} from "openai";
import type { ModelSettings } from "../components";
import { OpenAIEmbeddings } from "langchain/embeddings";


export const createEmbeddingsModel = (settings : ModelSettings) => {
  const configuration : Configuration = new Configuration({
    apiKey: settings.customApiKey === "" ?
      process.env.OPENAI_API_KEY :
      settings.customApiKey,
  });
  return new OpenAIApi(configuration);
}

export const getEmbedding = async (model : OpenAIApi, text : string): Promise<number[] | undefined> => {
  const request : CreateEmbeddingRequest = {
    input: text,
    model: ""
  }
  const response : CreateEmbeddingResponse = (await model.createEmbedding(request)).data;
  if (response.data != undefined && response.data.length > 0){
    const emb = response.data[0]
    if (emb != undefined){
      return emb.embedding;
    }
  }
  return undefined;
}

export const getSimilarity = async (model : OpenAIEmbeddings, text1 : string, text2 : string) => {
  return await model.embedQuery(text1);
}
