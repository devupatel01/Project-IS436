<?php

session_start();
require_once "response.php";

if (isset($_SESSION["user_login"]) && isset($_SESSION['user'])) {
    response(200, "User already logged in.", array("logged_in" => true, "user" => $_SESSION['user']));
} else {
    response(200, "User already logged out.", array("logged_in" => false, "user" => array()));
}

?>