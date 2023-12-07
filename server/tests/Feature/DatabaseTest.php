<?php

namespace Tests\Feature;

use Error;
use Illuminate\Support\Facades\DB;
use Tests\TestCase;

use function PHPUnit\Framework\assertTrue;

class DatabaseTest extends TestCase
{
    /**
     * A basic feature test example.
     */
    public function test_database_operations(): void
    {

        DB::transaction(function () {

            DB::statement('CREATE TEMPORARY TABLE IF NOT EXISTS `tempChannels` LIKE `acquisition_channels`');

            $condition = 'name >= "test" AND name <= "test1000"';

            $testChannels = DB::select('select name from tempChannels where ' . $condition);

            $freeName = 0;

            for ($i=0; $i<1000; $i++) {
                $free = true;
                foreach($testChannels as $channel) {
                    if ($channel->name === $i) {
                        $free = false;
                        break;
                    }
                }
                if ($free) {
                    $freeName = $i;
                    break;
                }
            }

            if ($freeName === 1000) throw new Error("No free name found. Please delete some test channels.");

            DB::insert('insert into tempChannels (id, name, clients) values (?, ?, ?)', [null, 'test' . $freeName, 0]);
            
            $found = DB::table('tempChannels')->select('id')->where('name', '=', 'test' . $freeName)->first();

            assertTrue($found !== null);

            $affected = DB::update('update tempChannels set clients = 100 where name = ?', ['test' . $freeName]);

            assertTrue($affected === 1);

            $deleted = DB::delete('delete from tempChannels where name = ?', ['test' . $freeName]);

            assertTrue($deleted === 1);

            DB::statement('DROP TEMPORARY TABLE IF EXISTS `tempChannels`');

        });

        DB::rollBack();
    }
}
