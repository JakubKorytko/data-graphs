<?php

namespace App\Http\Controllers;

use App\Models\DataGraph;
use Illuminate\Support\Facades\Schema;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;


class DataGraphController extends Controller
{

    public static function action(Request $request, $action, $data = null)
    {
        error_log(isset($request->test));

        if (isset($request->test)) return true;

        switch ($action) {
            case 'create':
                return DataGraph::create($request->post());
            case 'update':
                if (!isset($data["name"]) || !isset($data["clients"]) || !isset($data['id'])) return false;
                return DataGraph::where('id', '=', $data["id"])->update($data);
            case 'delete':
                if (!isset($data["id"])) return false;
                return DataGraph::where('id', '=', $data["id"])->delete();
            default:
                return false;
        }
    }

    public static $messages_name = [
        'required' => 'Channel name is required.',
        'unique' => 'Channel with this name already exists.',
        'max' => 'Channel name must be maximum :max characters long.',
        'min' => 'Channel name must be minimum :min characters long.',
        'regex' => 'Channel name must contain only letters, numbers and spaces.'
    ];

    public static $messages_clients = [
        'required' => 'The :attribute field is required.',
        'max' => 'Number of clients must be less than or equal to :max.',
        'min' => 'Number of clients must be greater than or equal to :min.',
        'integer' => 'Number of clients must be an integer.'
    ];

    public static $name_size = 65535;
    public static $clients_size = 2147483647;

    public function read(Request $request)
    {
        $columns = Schema::getColumnListing('data_graphs');
        $columns = array_diff($columns, ['created_at', 'updated_at']);

        DataGraphController::action($request, 'read');

        $clients_size = DataGraphController::$clients_size;
        $name_size = DataGraphController::$name_size;

        $customColumnsProperties = [
            'name' => ['type' => 'string', 'size' => $name_size], // VARCHAR max size
            'clients' => ['type' => 'number', 'size' => $clients_size] // INT max size
        ];

        $limit = $request->limit ?? 20;

        $data = [
            'columns' => $columns,
            'columns_properties' => $customColumnsProperties,
            'channels' => DataGraph::select("id", "name", "clients")
                ->paginate($limit)
        ];

        return response()->json($data, 200);
    }

    public static function find($column, $value)
    {
        $record = DataGraph::where($column, '=', $value)->first();
        if ($record === null) return false;
        return $record;
    }

    public static function customValidate($name, $clients)
    {
        $messages_name = DataGraphController::$messages_name;
        $messages_clients = DataGraphController::$messages_clients;

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
        $clients_size = DataGraphController::$clients_size;
        $name_size = DataGraphController::$name_size;

        $name = [
            'value' => $request->name,
            'pattern' => 'required|unique:data_graphs|max:' . $name_size . '|min:1|regex:/^[a-zA-Z0-9 ]*$/'
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

            DataGraphController::action($request, 'create');

            return response()->json([
                'message' => 'Channel created successfully.'
            ], 201);
        }
    }

    public function update(Request $request, $key)
    {

        $clients_size = DataGraphController::$clients_size;
        $name_size = DataGraphController::$name_size;


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
                    'message' => 'Channel you are trying to update does not exist.'
                ], 404);
            } else {

                DataGraphController::action($request, 'update', [
                    "name" => $name['value'],
                    "clients" => $clients['value'],
                    "id" => $key
                ]);

                return response()->json([
                    'message' => 'Channel updated successfully.'
                ], 200);
            }
        }
    }

    public function delete(Request $request, $key)
    {
        if (!$key) {
            return response()->json([
                'message' => 'Channel key is required.'
            ], 400);
        }

        if (!$this->find('id', $key)) {
            return response()->json([
                'message' => 'Channel you are trying to delete does not exist.'
            ], 404);
        } else {
            DataGraphController::action($request, 'delete', [
                "id" => $key
            ]);

            return response()->noContent();
        }
    }
}
