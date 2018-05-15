//图片路径
var url = "";
//图片集
var imgList;//图片集
var player;//玩家
var palyLayer;//飞机层
var germGroup = [];//细菌组
var enemyLayer;//敌机层
var magicGroup = [];//魔法组
var weaponLayer;//武器层
var magicText; //魔法药水
var scoreText; //得分
var scoreLayer;
var weaponNumber = 0;//武器数量
var bigBoss;
var GameOpen = false;
var bossButtles = [];
//图片



var imgAll = [
    {path:url+'img/music.png',type:'img',name:'music'},//我方飞机
	{path:url+'img/long0.png',type:'img',name:'long0'},//我方飞机
    {path:url+'img/long1.png',type:'img',name:'long1'},//我方飞机
    {path:url+'img/long2.png',type:'img',name:'long2'},//我方飞机
    {path:url+'img/long3.png',type:'img',name:'long3'},//我方飞机
    {path:url+'img/bullet1.png',type:'img',name:'bullet1'},//子弹1
    {path:url+'img/bullet2.png',type:'img',name:'bullet2'},//子弹2
    {path:url+'img/bullet3.png',type:'img',name:'bullet3'},//子弹3
    {path:url+'img/index1.png',type:'img',name:'index1'},//首页
    {path:url+'img/index2.png',type:'img',name:'index2'},//主题
    {path:url+'img/index3.png',type:'img',name:'index3'},//奖品框
    {path:url+'img/index4.png',type:'img',name:'index4'},//细菌
    {path:url+'img/index5.png',type:'img',name:'index5'},//细菌
    {path:url+'img/index6.png',type:'img',name:'index6'},//细菌
    {path:url+'img/index7.png',type:'img',name:'index7'},//复仇者联盟
    {path:url+'img/index8.png',type:'img',name:'index8'},//光圈
    {path:url+'img/germ1.png',type:'img',name:'germ1'},//游戏页细菌1
    {path:url+'img/germ2.png',type:'img',name:'germ2'},//游戏页细菌2
    {path:url+'img/germ3.png',type:'img',name:'germ3'},//游戏页细菌3
    {path:url+'img/game1.png',type:'img',name:'game1'},//背景
    {path:url+'img/magic2.png',type:'img',name:'magic2'},//散弹
    {path:url+'img/magic3.png',type:'img',name:'magic3'},//加强弹
    {path:url+'img/magic4.png',type:'img',name:'magic4'},//清屏
    {path:url+'img/boss.png',type:'img',name:'boss'},//boss
    {path:url+'img/boss0.png',type:'img',name:'boss0'},//boss
    {path:url+'img/boss1.png',type:'img',name:'boss1'},//boss
    {path:url+'img/boss2.png',type:'img',name:'boss2'},//boss
    {path:url+'img/boss3.png',type:'img',name:'boss3'},//boss
    {path:url+'img/boss4.png',type:'img',name:'boss4'},//boss
    {path:url+'img/rule1.png',type:'img',name:'rule1'},//规则1
    {path:url+'img/rule2.png',type:'img',name:'rule2'},//规则2
    {path:url+'img/gback.png',type:'img',name:'gback'},//礼物背景
    {path:url+'img/gift1.png',type:'img',name:'gift1'},//礼物1
    {path:url+'img/gift2.png',type:'img',name:'gift2'},//礼物2
    {path:url+'img/gift3.png',type:'img',name:'gift3'},//礼物3
    {path:url+'img/gift4.png',type:'img',name:'gift4'},//礼物4
    {path:url+'img/gift5.png',type:'img',name:'gift5'},//礼物5
    {path:url+'img/gift6.png',type:'img',name:'gift6'},//礼物6
    {path:url+'img/gift7.png',type:'img',name:'gift7'},//礼物7
    {path:url+'img/gift8.png',type:'img',name:'gift8'},//礼物8
    {path:url+'img/gift9.png',type:'img',name:'gift9'},//礼物8
    {path:url+'img/gift10.png',type:'img',name:'gift10'},//礼物8
    {path:url+'img/getGift.png',type:'img',name:'getGift'},//礼物8
    {path:url+'img/address1.png',type:'img',name:'address1'},//地址1
    {path:url+'img/address2.png',type:'img',name:'address2'},//地址2
    {path:url+'img/address3.png',type:'img',name:'address3'},//地址3
    {path:url+'img/award.png',type:'img',name:'award'},//地址3
    {path:url+'img/award0.png',type:'img',name:'award0'},//地址3
    {path:url+'img/award1.png',type:'img',name:'award1'},//地址3
    {path:url+'img/award2.png',type:'img',name:'award2'},//地址3
    {path:url+'img/award3.png',type:'img',name:'award3'},//地址3
    {path:url+'img/pop.png',type:'img',name:'pop'},//弹窗
    {path:url+'img/pop1.png',type:'img',name:'pop1'},//弹窗1
    {path:url+'img/pop2.png',type:'img',name:'pop2'},//弹窗2
    {path:url+'img/pop3.png',type:'img',name:'pop3'},//弹窗2
    {path:url+'img/success1.png',type:'img',name:'success1'},//弹窗2
    {path:url+'img/success2.png',type:'img',name:'success2'},//弹窗2
    {path:url+'img/success3.png',type:'img',name:'success3'},//弹窗2
    {path:url+'img/success4.png',type:'img',name:'success4'},//弹窗2
    {path:url+'img/success5.png',type:'img',name:'success5'},//弹窗2
    {path:url+'img/share1.png',type:'img',name:'share1'},//弹窗2
    {path:url+'img/share2.png',type:'img',name:'share2'},//弹窗2   
    {path:url+'img/share3.png',type:'img',name:'share3'},//弹窗2  
    {path:url+'img/load1.png',type:'img',name:'load1'},//弹窗2 
	{path:url+'img/loadBkg.png',type:'img',name:'loadBkg'},//弹窗2   
	{path:url+'img/person.png',type:'img',name:'person'},//弹窗2 
	{path:url+'img/person1.png',type:'img',name:'person1'},//弹窗2 
	{path:url+'img/indexBtn1.png',type:'img',name:'indexBtn1'},//弹窗2 
	{path:url+'img/indexBtn2.png',type:'img',name:'indexBtn2'},//弹窗2 
	{path:url+'img/indexBtn3.png',type:'img',name:'indexBtn3'},//弹窗2 
	{path:url+'img/gameRule.png',type:'img',name:'gameRule'},//弹窗2
    {path:url+'img/story0.png',type:'img',name:'story0'},//弹窗2
    {path:url+'img/story1.png',type:'img',name:'story1'},//弹窗2
    {path:url+'img/story2.png',type:'img',name:'story2'},//弹窗2
    {path:url+'img/story3.png',type:'img',name:'story3'},//弹窗2
    {path:url+'img/story4.png',type:'img',name:'story4'},//弹窗2
    {path:url+'img/story5.png',type:'img',name:'story5'},//弹窗2
    {path:url+'img/story6.png',type:'img',name:'story6'},//弹窗2
    {path:url+'img/story7.png',type:'img',name:'story7'},//弹窗2
    {path:url+'img/choice1.png',type:'img',name:'choice1'},//弹窗2
    {path:url+'img/choice2.png',type:'img',name:'choice2'},//弹窗2
    {path:url+'img/choice3.png',type:'img',name:'choice3'},//弹窗2
    {path:url+'img/choice4.png',type:'img',name:'choice4'},//弹窗2
    {path:url+'img/choice5.png',type:'img',name:'choice5'},//弹窗2
    {path:url+'img/choice6.png',type:'img',name:'choice6'},//弹窗2
    {path:url+'img/choice7.png',type:'img',name:'choice7'},//弹窗2
    {path:url+'img/choice8.png',type:'img',name:'choice8'},//弹窗2
    {path:url+'img/choice9.png',type:'img',name:'choice9'},//弹窗2
    {path:url+'img/bomb.png',type:'img',name:'bomb'},//弹窗2
];
//游戏初始化
LInit(1000 / 40, "plane", 750, 1206, main);
//游戏入口主函数
function main() {
	LGlobal.stageScale = LStageScaleMode.EXACT_FIT; //设置全屏变量
	LGlobal.screen(LStage.FULL_SCREEN); //设置全面适应
	backLayer = new LSprite(); //创建背景层
	addChild(backLayer); //添加背景层到游戏环境中
	LLoadManage.load(imgAll,loadinging, startGame);
}
//加载进度
function loadinging(per){
	// console.log(per);
	var per = parseInt(per);
	$('.load3 p').text(per+'%');
	$('.load2 div').css('width',per+'%');
}
