<?php


session_start();
require_once "response.php";

session_destroy();

response(200, "User successfully logged out.", null);



?>