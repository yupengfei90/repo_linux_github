//初始化相关对象

var QYChatRunInit = function (config, emotionXMLContent, languageXMLContent) {

    //外部通信对象
    var messageInterface;

    //swf对象
    var CCWebCtrl;

    //布局
    var layOutSetter;

    //窗口提示
    var windowNotice;

    //上传程序
    var uploader;

    //chat
    var chat = this;

    //widget
    var widget;

    var tellSWFReadyId;

    //上传文件缓存
    var uploadFileCache = { };

    var inPuttingMessageCache = '';

    //翻译语言包
    var languageTemplate = new (QYChat.config.languageTemplate)();

    var config = eval('(' + config + ')');

    //配置
    var iniConfig = new (QYChat.config.iniConfig)();

    iniConfig.addConfigObj({
            'debug': false,
            'closeEditor': false,
            'chooseClerk': false,
            'SWFReady': false,
            'emotionReady': false,
            'languageReady': false,
            'inPutting': false,
            'windowResize': false,
            'hasImgInMessage': false,
            'showMessageBox': false,
            'hasConsulted': false,
            'hasAssessed': false,
            'isClosingOldWindow': false,
            'manualCloseChat': false,
            'chatInQueue': false,
            'clerkStatus': [], //status=0表示离线 status=1表示在线 status=2表示忙碌 status=3表示离开 status=4表示隐身
            'isChatWindow': true,
            'statisticFileAddress': config['statisticFileAddress'],

            'CCRobotStatus': 0, // 0:处于人工客服 1：处于机器人客服
            'emotionMap': {},
            'emotionMapTip': {},

            'visitorId': config['visitorId'],
            'clerkId': config['clerkId'],
            'clerkName': '',
            'websiteId': config['websiteId'],
            'clientUrl': config['clientUrl'],
            'openAssess': config['openAssess'],
            'leavingMessageSetting': config['leavingMessageSetting'],
            'robotState': config['robotState'],

            'assessAddress': config['assessAddr'],
            'wMode': config['wMode'],
            'originPageTitle': config['originPageTitle'],
            'originPageUrl': config['originPageUrl'],
            'windowMinHeight': config['windowMinHeight'],
            'windowMinWidth': config['windowMinWidth'],

            'language': config['language'],
            'webSite': config['webSite'],
            'webChatPath': config['webChatPath'],
            'emotionImgPath': config['emotionImgPath'],
            'version': config['version'],
            'qiyeQQImage': config['qiyeQQImage'],

            'imgPath': config['imgPath'],
            'fileTypePath': config['fileTypePath'],
            'fileDownloadAddr': config['fileDownloadAddr'],

            'fileUploadFlashAddr': config['fileUploadFlashAddr'],
            'fileUploadFileAddr': config['fileUploadFileAddr'],

            'adverState': config['adverState'],
            'adverPicurl': config['adverPicurl'],
            'adverLink': config['adverLink'],
            'adverWorkStatus': config['adverWorkStatus'],
            'floatAd': config['floatAd'],

            'sentSelectedEvent': 'Enter',
            'catchScreenParam': config['screenCatchPlus'],
            //decodeLanguageXML()  翻译下面的文字
            'fileAllowUpload': [
                //{title: '所有文件' + '(' + config['allAllowFilesType'] + ')', extensions: config['allAllowFilesType']},
                {title: '图像文件' + '(' + config['allUploadImages'] + ')', extensions: config['allUploadImages']},
                {title: '压缩文件' + '(' + config['allUploadZips'] + ')', extensions: config['allUploadZips']},
                {title: '文本文件' + '(' + config['allUploadTxTs'] + ')', extensions: config['allUploadTxTs']}
            ],
            'max_file_size': config['allowUploadFileSize'],

            'fontStyle': {},
            'messagetNoticeId': [],

            'fonts': config['fonts'],
            'fontSizes': config['fontSizes'],
            'sentInputtingTime': config['sentInputtingTime'],

            //当type=4时，messageContent为html格式的信息；
            //type：消息格式(0:发送消息标题;1:接收消息标题;2:提示信息;3:错误信息;4:智能机器人信息;)
            'messageType': {
                0: 'sentMessageTitle',
                1: 'receiveMessageTitle',
                2: 'noticeMessage',
                3: 'errorMessage',
                4: 'CCRobotMessage',
                5: 'queue'
            }
        }
    )
    config = '';
    this.run = function () {

        ////////////////////////////------------------------初始化对象----------------------------/ ///////////////////////////

        /***************-------  消息接口  -----******************/
            //初始化消息接口
        messageInterface = new (QYChat.messageInterface)(chat, iniConfig);

        /***************-------  window error  -----******************/

        window.onerror = function (sMessage, sUrl, sLine) {
            if (iniConfig.getConfig('debug')) {
                messageInterface.addRawChatMessage('windowError==' + sMessage + 'sUrl==' + sUrl + 'sLine==' + sLine)
            }
            return true
        }

        /***************-------  window focus  -----******************/
        if (iniConfig.getConfig('wMode') == 'big') {
            $(window).focusin(function () {
                chat.windowFocusIn();
                windowNotice.resetTitle()
            });
        }

        /***************-------   注册chat  -----******************/

            //注册chat
        window.chat = this;

        /***************-------  布局  -----******************/

        layOutSetter = new (QYChat.layerOut)(messageInterface, iniConfig);
        $(window).css('overflow', 'hidden')

        /***************-------  widget  -----******************/

        widget = new (QYChat.widget)(iniConfig, messageInterface);

        /***************-------  屏幕遮罩  -----******************/

        if (iniConfig.getConfig('wMode') == 'big') {
            var chatMask = new (QYChat.chatMask)(layOutSetter, languageTemplate, iniConfig, messageInterface);
            //chatMask.createMask();
            widget.addWidget('chatMask', chatMask);
        }

        /***************-------  布局  -----******************/

        if (iniConfig.getConfig('wMode') == 'big') {
            var windowLayerOut = new (QYChat.windowLayerOut)(layOutSetter, iniConfig);
        } else if (iniConfig.getConfig('wMode') == 'mini') {
            var windowLayerOut = new (QYMiniChatExtra.windowLayerOut)(layOutSetter, iniConfig);
        }

        var chatMessageAreaLayerOut = new (QYChat.chatMessageAreaLayerOut)(iniConfig, layOutSetter);

        /***************-------  统计  -----******************/

        var statistic = new (QYChat.statistic)(iniConfig);

        /***************-------  消息提示  -----******************/


        if (iniConfig.getConfig('wMode') == 'big') {
            windowNotice = new (QYChat.windowNotice)(iniConfig, languageTemplate);
        }

        /***************-------  swf  -----******************/
        CCWebCtrl = this.getCCWebCtrl();

        setInterval(function () {
            if (!CCWebCtrl) {
                CCWebCtrl = chat.getCCWebCtrl();
            }
        }, 2000)

        /***************-------  inPutting监听  -----******************/

        setInterval(function () {
            //if (iniConfig.getConfig('inPutting')) {
            chat.inPutting((chatMessageInputPanelObj.getChatInputMessage())[1]);
            //    iniConfig.setConfig('inPutting', false)
            //}
        }, iniConfig.getConfig('sentInputtingTime'));

        /***************-------  布局  -----******************/

        layOutSetter.entireLayerOut();
        $(window).resize(function () {
            iniConfig.setConfig('windowResize', true);
            layOutSetter.entireLayerOut();
        });

        /***************-------  浮动广告  -----******************/

        if (iniConfig.getConfig('wMode') == 'big') {

            var floatAdContainer = $('#floatAdvertismentContainer');
            var floatAdData = iniConfig.getConfig('floatAd');

            var floatAd = new (QYJSUtil.floatAdvertisment)(floatAdData.adUrl, floatAdData.adImage, floatAdData.adBgColor, floatAdContainer)
            var floatAdObj = new (QYChat.extendPanel.floatAdvertisment)(floatAd, statistic, iniConfig);
            if (floatAdData.adImage) {
                floatAdObj.display()
                statistic.floatAdStatisticDisplay()
            }

        }

        /***************-------  评价  -----******************/

        if (iniConfig.getConfig('wMode') == 'big') {
            window.onbeforeunload = function () {

                widget.closeAllWidget();
                if (messageInterface.checkAssess(true)) {
                    if (QYJSUtil.browsers.mozilla) {
                        alert(languageTemplate.languageInterpret('您还没有评价，如果您需要对客服进行评价请在一会弹出的提醒框选择"留在页面"。'));
                    }
                    return languageTemplate.languageInterpret('您还没有评价，如果您需要对客服进行评价请选择"留在此页面上"。')
                }
            };
        }

        /***************-------  im  -----******************/

        if (iniConfig.getConfig('wMode') == 'big') {
            var imBox = $('#imBox');
            var imSelector = new (QYJSUtil.ImselectCreator)($('#imSelector'), iniConfig);
            var im = new (QYChat.chatToolBar.im)(imBox, imSelector, iniConfig, languageTemplate);
            widget.addWidget('im', im, true);
        }
        /***************-------  遮罩  -----******************/

        if (iniConfig.getConfig('wMode') == 'big') {
            var toolMask = $('#toolMask');
            toolMask.css('opacity', 0.5);
            widget.addWidget('toolMask', toolMask);
        }

        var inputPanelMask = $('#inputPanelMask');
        inputPanelMask.css('opacity', 0.3);
        widget.addWidget('inputPanelMask', inputPanelMask);

        var inputPanelToolMask = $('#inputPanelToolMask');
        inputPanelToolMask.css('opacity', 0.5);
        var inputPaneleditorMask = $('#inputPaneleditorMask');
        inputPaneleditorMask.css('opacity', 0.5);

        var inputPanelMaskObj = new (QYChat.inputPanelMask)(layOutSetter, widget);

        /***************-------  ccVersion  -----******************/

        if (iniConfig.getConfig('wMode') == 'big') {
            $('#ccVersion').html(iniConfig.getConfig('version'));
        }

        /***************-------  文本编辑  -----******************/

        //初始化文本编辑器
        var editorObj = new ( QYJSUtil.RichText)(languageTemplate, iniConfig, widget);
        editorObj.run('chatMessageInputPanel');
        layOutSetter.addObj('editor', editorObj);

        var editorBody = editorObj.getEditorBody();
        var editorWindow = editorObj.getEditorWindow();

        //初始化文本输入框
        var chatMessageInputPanelObj = new (QYChat.chatMessageInputPanel)(editorObj);

        /***************-------  消息显示框  -----******************/

        //初始化消息显示框
        var chatMessageAreaUtil = new (QYJSUtil.chatMessageArea)($('#chatMessageTitle'), $('#chatMessageArea'), languageTemplate, iniConfig);

        var chatMessageAreaObj = new (QYChat.chatMessageArea)(chatMessageAreaUtil);

        /***************-------  配置文件  -----******************/

        tellSWFReadyId = setInterval(this.tellSWFReady, 200)

        /***************-------  样式编辑器控制  -----******************/

        //初始化样式编辑面板
        var messageStyleSettingPanelObj = $('#messageStyleSettingPanel');

        //初始化样式编辑面板控按钮
        var fontButton = $('#fontButton')

        var fontObj = new (QYChat.chatToolBar.font)(fontButton, messageStyleSettingPanelObj, layOutSetter);
        widget.addWidget('font', fontObj);

        /***************-------  列表生成器  -----******************/

        //初始化列表生成器
        var SelectCreator = new (QYJSUtil.SelectCreator)();

        /***************-------  字体选择  -----******************/

        //初始化文字字体选择
        var fontFamilty = $('#fontFamilty');

        var listValue = iniConfig.getConfig('fonts');

        SelectCreator.run(fontFamilty, listValue, listValue);

        var fontFamiltyObj = new (QYChat.chatToolBar.messageStyleSettingPanel.fontFamilyCormbox)(chatMessageInputPanelObj);

        /***************-------  字体大小选择  -----******************/

        //初始化文字大小选择
        var fontSize = $('#fontSize');

        var listValue = iniConfig.getConfig('fontSizes');

        SelectCreator.run(fontSize, listValue, listValue);
        var fontSizeObj = new ( QYChat.chatToolBar.messageStyleSettingPanel.fontSizeCormbox)(chatMessageInputPanelObj);

        /***************-------  字体颜色选择  -----******************/

        //初始化颜色选择器
        var colorPickerObj = $('#colorPickerObj');

        var colorPicker = new (QYJSUtil.ColorPicker)('colorPickerObj', languageTemplate, iniConfig);
        colorPicker.run();
        if (iniConfig.getConfig('wMode') == 'big') {
            colorPicker.setLeft(65);
        } else if (iniConfig.getConfig('wMode') == 'mini') {
            colorPicker.setLeft(0);
        }

        colorPicker.setTop(-46);

        widget.addWidget('colorPicker', colorPicker, true)

        var colorObj = colorPicker.getColorObj();

        //初始化颜色选择器控制按钮
        var colorPickerButton = $('#colorPickerButton');

        var colorPickerObj = new (QYChat.chatToolBar.messageStyleSettingPanel.colorPicker)(colorPickerButton, chatMessageInputPanelObj, widget)

        /***************-------  文字样式  -----******************/

        //初始化文字样式选择按钮
        var fontTypeB = $('#fontTypeB');

        var fontTypeI = $('#fontTypeI');

        var fontTypeU = $('#fontTypeU');

        var colorShapeObj = new (QYChat.chatToolBar.messageStyleSettingPanel.colorShapeCormbox)(chatMessageInputPanelObj);

        /***************-------  表情  -----******************/

        if (iniConfig.getConfig('wMode') == 'big') {

            //初始化表情控制按钮
            var emotionButton = $('#emotionButton');

            //初始化表情选择器
            var emotionSelectorBox = $('#emotionSelector');
            var emotionSelector = new (QYJSUtil.CreateEmotion)(emotionSelectorBox, iniConfig);
            emotionSelector.run();

            var emotionSelectorObj = emotionSelector.getEmotionObj();

            var emotionObj = new (QYChat.chatToolBar.emotion)(emotionButton, emotionSelector, chatMessageInputPanelObj);
            widget.addWidget('emotion', emotionObj, true);
        }

        /***************-------  截屏  -----******************/

        //if (QYJSUtil.browsers.isie) {
            //初始化截屏按钮
            var catchScreenButton = $('#catchScreenButton');
            catchScreenButton.show();
            var catchScreenObj = new (QYChat.chatToolBar.catchScreen)(messageInterface);
        //}


        if (iniConfig.getConfig('wMode') == 'big') {

            /***************-------  结束对话  -----******************/

            //初始化评价按钮
            var closeWindowButton = $('#closeWindow');

            /***************-------  评价  -----******************/

            //初始化评价按钮
            var assessButton = $('#assessButton');
            var assessBox = $('#assessBox');
            var assessBoxObj = new (QYJSUtil.assess)('assessBox', iniConfig, languageTemplate);
            assessBoxObj.create();
            var assess = new (QYChat.chatToolBar.assess)(messageInterface, assessBoxObj, assessButton, iniConfig);
            widget.addWidget('assess', assess, true);
            /***************-------  CCRobot  -----******************/

            var CCRobotButton = $('#CCRobotButton');

            //热点问题面板
            var hotlistPanel = $('#hotList');

            //非热点问题面板
            var cardFilePanel = $('#cardFile');

            var cardFilePanelItem = hotlistPanel.find('a');

            var CCRobot = new (QYChat.chatToolBar.CCRobot)(hotlistPanel, cardFilePanel, messageInterface, CCRobotButton, iniConfig, languageTemplate, widget);
            var clerkChangeObj = new (QYChat.clerkChange)(widget, chat);

            /***************-------  对话框  -----******************/

            var robotDialog = new (QYChat.dialog)(CCRobot, languageTemplate, layOutSetter, iniConfig, messageInterface);
            var clerkChangeDialog = new (QYChat.dialog)(clerkChangeObj, languageTemplate, layOutSetter, iniConfig, messageInterface);

            /***************-------  公司面板  -----******************/

            //初始化公司Logo
            var clerkLogo = $('#clerkLogo');

            //初始化公司简介
            var clerkDesc = $('#clerkDesc');

            //初始化公司联系方式
            var clerkContact = $('#clerkContact');

            //初始化公司广告
            var clerkAd = $('#clerkAd');

            //初始化公司面板切换按钮
            var clerkCardPenelSwitchButton = $('#clerkCardPenelSwitchButton');

            var clerkCardObj = new (QYJSUtil.clerkCard)(clerkLogo, clerkDesc, clerkContact, clerkAd, clerkCardPenelSwitchButton, iniConfig);

            var clerkCardObj2 = new (QYChat.extendPanel.clerkCard)(clerkCardObj);

            /***************-------  文件传输面板  -----******************/

            //初始化文件传输面板
            var fileUploadPanel = $('#fileUpload');

            //初始化公司面板切换按钮
            var fileUploadPanelSwitchButton = $('#fileUploadPanelSwitchButton');

            //初始化文件项目生成器
            var fileUploadItemCreator = new (QYJSUtil.UploadFileItemCreator)(messageInterface, languageTemplate);

            //管理面板与切换按钮
            var fileUploadPanelManagerObj = new (QYJSUtil.UploadFilePanel )(fileUploadPanel, fileUploadPanelSwitchButton, fileUploadItemCreator);

            //管理文件传输项目与面板切换
            var fileUploadPanelObj = new (QYChat.extendPanel.fileUploadPanel)(fileUploadPanelManagerObj);

            //文件项目生成器 添加 面板管理接口
            fileUploadItemCreator.fileUploadPanel(fileUploadPanelObj);

            /***************-------  扩展面板控制器  -----******************/

            //初始化扩展面板控制器
            var extendPanelControllerObj = new (QYChat.extendPanel.extendPanelController)();
            extendPanelControllerObj.addPanel('fileUploadPanel', fileUploadPanelObj);
            extendPanelControllerObj.addPanel('clerkCard', clerkCardObj2);

            /***************-------  消息状态  -----******************/

            //初始化消息状态
            var statusBarPanel = $('#statusBarPanel');

            var chatStatusBarObj = new ( QYChat.chatStatusBar)(statusBarPanel);
        }
        /***************-------  消息发送  -----******************/

        //初始化消息发送按钮
        var sentButton = $('#sentButton');

        var messageSentObj = new ( QYChat.messageSent)(sentButton, chatMessageInputPanelObj, messageInterface, chatMessageAreaObj, iniConfig);

        /***************-------   消息键盘发送方式 -----******************/

        if (iniConfig.getConfig('wMode') == 'big') {
            //消息键盘发送方式
            var chooseSentEvent = $('#chooseSentEvent');

            //发送事件选择器
            var sentEventSelector = $('#sentEventSelector');
            widget.addWidget('sentEventSelector', sentEventSelector, true);

            var CtrlEnterEvent = $('#CtrlEnterEvent');

            var enterEvent = $('#enterEvent');

            var chooseSentEventObj = new (QYChat.chooseSentEvent)(messageSentObj, iniConfig, languageTemplate, widget);
        }

        /***************-------   文件上传 -----******************/

        if (iniConfig.getConfig('wMode') == 'big') {

            var max_file_size = iniConfig.getConfig('max_file_size')
            uploader = new plupload.Uploader({
                runtimes: 'flash',
                browse_button: 'pickfiles',
                container: 'pickfilesContainer',
                max_file_size: max_file_size[0],
                url: iniConfig.getConfig('fileUploadFileAddr'),
                resize: {width: 1024, height: 768, quality: 90},
                flash_swf_url: iniConfig.getConfig('fileUploadFlashAddr'),
                filters: (iniConfig.getConfig('fileAllowUpload'))
            });

            uploader.bind('FilesAdded', function (up, files) {
                widget.closePopWidget();

                for (var i in files) {

                    var icon = '';
                    if (/\.(rar|zip|7z)$/i.test(files[i].name)) {
                        icon = iniConfig.getConfig('fileTypePath') + 'rar.jpg'
                    } else if (/\.(jpg|gif|bmp|png)$/i.test(files[i].name)) {
                        icon = iniConfig.getConfig('fileTypePath') + 'pic.jpg'
                    } else {
                        icon = iniConfig.getConfig('fileTypePath') + 'txt.jpg'
                    }

                    var max_file_size = iniConfig.getConfig('max_file_size')

                    if (files[i].size < parseInt(max_file_size[1])) {
                        messageInterface.addFileUpload({'icon': icon, 'totalSize': files[i].size, 'name': files[i].name, 'id': files[i].id});
                    } else {
                        //文件超出限制
                        chat.saveUploadFileAddress('error', files[i].name + languageTemplate.languageInterpret('文件超过上传规定大小（上传大小限定在' + max_file_size[0] + '以内）'))
                    }
                }

                var theUploadId = setInterval(function () {
                    extendPanelControllerObj.showPanel('fileUploadPanel');
                    uploader.start();
                    clearInterval(theUploadId);
                }, 500);
            });

            uploader.bind('UploadProgress', function (up, file) {
                messageInterface.updateFileUploadStatus('<fileUpload><data id="' + file.id + '" uploadSize="' + file.loaded + '" percent ="' + file.percent + '"  size = "' + file.size + '"/></fileUpload>');
            });

            uploader.bind('FileUploaded', function (uploader, file, response) {

                var response = eval('(' + response.response + ')')
                if (response.status == 1) {
                    chat.saveUploadFileAddress(response.address, file.name);
                    messageInterface.updateFileUploadSuccess(file.id);
                } else {
                    //上传失败
                    var theErrorid = setInterval(function () {
                        fileUploadPanelObj.fileUploadError(file.id, response.code, theErrorid);
                    }, 150)
                    chat.saveUploadFileAddress('error', file.name + ' ' + languageTemplate.languageInterpret('上传失败,错误提示') + ':' + response.code);
                }
            });

            uploader.bind('init', function (uploader) {
                QYJSUtil.setDocumentTitle(decodeURIComponent(iniConfig.getConfig('originPageTitle')));
            })

            uploader.init();
        }

        /***************-------  添加向外通信对象  -----******************/

        if (iniConfig.getConfig('wMode') == 'big') {
            //添加公司信息对象
            messageInterface.addRevivier('clerkCard', clerkCardObj2);

            //文件上传面板
            messageInterface.addRevivier('fileUploadPanel', fileUploadPanelObj);

            //添加聊天状态面板
            messageInterface.addRevivier('chatStatusBar', chatStatusBarObj);

            //添加CC机器人
            messageInterface.addRevivier('CCRobot', CCRobot)

            messageInterface.addRevivier('uploader', uploader);

            //评价
            messageInterface.addRevivier('assess', assess);

            //im
            messageInterface.addRevivier('im', im);
        }

        //添加聊天消息显示区
        messageInterface.addRevivier('chatMessageArea', chatMessageAreaObj);

        messageInterface.addRevivier('chatMessageInputPanel', chatMessageInputPanelObj);

        messageInterface.addRevivier('layOutSetter', layOutSetter);

        ////////////////////////////------------------------对象事件监听----------------------------/ ///////////////////////////

        //设置字体
        fontFamilty.bind('change', function () {
            fontFamiltyObj.onChange(this.value);
        })

        //字体大小
        fontSize.bind('change', function () {
            fontSizeObj.onChange(this.value);
        })

        //字体颜色
        for (var i = 0; i < colorObj.length; i++) {
            $(colorObj[i]).bind('click', function () {
                colorPickerObj.onColorPicke($(this).css('backgroundColor'));
            })
        }

        //颜色选择器控制按钮
        colorPickerButton.bind('click', function (event) {
            widget.closePopWidgetExcept('colorPicker', false);
            colorPickerObj.onButtonClick();
            event.stopPropagation();
        })

        //字体样式
        fontTypeB.bind('click', function () {
            colorShapeObj.setFontTypeWeight(this);
        })

        fontTypeI.bind('click', function () {
            colorShapeObj.setFontItalic(this);
        })

        fontTypeU.bind('click', function () {
            colorShapeObj.setFontUnderline(this);
        })

        //监听表情事件
        if (iniConfig.getConfig('wMode') == 'big') {
            emotionButton.bind('click', function (event) {
                widget.closePopWidgetExcept('emotion', false);
                widget.closeWidget('font');
                emotionObj.onclick();
                event.stopPropagation();
            })

            emotionSelectorObj.each(function () {
                $(this).bind('click', function () {
                    emotionObj.onPicke($(this).attr('name'))
                })
            });
        }

        //监听文字按钮事件
        fontButton.bind('click', function () {
            fontObj.onclick();
        })

        //if (QYJSUtil.browsers.isie) {
            //截屏按钮事件
            catchScreenButton.bind('click', function () {
                if (!iniConfig.getConfig('chooseClerk') && iniConfig.getConfig('wMode') == 'mini') {
                    var allocateClerkId = setInterval(function () {
                        if (chat.getReadyStatus()) {
                            chat.allocateClerk();
                            iniConfig.setConfig('chooseClerk', true);
                            clearInterval(allocateClerkId);
                        }
                    }, 500)
                }
                catchScreenObj.onCatchScreen();
            })
        //}
        //提交评价事件
        if (iniConfig.getConfig('wMode') == 'big') {
            assessBox.bind('subAssess', function () {
                assess.submit();
            })

            assessBox.bind('closeAssess', function () {
                assess.hide();
            })

            assessButton.bind('click', function (event) {
                widget.closePopWidgetExcept('assess', false);
                widget.closeWidget('font');
                assess.onClick();
                event.stopPropagation();
            });
        }

        //结束对话
        if (iniConfig.getConfig('wMode') == 'big') {
            //ChatWindow_closeFullWindow
            closeWindowButton.bind('click', function (event) {
                widget.closePopWidgetExcept('assess', true);
                widget.closeWidget('font');
                var showAssess = false;
                if (messageInterface.checkAssess(false)) {
                    showAssess = true;
                }
                chat.manualCloseChat()
                if (showAssess) {
                    assess.show()
                }
                iniConfig.setConfig('manualCloseChat', true)
                event.stopPropagation();
            });
        }

        //cc机器人事件
        if (iniConfig.getConfig('wMode') == 'big') {
            CCRobotButton.bind('click', function () {
                layOutSetter.entireLayerOut();
                var CCRobotStatus = iniConfig.getConfig('CCRobotStatus');
                if (CCRobotStatus == 0) {
                    robotDialog.creatDialog('您的操作将使当前对话关闭，您确定要咨询机器人客服吗？');
                } else {
                    robotDialog.creatDialog('您的操作将使当前对话关闭，您确定要咨询人工客服吗？');
                }
            })
        }

        //im事件
        if (iniConfig.getConfig('wMode') == 'big') {
            imBox.bind('click', function (event) {
                widget.closePopWidgetExcept('im', false);
                widget.closeWidget('font');
                im.onClick();
                event.stopPropagation();
            });

            $('#imSelector').children().children('li').each(function (i, n) {
                $(n).click(function () {
                    window.open($(this).children('span.value').attr('links'));
                }).mouseover(function () {
                    $(this).addClass('hover');
                    $(this).children('span').addClass('hover');
                }).mouseout(function () {
                    $(this).removeClass('hover');
                    $(this).children('span').removeClass('hover');
                });
            });
        }

        //消息发送事件
        sentButton.bind('click', function () {
            messageSentObj.onSubmit(editorObj);
            if (!QYJSUtil.browsers.mozilla) {
                editorObj.addCursor();
            }
        })

        $(editorBody).keydown(function (event) {
            widget.closePopWidget();
            if (event.keyCode == '13' && event.ctrlKey) {
                messageSentObj.keyCtrlEnterEvent(editorObj);
            } else if (!event.ctrlKey && event.keyCode == 13) {
                if (iniConfig.getConfig('sentSelectedEvent') == 'Enter') {
                    event.preventDefault();
                } else {
                    if (document.all) {
                        chatMessageInputPanelObj.insertNewline();
                        event.preventDefault();
                    } else if ((/chrome\/([\d.]+)/).test(navigator.userAgent.toLowerCase())) {
                        chatMessageInputPanelObj.insertNewline();
                    }
                }
                messageSentObj.keyEnterEvent(editorObj)
            }

            if (!iniConfig.getConfig('chooseClerk') && iniConfig.getConfig('wMode') == 'mini' && chat.getReadyStatus()) {
                chat.allocateClerk();
                iniConfig.setConfig('chooseClerk', true);
            }

            if (document.all) {
                editorObj.updateRange();
            }
        });

        $(editorBody).bind('click', function () {
            widget.closePopWidget();
            if (document.all) {
                editorObj.updateRange();
            } else {
                editorObj.addCursor();
            }
            if (QYJSUtil.browsers.mozilla) {
                editorObj.resizeBody();
            }
        })

        $(editorWindow).bind('click', function () {
            widget.closePopWidget();
            if (document.all) {
                editorObj.updateRange();
            }
            if (QYJSUtil.browsers.mozilla) {
                editorObj.resizeBody();
            }
        })

        $(document).bind('click', function () {
            widget.closePopWidget();
        });

        if (iniConfig.getConfig('wMode') == 'big') {
            //扩展面板切换事件
            fileUploadPanelSwitchButton.bind('click', function () {
                extendPanelControllerObj.switchPanel();
            })
            clerkCardPenelSwitchButton.bind('click', function () {
                extendPanelControllerObj.switchPanel();
            })

            //消息发送方式
            chooseSentEvent.bind('click', function (event) {
                widget.closePopWidget();
                chooseSentEventObj.onClick();
                event.stopPropagation();
            })

            CtrlEnterEvent.bind('click', function () {
                chooseSentEventObj.onSelect('Ctrl+Enter');
                widget.closePopWidget();
                return false;
            })
            enterEvent.bind('click', function () {
                chooseSentEventObj.onSelect('Enter');
                widget.closePopWidget();
                return false;
            })

            //热点问题列表
            cardFilePanelItem.live('click', function () {
                CCRobot.pickHotQuestion(this.innerHTML);
            })

            //选择客服
            $('span.pickClerkItem').find('a.pickClerk').live('click', function () {
                if (iniConfig.getConfig('clerkName') != $(this).attr('nickName') && iniConfig.getConfig('CCRobotStatus') != 1) {
                    clerkChangeDialog.creatDialog('您正与' + iniConfig.getConfig('clerkName') + '对话中，确定要换' + $(this).attr('nickName') + '客服接待吗？', $(this).attr('no'));
                }
            })

            //浮动广告
            if (iniConfig.getConfig('adverWorkStatus') == 0) {

                floatAdContainer.find('#floatAdvertisment').bind('click', function () {
                    floatAdObj.click();
                });

                floatAdContainer.find('#floatAdvertismentCloseButton').bind('click', function () {
                    floatAdObj.close();
                });
            }
        }
    }

    ////////////////////////////------------------------初始化配置----------------------------/ ///////////////////////////

    //初始化SWF对象
    this.getCCWebCtrl = function () {
        if (navigator.appName.indexOf("Microsoft") != -1) {
            return window["chatwindow"];
        }
        else {
            return document["chatwindow"];
        }
    }

    var decodeEmotionXML = function (data) {

        var emotionMapData = QYJSUtil.QYmessagcoder.decodeEmotionXML(data);

        iniConfig.setConfig('emotionMap', emotionMapData[0])
        iniConfig.setConfig('emotionMapTip', emotionMapData[1])
        iniConfig.setConfig('emotionReady', true);

        chat.setChatReady();
    }

    var decodeLanguageXML = function (data) {

        var languageTemplateData = QYJSUtil.QYmessagcoder.decodeLanguageXML(data);
        languageTemplate.addLanguageTemplateObj(languageTemplateData);
        iniConfig.setConfig('languageReady', true);
        chat.setChatReady();


        /**翻译上传程序包含的文字 ***/
        var fileAllowUpload = iniConfig.getConfig('fileAllowUpload');
        var fileAllowUploadTmp = [];

        for (var i = 0; i < fileAllowUpload.length; i++) {
            var one = {};

            var title = fileAllowUpload[i].title;

            var titleInterpretWord = title.replace(/(.*?)\(.*?\)/, '$1');
            var titleFileType = title.replace(/.*?(\(.*?\))/, '$1');
            var titleAfterInterpret = languageTemplate.languageInterpret(titleInterpretWord);

            one.title = titleAfterInterpret + titleFileType;
            one.extensions = fileAllowUpload[i].extensions;
            fileAllowUploadTmp.push(one);
        }

        iniConfig.setConfig('fileAllowUpload', fileAllowUploadTmp);
        setTimeout(chat.languageInterpretHTML, 500);

    }

    this.languageInterpretHTML = function () {
        QYJSUtil.languageInterpretHTML(languageTemplate);
    }

    ////////////////////////////------------------------状态查询----------------------------/ ///////////////////////////

    //上传chat初始化状态
    this.tellSWFReady = function () {

        try {

            if (document.all && CCWebCtrl && !CCWebCtrl.ChatWindow_onViewLoadComplete) {
                try {
                    __flash__addCallback(CCWebCtrl, 'ChatWindow_onViewLoadComplete')
                } catch (e) {
                    //messageInterface.addRawChatMessage('出错了！错误位置：上传chat初始化状态，错误代码：' + e);
                }
            }

            if (CCWebCtrl && CCWebCtrl.ChatWindow_onViewLoadComplete) {
                if (CCWebCtrl.ChatWindow_onViewLoadComplete()) {
                    clearInterval(tellSWFReadyId)
                }
            }
        } catch (e) {
            if (iniConfig.getConfig('debug')) {
                messageInterface.addRawChatMessage('出错了！错误位置：上传chat初始化状态，错误代码：' + e);
            }
        }

    }

    //查询chat初始化状态
    this.setChatReady = function () {
        if (chat.getReadyStatus()) {
            messageInterface.setChatReady();
            chat.uploadFileAddress();

        }
    }

    this.getReadyStatus = function () {

        var emotionReady = iniConfig.getConfig('emotionReady');
        var SWFReady = iniConfig.getConfig('SWFReady');
        var languageReady = iniConfig.getConfig('languageReady');
        var closeEditor = iniConfig.getConfig('closeEditor');

        if (emotionReady && SWFReady && languageReady && !closeEditor) {
            return true;
        } else {
            return false;
        }
    }

    ////////////////////////////------------------------上行接口----------------------------/ ///////////////////////////

    //windos focus
    this.windowFocusIn = function () {
        try {

            if (document.all && CCWebCtrl && !CCWebCtrl.setFocus) {
                try {
                    __flash__addCallback(CCWebCtrl, 'setFocus')
                } catch (e) {
                    //messageInterface.addRawChatMessage('出错了！错误位置：上传chat初始化状态，错误代码：' + e);
                }
            }

            if (CCWebCtrl.setFocus) {
                CCWebCtrl.setFocus();
            }
        } catch (e) {
            if (iniConfig.getConfig('debug')) {
                messageInterface.addRawChatMessage('出错了！错误位置：窗口焦点，错误代码：' + e);
            }
        }
    }

    //CC机器人
    this.onCCRobotClick = function (value) {
        try {

            if (document.all && CCWebCtrl && !CCWebCtrl.RobotController_onChangeRoboTalking) {
                try {
                    __flash__addCallback(CCWebCtrl, 'RobotController_onChangeRoboTalking')
                } catch (e) {
                    //messageInterface.addRawChatMessage('出错了！错误位置：上传chat初始化状态，错误代码：' + e);
                }
            }

            if (CCWebCtrl.RobotController_onChangeRoboTalking) {
                CCWebCtrl.RobotController_onChangeRoboTalking(value);
            }
        } catch (e) {
            if (iniConfig.getConfig('debug')) {
                messageInterface.addRawChatMessage('出错了！错误位置：选择CC机器人错误，错误代码：' + e);
            }
        }
    }

    //选择热点问题
    this.pickHotQuestion = function (value) {

        try {

            if (document.all && CCWebCtrl && !CCWebCtrl.RobotController_onSelectedHotHotbotQuestion) {
                try {
                    __flash__addCallback(CCWebCtrl, 'RobotController_onSelectedHotHotbotQuestion')
                } catch (e) {
                    //messageInterface.addRawChatMessage('出错了！错误位置：上传chat初始化状态，错误代码：' + e);
                }
            }

            if (CCWebCtrl.RobotController_onSelectedHotHotbotQuestion) {
                CCWebCtrl.RobotController_onSelectedHotHotbotQuestion(value);
            }
        } catch (e) {
            if (iniConfig.getConfig('debug')) {
                messageInterface.addRawChatMessage('出错了！错误位置：选择热点问题上传错误，错误代码：' + e);
            }
        }
    }

    //上传消息
    this.uploadQYChatMessage = function () {
        var message = messageInterface.getQYChatMessage();

        for (var i = 0; i < message.length; i++) {
            try {

                if (document.all && CCWebCtrl && !CCWebCtrl.TextMessageController_onSendMessage) {
                    try {
                        __flash__addCallback(CCWebCtrl, 'TextMessageController_onSendMessage')
                    } catch (e) {
                        //messageInterface.addRawChatMessage('出错了！错误位置：上传chat初始化状态，错误代码：' + e);
                    }
                }
                //console.log(message[i])
                if (CCWebCtrl.TextMessageController_onSendMessage) {
                    CCWebCtrl.TextMessageController_onSendMessage(message[i]);
                }
            } catch (e) {
                if (iniConfig.getConfig('debug')) {
                    messageInterface.addRawChatMessage('出错了！错误位置：上传消息错误，错误代码：' + e);
                }
            }
            iniConfig.setConfig('hasConsulted', true)
        }
    }

    //正在输入
    this.inPutting = function (message) {

        if (message == inPuttingMessageCache) {
            return
        }

        inPuttingMessageCache = message

        var QYMessageInPuttingMessage = QYJSUtil.QYmessagcoder.decodeQYMessageXML(QYJSUtil.QYmessagcoder.encodeQYMessageXML({}, message, iniConfig),
            iniConfig, languageTemplate, messageInterface, 'inputting')

        try {

            if (document.all && CCWebCtrl && !CCWebCtrl.TextMessageController_onInputContent) {
                try {
                    __flash__addCallback(CCWebCtrl, 'TextMessageController_onInputContent')
                } catch (e) {
                    //messageInterface.addRawChatMessage('出错了！错误位置：上传chat初始化状态，错误代码：' + e);
                }
            }

            if (CCWebCtrl.TextMessageController_onInputContent) {
                CCWebCtrl.TextMessageController_onInputContent(QYMessageInPuttingMessage);
            }
        } catch (e) {
            if (iniConfig.getConfig('debug')) {
                messageInterface.addRawChatMessage('出错了！错误位置：上传正在输入错误，错误代码：' + e);
            }
        }
    }

    //分配客服
    this.allocateClerk = function () {
        try {

            if (document.all && CCWebCtrl && !CCWebCtrl.MiniChatWindowController_allocateClerk) {
                try {
                    __flash__addCallback(CCWebCtrl, 'MiniChatWindowController_allocateClerk')
                } catch (e) {
                    //messageInterface.addRawChatMessage('出错了！错误位置：上传chat初始化状态，错误代码：' + e);
                }
            }


            if (CCWebCtrl.MiniChatWindowController_allocateClerk) {
                CCWebCtrl.MiniChatWindowController_allocateClerk()
            }
        } catch (e) {
            var debug = iniConfig.getConfig('debug');
            if (debug) {
                alert('分配客服错误' + e);
            }
        }
    }

    //保存上传文件地址
    this.saveUploadFileAddress = function (path, fileName) {
        uploadFileCache[path] = fileName;
        if (chat.getReadyStatus()) {
            chat.uploadFileAddress();
        }
    }

    //文件上传地址
    this.uploadFileAddress = function () {
        try {

            if (document.all && CCWebCtrl && !CCWebCtrl.FileTransmitController_onUploadComplete) {
                try {
                    __flash__addCallback(CCWebCtrl, 'FileTransmitController_onUploadComplete')
                } catch (e) {
                    //messageInterface.addRawChatMessage('出错了！错误位置：上传chat初始化状态，错误代码：' + e);
                }
            }

            for (var path in uploadFileCache) {
                if (path && CCWebCtrl.FileTransmitController_onUploadComplete) {
                    CCWebCtrl.FileTransmitController_onUploadComplete(path, uploadFileCache[path]);
                }
            }
            uploadFileCache = {};
        } catch (e) {
            if (iniConfig.getConfig('debug')) {
                messageInterface.addRawChatMessage('出错了！错误位置：文件上传地址错误，错误代码：' + e);
            }
        }
    }

    //  更换客服
    this.changeClerk = function (id) {
        try {

            if (document.all && CCWebCtrl && !CCWebCtrl.TranferClerkController_onSelectClerk) {
                try {
                    __flash__addCallback(CCWebCtrl, 'TranferClerkController_onSelectClerk')
                } catch (e) {
                    //messageInterface.addRawChatMessage('出错了！错误位置：上传chat初始化状态，错误代码：' + e);
                }
            }


            if (CCWebCtrl.TranferClerkController_onSelectClerk) {
                CCWebCtrl.TranferClerkController_onSelectClerk(id);
            }
        } catch (e) {
            if (iniConfig.getConfig('debug')) {
                messageInterface.addRawChatMessage('出错了！错误位置：上传更换客服错误，错误代码：' + e);
            }
        }
    }

    //  申请更换客服
    this.reAllocationClerk = function () {
        try {

            if (document.all && CCWebCtrl && !CCWebCtrl.TranferClerkController_reAllocationClerk) {
                try {
                    __flash__addCallback(CCWebCtrl, 'TranferClerkController_reAllocationClerk')
                } catch (e) {
                    //messageInterface.addRawChatMessage('出错了！错误位置：申请更换客服，错误代码：' + e);
                }
            }


            if (CCWebCtrl.TranferClerkController_reAllocationClerk) {
                CCWebCtrl.TranferClerkController_reAllocationClerk();
            }
        } catch (e) {
            if (iniConfig.getConfig('debug')) {
                messageInterface.addRawChatMessage('出错了！错误位置：申请更换客服错误，错误代码：' + e);
            }
        }
    }

    //  申请队列更换客服
    this.reChangeQueueClerk = function () {
        try {

            if (document.all && CCWebCtrl && !CCWebCtrl.TaskQueueController_reAllocationClerk) {
                try {
                    __flash__addCallback(CCWebCtrl, 'TaskQueueController_reAllocationClerk')
                } catch (e) {
                    //messageInterface.addRawChatMessage('出错了！错误位置：申请队列更换客服，错误代码：' + e);
                }
            }


            if (CCWebCtrl.TaskQueueController_reAllocationClerk) {
                CCWebCtrl.TaskQueueController_reAllocationClerk();
            }
        } catch (e) {
            if (iniConfig.getConfig('debug')) {
                messageInterface.addRawChatMessage('出错了！错误位置：申请队列更换客服，错误代码：' + e);
            }
        }
    }
    // 点击更新窗口
    this.onReloadWindow = function () {
        try {

            if (document.all && CCWebCtrl && !CCWebCtrl.ChatWindow_closeOldWindow) {
                try {
                    __flash__addCallback(CCWebCtrl, 'ChatWindow_closeOldWindow')
                } catch (e) {
                    //messageInterface.addRawChatMessage('出错了！错误位置：上传chat初始化状态，错误代码：' + e);
                }
            }


            if (CCWebCtrl.ChatWindow_closeOldWindow) {
                CCWebCtrl.ChatWindow_closeOldWindow();
            }
        } catch (e) {
            if (iniConfig.getConfig('debug')) {
                messageInterface.addRawChatMessage('出错了！错误位置：点击更新窗口，错误代码：' + e);
            }
        }
    }

    // 更新至留言窗口
    this.changeToLeavingMessageWindow = function () {

        try {

            if (document.all && CCWebCtrl && !CCWebCtrl.ChatWindow_changeToLeavingMessageWindow) {
                try {
                    __flash__addCallback(CCWebCtrl, 'ChatWindow_changeToLeavingMessageWindow')
                } catch (e) {
                    //messageInterface.addRawChatMessage('出错了！错误位置：点击留言窗口，错误代码：' + e);
                }
            }

            if (CCWebCtrl.ChatWindow_changeToLeavingMessageWindow) {
                CCWebCtrl.ChatWindow_changeToLeavingMessageWindow();
            }
        } catch (e) {
            if (iniConfig.getConfig('debug')) {
                messageInterface.addRawChatMessage('出错了！错误位置：点击留言窗口，错误代码：' + e);
            }
        }
    }

    //手动关闭聊天
    this.manualCloseChat = function () {
        try {

            if (document.all && CCWebCtrl && !CCWebCtrl.ChatWindow_closeFullWindow) {
                try {
                    __flash__addCallback(CCWebCtrl, 'ChatWindow_closeFullWindow')
                } catch (e) {
                    //messageInterface.addRawChatMessage('出错了！错误位置：手动关闭聊天，错误代码：' + e);
                }
            }

            if (CCWebCtrl.ChatWindow_closeFullWindow) {
                CCWebCtrl.ChatWindow_closeFullWindow();
            }
        } catch (e) {
            if (iniConfig.getConfig('debug')) {
                messageInterface.addRawChatMessage('出错了！错误位置：手动关闭聊天，错误代码：' + e);
            }
        }
    }


    ////////////////////////////------------------------web下行接口----------------------------/ ///////////////////////////

    //截屏事件
    this.onCatchScreen = function () {
        QYJSUtil.iniCatchScreenPlus(iniConfig, languageTemplate);
    }

    this.downloadFile = function (file) {
        QYJSUtil.downLoadFile(file);
    }

    //swf通知初始化完成
    this.tellSWFCompleted = function () {
        iniConfig.setConfig('SWFReady', true)
        chat.setChatReady();

        //广告
        if (iniConfig.getConfig('wMode') == 'big') {
            messageInterface.setAdertisment(iniConfig.getConfig('adverPicurl'), iniConfig.getConfig('adverLink'));
        }
    }

    //截屏
    this.uploadCatchScreen = function (path) {
        if (path) {
            messageInterface.saveQYChatMessage(QYJSUtil.getCatchScreenPic(path, iniConfig));
        }
    }

    //跳转至留言
    this.redirectToLeavingMessage = function () {
        if (parseInt(iniConfig.getConfig('leavingMessageSetting')) == 1 || iniConfig.getConfig('chatInQueue')) {
            var currentUrl = window.location.href;
            var queryPosition = currentUrl.indexOf('?');
            var pagePath = currentUrl.substring(0, queryPosition);
            var queryString = currentUrl.substring(queryPosition + 1);
            if (iniConfig.getConfig('wMode') == 'mini') {
                queryString += '&windmod=1';
            }
            iniConfig.setConfig('isClosingOldWindow', true);
            window.location.href = pagePath + 'leavingMessage.php?' + queryString;
        } else {
            this.changeToLeavingMessageWindow();
        }

    }

    //刷新
    this.windowRefresh = function () {
        iniConfig.setConfig('showMessageBox', false)
        window.location.reload()
    }

    ////////////////////////////------------------------swf下行接口----------------------------/ ///////////////////////////

    // 消息保存
    this.saveHitstory = function () {

        widget.closePopWidget();
        var message = messageInterface.saveChatHistory();
        var doc = QYJSUtil.buidWebPage(languageTemplate.languageInterpret('聊天记录'), message);

        return doc;
    }

    //关闭编辑器
    this.closeChat = function () {
        this.closeEditor()
        messageInterface.checkAssess(true);
    }

    //打开编辑器
    this.openChat = function () {
        this.openEditor()
    }

    //关闭编辑器
    this.openEditor = function () {
        widget.closeAllWidget();
        messageInterface.openEditor();
    }

    this.closeEditor = function () {
        widget.closeAllWidget();
        messageInterface.closeEditor();
    }

    //遮罩
    this.closeMessageBox = function () {
        iniConfig.setConfig('showMessageBox', false)
        if (!iniConfig.getConfig('debug') || iniConfig.getConfig('wMode') == 'big') {
            var chatMask = widget.getWidget('chatMask');
            chatMask.hide()
        }
    }

    //遮罩
    this.showMessageBox = function (message, type) {
        iniConfig.setConfig('showMessageBox', true)
        if (!iniConfig.getConfig('debug') || iniConfig.getConfig('wMode') == 'big') {
            var chatMask = widget.getWidget('chatMask');
            chatMask.show(message, type);
        }
    }

    //切换至cc机器人
    this.changeRoboTalking = function (value) {
        messageInterface.changeRoboTalking(value);
    }

    //离线模板
    this.setLeaveMessageTemplate = function (string) {
        if (!iniConfig.getConfig('closeEditor')) {
            messageInterface.setLeaveMessageTemplate(string);
        }
    }

    //翻译
    this.languageInterpret = function (string, type) {

        if (type == 1) {
            string = unescape(string)
            return  escape(languageTemplate.languageInterpret(string));
        } else {
            return  languageTemplate.languageInterpret(string)
        }
    }

    /***************-------   消息区接口 -----******************/

        //文件下载
    this.addFile = function (fileName, fileUrl, title, downloadNotice) {

        messageInterface.addRawChatMessage(title, 1);
        var download = QYJSUtil.buildDownLoadFileToHTML(fileName, languageTemplate.languageInterpret('给你发送了文件') + ':' + fileName, fileUrl, title, downloadNotice, iniConfig);

        /**messageInterface.downloadFile(download);**/
        messageInterface.addNoReformRawChatMessage(download);
    }

    //添加聊天信息
    this.addQYChatMessage = function (message, type) {
        try {
            iniConfig.setConfig('hasConsulted', true);
            messageInterface.addQYChatMessage(message);
        } catch (e) {
            if (iniConfig.getConfig('debug')) {
                messageInterface.addRawChatMessage('出错了！错误位置：添加聊天信息，错误代码：' + e);
            }
        }

        if (iniConfig.getConfig('debug')) {
            message = message.replace(/>/gi, '&gt;');
            message = message.replace(/</gi, '&lt;');
            messageInterface.addNoReformRawChatMessage('<font color="red">' + 'addQYChatMessage=' + message + '</font>' + '<br/>');
        }
    }

    //添加无格式消息
    this.addRawChatMessage = function (message, type) {

        if (parseInt(type) == 4) {
            messageInterface.addNoReformRawChatMessage(message)
        } else {
            messageInterface.addRawChatMessage(message, type);
        }
    }

    //聊天title
    this.setMessageTitle = function (title) {
        messageInterface.setMessageTitle(title);
    }

    this.addRobotWelcomeWords = function (img, text) {

        var message = QYJSUtil.buildRobotWelcomeWords(img, text);
        messageInterface.addNoReformRawChatMessage(message);
    }

    this.addClerk = function (clerkId, nickname, status) {
        messageInterface.addClerk({ 'clerkId': clerkId, 'nickname': nickname, 'status': status });
    }

    /***************-------   其他接口 -----******************/

        //设置访问ID
    this.setVisitorId = function (id) {
        iniConfig.setConfig('visitorId', parseInt(id))
    }

    //设置客服ID
    this.setClerkId = function (id) {
        iniConfig.setConfig('clerkId', parseInt(id))
    }

    //更换其他咨询
    this.showOtherConsulting = function () {
        if (iniConfig.getConfig('language') == 'zh-cn') {
            messageInterface.addNoReformRawChatMessage('当前客服已离线，您可以选择<a onclick="javascript:chat.reAllocationClerk()">咨询其他客服</a>或<a onclick="javascript:chat.redirectToLeavingMessage(); return false;">给我们留言</a>');
        } else if (iniConfig.getConfig('language') == 'zh-tw') {
            messageInterface.addNoReformRawChatMessage('  當前客服已離線，您可以選擇<a onclick="javascript:chat.reAllocationClerk()">諮詢其他客服</a>或<a onclick="javascript:chat.redirectToLeavingMessage();return false;">給我們留言</a>');
        } else if (iniConfig.getConfig('language') == 'en' || iniConfig.getConfig('language') == 'russian') {
            messageInterface.addNoReformRawChatMessage('The service is already offline, please <a onclick="javascript:chat.reAllocationClerk()">chat with another services</a> or <a onclick="javascript:chat.redirectToLeavingMessage();return false;">leave a message</a>');
        }
    }

    //排队
    this.chatQueueConsulting = function (number) {

        iniConfig.setConfig('chatInQueue', true)
        var message2 = this.languageInterpret('您正排在队列第<span style="color:red;font-weight: bold">' + number + '</span>位，请耐心等待...')
        var title = this.languageInterpret('对不起,线路繁忙，请耐心等待...')
        //打开留言窗口
        if (iniConfig.getConfig('language') == 'zh-cn') {
            var message = '如果您不想队列继续等待，可以选择<a style="cursor:pointer;color:#0066cc" onclick="javascript:chat.redirectToLeavingMessage(); return false;">给我们留言</a>或<a  style="cursor:pointer;color:#0066cc"  onclick="javascript:chat.reChangeQueueClerk ()">咨询其他客服</a>'
        } else if (iniConfig.getConfig('language') == 'zh-tw') {
            var message = '如果您不想隊列繼續等待，可以選擇<a style="cursor:pointer;color:#0066cc" onclick="javascript:chat.redirectToLeavingMessage();return false;">给我们留言</a>或<a style="cursor:pointer;color:#0066cc"  onclick="javascript:chat.reChangeQueueClerk ()">諮詢其他客服</a>';
        } else if (iniConfig.getConfig('language') == 'en' || iniConfig.getConfig('language') == 'russian') {
            var message = 'If you do prefer not to wait, please <a style="cursor:pointer;color:#0066cc" onclick="javascript:chat.redirectToLeavingMessage();return false;">leave a message</a> or <a style="cursor:pointer;color:#0066cc"  onclick="javascript:chat.reChangeQueueClerk ()">chat with another services</a>';
        }

        if (iniConfig.getConfig('wMode') == 'big') {
            var robot = parseInt(iniConfig.getConfig('robotState')) == 1 ? '<span  onclick="javascript:chat.openRobot();return false;" style="cursor:pointer;font-weight: bold; text-align: center;color:#fff;height:28px;' +
                ' background: #1480b8; padding-top:5px; width: 120px;display: block;margin-left: 250px;margin-top:20px ">' + this.languageInterpret('咨询机器人客服') + '</span>' : ''
            this.showMessageBox('<span style="color:#0066cc">' + title + '</span>' + '<br/>' + message2 + '<br/>' + message + '<br/>' + robot, 'queue');
        } else {
            messageInterface.addNoReformFixedMessage(message2 + '<br/>' + message, 'queue');
        }
    }
    this.chatQueueConsulting2 = function (number) {

        iniConfig.setConfig('chatInQueue', true)
        var message2 = this.languageInterpret('您正排在队列第<span style="color:red;font-weight: bold">' + number + '</span>位，请耐心等待...')
        var title = this.languageInterpret('对不起,线路繁忙，请耐心等待...')
        //打开留言窗口
        if (iniConfig.getConfig('language') == 'zh-cn') {
            var message = '如果您不想队列继续等待，可以选择<a style="cursor:pointer;color:#0066cc" onclick="javascript:chat.redirectToLeavingMessage(); return false;">给我们留言</a>';
        } else if (iniConfig.getConfig('language') == 'zh-tw') {
            var message = '  如果您不想隊列繼續等待，可以選擇<a style="cursor:pointer;color:#0066cc"  onclick="javascript:chat.redirectToLeavingMessage();return false;">给我们留言</a>';
        } else if (iniConfig.getConfig('language') == 'en' || iniConfig.getConfig('language') == 'russian') {
            var message = 'If you do prefer not to wait, please <a style="cursor:pointer;color:#0066cc"   onclick="javascript:chat.redirectToLeavingMessage();return false;">leave a message</a> ';
        }

        if (iniConfig.getConfig('wMode') == 'big') {
            var robot = parseInt(iniConfig.getConfig('robotState')) == 1 ? '<span  onclick="javascript:chat.openRobot();return false;" style="cursor:pointer;font-weight: bold; text-align: center;color:#fff;height:28px;' +
                ' background: #1480b8; padding-top:5px; width: 120px;display: block;margin-left: 250px;margin-top:20px ">' + this.languageInterpret('咨询机器人客服') + '</span>' : ''
            this.showMessageBox('<span style="color:#0066cc">' + title + '</span>' + '<br/>' + message2 + '<br/>' + message + '<br/>' + robot, 'queue');
        } else {
            messageInterface.addNoReformFixedMessage(message2 + '<br/>' + message, 'queue');
        }
    }

    this.openRobot = function () {
        var url = 'index.php?websiteid=' + iniConfig.getConfig('websiteId') + '&clienturl=' + iniConfig.getConfig('clientUrl') + '&robot=1&originPageTitle=' + encodeURIComponent(window.document.title);
        var minWidth = 660;
        var minHeight = 570;

        window.open(url + '&winmode=0', '_blank', "toolbar=no,scrollbars=yes,menubar=no,status=no,resizable=yes,location=no,width=" + minWidth + ",height=" + minHeight + ",top=100,left=200");

    }

    this.openLeavingMessageWindow = function () {
        var clienturl = iniConfig.getConfig('clientUrl')
        var websiteid = iniConfig.getConfig('websiteId')
        var originPageTitle = iniConfig.getConfig('originPageTitle')
        var visitorId = iniConfig.getConfig('visitorId')

        var url = 'leavingMessage.php?clienturl=' + encodeURIComponent(clienturl) + '&websiteid=' + websiteid + '&visitorid=' + visitorId + '&originPageTitle=' + originPageTitle;

        window.open(url, '_self', "toolbar=no,scrollbars=yes,menubar=no,status=no,resizable=yes,location=no,top=100,left=200");
    }

    //聊天状态
    this.setStatus = function (message) {
        messageInterface.setStatus(message);
    }

    //切换客服
    this.clerkInfoChange = function () {
        messageInterface.clerkInfoChange();
    }

    //设置LOGO
    this.setLogo = function (img, redirectUrl) {
        var webSite = iniConfig.getConfig('webSite');
        messageInterface.setLogo(webSite + img, redirectUrl);
    }

    //设置工号
    this.setClerkJobNumber = function (info) {
        messageInterface.setClerkJobId(info);
    }

    //设置昵称
    this.setClerkNickName = function (info) {
        iniConfig.setConfig('clerkName', info)
        messageInterface.setClerkNickName(info);
    }

    //设置名称
    this.setClerkUserName = function (info) {
        messageInterface.setClerkName(info);
    }

    //设置邮箱
    this.setClerkEmail = function (info) {
        messageInterface.setClerkEmail(info);
    }

    //设置电话
    this.setClerkTelephoneNumber = function (info) {
        messageInterface.setClerkTelphone(info);
    }

    //设置QQ
    this.setClerkQQ = function (info) {
        messageInterface.setClerkQQ(info);
    }

    //设置阿里旺旺
    this.setClerkALIWangWang = function (info) {
        messageInterface.setClerkALIWangWang(info);
    }

    //设置MSN
    this.setClerkMSN = function (info) {
        messageInterface.setClerkMSN(info);
    }

    //设置skype
    this.setClerkSkype = function (info) {
        messageInterface.setClerkSkype(info);
    }

    //设置旺旺
    this.setClerkWangWang = function (info) {
        messageInterface.setClerkWangWang(info);
    }

    //设置简介
    this.setDes = function (desc) {
        messageInterface.setDes(desc);
    }

    //添加热点问题
    this.addHotQuestion = function (arr) {
        messageInterface.addHotQuestion(arr);
    }

    // html热点问题链接
    this.buildHotQuestionSpeedLink = function (arr) {
        var links = '';
        for (var i = 0; i < arr.length; i++) {
            links += '<br/><a onclick="javascript:chat.pickHotQuestion(\'' + arr[i] + '\')">' + arr[i] + '</a>';
        }
        return links;
    }

    //隐藏机器人
    this.hideRobot = function () {
        messageInterface.hideRobotButton();
    }

    //显示机器人
    this.showRobot = function () {
        messageInterface.showRobotButton();
    }

    this.newMessageNotice = function () {
        messageInterface.setEditorFocus();
        if (iniConfig.getConfig('wMode') == 'big') {
            windowNotice.setNotice()
        }
    }

    //客服状态
    this.setChatWindowClerkStatus = function (type) {
        var clerkStatus = iniConfig.getConfig('clerkStatus')
        clerkStatus.push(parseInt(type))
        iniConfig.setConfig('clerkStatus', clerkStatus)

        var isChatWindow = false

        for (var i = 0; i < clerkStatus.length; ++i) {
            if (clerkStatus[i] != 0) {
                isChatWindow = true
            }
        }
        iniConfig.setConfig('isChatWindow', isChatWindow)
    }
    ////////////////////////////------------------------debug调试----------------------------/ ///////////////////////////

    this.__startDebug__ = function () {
        iniConfig.setConfig('debug', true);
        alert('__startDebug__');
    }

    this.__endDebug__ = function () {
        iniConfig.setConfig('debug', false);
        alert('__endDebug__');
    }

    ////////////////////////////------------------------运行----------------------------/ ///////////////////////////

    decodeEmotionXML(emotionXMLContent);

    if (iniConfig.getConfig('language') == 'zh-cn') {
        iniConfig.setConfig('languageReady', true);
    } else {
        decodeLanguageXML(languageXMLContent);
    }

    chat.run();

}



