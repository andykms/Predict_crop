export interface WheatParams {
  temperature: string,
  precipitation: string,
  humidity: string,
  wind: string,
  weeds: string,
  file: File,
}

export interface WheatParamsError {
  temperature: string|undefined,
  precipitation: string|undefined,
  humidity: string|undefined,
  wind: string|undefined,
  weeds: string|undefined,
  file: File|undefined,
}
