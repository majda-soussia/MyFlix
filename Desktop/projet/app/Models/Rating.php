<?php

namespace App\Models;

use App\Models\Scopes\Searchable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Rating extends Model
{
    use HasFactory;
    use Searchable;

    protected $fillable = ['rate_bp', 'comment_bp', 'user_id', 'bon_plan_id'];

    protected $searchableFields = ['*'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function bonPlan()
    {
        return $this->belongsTo(BonPlan::class, 'bon_plan_id', 'id');
    }
}
