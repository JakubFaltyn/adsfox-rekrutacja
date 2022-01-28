<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

require 'db_connection.php';

$data = json_decode(file_get_contents("php://input"));

if (
    isset($data->id)
    && isset($data->channel_name)
    && isset($data->channel_clients)
    && is_numeric($data->id)
    && !empty(trim($data->channel_name))
    && !empty(trim($data->channel_clients))
) {
    $channelname = mysqli_real_escape_string($conn, trim($data->channel_name));
    $channelclients = mysqli_real_escape_string($conn, trim($data->channel_clients));
    $updateChannel = mysqli_query($conn, "UPDATE `channels` SET `channel_name`='$channelname', `channel_clients`='$channelclients' WHERE `id`='$data->id'");
      if ($updateChannel) {
          echo json_encode(["success" => 1, "msg" => "Channel Updated."]);
     } else {
         echo json_encode(["success" => 0, "msg" => "Channel Not
         Updated!"]);
    }
} else {
    echo json_encode(["success" => 0, "msg" => "Please fill all the required fields!"]);
}