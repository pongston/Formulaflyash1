<?php
include "connect.php";

$materials = [
    "Cement HYD",
    "Cement Premium",
    "Fly Ash Tourus",
    "Sika 1808",
    "Sika 168",
    "Sika Aer",
    "RB 1002",
    "Viscocrete182"
];

if(isset($_POST['save'])){
    $month = $_POST['month'];

    foreach($materials as $mat){
        $open = $_POST['opening'][$mat];
        $receive = $_POST['received'][$mat];
        $issue = $_POST['issued'][$mat];
        $transfer = $_POST['transfer'][$mat];
        $physical = $_POST['physical'][$mat];

        $balance = $open + $receive + $transfer - $issue;

        $sql = "INSERT INTO stock_monthly
        (material, month, opening_balance, received, issued,
        transfer_in, balance, physical_count)
        VALUES
        ('$mat', '$month', '$open', '$receive',
        '$issue', '$transfer', '$balance', '$physical')";

        mysqli_query($conn, $sql);
    }

    echo "<script>alert('บันทึกข้อมูลเรียบร้อย');</script>";
}
?>

<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Stock Plant Korat 2</title>

<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">

</head>

<body class="container mt-4">

<h3 class="mb-3">เช็ค Stock Plant Korat 2</h3>

<form method="POST">

<div class="mb-3">
<label>เดือน</label>
<input type="text" name="month" class="form-control" required>
</div>

<div class="table-responsive">

<table class="table table-bordered table-striped">

<tr class="table-dark">
<th>Material</th>
<th>ยอดยกมา</th>
<th>รับเข้า</th>
<th>เบิกใช้</th>
<th>รับโอน</th>
<th>คงเหลือ</th>
<th>ยอดนับจริง</th>
</tr>

<?php
foreach($materials as $mat){
echo "<tr>";
echo "<td>$mat</td>";

echo "<td><input type='number' name='opening[$mat]' step='0.01' value='0' class='form-control'></td>";
echo "<td><input type='number' name='received[$mat]' step='0.01' value='0' class='form-control'></td>";
echo "<td><input type='number' name='issued[$mat]' step='0.01' value='0' class='form-control'></td>";
echo "<td><input type='number' name='transfer[$mat]' step='0.01' value='0' class='form-control'></td>";

echo "<td class='text-center'>Auto</td>";

echo "<td><input type='number' name='physical[$mat]' step='0.01' value='0' class='form-control'></td>";

echo "</tr>";
}
?>

</table>

</div>

<button type="submit" name="save" class="btn btn-primary">
บันทึก Stock
</button>

</form>

</body>
</html>
