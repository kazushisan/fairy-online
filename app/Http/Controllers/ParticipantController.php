<?php

namespace App\Http\Controllers;

use App\Models\Participant;
use App\Http\Resources\Participant as ParticipantResource;

class ParticipantController extends Controller
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

    public function getParticipant($id)
    {
        return new ParticipantResource(Participant::findOrFail($id));
    }
}
