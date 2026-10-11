<?php

header("Access-Control-Allow-Origin: *");

header("Content-Type:application/json");

$method = $_SERVER['REQUEST_METHOD'];

if ($method == 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    $customer_ref=$data["customer_ref"];

    // Validate Customer Reference
    if ($customer_ref == null) {
        echo json_encode( [ "error" => "Must provide a customer reference."] );
        http_response_code(400);
        return;
    }
    
    $db = new MyDB();
    if (!$db) {
        http_response_code(500);
        return;
    }

    $ret = $db->query("SELECT * FROM Payments WHERE CustomerReference = '$customer_ref';");

    if(!$ret){
        echo json_encode( [ "error" => $db->lastErrorMsg() ] );
        http_response_code(500);
    } else {
        $full_results = [];
        while ($row = $ret->fetchArray(SQLITE3_ASSOC)) {
            array_push($full_results, $row);
        }

        echo json_encode( [ "results" =>  $full_results] );
        http_response_code(200);
    }

    $db->close();

    
} else {
    http_response_code(405);
}

?>