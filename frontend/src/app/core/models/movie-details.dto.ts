export interface MovieDetailsDTO {
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection: any;
  budget: number;
  genres: GenreDTO[];
  homepage: string;
  id: number;
  imdb_id: any;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: ProductionCompanyDTO[];
  production_countries: ProductionCountryDTO[];
  release_date: string;
  revenue: number;
  runtime: number;
  spoken_languages: SpokenLanguageDTO[];
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface GenreDTO {
  id: number;
  name: string;
}

export interface ProductionCompanyDTO {
  id: number;
  logo_path?: string;
  name: string;
  origin_country: string;
}

export interface ProductionCountryDTO {
  iso_3166_1: string;
  name: string;
}

export interface SpokenLanguageDTO {
  english_name: string;
  iso_639_1: string;
  name: string;
}
