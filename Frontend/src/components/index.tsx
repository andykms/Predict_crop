import { use, useState } from "react";
import { Form } from "./Form/Form"
import { WheatForm } from "./paramsWheatForm/WheatForm";
import { FileLoaderField } from "./FileLoaderField/FileLoaderField";
import { InputWindow } from "./InputWindow/InputWindow";

export interface WheatParams {
  temperature: string,
  precipitation: string,
  humidity: string,
  wind: string,
  weeds: string,
  file: File,
}

export const App = () => {

  const [error, setError] = useState("");
  const [file, setFile] = useState<File>();

  const onSubmitForm = (params: WheatParams)=>{
    console.log("Данные успешно отправлены");
  }

  const onNotRightWheatForm = () => {
    setError("Неправильно введены данные")
  }

  const onSetFile = (newFile: File) => {
    setFile(newFile);
  }

  const form = <WheatForm 
  onSubmitForm={onSubmitForm} 
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