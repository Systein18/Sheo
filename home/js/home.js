$(document).ready(function(){
    
    var body = $('body');

    const img = [
        {"img":"home/img/8.jpg"},
        {"img":"home/img/9.jpg"},
        {"img":"home/img/10.jpg"},
        {"img":"home/img/7.jpg"},
        {"img":"home/img/6.jpg"},
    ];
    // get slide
    function get_slide(){
        let txt = ''; 
        let txtPage = '';
        img.forEach((e,i)=>{
            txt+=`
            <div class="slide">
                <div class="box">
                    ${i+1} / ${img.length}
                </div>
                <img src="${e['img']}" alt="">
            </div>  
            `;
            txtPage +=`
                <li>${i+1}</li>
            `;
        });
        var Pagebox = `<div class="page-box"><ul>${txtPage}</ul></div>`;
        $('.allBox').append(txt);
        $('.allBox').append(Pagebox);
        body.find(".allBox .page-box ul li").eq(0).addClass("active");
    }
    //
    body.on('click','.allBox .page-box ul li',function(){
        $(this).parent().find("li").removeClass("active");
        $(this).addClass("active");
        Slide.eq(ind).hide();
        ind = $(this).index();
        Slide.eq(ind).show();
    });
    get_slide();

    // slide
    var Slide = $('.slide');
    var numSlide = Slide.length;//3
    var ind = 0;
        Slide.hide();
        Slide.eq(ind).show();
    //Next slide
    function nextSlide(){
        Slide.eq(ind).hide();
        body.find(".allBox .page-box ul li").eq(ind).removeClass("active");
        ind++;
        if(ind >= numSlide){
            ind=0;
        }
        Slide.eq(ind).show();
        body.find(".allBox .page-box ul li").eq(ind).addClass("active");
    }
    $("#btnNext").click(function(){
        nextSlide();
    });
    var myNextslide = setInterval(
        nextSlide,
        3000
    );
    //Back Slide
    $('#btnBack').click(function(){
        Slide.eq(ind).hide();
        body.find(".allBox .page-box ul li").eq(ind).removeClass("active");
        ind--;
        if( ind < 0 ){
            ind = numSlide-1;
        }
        Slide.eq(ind).show();
        body.find(".allBox .page-box ul li").eq(ind).addClass("active");
    });
    // Stop auto Slide
    $('.allBox').mouseover(function(){
        clearInterval(myNextslide);
    });
    //Start auto slide
    $('.allBox').mouseleave(function(){
        myNextslide = setInterval(
            nextSlide,
            3000
        );
    });
});