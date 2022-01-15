export const strip_header = (data: string): string => {
  if (data.startsWith("HC1:")) {
    data = data.substring(4);
  }

  return data;
};
