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
        "1"=>"tbl_sub_category.id",
        "2"=>"tbl_sub_category.name",
        "3"=>"tbl_sub_category.status",
        "4"=>"tbl_category.name",
    );
    if($search==0){
        $sql = "SELECT tbl_sub_category.*, tbl_category.name FROM tbl_sub_category 
        INNER JOIN tbl_category ON tbl_sub_category.cate_id = tbl_category.id ORDER BY tbl_sub_category.id DESC LIMIT $s, $e";
        $sqlCount = "SELECT COUNT(*) AS total FROM tbl_sub_category";
        
    }else{
        
        if($filterFild[1]==0){
            $sql = "SELECT tbl_sub_category.*, tbl_category.name FROM tbl_sub_category 
            INNER JOIN tbl_category ON tbl_sub_category.cate_id = tbl_category.id
            WHERE ".$fld[$filterFild[0]]." = '$searchVal' ORDER BY tbl_sub_category.id DESC LIMIT $s, $e";
            
            $sqlCount = "SELECT COUNT(*) AS total FROM tbl_sub_category 
            INNER JOIN tbl_category ON tbl_sub_category.cate_id = tbl_category.id
            WHERE ".$fld[$filterFild[0]]." = '$searchVal'";
        }else{
            $sql = "SELECT tbl_sub_category.*, tbl_category.name FROM tbl_sub_category 
            INNER JOIN tbl_category ON tbl_sub_category.cate_id = tbl_category.id 
            WHERE ".$fld[$filterFild[0]]."  LIKE '%$searchVal%' ";

            $sqlCount = "SELECT COUNT(*) AS total FROM tbl_sub_category 
            INNER JOIN tbl_category ON tbl_sub_category.cate_id = tbl_category.id 
            WHERE ".$fld[$filterFild[0]]."  LIKE '%$searchVal%' ";
        }
       
    }


    $rs = $cn->query($sql);
    // count Data
    $rsCount = $cn->query($sqlCount);
    $rowCount = $rsCount->fetch_array();

    // json data
    $data = array();
    while( $row = $rs->fetch_array() ){
        $data[] = array(
            "id"=>$row[0],
            "cate_id"=>$row[1],
            "name"=>$row[2],
            "photo"=>$row[3],
            "od"=>$row[4],
            "status"=>$row[6],
            "cate_name"=>$row[7],
            "totalData"=>$rowCount[0],
        );
    }
    echo json_encode($data);
?>