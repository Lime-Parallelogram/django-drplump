<?php

header("Access-Control-Allow-Origin: *");

header("Content-Type:application/json");

$method = $_SERVER['REQUEST_METHOD'];

$PAYMENT_PROCESSOR_SECRET = "supersecretconstant";

if ($method == 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    $amount=$data["amount"];
    $payment_id=$data["payment_id"];

    // Validate Amount
    if (!is_numeric($amount)) {
        echo json_encode( [ "error" => "Invalid amount submitted."] );
        http_response_code(400);
        return;
    }

    // Validate Payment ID format
    if (preg_match("/[0-9a-z]{13}/i", $payment_id) === false) {
        echo json_encode( [ "error" => "Invalid PaymentID"] );
        http_response_code(400);
        $db->close();
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
    

    // Lookup to check a payment exists
    $paymentValue = $db->querySingle("SELECT AmountPayable FROM Payments WHERE PaymentUUID = '$payment_id';");

    // Lookup to check this payment hasn't already been used for a GiftCard
    // Yes, this doesn't check that the payment isn't associated with an actual service
    $giftCardCode = $db->querySingle("SELECT CardCode FROM GiftCards WHERE PaymentID = '$payment_id';");

    if ($giftCardCode !== null && $paymentValue == $amount) {
        echo json_encode( [ "error" => "Submitted payment ID is invalid."] );
        http_response_code(400);
        $db->close();
        return;
    }

    // Giftcard purchase is authorized

    // Purchase timestamp
    $purchase_timestamp = date_timestamp_get(date_create());
    $expire_timestamp = $purchase_timestamp + 365 * 24 * 3600;

    // Generate a new Card Code
    do {
        $integer = sprintf("%04d", random_int(0, 9999));
        $date = date_format(date_create(), "Ymd");
        $new_code = "PLUMP-$date-$integer";
    } while ($db->querySingle("SELECT CardCode FROM GiftCards WHERE CardCode = '$new_code';") !== null);

    $ret = $db->exec("INSERT INTO GiftCards (CardCode, OriginalValue, PurchaseTimestamp, ValidUntilTimestamp, PaymentID)
                      VALUES ('$new_code', $amount, $purchase_timestamp, $expire_timestamp, '$payment_id');");
    if(!$ret){
        echo json_encode( [ "error" => $db->lastErrorMsg() ] );
        http_response_code(500);
    } else {
        echo json_encode( [ "code" => $new_code ] );
        http_response_code(200);
    }

    $db->close();

    
} else {
    http_response_code(405);
}

?>