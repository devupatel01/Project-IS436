<?php
session_start();

require_once 'connection.php';
require_once 'response.php';
$response = array();

// Check if the form is submitted
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    try {
        //code..
        if (!isset($_POST['username'])) {
            response(422, "Username can't be a blank.", null);
            exit();
        }

        if (!isset($_POST['password'])) {
            response(422, "Password can't be blank.", null);
            exit();
        }

        $username = mysqli_real_escape_string($conn, $_POST['username']);
        $password = mysqli_real_escape_string($conn, $_POST['password']);

        // Query to check if the user exists
        $query = "SELECT * FROM receptionists WHERE username='$username'";
        $result = $conn->query($query);

        if ($result->num_rows == 1) {
            $user = $result->fetch_assoc();
            // Verify the password
            if (md5($password) == $user['password']) {
                // Password is correct, start a session

                unset($user["password"]);
                $_SESSION['user'] = $user;
                $_SESSION['user_login'] = true;

                response(200, "User successfully logged in.", array("user" => $user));
                exit();
            } else {
                response(422, "Incorrect password.", null);
                exit();
            }
        } else {
            response(404, "Username not found.", null);
            exit();
        }

    } catch (Exception $e) {
        response(500, "Internal server error.");
        exit();
    }
}
