$(function() {
	//删除不良信息
	$('.delete1').prevAll().remove();
	$('.delete2').nextAll().remove();

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
    homepage();
}
//首页
function homepage(){
	LTweenLite.pauseAll();	
	backLayer.removeAllChild();
	backLayer.die();


    // gameStart();
}
//开始游戏
function gameStart(){
    LTweenLite.pauseAll();
    backLayer.removeAllChild();
    backLayer.die();
    backLayer.addChild(getBitmap(imgList['game1']))
	//清屏武器层
    weaponLayer = new LSprite();
    backLayer.addChild(weaponLayer);
	magicText = new setText(710,1120,30,'x1',"#ffffff","true");
    backLayer.addChild(magicText);
    magicText.visible = false;
    //得分面板
    scoreLayer = new LSprite();
    backLayer.addChild(scoreLayer);
	//飞机层
   	palyLayer = new LSprite();
    backLayer.addChild(palyLayer);
    //龙宝
    player = new myPlane(350,1000,10000);
    palyLayer.addChild(player);
   	//细菌层
    var efps = 0;//控制细菌出现频率
    var en = 0;//控制魔法出现在时间
    var ix = 0;
	enemyLayer = new LSprite();
    backLayer.addChild(enemyLayer);
    //Boss
    bigBoss = new Boss(350,0);
    enemyLayer.addChild(bigBoss);
    enemyLayer.addEventListener(LEvent.ENTER_FRAME,function () {
        // efps++;
        // if(efps%20==0)
		// {
         //    efps = 1;
         //    en++;
        //
		// 	if(ix<=110)
		// 	{
		// 		ix=Math.random()*(530-ix);
		// 	}else if(ix>530){
		// 		ix=ix-Math.random()*ix;
		// 	}
		// 	else{
		// 		if(Math.random()<0.5)
		// 		{
         //            ix=ix+110+(530-ix)*Math.random();
		// 		}else{
         //            ix=(ix-110)*Math.random();
		// 		}
		// 	}
		// 	if(en==20)
		// 	{
         //        en = 0;
         //        var index = magicGroup.length;
         //        // magicGroup[index] = new weapon(ix,-92,4,parseInt(Math.random()*3)+2);
         //        magicGroup[index] = new weapon(ix,-92,4,4);
         //        enemyLayer.addChild(magicGroup[index]);
		// 	}else{
         //        var index = germGroup.length;
         //        germGroup[index] = new enemy(ix,-92,4,parseInt(Math.random()*3)+1);
         //        enemyLayer.addChild(germGroup[index]);
		// 	}
        //
        // }
    });

    //////////////////////////////////////////////////////-子弹飞-/////////////////////////////////////////////
    var fps = 0;
    palyLayer.addEventListener(LEvent.ENTER_FRAME,function(){
    	fps++;
    	if(fps%10==0)
    	{
    		fps=1;
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
    		if(event.offsetX-xs>0&&event.offsetX-xs<630)
	    	{
	    		player.x = event.offsetX-xs;
	    	}
	    	if(event.offsetY-ys>0&&event.offsetY-ys<1042)
	    	{
	    		player.y = event.offsetY-ys;
	    	}
    	}
	});
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////-得分面板-//////////////////////////////////////////////////////
    scoreText = new setText(640,30,30,'0',"#ffffff","true");
    backLayer.addChild(scoreText);
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////
}
