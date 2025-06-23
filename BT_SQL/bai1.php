<?php
require 'connect.php'; // File kết nối PDO

$sql = "SELECT first_name, last_name, job_id, salary
        FROM employees
        WHERE first_name LIKE 'S%'";

$stmt = $pdo->query($sql);

echo "<h3>Nhân viên có tên bắt đầu bằng chữ 'S':</h3><ul>";
while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
    echo "<li>{$row['first_name']} {$row['last_name']} - Công việc: {$row['job_id']} - Lương: {$row['salary']}</li>";
}
echo "</ul>";
?>
