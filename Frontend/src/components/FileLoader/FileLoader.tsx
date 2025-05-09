import { SyntheticEvent, forwardRef, ForwardedRef, ChangeEvent, useEffect, useRef} from "react";
import styles from './FileLoader.module.scss';
import { Button } from "../../ui/Button/Button";


interface FileLoaderProps {
  onChange: (file: File) => void;
  fileType: string;
  checkFileType: string;
  file: File|undefined;
}

export const FileLoader = (props: FileLoaderProps)=> {
  const {onChange, fileType, file, checkFileType} = props

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
        <svg id="svg" fill="#000000" stroke="#000000" width="25px" height="25px" version="1.1" viewBox="144 144 512 512" xmlns="http://www.w3.org/2000/svg">
          <g id="IconSvg_bgCarrier" stroke-width="0"></g>
            <g id="IconSvg_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" stroke="#CCCCCC"></g>
            <g id="IconSvg_iconCarrier">
              <g xmlns="http://www.w3.org/2000/svg">
          <path d="m573.18 179.58h-346.37c-12.523 0-24.539 4.9766-33.398 13.832-8.8555 8.8594-13.832 20.875-13.832 33.398v346.37c0 12.527 4.9766 24.539 13.832 33.398 8.8594 8.8555 20.875 13.832 33.398 13.832h346.37c12.527 0 24.539-4.9766 33.398-13.832 8.8555-8.8594 13.832-20.871 13.832-33.398v-346.37c0-12.523-4.9766-24.539-13.832-33.398-8.8594-8.8555-20.871-13.832-33.398-13.832zm-346.37 31.488h346.37c4.1758 0 8.1797 1.6602 11.133 4.6094 2.9531 2.9531 4.6094 6.957 4.6094 11.133v261.13l-62.473-62.473c-8.4922-8.457-19.883-13.375-31.859-13.762-11.98-0.39063-23.664 3.7812-32.691 11.668l-44.082 38.668-64.203-55.027c-9.0586-7.6992-20.676-11.719-32.555-11.258-11.875 0.45703-23.148 5.3555-31.586 13.73l-78.406 78.453v-261.13c0-4.1758 1.6602-8.1797 4.6094-11.133 2.9531-2.9492 6.957-4.6094 11.133-4.6094zm346.37 377.86h-346.37c-4.1758 0-8.1797-1.6562-11.133-4.6094-2.9492-2.9531-4.6094-6.957-4.6094-11.133v-40.715l100.76-100.76c2.8047-2.8086 6.5625-4.4531 10.527-4.6055 3.9648-0.15625 7.8398 1.1914 10.852 3.7695l124.82 107.06v0.003906c3.1406 2.9023 7.332 4.4023 11.602 4.1523 4.2734-0.25 8.2578-2.2266 11.039-5.4766 2.7852-3.25 4.125-7.4922 3.7148-11.75-0.41016-4.2617-2.5352-8.168-5.8867-10.828l-36.449-31.25 40.652-35.707c3.0039-2.6406 6.8984-4.0391 10.898-3.9102 3.9961 0.12891 7.793 1.7734 10.621 4.6016l84.703 84.703v40.715c0 4.1758-1.6562 8.1797-4.6094 11.133s-6.957 4.6094-11.133 4.6094z"/>
          <path d="m431.49 384.25c16.699 0 32.719-6.6328 44.527-18.445 11.812-11.809 18.445-27.828 18.445-44.531s-6.6328-32.719-18.445-44.531c-11.809-11.809-27.828-18.445-44.527-18.445-16.703 0-32.723 6.6367-44.531 18.445-11.812 11.812-18.445 27.828-18.445 44.531s6.6328 32.723 18.445 44.531c11.809 11.812 27.828 18.445 44.531 18.445zm0-94.465c8.3477 0 16.359 3.3203 22.266 9.2227 5.9023 5.9062 9.2227 13.914 9.2227 22.266 0 8.3516-3.3203 16.359-9.2227 22.266-5.9062 5.9062-13.918 9.2227-22.266 9.2227-8.3516 0-16.363-3.3164-22.266-9.2227-5.9062-5.9062-9.2227-13.914-9.2227-22.266 0-8.3516 3.3164-16.359 9.2227-22.266 5.9023-5.9023 13.914-9.2227 22.266-9.2227z"/>
          </g>
          </g>
        </svg>
      </Button>
    </label>
  )
}