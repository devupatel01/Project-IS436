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
        if (!isset($_POST['first_name'])) {
            response(422, "Firstname can't be a blank.", null);
            exit();
        }

        if (!isset($_POST['last_name'])) {
            response(422, "Last name can't be blank.", null);
            exit();
        }

        $first_name = mysqli_real_escape_string($conn, $_POST['first_name']);
        $last_name = mysqli_real_escape_string($conn, $_POST['last_name']);
        $email = mysqli_real_escape_string($conn, $_POST['email']);
        $mobile_number = mysqli_real_escape_string($conn, $_POST['mobile_number']);
        $details = mysqli_real_escape_string($conn, $_POST['details']);
        $symptoms = mysqli_real_escape_string($conn, $_POST['symptoms']);
        $receptionist_id = mysqli_real_escape_string($conn, $_POST['receptionist_id']);

        $query = "INSERT INTO patients (first_name, last_name, email, mobile_number, details, symptoms, created_by) VALUES ('$first_name', '$last_name', '$email','$mobile_number', '$details', '$symptoms', '$receptionist_id')";
        // echo "" . $query . "";
        if ($conn->query($query) === TRUE) {
            response(200, "Patient Successfully added.", $_POST);
            exit();
        } else {
            response(400, "Patient not added.", null);
            exit();
        }

    } catch (Exception $e) {
        response(500, "Internal server error.");
        exit();
    }
}
