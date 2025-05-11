import { IAPIPredictData, IAPI, IAPIPredictNDVIData,  ResponseNDVI, ResponsePredict} from "../types/API";

export class API implements IAPI {
  private ndviUrl: string;
  private predictionUrl: string;

  constructor(ndviUrl: string, predictionUrl: string) {
    this.ndviUrl = ndviUrl;
    this.predictionUrl =predictionUrl;
  }

  public async getNDVI(image: IAPIPredictNDVIData): Promise<ResponseNDVI|unknown> {
    const formData = new FormData();
    formData.append('image', image.image);
    try{
      const response = await fetch(this.ndviUrl,{
        method: 'POST',
        body: formData
      })
      if(!response.ok) return Promise.reject(response);
      const ndvi = response.headers.get('X-NDVI-Value');
      const imageBlob: File = await response.blob() as File
      return Promise.resolve({
        nvdi: ndvi,
        image: imageBlob,
      })
    } catch(error) {
      return Promise.reject(error);
    }
  }

  public async getPredictionProductivity(params: IAPIPredictData): Promise<ResponsePredict|unknown> {
    try {
      const response = await fetch(this.predictionUrl, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(params),
      })
      if(!response.ok) return Promise.reject(response);
      const data: ResponsePredict = await response.json();
      return data;
    } catch(error) {
      return Promise.reject(error);
    }
  }
}