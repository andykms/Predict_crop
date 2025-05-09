import clsx from "clsx";
import styles from './Button.module.scss';
import { ReactNode } from "react";

export interface ButtonProps {
  onClick: ()=> void;
  text: string|undefined;
  className: string;
  children?: ReactNode;
}

export const Button = (props: ButtonProps) => {
  const {onClick, text, className, children} = props;

  return (
    <button className={clsx(styles.button, className)} onClick={onClick}>
      {children}
      <span className={clsx(styles.buttonText)}>{text}</span>
    </button>
  )
}