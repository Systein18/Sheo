<?php
    $cn = new mysqli("localhost","root","","shop");
    $cn->set_charset('utf8');
    $editId = $_POST['txt-edit-id'];
    $id = $_POST['txt-id'];
    $cateID = $_POST['txt-cate_id'];
    $name = trim($_POST['txt-name']);
    $name = $cn->real_escape_string($name);
    $img = $_POST['txt-photo'];
    $od = $_POST['txt-od'];
    $status = $_POST['txt-status'];
    $name_link = "Yes";

    $msg['edit']= false;
    if($editId==0){
        $sql = "INSERT INTO tbl_sub_category VALUES(null,'$cateID','$name','$img','$od','$name_link','$status')";
        $cn->query($sql);
    }else{
        $sql = "UPDATE tbl_sub_category SET cate_id='$cateID', name='$name', photo='$img', od='$od', name_link='$name_link' ,status= '$status' WHERE id='$editId' ";
        $rs = $cn->query($sql);
        $msg['edit']=true;
    }
    $msg['id'] = $cn->insert_id;
    echo json_encode($msg);
?>