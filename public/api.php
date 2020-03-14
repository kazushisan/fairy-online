<?php
ini_set('display_errors', 0);

require __DIR__ . './../vendor/autoload.php';
use \Firebase\JWT\JWT;

header('Content-Type: application/json; charset=utf-8');

try{
	$passwords_file = json_decode(file_get_contents('../data/passwords.json'));
	$key = $passwords_file->key;
	$headers = getallheaders();
	$authorization = $headers['Authorization'];
	$jwt = explode(' ', $authorization)[1];
	$token = JWT::decode($jwt, $key, array('HS256'));
	switch($_SERVER["REQUEST_METHOD"]){
		case "POST":
			$filepath = '../data/events.json';
			$file = fopen($filepath, 'r+');
			if(!flock($file, LOCK_SH)) throw new Exception('accessed by diffrent user');
			$input = json_decode(file_get_contents('php://input'), true);
			$events = json_decode(fread($file, filesize($filepath)),true);
			switch($input["type"]){
				case "remove_event":
					if($token->user !== "admin") throw new Exception("bad request");
					$id_list = array_column($events, 'id');
					$i = array_search($input["eventId"], $id_list);
					array_splice($events, $i, 1);
					break;
				case "edit_event":
					if($token->user !== "admin") throw new Exception("bad request");
					$id_list = array_column($events, 'id');
					$i = array_search($input["eventId"], $id_list);
					$events[$i] = $input["data"];
					break;
				case "add_event":
					if($token->user !== "admin") throw new Exception("bad request");
					$events[] = $input["data"];
					break;
				case "add_participant":
					$id_list = array_column($events, 'id');
					$i = array_search($input["eventId"], $id_list);
					$events[$i]["participants"][] = $input["data"];
					break;
				case "remove_participant":
					$id_list = array_column($events, 'id');
					$i = array_search($input["eventId"], $id_list);
					$participant_id_list = array_column($events[$i]["participants"], 'id');
					$participant_i = array_search($input["participantId"], $participant_id_list);
					array_splice($events[$i]["participants"], $participant_i, 1);
					break;
			}
			$events = json_encode($events, JSON_UNESCAPED_UNICODE);
			ftruncate($file, 0);
			rewind($file);
			fwrite($file, $events);
			fclose($file);
			echo $events;
			break;
		case "GET":
			if($_GET["file"]){
				$file = str_replace('/','',$_GET["file"]);
				readfile('../data/'. $file);
			} else {
				readfile('../data/events.json');
			}
			break;
	}
}catch(Exception $e){
	$message = $e->getMessage();
	if($message == "accessed by diffrent user" || $message == "failed file operation"){
		http_response_code(503);
		echo '{"message":"' . $message . '"}';
	} else {
		http_response_code(400);
		echo '{"message":"' . $message . '"}';
	}
}
