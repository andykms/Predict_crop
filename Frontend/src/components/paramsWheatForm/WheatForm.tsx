import { ChangeEvent, useState } from "react"
import { Input } from "../../ui/Input/Input";
import { FileLoader } from "../FileLoader/FileLoader";
import styles from './WheatForm.module.scss';
import { Form } from "../Form/Form";
import { imageLoadIcon, imageDeleteIcon, imageResetIcon } from "../Svg/Svg";
import { WheatParamsSettings } from "../../constants/WheatParamsConstants";
import { FormActions, ActionTypes, ActionValues } from "../../reducers/FormReducer";
import { Button } from "../../ui/Button/Button";

interface WheatFormErrorValues {
  temperature: {error: boolean},
  precipitation: {error: boolean},
  humidity: {error: boolean},
  wind: {error: boolean},
  weeds: {error: boolean},
  file: {error: boolean},
}

interface WheatFormValues {
  temperature: {value: string},
  precipitation: {value: string},
  humidity: {value: string},
  wind: {value: string},
  weeds: {value: string},
  file: {value: File|undefined},
}

interface WheatFormProps {
  onSubmitForm: ()=>void;
  onReset: ()=> void;
  dispatcher: (action: FormActions) => void;
  errors: WheatFormErrorValues;
  values: WheatFormValues;
  error: string;
}

interface FormParams {
  temperature: string|undefined,
  precipitation: string|undefined,
  humidity: string|undefined,
  wind: string|undefined,
  weeds: string|undefined,
  file: File|undefined,
}

const createInputCallback = (dispatcher: (action: FormActions)=>void, type: ActionTypes) => {
  return function(event: ChangeEvent) {
    const value = (event.target as HTMLInputElement).value;
    if(type !== "FILE") {
      dispatcher({type, value});
    }
  }
}
export const WheatForm = (props: WheatFormProps) => {
    const {onSubmitForm, errors,error, dispatcher, values, onReset} = props;
    
    const onChangeTemperature = createInputCallback(dispatcher, "TEMPERATURE");
  
    const onChangePrecipitation = createInputCallback(dispatcher, "PRECIPITATION");
  
    const onChangeHumidity = createInputCallback(dispatcher, "HUMIDITY")
  
    const onChangeWind = createInputCallback(dispatcher, "WIND")
  
    const onChangeWeeds = createInputCallback(dispatcher, "WEEDS");
  
    const InputTemperature = <Input
      name={"Температура (в градусах цельсия)"}
      inputValue={values.temperature.value}
      onChange={onChangeTemperature}
      step={WheatParamsSettings.temperature.step}
      max={WheatParamsSettings.temperature.max}
      min={WheatParamsSettings.temperature.min}
      error={errors.temperature.error}
    ></Input>
  
    const InputPrecipitation = <Input
      name={"Осадки (в мм)"}
      inputValue={values.precipitation.value}
      onChange={onChangePrecipitation}
      step={WheatParamsSettings.precipitation.step}
      max={WheatParamsSettings.precipitation.max}
      min={WheatParamsSettings.precipitation.min}
      error={errors.precipitation.error}
    ></Input>
  
    const InputHumidity = <Input
      name={"Влажность (в процентах)"}
      inputValue={values.humidity.value}
      onChange={onChangeHumidity}
      step={WheatParamsSettings.humidity.step}
      max={WheatParamsSettings.humidity.max}
      min={WheatParamsSettings.humidity.min}
      error={errors.humidity.error}
    ></Input>
  
    const InputWind = <Input
      name={"Ветер (в м/с)"}
      inputValue={values.wind.value}
      onChange={onChangeWind}
      max={WheatParamsSettings.wind.max}
      min={WheatParamsSettings.wind.min}
      step={WheatParamsSettings.wind.step}
      error={errors.wind.error}
    ></Input>
  
    const InputWeeds = <Input
      name={"Площадь сорняков (в процентах от площади от всего посева)"}
      inputValue={values.weeds.value}
      onChange={onChangeWeeds}
      max={WheatParamsSettings.weeds.max}
      min={WheatParamsSettings.weeds.min}
      step={WheatParamsSettings.weeds.step}
      error={errors.weeds.error}
    ></Input>
  

    const onSetFile = (file: File|undefined) => {
      dispatcher({
        type: "FILE",
        value: file,
      })
    };

    const onDeleteFile = () => {
      dispatcher({
        type: "FILE",
        value: undefined,
      })
    }
    const fileLoader = <FileLoader
      fileType={WheatParamsSettings.file.htmlType}
      checkFileType={WheatParamsSettings.file.type}
      onChange={onSetFile}
      file={values.file.value}
      icon = {imageLoadIcon}
      onDelete={onDeleteFile}
      iconDelete={imageDeleteIcon}
      error={errors.file.error}
    ></FileLoader>
  
    const onClickButtonSubmit = () => {
      onSubmitForm();
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
        <Button className={styles.buttonReset} onClick={onReset} text={"Сбросить"}>
          {imageResetIcon}
        </Button>
      </Form>
    )
}