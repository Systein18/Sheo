<div class="container">
    <div class="row">
        <div class="col-xl-8 slide-box">
            <?php
                $sql = "SELECT id,photo FROM tbl_slide WHERE status=1 ORDER BY od DESC LIMIT 0,1";
                $rs = $cn->query($sql);
                $row = $rs->fetch_array();
                ?>
                    <div class="box1">
                        <img src="admin/img/<?php echo $row[1]; ?>" alt="">
                        <div class="shop-btn">
                            Show Now
                        </div>
                    </div>
                <?php
            ?>
            
            
        </div>
        <div class="col-xl-4 slide-box">
            <?php
                $sql = "SELECT id,photo FROM tbl_slide WHERE status=1 ORDER BY od DESC LIMIT 1,2";
                $rs = $cn->query($sql);
                while($row = $rs->fetch_array()){
                    ?>
                        <div class="box2">
                            <img src="admin/img/<?php echo $row[1]; ?>" alt="">
                            <div class="shop-btn">
                                Show Now
                            </div>
                        </div>
                    <?php
                }
            ?>
        </div>
    </div>
</div>