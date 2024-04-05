<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CloudInstances extends Model
{
    use HasFactory;
    protected $primaryKey = 'instance_id';
    public function linkedCloudInstance()
    {
        return $this->belongsTo(CloudInstances::class, 'cloud_instance_id', 'instance_id');
    }
    public function linkedCampaignDashboard()
    {
        return $this->belongsTo(CloudInstances::class, 'linked_campaign_dashboard_track_id', 'instance_id');
    }
    public function mappCloudCustomer()
    {
        return $this->belongsTo(MappCloudCustomers::class, 'mapp_cloud_id', 'cloud_id');
    }
}
