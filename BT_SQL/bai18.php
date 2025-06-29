<?php
// Bước 1: Thông tin kết nối
require 'connect.php'; 

try {
    // Bước 2: Kết nối PDO
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Bước 3: Truy vấn quản lý và nhân viên khác phòng ban
    $sql = "SELECT 
                CONCAT(e.first_name, ' ', e.last_name) AS employee_name,
                CONCAT(m.first_name, ' ', m.last_name) AS manager_name,
                e.department_id AS employee_department,
                m.department_id AS manager_department
            FROM employees e
            JOIN employees m ON e.manager_id = m.employee_id
            WHERE e.department_id <> m.department_id
            ORDER BY manager_name ASC";

    $stmt = $pdo->query($sql);

    // Bước 4: Hiển thị kết quả
    echo "<h3>Danh sách nhân viên và quản lý làm ở phòng ban khác nhau</h3>";
    echo "<table border='1' cellpadding='8' cellspacing='0'>";
    echo "<tr>
            <th>Employee Name</th>
            <th>Manager Name</th>
            <th>Employee Department</th>
            <th>Manager Department</th>
          </tr>";

    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
        echo "<tr>";
        echo "<td>{$row['employee_name']}</td>";
        echo "<td>{$row['manager_name']}</td>";
        echo "<td>{$row['employee_department']}</td>";
        echo "<td>{$row['manager_department']}</td>";
        echo "</tr>";
    }

    echo "</table>";

} catch (PDOException $e) {
    echo "Kết nối thất bại: " . $e->getMessage();
}
?>
