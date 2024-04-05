<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOneThrough;

class MappCloudCustomers extends Model
{
    use HasFactory;
    protected $primaryKey = 'cloud_id';
    public function cloudInstances()
    {
        return $this->hasMany(CloudInstances::class, 'mapp_cloud_id', 'cloud_id');
    }
    public function systemuserPermissions() {
        return $this->hasMany(SystemuserPermissions::class, 'mapp_cloud_id');
    }  
    public function reseller() {
        return $this->hasMany(MappCloudCustomers::class,'cloud_id','reseller_id');
    }  

    public static function getCloudTypeReseller() {
        return static::where('cloud_type', 'reseller')->get();
    }
    public function isClient($cloud_type): bool {
        return $cloud_type === 'client';
    }
    public function systemUser(): HasOneThrough
    {
        return $this->hasOneThrough(
            SystemUsers::class,
            SystemuserPermissions::class,
            'mapp_cloud_id', 
            'user_id', 
            'cloud_id', 
            'user_id' 
        );
    }
}
