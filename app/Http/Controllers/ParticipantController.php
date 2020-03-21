<?php

namespace App\Http\Controllers;

use App\Models\Participant;
use App\Models\Event;

use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
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

    public function get($id)
    {
        return new ParticipantResource(Participant::findOrFail($id));
    }

    public function create(Request $request, $event_id)
    {
        $this->validate($request, [
            'name' => 'string|required',
            'affiliation' => 'string|required',
            'year' => [
                'required',
                Rule::in(config('app.year_options')),
            ],
            'sex' => [
                'required',
                Rule::in(config('app.sex_options')),
            ],
            'age' => 'required|integer',
            'canDrive' => 'required|boolean',
            'note' => 'string',
        ]);

        $event = Event::findOrFail($event_id);
        $participant = new Participant;

        $participant->event_id = $event->id;
        $participant->name = $request->input('name');
        $participant->affiliation = $request->input('affiliation');
        $participant->year = $request->input('year');
        $participant->sex = $request->input('sex');
        $participant->age = $request->input('age');
        $participant->can_drive = $request->input('canDrive');
        $participant->note = $request->input('note');

        $participant->save();

        return response()->json([
            'id' => $participant->id,
        ]);
    }

    public function delete(Request $request, $id)
    {
        $participant = Participant::findOrFail($id);

        $participant->delete();

        return response()->json([
            'success' => true,
        ]);
    }
}
