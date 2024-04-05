<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\ContentMetadata;
use App\Models\ImageData;

class DeleteExpiredCSFiles extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'delete:expired-cs-files';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Deletes expired content store files';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        info("Cron Job running at ". now());
        
        // Get all expired content
        $expiredContent = ContentMetadata::getExpiredContentMetadata();
        info("Total expired content found: ". count($expiredContent));

        $count = 0;
        foreach($expiredContent as $content){
            if( $content->is_image ) {
               //delete all expired images
               $response = ImageData::deleteImageData($content->content_id);
            } else {
               // delete video url functionality will go here
            }
            //delete from contentMetadata table
            if($response){
                $resp = ContentMetadata::deleteContentMetadata($content->content_id);
                $count += ($resp) ? 1 : 0;
            }
        }
        info("Total expired content deleted: ". $count);
    }
}
