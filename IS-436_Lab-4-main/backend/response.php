<?php

function response($status, $message, $data = null)
{
    http_response_code($status);
    header('Content-Type: application/json');
    echo json_encode(array("status" => $status, "message" => $message, "data" => $data));
}


?>