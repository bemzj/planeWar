//我方英雄
function myPlane(x,y,time,id){
    /*
     * x 为横坐标
     * y 为纵坐标
     * time 为魔法效果的消失的时间
     * id 为英雄角色id
     */
	base(this,LSprite,[]);//继承
	var self = this;
	self.bitmap = getBitmap(imgList['long'+id]);//英雄图片
	self.x = x; //横坐标
	self.y = y; //纵坐标
	self.bulletType = 1; //子弹类型
    self.life = 1000; //我方生命
	self.canMove = false; //飞机是否可以移动
	self.addChild(self.bitmap); //添加图片
    self.myTimer = new LTimer(time, 1); //设置魔法时间
    self.myTimer.addEventListener(LTimerEvent.TIMER, function () {
        self.bulletType = 1;
    });
}
//魔法消失
myPlane.prototype.magicDisappear = function () {
	var self = this;
    self.myTimer.reset();  //重置
    self.myTimer.start();  //开始
}
//boss的子弹
function bossBullet(x,w,y,time,offsetX){
    /*
     * x为boss的横坐标位置
     * w为boss的图片宽度
     * y为boss的纵坐标位置
     * time为子弹的速度
     * offsetX为子弹的移动终点x横坐标
     */
    base(this,LSprite,[]);//继承
    var self = this;
    self.bitmap = getBitmap(imgList['bullet2']); //子弹图片
    self.addChild(self.bitmap); //添加图片
    self.x = x+(w-self.bitmap.getWidth())/2; //子弹实际位置x
    self.y = y+20; //子弹实际位置y
    //子弹运动路径
    LTweenLite.to(self,time,{y:1206,x:offsetX,onComplete:function(){
       //子弹移除每帧监听事件
       self.removeEventListener(LEvent.ENTER_FRAME);
       //子弹死亡
       self.die();
       //子弹移除
       self.remove();
    }});
    //boss子弹检测每帧撞击
    self.addEventListener(LEvent.ENTER_FRAME,function(){
        //boss子弹检测飞机
        if(self.hitTestObject(player))
        {
            //子弹移除每帧监听事件
            self.removeEventListener(LEvent.ENTER_FRAME);
            //子弹死亡
            self.die();
            //子弹移除
            self.remove();
            //////////////////////////////////////////////////////////////////////////////
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


            //////////////////////////////////////////////////////////////////////////////
        }

    });
}
//子弹
function bullet(type,x,w,y,time,offsetX,delay){
	base(this,LSprite,[]);
	var self = this;
	/*
	* type为子弹类型
	* x为英雄的横坐标
	* w为英雄的宽度
	* y为英雄的纵坐标
	* time为子弹的移动速度
	* offsetX为散弹位置
	* delay为时间延迟
	*/
	self.bitmap = getBitmap(imgList['bullet'+type]); //子弹图片
	self.addChild(self.bitmap); //添加图片
	self.x = x+(w-self.bitmap.getWidth())/2; //子弹实际位置x
	self.y = y-self.bitmap.getHeight(); //子弹实际位置y
    //判断子弹的伤害值
	if(type==2)
	{
        self.hurt = 1000;//子弹2伤害值
	}else{
        self.hurt = 500;//子弹1伤害值
	}
	//子弹移动
	LTweenLite.to(self,time,{delay:delay,y:-1206+y-self.bitmap.getHeight(),x:x-offsetX,onComplete:function(){
            //子弹移除每帧监听事件
            self.removeEventListener(LEvent.ENTER_FRAME);
            //子弹死亡
            self.die();
            //子弹移除
            self.remove();
	}});
	//每帧检测敌人碰撞
	self.addEventListener(LEvent.ENTER_FRAME,function(){
        //检测大boss碰撞
        if(self.hitTestObject(bigBoss.hit))
        {
            //大boss减少生命
            bigBoss.life -=self.hurt;
            //移除事件
            self.removeEventListener(LEvent.ENTER_FRAME);
            //子弹死亡
            self.die();
            //移除子弹
            self.remove();
            //爆炸声音
            // $('#bomb')[0].currentTime=0;
            $('#bomb')[0].play();
            //爆炸图片
            var bomb = getBitmap(imgList['bomb']);
            bomb.x = self.x; //爆炸位置x
            bomb.y = self.y; //爆炸位置y
            weaponLayer.addChild(bomb); //添加图片
            //爆炸效果
            LTweenLite.to(bomb,0.2,{alpha:0,onComplete:function () {
                    //移除
                    bomb.remove();
            }});
            if(bigBoss.life<=0){
                //移除palyLayer的每帧监听
                palyLayer.removeEventListener(LEvent.ENTER_FRAME);
                //移除enemyLayer的每帧监听
                enemyLayer.removeEventListener(LEvent.ENTER_FRAME);
                //移除bigBoss的每帧监听
                bigBoss.removeEventListener(LEvent.ENTER_FRAME);
                //移除动画事件
                LTweenLite.pauseAll();
                //boss移除
                bigBoss.remove();
                //爆炸声音
                // $('#bomb')[0].currentTime=0;
                $('#bomb')[0].play();
                //爆炸图片
                var bomb = getBitmap(imgList['bomb']);
                bomb.scaleX = 4; //爆炸图片扩大2倍
                bomb.scaleY = 4; //爆炸图片扩大2倍
                bomb.x = (bigBoss.x +(bigBoss.getWidth()-bomb.getWidth())/2); //爆炸位置x
                bomb.y = (bigBoss.y +(bigBoss.getHeight()-bomb.getHeight())/2); //爆炸位置y
                weaponLayer.addChild(bomb); //添加图片
                //爆炸效果
                LTweenLite.to(bomb,0.5,{alpha:0,onComplete:function () {
                        //爆炸移除
                        bomb.remove();
                        //得分
                        gameSuccess(parseInt(scoreText.childList["0"].text));
                }});
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
					//爆炸声音
                    // $('#bomb')[0].currentTime=0;
					$('#bomb')[0].play();

					//爆炸图片
					var bomb = getBitmap(imgList['bomb']);
                    bomb.x = (germGroup[i].x +(germGroup[i].getWidth()-bomb.getWidth())/2); //爆炸位置x
                    bomb.y = (germGroup[i].y +(germGroup[i].getHeight()-bomb.getHeight())/2); //爆炸位置y
                    weaponLayer.addChild(bomb); //添加图片
                    //爆炸图片
                    LTweenLite.to(bomb,0.2,{alpha:0,onComplete:function () {
                        //移除
                        bomb.remove();
                    }});
                    if(germGroup[i].noScore==false)
                    {
                        //加分
                        scoreText.childList["0"].text= parseInt(scoreText.childList["0"].text)+germGroup[i].score;
                        //得分
                        var germText = new setText(germGroup[i].x+(germGroup[i].getWidth()-36)/2,germGroup[i].y,36,"+"+germGroup[i].score,"#fcfdff");
                        weaponLayer.addChild(germText);
                        //弹出加分面板
                        LTweenLite.to(germText,0.2,{y:germGroup[i].y-20,onComplete:function () {
                                //文字面板移除
                                germText.remove();
                        }});
                    }

                    //移除动画
                    LTweenLite.remove(germGroup[i].rotateBody);
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
        //检测与boss子弹碰撞
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
                //爆炸声音
                // $('#bomb')[0].currentTime=0;
                $('#bomb')[0].play();
                //爆炸图片
                var bomb = getBitmap(imgList['bomb']);
                bomb.x = self.x; //爆炸位置x
                bomb.y = self.y; //爆炸位置y
                weaponLayer.addChild(bomb); //添加图片
                LTweenLite.to(bomb,0.2,{alpha:0,onComplete:function () {
                        //移除
                        bomb.remove();
                    }});
                //移除事件
                bossButtles[i].removeEventListener(LEvent.ENTER_FRAME);
                //敌机死亡
                bossButtles[i].die();
                //敌机移除
                bossButtles[i].remove();
                //将从boss子弹组中移除
                bossButtles.splice(i,1);
            }
        }
	});
}

//细菌
function enemy(x,y,time,id,noScore){
    /*
     * x为细菌横坐标
     * y为细菌横坐标
     * time为速度
     * id为细菌种类
     */
    base(this,LSprite,[]);
    var self = this;
    self.bitmap = getBitmap(imgList['germ'+id]); //细菌图片
    self.x = x; //横坐标
    self.y = y; //纵坐标
    self.life = 1000; //细菌生命
	self.score = 10*id; //细菌分数
    self.noScore = noScore; //没有分数
    self.addChild(self.bitmap); //图片
	self.moveOut = false; //细菌是否出界
    //细菌运动
    LTweenLite.to(self,time,{x:x,y:1206,onComplete:function(){
        //移除细菌每帧事件
        self.removeEventListener(LEvent.ENTER_FRAME);
        //敌机死亡
        self.die();
        //细菌移除
        self.remove();//飞机运动
        //细菌已经出界
		self.moveOut = true;
		//细菌移除动画
        LTweenLite.remove(self.rotateBody);
    }});
    //细菌动作
    self.rotateBody = LTweenLite.to(self.bitmap,0.5,{rotate:-20,loop:true}).to(self.bitmap,0.5,{rotate:0});
    //每帧都在检测碰撞
    self.addEventListener(LEvent.ENTER_FRAME,function(){
    	//细菌碰撞英雄成功
    	if(self.hitTestObject(player))
		{
            //移除动画
            LTweenLite.remove(self.rotateBody);
			//移除事件
            self.removeEventListener(LEvent.ENTER_FRAME);
            //敌机死亡
            self.die();
            //移除敌机
            self.remove();
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
            bomb.scaleX = 1.5; //爆炸图片扩大2倍
            bomb.scaleY = 1.5; //爆炸图片扩大2倍
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
	});
}
//魔法武器
function weapon(x,y,time,id) {
    /*
     * x为横坐标位置
     * y为横坐标位置
     * time为速度
     * id为类型
     */
    base(this,LSprite,[]);
    var self = this;
    self.bitmap = getBitmap(imgList['magic'+id]); //魔法图片
    self.x = x; //横坐标
    self.y = y; //纵坐标
    self.addChild(self.bitmap); //添加图片
    //魔法武器运动
    LTweenLite.to(self,time,{x:x,y:1206,onComplete:function(){
            //移除魔法武器每帧事件
            self.removeEventListener(LEvent.ENTER_FRAME);
            //魔法武器死亡
            self.die();
            //魔法武器移除
            self.remove();
            //魔法武器移除动画
            LTweenLite.remove(self.rotateBody);
        }});
    //魔法武器动作
    self.rotateBody = LTweenLite.to(self.bitmap,0.5,{rotate:-20,loop:true}).to(self.bitmap,0.5,{rotate:0});
    //每帧都在检测碰撞
    self.addEventListener(LEvent.ENTER_FRAME,function(){
        //魔法武器碰撞英雄成功
        if(self.hitTestObject(player))
        {
        	//移除动画
            LTweenLite.remove(self.rotateBody);
            //魔法武器死亡
            self.die();
            //移除事件
            self.removeEventListener(LEvent.ENTER_FRAME);
            //移除武器
            self.remove();
            if(id!=4)
			{
			    //英雄魔法子弹类型
                player.bulletType = id;
                //魔法调用事件
                player.magicDisappear();
			}else{
                //添加清屏武器
                weaponLayer.addChild(new clearWeapon(player.x+20,player.y-97));
                //魔法瓶数量增加1
                weaponNumber++;
			}
        }
    });
}
//清屏武器
function clearWeapon(x,y) {
    /*
     * x为横坐标位置
     * y为纵坐标位置
     */
    base(this,LSprite,[]);
    var self = this;
    self.bitmap = getBitmap(imgList['magic4']); //清屏图片
    self.x = x; //横坐标
    self.y = y; //纵坐标
    self.addChild(self.bitmap); //图片
    //清屏武器移动
	LTweenLite.to(self,0.8,{x:630,y:1100,onComplete:function () {
	    //武器数量面板显示
		magicText.visible = true;
		//武器数量面板文字显示
		magicText.childList["0"].text = ('x'+ weaponNumber);
	}});
	//添加点击事件
	self.addEventListener(LMouseEvent.MOUSE_DOWN,function () {
        //点击事件移除
		self.removeEventListener(LMouseEvent.MOUSE_DOWN);
		//事件死亡
        self.die();
        //魔法瓶消失
        self.remove();
        //减少数量
        weaponNumber--;
        //在面板中显示
        magicText.childList["0"].text = ('x'+ weaponNumber);
        //将所有细菌清除
        for(var i=0;i<germGroup.length;i++)
		{
		    //判断是否细菌在界内
			if(germGroup[i].moveOut==false)
			{
                LTweenLite.remove(germGroup[i].rotateBody);
                if(germGroup[i].noScore==false)
                {
                    //加分
                    scoreText.childList["0"].text= parseInt(scoreText.childList["0"].text)+germGroup[i].score;
                    //得分
                    var germText = new setText(germGroup[i].x+(germGroup[i].getWidth()-36)/2,germGroup[i].y,36,"+"+germGroup[i].score,"#fcfdff");
                    scoreLayer.addChild(germText);
                    //得分动画
                    LTweenLite.to(germText,0.2,{y:germGroup[i].y-20,onComplete:function () {
                            scoreLayer.removeAllChild();
                        }});
                }
			}
            //移除事件
            germGroup[i].removeEventListener(LEvent.ENTER_FRAME);
            //敌机死亡
            germGroup[i].die();
            //敌机移除
            germGroup[i].remove();
            //将从敌机组中移除
            germGroup.splice(i,1);
            //移除动画

            i--;
		}
        //爆炸声音
        // $('#bomb')[0].currentTime=0;
        $('#bomb')[0].play();
		//如果魔法瓶数量为0
        if(weaponNumber	==0)
		{
		    // 将面板隐藏
            magicText.visible = false;
		}
    });
}

function Boss(x,y) {
    /*
     * x为boss的横坐标
     * y为boss的纵坐标
     */
    base(this,LSprite,[]);
    var self = this;
    self.bitmap = []; //图片组
    self.frame = false; //开始检测
    for(var i=0;i<5;i++)
    {
        self.bitmap[i] = getBitmap(imgList['boss'+i]); //boss图片
        self.bitmap[i].visible = false; //隐藏boss各种形态
        self.addChild(self.bitmap[i]); //添加图片
    }
    self.bitmap[0].visible = true; //显示第一张
    self.x = x; //横坐标
    self.y = y; //纵坐标
    self.life = 10000; //大boss为血量
    self.val =  self.life; //记录最大量
	self.hit = new LSprite(); //碰撞层
	self.hit.y = -10; //碰撞层纵坐标
    self.addChild(self.hit); //添加到boss层
    //boss碰撞范围
    self.hit.addShape(LShape.VERTICES,[[0, 182], [32, 250], [75, 252],[75,376],[132,393],[202,393],[246,372],[249,260],[308,230],[330,157]]);

}