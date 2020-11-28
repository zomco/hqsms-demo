// 人脸抓拍
var searchLandContact1=function(){
          $.ajax({
            async : true,
            url : "http://127.0.0.1:8080/camera/human",
            type : "GET",
            dataType : "json",
              success: function(data){//请求成功
                        // console.log(data);
                        var tupian=document.querySelector('.tupian');
                        for(var i=0;i<data.length;i++){
                            var img=document.createElement('img');
                            var a= "http://localhost:8080/file/"
                            var b=data[i].faceUrl;
                            var url=a+b;
                            img.src=url;
                            tupian.appendChild(img);
                        }     
                       },
              error:function(msg){//请求失败
                  console.log(msg);
              }
 
          });
 }; 
//  车牌抓拍
 var searchLandContact2=function(){
    $.ajax({
      async : true,
      url : "http://127.0.0.1:8080/camera/vehicle",
      type : "GET",
      dataType : "json",
        success: function(data){//请求成功
                  // console.log(data);
                  var ztupian=document.querySelector('.ztupian');
                  for(var i=4;i<data.length;i++){
                      var img=document.createElement('img');
                      var a= "http://localhost:8080/file/"
                        var b=data[i].plateUrl;
                        var url=a+b;
                        img.src=url;
                        if(url.status!==404){
                        ztupian.appendChild(img);
                      }
                      
                  }     
                 },
        error:function(msg){//请求失败
            console.log(msg);
        }

    });
};
// 定时抓取
var sendMessage = function () {
    setInterval(function () {
        searchLandContact1();
        searchLandContact2();
    },15000)
}; 
sendMessage();

$(function(){
    $(".input_sub").click(function(){
        var plateChars=$("#input_text").val();
        $.ajax({
            type:"GET",
            url:"http://127.0.0.1:8080/camera/vehicle?plateChars="+plateChars,
            dataType:"json",
            success:function(data){
                showImage(data);
            },
            error:function(msg){
                console.log(msg);
                alert('查询失败！请检查您的网络稍后再试');
            }
        });
        //搜索到的车牌展示
        function showImage(data){
            var a= "http://localhost:8080/file/";
            var b=a+data[0].plateUrl;
            // var mask  =   $("<div class='mask'>\n"+
            //         "<div class='plate'>\n"+
            //         "<img src=http://localhost:8080/file/+'data[0].plateUrl+' alt=''>\n"+
            //         "<span></span>\n"+
            //          "</div>"+
            //         "</div>");
            // var mask=$(".mask").html('<img src=http://localhost:8080/file/"+data[0].plateUrl+" width="70" height="70" >')
            var mask=$('.mask').attr("src", b);
            $(".mask").append(mask);
            $(".mask").delegate(".plate>span","click",function(){
                $mask.remove();
            })
    }
})
// 图片上传
$(".formData").on("change",function(evt){
var formData=new FormData();
var files=evt.target.files;
formData.append("file",files[0]);
$.ajax({
    url:"http://127.0.0.1:8080/camera/human/feature",
    data:formData,
    type:"POST",
    contentType: false,
    cache:false,//上传图片不需要缓存
    processData: false,	
    success:function(data){
    //    console.log(JSON.stringify(data)); 
       var code=JSON.stringify(data)
    //    console.log(code);
       $.ajax({
           url:"http://127.0.0.1:8080/camera/human",
           type:"get",
           data:{
               "code":code,
           },
           dataType:"json",
           cache:false,
           traditional:true,
           success:function(data){
            var rmask = "";
            for(i=0;i<=5;i++){
            // var a= "http://localhost:8080/file/";
            var b=data[i].faceUrl;
            rmask += "<img src=http://localhost:8080/file/"+b+">"
            // var rmask=$(".rmask").html("<img src=http://localhost:8080/file/"+b+">")
            
            }
            $(".rmask").html(rmask);
           }
       });
    },
    error:function(){
        alert("图片上传失败");
    }
})
});   
});




