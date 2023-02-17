$(document).ready(function(){
    var body = $('body');
    var trInd;
    var loading = "<div class='popup'><div class='loading'></div></div>";
    var popup = `<div class="popup"></div>`;
    var tbl = $('#tblData');
    var frm = {
        "0":"frm-category.php",
        "1":"frm-sub-category.php",
        "2":"frm-slide.php",
        "3":"frm-product.php",
    };
    var frmOpt = 0;
    var totalData = $('#total-data');
    var curentPage = $('#curent-page');
    var totalPage = $('#total-page');
    var limitData = $('#txt-limit-data');
    var searchVal = $('#txt-search-value');
    var s = 0;
    var e = limitData.val();
    var filterField = $("#txt-filter-field");
    var filter = [
        //1=id, 2=title, 3=status
        //0 = ; 1 like;
       {"1 0":"ID","2 1":"Name","3 0":"Status"},
       {"1 0":"ID","2 1":"Name","4 1":"Category","3 0":"Status"},
       {"1 0":"ID","2 1":"Name","3 0":"Status"},
       {"1 0":"ID","2 1":"Name","4 1":"Slide_ID","3 0":"Status"},
    ];
    var search=0;
    var leftMenu = $('.left-menu');
    var container = $('.container');
    var opt=0;
    $('#btn-menu').click(function(){
        if(opt==0){
            leftMenu.css({"left":"-6%"});
            container.css({"width":"100%","left":"0"});
            opt=1;
        }else{
            leftMenu.css({"left":"0%"});
            container.css({"width":"95%","left":"5%"});
            opt=0;
        }
    });
    $('.btnAdd').click(function(){
        // Add form
        body.append(popup);
        body.append(loading);
        body.find('.popup').first().load("frm/"+frm[frmOpt], function(responseTxt, statusTxt, xhr){
            if(statusTxt == "success")
            getAutoId();
            body.find('.popup').last().remove();
            if(statusTxt == "error")
              alert("Error: " + xhr.status + ": " + xhr.statusText);
        });
    }); 
        
    // show data and get form value
    $('.left-menu').on("click",'.sub-menu li',function(){
        $('.bar2').show();
        frmOpt = $(this).data("opt");//0
        body.find('.title').text($(this).text());
        search = 0;
        //set filter field
        var obj1= filter[frmOpt];
        var txt = '<option value="0 0">---Select one---</option>';
        for (const key of Object.keys(obj1)) {
            txt += `<option value='${key}'> ${obj1[key]}</option>`;
        }
        filterField.html(txt);
        //get data
        curentPage.text("1");
        s=0;
        if(frmOpt==0){
            get_category();
        }else if(frmOpt==1){
            get_sub_category();
        }else if(frmOpt==2){
            get_slide();
        }else if(frmOpt==3){
            get_product();
        }
    });
    //Search Data
    $('.btn-search').click(function(){
        search=1;
        if(frmOpt==0){
            get_category();
        }else if(frmOpt==1){
            get_sub_category();
        }else if(frmOpt==2){
            get_slide();
        }else if(frmOpt==3){
            get_product();
        }
    });
    // limit data
    limitData.change(function(){
        curentPage.text('1');
        s = 0;
        e = $(this).val();
        if(frmOpt==0){
            get_category();
        }else if(frmOpt==1){
            get_sub_category();
        }else if(frmOpt==2){
            get_slide();
        }else if(frmOpt==3){
            get_product();
        }
    });
    // Next data
    $('#btn-next').click(function(){
        if(parseInt(curentPage.text()) == parseInt(totalPage.text()) ){
            return;
        }
        s = parseInt(s) + parseInt(e) ;
        console.log(s);
        if(frmOpt==0){
            get_category();
        }else if(frmOpt==1){
            get_sub_category();
        }else if(frmOpt==2){
            get_slide();
        }else if(frmOpt==3){
            get_product();
        }
        curentPage.text( parseInt(curentPage.text()) + 1 ); 
    });
    // Back Data
    $('#btn-back').click(function(){ 
        if( parseInt( curentPage.text()) == 1 ){
            return;
        }
        s = parseInt(s) - parseInt(e) ;
        if(frmOpt==0){
            get_category();
        }else if(frmOpt==1){
            get_sub_category();
        }else if(frmOpt==2){
            get_slide();
        }else if(frmOpt==3){
            get_product();
        }
        
        curentPage.text( parseInt(curentPage.text()) - 1 );
    });
    // close form
    body.on('click','.btn-close',function(){
        $('.popup').remove();
    });
    // Save Data
    body.on('click','.frm .btn-save',function(){
        var eThis = $(this);
        if(frmOpt==0){
            save_category(eThis);
        }else if(frmOpt==1){
            save_sub_category(eThis);
        }else if(frmOpt==2){
            save_slide(eThis);
        }else if(frmOpt==3){
            save_product(eThis);
        }
    });
    //Save category
    function save_category(eThis){
        var Parent = eThis.parents('.frm');
        var id = Parent.find('#txt-id');
        var name = Parent.find('#txt-name');
        var od = Parent.find('#txt-od');
        var imgBox = Parent.find('.img-box');
        var photo = Parent.find("#txt-photo");
        var file = Parent.find("#txt-file");
        var status = Parent.find('#txt-status');
        if(name.val()==''){
            alert("Please input name.");
            name.focus();
            return;
        }

        var frm = eThis.closest('form.upl');
        var frm_data = new FormData(frm[0]);
        $.ajax({
            url:'action/category.php',
            type:'POST',
            data:frm_data,
            contentType:false,
            cache:false,
            processData:false,
            dataType:'json',
            beforeSend:function(){
                    //work before success 
                    body.append(loading);   
            },
            success:function(data){   
                    //work after success 
                if(data['dpl'] == true){
                    alert("Duplicate Title.");
                    name.focus();
                }else{
                    if(data['edit']==true){
                        tbl.find('tr:eq('+trInd+') td:eq(1)').text(name.val());
                        tbl.find('tr:eq('+trInd+') td:eq(2) img').attr('src',`img/${photo.val()}`);
                        tbl.find('tr:eq('+trInd+') td:eq(2) img').attr('alt',`${photo.val()}`);
                        tbl.find('tr:eq('+trInd+') td:eq(3)').text(od.val());
                        tbl.find('tr:eq('+trInd+') td:eq(4)').text(status.val());
                        body.find('.popup').remove();
                    }else{
                        var tr=`
                            <tr> 
                                <td>${data['id']}</td>
                                <td>${name.val()}</td>
                                <td><img src="img/${photo.val()}" alt="${photo.val()}"></td>
                                <td>${od.val()}</td>
                                <td>${status.val()}</td>
                                <td><i class="fa-solid fa-pen-to-square btnEdit"></i></td>
                            </tr>
                        `;

                        tbl.find('tr:eq(0)').after(tr);  
                        id.val(parseInt(data['id']) + 1); 
                        od.val(parseInt(data['id']) + 1);
                        name.val('');
                        name.focus();  
                        imgBox.css({"background-image":`url(style/bg-img.jpg)`});
                        file.val('');
                        photo.val('');
                    }
                    
                }
                body.find('.popup').last().remove();    
                
            }				
        }); 
    }
    // get category
    function get_category(){
        var th=`
            <tr style="background-color:cornflowerblue;">
                <td width="50">ID</td>
                <td>Name</td>
                <td width="50">Photo</td>
                <td width="50">OD</td>
                <td width="50">Status</td>
                <td width="50">Action</td>
            </tr>
        `;
        $.ajax({
            url:'action/get-category.php',
            type:'POST',
            data:{ s:s, e:e, search:search, searchVal:searchVal.val(), filterField:filterField.val()},
            cache:false,
            dataType:"json",
            beforeSend:function(){
                body.append(loading);
            },
            success:function(data){   
            //   console.log(data['0']['totalData']);
                if(data.length ==0){
                    body.find('.popup').remove();
                    tbl.html(th);
                    return;
                }
                var txt = '';
                totalData.text(data[0]['totalData']);
                totalPage.text( Math.ceil( data[0]['totalData'] / e ) );
                data.forEach((e)=>{
                        txt +=`
                            <tr> 
                                <td>${e['id']}</td>
                                <td>${e['name']}</td>
                                <td><img src="img/${e['photo']}" alt="${e['photo']}"></td>
                                <td>${e['od']}</td>
                                <td>${e['status']}</td>
                                <td><i class="fa-solid fa-pen-to-square btnEdit"></i></td>
                            </tr>
                        `;
                });
                tbl.html( th + txt );
                body.find('.popup').last().remove();
            }				
        }); 
        
    }
      // get eidt category
    function  get_edit_category(eThis){
        var tr = eThis.parents('tr');
        var id = tr.find('td:eq(0)').text();
        var name = tr.find('td:eq(1)').text();
        var photo = tr.find('td:eq(2) img').attr('alt');
        var od = tr.find('td:eq(3)').text();
        var status = tr.find('td:eq(4)').text();
        trInd = tr.index();
        body.append(popup);
        body.append(loading);
        body.find('.popup').first().load("frm/"+frm[frmOpt], function(responseTxt, statusTxt, xhr){
            if(statusTxt == "success")
                body.find('.frm #txt-id').val(id);
                body.find('.frm #txt-name').val(name);
                body.find('.frm .img-box').css({"background-image":`url(img/${photo})`});
                body.find('.frm #txt-photo').val(photo);
                body.find('.frm #txt-od').val(od);
                body.find('.frm #txt-status').val(status);
                body.find(' #txt-edit-id').val(id);
                body.find('.popup').last().remove();
            if(statusTxt == "error")
                alert("Error: " + xhr.status + ": " + xhr.statusText);
        });
    }
    // save Sub category
    function save_sub_category(eThis){
        var Parent = eThis.parents('.frm');
        var id = Parent.find('#txt-id');
        var name = Parent.find('#txt-name');
        var cate_name = Parent.find('#txt-cate_id');
        var od = Parent.find('#txt-od');
        var imgBox = Parent.find('.img-box');
        var photo = Parent.find("#txt-photo");
        var file = Parent.find("#txt-file");
        var status = Parent.find('#txt-status');
        if(cate_name.val()==0){
            alert("Please Select Category");
            cate_name.focus();
            return;
        }else if(name.val()==''){
            alert("Please input name.");
            name.focus();
            return;
        }

        var frm = eThis.closest('form.upl');
        var frm_data = new FormData(frm[0]);
        $.ajax({
            url:'action/sub-category.php',
            type:'POST',
            data:frm_data,
            contentType:false,
            cache:false,
            processData:false,
            dataType:'json',
            beforeSend:function(){
                    //work before success 
                    body.append(loading);   
            },
            success:function(data){   
                    //work after success 
                if(data['dpl'] == true){
                    alert("Duplicate Title.");
                    name.focus();
                }else{
                    if(data['edit']==true){
                        
                        tbl.find('tr:eq('+trInd+') td:eq(1)').html(`<span>${cate_name.val()}</span>${cate_name.find("option:selected").html()}`);
                        tbl.find('tr:eq('+trInd+') td:eq(2)').text(name.val());
                        tbl.find('tr:eq('+trInd+') td:eq(3) img').attr('src',`img/${photo.val()}`);
                        tbl.find('tr:eq('+trInd+') td:eq(3) img').attr('alt',`${photo.val()}`);
                        tbl.find('tr:eq('+trInd+') td:eq(4)').text(od.val());
                        tbl.find('tr:eq('+trInd+') td:eq(5)').text(status.val());
                        body.find('.popup').last().remove();
                    }else{
                        var tr=`
                            <tr> 
                                <td>${data['id']}</td>
                                <td>${cate_name.find('option:selected').text()}</td>
                                <td>${name.val()}</td>
                                <td><img src="img/${photo.val()}" alt="${photo.val()}"></td>
                                <td>${od.val()}</td>
                                <td>${status.val()}</td>
                                <td><i class="fa-solid fa-pen-to-square btnEdit"></i></td>
                            </tr>
                        `;

                        tbl.find('tr:eq(0)').after(tr);  
                        id.val(parseInt(data['id']) + 1); 
                        od.val(parseInt(data['id']) + 1);
                        name.val('');
                        name.focus();  
                        imgBox.css({"background-image":`url(style/bg-img.jpg)`});
                        file.val('');
                        photo.val('');
                    }
                    
                }
                body.find('.popup').last().remove();    
                
            }				
        }); 
    }
    // get sub category
    function get_sub_category(){
        var th=`
            <tr style="background-color:cornflowerblue;">
                <td width="50">ID</td>
                <td width="150">Category</td>
                <td>Name</td>
                <td width="50">Photo</td>
                <td width="50">OD</td>
                <td width="50">Status</td>
                <td width="50">Action</td>
            </tr>
        `;
        $.ajax({
            url:'action/get-sub-category.php',
            type:'POST',
            data:{ s:s, e:e, search:search, searchVal:searchVal.val(), filterField:filterField.val()},
            cache:false,
            dataType:"json",
            beforeSend:function(){
                body.append(loading);
            },
            success:function(data){   
            //   console.log(data['0']['totalData']);
                if(data.length ==0){
                    body.find('.popup').remove();
                    tbl.html(th);
                    return;
                }
                var txt = '';
                totalData.text(data[0]['totalData']);
                totalPage.text( Math.ceil( data[0]['totalData'] / e ) );
                data.forEach((e)=>{
                        txt +=`
                            <tr> 
                                <td>${e['id']}</td>
                                <td><span>${e['cate_id']}</span>${e['cate_name']}</td>
                                <td>${e['name']}</td>
                                <td><img src="img/${e['photo']}" alt="${e['photo']}"></td>
                                <td>${e['od']}</td>
                                <td>${e['status']}</td>
                                <td><i class="fa-solid fa-pen-to-square btnEdit"></i></td>
                            </tr>
                        `;
                });
                tbl.html( th + txt );
                body.find('.popup').last().remove();
            }				
        }); 
    }
    //get edit sub category
    function get_edit_sub_category(eThis){
        var tr = eThis.parents('tr');
        var id = tr.find('td:eq(0)').text();
        var cate_name = tr.find('td:eq(1) span').text();
        var name = tr.find('td:eq(2)').text();
        var photo = tr.find('td:eq(3) img').attr('alt');
        var od = tr.find('td:eq(4)').text();
        var status = tr.find('td:eq(5)').text();
        trInd=tr.index();
        body.append(popup);
        body.append(loading);
        body.find('.popup').first().load("frm/"+frm[frmOpt], function(responseTxt, statusTxt, xhr){
            if(statusTxt == "success")
            body.find('.frm #txt-id').val(id);
            body.find('.frm #txt-edit-id').val(id);
            body.find('.frm #txt-cate_id').val(cate_name);
            body.find('.frm #txt-name').val(name);
            body.find('.frm .img-box').css({"background-image":`url(img/${photo})`});
            body.find('.frm #txt-photo').val(photo);
            body.find('.frm #txt-od').val(od);
            body.find('.frm #txt-status').val(status);
            body.find('.popup').last().remove();
            if(statusTxt == "error")
              alert("Error: " + xhr.status + ": " + xhr.statusText);
        });
    }
    // Save Slide
    function save_slide(eThis){
        var Parent = eThis.parents('.frm');
        var id = Parent.find('#txt-id');
        var name = Parent.find('#txt-name');
        var od = Parent.find('#txt-od');
        var imgBox = Parent.find('.img-box');
        var photo = Parent.find("#txt-photo");
        var file = Parent.find("#txt-file");
        var status = Parent.find('#txt-status');
        if(name.val()==''){
            alert("Please input name.");
            name.focus();
            return;
        }

        var frm = eThis.closest('form.upl');
        var frm_data = new FormData(frm[0]);
        $.ajax({
            url:'action/slide.php',
            type:'POST',
            data:frm_data,
            contentType:false,
            cache:false,
            processData:false,
            dataType:'json',
            beforeSend:function(){
                    //work before success 
                    body.append(loading);   
            },
            success:function(data){   
                    //work after success 
                if(data['dpl'] == true){
                    alert("Duplicate Title.");
                    name.focus();
                }else{
                    if(data['edit']==true){
                        tbl.find('tr:eq('+trInd+') td:eq(1)').text(name.val());
                        tbl.find('tr:eq('+trInd+') td:eq(2) img').attr('src',`img/${photo.val()}`);
                        tbl.find('tr:eq('+trInd+') td:eq(2) img').attr('alt',`${photo.val()}`);
                        tbl.find('tr:eq('+trInd+') td:eq(3)').text(od.val());
                        tbl.find('tr:eq('+trInd+') td:eq(4)').text(status.val());
                        body.find('.popup').remove();
                    }else{
                        var tr=`
                            <tr> 
                                <td>${data['id']}</td>
                                <td>${name.val()}</td>
                                <td><img src="img/${photo.val()}" alt="${photo.val()}"></td>
                                <td>${od.val()}</td>
                                <td>${status.val()}</td>
                                <td><i class="fa-solid fa-pen-to-square btnEdit"></i></td>
                            </tr>
                        `;

                        tbl.find('tr:eq(0)').after(tr);  
                        id.val(parseInt(data['id']) + 1); 
                        od.val(parseInt(data['id']) + 1);
                        name.val('');
                        name.focus();  
                        imgBox.css({"background-image":`url(style/bg-img.jpg)`});
                        file.val('');
                        photo.val('');
                    }
                    
                }
                body.find('.popup').last().remove();    
                
            }				
        }); 
    }
    // get slide
    function get_slide(){
        var th=`
            <tr style="background-color:cornflowerblue;">
                <td width="50">ID</td>
                <td>Name</td>
                <td width="50">Photo</td>
                <td width="50">OD</td>
                <td width="50">Status</td>
                <td width="50">Action</td>
            </tr>
        `;
        $.ajax({
            url:'action/get-slide.php',
            type:'POST',
            data:{ s:s, e:e, search:search, searchVal:searchVal.val(), filterField:filterField.val()},
            cache:false,
            dataType:"json",
            beforeSend:function(){
                body.append(loading);
            },
            success:function(data){   
            //   console.log(data['0']['totalData']);
                if(data.length ==0){
                    body.find('.popup').remove();
                    tbl.html(th);
                    return;
                }
                var txt = '';
                totalData.text(data[0]['totalData']);
                totalPage.text( Math.ceil( data[0]['totalData'] / e ) );
                data.forEach((e)=>{
                        txt +=`
                            <tr> 
                                <td>${e['id']}</td>
                                <td>${e['name']}</td>
                                <td><img src="img/${e['photo']}" alt="${e['photo']}"></td>
                                <td>${e['od']}</td>
                                <td>${e['status']}</td>
                                <td><i class="fa-solid fa-pen-to-square btnEdit"></i></td>
                            </tr>
                        `;
                });
                tbl.html( th + txt );
                body.find('.popup').last().remove();
            }				
        }); 
        
    }
    //get edit slide
    function  get_edit_slide(eThis){
        var tr = eThis.parents('tr');
        var id = tr.find('td:eq(0)').text();
        var name = tr.find('td:eq(1)').text();
        var photo = tr.find('td:eq(2) img').attr('alt');
        var od = tr.find('td:eq(3)').text();
        var status = tr.find('td:eq(4)').text();
        trInd = tr.index();
        body.append(popup);
        body.append(loading);
        body.find('.popup').first().load("frm/"+frm[frmOpt], function(responseTxt, statusTxt, xhr){
            if(statusTxt == "success")
                body.find('.frm #txt-id').val(id);
                body.find('.frm #txt-name').val(name);
                body.find('.frm .img-box').css({"background-image":`url(img/${photo})`});
                body.find('.frm #txt-photo').val(photo);
                body.find('.frm #txt-od').val(od);
                body.find('.frm #txt-status').val(status);
                body.find(' #txt-edit-id').val(id);
                body.find('.popup').last().remove();
            if(statusTxt == "error")
                alert("Error: " + xhr.status + ": " + xhr.statusText);
        });
    }
     // Save product
     function save_product(eThis){
        var Parent = eThis.parents('.frm');
        var id = Parent.find('#txt-id');
        var slide = Parent.find('#txt-slide');
        var cate_id = Parent.find('#txt-category');
        var sub_cate = Parent.find('#txt-sub-category');
        var name = Parent.find('#txt-name');
        var des = Parent.find('#txt-des');
        var price = Parent.find('#txt-price');
        var dis = Parent.find('#txt-dis');
        var price_dis = Parent.find('#txt-price-dis');
        var od = Parent.find('#txt-od');
        var imgBox = Parent.find('.img-box2');
        var photo = Parent.find(".txt-photo");
        var file = Parent.find("#txt-file2");
        var status = Parent.find('#txt-status');
        if(name.val()==''){
            alert("Please input name.");
            name.focus();
            return;
        }

        var frm = eThis.closest('form.upl');
        var frm_data = new FormData(frm[0]);
        $.ajax({
            url:'action/product.php',
            type:'POST',
            data:frm_data,
            contentType:false,
            cache:false,
            processData:false,
            dataType:'json',
            beforeSend:function(){
                    //work before success 
                    body.append(loading);   
            },
            success:function(data){   
                    //work after success 
                if(data['edit']==true){
                    // tbl.find('tr:eq('+trInd+') td:eq(1)').html(slide.val());
                    tbl.find('tr:eq('+trInd+') td:eq(1)').html(`<span>${slide.val()}</span>${slide.find('option:selected').html()}`);
                    tbl.find('tr:eq('+trInd+') td:eq(2)').html(`<span>${cate_id.val()}</span>${cate_id.find('option:selected').html()}`);
                    tbl.find('tr:eq('+trInd+') td:eq(3)').html(`<span>${sub_cate.val()}</span>${sub_cate.find('option:selected').html()}`);
                    tbl.find('tr:eq('+trInd+') td:eq(4)').text(name.val());
                    tbl.find('tr:eq('+trInd+') td:eq(5)').text(price.val());
                    tbl.find('tr:eq('+trInd+') td:eq(6)').text(dis.val());
                    tbl.find('tr:eq('+trInd+') td:eq(7)').text(price_dis.val());
                    tbl.find('tr:eq('+trInd+') td:eq(8)').text(od.val());
                    tbl.find('tr:eq('+trInd+') td:eq(9) img').attr('src',`img/${photo.val()}`);
                    tbl.find('tr:eq('+trInd+') td:eq(9) img').attr('alt',`${photo.val()}`);
                    tbl.find('tr:eq('+trInd+') td:eq(10)').text(status.val());
                    body.find('.popup').remove();
                }else{
                    var tr=`
                        <tr> 
                            <td>${data['id']}</td>
                            <td>${slide.find('option:selected').text()}</td>
                            <td>${cate_id.find('option:selected').text()}</td>
                            <td>${sub_cate.find('option:selected').text()}</td>
                            <td>${name.val()}</td>
                            <td>${price.val()}</td>
                            <td>${dis.val()}</td>
                            <td>${price_dis.val()}</td>
                            <td>${od.val()}</td>
                            <td><img src="img/${photo.val()}" alt="${photo.val()}"></td>
                            <td>${status.val()}</td>
                            <td><i class="fa-solid fa-pen-to-square btnEdit"></i></td>
                        </tr>
                    `;

                    tbl.find('tr:eq(0)').after(tr);  
                    id.val(parseInt(data['id']) + 1); 
                    od.val(parseInt(data['id']) + 1);
                    name.val('');
                    name.focus();  
                    imgBox.css({"background-image":`url(style/bg-img.jpg)`});
                    file.val('');
                    photo.val('');
                }
                
            body.find('.popup').last().remove();    
                
            }				
        }); 
    }
    // get product
    function get_product(){
        var th=`
            <tr style="background-color:cornflowerblue;">
                <td width="50">ID</td>
                <td width="150">Slide_id</td>
                <td width="150">Category</td>
                <td width="150">Sub_category</td>
                <td>Product Name</td>
                <td width="50">Price</td>
                <td width="50">Discount</td>
                <td width="50">Price.Dis</td>
                <td width="50">OD</td>
                <td width="50">Photo</td>            
                <td width="50">Status</td>
                <td width="50">Action</td>
            </tr>
        `;
        $.ajax({
            url:'action/get-product.php',
            type:'POST',
            data:{ s:s, e:e, search:search, searchVal:searchVal.val(), filterField:filterField.val()},
            cache:false,
            dataType:"json",
            beforeSend:function(){
                body.append(loading);
            },
            success:function(data){   
            //   console.log(data['0']['totalData']);
                if(data.length ==0){
                    body.find('.popup').remove();
                    tbl.html(th);
                    return;
                }
                var txt = '';
                totalData.text(data[0]['totalData']);
                totalPage.text( Math.ceil( data[0]['totalData'] / e ) );
                data.forEach((e)=>{
                    var imglist = `${e['photo'].trim()}`;// 1675161372.png 1675161375.jpg 1675161378.jpg 1675161381.jpg
                    var img = imglist.split(" ");
                        txt +=`
                            <tr> 
                                <td>${e['id']}</td>
                                <td><span>${e['slide_id']}</span>${e['slide_name']}</td>
                                <td><span>${e['cate_id']}</span>${e['category_name']}</td>
                                <td><span>${e['sub_id']}</span>${e['sub_category_name']}</td>
                                <td>${e['name']}</td>
                                <td>${e['price']}</td>
                                <td>${e['dis']}</td>
                                <td>${e['price_dis']}</td>                           
                                <td>${e['od']}</td>
                                <td><img src="img/${img[0]}" alt="${imglist}"></td>                          
                                <td>${e['status']}</td>
                                <td><i class="fa-solid fa-pen-to-square btnEdit"></i></td>
                            </tr>
                        `;
                });
                tbl.html( th + txt );
                body.find('.popup').last().remove();
            }				
        }); 
        
    }  
    //get edit Product
    function  get_edit_product(eThis){
        var tr = eThis.parents('tr');
        var id = tr.find('td:eq(0)').text();
        trInd = tr.index();
        body.append(popup);
        body.append(loading);
        body.find('.popup').first().load("frm/"+frm[frmOpt], function(responseTxt, statusTxt, xhr){
            if(statusTxt == "success")
                $.ajax({
                    url:'action/get-edit-pro.php',
                    type:'POST',
                    data:{id:id},
                    cache:false,
                    dataType:'json',
                    beforeSend:function(){
                            //work before success 
                            // body.append(loading);   
                    },
                    success:function(data){   
                            //work after success 
                            // alert(data.id);
                        body.find('.frm-product #txt-des').val(data.des);
                        body.find('.frm-product #txt-edit-id').val(data.id);
                        body.find('.frm-product #txt-id').val(data.id);
                        body.find('.frm-product #txt-slide').val(data.slide_id);
                        body.find('.frm-product #txt-category').val(data.cate_id);
                        // body.find('.frm-product #txt-sub-category').val(data.sub_id);
                        get_sub_by_category(data.cate_id,data.sub_id);
                        body.find('.frm-product #txt-name').val(data.name);
                        body.find('.frm-product #txt-price').val(data.price);
                        body.find('.frm-product #txt-dis').val(data.dis);
                        body.find('.frm-product #txt-price-dis').val(data.price_dis);
                        body.find('.frm-product #txt-od').val(data.od);
                        
                            var myimg = (data.photo).split(" ");
                            myimg.forEach((e,i)=>{
                                body.find('.frm-product .img-box2').eq(i).css({"background-image":`url(img/${e})`});
                                body.find('.frm-product #txt-photo').eq(i).val(e);
                                // body.find('.popup').last().remove(); 
                            });
                        body.find('.frm-product #txt-status').val(data.status);
                        
    
                        // // body.find('.frm-product #txt-sub-category').val(data.sub_id);
                        // 
                        body.find('.popup').last().remove();    
                        
                    }				
                }); 
            if(statusTxt == "error")
                alert("Error: " + xhr.status + ": " + xhr.statusText);
        });
    }
    //get edit Product
    // function get_edit_product(eThis){
    //     var tr = eThis.parents('tr');
    //     var id = tr.find('td:eq(0)').text();
    //     body.append(popup);
    //     body.append(loading);
    //     body.find('.popup').first().load("frm/"+frm[frmOpt], function(responseTxt, statusTxt, xhr){
    //         if(statusTxt == "success")
    //         // getAutoId();
    //         body.find('.popup').last().remove();
    //         if(statusTxt == "error")
    //           alert("Error: " + xhr.status + ": " + xhr.statusText);
    //     });

    // }
    //get sub by category
    body.on('change','.frm #txt-category',function(){
        var id = $(this).val();
        get_sub_by_category(id,0);
    });
    // get sub by category
    function get_sub_by_category(id,opt1){
        var txt = ' <option value="0">---Select one item---</option>';
        if(id==0){
            return;
        }
        $.ajax({
            url:'action/get-sub-by-cate.php',
            type:'POST',
            data:{id:id},
            cache:false,
            dataType:"json",
            beforeSend:function(){
                body.append(loading);
            },
            success:function(data){   
                data.forEach((e)=>{
                    txt += `<option value="${e['id']}">${e['name']}</option>`;
                });
                $('.frm-product').find('#txt-sub-category').html(txt);
                if(opt1 !=0){
                    body.find('.frm #txt-sub-category').val(opt1);
                }
                body.find('.popup').last().remove();
            }				
        });
    }
    // get edit DATA
    body.on('click',' table tr td .btnEdit',function(){
        var eThis = $(this);
        if(frmOpt == 0 ){
            get_edit_category(eThis);
        }else if(frmOpt==1){
            get_edit_sub_category(eThis);
        }else if(frmOpt==2){
            get_edit_slide(eThis);
        }else if(frmOpt==3){
            get_edit_product(eThis);
        }
    });
    // get auto id
    function getAutoId(){
        $.ajax({
            url:'action/get-auto-id.php',
            type:'POST',
            data:{'ind' : frmOpt},
            cache:false,
            dataType:"json",
            beforeSend:function(){
 
            },
            success:function(data){   
               body.find('.frm #txt-id').val( parseInt(data['id'])+1);
               body.find('.frm #txt-od').val( parseInt(data['id'])+1);
            }				
        }); 
    }
    // Upd image
    body.on('change','.frm .img-box .txt-file',function(){
        var eThis = $(this);
        var Parent = eThis.parents('.frm');
        var photo = Parent.find('#txt-photo');
        var imgBox = Parent.find('.img-box');
        var frm = eThis.closest('form.upl');
        var frm_data = new FormData(frm[0]);
        $.ajax({
            url:'action/upl-img.php',
            type:'POST',
            data:frm_data,
            contentType:false,
            cache:false,
            processData:false,
            dataType:"json",
            beforeSend:function(){
                    //work before success 
                    body.append(loading);   
            },
            success:function(data){   
                    //work after success  
                    imgBox.css({"background-image":`url(img/${data['img_name']})`});
                    photo.val(data['img_name']);
                    body.find('.popup').last().remove();            
            }				
        }); 
    });
    // upload Multi image
    body.on('change','.frm .img-box2 .txt-file2 ',function(){
        var eThis = $(this);
        var Parent = eThis.parents('.img-box2');
        var frm = eThis.closest('form.upl');
        var frm_data = new FormData(frm[0]);
        var photo = Parent.find('#txt-photo');
        frm_data.append("txt-file",eThis[0].files[0]);
        $.ajax({
            url:'action/upl-img.php',
            type:'POST',
            data:frm_data,
            contentType:false,
            cache:false,
            processData:false,
            dataType:"json",
            beforeSend:function(){
                    //work before success 
                    body.append(loading);   
            },
            success:function(data){   
                    //work after success  
                    Parent.css({"background-image":`url(img/${data['img_name']})`});
                    photo.val(data['img_name']);
                    body.find('.popup').last().remove();            
            }				
        }); 
    });
}); 

