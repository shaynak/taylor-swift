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
  // Replace cyrillic + accented Es with normal Es
  cleaned_lyric = cleaned_lyric.replace(/\u0435/g, "e");
  return cleaned_lyric;
};

export const containsQuery = (lyric: string, query: string): number => {
  query = cleanLyric(query.toLowerCase());
  query = query.replace(/\u00e9/g, "e");
  lyric = lyric.replace(/\u00e9/g, "e");
  const regex = new RegExp(
    `([\\(\\)\\.\\-?!;:,\\s\u2026"]|^)${query}([\\(\\)\\.\\-?!;:,\\s\u2026"]|$)`
  );
  return cleanLyric(lyric.toLowerCase()).search(regex);
};

export const queriesFound = (lyric: string, query: string): number => {
  lyric = cleanLyric(lyric);
  query = cleanLyric(query);
  let start: number;
  let found = 0;
  do {
    start = containsQuery(lyric, query);
    if (start === -1) {
      return found;
    }
    found += 1;
    lyric = lyric.substring(start + query.length);
  } while (lyric.length > 0);
  return found;
};

export const isMobile = (): boolean => {
  const mobileRegex = new RegExp(
    `Android|webOS|iPhone|iPad|BlackBerry|Phone|Mobile`
  );
  return navigator.userAgent.search(mobileRegex) >= 0;
};
