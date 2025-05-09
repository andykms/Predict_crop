export function isValidFile(file: File, requiredType: string) {
  return file.type.startsWith(requiredType);
}

export function isValidDatatransferItem(item: DataTransferItem, requiredType: string) {
  return item.kind==="file" && item.type.startsWith(requiredType);
}