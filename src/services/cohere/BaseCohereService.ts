import axiosLib from "axios"
import config from "../../config"

export interface GenerateBody {
  prompt: string,
  model?: string,
  num_generations?: number;
  max_tokens?: number;
  preset?: number;
  temperature?: number;
  k?: number;
  p?: number;
  frequency_penalty?: number;
  presence_penalty?: number;
  end_sequences?: string[];
  stop_sequences?: string[];
  return_likelihoods?: string;
  logit_bias?:Record<string,number>;
  truncate?: string
}

export interface GenerateResponse {
  generations: {
    text: string
  }[],
  prompt: string
}

export interface ClassifyBody{
  inputs: string[];
  examples: {
    label: string;
    text: string;
  }[];
  model?: 'small'|'large';
  preset?: string;
  truncate?: 'NONE'|'END'|'START'
}

export interface ClassifyResponse{
  classifications:{
    input: string;
    prediction: string;
    confidence: number;
    labels: Record<string,number>;
  }[]
}

export class BaseCohereService {
  static get axios(){
    return axiosLib.create({
      baseURL: config.COHERE.API_URL,
      headers: {
        'Authorization': `Bearer ${config.COHERE.API_KEY}`,
        'Content-Type': 'application/json',
        'Cohere-Version': config.COHERE.API_VERSION,
        'accept': 'application/json'
      }
    })
  }

  static async generate(body:GenerateBody){
    return (await BaseCohereService.axios.post<GenerateResponse>('/generate',{
      ...body
    })).data
  }

  static async classify(body:ClassifyBody){
    return (await BaseCohereService.axios.post<ClassifyResponse>('/classify',{
      ...body
    })).data
  }
}