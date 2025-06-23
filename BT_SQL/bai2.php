<?php
require 'connect.php';
$sql = "SELECT employee_id, first_name, last_name, job_id, salary
        FROM employees
        WHERE salary in (select max(salary) from employees)
        ";

$stmt = $pdo->query($sql);

echo "<h3>Các nhân viên có số lương (salary) cao nhất:</h3>";
echo "<table border='1' cellpadding='5' cellspacing='0'>";
echo "<tr>
    <th>Employee ID</th>
    <th>First Name</th>
    <th>Last Name</th>
    <th>Job ID</th>
    <th>Salary</th>
      </tr>";
while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
    echo "<tr>
        <td>{$row['employee_id']}</td>
        <td>{$row['first_name']}</td>
        <td>{$row['last_name']}</td>
        <td>{$row['job_id']}</td>
        <td>{$row['salary']}</td>
      </tr>";
}
echo "</table>";
echo "</ul>"
?>