<?php
header('Content-Type: application/json; charset=utf-8');

$date = new DateTime();

echo json_encode([
    'datetime' => $date->format('d.m.Y H:i:s'),
    'timestamp' => $date->getTimestamp()
], JSON_UNESCAPED_UNICODE);
