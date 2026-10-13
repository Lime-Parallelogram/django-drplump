<?php

header("Access-Control-Allow-Origin: *");

header("Content-Type:application/json");

$method = $_SERVER['REQUEST_METHOD'];

include "../mydb.php";
include "../validators.php";

if ($method == 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    $payment_id = $data["payment_id"];
    $customer_name = $data["name"];

    if (!validate_paymentID($payment_id)) {
        echo json_encode( [ "error" => "Invalid PaymentID"] );
        http_response_code(400);
        $db->close();
        return;
    }

    // Lookup details of transaction
    // Connect to database 
    $db = new MyDB();
    if (!$db) {
        http_response_code(500);
        return;
    }

    $ret = $db->querySingle("SELECT * FROM Payments WHERE PaymentUUID = '$payment_id';", true);

    if(!$ret){
        echo json_encode( [ "error" => $db->lastErrorMsg() ] );
        http_response_code(500);
        return;
    }

    $final_payment = $ret["AmountPayable"] - $ret["CardRedeemedAmount"];

    // Generate a simple text file with HTML content
    $datestring=date("Y-m-d");
    $table_prefix="
<h2>Purchase invoice</h2>
<p>Invoice Date: $datestring</p>
<table>
    <tr><th>Quantity</th><th>Line Price</th><th>Giftcard Reducations</th><th>Line Total</th><th>Reference</th></tr>
    <tr><td>1</td><td>£{$ret["AmountPayable"]}</td><td>-£{$ret["CardRedeemedAmount"]}</td><td>£$final_payment</td><td>{$ret["Reference"]}</td></tr>
</table>
<p>Grand total: <b>£$final_payment</b></p>

<p>Thank you for trusting us with your procedure. We hope you enjoy your new look.</p>";

    file_put_contents("/tmp/html.html", $table_prefix);

    // Convert file to Pdf
    $pdf_title = "DrPlumpLTD {$datestring} - {$customer_name}";
    $filename = md5($pdf_title) . ".pdf";
    $serve_filepath = "/var/www/html/legacy/payments/user_receipts_serve/$filename";

    // If a receipt has not already been generated for this user then generate one
    // OBVIOUSLY it is stupid to use sudo here. Technically there is a genuine issue because
    // www-data can't create temporary files but this is SO VULNERABLE to command injection
    if (!file_exists($serve_filepath)) {
        exec("/bin/sudo pandoc --pdf-engine weasyprint -t pdf -f html --metadata title=\"$pdf_title\" -o $serve_filepath /tmp/html.html", $stdOutput);
    }

    // Serve a link to the file and let nginx serve the file itself
    if (file_exists($serve_filepath)) {
        header("Content-Type:application/json");
        $response = [ 'success' => true, 'result_url' => "http://drplump.scot/legacy/payments/user_receipts_serve/$filename" ];
        echo json_encode($response);
    } else {
        http_response_code(500);
    }
    
} else {
    http_response_code(405);
}

?>