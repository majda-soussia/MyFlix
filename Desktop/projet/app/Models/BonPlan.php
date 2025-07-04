<?php

namespace App\Models;

use App\Models\Scopes\Searchable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class BonPlan extends Model
{
    use HasFactory;
    use Searchable;

    protected $fillable = [
        'nom_bp',
        'image',
        'categorie_bp',
        'tel_bp',
        'desc_bp',
        'location',
        'user_id',
        'ouverture',
        'fermuture',
    ];

    protected $searchableFields = ['*'];

    protected $table = 'bon_plans';

    public function offres()
    {
        return $this->hasMany(Offre::class, 'bon_plan_id', 'id');
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function ratings()
    {
        return $this->hasMany(Rating::class, 'bon_plan_id', 'id');
    }

    public function menus()
    {
        return $this->hasMany(Menu::class, 'bon_plan_id', 'id');
    }
}
