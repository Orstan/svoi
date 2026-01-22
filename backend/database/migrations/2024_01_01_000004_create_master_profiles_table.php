<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('master_profiles', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->text('bio')->nullable();
            $table->integer('experience_years')->default(0);
            $table->boolean('is_verified')->default(false);
            $table->boolean('is_pro')->default(false);
            $table->decimal('rating', 3, 2)->default(0);
            $table->integer('reviews_count')->default(0);
            $table->integer('views_count')->default(0);
            $table->string('whatsapp_link')->nullable();
            $table->string('telegram_link')->nullable();
            $table->string('viber_link')->nullable();
            $table->foreignId('location_id')->nullable()->constrained('locations')->onDelete('set null');
            $table->enum('status', ['pending', 'approved', 'rejected'])->default('pending');
            $table->timestamp('pro_expires_at')->nullable();
            $table->timestamp('boosted_at')->nullable();
            $table->timestamps();
            
            $table->index(['status', 'is_pro', 'rating']);
            $table->index('boosted_at');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('master_profiles');
    }
};
