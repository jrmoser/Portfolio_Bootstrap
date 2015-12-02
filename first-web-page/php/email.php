<?php

$firstName = $_POST['firstName'];
$lastName = $_POST['lastName'];
$email = $_POST['email'];
$phone = $_POST['phone'];
$message = $_POST['message'];

$body = '$firstName $lastName \n\n $email \n\n $phone \n\n $message'

mail('jarodmoser@gmail.com','New Contact from Web page', $body, 'From: $email')

echo "Message Sent!"
>