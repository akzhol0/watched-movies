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
  seasonCount: number;
  showType: string;
  rating: number;
  imageCover: string;
};

type genres = {
  name: string;
  id: string;
};

export type MoviesPageProps = {
  itemType: string;
  showType: string;
  id: number;
  imdbId: string;
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
    horizontalPoster: {
      w360: string;
      w480: string;
      w720: string;
      w1080: string;
      w1440: string;
    };
    horizontalBackdrop: {
      w360: string;
      w480: string;
      w720: string;
      w1080: string;
      w1440: string;
    };
  };
  streamingOptions: any;
};

export type ShowsPageProps = {
  itemType: string;
  showType: string;
  id: number;
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
    horizontalPoster: {
      w360: string;
      w480: string;
      w720: string;
      w1080: string;
      w1440: string;
    };
    verticalBackdrop: {
      w240: string;
      w360: string;
      w480: string;
      w600: string;
      w72: string;
    };
    horizontalBackdrop: {
      w360: string;
      w480: string;
      w720: string;
      w1080: string;
      w1440: string;
    };
  };
  streamingOptions: any;
};
