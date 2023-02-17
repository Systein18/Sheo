<?php
    $cn = new mysqli("localhost","root","","shop");
    $cn->set_charset("utf8");
    $cate_id = $_POST['id'];
    $sql = "SELECT id,name FROM tbl_sub_category WHERE status=1 && cate_id=$cate_id ORDER BY id";
    $rs = $cn->query($sql);
    $data = array();
    while( $row = $rs->fetch_array() ){
        $data[] = array(
            "id"=>$row[0],
            "name"=>$row[1],
        );
    }
    echo json_encode($data);
?>