<?php
session_start();

require_once 'connection.php';
require_once 'response.php';


if (!isset($_SESSION["user_login"]) || !isset($_SESSION['user'])) {
    response(401, "Unauthorized access.", null);
    exit();
}

// Check if the form is submitted
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    try {

        //code..

        if (!isset($_POST['patient_id'])) {
            response(422, "Patient Id can't be a blank.", null);
            exit();
        }

        if (!isset($_POST['appointment_date'])) {
            response(422, "Appointment date can't be a blank.", null);
            exit();
        }

        if (!isset($_POST['appointment_time'])) {
            response(422, "Appointment time can't be blank.", null);
            exit();
        }

        if (!isset($_POST['receptionist_id'])) {
            response(422, "Receptionist id time can't be blank.", null);
            exit();
        }

        $patient_id = mysqli_real_escape_string($conn, $_POST['patient_id']);
        $appointment_date = mysqli_real_escape_string($conn, $_POST['appointment_date']);
        $appointment_time = mysqli_real_escape_string($conn, $_POST['appointment_time']);
        $details = mysqli_real_escape_string($conn, $_POST['details']);
        $receptionist_id = mysqli_real_escape_string($conn, $_POST['receptionist_id']);

        $query = "INSERT INTO appointments (patient_id, appointment_date, appointment_time, created_by, details) VALUES ('$patient_id', '$appointment_date', '$appointment_time','$receptionist_id','$details')";
        if ($conn->query($query) === TRUE) {
            response(200, "Appointment Successfully added.", $_POST);
            exit();
        } else {
            response(400, "Appointment not added.", null);
            exit();
        }

    } catch (Exception $e) {
        response(500, "Internal server error.");
        exit();
    }
}
