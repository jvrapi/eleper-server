export function firstLetterUpper(value: string) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

export function fileNameFormatter(fileName: string) {
  return fileName.replace(/(\d{13})-/g, '');
}
