$(function(){
  var lid=location.search.split("=")[1];
  //ajax("http://localhost:5050/details",{lid})
  $.ajax({
    url:"http://localhost:5050/details",
    type:"get",
    data:{ lid },
    dataType:"json"
  })
  .then(res=>{
    //res=JSON.parse(res);
    var {product,specs,pics}=res;
    var {title,subtitle,price,promise}=product;
    var html=`<h6 class="font-weight-bold">${title}</h6>
    <h6>
      <a class="small text-dark font-weight-bold" href="javascript:;">${subtitle}</a>
    </h6>
    <div class="alert alert-secondary small" role="alert">
      <div>
        <span>价格：</span>
        <h2 class="d-inline text-primary font-weight-bold">¥${price}</h2>
      </div>
      <div>
        <span>服务承诺：</span>
        <span>${promise}</span>
      </div>
    </div>`;
    var divDetails=document.getElementById("details");
    divDetails.innerHTML=html+divDetails.innerHTML;

    var html="";
    for(var {lid:id,spec} of specs){
      html+=`<a class="btn btn-sm btn-outline-secondary ${id==lid?'active':''}" href="product_details.html?lid=${id}" class="">${spec}</a>`;
    }
    document.querySelector(
      "#details>div:nth-child(5)>div:nth-child(2)"
    ).innerHTML=html;

    var html="";
    for(var {sm,md,lg} of pics){
      html+=`<li class="float-left p-1">
        <img src="${sm}" data-md="${md}" data-lg="${lg}">
      </li>`;
    }
    var ulImgs=document.querySelector(
      "#preview>div>div:nth-child(5)>div:nth-child(2)>ul"
    )
    ulImgs.innerHTML=html;
    ulImgs.style.width=`${pics.length*62}px`;
    var mImg=document.querySelector(
      "#preview>div>img"
    );
    mImg.src=pics[0].md;
    var divLg=document.getElementById("div-lg");
    divLg.style.backgroundImage=`url(${pics[0].lg})`;

    ulImgs.onmouseover=function(e){
      if(e.target.nodeName=="IMG"){
        var img=e.target;
        mImg.src=img.dataset.md;
        divLg.style.backgroundImage=
          `url(${img.dataset.lg})`;
      }
    }
    var mask=document.getElementById("mask");
    var sMask=document.getElementById("super-mask");
    sMask.onmouseover=function(){
      mask.className=mask.className.replace("d-none","");
      divLg.className=divLg.className.replace("d-none","");
    }
    sMask.onmousemove=function(e){
      var {offsetX,offsetY}=e;
      var top=offsetY-88;
      var left=offsetX-88;
      top=top<0?0:top>176?176:top;
      left=left<0?0:left>176?176:left;
      mask.style.top=`${top}px`;
      mask.style.left=`${left}px`;
      divLg.style.backgroundPosition=`${-16/7*left}px ${-16/7*top}px`;
    }
    sMask.onmouseout=function(){
      mask.className+=" d-none";
      divLg.className+=" d-none";
    }

    var btnLeft=document.querySelector(
      "#preview>div>div:nth-child(5)>img"
    );
    var btnRight=
      btnLeft.nextElementSibling.nextElementSibling;
    if(pics.length<=4)
      btnRight.className+=" disabled";
    var moved=0;
    btnLeft.onclick=function(){
      var btn=this;
      if(btn.className.indexOf("disabled")==-1){
        moved--;
        ulImgs.style.marginLeft=`${-moved*62}px`;
        if(moved==0) btn.className+=" disabled";
        if(moved<pics.length-4)
          btnRight.className=btnRight.className.replace("disabled","");
      }
    }
    btnRight.onclick=function(){
      var btn=this;
      if(btn.className.indexOf("disabled")==-1){
        moved++;
        ulImgs.style.marginLeft=`${-moved*62}px`;
        if(pics.length-moved==4)
          btn.className+=" disabled";
        if(moved>0){
          btnLeft.className=btnLeft.className.replace("disabled","");
        }
      }
    }
  })
  /* 轮播图 */
  var index=0;
  var i=0;
  var time;
  //用jquery方法设置第一张图片显示，其余的隐藏
  $('.ig').eq(0).show().siblings('.ig').hide();
  //调用showTime()函数（轮播函数）
  showTime();
  //当鼠标经过下面的数字时，触发两个事件（鼠标悬停和鼠标离开）
  $('.tab').hover(function(){
    //获取当前i的值，并显示，同时还要清除定时器
    i = $(this).index();
    Show();
    clearInterval(timer);
  },function(){
    showTime();
  });
  //鼠标点击左侧的箭头
  $('#main>div>div.detail_img>div#prev').click(function(){
    clearInterval(timer);
    if(i==0){
      i=4;
    }else
    i--;
    Show();
    showTime();
  });
  //鼠标点击右侧的箭头
  $('#main>div>div.detail_img>div#next').click(function(){
    clearInterval(timer);
    if(i==3){
      i=-1;
    }else
    i++;
    Show();
    showTime();
  });
  function Show() {
    $('.ig').eq(i).fadeIn(300).siblings('.ig').fadeOut(300);
    $('.tab').eq(i).addClass('bg').siblings('.tab').removeClass('bg');
  }
  function showTime(){
    timer = setInterval(function(){
      Show();
      i++;
      if(i==4){
        i=0;
      }
    },2000);
  }
})