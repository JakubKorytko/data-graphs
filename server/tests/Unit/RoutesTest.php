<?php

namespace Tests\Unit;

use Tests\TestCase;
use App\Http\Controllers\DataGraphController;

class RoutesTest extends TestCase
{

    public static string $parameter = "?test=true";

    public function test_healthcheck_route(): void
    {
        $response = $this->get('/status');

        $response->assertStatus(200);
    }

    public function test_data_read_route(): void {

        $response = $this->get("/channels/read");

        $response->assertStatus(200);
        $response->assertJsonStructure([
            'columns',
            'columns_properties',
            'channels'
        ]);
        $response->assertJsonFragment(
            [
                'columns' => [
                    'id',
                    'name',
                    'clients'
                ],
                'columns_properties' => [
                    'name' => [
                        'type' => 'string',
                        'size' => DataGraphController::$name_size
                    ],
                    'clients' => [
                        'type' => 'number',
                        'size' => DataGraphController::$clients_size
                    ]
                ]
            ]
        );
    }

    public function test_data_create_route(): void {

        $try = -1;
        $max_try = 1000;
        $res = true;

        while($try<$max_try && $res) {
            $try++;
            $res = DataGraphController::find("name", "test".$try);
        }

        $response = $this->post("/channels/create".RoutesTest::$parameter, [
            'name' => 'test'.$try,
            'clients' => 0
        ]);

        if ($try === $max_try)
            $response->assertStatus(400);
        else
            $response->assertStatus(201);
    }

    public function test_data_update_route(): void {

            $try = -1;
            $max_try = 1000;
            $res = false;

            while($try<$max_try && !$res) {
                $try++;
                $res = DataGraphController::find("id", $try);
            }

            $url = "/channels/update/".($try === $max_try ? -1 : $try).RoutesTest::$parameter;

            $response = $this->put($url, [
                'name' => 'test',
                'clients' => 0
            ]);

            if ($try === $max_try)
                $response->assertStatus(404);
            else
                $response->assertStatus(200);
    }

    public function test_data_delete_route(): void {

            $try = -1;
            $max_try = 1000;
            $res = false;

            while($try<$max_try && !$res) {
                $try++;
                $res = DataGraphController::find("id", $try);
            }

            $url = "/channels/delete/".($try === $max_try ? -1 : $try).RoutesTest::$parameter;

            $response = $this->delete($url);

            if ($try === $max_try)
                $response->assertStatus(404);
            else
                $response->assertStatus(204);
    }
}
