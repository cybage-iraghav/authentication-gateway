<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SystemuserPermissions extends Model
{
    use HasFactory;
    protected $primaryKey = 'permission_id';
    public function mappCloudCustomer() {
        return $this->belongsTo(MappCloudCustomers::class, 'mapp_cloudid', 'cloud_id');
    }
    public function cloudInstance() {
        return $this->belongsTo(CloudInstances::class, 'cloud_instanceid', 'instance_id');
    }
    public function systemUser() {
        return $this->belongsTo(SystemUsers::class, 'user_id');
    }
}
