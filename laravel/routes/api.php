<?php

use App\Http\Controllers\API\EventController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('events',[EventController::class, 'index']);
Route::post('/add-event',[EventController::class, 'store']);
Route::get('/get-event/{date}',[EventController::class, 'getEvent']);
Route::delete('/delete-event/{id}',[EventController::class, 'destroy']);

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});
