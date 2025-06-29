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
            m.employee_id,
            CONCAT(m.first_name, ' ', m.last_name) AS manager_name,
            COUNT(e.employee_id) AS number_of_reportees
        FROM 
            employees e
        JOIN 
            employees m ON e.manager_id = m.employee_id
        GROUP BY 
            m.employee_id, m.first_name, m.last_name
        ORDER BY 
            number_of_reportees DESC, m.employee_id
    ";

    $stmt = $pdo->query($sql);

    if ($stmt->rowCount() > 0) {
        echo "<table border='1' cellpadding='10'>";
        echo "<tr><th>employee_id</th><th>manager_name</th><th>number_of_reportees</th></tr>";

        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
            echo "<tr>";
            echo "<td>" . $row['employee_id'] . "</td>";
            echo "<td>" . htmlspecialchars($row['manager_name']) . "</td>";
            echo "<td>" . $row['number_of_reportees'] . "</td>";
            echo "</tr>";
        }

        echo "</table>";
    } else {
        echo "Không có dữ liệu phù hợp!";
    }

} catch (PDOException $e) {
    echo "Kết nối thất bại: " . $e->getMessage();
}
?>
