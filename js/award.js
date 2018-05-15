$(function(){
	var turnplate={
		startAngle:0,				//开始角度
		randomRate:[],              //控制获奖率，百分制(相加需等于100%)，对应restaraunts(顺序需要保持一致)，
		bRotate:false				//false:停止;ture:旋转
	};
	var sum;
	turnplate.randomRate = ["0%", '0%', '0%', '0%', '0%', '0%', '0%', '0%'];
	//设置turnplate.randomRate的数组长度就是大转盘格子的个数
	var rotateTimeOut = function (){
		$('.awardGift').rotate({
			angle:0,
			animateTo:2160,
			duration:8000,
			callback:function (){
				alert('网络超时，请检查您的网络设置！');
			}
		});
	};
	//旋转
	var rotateFn = function (item, txt){
		var angles = item * (360 / turnplate.randomRate.length) - (360 / (turnplate.randomRate.length*2));
		if(angles<270){
			angles = 270 - angles; 
		}else{
			angles = 360 - angles + 270;
		}
		$('.awardGift').stopRotate();
		$('.awardGift').rotate({
			angle:0,
			animateTo:angles+1800,
			duration:8000,
			callback:function (){
				
				//旋转完成调用的函数
				parent.getGameGift();
				//开启旋转
				turnplate.bRotate = !turnplate.bRotate;
			}
		});
	};
	//点击开始
	$('.start').click(function (){
		
		if(turnplate.bRotate)return;
		turnplate.bRotate = !turnplate.bRotate;

		

		$.get('json/award.json',function(data){
			turnplate.randomRate = ["0%", '0%', '0%', '0%', '0%', '0%', '0%', '0%'];
			//从后台请求获取数据设置对应的数组为100%
			
			turnplate.randomRate[data.giftCode] = "100%";
			//获取随机数(奖品个数范围内)
			var item = rnd(turnplate.randomRate);
			rotateFn(item,data);//data为你要带的参数
		});
		
	});
	//注意如果转盘对不准的情况下。可以调节awardGift下的img的旋转角度进去调节transform: rotate(22deg);。
});
function rnd(rate){
	var random = Math.floor(Math.random() * 100);
	var myRandom = [];
	var randomList = [];
	var randomParent = [];
	for(var i = 0; i < 100; i++){
		myRandom.push(parseInt([i]) + 1);
	}
	for(var i = 0; i < rate.length; i++){
		var temp = [];
		var start = 0;
		var end = 0;
		randomList.push(parseInt(rate[i].split('%')[0]));
		for(var j = 0; j < randomList.length; j++){
			start += randomList[j-1] || 0
			end += randomList[j]
		}
		temp = myRandom.slice(start, end);
		randomParent.push(temp)
	}
	for(var i = 0; i < randomParent.length; i++){
		if($.inArray(random, randomParent[i]) > 0){
			return(i+1)
		}
	}
	
}

