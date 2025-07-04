<?php

namespace App\Models;

use App\Models\Scopes\Searchable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Menu extends Model
{
    use HasFactory;
    use Searchable;

    protected $fillable = ['nom', 'bon_plan_id'];

    protected $searchableFields = ['*'];

    public function bonPlan()
    {
        return $this->belongsTo(BonPlan::class, 'bon_plan_id', 'id');
    }

    public function sousMenus()
    {
        return $this->hasMany(SousMenu::class);
    }
}
