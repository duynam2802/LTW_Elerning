<?php
require 'connect.php';

$sql = "
    SELECT 
        CONCAT(first_name, ' ', last_name) AS full_name,
        salary,
        CASE
            WHEN salary >= 2000 AND salary < 5000 THEN 'low'
            WHEN salary >= 5000 AND salary < 10000 THEN 'mid'
            ELSE 'high'
        END AS salary_group
    FROM employees
    ORDER BY full_name ASC
";

$stmt = $pdo->query($sql);

echo "<h3>Phân nhóm nhân viên theo mức lương:</h3>";
echo "<table border='1' cellpadding='5' cellspacing='0'>";
echo "<tr>
        <th>Tên nhân viên</th>
        <th>Lương</th>
        <th>Nhóm lương</th>
      </tr>";

while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
    echo "<tr>
            <td>{$row['full_name']}</td>
            <td>{$row['salary']}</td>
            <td>{$row['salary_group']}</td>
          </tr>";
}

echo "</table>";
?>
