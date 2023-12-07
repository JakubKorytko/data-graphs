<?php

namespace App\Http\Controllers;

use App\Models\AcquisitionChannel;
use Illuminate\Support\Facades\Schema;
use Illuminate\Http\Request;
use App\Http\Requests\CreateRequest;
use Illuminate\Support\Facades\Validator;


class AcquisitionChannelController extends Controller
{

    public static $messages_name = [
        'required' => 'Nazwa kanału jest wymagana.',
        'unique' => 'Istnieje już kanał o takiej nazwie.',
        'max' => 'Nazwa może zawierać maksymalnie :max znaków.',
        'min' => 'Nazwa musi zawierać minimum :min znaków.',
        'regex' => 'Nazwa kanału może zawierać tylko litery, cyfry i spacje.',
    ];

    public static $messages_clients = [
        'required' => 'Pole :attribute jest wymagane.',
        'max' => 'Liczba klientów musi być równa lub mniejsza niż :max.',
        'min' => 'Liczba klientów musi być równa lub większa niż :min.',
        'integer' => 'Liczba klientów musi być liczbą całkowitą.'
    ];

    public static $name_size = 65535;
    public static $clients_size = 2147483647;

    public function read(Request $request)
    {
        $columns = Schema::getColumnListing('acquisition_channels');
        $columns = array_diff($columns, ['created_at', 'updated_at']);

        $clients_size = AcquisitionChannelController::$clients_size;
        $name_size = AcquisitionChannelController::$name_size;

        $customColumnsProperties = [
            'name' => ['type' => 'string', 'size' => $name_size], // VARCHAR max size
            'clients' => ['type' => 'number', 'size' => $clients_size] // INT max size
        ];

        $limit = $request->limit ?? 20;

        $data = [
            'columns' => $columns,
            'columns_properties' => $customColumnsProperties,
            'channels' => AcquisitionChannel::select("id", "name", "clients")
                ->paginate($limit)
        ];

        return response()->json($data, 200);
    }

    public function find($column, $value)
    {
        $record = AcquisitionChannel::where($column, '=', $value)->first();
        if ($record === null) return false;
        return $record;
    }

    public function customValidate($name, $clients)
    {
        $messages_name = AcquisitionChannelController::$messages_name;
        $messages_clients = AcquisitionChannelController::$messages_clients;

        $validator_name = Validator::make(["name" => $name['value']], $rules = [
            'name' => $name['pattern']
        ], $messages_name);

        $validator_clients = Validator::make(["clients" => $clients['value']], $rules = [
            'clients' => $clients['pattern']
        ], $messages_clients);

        if ($validator_clients->fails() || $validator_name->fails()) {
            $validator = $validator_name->fails() ? $validator_name : $validator_clients;
            return $validator->errors()->first();
        } else {
            return true;
        }
    }

    public function create(Request $request)
    {
        $clients_size = AcquisitionChannelController::$clients_size;
        $name_size = AcquisitionChannelController::$name_size;

        $name = [
            'value' => $request->name,
            'pattern' => 'required|unique:acquisition_channels|max:' . $name_size . '|min:1|regex:/^[a-zA-Z0-9 ]*$/'
        ];

        $clients = [
            'value' => $request->clients,
            'pattern' => 'required|integer|max:' . $clients_size . '|min:0'
        ];

        $val = $this->customValidate($name, $clients);

        if ($val !== true) {
            return response()->json([
                'message' => $val
            ], 400);
        } else {
            AcquisitionChannel::create($request->post());

            return response()->json([
                'message' => 'Kanał został dodany pomyślnie.'
            ], 201);
        }
    }

    public function update(Request $request, $key)
    {

        error_log($key);

        $clients_size = AcquisitionChannelController::$clients_size;
        $name_size = AcquisitionChannelController::$name_size;

        
        $name = [
            'value' => $request->name,
            'pattern' => 'required|max:' . $name_size . '|min:1|regex:/^[a-zA-Z0-9 ]*$/'
        ];

        $clients = [
            'value' => $request->clients,
            'pattern' => 'required|integer|max:' . $clients_size . '|min:0'
        ];

        $val = $this->customValidate($name, $clients);

        if ($val !== true) {
            return response()->json([
                'message' => $val
            ], 400);
        } else {
            if (!$this->find('id', $key)) {
                return response()->json([
                    'message' => 'Kanał, który próbujesz zaktualizować nie istnieje.'
                ], 404);
            } else {

                AcquisitionChannel::where('id','=',$key)->update(["name" => $name["value"], "clients" => $clients["value"]]);

                return response()->json([
                    'message' => 'Kanał został zaktualizowany pomyślnie.'
                ], 200);
            }

        }
    }

    public function delete(Request $request, $key)
    {

        if (!$this->find('id', $key)) {
            return response()->json([
                'message' => 'Kanał, który próbujesz usunąć nie istnieje.'
            ], 404);
        } else {
            AcquisitionChannel::where('id', $key)->delete();
            return response()->noContent();
        }
    }
}
