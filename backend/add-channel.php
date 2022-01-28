<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

require 'db_connection.php';

// POST DATA
$data = json_decode(file_get_contents("php://input"));

if (
    isset($data->channel_name)
    && isset($data->channel_clients)
    && !empty(trim($data->channel_name))
    && !empty(trim($data->channel_clients))
) {
    $channelname = mysqli_real_escape_string($conn, trim($data->channel_name));
    $channelclients = mysqli_real_escape_string($conn, trim($data->channel_clients));
    $insertChannel = mysqli_query($conn, "INSERT INTO `channels`(`channel_name`,`channel_clients`) VALUES('$channelname','$channelclients')");
    if ($insertChannel) {
        $last_id = mysqli_insert_id($conn);
          echo json_encode(["success" => 1, "msg" => "Channel Inserted.","id" => $last_id]);
      } else {
         echo json_encode(["success" => 0, "msg" => "Channel Not Inserted!"]);
      }
} else {
    echo json_encode(["success" => 0, "msg" => "Please fill all the required fields!"]);
}