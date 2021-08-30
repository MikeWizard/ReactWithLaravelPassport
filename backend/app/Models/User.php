<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Passport\HasApiTokens;
use Itstructure\LaRbac\Interfaces\RbacUserInterface ;
use Itstructure\LaRbac\Traits\Administrable;
use Itstructure\LaRbac\Models\Role;
use Itstructure\LaRbac\Models\Permission;
class User extends Authenticatable implements RbacUserInterface
{
    use HasApiTokens, HasFactory, Notifiable, Administrable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'roles',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];
    public function roles()
    {
        return $this->belongsToMany(Role::class, 'user_role', 'user_id', 'role_id')->join('role_permission','role_id','roles.id');
    }
    public function role_permissions(){
        return $this->hasManyThrough(Role::class,Permission::class);
    }
}
