<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('reviews', function (Blueprint $table) {
            $table->id();
            $table->foreignId('master_profile_id')->constrained()->onDelete('cascade');
            $table->foreignId('author_id')->constrained('users')->onDelete('cascade');
            $table->integer('rating');
            $table->text('comment')->nullable();
            $table->text('master_response')->nullable();
            $table->timestamp('response_at')->nullable();
            $table->boolean('is_approved')->default(false);
            $table->timestamps();
            
            $table->index(['master_profile_id', 'is_approved']);
            $table->unique(['master_profile_id', 'author_id']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('reviews');
    }
};
