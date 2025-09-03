<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        DB::statement("ALTER TABLE users CHANGE role role ENUM('admin', 'staff', 'hr', 'blogger', 'project_admin') DEFAULT 'staff'");
    }

    /**
     * Reverse the migrations.
     */
    // public function up(): void
    // {
    //     // DB::statement("ALTER TABLE users CHANGE role role ENUM('admin', 'staff', 'hr', 'blogger', 'project_admin') DEFAULT 'staff')");
    // }

    /**
     * Reverse the migrations.
     */
    // public function down(): void
    // {
    //     // Revert to the previous enum values if needed
    //     // This might be tricky if you have data with the new roles
    //     // DB::statement("ALTER TABLE users CHANGE role role ENUM('admin', 'staff', 'editor') DEFAULT 'staff')");
    // }
};