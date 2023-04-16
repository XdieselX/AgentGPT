export class Config {
    static _instances: any = {}
    
    static getInstance(): Config {
        const instance = Config._instances[this.constructor.name];
        if (!instance) {
            Config._instances[this.constructor.name] = new this();
        }
        return Config._instances[this.constructor.name];
    }
    
    static setInstance(instance: Config): void {
        Config._instances[this.constructor.name] = instance;
    }

    private openaiAPIKey: string;
    private elevenLabsAPIKey: string;
    private googleAPIKey: string;
    private customSearchEngineID: string;
    private huggingFaceAPIToken: string;
    private newsAPIKey: string;
    
    private smart_llm_model: LLMModelType;
    private smartTokenLimit: number;
    private fast_llm_model: LLMModelType;
    private fastTokenLimit: number;
    
    private continuousMode: boolean;
    private speakMode: boolean;
    private supervisedMode: boolean;
    private debugMode: boolean;
    
    constructor() {
        this.openaiAPIKey = "";
        this.supervisedMode = true;
        this.debugMode = false;
        this.elevenLabsAPIKey = "";
        this.googleAPIKey = "";
        this.customSearchEngineID = "";
        this.huggingFaceAPIToken = "";
        this.newsAPIKey = "";

        this.smart_llm_model = LLMModelType.GPT4;
        this.smartTokenLimit = 8000;
        this.fast_llm_model = LLMModelType.GPT3;
        this.fastTokenLimit = 4000;
        
        this.continuousMode = false;
        this.speakMode = false;
        this.supervisedMode = false;
        this.debugMode = false;

    }
    
    //#region Getters and Setters

    public getOpenAIAPIKey(): string {
        return this.openaiAPIKey;
    }
    
    public setOpenAIKey(key: string): void{
        this.openaiAPIKey = key;
    }

    public isOpenAIAPIKeySet(): boolean {
        return this.openaiAPIKey !== "";
    }
    
    public getElevenLabsKey(): string{
        return this.elevenLabsAPIKey;
    }

    public setElevenLabsKey(key: string): void{
        this.elevenLabsAPIKey = key;
    }
    
    public isElevenLabsKeySet(): boolean {
        return this.elevenLabsAPIKey !== "";
    }
    
    public getGoogleAPIKey(): string{
        return this.googleAPIKey;
    }

    public setGoogleAPIKey(key: string): void{
        this.googleAPIKey = key;
    }

    public isGoogleAPIKeySet(): boolean {
        return this.googleAPIKey !== "";
    }

    public getCustomSearchEngineID(): string{
        return this.customSearchEngineID;
    }
    
    public setCustomSearchEngineID(id: string): void{
        this.customSearchEngineID = id;
    }
    
    public getHuggingFaceAPIToken() {
        return this.huggingFaceAPIToken;
    }

    public setHuggingFaceAPIToken(token: string): void {
        this.huggingFaceAPIToken = token;
    }

    public getNewsAPIKey(): string {
        return this.newsAPIKey;
    }

    public setNewsAPIKey(key: string): void {
        this.newsAPIKey = key;
    }

    public isNewsAPIKeySet(): boolean {
        return this.newsAPIKey !== "";
    }
    
    public getSmartLLMModel(): LLMModelType{
        return this.smart_llm_model;
    }

    public setSmartLLMModel(model: LLMModelType): void{
        this.smart_llm_model = model;
    }

    public getSmartTokenLimit(): number{
        return this.smartTokenLimit;
    }

    public setSmartTokenLimit(limit: number): void{
        this.smartTokenLimit = limit;
    }

    public getFastLLMModel(): LLMModelType{
        return this.fast_llm_model;
    }

    public setFastLLMModel(model: LLMModelType): void{
        this.fast_llm_model = model;
    }

    public getFastTokenLimit(): number{
        return this.fastTokenLimit;
    }

    public setFastTokenLimit(limit: number): void{
        this.fastTokenLimit = limit;
    }

    public isContinuousMode(): boolean{
        return this.continuousMode;
    }

    public setContinuousMode(mode: boolean): void{
        this.continuousMode = mode;
    }
    
    public isSpeakMode(): boolean {
        return this.speakMode;
    }

    public setSpeakMode(mode: boolean): void {
        this.speakMode = mode;
    }

    public isSupervisedMode(): boolean {
        return this.supervisedMode;
    }

    public setSupervisedMode(mode: boolean): void {
        this.supervisedMode = mode;
    }

    public isDebugMode(): boolean {
        return this.debugMode;
    }

    public setDebugMode(mode: boolean): void {
        this.debugMode = mode;
    }

    //#endregion


}

export enum LLMModelType {
    GPT4 = "gpt4",
    GPT3 = "gpt-3.5-turbo",
    DAVINCI = "text-davinci-003",
}