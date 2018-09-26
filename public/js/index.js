$(function(){
  //ajax("http://localhost:3000/index")
  $.ajax({
    url:"http://localhost:5050/index",
    type:"get",
    dataType:"json" //JSON.parse(res)
  })
      .then(products=>{
        //var products=JSON.parse(res);
        var {title, details, price, pic, href,title1,details1}=products[0];
        var html=`<div class="card flex-column bg-white text-center">
              <img src="${pic}" alt="" class="h-100"/>
             <div class="card-body">
               <h3>${title}</h3>
               <h6><s>${details}</s></h6>
               <h5 class="font-weight-bold">${title1}</h5>
               <h6>${details1}</h6>
               <a href="${href}" class="btn bg-success text-white">查看详情</a>
             </div>
            </div>`;
        var first=document.querySelector(
            ".brank1"
        );
        first.innerHTML=html;

        var {title, details, price, pic, href,details1,title1}=products[1];
        var html=`<div class="card flex-column bg-white text-center">
              <img src="${pic}" alt="" class="h-100"/>
             <div class="card-body">
               <h3>${title}</h3>
               <h6><s>${details}</s></h6>
               <h5 class="font-weight-bold">${title1}</h5>
               <h6>${details1}</h6>
               <a href="${href}" class="btn bg-success text-white">查看详情</a>
             </div>
            </div>`;
        var first=document.querySelector(
            ".brank2"
        );
        first.innerHTML=html;

          var {title, details, price, pic, href,details1,title1}=products[2];
          var html=`<div class="card flex-column bg-white text-center">
              <img src="${pic}" alt="" class="h-100"/>
             <div class="card-body">
               <h3>${title}</h3>
               <h6><s>${details}</s></h6>
               <h5 class="font-weight-bold">${title1}</h5>
               <h6>${details1}</h6>
               <a href="${href}" class="btn bg-success text-white">查看详情</a>
             </div>
            </div>`;
          var first=document.querySelector(
              ".brank3"
          );
          first.innerHTML=html;

          var {title, details, price, pic, href,details1,title1}=products[3];
          var html=`<div class="card flex-column bg-white text-center">
              <img src="${pic}" alt="" class="h-100"/>
             <div class="card-body">
               <h3>${title}</h3>
               <h6><s>${details}</s></h6>
               <h5 class="font-weight-bold">${title1}</h5>
               <h6>${details1}</h6>
               <a href="${href}" class="btn bg-success text-white">查看详情</a>
             </div>
            </div>`;
          var first=document.querySelector(
              ".brank4"
          );
          first.innerHTML=html;

          var {title, details, price, pic, href,details1,title1}=products[4];
          var html=`<div class="card flex-column bg-white text-center">
              <img src="${pic}" alt="" class="h-100"/>
             <div class="card-body">
               <h3>${title}</h3>
               <h6><s>${details}</s></h6>
               <h5 class="font-weight-bold">${title1}</h5>
               <h6>${details1}</h6>
               <a href="${href}" class="btn bg-success text-white">查看详情</a>
             </div>
            </div>`;
          var first=document.querySelector(
              ".brank5"
          );
          first.innerHTML=html;

          var {title, details, price, pic, href,details1,title1}=products[5];
          var html=`<div class="card flex-column bg-white text-center">
              <img src="${pic}" alt="" class="h-100"/>
             <div class="card-body">
               <h3>${title}</h3>
               <h6><s>${details}</s></h6>
               <h5 class="font-weight-bold">${title1}</h5>
               <h6>${details1}</h6>
               <a href="${href}" class="btn bg-success text-white">查看详情</a>
             </div>
            </div>`;
          var first=document.querySelector(
              ".brank6"
          );
          first.innerHTML=html;

          var {title, details, price, pic, href,details1,title1}=products[6];
          var html=`<div class="card flex-column bg-white text-center">
              <img src="${pic}" alt="" class="h-100"/>
             <div class="card-body">
               <h3>${title}</h3>
               <h6><s>${details}</s></h6>
               <h5 class="font-weight-bold">${title1}</h5>
               <h6>${details1}</h6>
               <a href="${href}" class="btn bg-success text-white">查看详情</a>
             </div>
            </div>`;
          var first=document.querySelector(
              ".brank7"
          );
          first.innerHTML=html;

          var {title, details, price, pic, href,details1,title1}=products[7];
          var html=`<div class="card flex-column bg-white text-center">
              <img src="${pic}" alt="" class="h-100"/>
             <div class="card-body">
               <h3>${title}</h3>
               <h6><s>${details}</s></h6>
               <h5 class="font-weight-bold">${title1}</h5>
               <h6>${details1}</h6>
               <a href="${href}" class="btn bg-success text-white">查看详情</a>
             </div>
            </div>`;
          var first=document.querySelector(
              ".brank8"
          );
          first.innerHTML=html;
      });
    /*导航菜单栏部分*/
    $("ul.ul_select li:gt(0)").mouseenter(function(){
        var index=$(this).index();
        console.log(index);
        $(this).parent().parent().siblings('.mask_right').eq(index-1).stop(false).fadeIn();
        $(this).parent().parent().siblings('.mask_right').eq(index-1).mouseenter(function(){
            $(this).fadeIn();
        })
    })
    $("ul.ul_select li:gt(0)").mouseleave(function(){
        var index=$(this).index();
        console.log(index);
        $(this).parent().parent().siblings('.mask_right').eq(index-1).stop(false).fadeOut();
        $(this).parent().parent().siblings('.mask_right').eq(index-1).mouseleave(function(){
            $(this).fadeOut();
        })
    })
})

