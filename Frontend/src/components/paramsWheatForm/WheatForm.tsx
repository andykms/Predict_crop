import { ChangeEvent, useState, useRef } from "react"
import { Input } from "../../ui/Input/Input";
import { FileLoader } from "../FileLoader/FileLoader";
import styles from './WheatForm.module.scss';
import { CssModule } from "mini-css-extract-plugin";
import { Form } from "../Form/Form";
import { WheatParams } from "..";

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
  onNotRightParam: ()=>void;
  onSetFile: (file: File)=>void;
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
    const {onSubmitForm, onNotRightParam, onSetFile, file, error} = props;
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
      step={0.01}
      max={100}
      min={-100}
    ></Input>
  
    const InputPrecipitation = <Input
      name={"Осадки (в мм)"}
      inputValue={precipitation}
      onChange={onChangePrecipitation}
      step={1}
      max={50000}
      min={-50000}
    ></Input>
  
    const InputHumidity = <Input
      name={"Влажность (в процентах)"}
      inputValue={humidity}
      onChange={onChangeHumidity}
      step={0.01}
      max={100}
      min={0}
    ></Input>
  
    const InputWind = <Input
      name={"Ветер (в м/с)"}
      inputValue={wind}
      onChange={onChangeWind}
      max={100}
      min={0}
      step={0.01}
    ></Input>
  
    const InputWeeds = <Input
      name={"Площадь сорняков"}
      inputValue={weeds}
      onChange={onChangeWeeds}
      max={100}
      min={0}
      step={0.01}
    ></Input>
  
    const fileLoader = <FileLoader
      fileType={"image/*"}
      checkFileType={'image/'}
      onChange={onSetFile}
      file={file}
    ></FileLoader>
  
    const onClickButtonSubmit = () => {
      if(!file) return;
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