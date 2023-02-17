<?php
    $cn = new mysqli("localhost","root","","shop");
    $cn->set_charset('utf8');
    $editId = $_POST['txt-edit-id'];
    $id = $_POST['txt-id'];
    $name = trim($_POST['txt-name']);
    $name = $cn->real_escape_string($name);
    $slide = $_POST['txt-slide'];
    $cate = $_POST['txt-category'];
    $sub_cate = $_POST['txt-sub-category'];
    $price = $_POST['txt-price'];
    $dis = $_POST['txt-dis'];
    $price_dis = $_POST['txt-price-dis'];
    $des = $_POST['txt-des'];
    $od = $_POST['txt-od'];
    $click = '0';
    $uid = '111';
    $status = $_POST['txt-status'];
    $name_link = "Yes";
    $img = $_POST['txt-photo'];
    $list_img ='';
    foreach($img as $photo){
        if($photo != ''){
            $list_img.=$photo." ";
        }
    }
    $list_img=trim($list_img);
    $msg['eidt']= false;
    if($editId==0){
        $sql = "INSERT INTO tbl_product VALUES(null,'$name','$des','$price','$dis','$price_dis','$list_img',
        '$sub_cate','$cate','$slide','$od','$click','$name_link','$uid','$status')";
        $cn->query($sql);
    }else{
        $sql = "UPDATE tbl_product SET name='$name',des='$des', price='$price', dis='$dis',
        price_dis='$price_dis',photo='$list_img',sub_id='$sub_cate',cate_id='$cate',slide_id='$slide',
        od='$od',click='$click', name_link='$name_link',uid='$uid',status='$status' WHERE id= '$editId' ";
        $cn->query($sql);
        $msg['edit']=true;
    }
    $msg['id'] = $cn->insert_id;
    echo json_encode($msg);
?>