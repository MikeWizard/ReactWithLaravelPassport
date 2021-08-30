<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use Hash;
class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        // \App\Models\User::factory(10)->create();

        $this->call(LaRbacDatabaseSeeder::class);
        // User::truncate();
        // User::create([
            // 'name' => '',
            // 'email' => 'mikehambra@gmail.com',
            // 'password' => Hash::make('mypassword'),
        // ]);
    }
}
