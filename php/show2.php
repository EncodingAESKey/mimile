<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "mmloo";

$conn = new mysqli($servername, $username, $password, $dbname);
$sql="SET CHARACTER SET 'UTF8'";
$conn->query($sql);
$sql="SET NAMES 'UTF8'";
$conn->query($sql);

$sql = "select * from goods where id > 5";
$result = $conn->query($sql);
$html = "";
$arr = array();
//把结果集中每行结果存到数组中
while ($row = $result->fetch_assoc()){
	$arr[] = $row;
}
//遍历数组每个元素，连接成json形式
foreach($arr as $row){
	$str = '{"id":"'.$row["id"].'", "name":"'.$row["name"].'", 
	"brand":"'.$row["brand"].'", "content":"'.$row["content"].'", 
	"price":"'.$row["price"].'", "discount":"'.$row["discount"].'", 
	"img":"'.$row["img"].'", "imgs":"'.$row["imgs"].'", 
	"detail":"'.$row["detail"].'", "num":"'.$row["num"].'"}';
	//echo $str;
	if($html == ""){
		$html .= $str;
	}else{
		$html .= ",".$str;
	}
}
echo "[".$html."]";
?>