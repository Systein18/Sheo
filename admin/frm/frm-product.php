<?php
    $cn = new mysqli("localhost","root","","shop");
    $cn->set_charset('utf8');
?>

<div class="frm frm-product" style="width: 80%;">
    <div class="header">
        Product
        <div class="btn-close">
            <i class="fa-solid fa-xmark " id= "btn-close"></i>
        </div>
    </div>
    <form class="upl">
        <div class="body">
            <div class="box-1">
                <input type="text" name="txt-edit-id" id="txt-edit-id" value="0" >
                <label for="">ID</label>
                <input type="text" name="txt-id" id="txt-id" class="frm-control" readonly>
                <label for="">Slide</label>
                <select name="txt-slide" id="txt-slide" class="frm-control">
                    <option value="0">---Select one item---</option>
                    <?php
                        $sql = "SELECT id,name FROM tbl_slide WHERE status = 1 ORDER BY id DESC LIMIT 0,10000000";
                        $rs = $cn->query($sql);
                        while($row = $rs->fetch_array()){
                            ?>
                                <option value="<?php echo $row[0]; ?>">
                                    <?php echo $row[1]; ?>
                                </option>
                            <?php
                        }
                    ?>
                </select>
                <label for="">Category</label>
                <select name="txt-category" id="txt-category" class="frm-control">
                    <option value="0">---Select one item---</option>
                    <?php
                        $sql = "SELECT id,name FROM tbl_category WHERE status = 1 ORDER BY id DESC";
                        $rs = $cn->query($sql);
                        while($row = $rs->fetch_array()){
                            ?>
                                <option value="<?php echo $row[0]; ?>">
                                    <?php echo $row[1]; ?>
                                </option>
                            <?php
                        }
                    ?>
                </select>
                <label for="">Sub-category</label>
                <select name="txt-sub-category" id="txt-sub-category" class="frm-control">
                    <!-- <option value="0">---Select one item---</option> -->
                </select>
                <label for="">OD</label>
                <input type="text" name="txt-od" id="txt-od" class="frm-control">
                
                <label for="">Sataus</label>
                <select name="txt-status" id="txt-status" class="frm-control">
                    <option value="1">1</option>
                    <option value="2">2</option> 
                </select>
                <label for="">Photo</label>
                <div class="img-box2">
                    <input type="file" name="txt-file2" id="txt-file2" class="txt-file2">
                    <input type="hidden" name="txt-photo[]" id="txt-photo" class="txt-photo">
                </div>
                <div class="img-box2">
                    <input type="file" name="txt-file2" id="txt-file2" class="txt-file2">
                    <input type="hidden" name="txt-photo[]" id="txt-photo" class="txt-photo">
                </div>
                <div class="img-box2">
                    <input type="file" name="txt-file2" id="txt-file2" class="txt-file2">
                    <input type="hidden" name="txt-photo[]" id="txt-photo" class="txt-photo">
                </div>
                <div class="img-box2">
                    <input type="file" name="txt-file2" id="txt-file2" class="txt-file2">
                    <input type="hidden" name="txt-photo[]" id="txt-photo" class="txt-photo">
                </div>
            </div>
            <div class="box-2">
                <label for="">Name</label>
                <input type="text" name="txt-name" id="txt-name" class="frm-control">
                <div style="width:30%; float:left;">
                    <label for="">Price</label>
                    <input type="text" name="txt-price" id="txt-price" class="frm-control">
                </div>
                <div style="width:30%; float:left; margin-left:5%; margin-right:5%;">
                    <label for="">Discount</label>
                    <input type="text" name="txt-dis" id="txt-dis" class="frm-control">
                </div>
                <div style="width:30%; float:left;">
                    <label for="">Price aft.dis</label>
                    <input type="text" name="txt-price-dis" id="txt-price-dis" class="frm-control">
                </div>
                <label for="">Description</label>
                <textarea name="txt-des" id="txt-des" cols="30" rows="13" class="frm-control"></textarea>
            </div>
        </div>
        <div class="footer">
            <div class= "btn-save">
                <i class="fa-solid fa-floppy-disk"></i>
                Save
            </div>
        </div>
    </form>
</div>