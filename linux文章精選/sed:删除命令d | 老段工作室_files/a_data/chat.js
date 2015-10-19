var QYChat = {

    //消息显示区
    chatMessageArea: function (chatMessageArea) {

        //消息显示对象
        var chatMessageArea = chatMessageArea;

        //添加消息头
        this.setMessageTitle = function (title) {
            chatMessageArea.setMessageTitle(title);
        }

        this.addChatMessage = function (message) {
            chatMessageArea.addChatMessage(message);
        }

        //添加xml消息
        this.addQYChatMessage = function (message) {
            chatMessageArea.addQYChatMessage(message);
        }

        //添加格式消息
        this.addRawChatMessage = function (message, type) {
            chatMessageArea.addRawChatMessage(message, type);
        }

        /**
         //下载文件
         this.downloadFile = function (message) {
            chatMessageArea.downloadFile(message);
        }**/

            //无格式化消息
        this.addNoReformRawChatMessage = function (message) {
            chatMessageArea.addNoReformRawChatMessage(message);
        }

        //添加固定消息
        this.addFixedMessage = function (message, type) {
            chatMessageArea.addFixedMessage(message, type);
        }

        //无格式化固定消息
        this.addNoReformFixedMessage = function (message, type) {
            chatMessageArea.addNoReformFixedMessage(message, type);
        }

        this.addTimeTitle = function (title) {
            chatMessageArea.addTimeTitle(title);
        }

        //读取聊天消息
        this.getChatContent = function () {
            return chatMessageArea.getChatContent();
        }

        //添加客服列表
        this.addClerk = function (param) {
            chatMessageArea.addClerk(param);
        }
    },
    clerkChange: function (widget, chat) {

        var widget = widget;
        var chat = chat;

        this.dialogClick = function (value, no) {
            widget.closeAllWidget();
            if (parseInt(value) == 1) {
                chat.changeClerk(no);
            }
        }
    },
    //文本编辑工具栏
    chatToolBar: {
        //表情按钮
        emotion: function (emotionButtonObj, emotionSelectorObj, chatMessageInputPanelObj) {

            //按钮对象
            var emotionButton = emotionButtonObj;

            //表情选择器对象
            var emotionSelectorObj = emotionSelectorObj;

            //输入框对象
            var chatMessageInputPanelObj = chatMessageInputPanelObj;

            this.onclick = function () {
                emotionSelectorObj.toggle();
                this.changeBackground();
            }

            this.hide = function () {
                this.close();
            }

            this.close = function () {
                emotionSelectorObj.hide();
                this.changeBackground();
            }

            this.changeBackground = function () {
                if (/none/i.test(emotionSelectorObj.css('display'))) {
                    emotionButton.removeClass('emotionButtonChoose');
                    emotionButton.addClass('emotionButton');
                } else {
                    emotionButton.removeClass('emotionButton');
                    emotionButton.addClass('emotionButtonChoose');
                }
            }

            this.onPicke = function (value) {
                var img = emotionSelectorObj.getEmotionImg(value);

                //添加表情
                chatMessageInputPanelObj.insertEmotion(img);
            }
        },

        //文件上传
        fileUpload: function (messageInterface) {

            var messageInterface = messageInterface;

            this.onClick = function () {
                messageInterface.fileUpload();
            }
        },
        //截屏面板
        catchScreen: function (messageInterface) {

            var messageInterface = messageInterface;
            this.onCatchScreen = function () {
                messageInterface.onCatchScreen();
            }
        },

        //评价
        assess: function (messageInterface, assessBox, assessButton, iniConfig) {

            var messageInterface = messageInterface;
            var assessBox = assessBox;
            var assessButton = assessButton;
            var iniConfig = iniConfig;
            var uploading = false
            var uploadingStartTime = parseInt(Math.round(new Date().getTime() / 1000));

            this.onClick = function () {
                if (/none/i.test(assessBox.css('display'))) {
                    this.show();
                } else {
                    this.hide();
                }
            }

            this.hide = function () {
                assessBox.hide();
                assessButton.removeClass('assessButtonChoose').addClass('assessButton');
            };

            this.show = function () {
                assessBox.show();
                assessButton.removeClass('assessButton').addClass('assessButtonChoose');
            };

            this.submit = function () {
                var currentTime = parseInt(Math.round(new Date().getTime() / 1000));

                if (currentTime - uploadingStartTime >= 4) {
                    uploading = false;
                }

                var assess = assessBox.getAssess();

                if (assess.sameAssessError == 1) {
                    this.inputClearAndHide()
                    return
                }

                try {
                    if (iniConfig.getConfig('hasConsulted')) {
                        if (uploading == false) {
                            uploadingStartTime = parseInt(Math.round(new Date().getTime() / 1000));
                            uploading = true;
                            messageInterface.uploadAssess(assess);
                            this.inputClearAndHide()
                        }
                    } else {
                        messageInterface.addRawChatMessage(assess.noConsultedError);
                    }
                } catch (e) {
                    uploading = false;
                    this.inputClearAndHide()
                    messageInterface.addRawChatMessage('出错了！错误位置：评价窗口，错误代码：' + e);
                }
            }

            this.inputClearAndHide = function () {
                assessBox.hide();
                assessBox.clearInput();
            }

            this.saveLastAssessInfo = function (assessId, message) {
                uploading = false;
                assessBox.saveLastAssessInfo(assessId, message);
            }
        },

        //CC机器人
        CCRobot: function (hotListPanel, cardFilePanel, messageInterface, CCRobotButton, iniConfig, languageTemplate, widget) {

            //热点问题南极
            var hotListPanel = hotListPanel;

            //非热点问题面板
            var cardFilePanel = cardFilePanel;

            var messageInterface = messageInterface;

            var iniConfig = iniConfig;

            var widget = widget;

            var CCRobotButton = CCRobotButton;

            var languageTemplate = languageTemplate;

            this.dialogClick = function (value, params) {
                if (parseInt(value) == 1) {
                    this.onCCRobotClick();
                }
            }

            this.onCCRobotClick = function () {

                var status = iniConfig.getConfig('CCRobotStatus');

                status = status == 0 ? 1 : 0;
                if (status == 1) {
                    CCRobotButton.attr('alt', languageTemplate.languageInterpret('人工客服')).attr('title', languageTemplate.languageInterpret('人工客服'))
                    widget.showWidget('toolMask');
                    widget.closeWidget('font');
                    hotListPanel.show();
                    cardFilePanel.hide();
                    CCRobotButton.addClass('humanService').removeClass('CCRobot')
                }
                else {
                    CCRobotButton.attr('alt', languageTemplate.languageInterpret('机器人客服')).attr('title', languageTemplate.languageInterpret('机器人客服'))
                    hotListPanel.hide();
                    cardFilePanel.show();
                    widget.closeWidget('toolMask');
                    CCRobotButton.addClass('CCRobot').removeClass('humanService')
                }

                iniConfig.setConfig('CCRobotStatus', status)
                messageInterface.onCCRobotClick(status);
                messageInterface.setEntireLayerOut();

            }

            this.changeRoboTalking = function (value) {
                var status = value;
                if (value == 1) {
                    CCRobotButton.attr('alt', languageTemplate.languageInterpret('人工客服')).attr('title', languageTemplate.languageInterpret('人工客服'))
                    widget.showWidget('toolMask');
                    widget.closeWidget('font');
                    hotListPanel.show();
                    cardFilePanel.hide();
                    CCRobotButton.addClass('humanService').removeClass('CCRobot')
                }
                else {
                    CCRobotButton.attr('alt', languageTemplate.languageInterpret('机器人客服')).attr('title', languageTemplate.languageInterpret('机器人客服'))
                    hotListPanel.hide();
                    cardFilePanel.show();
                    widget.closeWidget('toolMask')
                    CCRobotButton.addClass('CCRobot').removeClass('humanService')
                }

                iniConfig.setConfig('CCRobotStatus', status)
            }

            this.addHotQuestion = function (arr) {
                var string = '';
                for (var i = 0; i < arr.length; i++) {
                    string += '<li><a href="#" class="hot">' + arr[i] + '</a></li> ';
                }

                hotListPanel.find('ul').append(string);
            }
            this.pickHotQuestion = function (value) {
                messageInterface.pickHotQuestion(value);
            }

            //隐藏 机器人 按钮
            this.hideRobotButton = function () {
                CCRobotButton.hide();
            }

            //显示 机器人 按钮
            this.showRobotButton = function () {
                CCRobotButton.show();
            }
        },
        im: function (container, selector, iniConfig, languageTemplate) {

            var container = container;
            var selector = selector;
            var iniConfig = iniConfig;
            var reset = true;
            var isSelectShow = false;
            var languageTemplate = languageTemplate;
            this.clerkInfoChange = function () {
                reset = true;
                selector.clerkInfoChange();
                this.hideIcon();
            }

            this.setImIcon = function (type, word) {
                if (reset) {
                    var word = languageTemplate.languageInterpret(word);
                    container.find('#im').css('background-image', 'url(' + iniConfig.getConfig('imgPath') + type + ')').attr('title', word).attr('alt', word);
                }
            }

            this.onClick = function () {
                if (isSelectShow) {
                    this.hide();
                    this.arrowDown();
                } else {
                    this.show();
                    this.arrowUp();
                }
            }

            this.arrowUp = function () {
                container.addClass('Choose')
            }

            this.arrowDown = function () {
                container.removeClass('Choose')
            }

            this.showIcon = function () {
                container.show();
            }

            this.hideIcon = function () {
                container.hide();
                this.hide();
            }

            this.show = function () {
                selector.show();
                isSelectShow = true;
                this.arrowUp();
            }

            this.hide = function () {
                isSelectShow = false
                selector.hide();
                this.arrowDown();
            }

            this.setClerkQQ = function (info) {
                selector.setClerkQQ(info);
                this.showIcon();
                this.hide();
                this.setImIcon('qq.gif', 'QQ咨询');
                reset = false;
            }

            this.setClerkMSN = function (info) {
            }

            this.setClerkWangWang = function (info) {
                selector.setClerkWangWang(info);
                this.showIcon();
                this.hide();
                this.setImIcon('ww.png', '旺旺咨询');
                reset = false;
            }

            this.setClerkALIWangWang = function (info) {
                selector.setClerkALIWangWang(info);
                this.showIcon();
                this.hide();
                this.setImIcon('ww.png', '旺旺咨询');
                reset = false;
            }

            this.setClerkSkype = function (info) {
                selector.setClerkSkype(info);
                this.showIcon();
                this.hide();
                this.setImIcon('skype.png', 'skype咨询');
                reset = false;
            }
        },
        //文本样式面板控制
        font: function (fontButton, messageStyleSettingPanelObj, layOutSetter) {

            var fontButton = fontButton;

            var messageStyleSettingPanelObj = messageStyleSettingPanelObj;

            var layOutSetter = layOutSetter;

            var font = this;

            var changeBackgroudColor = function () {

                if (/none/i.test(messageStyleSettingPanelObj.css('display'))) {
                    fontButton.addClass('iconFont').removeClass('iconFontChoose');
                } else {
                    fontButton.addClass('iconFontChoose').removeClass('iconFont');
                }
            }

            this.onclick = function () {
                messageStyleSettingPanelObj.toggle()
                layOutSetter.entireLayerOut();

                //改变按钮样式
                changeBackgroudColor();
            }

            this.hide = function () {
                messageStyleSettingPanelObj.hide();
                changeBackgroudColor();
                font.setLayout();
            }

            this.setLayout = function () {
                layOutSetter.entireLayerOut();
            }
        },
        //文本样式面板
        messageStyleSettingPanel: {
            //字体选择
            fontFamilyCormbox: function (chatMessageInputPanelObj) {

                //输入框对象
                var chatMessageInputPanel = chatMessageInputPanelObj;

                this.onChange = function (value) {
                    //设置字体
                    chatMessageInputPanel.setFontFamily(value);
                };
            },
            //字体大小选择
            fontSizeCormbox: function (chatMessageInputPanelObj) {

                //字体大小
                var chatMessageInputPanel = chatMessageInputPanelObj;

                this.onChange = function (value) {
                    //设置字体大小
                    chatMessageInputPanel.setFontSize(value);
                };
            },
            //颜色选择器按钮
            colorPicker: function (colorPickerButton, chatMessageInputPanelObj, widget) {

                var chatMessageInputPanelObj = chatMessageInputPanelObj;
                var colorPickerButton = colorPickerButton;
                var widget = widget;

                this.onButtonClick = function () {
                    //开关颜色选择器
                    widget.toggleWidget('colorPicker');
                    this.changeBackground();
                }

                this.onColorPicke = function (value) {

                    //开关颜色选择器
                    widget.toggleWidget('colorPicker');

                    //设置颜色
                    chatMessageInputPanelObj.setFontColor(value);
                }

                this.changeBackground = function () {
                    var colorPicker = widget.getWidget('colorPicker');
                    if (/none/i.test(colorPicker.css('display'))) {
                        colorPickerButton.addClass('colorPickerButton').removeClass('colorPickerButtonChoose');
                    } else {
                        colorPickerButton.addClass('colorPickerButtonChoose').removeClass('colorPickerButton');
                    }
                }

                this.close = function () {
                    widget.closeWidget('colorPicker');
                    this.changeBackground();
                }

                this.hide = function () {
                    this.close();
                }

            },
            colorShapeCormbox: function (chatMessageInputPanelObj) {

                var chatMessageInputPanel = chatMessageInputPanelObj;

                this.setFontTypeWeight = function (fontObj) {
                    var fontObj = $(fontObj);
                    var selected = (fontObj.attr('className')) ? '' : 'bold';
                    fontObj.attr('className', selected);

                    if (selected) {
                        fontObj.addClass('fontTypeBChoose').removeClass('fontTypeB');

                    } else {
                        fontObj.addClass('fontTypeB').removeClass('fontTypeBChoose');

                    }

                    chatMessageInputPanel.setFontWeight(selected);
                }
                this.setFontItalic = function (fontObj) {

                    var fontObj = $(fontObj);
                    var selected = (fontObj.attr('className')) ? '' : 'italic';
                    fontObj.attr('className', selected);

                    if (selected) {
                        fontObj.addClass('fontTypeIChoose').removeClass('fontTypeI');
                    } else {
                        fontObj.addClass('fontTypeI').removeClass('fontTypeIChoose');
                    }

                    chatMessageInputPanel.setFontItalic(selected);
                }
                this.setFontUnderline = function (fontObj) {

                    var fontObj = $(fontObj);
                    var selected = (fontObj.attr('className')) ? '' : 'underline';
                    fontObj.attr('className', selected);

                    if (selected) {
                        fontObj.addClass('fontTypeUChoose').removeClass('fontTypeU');

                    } else {
                        fontObj.addClass('fontTypeU').removeClass('fontTypeUChoose');
                    }

                    chatMessageInputPanel.setFontUnderline(selected);
                }
            }
        }
    },
    //文本输入框
    chatMessageInputPanel: function (editorObj) {

        //编辑器对象
        var editor = editorObj;

        this.closeEditor = function () {
            editor.closeEditor();
        }

        this.openEditor = function () {
            editor.openEditor();
        }

        //读取输入文本
        this.getMessage = function () {
            return editor.getMessage();
        }

        //读取格式化输入文本
        this.getMessageWithQYFormat = function () {
            return editor.getMessageWithQYFormat();
        }

        //读取原始输入文本
        this.getChatInputMessage = function () {
            return editor.getChatInputMessage();
        }

        //清除输入文本
        this.clearInput = function () {
            return editor.clearInput();
        }

        //设置字体
        this.setFontFamily = function (value) {
            editor.setFontFamily(value);
        }

        //设置字体大小
        this.setFontSize = function (value) {
            editor.setFontSize(value);
        }

        //设置字体颜色
        this.setFontColor = function (value) {
            editor.setFontColor(value);
        }

        //改变形状
        this.setFontWeight = function (value) {
            editor.setFontWeight(value);
        };

        this.setFontItalic = function (value) {
            editor.setFontItalic(value);
        };

        this.setFontUnderline = function (value) {
            editor.setFontUnderline(value);
        };

        //添加表情
        this.insertEmotion = function (value) {
            editor.insertEmotion(value);
        }

        this.setLeaveMessageTemplate = function (string) {
            editor.setLeaveMessageTemplate(string);
        }

        this.setEditorFocus = function () {
            editor.getFocus();
        }

        this.insertNewline = function () {
            editor.insertNewline();
        }

    },

    //消息发送按钮
    messageSent: function (buttonObj, objInput, objSent, chatMessageAreaObj, iniConfig) {

        //消息发送按钮对象
        var buttonObj = buttonObj;

        //输入对象
        var chatMessageInputPanelObj = objInput;

        //消息接口
        var messageInterface = objSent;

        //聊天消息显示区
        var chatMessageArea = chatMessageAreaObj

        //选择以那种键盘事件发送
        var iniConfig = iniConfig;

        this.getChatMessage = function () {
            return  chatMessageInputPanelObj.getMessage();
        }

        this.onSubmit = function (editor) {

            //读取聊天消息
            var rawChatMessage = chatMessageInputPanelObj.getChatInputMessage();

            //保存格式化输入消息/发送
            messageInterface.saveQYChatMessage(rawChatMessage);

            //清空输入消息
            chatMessageInputPanelObj.clearInput();

            editor.getFocus();
            return true;
        }

        this.keyEnterEvent = function (editor) {
            if (iniConfig.getConfig('sentSelectedEvent') == 'Enter') {
                this.onSubmit(editor);
            }
        }

        this.keyCtrlEnterEvent = function (editor) {
            if (iniConfig.getConfig('sentSelectedEvent') == 'Ctrl+Enter') {
                this.onSubmit(editor);
            }
        }
    },

    //右面板
    extendPanel: {
        floatAdvertisment: function (adContainer, statistic, iniConfig) {

            var statistic = statistic;
            var container = adContainer;
            var iniConfig = iniConfig;
            var floatAdData = iniConfig.getConfig('floatAd');
            var self = this

            this.display = function () {
                this.show()
                setTimeout(function () {
                    self.close()
                }, floatAdData.displayTime)
            }

            this.click = function () {
                statistic.floatAdvertisementClick();
                container.openWindow()
            }

            this.close = function () {
                this.hide();
            }

            this.hide = function () {
                container.hide();
            }

            this.show = function () {
                container.show();
            }

        },
        extendPanelController: function () {
            var panels = {};
            this.addPanel = function (item, obj) {
                panels[item] = obj;
            }

            this.showPanel = function (item) {
                for (var i in panels) {
                    if (i == item) {
                        panels[i].show();
                    } else {
                        panels[i].hide();
                    }
                }
            }

            this.switchPanel = function () {
                for (var i in panels) {
                    panels[i].switchPanel();
                }
            }
        },
        clerkCard: function (clerkCardObj) {

            //公司面板
            var clerkCard = clerkCardObj;

            this.setAdertisment = function (img, redirectUrl) {
                clerkCard.setAdertisment(img, redirectUrl);
            }

            //切换客服
            this.clerkInfoChange = function () {
                clerkCard.clerkInfoChange();
            }

            //设置setLogo
            this.setLogo = function (img, redirectUrl) {
                clerkCard.setLogo(img, redirectUrl);
            }

            //设置简介
            this.setDes = function (desc) {
                clerkCard.setDes(desc);
            }

            //设置工号
            this.setClerkJobId = function (info) {
                clerkCard.setClerkJobId(info);
            }

            //设置昵称
            this.setClerkNickName = function (info) {
                clerkCard.setClerkNickName(info);
            }

            //设置名称
            this.setClerkName = function (info) {
                clerkCard.setClerkName(info);
            }

            //设置邮箱
            this.setClerkEmail = function (info) {
                clerkCard.setClerkEmail(info);
            }

            //设置电话
            this.setClerkTelphone = function (info) {
                clerkCard.setClerkTelphone(info);
            }

            //设置QQ
            this.setClerkQQ = function (info) {
                clerkCard.setClerkQQ(info);
            }

            //设置阿里旺旺
            this.setClerkALIWangWang = function (info) {
                clerkCard.setClerkALIWangWang(info);
            }

            //设置MSN
            this.setClerkMSN = function (info) {
                clerkCard.setClerkMSN(info);
            }

            //设置skype
            this.setClerkSkype = function (info) {
                clerkCard.setClerkSkype(info);
            }

            //设置旺旺
            this.setClerkWangWang = function (info) {
                clerkCard.setClerkWangWang(info);
            }


            //切换面板
            this.switchPanel = function () {
                clerkCard.switchPanel();
            }

            this.show = function () {
                clerkCard.show();
            }

            this.hide = function () {
                clerkCard.hide();
            }
        },
        fileUploadPanel: function (fileUploadPanelObj) {

            //文件传输面板
            var fileUploadPanel = fileUploadPanelObj;

            //增加文件传输项
            this.addFileUpload = function (string) {
                fileUploadPanel.addFileUpload(string);
            }

            //更新上传进度
            this.updateFileUploadStatus = function (string) {
                fileUploadPanel.updateFileUploadStatus(string);
            }

            //上传成功
            this.updateFileUploadSuccess = function (id) {
                fileUploadPanel.updateFileUploadSuccess(id);
            }

            //上传失败
            this.fileUploadError = function (id, errorCode, errorId) {
                fileUploadPanel.fileUploadError(id, errorCode, errorId);
            }

            //删除上传文件
            this.deleteUpdateFileUpload = function (id) {
                fileUploadPanel.deleteUpdateFileUpload(id);
            }

            //切换面板
            this.switchPanel = function () {
                fileUploadPanel.switchPanel();
            }

            this.show = function () {
                fileUploadPanel.show();
            }

            this.hide = function () {
                fileUploadPanel.hide();
            }
        }
    },

    //聊天状态栏
    chatStatusBar: function (statusBarPanel) {

        var statusBarPanel = statusBarPanel;

        this.setStatus = function (message) {

            statusBarPanel.html(message);
        }
    },
    chooseSentEvent: function (/**sentEventSelectNotice,**/ messageSentObj, iniConfig, languageTemplate, widget) {


        //var sentEventSelectNotice = sentEventSelectNotice;

        var messageSentObj = messageSentObj;

        var iniConfig = iniConfig;

        var languageTemplate = languageTemplate;

        var widget = widget;

        this.onClick = function () {
            widget.toggleWidget('sentEventSelector');
        }

        this.onSelect = function (value) {

            //var sent_type_enter = languageTemplate.languageInterpret('按enter发送信息')
            //var sent_type_enter_with_ctrl = languageTemplate.languageInterpret('按ctrl+enter发送信息')
            //var newValue = value == 'Enter' ? sent_type_enter : sent_type_enter_with_ctrl;

            //sentEventSelectNotice.html(newValue);
            iniConfig.setConfig('sentSelectedEvent', value);
            this.close();
        }

        this.close = function () {
            widget.closeWidget('sentEventSelector');
        }
    },

    //消息接口
    messageInterface: function (chat, iniConfig) {

        //当前Chat顶层对象
        var chat = chat;

        var iniConfig = iniConfig;

        var receiver = {};

        //上传缓存
        var uploadMessageCache = [];

        //接受缓存        表情文件没有加载完成时使用
        var receiveMessageCache = [];

        var messageInterface = this;

        this.addRevivier = function (item, obj) {
            receiver[item] = obj;
        }

        //缓存评价
        this.uploadAssess = function (assess) {

            var url = iniConfig.getConfig('assessAddress');
            var data = {
                visitorid: iniConfig.getConfig('visitorId'),
                clerkid: iniConfig.getConfig('clerkId'),
                websiteid: iniConfig.getConfig('websiteId'),
                clienturl: iniConfig.getConfig('clientUrl')
            }

            data.star = assess.star;
            data.content = assess.content;
            data.assessId = assess.lastAssessId;

            $.post(url, data, function (data) {

                var data = eval('(' + data + ')');
                receiver['chatMessageArea'].addRawChatMessage(assess.successMessage, 2);
                receiver['assess'].saveLastAssessInfo(data.assessId, assess.content);
                iniConfig.setConfig('hasAssessed', true)
                messageInterface.setChatMessageAreaLayout();
                receiver['assess'].hide();
            })
        }

        //结束对话检查是否评价
        this.checkAssess = function () {
            if (iniConfig.getConfig('openAssess') == 1 &&
                iniConfig.getConfig('isChatWindow') == true &&
                iniConfig.getConfig('hasAssessed') == false &&
                iniConfig.getConfig('manualCloseChat') == false &&
                iniConfig.getConfig('hasConsulted') && iniConfig.getConfig('CCRobotStatus') == 0 && !iniConfig.getConfig('isClosingOldWindow')) {
                receiver['assess'].show();
                return true;
            } else {
                return false;
            }
        }

        //公司面板
        this.setAdertisment = function (img, redirectUrl) {
            receiver['clerkCard'].setAdertisment(img, redirectUrl);
            this.setEntireLayerOut();

            //ie6
            if (!-[1, ] && !window.XMLHttpRequest) {
                setTimeout(function () {
                    this.setEntireLayerOut();
                }, 1000);
            }
        }

        //切换客服
        this.clerkInfoChange = function () {
            receiver['clerkCard'].clerkInfoChange();
            if (iniConfig.getConfig('wMode') == 'big') {
                receiver['im'].clerkInfoChange();
            }
            this.setEntireLayerOut();
        }

        //设置logo
        this.setLogo = function (img, redirectUrl) {
            receiver['clerkCard'].setLogo(img, redirectUrl);
            this.setEntireLayerOut();
        }

        //设置昵称
        this.setClerkNickName = function (info) {
            receiver['clerkCard'].setClerkNickName(info);
            this.setEntireLayerOut();
        }

        //设置工号
        this.setClerkJobId = function (info) {
            receiver['clerkCard'].setClerkJobId(info);
        }

        //设置名称
        this.setClerkName = function (info) {
            receiver['clerkCard'].setClerkName(info);
            this.setEntireLayerOut();
        }

        //设置邮箱
        this.setClerkEmail = function (info) {
            receiver['clerkCard'].setClerkEmail(info);
            this.setEntireLayerOut();
        }

        //设置电话
        this.setClerkTelphone = function (info) {
            receiver['clerkCard'].setClerkTelphone(info);
            this.setEntireLayerOut();
        }

        //设置QQ
        this.setClerkQQ = function (info) {
            receiver['clerkCard'].setClerkQQ(info);
            if (iniConfig.getConfig('wMode') == 'big') {
                receiver['im'].setClerkQQ(info);
            }
            this.setEntireLayerOut();
        }

        //设置阿里旺旺
        this.setClerkALIWangWang = function (info) {
            receiver['clerkCard'].setClerkALIWangWang(info);
            if (iniConfig.getConfig('wMode') == 'big') {
                receiver['im'].setClerkALIWangWang(info);
            }
            this.setEntireLayerOut();
        }

        //设置MSN
        this.setClerkMSN = function (info) {
            receiver['clerkCard'].setClerkMSN(info);
            if (iniConfig.getConfig('wMode') == 'big') {
                receiver['im'].setClerkMSN(info);
            }
            this.setEntireLayerOut();
        }

        //设置旺旺
        this.setClerkWangWang = function (info) {
            receiver['clerkCard'].setClerkWangWang(info);
            if (iniConfig.getConfig('wMode') == 'big') {
                receiver['im'].setClerkWangWang(info);
            }
            this.setEntireLayerOut();
        }

        //设置skype
        this.setClerkSkype = function (info) {
            receiver['clerkCard'].setClerkSkype(info);
            if (iniConfig.getConfig('wMode') == 'big') {
                receiver['im'].setClerkSkype(info);
            }
            this.setEntireLayerOut();
        }

        this.setDes = function (desc) {
            receiver['clerkCard'].setDes(desc);
            this.setEntireLayerOut();
        }

        this.addTimeTitle = function (title) {
            receiver['chatMessageArea'].addTimeTitle(title);
            this.setChatMessageAreaLayout();
        }

        this.setLeaveMessageTemplate = function (string) {
            receiver['chatMessageInputPanel'].setLeaveMessageTemplate(string);
        }

        this.setEditorFocus = function () {
            receiver['chatMessageInputPanel'].setEditorFocus();
        }


        this.closeEditor = function () {
            receiver['chatMessageInputPanel'].closeEditor();
        }

        this.openEditor = function () {
            receiver['chatMessageInputPanel'].openEditor();
        }

        //添加聊天信息
        this.addQYChatMessage = function (message) {
            receiveMessageCache.push(message);
            if (chat.getReadyStatus()) {
                this.outPutReceiveMessageCache();
                this.setChatMessageAreaLayout();
            }
        }

        //添加无格式聊天信息
        this.addRawChatMessage = function (message, type) {
            var messageType = iniConfig.getConfig('messageType')
            var type = messageType[type] ? messageType[type] : '';

            receiver['chatMessageArea'].addRawChatMessage(message, type);
            this.setChatMessageAreaLayout();

        }

        //无格式化消息
        this.addNoReformRawChatMessage = function (message) {
            receiver['chatMessageArea'].addNoReformRawChatMessage(message);
            this.setChatMessageAreaLayout();
        }

        //添加固定消息
        this.addFixedMessage = function (message, type) {
            var messageType = iniConfig.getConfig('messageType')
            var type = messageType[type] ? messageType[type] : '';
            receiver['chatMessageArea'].addFixedMessage(message, type);
            this.setChatMessageAreaLayout();

        }


        //无格式化固定消息
        this.addNoReformFixedMessage = function (message, type) {
            var messageType = iniConfig.getConfig('messageType')
            var type = messageType[type] ? messageType[type] : '';
            receiver['chatMessageArea'].addNoReformFixedMessage(message, type);
            this.setChatMessageAreaLayout();

        }


        //添加聊天title
        this.setMessageTitle = function (title) {
            receiver['chatMessageArea'].setMessageTitle(title);
            this.setChatMessageAreaLayout();
        }

        //保存消息
        this.saveQYChatMessage = function (message) {
            uploadMessageCache.push(message);
            chat.uploadQYChatMessage();
        }

        //更新窗口大小
        this.setChatMessageAreaLayout = function () {
            receiver['layOutSetter'].chatMessageAreaLayerOut();
        }

        this.resizeChatMessageAreaImg = function () {
            receiver['layOutSetter'].resizeChatMessageAreaImg();
        }

        this.setEntireLayerOut = function () {
            receiver['layOutSetter'].entireLayerOut();
        }

        //上传消息
        this.getQYChatMessage = function () {
            if (chat.getReadyStatus()) {
                return  this.getPutUploadMessageCache();
            } else {
                return '';
            }
        }

        //已加载文件
        this.setChatReady = function () {

            //上传消息
            if (chat.getReadyStatus()) {
                if (uploadMessageCache.length > 0) {
                    chat.uploadQYChatMessage();
                }
                if (receiveMessageCache.length > 0) {
                    this.outPutReceiveMessageCache();
                    this.setChatMessageAreaLayout();
                }
            }
        }

        //输出回复缓存
        this.outPutReceiveMessageCache = function () {
            try {
                for (var i = 0; i < receiveMessageCache.length; i++) {
                    receiver['chatMessageArea'].addQYChatMessage(receiveMessageCache[i]);
                }
                receiveMessageCache = [];
            } catch (e) {
                receiver['chatMessageArea'].addQYChatMessage(chat.languageInterpret('出错了！错误位置：消息缓存，错误代码：' + e));
            }
        }

        //输出上传缓存
        this.getPutUploadMessageCache = function () {
            var newCache = [];

            try {
                for (var i = 0; i < uploadMessageCache.length; i++) {
                    var newMessage = QYJSUtil.QYmessagcoder.encodeQYMessageXML(uploadMessageCache[i][0], uploadMessageCache[i][1], iniConfig);
                    newCache.push(newMessage);
                }
                uploadMessageCache = [];

            } catch (e) {
                receiver['chatMessageArea'].addQYChatMessage(chat.languageInterpret('出错了！错误位置：消息生成，错误代码：' + e));
            }

            return   newCache;
        }

        //更新聊天状态
        this.setStatus = function (status) {
            receiver['chatStatusBar'].setStatus(status);
        }

        //文件上传
        this.addFileUpload = function (string) {
            receiver['fileUploadPanel'].addFileUpload(string);
        }

        //更新上传进度
        this.updateFileUploadStatus = function (string) {
            receiver['fileUploadPanel'].updateFileUploadStatus(string);
        }

        //上传成功
        this.updateFileUploadSuccess = function (id) {
            receiver['fileUploadPanel'].updateFileUploadSuccess(id);
        }

        //添加客服
        this.addClerk = function (param) {
            receiver['chatMessageArea'].addClerk(param);
            this.setChatMessageAreaLayout();
        }

        //取消上传
        this.cancelUploadFile = function (id) {
            var theRemoveFile = receiver['uploader'].getFile(id);
            receiver['uploader'].stop();
            receiver['uploader'].removeFile(theRemoveFile);
            receiver['uploader'].start();
        }

        //保存聊天记录
        this.saveChatHistory = function () {
            return  receiver['chatMessageArea'].getChatContent();
        }

        //截屏事件
        this.onCatchScreen = function () {
            chat.onCatchScreen();
        }

        //CC机器人
        this.onCCRobotClick = function (status) {
            chat.onCCRobotClick(status);
        }

        this.addHotQuestion = function (arr) {
            receiver['CCRobot'].addHotQuestion(arr);
        }

        this.hideRobotButton = function () {
            receiver['CCRobot'].hideRobotButton();
        }

        this.showRobotButton = function () {
            receiver['CCRobot'].showRobotButton();
        }

        this.changeRoboTalking = function (value) {
            receiver['CCRobot'].changeRoboTalking(value);
        }

        this.pickHotQuestion = function (value) {
            chat.pickHotQuestion(value);
        }

        //重新刷新窗口
        this.onReloadWindow = function () {
            chat.onReloadWindow();
        }

    }, config: {

        languageTemplate: function () {
            var languageTemplate = {};

            this.addLanguageTemplateObj = function (obj) {
                languageTemplate = obj;
            }

            this.languageInterpret = function (string) {
                if (!string) {
                    return '';
                }
                var newLanguage;
                for (var i in  languageTemplate) {
                    var re = new RegExp(i)
                    if (re.test(string)) {
                        re = new RegExp(i)
                        newLanguage = string.replace(re, languageTemplate[i])
                        return   newLanguage;
                    }
                }
                return string;
            }
            this.getLanguage = function (item, defaultValue) {
                return  languagePackage[item] ? languagePackage[item] : defaultValue;
            }
        },
        iniConfig: function () {
            var config = {};
            this.addConfig = function (item, value) {
                if (!config[item]) {
                    config[item] = value;
                }
            }

            this.addConfigObj = function (obj) {
                for (var i in obj) {
                    if (!config[i]) {
                        config[i] = obj[i];
                    }
                }
            }

            this.getConfig = function (item) {
                return  config[item]
            }

            this.setConfig = function (item, value) {
                config[item] = value;
            }
        }
    },
    chatMask: function (layerOut, languageTemplate, iniConfig, messageInterface) {
        var mask;
        var content;

        var languageTemplate = languageTemplate;
        var layerOut = layerOut;

        var iniConfig = iniConfig;

        var cheight = 1;
        var cwidth = 320;
        var chatMask = this;
        var messageInterface;
        var created = false
        var contentBgColor = '#1480b8';
        var contentColor = '#fff'
        var contentBorder = 'none'
        var contentPadding = '20px 5px'
        var aColor = '#0066cc'
        var contentClick = true
        var contentAlignment = 'center'
        var chatMask = this
        var reLayout = true

        layerOut.addObj('chatMask', this);

        this.createMask = function (contentValue, type) {

            mask = $('<div></div>');
            content = $('<div></div>');
            created = true;

            var height = document.documentElement.clientHeight;
            var width = document.documentElement.clientWidth;

            var bHeight = $(document).height();
            var bWidth = $(document).width();

            var mHeight = height >= bHeight ? height : bHeight;
            var mWidth = width >= bWidth ? width : bWidth;

            var contentP;

            mask.height(mHeight).width(mWidth).css({'background': '#a9ccde', 'position': 'absolute', "z-index": '2147483647', 'margin': '0px', 'padding': '0px', 'display': 'none'})

            content.height(cheight).width(cwidth).css({'background': contentBgColor, 'position': 'absolute', "z-index": '2147483646', 'top': top, 'left': left, 'margin': '0px', 'padding': contentPadding, 'verticalAlign': 'top', 'visibility': 'hidden'})
            var top = Math.floor((height - cheight - parseInt(content.css('padding-top')) - parseInt(content.css('padding-bottom'))) / 2)
            var left = Math.floor((width - cwidth - parseInt(content.css('padding-left')) - parseInt(content.css('padding-right'))) / 2);
            content.css({'border': contentBorder, 'top': top, 'left': left})

            var top = Math.floor((height - cheight - parseInt(content.css('padding-top')) - parseInt(content.css('padding-bottom'))) / 2)
            var left = Math.floor((width - cwidth - parseInt(content.css('padding-left')) - parseInt(content.css('padding-right'))) / 2);
            content.html('<p name="maskContent" style="line-height: 25px; color:' + contentColor + '; text-align: ' + contentAlignment + ';">' + languageTemplate.languageInterpret(contentValue) + '</p>');
            content.find('a').css({'color': aColor, 'text-decoration': 'underline'});
            mask.prepend(content);

            if (contentClick) {
                content.click(function () {
                    messageInterface.onReloadWindow();
                    iniConfig.setConfig('isClosingOldWindow', true);
                    setTimeout(function () {
                        window.location.reload();
                    }, 1000)
                }).css({'cursor': 'pointer'})
            }

            $('body').prepend(mask);

            contentP = content.find('p');

            var interverId;
            interverId = setInterval(function () {
                if (contentP.height() > 0) {
                    clearInterval(interverId);
                    content.height(contentP.height()).css({'visibility': 'visible', 'top': parseInt(content.css('top')) - 15 + 'px'});
                    cheight = contentP.height();
                }
            }, 300)
        }

        this.show = function (contentValue, type) {

            if (created) {
                mask.show()
            }

            if (type == 'queue') {
                cwidth = 350
                contentColor = '#333333'
                contentBgColor = 'white'
                contentBorder = '1px solid #3c96c4'
                contentPadding = '20px 40px'
                contentClick = false
                contentAlignment = 'left'
            }

            if (created) {
                content.find('p[name="maskContent"]').html(contentValue);
                this.setLayout()
                return true;
            }

            try {
                contentValue = contentValue ? contentValue : languageTemplate.languageInterpret('按F5，重新载入！');
                chatMask.createMask(contentValue, type);
                mask.show();
                this.setLayout();
            } catch (e) {
                alert(languageTemplate.languageInterpret('按F5，重新载入！'))
            }
        }

        this.hide = function () {
            if (mask) {
                try {
                    mask.hide();
                } catch (e) {
                    return true;
                }
            }
        }

        this.setLayout = function () {
            if (mask) {

                try {
                    var contentP;
                    contentP = content.find('p');

                    if (contentP.height() > 0) {
                        content.height(contentP.height()).css({'visibility': 'visible', 'top': parseInt(content.css('top')) - 15 + 'px'});
                        if (parseInt(contentP.height()) > 0) {
                            cheight = parseInt(contentP.height())
                        }
                    }

                } catch (e) {

                }

                var height = document.documentElement.clientHeight;
                var width = document.documentElement.clientWidth;

                var bHeight = $(document).height();
                var bWidth = $(document).width();

                var mHeight = height >= bHeight ? height : bHeight;
                var mWidth = width >= bWidth ? width : bWidth;

                mask.height(mHeight).width(mWidth)

                var top = Math.floor((height - cheight - parseInt(content.css('padding-top')) - parseInt(content.css('padding-bottom'))) / 2)
                var left = Math.floor((width - cwidth - parseInt(content.css('padding-left')) - parseInt(content.css('padding-right'))) / 2);

                content.css({'top': top, 'left': left});


                if (reLayout) {
                    setTimeout(function () {
                        chatMask.setLayout();
                        reLayout = false
                    }, 300)
                }

            }
        }
    },
    inputPanelMask: function (layOutSetter, widget) {

        var widget = widget;
        var layOutSetter = layOutSetter;

        layOutSetter.addObj('inputPanelMask', this);

        this.show = function () {
            widget.closeExcept('inputPanelMask', true);
            this.setLayout();
        }
        this.setLayout = function () {
            var width = $('#chatMessageInputPanel').width();
            var mask = widget.getWidget('inputPanelMask');
            mask.width(width);
        }
    },
    dialog: function (obj, languageTemplate, layerOut, iniConfig, messageInterface) {
        var dialog;
        var obj;
        var languageTemplate = languageTemplate;
        var thisDialog = this;

        var iniConfig = iniConfig
        var messageInterface = messageInterface;

        var layerOut = layerOut;
        layerOut.addObj('dialog', this);

        var title;
        var notice;
        var yButton;
        var nButton;
        var isShow;
        this.creatDialog = function (message, params) {

            if (isShow) {
                return;
            }

            dialog = $('<div class="dialog"></div>');
            title = $('<p class="dialogTitle"><span style="padding-left: 6px">' + languageTemplate.languageInterpret('提示') + '</span></p>');
            var content = $('<div class="dialogContentBox"></div>');

            notice = $('<div class="dialogContent"><p style="padding:0px 6px;">' + languageTemplate.languageInterpret(message) + '</p></div>')
            yButton = $('<input type="button" value="' + languageTemplate.languageInterpret('确定') + '">')
            nButton = $('<input type="button" value="' + languageTemplate.languageInterpret('取消') + '">')

            dialog.width(340).css({'overflow': 'hidden', 'background': '#ffffff', 'position': 'absolute', "z-index": '2147483641', 'margin': '0px', 'padding': '0px', 'display': 'block', 'border': 'solid 1px #777777'})
            title.height(23).width('100%').css({ 'background': '#cce0f3', 'font-weight': 'bold', 'padding-top': '6px', 'padding-left': '0px'});
            content.width('100%').css({ 'padding-top': '4px', 'padding-left': '0px', 'padding-bottom': '10px'});
            notice.width('100%').css({'padding-top': '10px', 'paddingBottom': '10px'});
            yButton.height(23).width(80).css({'padding': '0', 'margin-left': '78px'})
            nButton.height(23).width(80).css({'padding': '0', 'margin-left': '15px'})

            content.append(notice).append(yButton).append(nButton);
            dialog.append(title).append(content);

            $('body').prepend(dialog);

            this.setLayout();

            yButton.bind('click', function () {
                thisDialog.buttonClick(1, params);
            });

            nButton.bind('click', function () {
                thisDialog.buttonClick(0, params);
            });
            isShow = true;
        }

        this.buttonClick = function (value, params) {
            try {
                obj.dialogClick(value, params);
                dialog.remove();
            } catch (e) {
                setTimeout(function () {
                    dialog.hide();
                }, 1500)

                if (iniConfig && iniConfig.getConfig('debug')) {
                    messageInterface.addRawChatMessage(languageTemplate.languageInterpret('出错了！错误位置：添加聊天信息，错误代码：' + e))
                }
            }
            isShow = false;
        }

        this.show = function () {
            dialog.show();
            isShow = true;
        }

        this.setLayout = function () {

            if (!dialog) {
                return true;
            }

            var height = document.documentElement.clientHeight;
            var width = document.documentElement.clientWidth;

            var cheight = $(dialog).height();
            var cwidth = $(dialog).width();
            var top = Math.floor((height - cheight) / 2);
            var left = Math.floor((width - cwidth) / 2);

            dialog.height(cheight).width(cwidth).css({'top': top, 'left': left});

        }
    },
    layerOut: function (messageInterface, iniConfig) {

        var layOutObj = {};
        var messageInterface = messageInterface;
        var iniConfig = iniConfig;

        this.addObj = function (item, obj) {
            layOutObj[item] = obj;
        }

        //窗口布局
        this.entireLayerOut = function () {
            for (var x in layOutObj) {
                try {
                    if (iniConfig && iniConfig.getConfig('showMessageBox')) {
                        //this.whenShowMessageBox();
                        layOutObj['chatMask'].setLayout();
                    } else {
                        layOutObj[x].setLayout();
                    }
                } catch (e) {
                    if (iniConfig && iniConfig.getConfig('debug')) {
                        messageInterface.addRawChatMessage('出错了！错误位置：窗口布局，错误代码：' + e);
                    }
                }
            }
        }


        this.whenShowMessageBox = function () {
            layOutObj['windowLayerOut'].whenShowMessageBox();
        }

        //聊天区布局
        this.resizeChatMessageAreaImg = function () {
            layOutObj['chatMessageAreaLayerOut'].resizeChatMessageAreaImg();
        }

        this.chatMessageAreaLayerOut = function () {
            layOutObj['chatMessageAreaLayerOut'].setLayout();
        }
    },
    windowLayerOut: function (layerOut, iniConfig) {
        var layerOut = layerOut;
        layerOut.addObj('windowLayerOut', this);
        var windowLayerOut = this;
        var iniConfig = iniConfig;

        var windowMinWidth = parseInt(iniConfig.getConfig('windowMinWidth'));
        var windowMinHeight = parseInt(iniConfig.getConfig('windowMinHeight'));
        var windowMinHeight2 = windowMinHeight + 15;
        var language = iniConfig.getConfig('language');

        this.whenShowMessageBox = function () {
            $('body').css('overflow-x', 'hidden');
            $('body').css('overflow-y', 'hidden');
            $('html').css('overflow-x', 'hidden');
            $('html').css('overflow-y', 'hidden');
            $(document).scrollTop(0);
            $(document).scrollLeft(0);
            $('#chatWindowBox').hide();
        }

        this.setLayout = function () {

            var cH = document.documentElement.clientHeight - 15;
            var cW = document.documentElement.clientWidth;
            var ie6_7 = ((!-[1, ] && !window.XMLHttpRequest) || (navigator.appName == "Microsoft Internet Explorer" && navigator.appVersion.match(/7./i) == "7."));
            var ie6 = (!-[1, ] && !window.XMLHttpRequest);

            $('body').css({'padding': '0px', 'margin': '0px'});

            if (cH < windowMinHeight) {
                cH = windowMinHeight2;
            }

            if (cW < windowMinWidth) {
                $('#chatWindowBox').width(windowMinWidth);
                $('#main_left').width('100%');
            } else {
                $('#chatWindowBox').width(cW);
                $('#main_left').width('100%');
            }

            if (cW < windowMinWidth && cH <= windowMinHeight2) {

                if (ie6_7) {
                    $('html').css('overflow-x', 'scroll');
                    $('html').css('overflow-y', 'scroll');
                    $('body').width(windowMinWidth);
                    $('body').height(cH + 15).css({'overflow-x': 'hidden', 'overflow-y': 'hidden'});
                } else {
                    $('body').css('overflow-x', 'scroll');
                    $('body').css('overflow-y', 'scroll');
                }

            } else if (cW < windowMinWidth && cH >= windowMinHeight2) {

                if (ie6_7) {
                    $('html').css('overflow-x', 'scroll');
                    $('html').css('overflow-y', 'hidden');
                    $('body').width(windowMinWidth);
                    $('body').height(cH + 15).css({'overflow-x': 'hidden', 'overflow-y': 'hidden'});
                } else {
                    $('body').css('overflow-x', 'scroll');
                    $('body').css('overflow-y', 'hidden');
                }

            } else if (cW > windowMinWidth && cH <= windowMinHeight2) {

                if (ie6_7) {
                    $('html').css('overflow-x', 'hidden');
                    $('html').css('overflow-y', 'scroll');
                    $('body').width(cW);
                    $('body').height(cH + 15).css({'overflow-x': 'hidden', 'overflow-y': 'hidden'});
                } else {
                    $('body').css('overflow-x', 'hidden');
                    $('body').css('overflow-y', 'scroll');
                }
            } else if (cH > windowMinHeight2 && cW > windowMinWidth) {

                if (ie6_7) {
                    $('html').css('overflow-x', 'hidden');
                    $('html').css('overflow-y', 'hidden');
                    $('body').width(cW);
                    $('body').height(cH + 15).css({'overflow-x': 'hidden', 'overflow-y': 'hidden'});
                } else {
                    $('body').css('overflow-x', 'hidden');
                    $('body').css('overflow-y', 'hidden');
                }
            }

            $('#messageStyleSettingPanel').height(20);
            $('#messageStyleSettingPanel').css({'padding': '5px 0px'});

            if (/none/i.test($('#messageStyleSettingPanel').css('display'))) {
                $('#chatMessageAreaBox').height(cH - 144);
                $('#Function_box').css('border-top', '0px');

            } else {
                if (ie6) {

                    if (language == 'russian') {
                        $('#chatMessageAreaBox').height(cH - 176);
                    } else {
                        $('#chatMessageAreaBox').height(cH - 177);
                    }

                } else {
                    $('#chatMessageAreaBox').height(cH - 175);
                }
            }

            $('#chatTitle').height(37);
            $('#ccVersion').css('left', $('#chatTitle').width() - 80)
            $('#main_right').height(cH - 26);
            $('#main_left').height(cH - 26);

            $('#clerkDescPanel').height(cH - 320);
            $('#fileUpload').height(cH - 175);
            $('#hotList').height(cH - 27);
            $('#floatAdvertismentContainer').height(cH - 27);
            $('#chatMessageArea').css({'overflow-x': 'hidden', 'overflow-y': 'hidden'}).width($('#chatWindowBox').width() - $('#main_right').width() - 35);

            if (ie6) {
                $('#chatMessageTitle').css({'overflow-x': 'hidden'}).width($('#chatWindowBox').width() - $('#main_right').width() - 37);
            }

            $('#inputPanelMask').width($('#chatMessageInputPanel').width());

            $('#sentButtonBox').css('left', $('#chatMessageInputPanel').width() - $('#sentButtonBox').width() - 20);

            var width = $('#chatMessageAreaBox').width();
            $('#statusBarPanel').width(width - 259);

            var clerkHeight = $('#clerkContact').height()
            var fileUploadHeight = $('#fileUpload').height();

            var clerkAdHeight = 0;
            if (/none/i.test($('#clerkAd').css('display'))) {
                clerkAdHeight = $('#clerkAd').height();
            }

            $('#clerkDescPanel').height(fileUploadHeight - clerkHeight + clerkAdHeight - 20);

            var funcEableSize = -2;
            $('#chatToolBar').children().children('li').each(function (i, n) {

                if (!/none/i.test($(n).css('display'))) {
                    funcEableSize += 1;
                }
            });

            if (!QYJSUtil.browsers.isie) {
                funcEableSize -= 1;
            }

            if (/none/i.test($('#imBox').css('display'))) {
                funcEableSize -= 1;
            }

            $('#toolMask').width(funcEableSize * 34);
            $('#imSelector').css('left', ((funcEableSize - 2) * 34) + 'px');

            if (iniConfig.getConfig('windowResize')) {
                //图片大小
                $('#chatMessageAreaBox').find('img[imgType="QYpicture"]').each(function () {
                    QYJSUtil.reSizeImg($(this), $('#chatMessageAreaBox').width());
                })

                setTimeout(function () {
                    if (iniConfig.getConfig('windowResize')) {
                        windowLayerOut.setLayout();
                        iniConfig.setConfig('windowResize', false);
                    }
                }, 200)
            }
        }
    },

    chatMessageAreaLayerOut: function (iniConfig, layerOut) {

        var layerOut = layerOut;
        var iniConfig = iniConfig;
        var chatMessageAreaLayerOut = this;

        layerOut.addObj('chatMessageAreaLayerOut', this);

        this.setLayout = function () {

            var chatAreaHeight = $('#chatMessageAreaBox').height();
            var chatTitleHeight = $('#chatMessageTitle').height();
            var chatTitleMessageHeight = $('#chatMessageArea').height();

            $('#chatMessageAreaBox').scrollTop(chatTitleMessageHeight + chatTitleHeight - chatAreaHeight + 50);


            //图片加载
            //$('#chatMessageAreaBox').find('img').unbind('load');
            //var img = $('#chatMessageAreaBox').find('img');

            /**
             if (img.length > 50) {
             for (var i = img.length; i < (img.length) - 0; i--) {
             $('#chatMessageAreaBox').find('img').eq(i).load(function () {
             layerOut.chatMessageAreaLayerOut();
             })
             }

             } else if (img.length > 0 && img.length <= 50) {
             $('#chatMessageAreaBox').find('img').load(function () {
             var theImg = $(this);
             if (theImg.width()) {
             theImg.attr('originWidth', theImg.width());
             theImg.attr('originHeight', theImg.height());
             }
             QYJSUtil.reSizeImg($(this), $('#chatToolBar').width());
             layerOut.chatMessageAreaLayerOut();
             })
             } **/

            if (iniConfig.getConfig('hasImgInMessage')) {
                $('#chatMessageAreaBox').find('img[check!="check"]').one('load', function () {
                    var theImg = $(this);
                    if (theImg.width() && theImg.attr('check') != 'check') {
                        theImg.attr('originWidth', theImg.width()).attr('originHeight', theImg.height()).attr('check', 'check');
                    }

                    QYJSUtil.reSizeImg($(this), $('#chatMessageAreaBox').width(), iniConfig.getConfig('wMode'));

                    if (theImg.width() == 0 || theImg.width() == '' || (parseInt(theImg.width()) == 28 && parseInt(theImg.height()) == 30)) {
                        theImg.removeAttr('style').attr('check', '').attr('originWidth', '').attr('originHeight', '').removeAttr('width').removeAttr('height').attr('src', theImg.attr('src')).one(function () {
                            $(this).attr('originWidth', $(this).width()).attr('originHeight', $(this).height()).attr('check', 'check');
                            QYJSUtil.reSizeImg($(this), $('#chatMessageAreaBox').width(), iniConfig.getConfig('wMode'));
                        });
                    }

                    layerOut.chatMessageAreaLayerOut();
                });

                if (iniConfig.getConfig('wMode') == 'mini') {
                    $('#chatMessageTitle').find('img[check!="check"]').one('load', function () {
                        var theImg = $(this);
                        if (theImg.width() && theImg.attr('check') != 'check') {
                            theImg.attr('originWidth', theImg.width()).attr('originHeight', theImg.height()).attr('check', 'check');
                        }

                        QYJSUtil.reSizeImg($(this), $('#chatMessageAreaBox').width(), iniConfig.getConfig('wMode'), true);

                        if (theImg.width() == 0 || theImg.width() == '' || (parseInt(theImg.width()) == 28 && parseInt(theImg.height()) == 30)) {
                            theImg.removeAttr('style').attr('check', '').attr('originWidth', '').attr('originHeight', '').removeAttr('width').removeAttr('height').attr('src', theImg.attr('src')).one(function () {
                                $(this).attr('originWidth', $(this).width()).attr('originHeight', $(this).height()).attr('check', 'check');
                                QYJSUtil.reSizeImg($(this), $('#chatMessageAreaBox').width(), iniConfig.getConfig('wMode'), true);
                            });
                        }

                        layerOut.chatMessageAreaLayerOut();
                    });
                }

                iniConfig.setConfig('hasImgInMessage', false);
            }
        }

        //only for ie6 ie7
        this.resizeChatMessageAreaImg = function () {
            $('#chatMessageAreaBox').find('img[imgType="QYpicture"]').each(function () {
                if ($(this).attr('check') == 'check') {
                    QYJSUtil.reSizeImg($(this), $('#chatMessageAreaBox').width(), iniConfig.getConfig('wMode'));
                } else {
                    $(this).attr('originWidth', '').attr('originHeight', '').removeAttr('width').removeAttr('height').css({'width': '', 'height': ''}).attr('src', $(this).attr('src')).one('load', function () {
                        $(this).attr('originWidth', $(this).width()).attr('originHeight', $(this).height()).attr('check', 'check');
                        QYJSUtil.reSizeImg($(this), $('#chatMessageAreaBox').width(), iniConfig.getConfig('wMode'));
                        layerOut.chatMessageAreaLayerOut();
                    })
                }
            })


            if (iniConfig.getConfig('wMode') == 'mini') {
                $('#chatMessageTitle').find('img').each(function () {
                    if ($(this).attr('check') == 'check') {
                        QYJSUtil.reSizeImg($(this), $('#chatMessageAreaBox').width(), iniConfig.getConfig('wMode'), true);
                    } else {
                        $(this).attr('originWidth', '').attr('originHeight', '').removeAttr('width').removeAttr('height').css({'width': '', 'height': ''}).attr('src', $(this).attr('src')).one('load', function () {
                            $(this).attr('originWidth', $(this).width()).attr('originHeight', $(this).height()).attr('check', 'check');
                            QYJSUtil.reSizeImg($(this), $('#chatMessageAreaBox').width(), iniConfig.getConfig('wMode'), true);
                        })
                    }
                })
            }
        }

        if ((!-[1, ] && !window.XMLHttpRequest) //ie6
            || (navigator.appName == "Microsoft Internet Explorer" && navigator.appVersion.match(/7./i) == "7.")  //ie7
        //|| (/netscape/.test(navigator.appName.toLowerCase()) && /like\sgecko/.test(navigator.userAgent.toLowerCase()))//ie11
            ) {
            setInterval(function () {
                chatMessageAreaLayerOut.resizeChatMessageAreaImg();
            }, 3000)
        }
    },
    statistic: function (iniConfig) {
        var handlerAddress = iniConfig.getConfig('statisticFileAddress')
        var pageUrl = window.location.href;

        this.adStatistic = function () {
            this.uploadData('miniAd')
        }

        this.pageStatistic = function () {
            this.uploadData('page')
        }

        this.floatAdvertisementClick = function () {
            this.uploadData('floatAdClick')
        }

        this.floatAdStatisticDisplay = function () {
            this.uploadData('floatAdDisplay')
        }


        this.uploadData = function (type) {
            $.post(handlerAddress, {'type': type, 'pageUrl': pageUrl}, function (data) {
                //console.log(data)
            });
        }
    },

    windowNotice: function (iniConfig, languageTemplate) {

        var iniConfig = iniConfig;
        var languageTemplate = languageTemplate;
        var windowNotice = this;
        var clearTimeOutId = '';
        var windowTitle = window.document.title;
        this.resetTitle = function () {
            windowNotice.clearAllLoop();
            window.document.title = windowTitle
        }

        //滚动消息提示
        this.setNotice = function () {

            var messageNotice = languageTemplate.languageInterpret('新消息!.......');
            windowNotice.clearAllLoop();

            var messagetNoticeId = [];
            window.document.title = messageNotice;
            //window.focus();

            var id = setInterval(function () {
                messageNotice = messageNotice.substring(1) + messageNotice.substring(0, 1);
                window.document.title = messageNotice;
            }, 200);

            messagetNoticeId.push(id);
            messagetNoticeId = iniConfig.setConfig('messagetNoticeId', messagetNoticeId);

            clearTimeOutId = setTimeout(function () {
                windowNotice.resetTitle()
            }, 15000)
        }

        this.clearAllLoop = function () {
            windowNotice.clearNoticeLoop();
            windowNotice.clearTimeOut()
        }

        this.clearTimeOut = function () {
            try {
                clearTimeout(clearTimeOutId)
            } catch (e) {

            }
        }

        this.clearNoticeLoop = function () {
            var messagetNoticeId = iniConfig.getConfig('messagetNoticeId');
            try {
                if (messagetNoticeId.length > 0) {
                    for (var i = 0; i < messagetNoticeId.length; i++) {
                        clearInterval(messagetNoticeId[i])
                    }
                    messagetNoticeId = [];
                    var messagetNoticeId = iniConfig.setConfig('messagetNoticeId', messagetNoticeId);
                }
            } catch (e) {

            }
        }
    }, widget: function (iniConfig, messageInterface) {

        var widget = {};
        var debug = iniConfig.getConfig('debug');
        var popWidget = [];
        var widgetThis = this;

        this.addWidget = function (item, widgetObj, type) {
            widget[item] = widgetObj;
            if (type) {
                popWidget.push(item);
            }
        }

        this.closeExcept = function (widgetObj, show) {

            for (var x in widget) {
                if (x == widgetObj) {
                    if (show) {
                        widgetThis.showWidget(x)
                    }
                } else {
                    widgetThis.closeWidget(x)
                }
            }
        }

        this.closePopWidget = function () {
            for (var i = 0; i < popWidget.length; i++) {
                widgetThis.closeWidget(popWidget[i])
            }
        }

        this.closePopWidgetExcept = function (widgetObj, show) {
            for (var i = 0; i < popWidget.length; i++) {
                if (popWidget[i] == widgetObj) {
                    if (show) {
                        widgetThis.showWidget(popWidget[i])
                    }
                } else {
                    widgetThis.closeWidget(popWidget[i])
                }
            }
        }

        this.closeAllWidget = function () {
            for (var x in widget) {
                widgetThis.closeWidget(x);
            }
        }

        this.showWidget = function (widgetObj) {
            try {
                if (widget[widgetObj] && widget[widgetObj].show) {
                    widget[widgetObj].show();
                }
            } catch (e) {
                if (debug) {
                    messageInterface.addRawChatMessage('出错了！错误位置：showWight，错误代码：' + e)
                }
            }
        }

        this.closeWidget = function (widgetObj) {
            try {
                if (widget[widgetObj] && widget[widgetObj].hide) {
                    widget[widgetObj].hide();
                }
            } catch (e) {
                if (debug) {
                    messageInterface.addRawChatMessage('出错了！错误位置：closeWidget，错误代码：' + e)
                }
            }
        }


        this.getWidget = function (widgetObj) {
            try {
                if (widget[widgetObj]) {
                    return widget[widgetObj];
                } else {
                    return  false;
                }
            } catch (e) {
                if (debug) {
                    messageInterface.addRawChatMessage('出错了！错误位置：getWidget，错误代码：' + e)
                }
            }
        }

        this.toggleWidget = function (widgetObj) {
            try {
                if (widget[widgetObj] && widget[widgetObj].toggle) {
                    widget[widgetObj].toggle();
                }
            } catch (e) {
                if (debug) {
                    messageInterface.addRawChatMessage('出错了！错误位置：toggleWidget，错误代码：' + e)
                }
            }
        }
    }
}

