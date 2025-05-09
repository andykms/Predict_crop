import { ReactNode } from "react"
import { Form } from "../Form/Form";
import styles from './InputWindow.module.scss';

interface InputWindowProps {
  paramsForm: ReactNode;
  imageField: ReactNode;
}

export const InputWindow = (props: InputWindowProps) => {
  const {paramsForm, imageField} = props;
  
  return (
    <div className={styles.inputWindowContainer}>
      {paramsForm}
      {imageField}
    </div>
  )
}