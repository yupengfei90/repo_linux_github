var QYMiniChatExtra = {
    windowLayerOut: function (layerOut, iniConfig) {
        var layerOut = layerOut;
        layerOut.addObj('windowLayerOut', this);
        var windowLayerOut = this;
        var language = iniConfig.getConfig('language');

        var iniConfig = iniConfig;
        this.setLayout = function () {

            var ie6 = !-[1, ] && !window.XMLHttpRequest;
            var cH = document.documentElement.clientHeight;
            $('#main_left').height(cH)

            $('#messageStyleSettingPanel').height(20).css({'padding': '5px 0px'});

            $('#chatMessageInputPanel').width($('#chatMessageInputBox').width() - 52);
            $('#sentButton').css('left', $('#chatMessageInputPanel').width() - $('#sentButton').width() - 35);

            if (/none/i.test($('#messageStyleSettingPanel').css('display'))) {
                $('#chatMessageAreaBox').height(cH - 114 + 39);
                $('#Function_box').css('border-top', '0px');

            } else {

                if (ie6) {
                    if (language == 'russian') {
                        $('#chatMessageAreaBox').height(cH - 146 + 39);
                    } else {
                        $('#chatMessageAreaBox').height(cH - 147 + 39);
                    }

                } else {
                    $('#chatMessageAreaBox').height(cH - 145 + 39);
                }
            }

            try {
                $('html').css({'overflow-x': 'hidden', 'overflow-y': 'hidden'});
                $('body').css({'overflow-x': 'hidden', 'overflow-y': 'hidden'});
            } catch (e) {
                $('body').css({'overflow-x': 'hidden', 'overflow-y': 'hidden'});
            }


            if (iniConfig.getConfig('windowResize')) {
                //图片大小
                $('#chatMessageAreaBox').find('img[imgType="QYpicture"]').each(function () {
                    QYJSUtil.reSizeImg($(this), $('#chatToolBar').width(), iniConfig.getConfig('wMode'));
                });
                $('#chatMessageTitle').find('img').each(function () {
                    QYJSUtil.reSizeImg($(this), $('#chatToolBar').width(), iniConfig.getConfig('wMode'), true);
                });
                setTimeout(function () {
                    if (iniConfig.getConfig('windowResize')) {
                        windowLayerOut.setLayout();
                        iniConfig.setConfig('windowResize', false);
                    }
                }, 200)
            }
        }
    }
}


