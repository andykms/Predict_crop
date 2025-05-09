import {
	SyntheticEvent,
	forwardRef,
	ForwardedRef,
	ChangeEvent,
	useEffect,
	useRef,
	ReactNode,
} from 'react'
import styles from './FileLoader.module.scss'
import { Button } from '../../ui/Button/Button'

interface FileLoaderProps {
	onChange: (file: File) => void
	onDelete: () => void
	fileType: string
	checkFileType: string
	file: File | undefined
	icon?: ReactNode
	iconDelete?: ReactNode
}

export const FileLoader = (props: FileLoaderProps) => {
	const {
		onChange,
		fileType,
		file,
		checkFileType,
		icon,
		iconDelete,
		onDelete,
	} = props

	const inputRef = useRef<HTMLInputElement>(null)

	useEffect(() => {
		if (inputRef.current) {
			if (file) {
				const dataTransfer = new DataTransfer()
				dataTransfer.items.add(file)
				inputRef.current.files = dataTransfer.files
			} else {
				inputRef.current.value = '' // Очищаем input при отсутствии файла
			}
		}
	}, [file])

	const onSetFile = (event: ChangeEvent) => {
		const files = (event.target as HTMLInputElement).files
		if (files) {
			if (files[0]?.type.startsWith(checkFileType)) {
				onChange(files[0])
			} else if (inputRef.current) {
				inputRef.current.files = null
			}
		}
	}

	const successIcon = (
		<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="24" height="24" viewBox="0 0 24 24">
    <path d="M5.268,10.732c-0.976-0.976-2.559-0.976-3.536,0s-0.976,2.559,0,3.536l4.645,4.645	c1.449,1.449,3.797,1.449,5.246,0L12.536,18L5.268,10.732z" opacity=".35"></path><path d="M22.268,4.732c-0.976-0.976-2.559-0.976-3.536,0L9,14.464L12.536,18l9.732-9.732C23.244,7.291,23.244,5.708,22.268,4.732z"></path>
    </svg>
	)
	return (
		<label className={styles.fileLoaderContainer}>
			<input
				style={{ display: 'none' }}
				ref={inputRef}
				onChange={onSetFile}
				type='file'
				required
				accept={fileType}
			></input>
			<Button
				textClassName={styles.buttonText}
				className={styles.fileLoaderButton}
				onClick={() => inputRef.current?.click()}
				text={file ? file.name : 'Выбрать файл'}
			>
				{file? successIcon : icon}
			</Button>
			{file && (
				<Button
					textClassName={styles.buttonText}
					className={styles.fileDeleteButton}
					onClick={onDelete}
					text={'удалить'}
				>
					{iconDelete && iconDelete}
				</Button>
			)}
		</label>
	)
}
