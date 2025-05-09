export interface formErrorValues {
  temperature: string|undefined,
  precipitation: string|undefined,
  humidity: string|undefined,
  wind: string|undefined,
  weeds: string|undefined,
  file: File|undefined,
}

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
  value: string,
}

const isValidPrecentValue = (value: string)=> {
  const valueNum = Number.parseFloat(value);
  if(!isNaN(valueNum)) {
    return valueNum >= 0 && valueNum <= 100;
  } 
  return false;
}

const isValidNumberValue = (value: string, max: number, min: number)=> {
  const valueNum = Number.parseFloat(value);
  if(!isNaN(valueNum)) {
    return valueNum >= min && valueNum <= max;
  }
  return false;
}

export const FormErrorReducer = (formValues: formErrorValues, action: FormActions) => {
  switch(action.type) {
    case "TEMPERATURE":
      const newValues = {...formValues};
      break;
    case "PRECIPITATION":
      break;
    case "HUMIDITY":
      break;
    case "WIND":
      break;
    case "WEEDS":
      break;
    case "FILE":
      break;
  }
}