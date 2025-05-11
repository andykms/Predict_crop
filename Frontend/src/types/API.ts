export interface ResponsePredict{
  productivity: number|string,
}

export interface IAPIPredictData {
  "temperature": number
  "precipitation": number,
  "humidity": number,
  "wind": number,
  "weeds": number,
  "ndvi": number,
}

export interface ResponseNDVI {
  image: File|null,
  nvdi: string|null,
}

export interface IAPIPredictNDVIData {
  image: File,
}

export interface IAPI {
  getNDVI: (image: IAPIPredictNDVIData)=> Promise<ResponseNDVI|unknown>;
  getPredictionProductivity: (data: IAPIPredictData) => Promise<ResponsePredict|unknown>;
}