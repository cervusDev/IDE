export const sanitizeFileName = (fileName: string): string => {
  return fileName
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^\w.-]/g, '_');
};
