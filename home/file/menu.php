<div class="container-fluid menu-bar">
    <div class="row">
        <div class="col-xl-12 col-lg-12 menu">
            <ul>
                <li><a href="index.php"><i class="fa-solid fa-house"></i></a></li>
                <?php
                    $sql = "SELECT id,name FROM tbl_category WHERE status = 1";
                    $rs = $cn->query($sql);
                    while($row = $rs->fetch_array()){
                        ?>
                            <li>
                                <a href="index.php?id=<?php echo $row[0]; ?>">
                                    <?php echo $row[1]; ?>
                                </a>
                            </li>
                        <?php
                    }
                ?>
                
            </ul>
        </div>
    </div>
</div>