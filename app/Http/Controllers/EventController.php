<?php

namespace App\Http\Controllers;

use App\Models\Event;
use App\Http\Resources\EventCollection;

class EventController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }


    public function getEvents()
    {
        return new EventCollection(Event::all());
    }
}
