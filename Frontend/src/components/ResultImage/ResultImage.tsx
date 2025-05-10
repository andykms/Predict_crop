import { useState } from 'react';
import styles from './ResultImage.module.scss';


export interface ResultImageProps {
  isLoaded: boolean;
  isError: boolean;
  isCame: boolean;
  imageFile?: File|undefined,
}

export const ResultImage = (props: ResultImageProps) => {
  const {imageFile, isCame, isError, isLoaded} = props;

  const imageContent = isCame && imageFile ? <img src={URL.createObjectURL(imageFile)} className={styles.resultImage} alt={"изображение результата"}></img> : null;
  const errorContent = isError ? <span className={styles.resultError}>{"Что-то пошло не так, повторите попытку"}</span>: null;
  const loadContent = isLoaded ? <span className={styles.resultLoaded}></span>: null;
  const defaultTextContent = imageContent || errorContent || loadContent ? null : <h3 className={styles.resultNotSendText}>{"Нажмите кнопку отправить, чтобы получить результат"}</h3>;
  
  return (
    <article className={styles.resultImageContainer}>
      {imageContent && imageContent}
      {errorContent && errorContent}
      {loadContent && loadContent}
      {defaultTextContent && defaultTextContent}
    </article>
  )
}