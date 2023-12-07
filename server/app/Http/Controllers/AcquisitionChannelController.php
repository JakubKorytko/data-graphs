<?php

namespace App\Http\Controllers;
use App\Models\AcquisitionChannel;
use Illuminate\Support\Facades\Schema;
use Illuminate\Http\Request;

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
            'channels' => AcquisitionChannel::orderBy('name','desc')->paginate($limit)
        ];

        return response()->json($data, 200);
    }

    public function create(Request $request)
    {
        $result = $request->validate([
            'name' => 'required'
        ]);

        $result['amount'] = $result['amount'] ?? 0;
        
        AcquisitionChannel::create($request->post());

        return response()->json([
            'message' => 'Channel created successfully'
        ], 201);
    }

    public function update(Request $request, AcquisitionChannel $channel)
    {
        $request->validate([
            'name' => 'required',
            'amount' => 'required'
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
