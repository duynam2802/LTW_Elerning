<?php
// Kết nối CSDL
$host = 'localhost';
$dbname = 'hr';
$username = 'root';
$password = '';

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    echo "<h3>Kết nối thành công!</h3>";

    // Truy vấn lấy tên + lương nhân viên và quản lý
    $sql = "
    SELECT 
        CONCAT(e.first_name, ' ', e.last_name) AS employee,
        e.salary AS emp_sal,
        CONCAT(m.first_name, ' ', m.last_name) AS manager,
        m.salary AS mgr_sal
    FROM 
        employees e
    LEFT JOIN 
        employees m ON e.manager_id = m.employee_id
    WHERE 
        e.employee_id BETWEEN 101 AND 130
        AND e.manager_id IS NOT NULL
        AND e.job_id NOT LIKE 'ST_%'
";


    $stmt = $pdo->query($sql);

    // Hiển thị kết quả
    echo "<table border='1' cellpadding='8' cellspacing='0'>";
    echo "<tr><th>employee</th><th>emp_sal</th><th>manager</th><th>mgr_sal</th></tr>";

    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
        echo "<tr>";
        echo "<td>{$row['employee']}</td>";
        echo "<td>{$row['emp_sal']}</td>";
        echo "<td>{$row['manager']}</td>";
        echo "<td>{$row['mgr_sal']}</td>";
        echo "</tr>";
    }

    echo "</table>";

} catch (PDOException $e) {
    echo "Kết nối thất bại: " . $e->getMessage();
}
?>


