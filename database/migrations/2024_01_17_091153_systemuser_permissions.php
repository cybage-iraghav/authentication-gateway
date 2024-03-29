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
        Schema::create('systemuser_permissions', function (Blueprint $table) {
            $table->id('permission_id');
            $table->bigInteger('user_id');
            $table->integer('mapp_cloud_id');
            $table->integer('cloud_instance_id');
            $table->string('permission_type',20);
            $table->boolean('default_cloudinstance_permissions');
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
        Schema::drop('systemuser_permissions');
    }
};
