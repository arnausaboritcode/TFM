<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Movies\FavoriteController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

// User auth
Route::post('/auth/register', [AuthController::class, 'createUser']);
Route::post('/auth/login', [AuthController::class, 'loginUser']);

//Just for authenticated users
Route::middleware('auth:sanctum')->group(function () {

    //Get user data
    Route::get('/auth/user', function (Request $request) {
        return $request->user();
    });

    //Get all users
    Route::get('/auth/users', [AuthController::class, 'getAllUsers']);

    //User logout
    Route::post('/auth/logout', [AuthController::class, 'logoutUser']);
    //User update data
    Route::put('/auth/update', [AuthController::class, 'updateUser']);

    //Favourite system
    Route::post('/favorites/add', [FavoriteController::class, 'addToFavorites']);
    Route::delete('/favorites/remove', [FavoriteController::class, 'removeFavorites']);
    Route::get('/favorites', [FavoriteController::class, 'getUserFavorites']);
    Route::get('/favorites/all', [FavoriteController::class, 'getAllFavorites']);

});



