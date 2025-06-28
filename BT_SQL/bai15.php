<?php
// Bước 1: Thông tin kết nối CSDL
$host = 'localhost';
$dbname = 'hr';
$username = 'root';
$password = '';

try {
    // Bước 2: Kết nối PDO
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    echo "<h3>Kết nối thành công!</h3>";

    // Bước 3: Truy vấn 5 nhân viên có lương thấp nhất
    $sql = "SELECT employee_id, first_name, last_name, salary
            FROM employees
            ORDER BY salary ASC
            LIMIT 5";

    $stmt = $pdo->query($sql);

    // Bước 4: Hiển thị kết quả
    echo "<h3>5 nhân viên có mức lương thấp nhất</h3>";
    echo "<table border='1' cellpadding='8' cellspacing='0'>";
    echo "<tr><th>ID</th><th>First Name</th><th>Last Name</th><th>Salary</th></tr>";

    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
        echo "<tr>";
        echo "<td>{$row['employee_id']}</td>";
        echo "<td>{$row['first_name']}</td>";
        echo "<td>{$row['last_name']}</td>";
        echo "<td>{$row['salary']}</td>";
        echo "</tr>";
    }

    echo "</table>";

} catch (PDOException $e) {
    echo "Kết nối thất bại: " . $e->getMessage();
}
?>
