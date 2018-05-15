function showPop(id,txt,fun) {
    /*
     * id:1为单弹窗，id为双弹窗
     * text:为文本
     * fun为功能
     */
    $('#popWin').remove();
    var html ="";
    html += '<div id="popWin" class="pw mask"><div class="popWin animated bounceInDown"><img src="img/pop.png" class="img"/><div class="popWinIn">' +
        '<div class="popWinTitle"><img src="img/pop3.png" class="img"/></div>' +
        '<div class="popWinContenr"><p>'+txt+'</p></div>';
    if(id==2)
    {
        html += '<div class="popTwoBtn clearBoth">' +
            '<a href="###" class="floatl"><img src="img/pop1.png"/></a>' +
            '<a href="###" class="floatr"><img src="img/pop2.png"/></a></div>';
    }else{
        html += '<div class="popOneBtn"><a href="###" class="floatl"><img src="img/pop1.png"/></a></div>';
    }
    html += '</div></div><a href="###" class="closePop animated fadeInUp"><img src="img/close.png"/></a></div>';
    $('body').append(html);
    if(id==2)
    {
        $('.popTwoBtn .floatl').on('touchstart',function () {
            $('#popWin').remove();
            if(typeof fun == 'function')
            {
                fun();
            }
        });
        //取消
        $('.popTwoBtn .floatr').on('touchstart',function () {
            $('#popWin .popWin').addClass('animated bounceOut');
            $('#popWin .closePop').addClass('animated fadeOutDown');
            setTimeout(function () {
                $('#popWin').remove();
            },900);
        });
    }else{
        $('.popOneBtn a').on('touchstart',function () {
            $('#popWin').remove();
            if(typeof fun == 'function')
            {
                fun();
            }
        });
    }
    $('#popWin .closePop').on('touchstart',function () {
        $('#popWin .popWin').addClass('animated bounceOut');
        $('#popWin .closePop').addClass('animated fadeOutDown');
        setTimeout(function () {
            $('#popWin').remove();
        },900);
    });
}
//游戏成功
function gameSuccess(score){
	$('#success').remove();
	var html = "";
	html += '<div id="success" class="pw mask"><div class="success1 animated bounceInDown">';
	html += '<img src="img/success1.png" class="img"/></div><div class="success2 animated fadeInDown">';
	html += '<img src="img/success2.png" class="img"  /><div class="success21"><img src="img/success3.png" class="img" />';
	html += '</div><div class="success22"><img src="img/success4.png" class="img" />';
	html += '</div><div class="success23"><img src="img/success2.png" class="img" />';
	html += '</div></div><div class="success3 animated bounceIn">';
	html += '<p>获得'+score+'积分与1次抽奖机会<br/>捍卫家园，保护家人健康<br/>你是位出色的除醛战士</p>';
	html += '</div><div class="success4 animated fadeInUp"><a href="###"><img src="img/success5.png"/></a></div></div>';
	$('body').append(html);
	$('#success .success4 a').one('touchstart',function(){
		
		app.pageIndex = 6;		
		$('#success').remove();
	});
}
//游戏失败
function gameFail(score,links){
	$('#fail').remove();
	var html = "";
	html +='<div id="fail" class="pw mask" ><div class="fail1 animated bounceInDown">';
	html +='<img src="img/error1.png" class="img"/></div>';
	html +='<div class="fail2 animated fadeInDown"><img src="img/error2.png" class="img" /></div>';
	html +='<div class="fail3 animated bounceIn">';
	html +='<p>获得'+score+'积分，成为除醛战士<br/>不是一朝一夕，再接再励！</p></div>';
	html +='<div class="fail4 clearBoth"><a href="###" class="floatl  animated fadeInLeft"><img src="img/error4.png"/> </a>';
	html +='<a href="###" class="floatr  animated fadeInRight"><img src="img/error3.png"/> </a>';
	html +='</div><div class="fail5 animated fadeInUp"><a href="###"><img src="img/error5.png"/></a></div></div>';
	$('body').append(html);
	//返回首页
	$('.fail4 .floatl').one('touchstart',function(){
		$('#fail').remove();
		app.pageIndex = 1;
	});
	//再次挑战
	$('.fail4 .floatr').one('touchstart',function(){
        $('#fail').remove();
        gameStart();
        gameTips();

	});
	//链接
	$('.fail5 a').one('touchstart',function(){
		window.location.href = links;
	});
}
//激活失败
function shareFail(){
	$('#fail').remove();
	var html = "";
	html +='<div id="fail" class="pw mask fail" ><div><div class="fail1 animated bounceInDown">';
	html +='<img src="img/share1.png" class="img"/></div>';
	html +='<div class="fail2 animated fadeInDown"><img src="img/error2.png" class="img" /></div>';
	html +='<div class="fail3 animated bounceIn">';
	html +='<p>请重新分享朋友圈</p></div>';
	html +='<div class="fail6 animated fadeInUp"><a href="###"><img src="img/share2.png"/></a></div></div></div>';
	$('body').append(html);
	//返回首页
	$('.fail6 a').one('touchstart',function(){
		
		$('#fail>div').addClass('animated bounceOut');
		setTimeout(function(){
			$('#fail').remove();
			app.pageIndex = 1;	
		},900);
	});
}
//激活失败
function shareSuccess(){
	$('#success').remove();
	var html = "";
	html += '<div id="success" class="pw mask success"><div><div class="success1 animated bounceInDown">';
	html += '<img src="img/share3.png" class="img"/></div><div class="success2 animated fadeInDown">';
	html += '<img src="img/success2.png" class="img"  /><div class="success21"><img src="img/success3.png" class="img" />';
	html += '</div><div class="success22"><img src="img/success4.png" class="img" />';
	html += '</div><div class="success23"><img src="img/success2.png" class="img" />';
	html += '</div></div><div class="success3 animated bounceIn">';
	html += '<p>礼品已放置“我的礼品，<br/>填写个人信息即可领取。</p>';
	html += '</div><div class="success4 animated fadeInUp"><a href="###"><img src="img/share2.png"/></a></div></div></div>';
	$('body').append(html);
	$('#success .success4 a').one('touchstart',function(){
		$('#success>div').addClass('animated bounceOut');
		setTimeout(function(){
			$('#success').remove();
			app.pageIndex = 2;	
		},900);	
	});
}
//获得礼物
function getGameGift(){
	$('#giftPop').remove();
	var html = "";
	html += '<div id="giftPop" class="pw mask" style="z-index: 9999"><div class="giftPop animated bounceInDown">';
	html += '<img src="img/getGift.png" class="img"/><div class="giftPopIn">';
	html += '<div class="gp1"><img src="img/gift5.png" /></div><div class="gp2">';
	html += '<p>免费获得一个</p><p>价值XX元的抱枕</p></div><div class="gp3">';
	html += '<p>马上分享朋友圈，激活领取礼品！</p></div><div class="gp4">';
	html += '<a href="###"><img src="img/share2.png"/></a></div></div></div></div>';
	$('body').append(html);
	$('.gp4 a').on('touchstart',function(){
		$('.giftPop').addClass('animated bounceOut');
		setTimeout(function(){
			$('#giftPop').remove();
			app.pageIndex = 2;	
		},900);
	});
}
//游戏提示
function gameTips(){
	$('#gameRule').remove();
	var html = "";
	html += '<div id="gameRule" class="pw mask">';
	html += '<div class="timeCount pw" style="display: none;"><p>3</p></div>';
	html += '<div class="gameRule animated fadeInDown">';
	html += '<img src="img/gameRule.png" class="img"/></div>';
	html += '<a href="###" class="closeGameRule animated fadeInUp"><img src="img/close.png" /></a></div>';
	$('body').append(html);
	$('#gameRule .closeGameRule').one('touchstart',function () {
                $('#gameRule .gameRule').removeClass('animated fadeInDown');
				$('#gameRule .gameRule').addClass('animated bounceOut');
                $('#gameRule .closeGameRule').addClass('animated fadeOutDown');
                setTimeout(function () { 
                	var tNumber = 3;
                    $('#gameRule .timeCount').show().addClass('tFrame');
                    $('#three')[0].play();
                    var time = setInterval(function(){ 	
                    	--tNumber;
                    	if(tNumber==0)
                    	{
                    		$('#gameRule .timeCount').find('p').text('Ready');
                            $('#zero')[0].play();
                    	}else if(tNumber==-1)
                        {
                            $('#gameRule .timeCount').find('p').text('GO');
                        }else if(tNumber==-2)
                    	{
                    		clearInterval(time);
                            $('#gameRule .timeCount').hide();
                    		$('#gameRule .timeCount').show().removeClass('tFrame')
                    		$('#gameRule').remove();
                    		GameOpen=true;
                  
                    	}else{
                    		$('#gameRule .timeCount').find('p').text(tNumber);
                    	}
                	},1000);
                },900);
            });
}
