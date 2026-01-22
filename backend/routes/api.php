<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\CategoryController;
use App\Http\Controllers\Api\FavoriteController;
use App\Http\Controllers\Api\LocationController;
use App\Http\Controllers\Api\MasterProfileController;
use App\Http\Controllers\Api\ReviewController;
use Illuminate\Support\Facades\Route;

Route::prefix('v1')->group(function () {
    
    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/login', [AuthController::class, 'login']);
    Route::get('/auth/google/redirect', [AuthController::class, 'googleRedirect']);
    Route::get('/auth/google/callback', [AuthController::class, 'googleCallback']);

    Route::get('/categories', [CategoryController::class, 'index']);
    Route::get('/categories/{slug}', [CategoryController::class, 'show']);

    Route::get('/locations', [LocationController::class, 'index']);
    Route::get('/locations/voivodeships', [LocationController::class, 'voivodeships']);
    Route::get('/locations/cities', [LocationController::class, 'cities']);
    Route::get('/locations/{slug}', [LocationController::class, 'show']);

    Route::get('/masters', [MasterProfileController::class, 'index']);
    Route::get('/masters/{id}', [MasterProfileController::class, 'show']);

    Route::middleware('auth:sanctum')->group(function () {
        Route::post('/logout', [AuthController::class, 'logout']);
        Route::get('/me', [AuthController::class, 'me']);

        Route::post('/masters', [MasterProfileController::class, 'store']);
        Route::put('/masters/{id}', [MasterProfileController::class, 'update']);
        Route::post('/masters/{id}/portfolio', [MasterProfileController::class, 'uploadPortfolio']);
        Route::delete('/masters/{profileId}/portfolio/{itemId}', [MasterProfileController::class, 'deletePortfolioItem']);

        Route::post('/masters/{masterProfileId}/reviews', [ReviewController::class, 'store']);
        Route::post('/reviews/{reviewId}/respond', [ReviewController::class, 'respond']);

        Route::get('/favorites', [FavoriteController::class, 'index']);
        Route::post('/favorites/{masterProfileId}/toggle', [FavoriteController::class, 'toggle']);
        Route::get('/favorites/{masterProfileId}/check', [FavoriteController::class, 'check']);
    });
});
