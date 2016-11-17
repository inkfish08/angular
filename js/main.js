var $nav = $('.guess-list nav');
var index = 0;
//防止滚动条滚动过快加载大量数据
var isLock = false;
//滚动条滚动接近底部时加载更多数据
$(window).scroll(function(){
	//滚动的高度
	var scrollTop = $(this).scrollTop();
	//显示回到顶部按钮
	if(scrollTop >= 1000){
		$('.backTop').show();
	}else{
		$('.backTop').hide();
	}
	//窗口高度 
	var winHeight = $(this).height();
	//文档内容高度
	var docHeight = $(document).height();
	//加载次数
	var ajaxCount = 6;
	//ajax延时请求间隔
	var delayT = 500;
	//滚动条滚到底部触发加载事件
	if(index <= ajaxCount){
		if(scrollTop >= docHeight - winHeight - 300){
			//判断是否加载完上次数据才进行下一次数据加载.
			if(!isLock){
				setTimeout(function(){
					index++;
					ajax(showImg);
					isLock = false;
				},delayT);
				isLock = true;
			}
		}
	}
});
function ajax(fn){
	var i = (index == 1) ? index : index * 6;
	$.ajax({
		url:'http://diviner.jd.com/diviner?p=610009&uuid=12396477&lid='+i+'&lim=6&cb=tempGuessLikeCallback',
		dataType:'jsonp',
		jsonp:'callback',
		jsonpCallback:'tempGuessLikeCallback',
		scriptCharset:'gb2312',
		success:function(res){
			var data = res.data;
			var html = '';
			$.each(data, function(idx,obj) {
				var price = obj.jp;
				var costPrice = parseInt(price*1.2);
				html += '<li><a href="##"><div class="shop-img"><img class="list-' + index + '" src="img/load.gif" data-lazy-img="http://img13.360buyimg.com/n1/s200x200_'+ obj.img +'"/></div><div class="shop-main list-'+index+'"><h2 class="s-name">京东超市</h2><p class="s-about">' + unescape(obj.t) + '</p><p class="s-price"><span class="now-price"><strong>' + price + '</strong>元</span><i class="cost-price">门市价:' + costPrice + '元</i><i class="sell-count">已售' + obj.c3 + '</i></p></div></a></li>'
			});
			$nav.append(html);
			//回调函数 加载图片
			if(typeof fn == 'function'){
				fn();
			}
		}
	});
}
ajax(showImg);
function showImg(){
	$('img.list-'+ index).each(function(){
		$(this).animate({opacity:0.3},500,function(){
			$(this).attr('src',$(this).attr('data-lazy-img')).animate({opacity:1},1000);
		})
	})
	$('.shop-main.list-'+ index).each(function(){
		$(this).animate({opacity:1},1000);
	})
}

var iconColor = ['#fd9d21','#ff6767','#8a90fa','#fed030','#fd9d21','#fed030','#4dc6ee','#ff80c2','#fd9d21','#599eec','#A8DD99','#00d3be','#fed030','#fd9d21','#FF7360','#ff80c2','#84d23d','#ff80c2','#599eec','#00d3be'];
$('.nav-pic').each(function(index,ele){
	$(this).css('background-color',iconColor[index]);
})

// Initialize Swiper
 var swiper = new Swiper('.swiper-container', {
    pagination: '.swiper-pagination',
    paginationClickable: true
});
//定义活动倒计时
var objTime ={};
objTime.yy = 2016;   //年份
objTime.mth = 11;	//月份 0~11
objTime.dd = 14;	//日 1~31
objTime.hh = 18;		//小时0~23
objTime.mm = 30;	//分钟0~59
objTime.ss = 00;	//秒0~59

//封装倒计时函数 传入时间
function countDown(obj) { 
	//创建当前系统时间
	var now = new Date(); 
	//创建倒计时时间对象
	var endDate = new Date(obj.yy, obj.mth-1, obj.dd, obj.hh, obj.mm, obj.ss);
	//两者gettime()相减获取毫秒
	var leftTime=endDate.getTime()-now.getTime();
	//除1000得到相差的秒数
	var leftsecond = parseInt(leftTime/1000); 
	//得到相差的小时,向下取整
	var hh= Math.floor(leftsecond/(60*60)); 
	if(hh < 10 && hh > 0){
		hh = '0' + hh;
	}else if(hh <= 0){
		hh = '00';
	}
	//得到相差的分,秒
	var mm = Math.floor((leftsecond-hh*60*60)/60); 
	if(mm < 10 && mm > 0){
		mm = '0' + mm;
	}else if(mm <= 0){
		mm = '00';
	}
	var ss = Math.floor(leftsecond-hh*60*60-mm*60);
	if(ss < 10 && ss > 0){
		ss = '0' + ss;
	}else if(ss <= 0){
		ss = '00';
	}
	$('.hour').html(hh);
	$('.min').html(mm);
	$('.sec').html(ss);
	
} 
//启动倒计时定时器
var timer1 = setInterval(function(){
	countDown(objTime);
},1000)
//回到顶部事件
$('.backTop').click(function(){
	$('body').animate({'scrollTop':0},500)
})