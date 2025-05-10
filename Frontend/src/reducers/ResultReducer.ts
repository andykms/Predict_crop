
export interface IOneResult {
  name: string;
  value: string;
}

export interface ResultInfo {
  isLoad: boolean,
  isError: boolean,
  isCame: boolean,
  result: IResult|undefined,
}

export interface IResult {
  imageFile: File|undefined,
  info: IOneResult[];
}

export type ResultAction = {
  type: "LOAD",
} | {
  type: "ERROR",
} | {
  type: "CAME",
  result: IResult,
}

const onLoad = (info: ResultInfo)=> {
  const newInfo = {...info};
  newInfo.isLoad = true;
  newInfo.isCame = false;
  newInfo.isError = false;
  newInfo.result = undefined;
  return newInfo;
}

const onError = (info: ResultInfo)=> {
  const newInfo = {...info};
  newInfo.isLoad = false;
  newInfo.isCame = false;
  newInfo.isError = true;
  newInfo.result = undefined;
  return newInfo; 
}

const onCame = (info: ResultInfo, result: IResult) => {
  const newInfo = {...info};
  newInfo.isLoad = false;
  newInfo.isCame = true;
  newInfo.isError = false;
  newInfo.result = result;
  return newInfo;
}

export const ResultReducer = (value: ResultInfo, action: ResultAction) => {
  switch(action.type) {
    case "LOAD":
      return onLoad(value);
    case "ERROR":
      return onError(value);
    case "CAME": 
      return onCame(value, action.result);
    default:
      return value;
  }
}