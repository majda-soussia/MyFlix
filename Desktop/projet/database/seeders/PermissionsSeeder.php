<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\PermissionRegistrar;

class PermissionsSeeder extends Seeder
{
    public function run(): void
    {
        // Reset cached roles and permissions
        app()[PermissionRegistrar::class]->forgetCachedPermissions();

        // Create default permissions
        Permission::create(['name' => 'list bonplans']);
        Permission::create(['name' => 'view bonplans']);
        Permission::create(['name' => 'create bonplans']);
        Permission::create(['name' => 'update bonplans']);
        Permission::create(['name' => 'delete bonplans']);

        Permission::create(['name' => 'list menus']);
        Permission::create(['name' => 'view menus']);
        Permission::create(['name' => 'create menus']);
        Permission::create(['name' => 'update menus']);
        Permission::create(['name' => 'delete menus']);

        Permission::create(['name' => 'list offres']);
        Permission::create(['name' => 'view offres']);
        Permission::create(['name' => 'create offres']);
        Permission::create(['name' => 'update offres']);
        Permission::create(['name' => 'delete offres']);

        Permission::create(['name' => 'list ratings']);
        Permission::create(['name' => 'view ratings']);
        Permission::create(['name' => 'create ratings']);
        Permission::create(['name' => 'update ratings']);
        Permission::create(['name' => 'delete ratings']);

        Permission::create(['name' => 'list sousmenus']);
        Permission::create(['name' => 'view sousmenus']);
        Permission::create(['name' => 'create sousmenus']);
        Permission::create(['name' => 'update sousmenus']);
        Permission::create(['name' => 'delete sousmenus']);

        // Create user role and assign existing permissions
        $currentPermissions = Permission::all();
        $userRole = Role::create(['name' => 'user']);
        $userRole->givePermissionTo($currentPermissions);

        // Create admin exclusive permissions
        Permission::create(['name' => 'list roles']);
        Permission::create(['name' => 'view roles']);
        Permission::create(['name' => 'create roles']);
        Permission::create(['name' => 'update roles']);
        Permission::create(['name' => 'delete roles']);

        Permission::create(['name' => 'list permissions']);
        Permission::create(['name' => 'view permissions']);
        Permission::create(['name' => 'create permissions']);
        Permission::create(['name' => 'update permissions']);
        Permission::create(['name' => 'delete permissions']);

        Permission::create(['name' => 'list users']);
        Permission::create(['name' => 'view users']);
        Permission::create(['name' => 'create users']);
        Permission::create(['name' => 'update users']);
        Permission::create(['name' => 'delete users']);

        // Create admin role and assign all permissions
        $allPermissions = Permission::all();
        $adminRole = Role::create(['name' => 'super-admin']);
        $adminRole->givePermissionTo($allPermissions);

        $user = \App\Models\User::whereEmail('admin@admin.com')->first();

        if ($user) {
            $user->assignRole($adminRole);
        }
    }
}
