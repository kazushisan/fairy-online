<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It is a breeze. Simply tell Lumen the URIs it should respond to
| and give it the Closure to call when that URI is requested.
|
*/

$router->group(['middleware' => 'auth'], function () use ($router) {
    $router->get('/event', 'EventController@index');

    $router->get('/event/{id}', 'EventController@get');

    $router->post('/event/{event_id}/participant', 'ParticipantController@create');

    $router->get('/participant/{id}', 'ParticipantController@get');

    $router->delete('/participant/{id}', 'ParticipantController@delete');

    // allowed for admin user only
    $router->group(['middleware' => 'admin_only'], function () use ($router) {
        $router->post('/event', 'EventController@create');

        $router->put('/event/{id}', 'EventController@update');

        $router->delete('/event/{id}', 'EventController@delete');

    });
});

$router->post('/login', 'AuthController@login');

