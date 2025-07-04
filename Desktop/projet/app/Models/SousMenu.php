<?php

namespace App\Models;

use App\Models\Scopes\Searchable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class SousMenu extends Model
{
    use HasFactory;
    use Searchable;

    protected $fillable = ['nom', 'prix', 'menu_id', 'bon_plan_id'];

    protected $searchableFields = ['*'];

    protected $table = 'sous_menus';

    public function menu()
    {
        return $this->belongsTo(Menu::class);
    }

    public function bonPlan()
    {
        return $this->belongsTo(BonPlan::class);
    }
}

    
