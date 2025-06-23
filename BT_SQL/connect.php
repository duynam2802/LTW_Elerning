<?php
// Bước 1: Thông tin kết nối
$host = 'localhost';
$dbname = 'hr';
$username = 'root';
$password = '';

try {
    // Bước 2: Kết nối PDO
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    echo "<h3>Kết nối thành công!</h3>";


} catch (PDOException $e) {
    echo "Kết nối thất bại: " . $e->getMessage();
}

?>
