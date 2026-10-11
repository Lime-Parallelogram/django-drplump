<?php

header("Access-Control-Allow-Origin: *");

header("Content-Type:application/json");

$method = $_SERVER['REQUEST_METHOD'];

$PAYMENT_PROCESSOR_SECRET = "supersecretconstant";

if ($method == 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    $amount=$data["amount"];
    $payment_hash=$data["payment_hash"];
    $customer_ref = $data["customer_ref"];
    $payment_ref = $data["payment_ref"];

    // Check customer_ref and payment_ref exist
    if ($customer_ref == null || $payment_ref == null) {
        echo json_encode( [ "error" => "No customer/payment_ref submitted."] );
        http_response_code(400);
        return;
    }

    // Validate Amount
    if (!is_numeric($amount)) {
        echo json_encode( [ "error" => "Invalid amount submitted."] );
        http_response_code(400);
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

    // The gift-card may be null
    $redeem_amount = 0;
    if (array_key_exists("gift_card", $data)) {
        $gift_card=$data["gift_card"];

        // Validate Giftcard code
        if (preg_match("/PLUMP-[0-9]{8}-[0-9]{4}/i", $gift_card) === false) {
            echo json_encode( [ "error" => "Invalid Gift Card Code"] );
            http_response_code(400);
            $db->close();
            return;
        }

        // Lookup original value
        $value = $db->querySingle("SELECT OriginalValue FROM GiftCards WHERE CardCode = '$gift_card';");

        if ($value === null) {
            echo json_encode( [ "error" => "Invalid Gift Card Code"] );
            http_response_code(400);
            $db->close();
            return;
        }

        // Giftcard is valid
        $value_redeemed = $db->querySingle("SELECT SUM(CardRedeemedAmount) AS UsedValue FROM Payments WHERE CardRedeemed = '$gift_card';");
        $redeem_amount = ($value_redeemed !== null) ? min($value - $value_redeemed, $amount) : min($value, $amount);
    }

    // Check that hash value matches
    $expected_hash = sha1(($amount - $redeem_amount) . $PAYMENT_PROCESSOR_SECRET);
    if ($expected_hash !== $payment_hash) {
        echo json_encode( [ "error" => "Invalid payment hash. Payment rejected"] );
        http_response_code(400);
        $db->close();
        return;
    }

    $payment_uuid = uniqid();

    $ret = $db->exec("INSERT INTO Payments (PaymentUUID, AmountPayable, PaymentHash, CardRedeemed, CardRedeemedAmount, CustomerReference, Reference)
                      VALUES ('$payment_uuid', $amount, '$payment_hash', '$gift_card', $redeem_amount, '$customer_ref', '$payment_ref');");
    if(!$ret){
        echo json_encode( [ "error" => $db->lastErrorMsg() ] );
        http_response_code(500);
    } else {
        echo json_encode( [ "payment_id" => $payment_uuid ] );
        http_response_code(200);
    }

    $db->close();

    
} else {
    http_response_code(405);
}

?>