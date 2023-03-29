
var logon = document.getElementsByClassName("logon")[0];
// var email=document.getElementById('userEmail').value;

logon.onclick = function () {
   
            alert('注册成功，欢迎进入');
            window.location.href = '../html/behind.html';
        }
    

var text = document.getElementsByClassName("text")[0]; //获取验证码按钮
var time = 59;

// 注册单击事件
text.onclick = function () {
    var email = document.getElementById('userEmail').value;

    if (email == "") {
        alert("邮箱为空，请重新输入！");
    }
    if (email != "") {
        var reg = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
        isok = reg.test(email);
        if (!isok) {
            alert("邮箱格式不正确，请重新输入！");

        }
    
    else if(isok){ 
    console.log(11111);
    // 禁用按钮
    text.disabled = true;
    // 开启定时器
    var timer = setInterval(function () {
        // 判断剩余秒数
        if (time <=0) {
            // 清除定时器和复原按钮
            clearInterval(timer);
            text.disabled = false;
            text.innerHTML = `获取验证码`; 
           
        } else {
            text.innerHTML = `重新发送(${time}s)`;
            time--;
        }
    }, 1000);
}
}
}





