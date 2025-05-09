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


export class InitialWheatParams implements IInitialWheatParams {
  public temperature = {
    value: '0',
    error: false,
  };
  public precipitation = {
    value: '0',
    error: false,
  };
  public humidity = {
    value: '0',
    error: false,
  };
  public wind = {
    value: "0",
    error: false,
  };
  public weeds = {
    value: "0",
    error: false,
  }
  public file = {
    value: undefined,
    error: false,
  }

  get data() {
    return {
      temperature: this.temperature,
      precipitation: this.precipitation,
      humidity: this.humidity,
      wind: this.wind,
      weeds: this.weeds,
      file: this.file,
    }
  }
}