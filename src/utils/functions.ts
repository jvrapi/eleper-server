export function firstLetterUpper(value: string) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

export function fileNameFormatter(fileName: string) {
  return fileName.replace(/(\d{13})-/g, '');
}

export function DateTimeToBrDate(date: string | null) {
  if (date) {
    const dateOnly = date.split('T')[0];
    return dateOnly;
  } else {
    return 'Data não cadastrada';
  }
}

