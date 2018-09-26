$(function(){
    $("[data-toggle=item]").parent().parent().on("click","[data-toggle=item]",function(e){
        e.preventDefault();
        var $a=$(this);
        $a.parent().addClass("active1").siblings().removeClass("active1");
        var id=$a.attr("href");
        $(id).addClass("active2").siblings().removeClass("active2");
    })
    $.ajax({
        url:"http://localhost:5050/users/isshow",
        type:"get",
        success:function(data){
            //测试获取的数据
            //console.log(data.uname);
            //console.log(data.phone);
            //console.log(data.email);
            $(".base-info>p:eq(0)>input").val(`${data.uname}`);
            $(".base-info>p:eq(1)>input").val(`${data.phone}`);
            $(".base-info>p:eq(2)>input").val(`${data.email}`);
        }
    })

   $(".btn_save").click(function(){
       var uname=$(".base-manager>p:eq(0)>input").val();
       var phone=$(".base-manager>p:eq(1)>input").val();
       var email=$(".base-manager>p:eq(2)>input").val();
       var upwd=$(".base-manager>p:eq(3)>input").val();
       $.ajax({
           url:"http://localhost:5050/users/update",
           type:"get",
           data:{uname,phone,email,upwd},
           dataType:"json",
           success:function(result){
               if(result.ok=="1"){
                   alert("修改成功!");
                   location.href="login.html";
                       $.ajax({
                           url:"http://localhost:5050/users/islogin",
                           type:"get",
                           dataType:"json",
                           success:function(data){
                               if(data.ok==0){
                                   $("#signout").show().next().hide();
                               }else{
                                   $("#signout").hide().next().show();
                                   $("#uname").html(data.uname);
                               }
                           }
                       })
               }
           }
       })
   })
})