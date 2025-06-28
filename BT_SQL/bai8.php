<?php
require 'connect.php';

$sql = "
    SELECT 
        YEAR(hire_date) AS hire_year,
        COUNT(*) AS employee_count
    FROM 
        employees
    GROUP BY 
        YEAR(hire_date)
    ORDER BY 
        employee_count DESC
";

$stmt = $pdo->query($sql);

echo "<h3>Số lượng nhân viên được tuyển mỗi năm (giảm dần):</h3>";
echo "<table border='1' cellpadding='5' cellspacing='0'>";
echo "<tr>
        <th>Năm tuyển</th>
        <th>Số lượng nhân viên</th>
      </tr>";

while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
    echo "<tr>
            <td>{$row['hire_year']}</td>
            <td>{$row['employee_count']}</td>
          </tr>";
}

echo "</table>";
?>
