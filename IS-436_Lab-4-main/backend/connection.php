<?php
// Database connection details
$servername = "studentdb-maria.gl.umbc.edu";
$username = "RT65774";
$password = "RT65774";
$dbname = "RT65774";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Set the character set to UTF-8
mysqli_set_charset($conn, "utf8");

?>
