<?php
// PHP Script to create password file

echo('Set the password for Admin User: ');
$admin = password_hash(trim(fgets(STDIN)), PASSWORD_BCRYPT);
echo('Set the password for General User: ');
$general = password_hash(trim(fgets(STDIN)), PASSWORD_BCRYPT);
echo('Set the key for JWT: ');
$key = trim(fgets(STDIN));

$array = [
	'admin' => $admin,
	'general' => $general,
	'key' => $key
];

file_put_contents(__DIR__ . './../data/passwords.json', json_encode($array));
echo('Finished generating file!\n');
