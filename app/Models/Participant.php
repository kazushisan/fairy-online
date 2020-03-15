<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Participant extends Model {
    protected $table = 'participants';

    /**
     * The attributes that should be cast.
     *
     * @var array
     */
    protected $casts = [
        'can_drive' => 'boolean',
    ];

    /**
     * Get the event that the participant belongs to.
     */
    public function post()
    {
        return $this->belongsTo('App\Models\Event');
    }
}
