<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('system_users', function (Blueprint $table) {
            $table->id('user_id');
            $table->string('username',50);
            $table->string('email',100);
            $table->boolean('mapp_internal');
            $table->dateTime('last_login');
            $table->dateTime('last_password_change');
            $table->string('status',20);
            $table->dateTime('status_changed_at');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('system_users');
    }
};
