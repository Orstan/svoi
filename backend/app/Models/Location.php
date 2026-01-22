<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Location extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'name_uk',
        'type',
        'parent_id',
        'lat',
        'lng',
        'slug',
    ];

    public function parent()
    {
        return $this->belongsTo(Location::class, 'parent_id');
    }

    public function children()
    {
        return $this->hasMany(Location::class, 'parent_id');
    }

    public function masterProfiles()
    {
        return $this->hasMany(MasterProfile::class);
    }

    public function scopeVoivodeships($query)
    {
        return $query->where('type', 'voivodeship');
    }

    public function scopeCities($query)
    {
        return $query->where('type', 'city');
    }
}
