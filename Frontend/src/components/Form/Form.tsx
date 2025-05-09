import {ReactNode, MouseEvent, useRef, useEffect } from "react"
import { Input } from "../../ui/Input/Input";
import { FileLoader } from "../FileLoader/FileLoader";
import styles from './form.module.scss';
import { CssModule } from "mini-css-extract-plugin";
import { Button } from "../../ui/Button/Button";

interface FormProps {
  onSubmitForm: ()=>void,
  children: ReactNode,
  error: string;
}

export const Form = (props: FormProps) => {
  const {onSubmitForm, children, error} = props;

  const onClickSubmitButton = () =>{
    onSubmitForm();
  }

  return (
    <div className={styles.formContainer}>
      {children}
      <Button className={styles.buttonSubmit} onClick={onClickSubmitButton} text={'Отправить'}>
      </Button>
      <span>{error}</span>
    </div>
  )
}