import { useReducer, useState } from "react";
import { WheatForm } from "./paramsWheatForm/WheatForm";
import { FileLoaderField } from "./FileLoaderField/FileLoaderField";
import { InputWindow } from "./InputWindow/InputWindow";
import { FormErrorReducer,  } from "../reducers/FormReducer";
import { InitialWheatParams } from "../constants/InitialWheatParams";
import { Header } from "./Header/Header";
import { BackgroundImage } from "../ui/BackgroundImage/BackgroundImage";
import { ResultReducer } from "../reducers/ResultReducer";
import { Result } from "./Result/Result";
import { ResultImage } from "./ResultImage/ResultImage";
import { InitialResult } from "../constants/InitialResult";
import { Footer } from "./Footer/Footer";
import { ImageLink } from "../ui/ImageLink/ImageLink";
import { githubLogo } from "./Svg/Svg";
import universityLogo from '../assets/images/RTUMIREALogo.png';
import wheatImage from '../assets/images/wheatfield3.jpg';

export const App = () => {

  const [error, setError] = useState("");
  const [resultInfo, setResultInfo] = useReducer(ResultReducer, InitialResult);

  const resultComponent = <Result 
  isLoaded={resultInfo.isLoad}
  isCame={resultInfo.isCame}
  isError={resultInfo.isError}
  results={resultInfo.result?.info}
  ></Result>;

  const resultImageComponent = <ResultImage
  isLoaded={resultInfo.isLoad}
  isCame={resultInfo.isCame}
  isError={resultInfo.isError}
  imageFile={resultInfo.result?.imageFile}
  ></ResultImage>;

  const onEntrance = ()=>{
    
  };

  const onExit = ()=> {

  };

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
  };

  const onSetFile = (newFile: File) => {
    dispatcher({
      type: "FILE",
      value: newFile,
    })
  };

  const onReset = () => {
    console.log("RESET");
    dispatcher({
      type: "RESET",
    })
    console.log(formErrors);
  };

  const [formErrors, dispatcher] = useReducer(FormErrorReducer,new InitialWheatParams().data);

  const form = <WheatForm 
  onReset={onReset}
  onSubmitForm={onSubmitForm} 
  errors={formErrors}
  error = {error}
  values={formErrors}
  dispatcher={dispatcher}
  >
  </WheatForm>;

  const fileField = <FileLoaderField
    onDragFile={onSetFile}
    fileType={'image/'}
    file={formErrors.file.value}
  >
  </FileLoaderField>;

  const aboutProjectText: string = `Является проектом курсовой работы на тему: "Нейросеть для предсказывания урожайности" студента Исаева А.В. вуза РТУ МИРЭА. Не для коммерческого использования`;

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
      <Footer aboutProjectText={aboutProjectText}>
        <ImageLink link={'https://github.com/andykms/Predict_crop'} imageElement={githubLogo}>
        </ImageLink>
        <ImageLink link={'https://priem.mirea.ru/'} imageElement={universityLogo}>
        </ImageLink>
      </Footer>
      <BackgroundImage imageSrc={wheatImage}>
      </BackgroundImage>
    </>
  )
}