/**
 * Created by zhangkai on 17/6/17.
 */
window.onload = function () {

    var attrObj = {
        //轮播图
        banner: (function () {
            return document.querySelector(".zk-banner");
        })()
    }
    window.attrObj = attrObj;
    //设置搜索栏的透明度变化
    setNavAlpha();

    //轮播图相关
    bannerScroll();

    //秒杀倒计时
    secondkillReciprocal();
}

/**
 * 设置滚动时搜索栏背景颜色变化
 */
function setNavAlpha() {
    //获取元素
    var navbar = document.querySelector(".zk-header");
    var banner = window.attrObj.banner;
    var bannerH = banner.offsetHeight;
    var offsetH = 0, pro = 0;
    window.onscroll = function () {
        //获取屏幕滚动的高度
        offsetH = document.body.scrollTop;
        pro = offsetH / bannerH * 0.8;
        if (pro >= 0.8) pro = 0.8;
        navbar.style.backgroundColor = "rgba(201,21,35," + pro + ")"
    }


}

/**
 * 轮播图交互相关
 */
function bannerScroll() {

    //开启定时器轮播图自动播放
    var timer = setInterval(autoPlay, 1000);

    //获取元素
    var banner = window.attrObj.banner;
    var oul = banner.children[0];
    var olis = banner.children[1].children;
    var bannerW = banner.offsetWidth;
    //定义变量
    var startX = 0, endX = 0, offsetX = 0, index = 1;
    banner.addEventListener("touchstart", function (e) {
        clearInterval(timer);
        startX = e.touches[0].clientX;
    });
    banner.addEventListener("touchmove", function (e) {
        endX = e.touches[0].clientX;
        offsetX = startX - endX;
        removeTransition();
        changeTransform(oul, -(index * bannerW + offsetX));
    });
    banner.addEventListener("touchend", function () {
        //手指松开重新开启定时器
        timer = setInterval(autoPlay, 1000);
        //让ul循环播放
        oulCirculation();
    });

    function oulCirculation() {
        if (Math.abs(offsetX) > bannerW / 3) {
            if (offsetX > 0) {   //往左边滑动  index++
                index++;
            } else if (offsetX < 0) {
                index--;
            }
        }
        addTransition();
        changeTransform(oul, -index * bannerW);
    }

    //让ol指示器改变
    banner.addEventListener("transitionend", function () {
        checkIndex();
        //改变指示器焦点
        changeCurPoint();

    });

    /**
     * 改变指示器焦点
     */
    function changeCurPoint() {
        for (var i = 0; i < olis.length; i++) {
            olis[i].className = " ";
        }
        olis[index - 1].className = "current";
    }

    /**
     * 自动轮播函数
     */
    function autoPlay() {
        index++;
        addTransition();
        changeTransform(oul, -index * bannerW);
    }

    /**
     * 检测角标的值
     */
    function checkIndex() {
        if (index >= 9) {
            index = 1;
        } else if (index <= 0) {
            index = 8;
        }
        removeTransition();
        changeTransform(oul, -index * bannerW);
    }

    //添加过渡
    function addTransition() {
        oul.style.transition = "all 0.25s ease";
    }

    //移除过渡
    function removeTransition() {
        oul.style.transition = "none";
        console.log(123);
    }

    function changeTransform(obj, x) {
        obj.style.transform = "translateX(" + x + "px)";
    }

}


/**
 * 秒杀倒计时
 */
function secondkillReciprocal() {
    //倒计时总时间
    var fullTime = 8 * 60 * 60;

    //获取元素
    var oTime = document.querySelector(".secondKill-time");
    var oSpan = oTime.children;
    var span0 = oSpan[0];
    var span1 = oSpan[1];
    var span3 = oSpan[3];
    var span4 = oSpan[4];
    var span6 = oSpan[6];
    var span7 = oSpan[7];
    var h = 0, m = 0, s = 0;
    console.log(span0, span1, span3, span4, span6, span7);
    var timer = setInterval(function () {
        fullTime--;
        if (fullTime <= 0) clearInterval(timer);
        h = fullTime / 60 / 60;
        m = fullTime / 60 % 60;
        s = fullTime % 60;
        span0.innerHTML = h >= 10 ? parseInt(h / 10) : 0 + "";
        span1.innerHTML = parseInt(h % 10) + "";
        span3.innerHTML = m >= 10 ? parseInt(m / 10) : 0 + "";
        span4.innerHTML = parseInt(m % 10) + "";
        span6.innerHTML = s >= 10 ? parseInt(s / 10) : 0 + "";
        span7.innerHTML = parseInt(s % 10) + "";
    }, 1000);


}












