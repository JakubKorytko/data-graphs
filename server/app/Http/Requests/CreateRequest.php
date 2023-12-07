<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CreateRequest extends FormRequest
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
     *
     * @return array<string, \Illuminate\Contracts\Validation\Rule|array|string>
     */
    public function rules(): array
    {
        return [
            'name' => 'required|unique:acquisition_channels|max:65535|min:1|regex:/^[a-zA-Z0-9 ]*$/',
            'clients' => 'required|integer|max:2147483647|min:0',
        ];
    }

    public function messages(): array
    {
        return [
            'required' => 'Pole :attribute jest wymagane.',
            'unique' => 'Wartość z pola :attribute musi być unikalna.',
            'max' => 'Pole :attribute może zawierać maksymalnie :max znaków.',
            'min' => 'Pole :attribute musi zawierać minimum :min znaków.',
            'regex' => 'Pole :attribute może zawierać tylko litery, cyfry i spacje.',
            'integer' => 'Pole :attribute musi być liczbą całkowitą.',
        ];
    }
}
