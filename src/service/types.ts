export type MoviesProps = {
  id: number;
  imdbId: string;
  title: string;
  releaseYear: number;
  showType: string;
  rating: number;
  imageCover: string;
};

export type ShowsProps = {
  id: number;
  imdbId: string;
  title: string;
  firstAirYear: number;
  lastAirYear: number;
  seasons: number;
  showType: string;
  rating: number;
  imageCover: string;
};
