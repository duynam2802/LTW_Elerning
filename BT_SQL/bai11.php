<?php
require 'connect.php';

$sql = "SELECT 
            CONCAT(first_name, ' ', last_name) AS employee_name, 
            CONCAT('(', SUBSTRING(phone_number, 1, 3), ')-(', 
                         SUBSTRING(phone_number, 5, 3), ')-(', 
                         SUBSTRING(phone_number, 9, 4), ')') AS formatted_phone 
        FROM employees";

echo "<h2>Câu 11</h2>";

try {
    $stmt = $pdo->query($sql);

    // In bảng
    echo "<table border='1' cellpadding='8' cellspacing='0'>";
    
    // In hàng tiêu đề (tên cột)
    echo "<tr>";
    for ($i = 0; $i < $stmt->columnCount(); $i++) {
        $col = $stmt->getColumnMeta($i);
        echo "<th>{$col['name']}</th>";
    }
    echo "</tr>";

    // In các dòng dữ liệu
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
        echo "<tr>";
        foreach ($row as $value) {
            echo "<td>{$value}</td>";
        }
        echo "</tr>";
    }

    echo "</table>";
} catch (PDOException $e) {
    echo "Lỗi truy vấn: " . $e->getMessage();
}
?>
