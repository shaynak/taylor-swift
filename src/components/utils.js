// @flow

// From https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions#escaping
const escapeRegExp = (str: string): string => {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); // $& means the whole matched string
};

const cleanLyric = (lyric: string): string => {
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
    `([\\(\\)\\.\\-?!;:,\\s\u2026"]|^)${escapeRegExp(
      query
    )}([\\(\\)\\.\\-?!;:,\\s\u2026"]|$)`
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

export const boldQueries = (lyric: string, queries: Array<string>): string => {
  lyric = cleanLyric(lyric);
  return queries.reduce(boldQuery, lyric);
}

export const boldQuery = (lyric: string, query: string): string => {
  query = cleanLyric(query);
  let start: number, end: number;
  let boldedLyric = "";
  do {
    start = containsQuery(lyric, query);
    if (start === -1) {
      return boldedLyric + lyric;
    }
    end = start + query.length;
    // If not at the beginning, we need to shift start and end
    // because containsQuery will return the index of the space
    // before the start of the query
    if (lyric.toLowerCase().charAt(0) !== query.toLowerCase().charAt(0)) {
      start += 1;
      end += 1;
    }
    boldedLyric =
      boldedLyric +
      lyric.substring(0, start) +
      '<span class="query">' +
      lyric.substring(start, end) +
      "</span>";
    lyric = lyric.substring(end);
  } while (lyric.length > 0);
  return boldedLyric;
};

export const URL_QUERY_PARAM = 'query'
export const URL_ALBUM_PARAM = 'album'

export const getURLQueryStrings = (): Array<string> => {
  const currentURL = new URL(window.location);
  return currentURL.searchParams.getAll(URL_QUERY_PARAM);
}

export const getURLAlbumStrings = (): Array<string> => {
  const currentURL = new URL(window.location);
  return currentURL.searchParams.getAll(URL_ALBUM_PARAM);
}

const albumMap = require("../taylor-swift-lyrics/album_map.json");
