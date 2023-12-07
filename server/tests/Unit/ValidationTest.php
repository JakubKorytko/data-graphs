<?php

namespace Tests\Unit;

use App\Http\Controllers\AcquisitionChannelController;
use App\Models\AcquisitionChannel;
use GuzzleHttp\Psr7\Request;
use Tests\TestCase;

class ValidationTest extends TestCase
{
    /**
     * A basic unit test example.
     */
    public function test_find(): void
    {
        $column = "name";
        $value = "test";

        $record_where = AcquisitionChannel::where($column, '=', $value)->first();
        $record_find = AcquisitionChannelController::find($column, $value);

        if ($record_where === null) {
            $this->assertTrue($record_find === false);
        } else {
            $this->assertTrue($record_find !== false);
        }
    }

    public function test_action(): void
    {
        $request = new \Illuminate\Http\Request();
        
        $request->replace(["test" => "true"]);

        $res = AcquisitionChannelController::action($request, "create");

        $this->assertTrue($res);
    }

    public function test_validation(): void
    {
        $clients_size = AcquisitionChannelController::$clients_size;
        $name_size = AcquisitionChannelController::$name_size;

        $name = [
            'pattern' => 'required|max:' . $name_size . '|min:1|regex:/^[a-zA-Z0-9 ]*$/'
        ];

        $clients = [
            'pattern' => 'required|integer|max:' . $clients_size . '|min:0'
        ];


        $testData = [
            "name" => [
                "correct" => ["test", "test 123", "test test abc"],
                "incorrect" => ["test!", "t@!#", ""]
            ],
            "clients" => [
                "correct" => [0, 1, 100, 1000],
                "incorrect" => [-1, "test", 1.5]
            ]
        ];

        foreach ($testData as $key => $value) {

            foreach ($value["correct"] as $correct) {
                $data = [$key === "name" ? $correct : "abc", $key === "clients" ? $correct : 0];
                $name = [...$name, "value" => $data[0]];
                $clients = [...$clients, "value" => $data[1]];

                $this->assertTrue(AcquisitionChannelController::customValidate($name, $clients) === true);
            }

            foreach ($value["incorrect"] as $incorrect) {
                $data = [$key === "name" ? $incorrect : "abc", $key === "clients" ? $incorrect : 0];
                $name = [...$name, "value" => $data[0]];
                $clients = [...$clients, "value" => $data[1]];

                $this->assertTrue(AcquisitionChannelController::customValidate($name, $clients) !== true);
            }
        }


    }
}
