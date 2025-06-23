<?php
require 'connect.php';
$sql = "SELECT employee_id, first_name, last_name, job_id, salary
        FROM employees
        WHERE salary = (
            SELECT MAX(salary)
            FROM employees
            WHERE salary < (
                SELECT MAX(salary)
                FROM employees
            )
        )";

$stmt = $pdo->query($sql);
echo "<h3>Nhân viên có số lương lớn thứ 2:</h3>";
echo "<table border = '1' cellpadding='5' cellspacing='0'>";
echo "<tr>
        <th>employee_id</th>
        <th>first_name</th>
        <th>last_name</th>
        <th>job_id</th>
        <th>salary</th>
        </tr>";
while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
    echo "<tr>
            <td>{$row['employee_id']}</td>
            <td>{$row['first_name']}</td>
            <td>{$row['last_name']}</td>
            <td>{$row['job_id']}</td>
            <td>{$row['salary']}
         </tr>";
}

?>