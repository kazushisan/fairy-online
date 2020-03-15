<?php

namespace App\Http\Controllers;

use App\Models\Event;
use Illuminate\Http\Request;
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


    public function index()
    {
        return EventResource::collection(Event::with('participants')->get());
    }

    public function get($id)
    {
        return new EventResource(Event::with('participants')->findOrFail($id));
    }

    public function create(Request $request)
    {
        $this->validate($request, [
            'title' => 'required|string',
            'start' => 'required|date_format:Y-m-d',
            'end' => 'required|date_format:Y-m-d',
            'description' => 'required|string',
            'canApply' => 'required|boolean',
            'due' => 'date_format:Y-m-d|nullable',
        ]);


        $event = new Event;
        $event->title = $request->input('title');
        $event->start = $request->input('start');
        $event->end = $request->input('end');
        $event->description = $request->input('description');
        $event->can_apply = $request->input('canApply');
        $event->due = $request->input('due');

        $event->save();

        return response()->json([
            'id' => $event->id,
        ]);
    }

    public function update(Request $request, $id)
    {
        $this->validate($request, [
            'title' => 'required|string',
            'start' => 'required|date_format:Y-m-d',
            'end' => 'required|date_format:Y-m-d',
            'description' => 'required|string',
            'canApply' => 'required|boolean',
            'due' => 'date_format:Y-m-d|nullable',
        ]);

        $event = Event::findOrFail($id);

        $event->title = $request->input('title');
        $event->start = $request->input('start');
        $event->end = $request->input('end');
        $event->description = $request->input('description');
        $event->can_apply = $request->input('canApply');
        $event->due = $request->input('due');

        $event->save();

        return response()->json([
            'id' => $event->id,
        ]);
    }

    public function delete(Request $request, $id)
    {
        $event = Event::findOrFail($id);

        $event->delete();

        return response()->json([
            'success' => true,
        ]);
    }
}
