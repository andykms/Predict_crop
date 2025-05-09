import { SyntheticEvent, forwardRef, ForwardedRef, ChangeEvent, useEffect, useRef, ReactNode} from "react";
import styles from './FileLoader.module.scss';
import { Button } from "../../ui/Button/Button";


interface FileLoaderProps {
  onChange: (file: File) => void;
  fileType: string;
  checkFileType: string;
  file: File|undefined;
  icon?: ReactNode;
}

export const FileLoader = (props: FileLoaderProps)=> {
  const {onChange, fileType, file, checkFileType, icon} = props

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(()=>{
    if (inputRef.current) {
      if (file) {
        const dataTransfer = new DataTransfer();
        dataTransfer.items.add(file);
        inputRef.current.files = dataTransfer.files;
      } else {
        inputRef.current.value = ''; // Очищаем input при отсутствии файла
      }
    }
  }, [file])

  const onSetFile = (event: ChangeEvent) => {
    const files = (event.target as HTMLInputElement).files;
    if(files) {
      if(files[0]?.type.startsWith(checkFileType)) {
        onChange(files[0]);
      } else if(inputRef.current) {
        inputRef.current.files = null;
      }
    }
  }
  return (
    <label className={styles.fileLoaderContainer}>
      <input style = {{display: 'none'}} ref={inputRef} onChange={onSetFile} type="file" required accept={fileType}></input>
      <Button className={styles.fileLoaderButton} onClick={()=>inputRef.current?.click()} text={file? file.name : 'Выбрать файл'}>
        {icon && icon}
      </Button>
    </label>
  )
}