<?php
require 'connect.php';

$sql = "SELECT CONCAT(first_name, ' ', last_name) AS employee_name, hire_date 
        FROM employees 
        WHERE MONTH(hire_date) = 8 AND YEAR(hire_date) = 1994";

echo "<h2>Câu 12 - Nhân viên gia nhập tháng 08/1994</h2>";

try {
    $stmt = $pdo->query($sql);

    echo "<table border='1' cellpadding='8' cellspacing='0'>";
    echo "<tr><th>Employee Name</th><th>Hire Date</th></tr>";

    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
        echo "<tr><td>{$row['employee_name']}</td><td>{$row['hire_date']}</td></tr>";
    }

    echo "</table>";
} catch (PDOException $e) {
    echo "Lỗi: " . $e->getMessage();
}
?>
