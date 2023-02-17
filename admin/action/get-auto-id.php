<?php
    $cn = new mysqli("localhost","root","","shop");
    $ind = $_POST['ind'];
    $tbl = array(
        "0"=>"tbl_category",
        "1"=>"tbl_sub_category",
        "2"=>"tbl_slide",
        "3"=>"tbl_product",
    );
    $sql = "SELECT id FROM ".$tbl[$ind]." ORDER BY id DESC LIMIT 0,1";
    $rs = $cn->query($sql);
    $msg['id']=0;
    if($rs->num_rows >0){
        $row = $rs->fetch_array();
        $msg['id']=$row[0];
    }
    echo json_encode($msg);
?>