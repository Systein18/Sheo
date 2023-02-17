<div class="container category-box">
    <div class="row ">
        <div class="col-xl-4 left-menu"> 
            <!-- <div class="left-menu"> -->
                <ul>
                    <?php 
                        $sql = "SELECT id,name FROM tbl_sub_category WHERE status=1 && cate_id = $id ORDER BY od LIMIT 0,15";
                        $rs = $cn->query($sql);
                        while($row = $rs->fetch_array()){
                            ?>
                                <li>
                                    <a href=""><?php echo $row[1]; ?></a>
                                </li>
                            <?php
                        }
                    ?>
                </ul>
            <!-- </div> -->
        </div>
        <div class="col-xl-8">
            <div class="row">
                <div class="col-xl-12">
                    <div class="fillter-box">
                        <select name="" id="">
                            <option value="0">---Sort By---</option>
                            <option value="1">Low Price</option>
                            <option value="2">High Price</option>
                            <option value="3">Low Discount</option>
                            <option value="4">Hight Discount</option>
                        </select>
                    </div>
                </div>
                <?php
                    $sql1 = "SELECT * FROM tbl_product WHERE status=1 && cate_id=$id LIMIT 0,8";
                    $rs1 = $cn->query($sql1);
                    while($row1 = $rs1->fetch_array()){
                        $myPhoto = trim($row1[6]);
                        $myPhoto = explode(" ",$myPhoto);
                        ?>
                            <div class="col-xl-4 box-item" style="padding: 12px; ">
                                <div class="box-all" >
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
                ?>
                    

            </div>
        </div>
    </div>  
</div>