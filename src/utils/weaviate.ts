/*import weaviate, { WeaviateClient } from "weaviate-ts-client";
import { env } from "../env/server.mjs";
import { v4 as uuidv4 } from 'uuid';
import { getEmbedding } from "./embeddings";
import { OpenAIEmbeddings } from "langchain/embeddings";
import { OpenAIApi } from "openai";*/

export type WeavieSettings = {
  cluster_scheme: string;
  cluster_host: string;
  token: string;
  openAIKey: string;
}

export type WeaviateClass = {
  name: string;
  description?: string;
  properties?:{
    name: string;
    description: string;
    dataType: string[];
    indexInverted: boolean;
    indexFullText: boolean;
    indexVector: boolean;
  }[];
  vectorizer: string;
}

/*const getWeaviateClientSettings = (): WeavieSettings => {
  return {
    cluster_scheme: env.WEIVIATE_CLUSTER_SCHEME,
    cluster_host: env.WEIVIATE_CLUSTER_URL,
    token: env.WEIVIATE_CLUSTER_TOKEN,
    openAIKey: env.OPENAI_API_KEY,
  }
}

const getWeaviateClient = () : WeaviateClient => {
  const settings : WeavieSettings = getWeaviateClientSettings();
  return weaviate.client({
    scheme: settings.cluster_scheme,
    host: settings.cluster_host,
    headers: {
      "Authorization": `Bearer ${settings.token}`,
      'X-OpenAI-Api-Key': settings.openAIKey,
    }
  });
}

const testConnection = async () : Promise<Boolean> => {
  try{
    const client = getWeaviateClient();
    return await client.schema.getter()
      .do().then((res: any) => {
        return true;
      }).catch((err: any) => {
        return false;
      });
  } catch (e) {
    return false;
  }
}

const createClass = async (classObj : WeaviateClass): Promise<Boolean> => {
  try{
    const client : WeaviateClient = getWeaviateClient();
    return await client.schema.classCreator().withClass(classObj).do().then((res: any) => {
      console.log("Class created. Response: ", res);
      return true;
    }).catch((err: any) => {
      console.log("Class creation failed. Error: ", err);
      return false;
    });
  } catch (e) {
    return false;
  }
}

interface inputObj {
  input: string;
  result?: string;
}

const insertObject = async (className : string, inputObj: inputObj, model?: OpenAIApi): Promise<Boolean> => {
  try{
    const client : WeaviateClient = getWeaviateClient();

    if(model != undefined){
      const vector = (await getEmbedding(model, inputObj.input));
      if(vector != undefined){
        const id = uuidv4();
        const object = {
          "input": inputObj.input,
          "result": inputObj.result,
        }
        return client.data.creator()
          .withClassName(className)
          .withId(id)
          .withProperties(object)
          .withVector(vector)
          .do().then((res: any) => {
            console.log("Object created. Response: ", res);
            return true;
          }).catch((err: any) => {
            console.log("Object creation failed. Error: ", err);
            return false;
          });
      }
    }

    let batcher = client.batch.objectsBatcher();
    batcher = batcher.withObject({
      class: className,
      properties: {
        input: inputObj.input,
        result: inputObj.result,
      },
    });
    return await batcher.do().then((res: any) => {
      console.log("Object created. Response: ", res);
      return true;
    }).catch((err: any) => {
      console.log("Object creation failed. Error: ", err);
      return false;
    });
  }
  catch (e) {
    return false;
  }
}

export {
  getWeaviateClientSettings,
  getWeaviateClient,
  testConnection,
  createClass,
}
*/
