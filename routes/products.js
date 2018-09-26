const express=require("express");
var router=express.Router();
var query=require("./query");
router.get("/",(req,res)=>{
  var output={
    count:0,
    pageSize:9,
    pageCount:0,
    pno:req.query.pno,
    data:[]
  };
  var kw=req.query.kw;
  //"mac i5 128g"
  var kws=kw.split(" ");
  //[mac,i5,128g]
  kws.forEach((elem,i,arr)=>{
    arr[i]=`title like '%${elem}%'`;
  })
  /*[
    title like '%mac%',
    title like '%i5%',
    title like '%128g%'
  ]*/
  //join(" and ");
  var where=kws.join(" and ");
  //"title like '%mac%' and title like '%i5%' and title like '%128g%'"
  var sql=`select *,(select md from xz_laptop_pic where laptop_id=lid limit 1) as md from xz_laptop where ${where}`;
  query(sql,[])
  .then(result=>{
    output.count=result.length;
    output.pageCount=
      Math.ceil(output.count/output.pageSize);
    sql+=` limit ?,?`;
    return query(sql,[output.pageSize*output.pno,output.pageSize]);
  })
  .then(result=>{
    output.data=result;
    res.send(output);
  })
})
module.exports=router;
//http://localhost:3000/products?kw=i5&pno=2