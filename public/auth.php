<?php
ini_set('display_errors', 0);

require __DIR__ . './../vendor/autoload.php';
use \Firebase\JWT\JWT;

header('Content-Type: application/json');

try{
	if($_SERVER["REQUEST_METHOD"] !== "POST") throw new Exception("bad request");

	$json = json_decode(file_get_contents('php://input'));
	$password = "fairyskisuki";
	$password_admin = "fairyski2018";
	$user = "general";
	$admin = "admin";
	$key = "example_key1234fairyski";
	$current_time = time();
	$expiry = $current_time + (24 * 60 * 60); 

	if($json->user === $user && $json->password === $password){
		$token = array(
			"iat" => $current_time,
			"exp" => $expiry,
			"user" => "general"
		);
		$jwt = JWT::encode($token, $key, 'HS256');
		echo json_encode(array(
			'message' => 'success',
			'jwt' => $jwt
		));
	} else if($json->user === $admin && $json->password === $password_admin){
		$token = array(
			"iat" => $current_time,
			"exp" => $expiry,
			"user" => "admin"
		);
		$jwt = JWT::encode($token, $key, 'HS256');
		echo json_encode(array(
			'message' => 'success',
			'jwt' => $jwt
		));	
	}else{
		throw new Exception("bad request");
	}
}catch(Exception $e){
	$message = $e->getMessage();
	if($message == "bad request"){
		http_response_code(400);
	} else {
		http_response_code(503);
	}
	echo '{"message":"' . $message . '"}';
}
