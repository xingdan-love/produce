$(function(){
  if(location.search.indexOf("kw=")!=-1){
    var kw=decodeURI(
        location.search.split("=")[1]
    );
    //2. 定义函数loadPage封装$.ajax,定义参数pno，默认=0
    function loadPage(pno=0){
      $.ajax({
        url:"http://localhost:5050/products",
        type:"get",
        data:{ kw, pno },
        dataType:"json",
        success:function(output){
          var {data,pageCount,pno}=output;
          var html="";
          for(var p of data){
            var {lid,md,price,title}=p;
            html+=`<div class="col-md-4 p-1">
              <div class="card mb-4 box-shadow pr-2 pl-2">
                <a href="product_details.html?lid=${lid}">
                  <img class="card-img-top" src="${md}">
                </a>
                <div class="card-body p-0">
                  <h5 class="text-primary">￥${price}</h5>
                  <p class="card-text">
                    <a href="product_details.html?lid=1" class="text-muted small" title="${title}">${title}</a>
                  </p>
                  <div class="d-flex justify-content-between align-items-center p-2 pt-0">
                    <button class="btn btn-outline-secondary p-0 border-0" type="button">-</button>
                    <input type="text" class="form-control p-1" value="1">
                    <button class="btn btn-outline-secondary p-0 border-0" type="button">+</button>
                    <a class="btn btn-primary float-right ml-1 pl-1 pr-1 cart_a" href="cart.html" data-lid="${lid}">加入购物车</a>
                  </div>
                </div>
              </div>
            </div>`
          }
          $("#plist").html(html);
          var html=`<li class="page-item"><a class="page-link bg-transparent" href="#">上一页</a></li>`;
          for(var i=0;i<pageCount;i++){
            html+=`<li class="page-item ${i==pno?'active':''}"><a class="page-link bg-transparent " href="#">${i+1}</a></li>`
          }
          html+=`<li class="page-item"><a class="page-link bg-transparent" href="#">下一页</a></li>`;
          var $ul=$("#plist+h6>nav>ul")
          $ul.html(html);

          if(pno==0)
            $ul.children(":first-child")
                .addClass("disabled");
          if(pno==pageCount-1)
            $ul.children(":last-child")
                .addClass("disabled");
        }
      })
    }
    //3. 页面首次加载时，得自己调用一次loadPage()
    loadPage();
    //1. 将on(click)从$.ajax中剪切到外部和$.ajax平级
    $("#plist+h6>nav>ul")
        .on("click","li>a",function(e){
          e.preventDefault();
          var $a=$(this);
          if($a.parent().is(":not(.active,.disabled)")){
            var $lis=$("#plist+h6>nav>ul>li:gt(0):not(:last)");
            console.log($lis);
            var i=
                $("#plist+h6>nav>ul>li.active>a").html()-1;
            if($a.parent().is(":first-child")){
              loadPage(i-1);
            }else if($a.parent().is(":last-child")){
              loadPage(i+1);
            }else
              loadPage($a.html()-1);
          }
        });
    $("#plist")
        .on(
        "click",
        ".card-body>div>button,.card-body>div>a",
        function(e){
          e.preventDefault();
          var $btn=$(this);
          if($btn.is("button")){
            var n=parseInt($btn.siblings("input").val());
            if($btn.html()=="+")
              n++;
            else if(n>1)
              n--;
            $btn.siblings("input").val(n);
          }else{
            var lid=$btn.attr("data-lid");
            var count=$btn.siblings("input").val();
            $.ajax({
              url:"http://localhost:5050/users/islogin",
              type:"get",
              dataType:"json",
              success:function(data){
                if(data.ok==0){
                  alert("请先登录!");
                  location.href="http://localhost:5050/login.html?back="+location.href;
                }else{
                  $.ajax({
                    url:"http://localhost:5050/cartItems/add",
                    type:"get",
                    data:{lid,count},
                    success:function(){
                      $btn.siblings("input").val(1);
                      alert("添加购物车成功!");
                    }
                  })
                }
              }
            })
          }
        }
    );
  }
  function loadCart(){
    $("#cart>li:gt(0):not(:last)").remove();
    $.ajax({
      url:"http://localhost:5050/users/islogin",
      type:"get",
      dataType:"json",
      success:function(data){
        if(data.ok==1){
          $.ajax({
            url:"http://localhost:5050/cartItems",
            type:"get",
            dataType:"json",
            success:function(items){
              var $ul=$("#cart"),total=0;
              for(var item of items){
                var {title,price,count,iid,is_checked}=item;
                price=parseInt(price);
                total+=price*count;
                $(`<li class="p-0 list-group-item d-flex justify-content-between lh-condensed">
                  <div class="input-group input-group-sm mt-1 mb-1">
                    <div class="input-group-prepend">
                      <span class="input-group-text text-truncate bg-white p-1 border-0 d-inline-block" title="${title}">${title}</span>
                      <button class="btn btn-outline-secondary p-0 border-0" type="button" data-iid="${iid}">-</button>
                    </div>
                    <input type="text" class="form-control p-1" aria-label="Small" value="${count}" aria-describedby="inputGroup-sizing-sm">
                    <div class="input-group-append">
                      <button class="btn btn-outline-secondary p-0 border-0" type="button" data-iid="${iid}">+</button>
                      <span class="input-group-text bg-white border-0 p-0 pl-1">¥${(price*count).toFixed(2)}</span>
                    </div>
                  </div>
                </li>`)
                    .insertBefore("#cart>li:last-child");
              }
              $ul.find("li:last-child>h4").html(`¥${total.toFixed(2)}`);
            }
          })
        }
      }
    })
  }
  loadCart();
  $("#cart").on("click","button",function(){
    var $btn=$(this);
    var count=
        parseInt($btn.parent().siblings("input").val());
    if($btn.html()=="+")
      count++;
    else
      count--;
    var iid=$btn.attr("data-iid");
    $.ajax({
      url:"http://localhost:5050/cartItems/update",
      type:"get",
      data:{iid,count},
      success:loadCart
    })
  })
})