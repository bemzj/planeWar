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