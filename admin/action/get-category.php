<?php
    $cn = new mysqli("localhost","root","","shop");
    $cn->set_charset("utf8");
    $s = $_POST['s'];
    $e = $_POST['e'];
    $search = $_POST['search'];
    $searchVal = $_POST['searchVal'];
    // //1=id, 2=title, 3=status
    $filterFild =explode(" ",$_POST['filterField']);// (id or 1) 0
    $fld = array(
        "1"=>"id",
        "2"=>"name",
        "3"=>"status",
    );
    if($search==0){
        $sql = "SELECT * FROM tbl_category ORDER BY id DESC LIMIT $s, $e";
        $sqlCount = "SELECT COUNT(*) AS total FROM tbl_category";
    }else{
        
        if($filterFild[1]==0){
            $sql = "SELECT * FROM tbl_category WHERE ".$fld[$filterFild[0]]." = '$searchVal' ORDER BY id DESC LIMIT $s, $e";
            $sqlCount = "SELECT COUNT(*) AS total FROM tbl_category WHERE ".$fld[$filterFild[0]]." = '$searchVal'";
        }else{
            $sql = "SELECT * FROM tbl_category WHERE ".$fld[$filterFild[0]]."  LIKE '%$searchVal%' ORDER BY id DESC LIMIT $s, $e";
            $sqlCount = "SELECT COUNT(*) AS total FROM tbl_category WHERE ".$fld[$filterFild[0]]."  LIKE '%$searchVal%' ";
        }
       
    }

    $rs = $cn->query($sql);
    // count Data
    // $sqlCount = "SELECT COUNT(*) AS total FROM tbl_category";
    $rsCount = $cn->query($sqlCount);
    $rowCount = $rsCount->fetch_array();

    // json data
    $data = array();
    while( $row = $rs->fetch_array() ){
        $data[] = array(
            "id"=>$row[0],
            "name"=>$row[1],
            "photo"=>$row[2],
            "od"=>$row[3],
            "status"=>$row[5],
            "totalData"=>$rowCount[0],
        );
    }
    echo json_encode($data);
?>