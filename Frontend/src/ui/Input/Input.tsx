import { ChangeEvent, forwardRef, use, useState } from "react";
import style from './Input.module.scss';
import { ReactNode, useEffect, useRef } from "react";
import clsx from "clsx";

export interface inputProps {
  name: string;
  inputValue: string;
  step: number;
  max: number;
  min: number;
  onChange: (event: ChangeEvent)=>void;
  error: boolean;
}

export const Input = (props: inputProps) => {
  const {inputValue, name, onChange, step, max, min, error} = props
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <label className={clsx(style.inputContainer)}>
      {name ? <span>{name}</span> : ""}
      <input onChange={onChange} ref={inputRef} className={clsx(style.input)} value={inputValue} required type={"range"} step={step} max={max} min={min}></input>
      <input onChange={onChange} className={style.inputValue} required value={inputValue}/>
      <span className={style.inputError}>{error && "Введите корректное значение*"}</span>
    </label>
  )
}