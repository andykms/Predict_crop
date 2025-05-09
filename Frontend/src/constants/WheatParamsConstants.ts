export interface IInputRangeSettings {
  max: number,
  min: number,
  step: number,
}

export interface IFileSettings{
  type: string,
  htmlType: string,
}

export interface IWheatParamsSettings {
  temperature: IInputRangeSettings,
  precipitation: IInputRangeSettings,
  humidity: IInputRangeSettings,
  wind: IInputRangeSettings,
  weeds: IInputRangeSettings,
  file: IFileSettings,
}

export const WheatParamsSettings: IWheatParamsSettings = {
  temperature: {
    max: 100,
    min: -100,
    step: 0.01,
  },
  precipitation: {
    max: 50000,
    min: -50000,
    step: 1,
  },
  humidity: {
    step: 0.01,
    max: 100,
    min: 0,
  },
  wind: {
    max: 100,
    min: 0,
    step: 0.01,
  },
  weeds: {
    max: 100,
    min: 0,
    step: 0.01,
  },
  file: {
    type: 'image/',
    htmlType: 'image/*',
  }
}