<?php

include "../validators.php";

header("Access-Control-Allow-Origin: *");

header("Content-Type:application/json");

$method = $_SERVER['REQUEST_METHOD'];

if ($method == 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    $code=$data["code"];

    // Validate GiftCard Format
    if (!validate_giftcard($code)) {
        echo json_encode( [ "valid" => false ] );
        http_response_code(200);
        return;
    }
    
    // Connect to a local database
    class MyDB extends SQLite3 {
      function __construct() {
         $this->open('/opt/drplump_legacy/legacy_payments.db', SQLITE3_OPEN_READWRITE | SQLITE3_OPEN_CREATE);
      }
    }
    $db = new MyDB();
    if (!$db) {
        http_response_code(500);
        return;
    }
    

    // Lookup value in database
    $value = $db->querySingle("SELECT OriginalValue FROM GiftCards WHERE CardCode = '$code';");

    if ($value === null) {
        echo json_encode( [ "valid" => false ] );
        http_response_code(200);
        $db->close();
        return;
    }

    // Giftcard is valid
    $value_redeemed = $db->querySingle("SELECT SUM(CardRedeemedAmount) AS UsedValue FROM Payments WHERE CardRedeemed = '$code';");
    $value_remaining = $value - $value_redeemed;

    echo json_encode([
        "valid" => true,
        "value" => $value,
        "value_remaining" => $value_remaining
    ]);
    http_response_code(200);

    $db->close();

    
} else {
    http_response_code(405);
}

?>