export interface FavoritesDTO {
  favorites: FavoriteMoviesDTO[];
  status: boolean;
}

export interface FavoriteMoviesDTO {
  id: number;
  user_id: number;
  movie_id: number;
  created_at: string;
  updated_at: string;
}
