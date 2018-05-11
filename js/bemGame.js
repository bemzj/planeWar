//生成文字
function setText(x,y,size,text,color,weight,stroke)
{
	/*
	 * x为文字的横坐标
	 * y为文字的纵坐标
	 * size为文字大小
	 * text为文字内容
	 * color为颜色
	 * weight为颜色是否加粗
	 */
	base(this,LSprite,[]);
	var word = new LTextField();
	word.text = text;
	word.color = color;
	word.size = size;
	if(stroke == true)
	{
		word.stroke = true;
		word.lineWidth = 4;
		word.lineColor = "#ffffff";
	}
	
	var self = this;
	self.x = x;
	self.y = y;
	if(weight==true)
	{
		word.weight ="bolder";
	}
	self.addChild(word);
	
}
//变大变小
function bigAndSmall(tween,x,y,time,scales,delayTime,loops){
	/*
	 * tween为变化的对象
	 * x为位置的位置，2为居中的位置
	 * y为位置的位置，2为居中的位置
	 * time为变化的时间
	 * scales为变化的倍数
	 * delayTime为延迟的时间
	 * loops为是否循环
	 */
	var bigBeforeX = tween.x;
	var bigBeforeY = tween.y;
	var bigAfterX = tween.x-tween.getWidth()*scales/x;
	var bigAfterY = tween.y-tween.getHeight()*scales/y;
	return LTweenLite.to(tween,time/2,{loop:loops,delay:delayTime,x:bigAfterX,y:bigAfterY,scaleX:(1+scales),scaleY:(1+scales)}).to(tween,time/2,{x:bigBeforeX,y:bigBeforeY,scaleX:1,scaleY:1});
}
//闪闪发光
function bling(target,time,alphaB,alphaA,loops){
	/*
	 * target为目标
	 * time为时间
	 * alphaB为淡出度
	 * alphaA为淡入度
	 * loops为是否重复
	 */
	return LTweenLite.to(target,time,{alpha:alphaB,loop:loops}).to(target,time,{alpha:alphaA});
}
//空函数
function setNull(){}
//返回图片对象
function getBitmap(name){
	return new LBitmap(new LBitmapData(name));
}
//返回按钮对象
function getButton(name){
	return new LButton(new LBitmap(new LBitmapData(name)));
}
//返回位置横坐标
function rCenterWidth(target){
	return (LGlobal.width-target.getWidth())/2;
}
//返回位置纵坐标
function rCenterHeight(target){
	return (LGlobal.height-target.getHeight())/2;
}
//设置换行
function setWrapText(x,y,size,text,color,weight,width,wrap,height,speed)
{
	/*
	 * x为文字的横坐标
	 * y为文字的纵坐标
	 * size为文字大小
	 * text为文字内容
	 * color为颜色
	 * weight为颜色是否加粗
	 * width为宽度
	 * wrap为是否支持换行
	 * height为行高
	 */
	base(this,LSprite,[]);
	var self = this;
	self.word = new LTextField();
	self.word.text = text;
	self.word.color = color;
	self.word.size = size;
	self.word.setWordWrap(wrap,height);
	self.word.width = width;
	self.word.speed = speed;
	self.x = x;
	self.y = y;
	if(weight==true)
	{
		self.word.weight ="bolder";
	}
	self.addChild(self.word);	
}
setWrapText.prototype.play = function(){
	var self = this;
	self.word.wind();
}
