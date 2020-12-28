// @flow
export const containsQuery = (lyric: string, query: string): number => {
    query = query.toLowerCase();
    const regex = new RegExp(`([\\.-?!,\\s]+|^)${query}([\\.-?!,\\s]+|$)`);
    return lyric.toLowerCase().search(regex);
}
