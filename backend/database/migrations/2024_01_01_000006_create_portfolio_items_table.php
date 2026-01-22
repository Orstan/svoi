<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('portfolio_items', function (Blueprint $table) {
            $table->id();
            $table->foreignId('master_profile_id')->constrained()->onDelete('cascade');
            $table->string('image_path');
            $table->text('description')->nullable();
            $table->integer('order')->default(0);
            $table->boolean('is_approved')->default(false);
            $table->timestamps();
            
            $table->index(['master_profile_id', 'is_approved']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('portfolio_items');
    }
};
