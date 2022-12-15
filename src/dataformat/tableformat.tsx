export const getUniqueKeys = (arr: { [key: string]: any }[], key: string) => {
  return [...new Set(arr.map((d) => d[key as keyof typeof d]))];
};
