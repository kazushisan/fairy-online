<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class Participant extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'affiliation' => $this->affiliation,
            'year' => $this->year,
            'sex' => $this->sex,
            'age' => $this->age,
            'canDrive' => $this->can_drive,
            'note' => $this->note,
        ];
    }
}
