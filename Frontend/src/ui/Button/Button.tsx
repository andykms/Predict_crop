import clsx from "clsx";
import styles from './Button.module.scss';
import { ReactNode, MouseEvent } from "react";

export interface ButtonProps {
  onClick: ()=> void;
  text: string|undefined;
  className?: string;
  textClassName?: string;
  children?: ReactNode;
}

export const Button = (props: ButtonProps) => {
  const {onClick, text, className, textClassName, children} = props;

  return (
    <button className={clsx(styles.button, className)} onMouseDown={(e: MouseEvent)=>{e.preventDefault(); e.stopPropagation();onClick()}}>
      {children}
      <span className={clsx(styles.buttonText, textClassName)}>{text}</span>
    </button>
  )
}