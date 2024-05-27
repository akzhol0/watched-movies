type genres = {
  name: string;
  id: string;
};

export type MoviesProps = {
  itemType: string;
  showType: string;
  id: number;
  addedTime: string;
  imdbId: string;
  userRate: number;
  title: string;
  overview: string;
  releaseYear: number;
  originalTitle: string;
  genres: genres[];
  directors: string[];
  cast: string[];
  rating: number;
  imageSet: {
    verticalPoster: {
      w240: string;
      w360: string;
      w480: string;
      w600: string;
      w720: string;
    };
    horizontalPoster: any;
    horizontalBackdrop: any;
  };
  streamingOptions: any;
};

export type ShowsProps = {
  date: string | number | Date;
  itemType: string;
  showType: string;
  id: number;
  userRate: number;
  addedTime: string;
  imdbId: string;
  tmdbId: string;
  title: string;
  overview: string;
  firstAirYear: number;
  lastAirYear: number;
  originalTitle: string;
  genres: genres[];
  creators: string[];
  cast: string[];
  rating: number;
  seasonCount: number;
  episodeCount: number;
  imageSet: {
    verticalPoster: {
      w240: string;
      w360: string;
      w480: string;
      w600: string;
      w720: string;
    };
    horizontalPoster: any;
    verticalBackdrop: any;
    horizontalBackdrop: any;
  };
  streamingOptions: any;
};
