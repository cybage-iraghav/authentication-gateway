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
        Schema::create('cloud_instances', function (Blueprint $table) {
            $table->id('instance_id');
            $table->string('instance_name',255)->nullable(false);
            $table->string('instance_type',255)->nullable(false);
            $table->integer('engage_project_id');
            $table->integer('engage_customer_id');
            $table->integer('intelligence_company_id');
            $table->integer('intelligence_track_id');
            $table->integer('cloud_instance_id');
            $table->integer('linked_campaign_dashboard_track_id');
            $table->integer('mapp_cloud_id');
            $table->string('origin',255)->nullable(false);
            $table->string('status',255)->nullable(false);
            $table->dateTime('status_changed_at')->nullable();
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
        Schema::drop('cloud_instances');
    }
};
