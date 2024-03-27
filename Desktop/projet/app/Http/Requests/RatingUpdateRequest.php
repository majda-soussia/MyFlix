<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class RatingUpdateRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     */
    public function rules(): array
    {
        return [
            'rate_bp' => ['required', 'numeric'],
            'comment_bp' => ['required', 'max:255', 'string'],
            'user_id' => ['required', 'exists:users,id'],
            'bon_plan_id' => ['required', 'exists:bon_plans,id'],
        ];
    }
}
