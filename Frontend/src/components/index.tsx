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
import { API } from "../models/API";
import universityLogo from '../assets/images/RTUMIREALogo.png';
import wheatImage from '../assets/images/wheatfield3.jpg';
import { IAPIPredictData, IAPI, ResponsePredict,ResponseNDVI } from "../types/API";
import { FormErrorValues } from "../reducers/FormReducer";
import { ResultAction } from "../reducers/ResultReducer";


async function getNDVI(api: IAPI, imageFile: File) {
  return api.getNDVI({
    image: imageFile
  })
}
async function getPrediction(api: IAPI, form: FormErrorValues, ndvi: number): Promise<ResponsePredict|unknown> {
  return api.getPredictionProductivity({
        temperature: Number.parseFloat(form.temperature.value),
        precipitation: Number.parseFloat(form.precipitation.value),
        humidity: Number.parseFloat(form.humidity.value),
        wind: Number.parseFloat(form.wind.value),
        weeds: Number.parseFloat(form.weeds.value),
        ndvi: ndvi,
  })
}

function dispatchPredictData(dispatcher:(action: ResultAction)=>void, data: ResponsePredict) {
  dispatcher({
          type: "CAME",
          result: {
            imageFile: undefined,
            info: [{
              name: "Урожайность",
              value: (data as ResponsePredict).productivity.toString(),
            }]
          }
  })
}

export const App = () => {

  const apiNdviUrl: string = process.env.API_IMAGE_NDVI;
  const apiPredictUrl: string = process.env.API_PREDICT_PRODUCTIVITY;

  const api = new API(apiNdviUrl, apiPredictUrl);

  const [error, setError] = useState("");
  const [resultInfo, dispatcherResultInfo] = useReducer(ResultReducer, InitialResult);

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

  const sendApi = async()=> {
    try {  
        const ndviData = await getNDVI(api, formErrors.file.value!) as ResponseNDVI;
        const predictionData = await getPrediction(api, formErrors, Number(ndviData.nvdi)) as ResponsePredict;
        console.log(ndviData.nvdi);
        if(ndviData && predictionData) {
          dispatcherResultInfo({
            type: "CAME",
            result: {
              imageFile: ndviData.image? ndviData.image: undefined,
              info: [
                {
                  name: "Урожайность",
                  value: predictionData.productivity.toString(),
                },
                {
                  name: "NDVI",
                  value: ndviData.nvdi? ndviData.nvdi: '',
                }
              ]
            }
          })
        }
    } catch(error) {
        dispatcherResultInfo({
            type: "ERROR",
        })
    }
  }
  const onSubmitForm = ()=>{
    const isValid = Object.values(formErrors).every((item)=> {
      return Boolean(item.value) && !item.error;
    });
    if(isValid) {
      setError("");
      dispatcherResultInfo({
        type: "LOAD",
      })
      sendApi();
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