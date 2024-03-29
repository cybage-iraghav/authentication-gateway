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
        Schema::create('mapp_cloud_customers', function (Blueprint $table) {
            $table->id('cloud_id');
            $table->string('cloud_type',20);
            $table->string('company_name',255)->nullable(false);
            $table->string('contact_name',100);
            $table->string('contact_email',100);
            $table->string('phone_number',20);
            $table->string('industry',100);
            $table->string('address_line1',255);
            $table->string('address_line2',255);
            $table->string('city',100);
            $table->string('state_province',100);
            $table->string('postal_code',20);
            $table->string('country',100);
            $table->integer('reseller_id');
            $table->json('sales_ids');
            $table->json('financial_ids');
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
        Schema::drop('mapp_cloud_customers');
    }
};
