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

        if (!isset($_GET['patient_id'])) {
            response(422, "Patient_id can't be a blank.", null);
            exit();
        }

        $patient_id = mysqli_real_escape_string($conn, $_GET['patient_id']);

        $query = "SELECT * FROM patients where id='$patient_id'";
        $result = $conn->query($query);


        if ($result->num_rows == 1) {
            $patient = $result->fetch_assoc();
            // Verify the password

            $appointments = array();
            $query = "SELECT id,DATE_FORMAT(created_at, '%m/%d/%Y') as created_at,  DATE_FORMAT(appointment_date, '%m/%d/%Y') as appointment_date, DATE_FORMAT(appointment_time, '%h:%i:%s %p') as appointment_time, details   FROM appointments where patient_id='$patient_id' ORDER BY id DESC";
            $presult = $conn->query($query);
            while ($row = $presult->fetch_assoc()) {
                $appointments[] = $row;
            }

            $patient["appointments"] = $appointments;

            response(200, "Patient details retrived.", $patient);
            exit();
        } else {
            response(404, "Patient not found.", null);
            exit();
        }

    } catch (Exception $e) {
        response(500, "Internal server error.");
        exit();
    }
}
