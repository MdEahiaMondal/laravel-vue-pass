<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::group(['prefix' => 'auth'], function(){
    Route::post('register', 'AuthController@register');
    Route::post('login', 'AuthController@login');

    Route::group(['middleware' => 'auth:api'], function(){
        Route::get('logout', 'AuthController@logout');
    });
});

Route::group(['prefix' => 'user'], function(){
    Route::group(['middleware' => 'auth:api'], function(){
        Route::get('edit-category', function (){
            return response()->json([
                'message' => 'admin_access',
                'status_code' => 200
            ], 200);
        })->middleware(['scopes:do_everything']);

        Route::get('show-category', function (){
            return response()->json([
                'message' => 'author_access',
                'status_code' => 200
            ], 200);
        })->middleware(['scope:do_create,do_everything']);
    });
});





Route::apiResource('categories', 'CategoryController');
Route::get('test', 'CategoryController@test');
