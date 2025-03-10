
export type Item = {
  id: number;
  word: string;
  image: string;
};

export type Level = {
  items: Item[];
};

export type Connection = {
  wordId: number | null;
  imageId: number | null;
};
