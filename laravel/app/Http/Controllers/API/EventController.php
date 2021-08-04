<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Event;

class EventController extends Controller
{
    public function index()
    {
        $events = Event::all();
        return response()->json([
            'status'=>200,
            'events'=> $events,
        ]);
    }

    public function store(Request $request)
    {
        $event = new Event;
        $event->title = $request->input('title');
        $event->date = $request->input('date');
        $event->timeBegin = $request->input('timeB');
        $event->timeEnd = $request->input('timeE');
        $event->save();

        return response()->json([
            'status'=>200,
            'message'=> 'Event Added Successfuly',
        ]);
    }

    public function getEvent($date)
    {
        $events = Event::where('date',$date)->get();
        return response()->json([
            'status'=>200,
            'events'=> $events,
        ]);
    }

    public function destroy($id)
    {
        $events = Event::find($id);
        $events->delete();
        return response()->json([
            'status'=>200,
            'message'=> 'Event Deleted Successfuly',
        ]);
    }
}
