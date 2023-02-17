<div class="container">
    <div class="row">
        <div class="hr">
            <?php
                $sql = "SELECT id,name FROM tbl_category WHERE status = 1 LIMIT 0,15";
                $rs = $cn->query($sql);
                while($row = $rs->fetch_array()){
                    ?>
                        <div class="col-xl-12 col-lg-12 home-ct-title">
                            <a href="#"><span><?php echo $row[1]; ?></span></a>
                            <h1>POPULAR THIS WEEK</h1>
                        </div>
                    <?php
                    $sql1 = "SELECT * FROM tbl_product WHERE status=1 && cate_id=$row[0] LIMIT 0,8";
                    $rs1 = $cn->query($sql1);
                    while($row1 = $rs1->fetch_array()){
                        $myPhoto = trim($row1[6]);
                        $myPhoto = explode(" ",$myPhoto);
                        ?>
                            <div class="col-xl-3 box-item">
                                <div class="box-all">
                                    <div class="img-box">
                                        <img src="admin/img/<?php echo $myPhoto[0]; ?>" alt="">
                                        <div class="status">Instock</div>
                                        <div class="view-box">
                                            <ul>
                                                <li>
                                                    <a href="https://www.facebook.com/?_rdc=2&_rdr" target="_blank">
                                                        <i class="fa-brands fa-facebook"></i>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="https://t.me/syste_in" target="_blank">
                                                        <i class="fa-brands fa-telegram"></i>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="">
                                                        <i class="fa-solid fa-magnifying-glass"></i>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="">
                                                        <i class="fa-solid fa-cart-plus"></i>
                                                    </a>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div class="txt-box">
                                        <h1><?php echo $row1[1]; ?></h1>
                                        <p>$<?php echo $row1[3]; ?>USD</p>
                                    </div>
                                </div>
                            </div>
                        <?php
                    }
                }
            ?>
        </div>

    </div>
</div>