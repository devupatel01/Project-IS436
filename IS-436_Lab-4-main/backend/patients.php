<?php
session_start();

require_once 'connection.php';
require_once 'response.php';


if (!isset($_SESSION["user_login"]) || !isset($_SESSION['user'])) {
    response(401, "Unauthorized access.", null);
    exit();  
}

// Check if the form is submitted
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    try {

        $query = "SELECT * FROM patients order by id desc";
        $result = $conn->query($query);

        $patients = array();
        while ($row = $result->fetch_assoc()) {
            $patients[] = $row;
        }   

        response(200,"Patiets Retrived.", $patients);
        exit();
        
    } catch (Exception $e) {
        response(500, "Internal server error.");
        exit();
    }
}
