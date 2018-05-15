$(function() {
	//删除不良信息
	$('.delete1').prevAll().remove();
	$('.delete2').nextAll().remove();
    music();

});
//音乐开启
function music(){
	//音乐
	var music = 0;
	var musicOpen = true;
	var musicTween = setInterval(function() {
		music += 2;
		$('#music').css('transform', "rotate(" + music + "deg)");
		if(music == 360) {
			music = 0;
		}
	}, 10);
	$('#music').on('touchstart', function() {
		if(musicOpen == true) {
			musicOpen = false;
			clearInterval(musicTween);
			$('#bg')[0].pause();
		} else {
			musicOpen = true;
			musicTween = setInterval(function() {
				music += 2;
				$('#music').css('transform', "rotate(" + music + "deg)");
				if(music == 360) {
					music = 0;
				}
			}, 10);
			$('#bg')[0].play();
		}
	});
}

function startGame(res){
	imgList = res;
    app.pageIndex = 4;
    showStory();
    // app.pageIndex = 3;
    // gameStart();
    // GameOpen = true;
}
function showStory() {
	setTimeout(function () {
		$('.story2').show().addClass('animated bounceInLeft');
		setTimeout(function () {
			$('.story1').show().addClass('animated bounceIn');
			$('.story3').show().addClass('animated fadeInRightBig');
			setTimeout(function () {
				$('.story4').show().addClass('animated bounceIn');
				$('.story6').show().addClass('animated bounceInLeft');
				setTimeout(function () {
					$('.story5').show().addClass('animated bounceIn');
					setTimeout(function () {
						app.pageIndex = 1;
					},2000);
				},1000);
			},1000);
		},800);
	},100);
}
//开始游戏
function gameStart(){
    LTweenLite.pauseAll();
    backLayer.removeAllChild();
    backLayer.die();
    backLayer.addChild(getBitmap(imgList['game1']));
    //出现
    germGroup.splice(0,germGroup.length);//清空数组
    magicGroup.splice(0,magicGroup.length);//清空数组
    bossButtles.splice(0,bossButtles.length);//清空数组
    GameOpen = false;
    /////////////////////////////////重置参数////////////////////////////////////////
	//清屏武器层
    weaponLayer = new LSprite();
    backLayer.addChild(weaponLayer);
    weaponLayer.die();
    weaponLayer.removeAllChild();
    //魔法瓶数量
	magicText = new setText(710,1120,30,'x1',"#ffffff","true");
    backLayer.addChild(magicText);
    magicText.visible = false;
    //得分面板
    scoreLayer = new LSprite();
    backLayer.addChild(scoreLayer);
	//飞机层
   	palyLayer = new LSprite();
    palyLayer.die();
    palyLayer.removeAllChild();
    backLayer.addChild(palyLayer);
    //龙宝
    player = new myPlane(350,1000,5000,app.choicePerson);
    player.x = (750-player.getWidth())/2;
    player.y = 1206-player.getHeight()-20;
    palyLayer.addChild(player);
    ////////////////////////////////////////////-得分面板-//////////////////////////////////////////////////////
    scoreText = new setText(640,30,30,'0',"#ffffff","true");
    backLayer.addChild(scoreText);
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////
    //细菌层
	enemyLayer = new LSprite();
    backLayer.addChild(enemyLayer);
    enemyLayer.die();
    enemyLayer.removeAllChild();
    ////////////////////////////////////////////-boss是否出现在-///////////////////////////////////////////////////
    var bossShow = false; //大boss出现
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////Boss操作/////////////////////////////////////////////////////
    bigBoss = new Boss(210,20);     //添加大boss
    bigBoss.y = -bigBoss.getHeight()*2; //纵位置y
    enemyLayer.addChild(bigBoss);
    var bigEFP = 0;
    var bigN = 0;//出现小怪的数量

    var difficult = 30;//难度

    var bossMove; //移动路径
    var listClear = false; //不让路径重复渲染
    var timeBoss; //大boss左右移动
    //大boss每帧监听函数
    bigBoss.addEventListener(LEvent.ENTER_FRAME,function () {
    	if(bossShow == true && bigBoss.frame == true)
		{
			bigEFP++;
			if(bigBoss.hit.hitTestObject(player))
			{
                //爆炸声音
                // $('#bomb')[0].currentTime=0;
                $('#bomb')[0].play();
				//飞机移除
				player.remove();
				//移除palyLayer的每帧监听
				palyLayer.removeEventListener(LEvent.ENTER_FRAME);
				//移除enemyLayer的每帧监听
				enemyLayer.removeEventListener(LEvent.ENTER_FRAME);
				//移除bigBoss的每帧监听
				bigBoss.removeEventListener(LEvent.ENTER_FRAME);
				//移除动画事件
				LTweenLite.pauseAll();
				//爆炸图片
				var bomb = getBitmap(imgList['bomb']);
				bomb.scaleX = 2; //爆炸图片扩大2倍
				bomb.scaleY = 2; //爆炸图片扩大2倍
				bomb.x = (player.x +(player.getWidth()-bomb.getWidth())/2); //爆炸位置x
				bomb.y = (player.y +(player.getHeight()-bomb.getHeight())/2); //爆炸位置y
				weaponLayer.addChild(bomb); //添加图片
				//爆炸效果
				LTweenLite.to(bomb,0.5,{alpha:0,onComplete:function () {
						//爆炸移除
						bomb.remove();
						//游戏失败
						gameFail(scoreText.childList["0"].text,"http://www.baidu.com");
					}});
			}
			//检测大boss的伤亡情况
			if(bigBoss.life<bigBoss.val*1/4){
				bigBoss.bitmap[3].visible = false;
				bigBoss.bitmap[4].visible = true;
			}else if(bigBoss.life<bigBoss.val*2/4){
				bigBoss.bitmap[2].visible = false;
				bigBoss.bitmap[3].visible = true;
			}else if(bigBoss.life<bigBoss.val*3/4){
				bigBoss.bitmap[1].visible = false;
				bigBoss.bitmap[2].visible = true;
			}else if(bigBoss.life<bigBoss.val*5/6)
			{
				bigBoss.bitmap[0].visible = false;
				bigBoss.bitmap[1].visible = true;
			}
			if(bigEFP%difficult==0) {
				bigN++;
				//出现魔法药水
				if(bigN%10==0)
				{
					var ix = 50+ parseInt(Math.random()*590);
					var index = magicGroup.length;
					magicGroup[index] = new weapon(ix,-92,4,parseInt(Math.random()*2)+2);
					enemyLayer.addChild(magicGroup[index]);
				}
				//大佬行为
				if(parseInt(bigN/10)%3==1)
				{
					var index = bossButtles.length;
					listClear = false;
					if(bossMove)
					{
						bossMove.pause();
					}
					timeBoss.resume();
					bossButtles[index] = new bossBullet(bigBoss.x,bigBoss.getWidth(),bigBoss.y+bigBoss.getHeight(),1,player.x+player.getWidth()/2)
					palyLayer.addChild(bossButtles[index]);
				}else if(parseInt(bigN/10)%3==0){
					var index = germGroup.length;
					listClear = false;
					if(bossMove)
					{
						bossMove.pause();
					}
					timeBoss.resume();
					germGroup[index] = new enemy(bigBoss.x, bigBoss.getHeight(), 1.5, parseInt(Math.random() * 3) + 1,true);
					enemyLayer.addChild(germGroup[index]);
					var index = germGroup.length;
					germGroup[index] = new enemy(bigBoss.x+200, bigBoss.getHeight(), 1.5, parseInt(Math.random() * 3) + 1,true);
					enemyLayer.addChild(germGroup[index]);
				}else{
					var list = [];
					if(listClear == false)
					{
						listClear = true;
						timeBoss.pause();
						var cx = bigBoss.x;
						var cy = bigBoss.y;
						list.push(new LPoint(cx,cy));
						list.push(new LPoint(0,403));
						list.push(new LPoint(player.x,player.y-bigBoss.getHeight()+player.getHeight()));
						list.push(new LPoint(420,450));
						list.push(new LPoint(cx,cy));
						bossMove = LTweenLite.to(bigBoss,2.5,{coordinate:list,loop:true,onComplete:function () {
							list[3] = new LPoint(player.x,player.y-bigBoss.getHeight()+player.getHeight());
						}});
					}
				}
			}
        }
    });
    /////////////////////////////////////////////////////Boss操作//////////////////////////////////////////////
    //////////////////////////////////////////////////////-细菌出现-/////////////////////////////////////////////
    var efps = 0; //控制细菌出现频率
    var en = 0; //控制魔法出现在时间
    var ix = 0; //小怪出现的位置

    enemyLayer.addEventListener(LEvent.ENTER_FRAME,function () {
    	if(GameOpen==true&&bossShow==false){
           efps++;

            if(efps == 105)
			{
                enemyLayer.removeEventListener(LEvent.ENTER_FRAME);
                bossShow = true;
                LTweenLite.to(bigBoss,0.5,{delay:0.5,y:20,onComplete:function () {
                	timeBoss  = LTweenLite.to(bigBoss,1.0,{x:20,loop:true}).to(bigBoss,1.0,{x:400,loop:true});
                	bigBoss.frame = true;
                }});
			}else if(efps%15==0)
           {

               en++;

			   if(ix<=110)
			   {
					ix=Math.random()*(530-ix);
			   }else if(ix>530){
					ix=ix-Math.random()*ix;
			   }
			   else{
					if(Math.random()<0.5)
					{
						ix=ix+110+(530-ix)*Math.random();
					}else{
						ix=(ix-110)*Math.random();
					}
			   }
			   if(en==20)
			   {
					en = 0;
					var index = magicGroup.length;
					magicGroup[index] = new weapon(ix,-92,4,parseInt(Math.random()*3)+2);
				    enemyLayer.addChild(magicGroup[index]);
				}else{
					var index = germGroup.length;
					germGroup[index] = new enemy(ix,-92,4,parseInt(Math.random()*3)+1,false);
					enemyLayer.addChild(germGroup[index]);
				}
           }
		}
    });
    //////////////////////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////-子弹飞-/////////////////////////////////////////////
    var fps = 0;//控制子弹发射的频率
    palyLayer.addEventListener(LEvent.ENTER_FRAME,function(){
    	//如果游戏开始
    	if(GameOpen==true){
	    	fps++;
	    	if(fps%10==0)
	    	{
	    		fps=1;
	    		//子弹类型
	    		switch (player.bulletType)
				{
					case 1:
					case 2:
	                    palyLayer.addChild(new bullet(player.bulletType,player.x,player.bitmap.getWidth(),player.y,1,0));
						break;
					case 3:
	                    palyLayer.addChild(new bullet(player.bulletType,player.x,240,player.y,1.08,-300,0));
	                    palyLayer.addChild(new bullet(player.bulletType,player.x,120,player.y,1,0));
	                    palyLayer.addChild(new bullet(player.bulletType,player.x,0,player.y,1,300));
						break;
				}
	
	    	}
	    }
    });
    //////////////////////////////////////////////////////////////////////////////////////////////////////////
	////////////////////////////////////////////-我方飞机移动功能-//////////////////////////////////////////////
    var xs = 0;//点击飞机的位置相对于飞机横坐标的相对值
    var ys = 0;//点击飞机的位置相对于飞机纵坐标的相对值
    player.addEventListener(LMouseEvent.MOUSE_DOWN,function (event) {
    	player.canMove = true;
    });
    player.addEventListener(LMouseEvent.MOUSE_UP,function (event) {
    	player.canMove = false;
    });
    palyLayer.addEventListener(LMouseEvent.MOUSE_DOWN,function (event){
		xs = event.offsetX-player.x;
		ys = event.offsetY-player.y;
	});
    palyLayer.addEventListener(LMouseEvent.MOUSE_MOVE,function (event){
    	if(player.canMove==true)
    	{
    		if(event.offsetX-xs>0&&event.offsetX-xs<750-player.getWidth())
	    	{
	    		player.x = event.offsetX-xs;
	    	}
	    	if(event.offsetY-ys>0&&event.offsetY-ys<1206-player.getHeight())
	    	{
	    		player.y = event.offsetY-ys;
	    	}
    	}
	});
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////

}
