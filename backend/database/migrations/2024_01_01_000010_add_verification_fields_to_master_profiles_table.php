<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('master_profiles', function (Blueprint $table) {
            $table->string('document_type', 32)->nullable()->after('viber_link');
            $table->string('document_number', 64)->nullable()->after('document_type');
            $table->string('document_front_path')->nullable()->after('document_number');
            $table->string('document_back_path')->nullable()->after('document_front_path');
            $table->string('document_selfie_path')->nullable()->after('document_back_path');
            $table->timestamp('verification_submitted_at')->nullable()->after('document_selfie_path');
            $table->timestamp('verified_at')->nullable()->after('verification_submitted_at');

            $table->unique('document_number');
            $table->index('verification_submitted_at');
            $table->index('verified_at');
        });
    }

    public function down(): void
    {
        Schema::table('master_profiles', function (Blueprint $table) {
            $table->dropIndex(['verification_submitted_at']);
            $table->dropIndex(['verified_at']);
            $table->dropUnique(['document_number']);

            $table->dropColumn([
                'document_type',
                'document_number',
                'document_front_path',
                'document_back_path',
                'document_selfie_path',
                'verification_submitted_at',
                'verified_at',
            ]);
        });
    }
};
