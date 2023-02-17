<?php
    $cn = new mysqli("localhost","root","","shop");
    $cn->set_charset('utf8');
    $editId = $_POST['txt-edit-id'];
    $id = $_POST['txt-id'];
    $name = trim($_POST['txt-name']);
    $name = $cn->real_escape_string($name);
    $img = $_POST['txt-photo'];
    $od = $_POST['txt-od'];
    $status = $_POST['txt-status'];
    $name_link = "Yes";

    //check duplicate name
    $msg['dpl']=false;
    $msg['eidt']= false;
    
    $sql = "SELECT * FROM tbl_category  WHERE name = '$name' && id != $id "; 
    $rs = $cn->query($sql);
    if($rs->num_rows > 0){
        $msg['dpl']=true;
    }else{
        if($editId==0){
            $sql = "INSERT INTO tbl_category VALUES(null,'$name','$img','$od','$name_link','$status')";
            $cn->query($sql);
        }else{
            $sql = "UPDATE tbl_category SET name='$name', photo='$img', od='$od', status= '$status' WHERE id='$editId' ";
            $rs = $cn->query($sql);
            $msg['edit']=true;
        }
    }
    $msg['id'] = $cn->insert_id;
    echo json_encode($msg);
?>