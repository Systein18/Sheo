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
        "1"=>"tbl_product.id",
        "2"=>"tbl_product.name",
        "3"=>"tbl_product.status",
        "4"=>"tbl_slide.name",
    );
    if($search==0){
        $sql = "SELECT tbl_product.*, tbl_slide.name, tbl_category.name, tbl_sub_category.name FROM tbl_product
        INNER JOIN tbl_slide ON tbl_slide.id = tbl_product.slide_id
        INNER JOIN tbl_category ON tbl_category.id = tbl_product.cate_id
        INNER JOIN tbl_sub_category ON tbl_sub_category.id = tbl_product.sub_id ORDER BY id DESC LIMIT $s, $e";
        $sqlCount = "SELECT COUNT(*) AS total FROM tbl_product";
    }else{
        
        if($filterFild[1]==0){
            $sql = "SELECT tbl_product.*, tbl_slide.name, tbl_category.name, tbl_sub_category.name FROM tbl_product
            INNER JOIN tbl_slide ON tbl_slide.id = tbl_product.slide_id
            INNER JOIN tbl_category ON tbl_category.id = tbl_product.cate_id
            INNER JOIN tbl_sub_category ON tbl_sub_category.id = tbl_product.sub_id
            WHERE ".$fld[$filterFild[0]]." = '$searchVal' ORDER BY id DESC LIMIT $s, $e";

            $sqlCount = "SELECT COUNT(*) AS total FROM tbl_product
            INNER JOIN tbl_slide ON tbl_slide.id = tbl_product.slide_id
            INNER JOIN tbl_category ON tbl_category.id = tbl_product.cate_id
            INNER JOIN tbl_sub_category ON tbl_sub_category.id = tbl_product.sub_id WHERE ".$fld[$filterFild[0]]." = '$searchVal'";
        }else{
            $sql = "SELECT tbl_product.*, tbl_slide.name, tbl_category.name, tbl_sub_category.name FROM tbl_product
            INNER JOIN tbl_slide ON tbl_slide.id = tbl_product.slide_id
            INNER JOIN tbl_category ON tbl_category.id = tbl_product.cate_id
            INNER JOIN tbl_sub_category ON tbl_sub_category.id = tbl_product.sub_id 
            WHERE ".$fld[$filterFild[0]]."  LIKE '%$searchVal%' ORDER BY id DESC LIMIT $s, $e";
            $sqlCount = "SELECT COUNT(*) AS total FROM tbl_product
            INNER JOIN tbl_slide ON tbl_slide.id = tbl_product.slide_id
            INNER JOIN tbl_category ON tbl_category.id = tbl_product.cate_id
            INNER JOIN tbl_sub_category ON tbl_sub_category.id = tbl_product.sub_id WHERE ".$fld[$filterFild[0]]."  LIKE '%$searchVal%' ";
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
        // $myimg = tirm($row[9]);
        // $myimg = explode(" ",$myimg);
        $data[] = array(
            "id"=>$row[0],
            "name"=>$row[1],
            "price"=>$row[3],
            "dis"=>$row[4],
            "price_dis"=>$row[5],
            "photo"=>$row[6],//1675161372.png 1675161375.jpg 1675161378.jpg 1675161381.jpg
            // "photo"=>$myimg[0],
            "cate_id"=>$row[8],
            "slide_id"=>$row[9],
            "od"=>$row[10],
            "status"=>$row[14],
            "slide_name"=>$row[15],
            "category_name"=>$row[16],
            "sub_category_name"=>$row[17],
            "totalData"=>$rowCount[0],
        );
    }
    echo json_encode($data);
?>