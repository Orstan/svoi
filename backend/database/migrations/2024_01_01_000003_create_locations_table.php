<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('locations', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('name_uk')->nullable();
            $table->enum('type', ['voivodeship', 'city']);
            $table->foreignId('parent_id')->nullable()->constrained('locations')->onDelete('cascade');
            $table->decimal('lat', 10, 8)->nullable();
            $table->decimal('lng', 11, 8)->nullable();
            $table->string('slug')->unique();
            $table->timestamps();
            
            $table->index(['type', 'parent_id']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('locations');
    }
};
