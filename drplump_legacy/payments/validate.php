<?php

header("Access-Control-Allow-Origin: *");

header("Content-Type:application/json");

$method = $_SERVER['REQUEST_METHOD'];

include "../validators.php";
include "../mydb.php";

if ($method == 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);

    $payment_id = $data["payment_id"];
    $amount = $data["amount"];



    // Validate Payment ID
    if (!validate_paymentID($payment_id)) {
        echo json_encode( [ "error" => "Payment ID is automatically invalid."] );
        http_response_code(400);
        return;
    }

    // Validate Amount
    if (!is_numeric($amount)) {
        echo json_encode( [ "error" => "Invalid amount submitted."] );
        http_response_code(400);
        return;
    }
    
    $db = new MyDB();
    if (!$db) {
        http_response_code(500);
        return;
    }

    $ret = $db->querySingle("SELECT * FROM Payments WHERE PaymentUUID = '$payment_id';");

    if($ret === false){
        echo json_encode( [ "error" => $db->lastErrorMsg() ] );
        http_response_code(500);
        $db->close();
        return;
    }

    if ($ret == null) {
        echo json_encode( [ "valid" => false ] );
    } else {
        echo json_encode( [ "valid" => true ] );
    }

    $db->close();

    http_response_code(200);
    return;

    
} else {
    http_response_code(405);
}

?>