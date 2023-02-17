<?php
    $cn = new mysqli("localhost","root","","shop");
    $cn->set_charset("utf8");
    $id = $_POST['id'];
    $sql = "SELECT * FROM tbl_product WHERE id = $id";
    $rs = $cn->query($sql);
    $row = $rs->fetch_array();
    $msg['id']=$row[0];
    $msg['name']=$row[1];
    $msg['des']=$row[2];
    $msg['price']=$row[3];
    $msg['dis']=$row[4];
    $msg['price_dis']=$row[5];
    $msg['photo']=$row[6];
    $msg['sub_id']=trim($row[7]);
    $msg['cate_id']=trim($row[8]);
    $msg['slide_id']=trim($row[9]);
    $msg['od']=$row[10];
    $msg['status']=$row[14];
    echo json_encode($msg);
?>