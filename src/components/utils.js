// @flow
export const cleanLyric = (lyric: string): string => {
  // Replace special quotes with normal quotes
  let cleaned_lyric = lyric.replace(/\u2018|\u2019/g, "'");
  cleaned_lyric = cleaned_lyric.replace(/\u201C|\u201D/g, '"');
  // Replace special unicode spaces with standard space
  cleaned_lyric = cleaned_lyric.replace(
    /[\u00A0\u1680​\u180e\u2000-\u2009\u200a​\u200b​\u202f\u205f​\u3000]/g,
    " "
  );
  // Replace dashes with space and single hyphen
  cleaned_lyric = cleaned_lyric.replace(/\u2013|\u2014/g, " - ");
  return cleaned_lyric;
};

export const containsQuery = (lyric: string, query: string): number => {
  query = cleanLyric(query.toLowerCase());
  const regex = new RegExp(
    `([\\(\\)\\.\\-?!;:,\\s"]|^)${query}([\\(\\)\\.\\-?!;:,\\s"]|$)`
  );
  return cleanLyric(lyric.toLowerCase()).search(regex);
};

export const isMobile = (): boolean => {
  const mobileRegex = new RegExp(
    `Android|webOS|iPhone|iPad|BlackBerry|Phone|Mobile`
  );
  return navigator.userAgent.search(mobileRegex) >= 0;
};
