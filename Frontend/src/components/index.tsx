import { useReducer, useState } from "react";
import { Form } from "./Form/Form"
import { WheatForm } from "./paramsWheatForm/WheatForm";
import { FileLoaderField } from "./FileLoaderField/FileLoaderField";
import { InputWindow } from "./InputWindow/InputWindow";
import { WheatParams, WheatParamsError } from "../types/WheatParams";
import { FormErrorReducer, FormErrorValues,  } from "../reducers/FormErrorReducer";
import { InitialWheatParams } from "../constants/InitialWheatParams";

export const App = () => {

  const [error, setError] = useState("");

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

  const [formErrors, dispatcher] = useReducer(FormErrorReducer, InitialWheatParams);

  const form = <WheatForm 
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
    <InputWindow 
    paramsForm={form}
    imageField={fileField}
    >
    </InputWindow>
  )
}