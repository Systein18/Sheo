<?php
    include("_config_inc.php");
    $cn = new mysqli("localhost","root","","shop");
    $cn->set_charset("utf8");
    $base_url = BASE_URL;
    $base_path = BASE_PATH;
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.1/css/all.min.css">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-GLhlTQ8iRABdZLl6O3oVMWSktQOp6b7In1Zl3/Jr59b6EGGoI1aFkw7cmDA6j6gD" crossorigin="anonymous">
    <link rel="stylesheet" href="<?php echo $base_url; ?>home/style/style.css">
    <link rel="shortcut icon" href="<?php echo $base_url; ?>home/img/2.png" type="home/img/1.jpg">
    <script src="<?php echo $base_url; ?>home/js/jquery-3-6.min.js"></script>
    <title>Shop</title>
</head>
<body>
    <?php
        include($base_path."home/file/top-menu.php");
        include($base_path."home/file/menu.php");
        if(isset($_GET['id'])){
            $id = $_GET['id'];
            include("home/file/category-content.php");
        }else{
            include($base_path."home/file/slide.php");
            include($base_path."home/file/home-content.php");
            include($base_path."home/file/footer.php");
        }
        
        
    ?>
</body>
</html>