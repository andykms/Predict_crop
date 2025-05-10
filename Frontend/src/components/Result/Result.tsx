import styles from './Result.module.scss';
import clsx from 'clsx';
import { useEffect, useState } from 'react';

export interface IResult {
  name: string,
  value: string,
}

export interface ResultProps {
  isLoaded: boolean;
  isError: boolean;
  isCame: boolean;
  results?: IResult[]|undefined,
}


export const Result = (props: ResultProps) => {
  const {results, isLoaded, isCame, isError} = props;

  const resultsContent = results && isCame? results.map((result: IResult)=>{
        return (
          <div className={styles.oneResultContainer}>
            <h3 className={styles.oneResultName}>
              {result.name}
            </h3>
            <p className={styles.oneResultValue}>
              {result.value}
            </p>
          </div>
        )
      }) : null;
  
  const errorContent = isError ? <span className={styles.resultError}>{"Что-то пошло не так, повторите попытку"}</span>: null;
  const loadContent = isLoaded ? <div className={styles.borderLoad}><span className={styles.resultLoaded}></span></div>: null;
  const defaultTextContent = resultsContent || errorContent || loadContent ? null :<div className={styles.borderLoad}><h3 className={styles.resultNotSendText}>{"Нажмите кнопку [отправить], чтобы получить результат"}</h3></div>;
  
  return (
    <article className={styles.resultContainer}>
      {resultsContent && resultsContent}
      {errorContent && errorContent}
      {loadContent && loadContent}
      {defaultTextContent && defaultTextContent}
    </article>
  )
}