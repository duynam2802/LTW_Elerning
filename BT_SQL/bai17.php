<?php
$host = 'localhost';
$dbname = 'hr';
$username = 'root';
$password = '';

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    echo "<h3>Kết nối thành công!</h3>";

    // Truy vấn nhân viên gia nhập sau ngày 15
    $sql = "SELECT employee_id, first_name, last_name, hire_date
            FROM employees
            WHERE DAY(hire_date) > 15";

    $stmt = $pdo->query($sql);

    echo "<h3>Danh sách nhân viên gia nhập sau ngày 15</h3>";
    echo "<table border='1' cellpadding='8' cellspacing='0'>";
    echo "<tr><th>ID</th><th>First Name</th><th>Last Name</th><th>Hire Date</th></tr>";

    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
        echo "<tr>";
        echo "<td>{$row['employee_id']}</td>";
        echo "<td>{$row['first_name']}</td>";
        echo "<td>{$row['last_name']}</td>";
        echo "<td>{$row['hire_date']}</td>";
        echo "</tr>";
    }

    echo "</table>";

} catch (PDOException $e) {
    echo "Kết nối thất bại: " . $e->getMessage();
}
?>
