module.exports = {
    devServer : {
        host: "localhost",
        port: 8081, // 端口号
        https: false, // https:{type:Boolean}
        open: true, //配置自动启动浏览器
        proxy:  {
            "/api" : {
                //  target: "http://47.115.144.65/api",
                 target:"http://192.168.1.200:8080/api/",
                 changeOrigin: true,
                 pathRewrite: {
                    '^/api': '' 
                 }    
            }
        }
    }     
}