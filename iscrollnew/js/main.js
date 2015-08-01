var myScroll,
	pullDownEl, pullDownOffset,
	pullUpEl, pullUpOffset,
	generatedCount = 0;

/**
 * 滚动翻页 （自定义实现此方法）
 * myScroll.refresh();
 */
function pullUpAction () {
	setTimeout(function () {
		var el, li, i;
		el = document.getElementById('thelist');
		for (i=0; i<4; i++) {
			li = document.createElement('li');
			li.innerHTML='<li><span><img src="images/01.jpg" alt=""></span><span class="cart" onclick="get()">+</span></li>';
			el.appendChild(li, el.childNodes[0]);
		}	
		myScroll.refresh();	
	}, 1000);
}

/**
 * 初始化iScroll控件
 */
function loaded() {
	pullDownEl = document.getElementById('pullDown');
	pullDownOffset = pullDownEl.offsetHeight;
	pullUpEl = document.getElementById('pullUp');	
	pullUpOffset = pullUpEl.offsetHeight;
	var leftScroll=new iScroll('leftdata');
	
	myScroll = new iScroll('wrapper', {
		scrollbarClass: 'myScrollbar', 
		useTransition: false,
		topOffset: pullDownOffset,
		onRefresh: function () {
			if (pullUpEl.className.match('loading')) {
				pullUpEl.className = '';
				pullUpEl.querySelector('.pullUpLabel').innerHTML = '上拉加载更多...';
			}
		},
		onScrollMove: function () {
			if (this.y < (this.maxScrollY - 5) && !pullUpEl.className.match('flip')) {
				pullUpEl.className = 'flip';
				pullUpEl.querySelector('.pullUpLabel').innerHTML = '松手开始更新...';
				this.maxScrollY = this.maxScrollY;
			} else if (this.y > (this.maxScrollY + 5) && pullUpEl.className.match('flip')) {
				pullUpEl.className = '';
				pullUpEl.querySelector('.pullUpLabel').innerHTML = '上拉加载更多...';
				this.maxScrollY = pullUpOffset;
			}
		},
		onScrollEnd: function () {
			if (pullUpEl.className.match('flip')) {
				pullUpEl.className = 'loading';
				pullUpEl.querySelector('.pullUpLabel').innerHTML = '加载中...';				
				pullUpAction();	
			}
		}
	});
	
	setTimeout(function () { document.getElementById('wrapper').style.left = '25%'; }, 800);
}

//初始化绑定iScroll控件 
document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
document.addEventListener('DOMContentLoaded', loaded, false); 
function get(){
// 元素以及其他一些变量
var eleFlyElement = document.querySelector("#flyItem"), 
    eleShopCart = document.querySelector("#shopCart");
var numberItem = 0;
// 抛物线运动
var myParabola = funParabola(eleFlyElement, eleShopCart, {
	speed: 1000,
	curvature: 0.009,	
	complete: function() {
		eleFlyElement.style.visibility = "hidden";
	}
});
// 绑定点击事件
if (eleFlyElement && eleShopCart) {
	// 滚动大小
	var scrollLeft = document.documentElement.scrollLeft || document.body.scrollLeft || 0,
	    scrollTop = document.documentElement.scrollTop || document.body.scrollTop || 0;
		eleFlyElement.style.left = event.clientX + scrollLeft + "px";
		eleFlyElement.style.top = event.clientY + scrollTop + "px";
		eleFlyElement.style.visibility = "visible";		
	// 需要重定位
	myParabola.position().move();	

	}
}