<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Review extends Model
{
    use HasFactory;

    protected $fillable = [
        'master_profile_id',
        'author_id',
        'rating',
        'comment',
        'master_response',
        'response_at',
        'is_approved',
    ];

    protected $casts = [
        'is_approved' => 'boolean',
        'response_at' => 'datetime',
    ];

    public function masterProfile()
    {
        return $this->belongsTo(MasterProfile::class);
    }

    public function author()
    {
        return $this->belongsTo(User::class, 'author_id');
    }

    protected static function boot()
    {
        parent::boot();

        static::created(function ($review) {
            if ($review->is_approved) {
                $review->masterProfile->updateRating();
            }
        });

        static::updated(function ($review) {
            if ($review->wasChanged('is_approved') || $review->wasChanged('rating')) {
                $review->masterProfile->updateRating();
            }
        });

        static::deleted(function ($review) {
            $review->masterProfile->updateRating();
        });
    }
}
