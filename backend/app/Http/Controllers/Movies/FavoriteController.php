<?php

namespace App\Http\Controllers\Movies;

use App\Models\Favorite;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;


class FavoriteController extends Controller
{
     /**
     * Add movie to favorites
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */

    public function addToFavorites(Request $request)
    {
        try {

            $user = Auth::user();

            if ($user) {
            //Validated
            $validator = Validator::make($request->all(), [
                'movie_id' => 'required',
            ]);

            if ($validator->fails()) {
                return response()->json([
                  'status' => false,
                    'message' => 'Validation error',
                    'errors' => $validator->errors()
                ], 401);
            }

            // Add movie to actual user favorites
            $favorite = Favorite::create([
                'user_id' => $user->id,
                'movie_id' => $request->movie_id,
            ]);

            return response()->json([
                'status' => true,
                'message' => 'Movie added to favorites successfully.',
                'favorite' => $favorite,
            ], 200);

            } else {
                return response()->json([
                    'status' => false,
                    'message' => 'User is not authenticated.',
                ], 401);
            }
                } catch (\Throwable $th) {
                    return response()->json([
                        'status' => false,
                        'message' => $th->getMessage()
                    ], 500);
                }

    }

    /**
     * Delete movie from favorites.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */

     public function removeFavorites(Request $request)
    {
        try {

            $user = Auth::user();

            if ($user) {
            //Validated
            $validator = Validator::make($request->all(), [
                'movie_id' => 'required|exists:favorites,movie_id,user_id,' . $user->id,
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'status' => false,
                    'message' => 'Validation error',
                    'errors' => $validator->errors()
                ], 401);
            }

            // Search and delete specific favorite movie from actual users
            $favorite = Favorite::where('user_id', $user->id)
                                ->where('movie_id', $request->movie_id)
                                ->first();

            if ($favorite) {
                $favorite->delete();

                return response()->json([
                    'status' => true,
                    'message' => 'Movie removed from favorites successfully.',
                ]);
            }

            return response()->json([
                'status' => false,
                'message' => 'The movie was not in the user\'s favorites list.',
            ], 404);
        } else {
            return response()->json([
                'status' => false,
                'message' => 'User is not authenticated.',
            ], 401);
        }

        } catch (\Throwable $th) {
            return response()->json([
                'status' => false,
                'message' => $th->getMessage()
            ], 500);
        }
    }

    //Get all movies from user favorites
    public function getUserFavorites(Request $request)
    {
        try {

            $user = Auth::user();

            if ($user) {
            $favorites = $user->favorites()->get();

            return response()->json([
                'status' => true,
                'favorites' => $favorites,
            ]);

        } else {
            return response()->json([
                'status' => false,
                'message' => 'User is not authenticated.',
            ], 401);
        }

        } catch (\Throwable $th) {
            return response()->json([
                'status' => false,
                'message' => $th->getMessage()
            ], 500);
        }
    }

    //Get all favorite movies from all users
    public function getAllFavorites(Request $request)
    {
        try {
            $favorites = Favorite::all();

            return response()->json([
                'status' => true,
                'favorites' => $favorites,
            ]);

        } catch (\Throwable $th) {
            return response()->json([
                'status' => false,
                'message' => $th->getMessage()
            ], 500);
        }
    }
}
