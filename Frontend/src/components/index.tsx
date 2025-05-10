import { useReducer, useState } from "react";
import { Form } from "./Form/Form"
import { WheatForm } from "./paramsWheatForm/WheatForm";
import { FileLoaderField } from "./FileLoaderField/FileLoaderField";
import { InputWindow } from "./InputWindow/InputWindow";
import { WheatParams, WheatParamsError } from "../types/WheatParams";
import { FormErrorReducer, FormErrorValues,  } from "../reducers/FormReducer";
import { InitialWheatParams } from "../constants/InitialWheatParams";
import { Header } from "./Header/Header";
import { BackgroundImage } from "../ui/BackgroundImage/BackgroundImage";
import { ResultReducer } from "../reducers/ResultReducer";
import { Result } from "./Result/Result";
import { ResultImage } from "./ResultImage/ResultImage";
import { InitialResult } from "../constants/InitialResult";
import wheatImage from '../assets/images/wheatfield2.jpg'

export const App = () => {

  const [error, setError] = useState("");
  const [resultInfo, setResultInfo] = useReducer(ResultReducer, InitialResult);

  const resultComponent = <Result 
  isLoaded={resultInfo.isLoad}
  isCame={resultInfo.isCame}
  isError={resultInfo.isError}
  results={resultInfo.result?.info}
  ></Result>

  const resultImageComponent = <ResultImage
  isLoaded={resultInfo.isLoad}
  isCame={resultInfo.isCame}
  isError={resultInfo.isError}
  imageFile={resultInfo.result?.imageFile}
  ></ResultImage>

  const onEntrance = ()=>{
    
  }

  const onExit = ()=> {

  }

  const onSubmitForm = ()=>{
    const isValid = Object.values(formErrors).every((item)=> {
      return Boolean(item.value) && !item.error;
    });
    if(isValid) {
      setError("");
      console.log(formErrors)
    } else {
      setError("Заполните данные*");
    }
  }

  const onSetFile = (newFile: File) => {
    dispatcher({
      type: "FILE",
      value: newFile,
    })
  }

  const onReset = () => {
    console.log("RESET");
    dispatcher({
      type: "RESET",
    })
    console.log(formErrors);
  }

  const [formErrors, dispatcher] = useReducer(FormErrorReducer,new InitialWheatParams().data);

  const form = <WheatForm 
  onReset={onReset}
  onSubmitForm={onSubmitForm} 
  errors={formErrors}
  error = {error}
  values={formErrors}
  dispatcher={dispatcher}
  >
  </WheatForm>

  const fileField = <FileLoaderField
    onDragFile={onSetFile}
    fileType={'image/'}
    file={formErrors.file.value}
  >

  </FileLoaderField>
  return (
    <>
      <Header isAuth={false} linkMainSite={"#0"} onClickEntrance={onEntrance} onClickExit={onExit}>
      </Header>
      <InputWindow 
      paramsForm={form}
      imageField={fileField}
      >
      </InputWindow>
      <InputWindow
        paramsForm={resultComponent}
        imageField={resultImageComponent}
      >
      </InputWindow>
      <BackgroundImage imageSrc={wheatImage}>
      </BackgroundImage>
    </>
  )
}