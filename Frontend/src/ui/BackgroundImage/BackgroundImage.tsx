import styles from './BackgroundImage.module.scss';



export interface BackgroundImageProps {
  imageSrc: string,
}

export const BackgroundImage = (props: BackgroundImageProps) => {
  const {imageSrc} = props;
  return (
    <div className={styles.img} style={{backgroundImage: `url(${imageSrc})`}}>
    </div>
  )
}