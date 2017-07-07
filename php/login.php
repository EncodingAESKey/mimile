<?php
//服务器名字
$servername = "localhost";
//默认最高权限的用户名
$username = "root";
//密码为相应的服务器密码
$password = "";
//对应数据库的名字
$dbname = "mmloo";

$conn = new mysqli($servername, $username, $password, $dbname);

$sql="SET CHARACTER SET 'UTF8'";
$conn->query($sql);
//告诉服务器将来从这个客户端传来的信息采用字符集utf8
$sql="SET NAMES 'UTF8'";
$conn->query($sql);

$action = isset($_GET["action"]) ? $_GET["action"] : "";
$phoneNum = isset($_GET["phoneNum"]) ? $_GET["phoneNum"] : "";
$password = isset($_GET["password"]) ? $_GET["password"] : "";

switch($action){
	//注册的时候失焦看有没有该用户
	case "1" :
		if(isHasUser()){
			echo '{"state":"success", "text":"该用户可以注册"}';
		}else{
			echo '{"state":"error", "text":"用户已注册"}';
		}
		break;
	//将此用户插入表中
	case "2" : 
		if(isHasUser()){
			$sql = "insert into user(tel,pwd,addTime) values ('".$phoneNum."','".$password."',now())";
			$conn->query($sql);
			echo '{"state":"success", "text":"注册成功"}';
		}
		break;
	//点击登录的时候有没有此用户
	case "3" :
		//如果没有该用户，提示注册
		if(isHasUser()){
			echo '{"state":"null", "text":"该用户尚未注册"}';
		}else{
			if(isPwd()){
				echo '{"state":"success", "text":"'.$phoneNum.'"}';
			}else{
				echo '{"state":"error", "text":"用户名或密码错误"}';
			}
		}
		break;
}
//判断是否有该用户
function isHasUser(){
	global $conn,$phoneNum;
	//从所有记录中找到phoneNum = $phoneNum的，再记录下来数量赋值给num
	$sql = "select count(*) as num from user where tel='".$phoneNum."'";
	//在数据库中执行这条语句，把结果赋值给$result(得出来的就是数据库中一条一条的记录)
	$result = $conn->query($sql);
	//从结果集中取得一行作为关联数组。返回根据从结果集取得的行生成的关联数组，如果没有更多行，则返回 false
	$row = $result->fetch_assoc();
	if($row["num"] == 0){
		return true;
	}else{
		return false;
	}
}
function isPwd(){
	global $conn,$phoneNum,$password;
	$sql = "select * from user WHERE (tel='".$phoneNum."') AND (pwd='".$password."')";
	$result = $conn->query($sql);
	//有数据表示密码正确
	if($row = $result->fetch_assoc()){
		return true;
	}else{
		return false;
	}
}
?>