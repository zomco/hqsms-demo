// var div=document.querySelector('.img');
// for(var i=0;i<data.length;i++){
//     var img=document.createElement('img');
//     img.src=data.src;
//     div.appendChild(img);
// }
// // 创建对象
// var xhr =new XMLHttpRequest();
// // 设置请求行
// xhr.open('get','');
// // 设置请求头（get可以省略，post不发数据也可以省略）

// // 注册回调函数
// xhr.onload=function(){
//   var div=document.querySelector('.img');
//   for(var i=0;i<data.length;i++){
//     var img=document.createElement('img');
//     img.src=data.src;
//     div.appendChild(img);
// }
// // 请求主体发送
// xhr.send(null);
// }


// 封装ajax
function ajax(option){
  var xhr = new XMLHttpRequest();
  // 如果是get并且有数据
  if(option.type=='get'&&option.data){
    option.url+='?';
    option.url+=option.data;
    option.data=null; //这里最后直接send data即可
  }
  xhr.open(option.type,option.url);
  // 如果是post并且有数据
  if(option,type=='post'&&option.data){
    xhr.setRequestHeader('Content-type','application/x-www-form-urlencoded');
  }
  xhr.onreadystatechange=function(){
    if(xhr.readyState==4&&xhr.status==200){
      // option.success(xhr.responseText);
      // console.log(xhr.getResponseHeader('Content-type'));
      var type=xhr.getResponseHeader('Content-type');
      // 是否为json
      if(type.indexOf('json')!=-1){
        option.success(JSON.parse(xhr.responseText));
      }
      // 是否为xml
      else if(type.indexOf('xml')!=-1){
        option.success(JSON.parse(xhr.responseText));
      }
    }
  }
  xhr.send(option.data);
}
