import { use, useState } from "react";
import { Form } from "./Form/Form"
import { WheatForm } from "./paramsWheatForm/WheatForm";
import { FileLoaderField } from "./FileLoaderField/FileLoaderField";
import { InputWindow } from "./InputWindow/InputWindow";
import { WheatParams, WheatParamsError } from "../types/WheatParams";

export const App = () => {

  const [error, setError] = useState("");
  const [file, setFile] = useState<File>();
  const [wheatParams, setParams] = useState<WheatParams>();

  const onSubmitForm = (params: WheatParams)=>{
    setParams(params);
    console.log(params);
  }

  const onNotRightWheatForm = (params?: WheatParamsError) => {
    setError("Неправильно введены данные")
  }

  const onSetFile = (newFile: File) => {
    setFile(newFile);
  }

  const onDeleteFile = () => {
    setFile(undefined);
  }

  const form = <WheatForm 
  onSubmitForm={onSubmitForm} 
  onDeleteFile={onDeleteFile}
  onNotRightParam={onNotRightWheatForm} 
  onSetFile={onSetFile}
  error={error}
  file={file}
  >
  </WheatForm>

  const fileField = <FileLoaderField
    onDragFile={onSetFile}
    fileType={'image/'}
    file={file}
  >
  </FileLoaderField>
  return (
    <InputWindow 
    paramsForm={form}
    imageField={fileField}
    >
    </InputWindow>
  )
}