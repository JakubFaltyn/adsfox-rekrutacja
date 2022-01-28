<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: GET");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

require 'db_connection.php';

$allChannels = mysqli_query($conn, "SELECT * FROM `channels`");
if (mysqli_num_rows($allChannels) > 0) {
    $all_channels = mysqli_fetch_all($allChannels, MYSQLI_ASSOC);
    echo json_encode(["success" => 1, "channels" => $all_channels]);
} else {
    echo json_encode(["success" => 0]);
}