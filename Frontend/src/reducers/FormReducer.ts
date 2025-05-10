import { WheatParamsSettings, IInputRangeSettings, IFileSettings } from "../constants/WheatParamsConstants";
import { InitialWheatParams } from "../constants/InitialWheatParams";

export interface FormErrorValues {
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

export type ActionTypes = "TEMPERATURE" | "PRECIPITATION" | "HUMIDITY" | "WIND" | "WEEDS" | "FILE";
export type ActionValues = string|File|undefined;

export type FormActions = {
  type: "TEMPERATURE",
  value: string,
} | {
  type: "PRECIPITATION",
  value: string,
} | {
  type: "HUMIDITY",
  value: string,
} | {
  type: "WIND",
  value: string,
} | {
  type: "WEEDS",
  value: string,
} | {
  type: "FILE",
  value: File|undefined,
} | {
  type: "RESET",
}
const pattern = new RegExp(`^[-+]?[0-9]*[.,]?[0-9]+(?:[eE][-+]?[0-9]+)?$`)
const isValidNumberValue = (value: string, max: number, min: number)=> {
  const valueNum = Number.parseFloat(value);
  if(!isNaN(valueNum) && pattern.test(value)) {
    return valueNum >= min && valueNum <= max;
  }
  return false;
}

const isValidFile = (file: File|undefined, type: string) => {
  if(!file) return false;
  if(file.type !== type) return false;
  return true;
}

const setInputRangeError = (formValues: FormErrorValues, address: ActionTypes, settings: IInputRangeSettings, value: string) => {
  const newValues = {...formValues};
  if (!isValidNumberValue(value, settings.max, settings.min)) {
    newValues[address.toLowerCase() as keyof FormErrorValues].error = true;
  } else {
    newValues[address.toLowerCase() as keyof FormErrorValues].error = false;
  }
  return newValues;
}

const setInputValue = (formValues: FormErrorValues, address: ActionTypes, value: string) => {
  formValues[address.toLowerCase() as keyof FormErrorValues].value = value;
  return formValues;
}

const setFileValue = (formValues: FormErrorValues, value: File|undefined) => {
  formValues.file.value = value;
  return formValues;
}

const setInputFileError = (formValues: FormErrorValues, settings: IFileSettings, value: File|undefined) => {
  const newValues = {...formValues};
  if(!isValidFile(value, settings.type)) {
    newValues.file.error = false;
  } else {
    newValues.file.error = true;
  }
  return newValues;
}

export const FormErrorReducer = (formValues: FormErrorValues, action: FormActions) => {
  let newValues: FormErrorValues;
  switch(action.type) {
    case "TEMPERATURE":
      newValues = setInputValue(formValues, "TEMPERATURE", action.value);
      return setInputRangeError(newValues, "TEMPERATURE", WheatParamsSettings.temperature, action.value);
    case "PRECIPITATION":
      newValues = setInputValue(formValues, "PRECIPITATION", action.value);
      return setInputRangeError(newValues, "PRECIPITATION", WheatParamsSettings.precipitation, action.value);
    case "HUMIDITY":
      newValues = setInputValue(formValues, "HUMIDITY", action.value);
      return setInputRangeError(newValues, "HUMIDITY", WheatParamsSettings.humidity, action.value);
    case "WIND":
      newValues = setInputValue(formValues, "WIND", action.value);
      return setInputRangeError(newValues, "WIND", WheatParamsSettings.wind, action.value);
    case "WEEDS":
      newValues = setInputValue(formValues, "WEEDS", action.value);
      return setInputRangeError(newValues, "WEEDS", WheatParamsSettings.weeds, action.value);
    case "FILE":
      newValues = setFileValue(formValues, action.value);
      return setInputFileError(formValues, WheatParamsSettings.file, action.value);
    case "RESET":
      return new InitialWheatParams().data;
    default:
      return formValues;
  }
}