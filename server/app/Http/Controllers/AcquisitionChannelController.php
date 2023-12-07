<?php

namespace App\Http\Controllers;
use App\Models\AcquisitionChannel;
use Illuminate\Support\Facades\Schema;
use Illuminate\Http\Request;
use App\Http\Requests\CreateRequest;

class AcquisitionChannelController extends Controller
{
    public function read(Request $request)
    {
        $columns = Schema::getColumnListing('acquisition_channels');
        $columns = array_diff($columns, ['created_at', 'updated_at']);

        $customColumnsProperties = [
            'name' => ['type' => 'string', 'size' => 65535], // VARCHAR max size
            'clients' => ['type' => 'number', 'size' => 2147483647] // INT max size
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

    public function find($column, $value) {
        $record = AcquisitionChannel::where($column, '=', $value)->first();
        if ($record === null) return false;
        return $record;
    }

    public function create(CreateRequest $request)
    {

        // $messages = [
            // 'required' => 'The :attribute field is required.',
            // 'size' => 'The :attribute must be exactly :size.',
            // 'between' => 'The :attribute value :input is not between :min - :max.',
            // 'in' => 'The :attribute must be one of the following types: :values',
        // ];

        // $result = $request->validate([
        //     'name' => 'required|unique:acquisition_channels|max:65535|min:1|regex:/^[a-zA-Z0-9 ]*$/',
        //     'clients' => 'required|integer|max:2147483647|min:0',
        // ]);

        // if ($this->find('name', $request['name'])) {
        //     return response()->json([
        //         'message' => 'Channel already exists'
        //     ], 409);
        // }

        $request['clients'] = $request['clients'] ?? 0;
        
        AcquisitionChannel::create($request->post());

        return response()->json([
            'message' => 'Channel created successfully'
        ], 201);
    }

    public function update(Request $request, AcquisitionChannel $channel)
    {
        $request->validate([
            'name' => 'required',
            'clients' => 'required'
        ]);

        $channel->fill($request -> post())->save();

        return response()->json([
            'message' => 'Channel updated successfully'
        ], 200);
    }

    public function delete(Request $request)
    {
        $request->validate([
            'id' => 'required'
        ]);

        $target = AcquisitionChannel::where('id', $request->id)->get()->first();
        $target->delete();

        return response()->noContent();
    }
}
