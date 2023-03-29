document.getElementsByClassName('blackBox')[0].style.display = "none";
var random=document.getElementsByClassName('random')[0];
var nameInfo = document.getElementById('nameInfo')
var lis = document.getElementsByClassName("nav")[0].getElementsByTagName("li");
var page = 1;
var per_page = 9;
var allIndexs = 0;
var last = document.getElementsByClassName('last')[0];
var next = document.getElementsByClassName('next')[0];
var allThree=document.getElementsByClassName('allThree');
console.log(localStorage.getItem('_id'));
$.ajax({
    url:'http://118.195.129.130:3000/user/inquire',
    type:'POST',
    data:{
        _id:window.localStorage.getItem('_id')
    },
    success:function(result){
        random.innerHTML=result.data[0].us;
    },
})
function getUserInfo() {
    $.ajax({
        type: "POST",
        url: "http://118.195.129.130:3000/users/getInfoByPage_users",
        data: {
            page: page,
            per_page: per_page,
        },
        success: function (result) {
            console.log(result);
            nameInfo.innerHTML = ''
            for (var i = 0; i < result.data.length; i++) {
                var sex='男'
                if(result.data[i].sex ==1){
                    console.log(999)
                    sex='女'
                }
                nameInfo.innerHTML += "<ul class='infoSty'>" + "<li>" + result.data[i].us + "</li>" + "<li >" + result.data[i].phone + "</li>" +
                    "<li >" + result.data[i].age + "</li>" + "<li >" + sex + "</li>"
                    + "<li>" + "<button class='revise'>修改</button>" + "<button class='deletes'>删除</button>" + "</li>" + "<li class='hid'>" + JSON.stringify(result.data[i]) + "</li>" + "</ul>"

            }
            var revise = document.getElementsByClassName("revise");
            for (var i = 0; i < revise.length; i++) {
                revise[i].onclick = function () {
                    var blackBox = document.getElementsByClassName('blackBox')[0];
                    var sure = document.getElementsByClassName("sure")[0];
                    var useName = document.getElementsByClassName("useName")[0];
                    var useAge = document.getElementsByClassName("useAge")[0];
                    var useSex = document.getElementsByClassName("useSex")[0];
                    document.getElementsByClassName("reviseBox")[0].style.display = "";
                    document.getElementsByClassName('blackBox')[0].style.display = "";
                    document.addEventListener("click", handler, true);
                    function handler(event) {
                        event = event || window.event;//设置兼容性
                        event.preventDefault ? event.preventDefault() : (event.retrunValue = false);//设置兼容性
                        event.stopPropragation ? event.stopPropragation() : (event.cancelBubble = true)//设置兼容性
                    }
                    userUs = JSON.parse(this.parentElement.parentElement.lastElementChild.innerText).us;
                    useName.value = userUs;
                    useA = JSON.parse(this.parentElement.parentElement.lastElementChild.innerText).age;
                    useAge.value = useA;
                    useS = JSON.parse(this.parentElement.parentElement.lastElementChild.innerText).sex;
                    useSex.value = useS;
                    useId = JSON.parse(this.parentElement.parentElement.lastElementChild.innerText)._id;
                    document.removeEventListener('click', handler, true);
                    sure.onclick = function () {
                        $.ajax({
                            type: "POST",
                            url: "http://118.195.129.130:3000/users/update_users",
                            data: {
                                _id: useId,
                                us: useName.value,
                                age: useAge.value,
                                sex: useSex.value,
                            },
                            success: function (result) {
                                alert("修改成功");
                                document.getElementsByClassName("reviseBox")[0].style.display = "none";
                                document.getElementsByClassName('blackBox')[0].style.display = "none";

                            }
                        } )
                    }

                }
            }
            var deletes = document.getElementsByClassName('deletes');
            var ds = document.getElementsByClassName('ds')[0];
            var df = document.getElementsByClassName('df')[0];
            var deleteBox = document.getElementsByClassName('deleteBox')[0];
            deleteBox.style.display = "none";

            for (var i = 0; i < deletes.length; i++) {
                var blackBox = document.getElementsByClassName('blackBox')[0];

                deletes[i].onclick = function () {
                    deleteBox.style.display = "";
                    document.getElementsByClassName('blackBox')[0].style.display = "";
                    ds.onclick = function () {
                        deleteBox.style.display = "none";
                        document.getElementsByClassName('blackBox')[0].style.display = "none";
                    }
                    df.onclick = function () {
                        deleteBox.style.display = "none";
                        document.getElementsByClassName('blackBox')[0].style.display = "none";
                    }

                }
            }
        }
    })
    getAllIndex()
   

}
var pageIndex = document.getElementsByClassName('pageIndex')[0];
var pageAll = document.getElementsByClassName('pageAll')[0];
next.onclick = function () {
    console.log(111);
    if (Math.ceil(allIndexs / per_page) <= page) {
        alert('当前是最后一页')
        return
    }
    page++
    pageIndex.innerText = page;
    pageAll.innerText = Math.ceil(allIndexs / per_page);
    getUserInfo()
}
last.onclick = function () {
    if (page > 1) {
        page--;
        pageIndex.innerText = page;
        pageAll.innerText = Math.ceil(allIndexs / per_page);
        getUserInfo()
    }
    else {
        alert('当前是第一页')
        return
    }
}

getUserInfo()

document.getElementsByClassName("reviseBox")[0].style.display = "none";
var clear = document.getElementsByClassName("clear")[0];
clear.onclick = function () {
    document.getElementsByClassName("reviseBox")[0].style.display = "none";
    document.getElementsByClassName('blackBox')[0].style.display = "none";
}
var change = document.getElementById('change')
change.onclick = function () {
    page=1;
    var index = change.selectedIndex;
    var value = change.options[index].value
    if (value != per_page) {
        per_page = value
        getUserInfo()
        pageIndex.innerText=1;
        pageAll.innerText = Math.ceil(allIndexs / per_page);
    }
}
function getAllIndex() {
    $.ajax({
        type: "GET",
        url: "http://118.195.129.130:3000/users/allpage_users",
        data: {

        },
        success: function (result) {
            console.log(result);
            allIndexs = result.pages;

        }

    })

}
var search_text = document.getElementsByClassName('search_text')[0];
var find = document.getElementsByClassName('find')[0];
var add = document.getElementsByClassName('add')[0];
find.onclick = function () {
    
    $.ajax({
        type: "POST",
        url: "http://118.195.129.130:3000/users/getInfoByKw_users",
        data: {
            kw: search_text.value,
        },
        success: function (result) {
            var page=document.getElementsByClassName('page')[0];
            page.style.display='none';
            console.log(result);
            result = result.data[0]
            nameInfo.innerHTML = '';
            var sex='男'
            if(result.sex ==1){
                console.log(999)
                sex='女'
            }
            nameInfo.innerHTML = "<ul class='infoSty'>" + "<li>" + result.us + "</li>" + "<li >" + result._id + "</li>" +
                "<li >" + result.age + "</li>" + "<li >" + sex + "</li>"
                + "<li>" + "<button class='revise' >修改</button>" + "<button class='deletes'>删除</button>" + "</li>" + "<li class='hid'>" + JSON.stringify(result) + "</li>" + "</ul>"
            


        }

    })
}
var resset = document.getElementsByClassName('resset')[0];
resset.onclick = function () {
    document.getElementsByClassName('page')[0].style.display='';
    per_page=9;
    page=1;
    getUserInfo()
    search_text.value="";
}
var addn = document.getElementsByClassName('addn')[0];
var tds = document.getElementsByClassName('tds')[0];
var tdf = document.getElementsByClassName('tdf')[0];
var add = document.getElementsByClassName('add')[0];

add.onclick = function () {
    console.log("我是用户")
    // var blackBox = document.getElementsByClassName('blackBox')[0];
    addn.style.display = '';
    document.getElementsByClassName('blackBox')[0].style.display = "";
    document.addEventListener("click", handler, true);
    function handler(event) {
        event = event || window.event;//设置兼容性
        event.preventDefault ? event.preventDefault() : (event.retrunValue = false);//设置兼容性
        event.stopPropragation ? event.stopPropragation() : (event.cancelBubble = true)//设置兼容性
    }
    document.removeEventListener('click', handler, true);


tds.onclick = function () {
    var blackBox = document.getElementsByClassName('blackBox')[0];
    alert("添加成功");
    addn.style.display = "none";
    blackBox.style.display="none";
}
tdf.onclick = function () {
    var blackBox = document.getElementsByClassName('blackBox')[0];
    addn.style.display = "none";
    blackBox.style.display="none";
}
}


var common= document.getElementsByClassName('common');
var down = document.getElementsByClassName('down');
down[1].style.display = "none"
common[0].onclick = function () {
    down[0].style.display = "";
    down[1].style.display = "none"
    down[2].style.display = "none"
    
    common[0].classList.add('commonActive');
    common[1].classList.remove('commonActive');
    common[2].classList.remove('commonActive');
}
common[1].onclick = function () {
    down[0].style.display = "none";
    down[1].style.display = "";
    down[2].style.display = "none"
    common[1].classList.add('commonActive');
    common[0].classList.remove('commonActive');
    common[2].classList.remove('commonActive');
}
common[2].onclick=function(){
    down[0].style.display = "none";
    down[1].style.display = "none";
    down[2].style.display = "";
    common[2].classList.add('commonActive');
    common[1].classList.remove('commonActive');
    common[0].classList.remove('commonActive');
}
page = 1;
per_page = 10;
var pageAllP=document.getElementsByClassName('pageAllP')[0];
var pageIndexP=document.getElementsByClassName('pageIndexP')[0];
var lastP=document.getElementsByClassName('lastP')[0];
var nextP=document.getElementsByClassName('nextP')[0];
var revises = document.getElementsByClassName("revises");
var nameInfoP = document.getElementById('nameInfoP');
var infoStyP = document.getElementsByClassName('infoStyP')[0];
var reviseO = document.getElementsByClassName('reviseO')[0];
reviseO.style.display = "none";
function getUserInfoP() {
    $.ajax({
        type: "POST",
        url: "http://118.195.129.130:3000/order/getInfoByPage_order",
        data: {
            page: page,
            per_page: per_page,
        },
        success: function (result) {
            nameInfoP.innerHTML = "";
            for (var i = 0; i < result.data.length; i++) {
                var payCase="已支付";
                if(result.data[i].pay==0){
                   payCase="未支付";
                }
                nameInfoP.innerHTML += "<ul class='infoSty'>" + "<li>" + result.data[i].us + "</li>" + "<li >" + result.data[i].amount + "</li>" +
                    "<li >" + result.data[i].phone + "</li>" + "<li >" + payCase + "</li>" + "<li >" + result.data[i].time + "</li>"
                    + "<li>" + "<button class='revises' >修改</button>" + "<button class='deletess'>删除</button>" + "</li>" + "<li class='hid'>" + JSON.stringify(result.data[i]) + "</li>" + "</ul>"
            }
            for (var k = 0; k < revises.length; k++) {
                revises[k].onclick = function () {
                    var blackBox = document.getElementsByClassName('blackBox')[0];
                    var sureP = document.getElementsByClassName("sureP")[0];
                    var useNameP = document.getElementsByClassName("useNameP")[0];
                    var useAccount = document.getElementsByClassName("useAccount")[0];
                    var usePhone = document.getElementsByClassName("usePhone")[0];
                    var usePay = document.getElementsByClassName("usePay")[0];
                    var useIdP = document.getElementsByClassName("useIdP")[0];
                    document.getElementsByClassName("reviseO")[0].style.display = "";
                    document.getElementsByClassName('blackBox')[0].style.display = "";
                    document.addEventListener("click", handler, true);
                    function handler(event) {
                        event = event || window.event;//设置兼容性
                        event.preventDefault ? event.preventDefault() : (event.retrunValue = false);//设置兼容性
                        event.stopPropragation ? event.stopPropragation() : (event.cancelBubble = true)//设置兼容性
                    }
                    userUs = JSON.parse(this.parentElement.parentElement.lastElementChild.innerText).us;
                    useNameP.value = userUs;
                    useA = JSON.parse(this.parentElement.parentElement.lastElementChild.innerText).amount;
                    useAccount.value = useA;
                    useS = JSON.parse(this.parentElement.parentElement.lastElementChild.innerText).phone;
                    usePhone.value = useS;
                    useST = JSON.parse(this.parentElement.parentElement.lastElementChild.innerText).pay;
                    usePay.value = useST;
                    useIdP.value = JSON.parse(this.parentElement.parentElement.lastElementChild.innerText)._id;

                    document.removeEventListener('click', handler, true);
                    var sureP = document.getElementsByClassName('sureP')[0];
                    sureP.onclick = function () {
                        $.ajax({
                            type: "POST",
                            url: "http://118.195.129.130:3000/order/update_order",
                            data: {
                                _id: useIdP.value,
                                us: useNameP.value,
                                phone: usePhone.value,
                                pay: usePay.value,
                                amount: useAccount.value,
                            },
                            success: function (result) {
                                alert("修改成功");
                                document.getElementsByClassName("reviseO")[0].style.display = "none";
                                document.getElementsByClassName('blackBox')[0].style.display = "none";
                                page = 1;
                                per_page = 10;
                                getUserInfoP();
                            }
                        })
                    }
                    var clearP=document.getElementsByClassName('clearP')[0];
                    clearP.onclick=function(){
                        document.getElementsByClassName("reviseO")[0].style.display = "none";
                        document.getElementsByClassName('blackBox')[0].style.display = "none";
            
                    }

                }
            }
            var deletess = document.getElementsByClassName('deletess');
            var ds = document.getElementsByClassName('ds')[0];
            var df = document.getElementsByClassName('df')[0];
            var deleteBox = document.getElementsByClassName('deleteBox')[0];
            

            for (var i = 0; i < deletess.length; i++) {
                var blackBox = document.getElementsByClassName('blackBox')[0];

                deletess[i].onclick = function () {
                    deleteBox.style.display = "";
                    document.getElementsByClassName('blackBox')[0].style.display = "";
                    useIdIs=JSON.parse(this.parentElement.parentElement.lastElementChild.innerText)._id
                    ds.onclick = function () {
                        deleteBox.style.display = "none";
                        document.getElementsByClassName('blackBox')[0].style.display = "none";
                        // useIdIs=JSON.parse(this.parentElement.parentElement.lastElementChild.innerText)._id
                        $.ajax({
                            type: "POST",
                            url: "http://118.195.129.130:3000/order/del_order",
                            data: {
                                _id: useIdIs,
                            },
                            success: function (result) {
                                console.log(999)
                                alert("删除成功!");
                                per_page=10;
                                page=1;
                                userAllNum();
                                getUserInfoP();
                    }
                })
            }
                    df.onclick = function () {
                        deleteBox.style.display = "none";
                        document.getElementsByClassName('blackBox')[0].style.display = "none";
                    }

                }
            }
        }
    })
    

}
userAllNum();
getUserInfoP();

var allIndexOs;
function getAllIndexO(){
    $.ajax({
        type: "GET",
        url: "http://118.195.129.130:3000/order/allpage_order",
        data: {

        },
        success: function (result) {
            
            allIndexOs = result.pages;

        }

    })

}
getAllIndexO();
var changeP=document.getElementById('changeP');
    changeP.onclick=function(){
        page=1;
        var indexO=changeP.selectedIndex;
        var valueO=changeP.options[indexO].value;
        if (valueO!=per_page) {
            per_page=valueO;
            getUserInfoP()
            pageIndexP.innerText=1;
            pageAllP.innerText=Math.ceil(allIndexOs / per_page);
        }
    }

nextP.onclick = function () {
    if (Math.ceil(allIndexOs / per_page) <= page) {
        alert('当前是最后一页')
        return
    }
    page++
    pageIndexP.innerText = page;
    pageAllP.innerText = Math.ceil(allIndexOs / per_page);
    getUserInfoP()
}
lastP.onclick = function () {
    if (page > 1) {
        page--;
        pageIndexP.innerText = page;
        pageAllP.innerText = Math.ceil(allIndexOs / per_page);
        getUserInfoP()
    }
    else {
        alert('当前是第一页')
        return
    }
}
var addO = document.getElementsByClassName('addO')[0];
var dsO = document.getElementsByClassName('dsO')[0];
var dfO = document.getElementsByClassName('dfO')[0];
var oAdd = document.getElementsByClassName('oAdd')[0];
var nameOAd=document.getElementsByClassName('nameOAd')[0];
var amountOAd = document.getElementsByClassName("amountOAd")[0];
var phoneOAd = document.getElementsByClassName("phoneOAd")[0];
var payOAd = document.getElementsByClassName("payOAd")[0];

oAdd.onclick = function () {
    console.log("我是订单")
    var blackBox = document.getElementsByClassName('blackBox')[0];
    addO.style.display = '';
    blackBox.style.display='';
    document.addEventListener("click", handler, true);
    function handler(event) {
        event = event || window.event;//设置兼容性
        event.preventDefault ? event.preventDefault() : (event.retrunValue = false);//设置兼容性
        event.stopPropragation ? event.stopPropragation() : (event.cancelBubble = true)//设置兼容性
 }
    document.removeEventListener('click', handler, true);

dsO.onclick = function () {
    var blackBox = document.getElementsByClassName('blackBox')[0];
    
    
    addO.style.display = "none";
    blackBox.style.display="none";
    $.ajax({
        type: "POST",
        url: "http://118.195.129.130:3000/order/add_order",
        data: {
            us:nameOAd.value,
            amount:amountOAd.value,
            phone:phoneOAd.value,
            pay:payOAd.value,
        },
        success: function (result) {
            alert("添加成功");
            page=1;
            per_page=10;
            userAllNum();
            getUserInfoP();
        }
    })
}
dfO.onclick = function () {
    var blackBox = document.getElementsByClassName('blackBox')[0];
    addO.style.display = "none";
    blackBox.style.display="none";
}
}
getUserInfoP();
var pageP=document.getElementsByClassName('pageP')[0];
var ressetO=document.getElementsByClassName('ressetO')[0];
ressetO.onclick=function(){
    pageP.style.display="";
    getUserInfoP();
    search_textO.value="";
}
var findO=document.getElementsByClassName('findO')[0];
var search_textO=document.getElementsByClassName('search_textO')[0];

findO.onclick=function(){
    $.ajax({
        type: "POST",
        url: "http://118.195.129.130:3000/order/getInfoByKw_order",
        data: {
           kw:search_textO.value,
        },
        success: function (result) {
            
            pageP.style.display="none";
            console.log(result);
            result = result.data
            nameInfoP.innerHTML = '';
            for(var j=0;j<result.length;j++){  
                var payCase="已支付";
                if(result.data[i].pay==0){
                   payCase="未支付";
                }
            nameInfoP.innerHTML+= "<ul class='infoSty'>" + "<li>" + result[j].us + "</li>" + "<li >" + result[j].amount + "</li>" +
                "<li >" + result[j].phone + "</li>" + "<li >" + payCase + "</li>"+ "<li >" + result[j]._id + "</li>"
                + "<li>" + "<button class='revises' >修改</button>" + "<button class='deletess'>删除</button>" + "</li>" + "<li class='hid'>" + JSON.stringify(result[j]) + "</li>" + "</ul>"
            }
            
        }
    })

}
var allThree=document.getElementsByClassName('allThree');

    function userAllNum(){
        $.ajax({
            type: "GET",
            url: "http://118.195.129.130:3000/order/allpage_order",
            data: {
    
            },
            success: function (result) {
                allThree[1].innerHTML=result.pages;
            }
    
        })
    }
    function foodNum(){
            $.ajax({
                type: "GET",
                url: "http://118.195.129.130:3000/food/allpage",
                data: {
        
                },
                success: function (result) {
                
                    allThree[2].innerHTML=result.pages;
                }
        
            })
         }
    


page=1;
per_page=10;
var pageAllF=document.getElementsByClassName('pageAllF')[0];
var pageIndexF=document.getElementsByClassName('pageIndexF')[0];
var lastF=document.getElementsByClassName('lastF')[0];
var nextF=document.getElementsByClassName('nextF')[0];

var nameInfoF=document.getElementById('nameInfoF');

function getUserInfoF() {
    console.log(555)
    $.ajax({
        type: "POST",
        url: "http://118.195.129.130:3000/food/getInfoByPage",
        data: {
            page: page,
            per_page: per_page,
        },
        success: function (result) {
            console.log(result);
            nameInfoF.innerHTML = "";
            for (var i = 0; i < result.data.length; i++) {
                nameInfoF.innerHTML += "<ul class='infoSty'>" + "<li>" + result.data[i].name + "</li>" + "<li >" + result.data[i].price+ "</li>" +
                    "<li >" + result.data[i].desc + "</li>" + "<li >" + result.data[i].typename + "</li>" 
                    + "<li>" + "<button class='revisef' >修改</button>" + "<button class='deletesf'>删除</button>" + "</li>" + "<li class='hid'>" + JSON.stringify(result.data[i]) + "</li>" + "</ul>"
            }
            var revisef = document.getElementsByClassName("revisef");
            var deletesf = document.getElementsByClassName("deletesf");
            for (var k = 0; k < revisef.length; k++) {
                revisef[k].onclick = function () {
                
                    var blackBox = document.getElementsByClassName('blackBox')[0];
                    var sureF = document.getElementsByClassName("sureF")[0];
                    var foodName = document.getElementsByClassName("foodName")[0];
                    var foodPay = document.getElementsByClassName("foodPay")[0];
                    var taste = document.getElementsByClassName("taste")[0];
                    var typeName = document.getElementsByClassName("typeName")[0];
                    var typeId = document.getElementsByClassName("typeId")[0];
                    var foodId = document.getElementsByClassName("foodId")[0];
                    document.getElementsByClassName("reviseF")[0].style.display = "";
                    document.getElementsByClassName('blackBox')[0].style.display = "";
                    document.addEventListener("click", handler, true);
                    function handler(event) {
                        event = event || window.event;//设置兼容性
                        event.preventDefault ? event.preventDefault() : (event.retrunValue = false);//设置兼容性
                        event.stopPropragation ? event.stopPropragation() : (event.cancelBubble = true)//设置兼容性
                    }
                     var foods= JSON.parse(this.parentElement.parentElement.lastElementChild.innerText);
                    foodName.value = foods.name;
                   foodPay.value = foods.price;
                    taste.value = foods.desc;
                    typeName.value = foods.typename;
                    typeId.value = foods.typeid;
                    foodId.value = foods._id;
                    document.removeEventListener('click', handler, true);
                    var sureF = document.getElementsByClassName('sureF')[0];
                    sureF.onclick = function () {
                        $.ajax({
                            type: "POST",
                            url: "http://118.195.129.130:3000/food/update",
                            data: {
                                name: foodName.value,
                                price: foodPay.value,
                                desc: taste.value,
                                typename: typeName.value,
                                typeid: typeId.value,
                                _id:foodId.value,
                            },
                            success: function (result) {
                                alert("修改成功");
                                document.getElementsByClassName("reviseF")[0].style.display = "none";
                                document.getElementsByClassName('blackBox')[0].style.display = "none";
                                getUserInfoF();
                            }
                        })
                    }
                    
                    }
        }  
        var deletess = document.getElementsByClassName('deletess');
        var ds = document.getElementsByClassName('ds')[0];
        var df = document.getElementsByClassName('df')[0];
        var deleteBox = document.getElementsByClassName('deleteBox')[0];
        

        for (var i = 0; i < deletesf.length; i++) {
            var blackBox = document.getElementsByClassName('blackBox')[0];

            deletesf[i].onclick = function () {
                deleteBox.style.display = "";
                document.getElementsByClassName('blackBox')[0].style.display = "";
                useIdIsF=JSON.parse(this.parentElement.parentElement.lastElementChild.innerText)._id
                ds.onclick = function () {
                    deleteBox.style.display = "none";
                    document.getElementsByClassName('blackBox')[0].style.display = "none";
                    // useIdIs=JSON.parse(this.parentElement.parentElement.lastElementChild.innerText)._id
                    $.ajax({
                        type: "POST",
                        url: "http://118.195.129.130:3000/food/del",
                        data: {
                            _id: useIdIsF,
                        },
                        success: function (result) {
                            console.log(result);
                            alert("删除成功!");
                            foodNum();
                            getUserInfoF();
                }
            })
        }
                df.onclick = function () {
                    deleteBox.style.display = "none";
                    document.getElementsByClassName('blackBox')[0].style.display = "none";
                }

            }
        }
          
    }

    })
}
var clearF=document.getElementsByClassName('clearF')[0];
clearF.onclick=function(){
    document.getElementsByClassName("reviseF")[0].style.display = "none";
    document.getElementsByClassName('blackBox')[0].style.display = "none";    
}
var addF = document.getElementsByClassName('addF')[0];
var fts= document.getElementsByClassName('fts')[0];
var ftd = document.getElementsByClassName('ftd')[0];
var addFB = document.getElementsByClassName('addFB')[0];
var foodNameA=document.getElementsByClassName('foodNameA')[0];
var foodPayA = document.getElementsByClassName("foodPayA")[0];
var tasteA = document.getElementsByClassName("tasteA")[0];
var typeNameA = document.getElementsByClassName("typeNameA")[0];
var typeIdA= document.getElementsByClassName("typeIdA")[0];

addFB.onclick = function () {
    console.log("我是食物")
    var blackBox = document.getElementsByClassName('blackBox')[0];
    addF.style.display = '';
    blackBox.style.display='';
    document.addEventListener("click", handler, true);
    function handler(event) {
        event = event || window.event;//设置兼容性
        event.preventDefault ? event.preventDefault() : (event.retrunValue = false);//设置兼容性
        event.stopPropragation ? event.stopPropragation() : (event.cancelBubble = true)//设置兼容性
 }
    document.removeEventListener('click', handler, true);

fts.onclick = function () {
    var blackBox = document.getElementsByClassName('blackBox')[0];
    
    alert("添加成功");
    addF.style.display = "none";
    blackBox.style.display="none";
    $.ajax({
        type: "POST",
        url: "http://118.195.129.130:3000/food/add",
        data: {
                 name: foodNameA.value,
                 price: foodPayA.value,
                 desc: tasteA.value,
                 typename: typeNameA.value,
                 typeid: typeIdA.value,
        },
        success: function (result) {
            
            console.log(result);
           foodNameA.value="";
           foodPayA.value="";
           tasteA.value="";
           typeNameA.value="";
           typeIdA.value="";
           foodNum();
            getUserInfoF();
        }
    })
}
ftd.onclick = function () {
    var blackBox = document.getElementsByClassName('blackBox')[0];
    addF.style.display = "none";
    blackBox.style.display="none";
 }
 }
 foodNum();
 getUserInfoF();
 var ressetF=document.getElementsByClassName('ressetF')[0];
 ressetF.onclick=function(){
    per_page=10;
    page=1;
    getUserInfoF();
    pageF.style.display="";
    search_textF.value="";
 }
 var findF=document.getElementsByClassName('findF')[0];
var search_textF=document.getElementsByClassName('search_textF')[0];

findF.onclick=function(){
    $.ajax({
        type: "POST",
        url: "http://118.195.129.130:3000/food/getInfoByKw",
        data: {
           kw:search_textF.value,
        },
        success: function (result) {
            pageF.style.display="none";
            console.log(result.data)
            result=result.data;
            nameInfoF.innerHTML = '';
            for(var j=0;j<result.length;j++){  
            nameInfoF.innerHTML+= "<ul class='infoSty'>" + "<li>" + result[j].name + "</li>" + "<li >" + result[j].price + "</li>" +
                "<li >" + result[j].desc + "</li>" + "<li >" + result[j].typename + "</li>" + "</li>"
                + "<li>" + "<button class='revises' >修改</button>" + "<button class='deletess'>删除</button>" + "</li>" + "<li class='hid'>" + JSON.stringify(result[j]) + "</li>" + "</ul>"
            }
            
        }
    })

}
var allIndexsF;
var pageF=document.getElementsByClassName('pageF')[0];
function getAllIndexF(){
    $.ajax({
        type: "GET",
        url: "http://118.195.129.130:3000/food/allpage",
        data: {

        },
        success: function (result) {
            console.log(result);
            allIndexsF = result.pages;

        }

    })
}
var changeF=document.getElementById('changeF');
    changeF.onclick=function(){
        page=1;
        var indexF=changeF.selectedIndex;
        var valueF=changeF.options[indexF].value;
        if (valueF!=per_page) {
            per_page=valueF;
            getUserInfoF()
            pageIndexF.innerText=1;
            pageAllF.innerText=Math.ceil(allIndexsF / per_page);
        }
    }
    getAllIndexF();
    page=1;
    var pageIndexF=document.getElementsByClassName('pageIndexF')[0];
    var pageAllF=document.getElementsByClassName('pageAllF')[0];
    var nextF=document.getElementsByClassName('nextF')[0];
    var lastF=document.getElementsByClassName('lastF')[0];
    nextF.onclick = function () {
        if (Math.ceil(allIndexsF / per_page) <= page) {
            alert('当前是最后一页')
            return
        }
        ++page;
        pageIndexF.innerText = page;
        pageAllF.innerText = Math.ceil(allIndexsF / per_page);
        getUserInfoF()
    }
    lastF.onclick = function () {
        if (page > 1) {
            
            pageAllF.innerText = Math.ceil(allIndexsF / per_page);
            --page;
            pageIndexF.innerText = page;
            getUserInfoF();
        }
        else {
            alert('当前是第一页')
            return
        }
    }
    
    
   
