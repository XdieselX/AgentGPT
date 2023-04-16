import { Configuration, OpenAIApi, ChatCompletionRequestMessageRoleEnum, ChatCompletionRequestMessage, CreateChatCompletionRequest, CreateChatCompletionResponseChoicesInner, CreateCompletionRequest, CreateCompletionResponseChoicesInner, CreateImageRequest, ImagesResponseDataInner } from 'openai';
import { env } from 'process';
//import { Config, LLMModelType } from '../config';


function getOpenAIAPIClient() : OpenAIApi {
    /*const config = Config.getInstance();
    console.log(config.getOpenAIAPIKey())*/
    const configuration = new Configuration({
        apiKey: process.env.OPENAI_API_KEY,    
    });
    return new OpenAIApi(configuration);
}

async function createChatCompletion(/*model: LLMModelType, */messages: { role: string; content: any; }[], temperature: number = 1, max_tokens = 4000) : Promise<CreateChatCompletionResponseChoicesInner[]> {
    //console.log("API Key:"+Config.getInstance().getOpenAIAPIKey())
    const configuration = new Configuration({
        apiKey: process.env.OPENAI_API_KEY,
    });
    
    //console.log("prompt:"+ prompt)
    const openAIClient = new OpenAIApi(configuration);
    const response = await openAIClient.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages,
        //max_tokens,
        //temperature
    } as CreateChatCompletionRequest);
    if(response.statusText.includes("429")){
        throw new Error("OpenAI API rate limit exceeded");
    }

    
    return response.data.choices;
}

async function createCompletion(/*model: LLMModelType = LLMModelType.DAVINCI, */prompt: string = "", temperature: number = 0.5, max_tokens = 4000) : Promise<CreateCompletionResponseChoicesInner[]> {
    //console.log("API Key:"+Config.getInstance().getOpenAIAPIKey())
    const configuration = new Configuration({
        apiKey: process.env.OPENAI_API_KEY,
    });
    
    //console.log("prompt:"+ prompt)
    const openAIClient = new OpenAIApi(configuration);
    const response = await openAIClient.createCompletion({
        model: "text-davinci-003",
        prompt,
        max_tokens: 1500,
        temperature,
        top_p: 1,
        frequency_penalty: 0.2,
        best_of: 3,
    } as CreateCompletionRequest);  
    
    
    if(response.statusText.includes("429")){
        throw new Error("OpenAI API rate limit exceeded");
    }

    //console.log("Choices: "+response.data.choices[0].text)

    return response.data.choices;
}

async function createImage(
    prompt: string, 
    size = "256x256",
    n = 1,
    response_format = "b64_json",
) : Promise<ImagesResponseDataInner[]> {
    try{
        const response = await getOpenAIAPIClient().createImage({
            prompt,
            size,
            response_format,
            n
        } as CreateImageRequest);
        if(response.statusText.includes("400")){
            throw new Error("OpenAI API bad request");
        }
        else if(response.statusText.includes("429")){
            throw new Error("OpenAI API rate limit exceeded");
        }
        return response.data.data;
    }
    catch(error){
        throw new Error("An error occurred: " + error + " - OpenAI API");
    }
}

export { 
    getOpenAIAPIClient, 
    createChatCompletion,
    createCompletion,
    createImage
};