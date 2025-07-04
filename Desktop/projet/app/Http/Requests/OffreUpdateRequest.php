<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class OffreUpdateRequest extends FormRequest
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
            'title' => ['required', 'max:255', 'string'],
            'content' => ['required', 'max:255', 'string'],
            'bon_plan_id' => ['required', 'exists:bon_plans,id'],
        ];
    }
}
