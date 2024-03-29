<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SystemUsers extends Model
{
    use HasFactory;
    protected $primaryKey = 'user_id';
    public function systemuserPermissions()
    {
        return $this->hasMany(SystemuserPermissions::class, 'user_id');
    }
}
