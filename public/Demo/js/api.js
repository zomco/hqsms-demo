var searchLandContacts=function(){
          $.ajax({
            async : true,
            url : "http://127.0.0.1:8080/camera/vehicle",
            type : "GET",
            dataType : "json",
              success: function(data){//请求成功
                        console.log(data);
                        var tupian=document.querySelector('.tupian');

                        for(var i=0;i<data.length;i++){
                            var img=document.createElement('img');
                            var a="http://localhost:8080/file/";
                            var b=data[i].imageUrl;
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
 var sendMessage = function () {
    setInterval(function () {
        searchLandContacts();
    },15000)
}; 
sendMessage();