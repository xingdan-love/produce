$(function(){
    /* 获取客户端数据 */
    /*  用户名的验证   */
    $("#uname").blur(function(){
        if($("#uname").val().length==0) {
            $(".span1").addClass("msg-error");
            $(".span1").html("用户名不能为空");
        }else if($("#uname").val().length>=3&&$("#uname").val().length<=12){
            $(".span1").addClass("msg-success");
            $(".span1").html("用户名正确");
        }else{
            $(".span1").addClass("msg-error ");
            $(".span1").html("用户名长度在3到12位之间");
        }
    })

    /* 用户密码的验证 */
    $("#upwd").focus(function(){
        $(".span2").removeClass("hidden");
    })
    $("#upwd").blur(function(){
            if($("#upwd").val().length==0) {
                $(".span2").addClass("msg-error");
                $(".span2").html("用户密码不能为空");
            }else if($("#upwd").val().length>=6&&$("#upwd").val().length<=12){
            $(".span2").addClass("msg-success");
            $(".span2").html("用户密码正确");
        }else{
            $(".span2").addClass("msg-error ");
            $(".span2").html("用户密码长度在6到12位之间");
        }
    })
    /*  用户验证密码   */
    $("#upwdconfirm").focus(function(){
        $(".span3").removeClass("hidden");
    })
    $("#upwdconfirm").blur(function(){
        if($("#upwdconfirm").val().length==0){
            $(".span3").addClass("msg-error");
            $(".span3").html("密码不能为空");
        }else if($("#upwd").val().length!==$("#upwdconfirm").val().length){
            $(".span3").addClass("msg-error");
            $(".span3").html("两次密码输入不一致!");
        }else{
            $(".span3").removeClass("msg-error");
            $(".span3").addClass("msg-success");
            $(".span3").html("密码正确!");
        }
    })
    /*  邮箱的验证  */
    var reg1=/^\w*[@]{1}\w*[.]{1}\w*$/;
    $("#email").focus(function(){
        $(".span4").removeClass("hidden");
    })
    $("#email").blur(function(){
        if($("#email").val().length==0){
            $(".span4").addClass("msg-error");
            $(".span4").html("邮箱不能为空");
        }else if(!reg1.test($("#email").val())){
            $(".span4").removeClass("msg-success");
            $(".span4").addClass("msg-error");
            $(".span4").html("请输入正确格式的地址");
        }else{
            $(".span4").removeClass("msg-error");
            $(".span4").addClass("msg-success");
            $(".span4").html("邮箱正确!");
        }
    })

    /* 电话号码的验证 */
    var reg=/^1\d{10}$/;
    $("#phone").focus(function(){
        $(".span5").removeClass("hidden");
    })
    $("#phone").blur(function(){
        if($("#phone").val().length==0){
            $(".span5").addClass("msg-error");
            $(".span5").html("手机号不能为空");
        }else if(!reg.test($("#phone").val())){
            $(".span5").addClass("msg-error");
            $(".span5").html("请输入11位数的手机号");
        }else{
            $(".span5").removeClass("msg-error");
            $(".span5").addClass("msg-success");
            $(".span5").html("手机号正确!");
        }
    })

    /*  表单验证 */
    $('#bt-register').click(function () {
        var uname=$("#uname").val();
        var upwd=$("#upwd").val();
        var email=$("#email").val();
        var phone=$("#phone").val();
        var count = 0;
        $('.form-group').each(function () {
            if ($(this).find('span').hasClass('msg-success')) {
                count++;
            }
        });
        if (count == 5) {
            $.ajax({
                    url: "http://localhost:5050/users/register",
                    type:"get",
                    data:{uname,upwd,email,phone},
                    success: function(data){
                        if(data.success==200){
                            location.href="login.html"
                        }
                    }
                }
            )
        }
    })
})
