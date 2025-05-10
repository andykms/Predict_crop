export interface IInitialOneResult {
  name: string,
  value: string,
}

export interface IInitialCurrentResult {
  imageFile: File|undefined,
  info: IInitialOneResult[];
}

export interface IInitialResult {
  isLoad: boolean,
  isError: boolean,
  isCame: boolean,
  result: IInitialCurrentResult|undefined,
}

export const InitialResult: IInitialResult = {
  isLoad: false,
  isError: false,
  isCame: false,
  result: undefined,
}