<?php
    // Connect to a local database
    class MyDB extends SQLite3 {
      function __construct() {
         $this->open('/opt/drplump_legacy/legacy_payments.db', SQLITE3_OPEN_READWRITE | SQLITE3_OPEN_CREATE);
      }
    }
?>