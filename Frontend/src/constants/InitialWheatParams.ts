export interface IInitialWheatParams {
  temperature: {
    value: string,
    error: boolean,
  },
  precipitation: {
    value: string,
    error: boolean,
  },
  humidity: {
    value: string,
    error: boolean,
  },
  wind: {
    value: string,
    error: boolean,
  },
  weeds: {
    value: string,
    error: boolean,
  },
  file: {
    value: File|undefined,
    error: boolean,
  },
}


export const InitialWheatParams: IInitialWheatParams = {
  temperature: {
    value: '0',
    error: false,
  },
  precipitation: {
    value: '0',
    error: false,
  },
  humidity: {
    value: '0',
    error: false,
  },
  wind: {
    value: "0",
    error: false,
  },
  weeds: {
    value: "0",
    error: false,
  },
  file: {
    value: undefined,
    error: false,
  }
}