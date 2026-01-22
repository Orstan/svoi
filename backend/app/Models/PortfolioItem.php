<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PortfolioItem extends Model
{
    use HasFactory;

    protected $fillable = [
        'master_profile_id',
        'image_path',
        'description',
        'order',
        'is_approved',
    ];

    protected $casts = [
        'is_approved' => 'boolean',
    ];

    public function masterProfile()
    {
        return $this->belongsTo(MasterProfile::class);
    }

    public function getImageUrl(): string
    {
        return asset('storage/' . $this->image_path);
    }
}
