$(function(){
    /*点击某个电梯按钮时自动跳转到相应的楼层*/
    $(".scroll_floor>button").click(function(){
        $(this).removeClass("bg");
        $(this).addClass("bg").siblings(".button_floor").removeClass("bg");
        var index = $(this).index();
        var top = $(".banner").eq(index).offset().top;
        $("html,body").stop(true).animate({"scrollTop":top});
    })
    /*返回页面顶部*/
    $("#button_top").click(function(){
        $(this).css("background-color","red");
        $(this).siblings(".button_floor").removeClass("bg");
        $("html,body").animate({scrollTop:0},500);
    })
    //楼层滚动部分
    $(window).scroll(function(){
            var scrollTop=$("html,body").scrollTop();
            $(".banner").each((i,f)=>{
                var offsetTop=$(f).offset().top;
                if(innerHeight/2+scrollTop>offsetTop){
                    $(".scroll_floor").children(`:eq(${i})`).addClass("bg").siblings().removeClass("bg");
                }
            })
    })
})