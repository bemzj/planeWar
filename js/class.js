//飞机
function myPlane(x,y,time){
	base(this,LSprite,[]);
	var self = this;
	self.bitmap = getBitmap(imgList['long']);//飞机图片
	self.x = x;//横坐标
	self.y = y;//纵坐标
	self.mouseX = 0;//鼠标起始位置x
    self.mouseY = 0;//鼠标起始位置y
	self.bulletType = 1;
    self.life = 1000;//我方生命
	self.canMove = false;//飞机可移动
	self.addChild(self.bitmap);
    self.myTimer = new LTimer(time, 1);
    self.myTimer.addEventListener(LTimerEvent.TIMER, function () {
        self.bulletType = 1;
    });
}
myPlane.prototype.magicDisappear = function () {
	var self = this;
    self.myTimer.reset();
    self.myTimer.start();
}
//boss的子弹
function bossBullet(x,w,y,time,offsetX){
    base(this,LSprite,[]);
    var self = this;
    self.bitmap = getBitmap(imgList['bullet2']);//子弹图片
    self.addChild(self.bitmap);//添加图片
    self.x = x+(w-self.bitmap.getWidth())/2;//子弹实际位置x
    self.y = y+20;//子弹实际位置y
    self.life = 1000;
    LTweenLite.to(self,time,{y:1206,x:offsetX,onComplete:function(){
       //子弹死亡
       self.removeEventListener(LEvent.ENTER_FRAME);
       self.die();
       self.remove();
    }});
    //子弹速度
    self.addEventListener(LEvent.ENTER_FRAME,function(){
        if(self.hitTestObject(player))
        {
            //子弹死亡
            self.removeEventListener(LEvent.ENTER_FRAME);
            self.die();
            self.remove();
            //飞机移除
            player.remove();
            palyLayer.removeEventListener(LEvent.ENTER_FRAME);
            enemyLayer.removeEventListener(LEvent.ENTER_FRAME);
            bigBoss.removeEventListener(LEvent.ENTER_FRAME);
            LTweenLite.pauseAll();
        }

    });
}
//子弹
function bullet(type,x,w,y,time,offsetX,delay){
	base(this,LSprite,[]);
	var self = this;
	/*
	* type为子弹类型
	* x为起始位置
	* w为飞机宽度
	* y为起始位置
	*/
	self.bitmap = getBitmap(imgList['bullet'+type]);//子弹图片
	self.addChild(self.bitmap);//添加图片
	self.x = x+(w-self.bitmap.getWidth())/2;//子弹实际位置x
	self.y = y-self.bitmap.getHeight();//子弹实际位置y
	if(type==2)
	{
        self.hurt = 1000;//子弹2伤害值
	}else{
        self.hurt = 500;//子弹1伤害值
	}
	LTweenLite.to(self,time,{delay:delay,y:-1206+y-self.bitmap.getHeight(),x:x-offsetX,onComplete:function(){
		//子弹死亡
        self.removeEventListener(LEvent.ENTER_FRAME);
        self.die();
		self.remove();
	}});//子弹速度
	//每帧检测敌机碰撞

	self.addEventListener(LEvent.ENTER_FRAME,function(){
        if(self.hitTestObject(bigBoss.hit))
        {
            bigBoss.life -=self.hurt;
            //移除事件
            self.removeEventListener(LEvent.ENTER_FRAME);
            //子弹死亡
            self.die();
            //移除子弹
            self.remove();
            var bomb = getBitmap(imgList['bomb']);
            bomb.x = self.x;
            bomb.y = self.y;
            weaponLayer.addChild(bomb);
            LTweenLite.to(bomb,0.2,{alpha:0,onComplete:function () {
                    bomb.remove();
                }});
            if(bigBoss.life<=0){
                bigBoss.remove();
                palyLayer.removeEventListener(LEvent.ENTER_FRAME);
                enemyLayer.removeEventListener(LEvent.ENTER_FRAME);
                LTweenLite.pauseAll();

            }
        }
		//检测所有敌机碰撞
		for(var i=0;i<germGroup.length;i++)
		{
			//碰撞成功
			if(self.hitTestObject(germGroup[i]))
			{
				//敌机生命减少
                germGroup[i].life-=self.hurt;
                //移除事件
				self.removeEventListener(LEvent.ENTER_FRAME);
				//子弹死亡
                self.die();
                //移除子弹
				self.remove();

				//如果敌机生命值小于0
				if(germGroup[i].life<=0){
                    LTweenLite.remove(germGroup[i].rotateBody);
					//爆炸声音
                    $('#bomb')[0].currentTime=0;
					$('#bomb')[0].play();
					var bomb = getBitmap(imgList['bomb']);
                    bomb.x = (germGroup[i].x +(germGroup[i].getWidth()-bomb.getWidth())/2);
                    bomb.y = (germGroup[i].y +(germGroup[i].getHeight()-bomb.getHeight())/2);
                    weaponLayer.addChild(bomb);
                    LTweenLite.to(bomb,0.2,{alpha:0,onComplete:function () {
                            bomb.remove();
                        }});
					//加分
                    scoreText.childList["0"].text= parseInt(scoreText.childList["0"].text)+germGroup[i].score;
                    //得分
                    var germText = new setText(germGroup[i].x+(germGroup[i].getWidth()-36)/2,germGroup[i].y,36,"+"+germGroup[i].score,"#fcfdff");
                    weaponLayer.addChild(germText);
                    LTweenLite.to(germText,0.2,{y:germGroup[i].y-20,onComplete:function () {
                            germText.remove();
                        }});
					//移除事件
                    germGroup[i].removeEventListener(LEvent.ENTER_FRAME);
					//敌机死亡
                    germGroup[i].die();
					//敌机移除
                    germGroup[i].remove();
                    //将从敌机组中移除
                    germGroup.splice(i,1);

				}
					
			}

		}
        for(var i=0;i<bossButtles.length;i++)
        {
            //碰撞成功
            if(self.hitTestObject(bossButtles[i]))
            {
                //移除事件
                self.removeEventListener(LEvent.ENTER_FRAME);
                //子弹死亡
                self.die();
                //移除子弹
                self.remove();
                //敌机生命减少
                bossButtles[i].life-=self.hurt;
                if(bossButtles[i].life<=0)
                {
                    //移除事件
                    bossButtles[i].removeEventListener(LEvent.ENTER_FRAME);
                    //敌机死亡
                    bossButtles[i].die();
                    //敌机移除
                    bossButtles[i].remove();
                    //将从敌机组中移除
                    bossButtles.splice(i,1);
                }

            }
        }
	});
}

//细菌
function enemy(x,y,time,id){
    base(this,LSprite,[]);
    var self = this;
    self.bitmap = getBitmap(imgList['germ'+id]);//飞机图片
    self.x = x;//横坐标
    self.y = y;//纵坐标
    self.life = 1000;//生命
	self.score = 10*id;
    self.addChild(self.bitmap);//图片
	self.moveOut = false;
    LTweenLite.to(self,time,{x:x,y:1206,onComplete:function(){
        self.remove();//飞机运动
		self.moveOut = true;
        LTweenLite.remove(self.rotateBody);
    }});
    self.rotateBody = LTweenLite.to(self.bitmap,0.5,{rotate:-20,loop:true}).to(self.bitmap,0.5,{rotate:0});
    //每帧都在检测碰撞
    self.addEventListener(LEvent.ENTER_FRAME,function(){
    	//敌机碰撞飞机成功
    	if(self.hitTestObject(player))
		{
            //移除动画
            LTweenLite.remove(self.rotateBody);
			//移除事件
            self.removeEventListener(LEvent.ENTER_FRAME);
            //移除敌机
            self.remove();
            //飞机移除
            player.remove();
            palyLayer.removeEventListener(LEvent.ENTER_FRAME);
            enemyLayer.removeEventListener(LEvent.ENTER_FRAME);
            bigBoss.removeEventListener(LEvent.ENTER_FRAME);
            LTweenLite.pauseAll();
		}
	});
}
//魔法武器
function weapon(x,y,time,id) {
    base(this,LSprite,[]);
    var self = this;
    self.bitmap = getBitmap(imgList['magic'+id]);//飞机图片
    self.x = x;//横坐标
    self.y = y;//纵坐标
    self.addChild(self.bitmap);//图片
    LTweenLite.to(self,time,{x:x,y:1206,onComplete:function(){
            self.remove();//飞机运动
            LTweenLite.remove(self.rotateBody);
        }});
    self.rotateBody = LTweenLite.to(self.bitmap,0.5,{rotate:-20,loop:true}).to(self.bitmap,0.5,{rotate:0});
    //每帧都在检测碰撞
    self.addEventListener(LEvent.ENTER_FRAME,function(){
        //敌机碰撞飞机成功
        if(self.hitTestObject(player))
        {
        	//移除动画
            LTweenLite.remove(self.rotateBody);
            //移除事件
            self.removeEventListener(LEvent.ENTER_FRAME);
            //移除武器
            self.remove();
            if(id!=4)
			{
                player.bulletType = id;
                player.magicDisappear();
			}else{
                weaponLayer.addChild(new clearWeapon(player.x+20,player.y-97));
                weaponNumber++;
			}
        }
    });
}
//清屏武器
function clearWeapon(x,y) {
    base(this,LSprite,[]);
    var self = this;
    self.bitmap = getBitmap(imgList['magic4']);//飞机图片
    self.x = x;//横坐标
    self.y = y;//纵坐标
    self.addChild(self.bitmap);//图片
	LTweenLite.to(self,0.8,{x:630,y:1100,onComplete:function () {
		magicText.visible = true;
		magicText.childList["0"].text = ('x'+ weaponNumber);

        }});
	self.addEventListener(LMouseEvent.MOUSE_DOWN,function () {
		self.removeEventListener(LMouseEvent.MOUSE_DOWN);
        self.die();
        self.remove();
        weaponNumber--;
        magicText.childList["0"].text = ('x'+ weaponNumber);
        for(var i=0;i<germGroup.length;i++)
		{
			if(germGroup[i].moveOut==false)
			{
                //加分
                scoreText.childList["0"].text= parseInt(scoreText.childList["0"].text)+germGroup[i].score;
                //得分
                var germText = new setText(germGroup[i].x+(germGroup[i].getWidth()-36)/2,germGroup[i].y,36,"+"+germGroup[i].score,"#fcfdff");
                scoreLayer.addChild(germText);
                LTweenLite.to(germText,0.2,{y:germGroup[i].y-20,onComplete:function () {
                        scoreLayer.removeAllChild();
                    }});
			}
            //移除事件
            germGroup[i].removeEventListener(LEvent.ENTER_FRAME);
            //敌机死亡
            germGroup[i].die();
            //敌机移除
            germGroup[i].remove();
            //将从敌机组中移除
            germGroup.splice(i,1);
            i--;

		}
        if(weaponNumber	==0)
		{
            magicText.visible = false;
		}
    });
}

function Boss(x,y) {
    base(this,LSprite,[]);
    var self = this;
    self.bitmap = [];
    for(var i=0;i<5;i++)
    {
        self.bitmap[i] = getBitmap(imgList['boss'+i]);//飞机图片
        self.bitmap[i].visible = false;
        self.addChild(self.bitmap[i]);
    }
    self.bitmap[0].visible = true;
    self.x = x;//横坐标
    self.y = y;//纵坐标
    self.life = 60000;//十万血
    self.val =  self.life;
	self.hit = new LSprite();
	self.hit.y = -10;
    self.addChild(self.hit);
    self.hit.addShape(LShape.VERTICES,[[0, 182], [32, 250], [75, 252],[75,376],[132,393],[202,393],[246,372],[249,260],[308,230],[330,157]]);
}