<?php
require 'connect.php';

$sql = "SELECT 
            employee_id,
            first_name,
            last_name,
            salary,
            department_id
        FROM 
            employees
        WHERE 
            salary > (SELECT AVG(salary) FROM employees)
        ORDER BY 
            department_id ASC";

echo "<h2>Câu 13 - Nhân viên có lương cao hơn mức trung bình</h2>";

try {
    $stmt = $pdo->query($sql);

    echo "<table border='1' cellpadding='8' cellspacing='0'>";
    echo "<tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Salary</th>
            <th>Department ID</th>
          </tr>";

    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
        echo "<tr>
                <td>{$row['employee_id']}</td>
                <td>{$row['first_name']}</td>
                <td>{$row['last_name']}</td>
                <td>{$row['salary']}</td>
                <td>{$row['department_id']}</td>
              </tr>";
    }

    echo "</table>";
} catch (PDOException $e) {
    echo "Lỗi: " . $e->getMessage();
}
?>
