// 车牌搜索
function plateSearch(){
    var plateChars=$(".input_text").val();
    //判断
    if(plateChars.length==0){
        $(".input_text").tips({msg:"请输入车牌号！"});
        return;
    }
    $(".input_sub").on("click",function(){
        
        $.ajax({
            async:true,
            type:"get",
            url:"http://127.0.0.1:8080/camera/vehicle?plateChars="+plateChars,
            dataType:"json",
            success:function(res){
                showImage(res);
            },
            error:function(msg){
                console.log(msg);
                alert('查询失败！请检查您的网络稍后再试');
            }
        });
        function showImage(res){
            var a= "http://localhost:8080/file/";
            var b=a+res.plateUrl;
            var $mask  =   $("<div class='mask'>\n"+
                    "<div class='plate'>\n"+
                    "<img src='b' alt=''>\n"+
                    "<span></span>\n"+
                     "</div>"+
                    "</div>");
            $("body").append($mask);
            $("body").delegate(".plate>span",click,function(){
                $mask.remove();
            })
    }
})
    
}