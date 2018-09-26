//ajax("http://localhost:3000/header.html")
$(function(){
  $.ajax({
    url:"http://localhost:5050/header.html",
    type:"get"
  })
  .then(res=>{
    document.getElementById("header")
      .innerHTML=res;
    var btnSearch=document.querySelector(
      "#header>nav>div>div>div>a"
    );
    var input=btnSearch.parentNode
                      .previousElementSibling;
    btnSearch.onclick=function(){
      if(input.value.trim()!=="")
        location.href=`http://localhost:5050/products.html?kw=${input.value}`;
    }
    input.onkeyup=function(e){
      if(e.keyCode==13)
        btnSearch.onclick();
    }

    if(location.search.indexOf("kw=")!=-1){
      input.value=
        decodeURI(location.search.split("=")[1]);
    }
    function isLogin(){
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
    isLogin();
    $("#btnSignout").click(function(e){
      e.preventDefault();
      $.ajax({
        url:"http://localhost:5050/users/signout",
        type:"get",
        success:isLogin
      })
    })
    $("#btnLogin").click(function(e){
      e.preventDefault();
      location.href=
        "http://localhost:5050/login.html?back="+location.href;
    })
  });
})
//每个页面body结尾:
  //script src="js/ajax.js"
  //script src="js/header.js"
