<?php
require 'connect.php';

$sql = "
    SELECT 
        MAX(salary) AS max_salary,
        MIN(salary) AS min_salary,
        ROUND(AVG(salary)) AS avg_salary
    FROM 
        employees
";

$stmt = $pdo->query($sql);
$row = $stmt->fetch(PDO::FETCH_ASSOC);

echo "<h3>Mức lương lớn nhất, nhỏ nhất và trung bình:</h3>";
echo "<table border='1' cellpadding='5' cellspacing='0'>";
echo "<tr>
        <th>Lương cao nhất</th>
        <th>Lương thấp nhất</th>
        <th>Lương trung bình</th>
      </tr>";

echo "<tr>
        <td>{$row['max_salary']}</td>
        <td>{$row['min_salary']}</td>
        <td>{$row['avg_salary']}</td>
      </tr>";

echo "</table>";
?>
