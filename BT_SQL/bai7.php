<?php
$host = 'localhost';
$dbname = 'hr';
$username = 'root';
$password = '';

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    echo "<h3>Kết nối thành công!</h3>";

    $sql = "
        SELECT 
            d.department_name,
            COUNT(e.employee_id) AS emp_count
        FROM 
            departments d
        LEFT JOIN 
            employees e ON d.department_id = e.department_id
        GROUP BY 
            d.department_name
        HAVING 
            emp_count > 0
        ORDER BY 
            emp_count DESC
    ";

    $stmt = $pdo->query($sql);

    echo "<table border='1' cellpadding='10'>";
    echo "<tr><th>department_name</th><th>emp_count</th></tr>";

    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
        echo "<tr>";
        echo "<td>" . htmlspecialchars($row['department_name']) . "</td>";
        echo "<td>" . $row['emp_count'] . "</td>";
        echo "</tr>";
    }

    echo "</table>";

} catch (PDOException $e) {
    echo "Kết nối thất bại: " . $e->getMessage();
}
?>
