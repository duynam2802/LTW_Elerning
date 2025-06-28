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

    // Bước 3: Viết câu truy vấn
    $sql = "SELECT d.department_id, d.department_name, MAX(e.salary) AS max_salary
            FROM departments d
            JOIN employees e ON d.department_id = e.department_id
            GROUP BY d.department_id, d.department_name
            ORDER BY d.department_id ASC";

    // Bước 4: Thực thi truy vấn
    $stmt = $pdo->query($sql);

    // Bước 5: Hiển thị kết quả
    echo "<h3>Mức lương cao nhất theo từng phòng ban</h3>";
    echo "<table border='1' cellpadding='8' cellspacing='0'>";
    echo "<tr><th>Department ID</th><th>Department Name</th><th>Max Salary</th></tr>";

    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
        echo "<tr>";
        echo "<td>{$row['department_id']}</td>";
        echo "<td>{$row['department_name']}</td>";
        echo "<td>{$row['max_salary']}</td>";
        echo "</tr>";
    }

    echo "</table>";

} catch (PDOException $e) {
    echo "Kết nối thất bại: " . $e->getMessage();
}
?>
