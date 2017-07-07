<?php
$servername = "localhost";
$username = "root";
$password = "12345678";
$dbname = "mmloo";

$conn = new mysqli($servername, $username, $password, $dbname);
$sql="SET CHARACTER SET 'UTF8'";
$conn->query($sql);
$sql="SET NAMES 'UTF8'";
$conn->query($sql);

$sql = "select * from proclamation";
$result = $conn->query($sql);
$html = "";
$arr = array();
//把结果集中每行结果存到数组中
while ($row = $result->fetch_assoc()){
	$arr[] = $row;
}
//遍历数组每个元素，连接成json形式
foreach($arr as $row){
	$str = '{"id":"'.$row["id"].'", "name":"'.$row["name"].'", "content":"'.$row["content"].'", "time":"'.$row["addTime"].'"}';
	//echo $str;
	if($html == ""){
		$html .= $str;
	}else{
		$html .= ",".$str;
	}
}
echo "[".$html."]";
?>