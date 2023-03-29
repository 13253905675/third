var random = document.getElementsByClassName("random")[0];
var names = document.getElementById("userName");
var key = document.getElementById("userPassword");
var send = document.querySelector(".send");
var firstLogon = document.getElementsByClassName("firstLogon")[0];
var eye = document.getElementsByClassName("eye")[0];
console.log(send);
var flag = 0;
eye.onclick = function () {
  if (flag == 0) {
    key.type = "text";
    eye.src = "../img/眼睛_显示_o.svg";
    flag = 1;
  } else {
    key.type = "password";
    eye.src = "../img/眼睛-闭眼.svg";
    flag = 0;
  }
};

send.onclick = function () {
  $.ajax({
    type: "POST",
    url: "http://118.195.129.130:3000/user/login",
    data: {
      us: names.value,
      ps: key.value,
    },
    success: function (result) {
      if (result.err == 0) {
        alert("登录成功");
        console.log(result.data[0]._id);

        window.localStorage.setItem("_id", result.data[0]._id);
        window.localStorage.setItem("a", 1111);
        window.location.href = "../html/behind.html";
        $(document).ready(function () {
          $("send").click(function () {
            $("p").html("names.value");
          });
        });
      } else {
        alert("登录失败,请重新输入");
      }
    },
  });
};
firstLogon.onclick = function () {
  window.location.href = "../html/logon.html";
};
