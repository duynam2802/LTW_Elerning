<?php
require 'connect.php'; // File kết nối PDO

$sql = "SELECT first_name, last_name, job_id, salary
        FROM employees
        WHERE first_name LIKE 'S%'";

$stmt = $pdo->query($sql);

echo "<h3>Nhân viên có tên bắt đầu bằng chữ 'S':</h3><ul>";
echo "<table border='1' cellpadding='5' cellspacing='0'>";
echo "<tr><th>first_name</th><th>last_name</th><th>job_id</th><th>salary</th></tr>";
while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
    echo "<tr>";
    echo "<td>{$row['first_name']}</td>";
    echo "<td>{$row['last_name']}</td>";
    echo "<td>{$row['job_id']}</td>";
    echo "<td>{$row['salary']}</td>";
    echo "</tr>";
}
echo "</table>";
echo "</ul>";
?>