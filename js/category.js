/**
 * Created by zhangkai on 17/6/18.
 */
window.onload = function () {


    scrollSlidebar();
}

/**
 * 侧边栏的交互
 */
function scrollSlidebar() {
    //获取元素
    var des = document.querySelector(".main-left");
    var oul = document.querySelector(".slideBar");
    var olis = oul.children;
    var startY = 0, endY = 0, currY = 0, temp = 0;
    var maxY = 0, minY = des.offsetHeight - oul.offsetHeight;
    var buffer = 150;
    oul.addEventListener("touchstart", function (e) {
        startY = e.touches[0].clientY;
    });
    oul.addEventListener("touchmove", function (e) {
        endY = e.touches[0].clientY;
        temp = endY - startY + currY;
        if (temp >= minY - buffer && temp <= maxY + buffer) {
            //移除过渡动画和添加transfrom
            this.style.transition = "none";
            this.style.webkitTransition = "none";
            this.style.transform = "translateY(" + temp + "px)";
        }
    });
    oul.addEventListener("touchend", function () {
        if (temp > maxY) {
            currY = maxY;
        } else if (temp < minY) {
            currY = minY;
        } else {
            currY = temp;
        }
        //添加过渡和transform
        this.style.transition = "all 0.15s linear";
        this.style.transform = "translateY(" + currY + "px)";
    });

    /**
     * 侧边栏点击变色
     */
    for (var i = 0, len = olis.length; i < len; i++) {
        var oli = olis[i];
        oli.index = i;
        window.tap(oli,function (e) {
            for (var j = 0; j < len; j++) {
                olis[j].className = "";
            }
            var li = e.target.parentNode;
            li.className = "current";
            currY = -li.index * li.offsetHeight;
            if (currY > maxY) {
                currY = maxY;
            } else if (currY < minY) {
                currY = minY;
            }
            oul.style.transition = "all 0.15s linear";
            oul.style.transform = "translateY("+currY+"px)"
            e.cancelBubble = true;
        })
    }

}

/**
 * 封装点击事件
 */

window.tap = function (obj, fn) {
    var startT = 0, endT = 0, ismoved = false;
    obj.addEventListener("touchstart", function () {
        startT = Date.now();
    });
    obj.addEventListener("touchmove", function () {
        ismoved = true;
    });
    obj.addEventListener("touchend", function (e) {
        endT = Date.now();
        if (endT - startT < 200 && !ismoved) {
            fn(e);
        }
        ismoved = false;
    });
}













