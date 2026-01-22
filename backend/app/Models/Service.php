<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Service extends Model
{
    use HasFactory;

    protected $fillable = [
        'master_profile_id',
        'category_id',
        'title',
        'description',
        'price_min',
        'price_max',
        'currency',
        'duration',
        'is_active',
    ];

    protected $casts = [
        'is_active' => 'boolean',
        'price_min' => 'decimal:2',
        'price_max' => 'decimal:2',
    ];

    public function masterProfile()
    {
        return $this->belongsTo(MasterProfile::class);
    }

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function getPriceRange(): string
    {
        if ($this->price_min && $this->price_max) {
            return "{$this->price_min} - {$this->price_max} {$this->currency}";
        } elseif ($this->price_min) {
            return "від {$this->price_min} {$this->currency}";
        }
        return "Договірна";
    }
}
