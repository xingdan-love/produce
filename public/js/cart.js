$(function() {
    function loadCart() {
        $(".cart>div:not(:last)").remove();
        $.ajax({
            url: "http://localhost:5050/users/islogin",
            type: "get",
            dataType: "json",
            success: function (data) {
                if (data.ok == 1) {
                    $.ajax({
                        url: "http://localhost:5050/cartItems",
                        type: "get",
                        dataType: "json",
                        success: function (items) {
                            var total = 0;
                            for (var item of items) {
                                var {title,price,count,iid,md,product_id,is_checked,is_del}=item;
                                if (is_del == "1") {
                                    var del = "删除";
                                }
                                price = parseInt(price);
                                total += price * count;
                                $(`<div class="container" id="cart-list"><div class=" row bg-white mb-3">
        <div class="col-md-1 border text-center">
          <input type="checkbox" class="mt-5 input_checked" data-iid='${iid}'>
        </div>
        <div class="col-md-5 card flex-md-row box-shadow pt-1">
          <a href="product_details.html?lid=${product_id}" class="pt-2">
            <img class="card-img-left flex-auto d-none d-md-block" src="${md}" width="100px" height="100px">
          </a>
          <div class="card-body d-flex flex-column align-items-start mt-2">
            <a class="text-dark small pt-3" href="product_details.html?lid=${product_id}">${title}</a>
          </div>
        </div>
        <div class="col-md-2 border text-center pt-2">
          <p class="mt-3 pt-4">${(price).toFixed(2)}</p>
        </div>
        <div class="col-md-1 border px-0 py-5 text-center">
          <button class="btn btn-secondary p-0 py-0 border-1 cart_button" data-iid='${iid}' type="button">-</button>
          <input type="text" class="cart_input"value="${count}">
          <button class="btn btn-secondary p-0 py-0 border-1 cart_button" data-iid='${iid}' type="button">+</button>
        </div>
        <div class="col-md-2 border pt-5 text-center">
          <span class="d-inline-block py-1">${(price * count).toFixed(2)}</span>
        </div>
        <div class="col-md-1 border py-2">
          <a class="btn btn-sm btn-link text-muted text-center small cart_del" href="#" data-iid="${iid}">${del}</a>
        </div>
      </div></div>`).insertBefore("#cart-footer");
                            }
                            $(".total").html(`${total.toFixed(2)}`);
                        }
                    })
                }
            }
        })
    }
    loadCart();
    $("div.cart").on("click", "button.cart_button", function () {
        var $btn = $(this);
        var count = parseInt($btn.siblings("input").val());
        if ($btn.html() == "+")
            count++;
        else
            count--;
        var iid = $btn.attr("data-iid");
        $.ajax({
            url: "http://localhost:5050/cartItems/update",
            type: "get",
            data: {iid, count},
            success: loadCart
        })
    })
    function selectAll(){
        $(".selectAll").click(function () {
            if ($(this).prop("checked")) {
                $(".input_checked").prop("checked", true);
            } else {
                $(".input_checked").prop("checked", false);
            }
        })
    }
    selectAll();

    $("div.cart").on("click", ".cart_del", function (){
        console.log(11)
        $cart=$(this);
        var count = parseInt($cart.parent().parent().find("input.cart_input").val());
        console.log(count);
        var iid = $cart.attr("data-iid");
        console.log(iid);
        $.ajax({
            url:"http://localhost:5050/cartItems/delete",
            type:"get",
            data:{iid, count},
            success:function(){
                loadCart,
                window.location.reload()
            }
        })
    })

})
