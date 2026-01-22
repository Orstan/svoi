<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('services', function (Blueprint $table) {
            $table->id();
            $table->foreignId('master_profile_id')->constrained()->onDelete('cascade');
            $table->foreignId('category_id')->constrained()->onDelete('cascade');
            $table->string('title');
            $table->text('description')->nullable();
            $table->decimal('price_min', 10, 2)->nullable();
            $table->decimal('price_max', 10, 2)->nullable();
            $table->string('currency', 3)->default('PLN');
            $table->string('duration')->nullable();
            $table->boolean('is_active')->default(true);
            $table->timestamps();
            
            $table->index(['master_profile_id', 'category_id']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('services');
    }
};
