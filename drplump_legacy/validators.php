<?php

function validate_giftcard($code) {
    return !(preg_match("/PLUMP-[0-9]{8}-[0-9]{4}/i", $code) === false);
}

function validate_paymentID($payment_id) {
    return !(preg_match("/[0-9a-z]{13}/i", $payment_id) === false);
}

?>