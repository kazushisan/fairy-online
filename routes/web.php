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

$router->get('/', function () use ($router) {
    return $router->app->version();
});

$router->get('/event', 'EventController@index');

$router->post('/event', 'EventController@create');

$router->get('/event/{id}', 'EventController@get');

$router->put('/event/{id}', 'EventController@update');

$router->delete('/event/{id}', 'EventController@delete');

$router->put('/event/{event_id}/participant', 'ParticipantController@create');

$router->get('/participant/{id}', 'ParticipantController@get');

