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

        $query = "SELECT COUNT(*) as count FROM patients";
        $result = $conn->query($query);
        $patient = $result->fetch_assoc();

        $date = date("Y-m-d");

        $query = "SELECT COUNT(*) as count FROM appointments where appointment_date='$date'";
        $aresult = $conn->query($query);
        $appointments = $aresult->fetch_assoc();

        $result = array(
            "total_patients" => $patient["count"],
            "total_appointments" => $appointments["count"],
        );

        response(200, "dashboard data retrived", $result);
        exit();

    } catch (Exception $e) {
        response(500, "Internal server error.");
        exit();
    }
}
