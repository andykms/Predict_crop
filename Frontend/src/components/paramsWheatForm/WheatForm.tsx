import { ChangeEvent, useState } from "react"
import { Input } from "../../ui/Input/Input";
import { FileLoader } from "../FileLoader/FileLoader";
import styles from './WheatForm.module.scss';
import { Form } from "../Form/Form";
import { WheatParams, WheatParamsError } from "../../types/WheatParams";
import { imageLoadIcon, imageDeleteIcon } from "../Svg/Svg";
import { WheatParamsSettings } from "../../constants/WheatParamsConstants";

function isRightParam(param: string) {
  return param.length > 0 && !isNaN(Number.parseInt(param));
}

function isRightParamsForm(params: FormParams) {
  const {temperature, precipitation, humidity, wind, weeds, file} = params;
  return (
  isRightParam(temperature) && 
  isRightParam(precipitation) &&
  isRightParam(humidity) &&
  isRightParam(wind) &&
  isRightParam(weeds))
}

interface WheatFormProps {
  onSubmitForm: (params: WheatParams)=>void;
  onNotRightParam: (params?: WheatParamsError)=>void;
  onSetFile: (file: File)=>void;
  onDeleteFile: ()=> void;
  error: string;
  file: File|undefined;
}

interface FormParams {
  temperature: string,
  precipitation: string,
  humidity: string,
  wind: string,
  weeds: string,
  file: File|undefined,
}

export const WheatForm = (props: WheatFormProps) => {
    const {onSubmitForm, onNotRightParam, onSetFile, file, error, onDeleteFile} = props;
    //Температура
    const [temperature, setTemperature] = useState('0');
    //осадки
    const [precipitation, setPrecipitiation] = useState('0');
    //влажность
    const [humidity, setHumidity] = useState('0')
    //ветер
    const [wind, setWind] = useState('0')
    //сорняки 
    const [weeds, setWeeds] = useState('0')
    
    const onChangeTemperature = (event: ChangeEvent) => {
      setTemperature((event.target as HTMLInputElement).value);
    };
  
    const onChangePrecipitation = (event: ChangeEvent) => {
      setPrecipitiation((event.target as HTMLInputElement).value);
    };
  
    const onChangeHumidity = (event: ChangeEvent) => {
      setHumidity((event.target as HTMLInputElement).value);
    };
  
    const onChangeWind = (event: ChangeEvent) => {
      setWind((event.target as HTMLInputElement).value);
    };
  
    const onChangeWeeds = (event: ChangeEvent) => {
      setWeeds((event.target as HTMLInputElement).value);
    };
  
    const InputTemperature = <Input
      name={"Температура (в градусах цельсия)"}
      inputValue={temperature}
      onChange={onChangeTemperature}
      step={WheatParamsSettings.temperature.step}
      max={WheatParamsSettings.temperature.max}
      min={WheatParamsSettings.temperature.min}
    ></Input>
  
    const InputPrecipitation = <Input
      name={"Осадки (в мм)"}
      inputValue={precipitation}
      onChange={onChangePrecipitation}
      step={WheatParamsSettings.precipitation.step}
      max={WheatParamsSettings.precipitation.max}
      min={WheatParamsSettings.precipitation.min}
    ></Input>
  
    const InputHumidity = <Input
      name={"Влажность (в процентах)"}
      inputValue={humidity}
      onChange={onChangeHumidity}
      step={WheatParamsSettings.humidity.step}
      max={WheatParamsSettings.humidity.max}
      min={WheatParamsSettings.humidity.min}
    ></Input>
  
    const InputWind = <Input
      name={"Ветер (в м/с)"}
      inputValue={wind}
      onChange={onChangeWind}
      max={WheatParamsSettings.wind.max}
      min={WheatParamsSettings.wind.min}
      step={WheatParamsSettings.wind.step}
    ></Input>
  
    const InputWeeds = <Input
      name={"Площадь сорняков"}
      inputValue={weeds}
      onChange={onChangeWeeds}
      max={WheatParamsSettings.weeds.max}
      min={WheatParamsSettings.weeds.min}
      step={WheatParamsSettings.weeds.step}
    ></Input>
  
    const fileLoader = <FileLoader
      fileType={WheatParamsSettings.file.htmlType}
      checkFileType={WheatParamsSettings.file.type}
      onChange={onSetFile}
      file={file}
      icon = {imageLoadIcon}
      onDelete={onDeleteFile}
      iconDelete={imageDeleteIcon}
    ></FileLoader>
  
    const onClickButtonSubmit = () => {
      if(!file){ 
        onNotRightParam();
        return;
      }
      const params: WheatParams = {
          temperature, 
          precipitation, 
          humidity, 
          wind, 
          weeds, 
          file
      }
      isRightParamsForm(params) ? onSubmitForm(params) : onNotRightParam();
    }

    return (
      <Form onSubmitForm={onClickButtonSubmit} error={error}>
        <div className={styles.WheatFormContainer}>
          {InputTemperature}
          {InputPrecipitation}
          {InputHumidity}
          {InputWind}
          {InputWeeds} 
          {fileLoader}
        </div>
      </Form>
    )
}