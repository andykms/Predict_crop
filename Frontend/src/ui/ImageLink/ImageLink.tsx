import { ReactNode } from "react";
import styles from './ImageLink.module.scss';

export interface ImageLinkProps {
  link: string,
  imageElement: ReactNode|string,
}

export const ImageLink = (props: ImageLinkProps) => {
  const {link, imageElement} = props;
  return (
    <a className={styles.linkContainer} href={link} target="_blank">
      {typeof imageElement === "string" ? 
      <img src={imageElement} alt={"Изображение со ссылкой"} className={styles.linkImage}></img>:
      imageElement}
    </a>
  )
}