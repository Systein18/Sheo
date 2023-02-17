<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.0/css/all.min.css">
    <link rel="stylesheet" href="style/style.css">
    <script src="js/jquery-3-6.min.js"></script>
    <script src="js/tinymce/js/tinymce/tinymce.min.js"></script>
    <title>Admin</title>
</head>
<body>
    <div class="bar1">
        <div class="box1" id="btn-menu">
            <i class="fa-solid fa-bars"></i>
        </div>
        <div class="box2">
            Shoes Cambodia
        </div>
        <div class="title">
            Function Title
        </div>
        <div class="box3">
            eapvanny16@gmail.com
            <i class="fa-solid fa-power-off"></i>
        </div>
    </div>
    <div class="left-menu">
        <ul>
            <li>
                <a href="#">
                    <i class="fa-solid fa-user-gear " style="font-size:25px;"></i>
                    <span>System</span>
                </a>
                <ul class="sub-menu">
                    <li data-opt="4">
                        <a>User</a>
                    </li>
                </ul>
            </li>
            <li>
               <a href="#">
                    <i class="fa-solid fa-square-plus" style="font-size:25px;"></i>
                    <span>Setup</span>
                </a>
                <ul class="sub-menu">
                    <li data-opt="0">
                        <a>Category</a>
                    </li>
                    <li data-opt="1">
                        <a>Sub_Category</a>
                    </li>
                    <li data-opt="2">
                        <a>Slide</a>
                    </li>
                    <li data-opt="3">
                        <a>Product</a>
                    </li>
                </ul>
            </li>
        </ul>
    </div>
    <div class="container">
        <div class="bar2">
            <div class="box1">
                <div class="btnAdd">
                    <i class="fa-solid fa-plus"></i>
                    Add
                </div>
                <div class="search-box">
                    <input type="text" name="txt-search-value" id="txt-search-value" placeholder="  Search...">
                    <select name="txt-filter-field" id="txt-filter-field">
                        <option value="3">HTML</option>
                        <option value="4">CSS</option>
                    </select>   
                    <div class="btn-search">
                        <i class="fa-solid fa-magnifying-glass"></i>
                    </div>
                </div>
            </div>
            <div class="box1">
                <ul>
                    <li>
                        <select name="" id="txt-limit-data">
                            <option value="3">3</option>
                            <option value="5">5</option>
                            <option value="10">10</option>
                            <option value="20">20</option>
                            <option value="30">30</option>
                            <option value="50">50</option>
                        </select>
                    </li>
                    <li class="icon" id="btn-back">
                        <i class="fa-solid fa-chevron-left"></i>
                    </li>
                    <li class="li">
                        <span id='curent-page'>0</span> / <span id='total-page'>0</span> of <span id="total-data">0</span>
                    </li>
                    <li class="icon" id="btn-next" >
                        <i class="fa-solid fa-chevron-right"></i>
                    </li>
                </ul>
            </div>
        </div>
        <table class="tblData"></table>
        <div class="scroll">
            <table id="tblData"></table>
        </div>
    </div>
    <!-- <div class="popup">
        <div class="frm">
            <div class="header">
                Category
                <div class="btn-close">
                    <i class="fa-solid fa-xmark " id= "btn-close"></i>
                </div>
            </div>
            <div class="body">
                <label for="">ID</label>
                <input type="text" name="txt-id" id="txt-id" class="frm-control">
                <label for="">Name</label>
                <input type="text" name="txt-name" id="txt-name" class="frm-control">
                <label for="">OD</label>
                <input type="text" name="txt-od" id="txt-od" class="frm-control">
                <label for="">Sataus</label>
                <select name="" id="txt-status" class="frm-control">
                    <option value="2">1</option>
                    <option value="2">2</option>
                </select>
                <label for="">Photos</label>
                <div class='img-box'>
                    <input type="file" name="txt-file" id="txt-file">
                </div>
            </div>
            <div class="footer">
                <div class= "btn-save">
                    <i class="fa-solid fa-floppy-disk"></i>
                    Save
                </div>
            </div>
        </div>
        
    </div> -->
</body>

    <script src="js/index.js"></script>

</html>