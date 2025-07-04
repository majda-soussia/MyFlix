<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class BonPlanUpdateRequest extends FormRequest
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
            'nom_bp' => ['required', 'max:255', 'string'],
            'categorie_bp' => ['required', 'max:255', 'string'],
            'tel_bp' => ['required', 'max:255', 'string'],
            'desc_bp' => ['required', 'max:255', 'string'],
            'location' => ['required', 'max:255', 'string'],
            'user_id' => ['required', 'exists:users,id'],
            'ouverture ' => ['required', 'max:255', 'string'],
            'fermuture ' => ['required', 'max:255', 'string'],
        ];
    }
}
