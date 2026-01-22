<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    use HasFactory;

    protected $fillable = [
        'name_uk',
        'name_pl',
        'name_en',
        'slug',
        'parent_id',
        'icon',
        'description_uk',
        'description_pl',
        'description_en',
        'order',
        'is_active',
    ];

    protected $casts = [
        'is_active' => 'boolean',
    ];

    public function parent()
    {
        return $this->belongsTo(Category::class, 'parent_id');
    }

    public function children()
    {
        return $this->hasMany(Category::class, 'parent_id')->orderBy('order');
    }

    public function services()
    {
        return $this->hasMany(Service::class);
    }

    public function getName(string $locale = 'uk'): string
    {
        return $this->{"name_$locale"} ?? $this->name_uk;
    }

    public function getDescription(string $locale = 'uk'): ?string
    {
        return $this->{"description_$locale"} ?? $this->description_uk;
    }
}
