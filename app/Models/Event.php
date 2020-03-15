<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Event extends Model {
    use SoftDeletes;

    protected $table = 'events';

    /**
     * The attributes that should be cast.
     *
     * @var array
     */
    protected $casts = [
        'start' => 'date:Y-m-d',
        'end' => 'date:Y-m-d',
        'due' => 'date:Y-m-d',
        'can_apply' => 'boolean',
    ];

    /**
     * Get the comments for the blog post.
     */
    public function participants()
    {
        return $this->hasMany('App\Models\Participant');
    }
}
