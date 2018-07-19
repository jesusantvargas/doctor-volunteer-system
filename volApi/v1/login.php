<?php
  // Connect to database
  include("../connection.php");
  $db = new dbObj();
  $connection =  $db->getConnstring();
 
  $request_method=$_SERVER["REQUEST_METHOD"];
  header('Access-Control-Allow-Headers');

  switch($request_method)
  {
    case 'POST':
    login();
    break;
    default:
    // Invalid Request Method
    header("HTTP/1.0 405 Method Not Allowed");
    break;
  }

  function login ()
  {
    global $connection;

    $data = json_decode(file_get_contents('php://input'), true);
    $uid=$data["email"];
    $pwd=$data["password"];

    $query="SELECT * FROM users 
            WHERE user_email='$uid' AND user_pwd='$pwd'";
    $response=array();
    $result=mysqli_query($connection, $query);
    while($row=mysqli_fetch_assoc($result))
    {
    $response[]=$row;
    }
    header('Content-Type: application/json');
    echo json_encode($response);
  }
?>