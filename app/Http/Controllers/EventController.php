<?php

namespace App\Http\Controllers;

use App\Models\Event;
use App\Http\Resources\Event as EventResource;

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
        return EventResource::collection(Event::all());
    }
}
