import styles from './FileLoaderField.module.scss';
import { DragEvent } from 'react';
import { useRef } from 'react';
import { isValidDatatransferItem } from '../../utils/utils';

export interface FileLoaderFieldProps {
  onDragFile: (file: File)=>void;
  fileType: string;
  file: File|undefined;
}

export const FileLoaderField = (props: FileLoaderFieldProps) => {
  const {onDragFile, fileType, file} = props


  const fileLoaderFieldRef = useRef<HTMLDivElement>(null);

  
  const dropHandler = (event: DragEvent) => {
    //Файл положили в дроп зону
    event.preventDefault();
    if(event.dataTransfer.items) {
      const item = event.dataTransfer.items[0];
      if(isValidDatatransferItem(item, fileType)) {
        const file = item.getAsFile();
        if(file) {
          onDragFile(file);
        }
      }
    }
    fileLoaderFieldRef.current?.classList.remove(styles.fileLoaderFieldContainerOverHandler);
  }

  const dragOverHandler = (event: DragEvent) => {
    //Файл находится в зоне
    event.preventDefault();
    if(event.dataTransfer) {
      const file = event.dataTransfer.items[0]
      if(file.type.startsWith(fileType)) {
        fileLoaderFieldRef.current?.classList.add(styles.fileLoaderFieldContainerOverHandler);
      } 
    }
  }

  const dragLeaveHandler = () => {
    fileLoaderFieldRef.current?.classList.remove(styles.fileLoaderFieldContainerOverHandler);
  }

  return (
    <div
      id={"drop_zone"}
      onDrop={dropHandler}
      onDragOver={dragOverHandler}
      className={styles.fileLoaderFieldContainer}
      ref={fileLoaderFieldRef}
      onDragLeave={dragLeaveHandler}
    >
      {file?<img alt={"Ваше изображение"} className={styles.currentFile} src={URL.createObjectURL(file)}/> : <></>}
      <span className={styles.fileLoaderHint}>{file?'':'Перенесите сюда файл'}</span>
    </div>
  )
}