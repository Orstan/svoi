<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MasterProfile extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'bio',
        'experience_years',
        'is_verified',
        'is_pro',
        'rating',
        'reviews_count',
        'views_count',
        'whatsapp_link',
        'telegram_link',
        'viber_link',
        'location_id',
        'status',
        'pro_expires_at',
        'boosted_at',
    ];

    protected $casts = [
        'is_verified' => 'boolean',
        'is_pro' => 'boolean',
        'pro_expires_at' => 'datetime',
        'boosted_at' => 'datetime',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function location()
    {
        return $this->belongsTo(Location::class);
    }

    public function services()
    {
        return $this->hasMany(Service::class);
    }

    public function portfolioItems()
    {
        return $this->hasMany(PortfolioItem::class)->orderBy('order');
    }

    public function reviews()
    {
        return $this->hasMany(Review::class);
    }

    public function approvedReviews()
    {
        return $this->hasMany(Review::class)->where('is_approved', true);
    }

    public function favoritedBy()
    {
        return $this->belongsToMany(User::class, 'favorites');
    }

    public function incrementViews()
    {
        $this->increment('views_count');
    }

    public function updateRating()
    {
        $avgRating = $this->approvedReviews()->avg('rating');
        $reviewsCount = $this->approvedReviews()->count();
        
        $this->update([
            'rating' => $avgRating ?? 0,
            'reviews_count' => $reviewsCount,
        ]);
    }

    public function scopeApproved($query)
    {
        return $query->where('status', 'approved');
    }

    public function scopePro($query)
    {
        return $query->where('is_pro', true)
                     ->where('pro_expires_at', '>', now());
    }

    public function scopeBoosted($query)
    {
        return $query->whereNotNull('boosted_at')
                     ->where('boosted_at', '>', now()->subDays(7));
    }
}
