var cardsContainer = document.getElementsByClassName('cards-container')[0];
var rankList = document.getElementById('rank-list');

var recomendId = [3, 12, 4, 6, 31, 0, 22, 10, 16, 32, 17, 34, 14, 7, 2, 15];
var rankId = [
    [4, 8, 12, 31, 22, 27, 1, 11, 15, 28],//全部
    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],//应用
    [11, 12, 13, 14, 15, 16, 17, 18, 19, 20],//服务
    [21, 22, 23, 24, 25, 26, 27, 28, 29, 30],//前端
    [9, 5, 7, 11, 6, 4, 8, 2, 5],//功能
    [2, 4, 6, 8, 11, 16, 14, 20, 3,],//主题
    [31, 29, 30, 28, 27, 26, 25, 24, 23, 21]//算法
]
cardsContainer.add = addCard;
rankList.add = addRankItem;
window.onload = () => {
    cardsContainer.add(recomendId);
    rankList.add(rankId[0], 'right-in');
}



// 在cards-container下加子元素
function addCard(arry) {
    for (var i = 0; i < arry.length; i++) {
        var id = arry[i];
        // console.log(id);
        var tempCard = document.createElement('div');
        tempCard.className = "card goods-card";
        tempCard.innerHTML = `
        <a href="html/detail.html/id=${goods[id].id}">
            <div class="blur-wrap" >
                <div class="blur"></div>
            </div>
            <div class="icon-80"></div>
            <h3>App Name</h3>
            <h4>Type</h4>
            <div class="rate">0</div>
        </a>
        <button type="button" class="btn btn-second hide" >Apply</button>
        `;

        //判断卡片类型、为卡片指定样式
        if (this.className.indexOf("recomend") != -1) {
            tempCard.children[0].children[0].children[0].style.backgroundImage = `url(./images/goods/${goods[id].image})`;
        }
        tempCard.children[0].children[1].style.backgroundImage = `url(./images/goods/${goods[id].image})`;
        tempCard.children[0].children[2].innerText = goods[id].name;
        tempCard.children[0].children[3].innerText = goods[id].type;
        tempCard.children[0].children[4].style.backgroundPositionY = rateYoffset(goods[id].rate);
        tempCard.children[0].children[4].innerText = toThousands(goods[id].rateNumber);
        tempCard.children[1].onclick = handle;

        //悬浮效果
        tempCard.onmouseover = function () {
            this.children[0].children[4].className = "rate hide";//隐藏评分
            this.children[1].className = "btn btn-second";//展示按钮
            if (this.children[0].children[0].children[0]) {
                this.children[0].children[0].children[0].style.opacity = 0.6;//设置模糊背景的透明度
            }
        };
        tempCard.onmouseleave = function () {
            this.children[0].children[4].className = "rate";
            this.children[1].className = "btn btn-second hide";
            if (this.children[0].children[0].children[0]) {
                this.children[0].children[0].children[0].style.removeProperty('opacity');
            }
        };
        this.appendChild(tempCard);
    }
};

//添加rank-item
function addRankItem(arry, direction) {
    rankList.innerHTML = "";
    for (var i = 0; i < arry.length; i++) {
        var id = arry[i];
        var tempRankItem = document.createElement('div');
        tempRankItem.className = "rank-item";
        tempRankItem.innerHTML = `
        <img src="images/goods/13.png">
        <h2>1</h2>
        <div class="name-n-rate">
             <h3>AppName</h3>
             <div class="rate">0</div>
        </div>
        <button type="button" class="btn btn-second hide">Apply</button>
        `;

        //判断应用类型、为应用指定样式
        tempRankItem.style.animationDelay = 0.03 * i + 0 + 's';//渐进式动画
        tempRankItem.style.animationName = direction;//动画进入方向：css
        tempRankItem.children[0].setAttribute('src', `images/goods/${goods[id].image}`);
        tempRankItem.children[1].innerText = i + 1;
        tempRankItem.children[2].children[0].innerText = goods[id].name;
        tempRankItem.children[2].children[1].style.backgroundPositionY = rateYoffset(goods[id].rate);
        tempRankItem.children[2].children[1].innerText = toThousands(goods[id].rateNumber);

        //悬浮效果
        tempRankItem.onmouseover = function () {
            this.children[3].className = "btn btn-second";

        };
        tempRankItem.onmouseleave = function () {
            this.children[3].className = "btn btn-second hide";
        };
        this.appendChild(tempRankItem);
    }

}

function handle() {
    this.innerText = 'clicked'
}

//查看评分是否超过4.9，然后将1-5小数转换成2-9整数。再转换成Y偏移
function rateYoffset(num) {
    var rate = num;
    if (rate >= 4.9) {
        rate = 10;
    } else {
        rate = Math.floor(rate * 2);
    }
    return `${-12 * (rate - 2)}px`
};

//评价数每3位加分号
function toThousands(num) {
    var num = (num || 0).toString(), result = '';
    while (num.length > 3) {
        result = ',' + num.slice(-3) + result;
        num = num.slice(0, num.length - 3);
    }
    if (num) { result = num + result; }
    return result;
}
