//定义JS工具名
var QYJSUtil = {};

//浏览器检测
QYJSUtil.browsers = {
    chrome: (/chrome\/([\d.]+)/i).test(navigator.userAgent),
    mozilla: (/firefox\/([\d.]+)/i).test(navigator.userAgent),
    ie6: !-[1, ] && !window.XMLHttpRequest,
    ie7: navigator.appName == "Microsoft Internet Explorer" && navigator.appVersion.match(/7./i) == "7.",
    ie8: navigator.appName == "Microsoft Internet Explorer" && navigator.appVersion.match(/8./i) == "8.",
    ie9: navigator.appName == "Microsoft Internet Explorer" && navigator.appVersion.match(/9./i) == "9.",
    ie10: document.documentMode == 10 && (/msie\s10/i).test(navigator.userAgent), //未测试
    ie11: document.documentMode && !document.all,
    ie: document.all, //ie6 ~ ie10
    isie: window.ActiveXObject || document.documentMode
}

//聊天消息解释器
QYJSUtil.QYmessagcoder = {

    decodeUploadFileStatusXML: function (string) {

        if (!string) {
            return false;
        }
        var xmlDoc = $.parseXML(string);
        var $xml = $(xmlDoc);
        var data = $xml.find('data');
        var param = {};

        param.id = data.attr('id')
        param.uploadSize = data.attr('uploadSize')
        param.percent = data.attr('percent')
        param.size = data.attr('size')

        return param;
    },
    //正常情况下formatTypeOf为空表示正常解释QY消息
    decodeQYMessageXML: function (string, iniConfig, languageTemplate, chatMessageArea, formatTypeOf) {

        var chatMessageArea = chatMessageArea;
        var emotionImgPath = iniConfig.getConfig('emotionImgPath');
        var emotionMaps = iniConfig.getConfig('emotionMap');
        var languageTemplate = languageTemplate;
        var hasImg = false;

        function wrapUrlStringInMessage(message) {

            //var reg = new RegExp("([h|f]t[t|p]p?s?:\/\/[^<>\"“”\\s\\u4e00-\\u9fa5]*)", "ig");
            var reg = new RegExp("(?:ftp|ftps|http|https):\/\/[^<>\"“”\\s\\u4e00-\\u9fa5]*", "ig");
            var regString = message.match(reg);
            var hasUrl = false;
            var splitArr = []
            var splitLast = message

            if (regString) {
                for (var i = 0; i < regString.length; i++) {
                    var regStringPart = regString[i]
                    // if (/^(ftp|ftps|http|https){1}:\/\//.test(regStringPart)) {
                    hasUrl = true
                    var trimmedRegString = regStringPart.replace(/\//gi, '\\/');
                    trimmedRegString = trimmedRegString.replace(/\./gi, '\\.');
                    trimmedRegString = trimmedRegString.replace(/\|/gi, '\\|');
                    trimmedRegString = trimmedRegString.replace(/\_/gi, '\\_');
                    trimmedRegString = trimmedRegString.replace(/\!/gi, '\\!');
                    trimmedRegString = trimmedRegString.replace(/\:/gi, '\\:');

                    trimmedRegString = trimmedRegString.replace(/\{/gi, '\\{');
                    trimmedRegString = trimmedRegString.replace(/\}/gi, '\\}');

                    trimmedRegString = trimmedRegString.replace(/\[/gi, '\\[');
                    trimmedRegString = trimmedRegString.replace(/\]/gi, '\\]');

                    trimmedRegString = trimmedRegString.replace(/\(/gi, '\\(');
                    trimmedRegString = trimmedRegString.replace(/\)/gi, '\\)');

                    trimmedRegString = trimmedRegString.replace(/\?/gi, '\\?');
                    trimmedRegString = trimmedRegString.replace(/\+/gi, '\\+');
                    trimmedRegString = trimmedRegString.replace(/\*/gi, '\\*');

                    trimmedRegString = trimmedRegString.replace(/\^/gi, '\\^');
                    trimmedRegString = trimmedRegString.replace(/\$/gi, '\\$');

                    var pos = splitLast.search(trimmedRegString)
                    splitArr.push(formatMessage2(splitLast.substring(0, pos)))
                    splitArr.push('<a href=' + regStringPart + ' target=\'__blank\'>' + regStringPart + '</a>')
                    splitLast = splitLast.substring(pos + regStringPart.length)
                    //}
                }
            }

            if (!hasUrl) {
                message = formatMessage2(message)
            } else {
                var message = ''
                for (var i = 0; i < splitArr.length; i++) {
                    message += splitArr[i];
                }
                message += formatMessage2(splitLast)
            }

            return message
        }

        function formatMessage2(message) {
            message = message.replace(/&/img, '&amp;');
            message = message.replace(/</img, '&lt;');
            message = message.replace(/>/img, '&gt;');
            message = message.replace(/"/img, '&quot;');
            message = message.replace(/'/img, '&#39;');
            message = formatln(message)
            message = message.replace(/\s/ig, '&nbsp;');
            return message;
        }

        function formatln(message) {
            message = message.replace(/\r\n/gi, '<br/>')
            message = message.replace(/\n/gi, '<br/>')
            message = message.replace(/\r/gi, '<br/>')
            return message
        }

        //console.log('decodeQYMessageXML+string=============' + string + '\n');

        if (!string) {
            return '';
        }

        string = $.trim(string);

        try {
            var content = '';
            var xmlDoc = $.parseXML(string);
        } catch (e) {
            var content = string.match(/(<m.*?t=)(["|\'])(.*?)(\2)(.*?>.*?<\/m>)/);
            string = string.replace(/(<m.*?t=)(["|\'])(.*?)(\2)(.*?>.*?<\/m>)/, '$1$2$4$5');
            string = string.replace(/&#x01;/,'');

            if (iniConfig.getConfig('debug')) {
                chatMessageArea.addChatMessage(languageTemplate.languageInterpret('出错了！错误位置：消息解释，错误代码：' + e));
            }

            try {
                var xmlDoc = $.parseXML(string);
            } catch (e) {
                chatMessageArea.addChatMessage(languageTemplate.languageInterpret('出错了！错误位置：消息解释2，错误代码：' + e));
                chatMessageArea.addChatMessage(formatMessage2(string));
                return '';
            }
        }

        var $xml = $(xmlDoc);
        var m = $xml.find('m');
        var fontStyle = '';
        var contentX = '';

        if (content) {
            contentX = content[3];

            contentX = contentX.replace(/&#x0D;/gm, "\r");
            contentX = contentX.replace(/&#x0A;/gm, "\n");
            contentX = contentX.replace(/\r\n/gm, "\n");

            contentX = contentX.replace(/&nbsp;/gm, " ");

            contentX = contentX.replace(/&lt;|&#60;|&#x3c;/gm, '<');
            contentX = contentX.replace(/&gt;|&#62;|&#x3e;/gm, '>');
            contentX = contentX.replace(/&amp;|&#38;|&#x26;/gm, '&');
            contentX = contentX.replace(/&quot;|&#34;|&#x22;/gm, '"');
            contentX = contentX.replace(/&apos;|&#39;|&#x27;/gm, '\'');

        } else if (m.attr('t')) {
            contentX = m.attr('t');
            contentX = contentX.replace(/\r\n/gm, '\n');
        }

        if (m.attr('f') && m.attr('f') !== '0') {
            fontStyle += ' font-family:arial,' + m.attr('f') + ';';
        }

        if (m.attr('h') && m.attr('h') !== '0') {
            fontStyle += ' font-size:' + m.attr('h') + 'pt;';
            fontStyle += ' line-height:' + (parseInt(m.attr('h')) + 15 + (parseInt(m.attr('h')) / 8)) + 'px;';
        } else {
            fontStyle += ' line-height:' + (8 + 15) + 'px;';
        }

        if (m.attr('c')) {
            fontStyle += ' color :#' + m.attr('c') + ';';
        }

        if (m.attr('b')) {
            fontStyle += ' font-weight:bold' + ';';
        }

        if (m.attr('i')) {
            fontStyle += ' font-style:italic' + ';';
        }

        if (m.attr('u')) {
            fontStyle += ' text-decoration:underline' + ';';
        }
        if(iniConfig.getConfig('language') == 'russian'){
            fontStyle += ' font-weight:bold;';
            fontStyle += ' font-size:13px;';
            fontStyle += ' line-height:16px;';
        }

        var newEmotionMap = {};

        for (var x in emotionMaps) {
            newEmotionMap[emotionMaps[x]] = x;
        }

        var emotion = m.find('f');

        var start = 0;
        var content = [];
        var message = contentX;
        var posArr = [];

        if (emotion.length > 0) {
            hasImg = true;

            for (var i = 0; i < emotion.length; i++) {
                var emotionI = emotion.eq(i);

                var position = '';
                var symbol = ''
                var b = '';
                var tmpPos = [];

                if (emotionI.attr('p')) {
                    position = emotionI.attr('p');
                    tmpPos.push(parseInt(position));
                }

                if (emotionI.attr('c')) {
                    symbol = emotionI.attr('c');
                    tmpPos.push(symbol);
                }

                if (emotionI.attr('b')) {
                    if (emotionI.attr('b')) {
                        b = emotionI.attr('b');
                    }
                    tmpPos.push(b);
                }
                posArr.push(tmpPos);
            }

            //console.log(posArr)
            for (var i = 0; i < posArr.length; i++) {
                for (var j = i + 1; j < posArr.length; j++) {
                    if (posArr[j][0] < posArr[i][0]) {
                        var tmpPos = [];
                        tmpPos = posArr[i];
                        posArr[i] = [];
                        posArr[i] = posArr[j]
                        posArr[j] = [];
                        posArr[j] = tmpPos;

                        //console.log('\nxxxx = ' + posArr[j][0])
                    }
                }
            }

            for (var i = 0; i < emotion.length; i++) {

                var position = parseInt(posArr[i][0]);
                var symbol = posArr[i][1];
                if (posArr[i][2]) {
                    var b = parseInt(posArr[i][2]);
                } else {
                    var b = '';
                }

                //console.log('\nstart===' + start + ';;;position===' + position)
                //console.log('\symbol===' + symbol + ';;;position===' + position + 'b==' + b)

                var contentSplit = contentX.substring(start, position);

                if (formatTypeOf == 'inputting') {
                    ;
                } else {
                    contentSplit = wrapUrlStringInMessage(contentSplit)
                }

                content.push(contentSplit)

                var img;

                if (formatTypeOf == 'inputting') {
                    if (b) {
                        img = '[' + languageTemplate.languageInterpret('表情') + ']'
                    } else {
                        img = '[' + languageTemplate.languageInterpret('图片') + ']'
                    }
                } else {
                    if (b) {
                        img = '<img src="' + emotionImgPath + newEmotionMap[symbol] + '.gif" />'
                    } else {
                        img = '<img src="' + symbol + '" imgType="QYpicture" originWidth=""  originHeight="" onclick="javascript:window.open(\'' + symbol + '\')" style="cursor:pointer" target="__blank"/>'
                    }
                }

                content.push(img);
                start = position + 1;
            }

            var lastSplit = contentX.substring(start);

            if (lastSplit) {

                if (formatTypeOf == 'inputting') {
                    ;
                } else {
                    lastSplit = wrapUrlStringInMessage(lastSplit)
                }

                content.push(lastSplit);
            }

            var message = '';

            for (var i = 0; i < content.length; i++) {
                message += content[i];
            }

        } else {

            var message = contentX;
            if (message) {
                if (formatTypeOf == 'inputting') {
                    ;
                } else {
                    message = wrapUrlStringInMessage(message)
                }
            }
        }

        //console.log('message=============' + message + '\n');

        if (hasImg) {
            iniConfig.setConfig('hasImgInMessage', true);
        } else {
            iniConfig.setConfig('hasImgInMessage', false);
        }

        message = formatln(message)

        if (formatTypeOf == 'inputting') {
            return message
        } else {
            //return '<p style="' + fontStyle + ';word-break:break-all" class="textIndent">' + message + '</p>';
            return '<p style="' + fontStyle + ';word-break:break-all;overflow:hidden;word-wrap:break-word;" class="textIndent">' + message + '</p>';
        }

    },
    encodeQYMessageXML: function (fontStyle, string, iniConfig) {

        if (!string) {
            return '';
        }

        ///console.log('encodeQYMessageXML+string=============' + string + '\n');

        var emotionMap = iniConfig.getConfig('emotionMap');
        var emotionXMLAddr = iniConfig.getConfig('emotionImgPath');

        emotionXMLAddr = emotionXMLAddr.replace(/\//gi, '\\/');
        emotionXMLAddr = emotionXMLAddr.replace(/\./gi, '\\.');

        var emotionXMLAddrReg = new RegExp(emotionXMLAddr, 'i');
        var emotionImgReg = new RegExp(emotionXMLAddr + '\\d+\\.gif', 'i');

        string = string.replace(/<br[^>]*?>/img, "\n");

        var tmpContain = $('<div></div>');

        tmpContain.html('').html(string);
        var QYEmotionString = '';

        var img = tmpContain.find('img');

        if (img.length > 0) {
            for (var i = 0; i < img.length; i++) {
                var html = img[i].outerHTML;
                var src = $(img.eq(i)).attr('src');

                var imgReg = html.replace(/\//gi, '\\/');
                var imgReg = imgReg.replace(/\./gi, '\\.');
                var imgReg = imgReg.replace(/\|/gi, '\\|');
                var imgReg = imgReg.replace(/\_/gi, '\\_');
                var imgReg = imgReg.replace(/\!/gi, '\\!');
                var imgReg = imgReg.replace(/\:/gi, '\\:');

                var imgReg = html.replace(/\{/gi, '\\{');
                var imgReg = imgReg.replace(/\}/gi, '\\}');

                var imgReg = imgReg.replace(/\[/gi, '\\[');
                var imgReg = imgReg.replace(/\]/gi, '\\]');

                var imgReg = imgReg.replace(/\(/gi, '\\(');
                var imgReg = imgReg.replace(/\)/gi, '\\)');

                var imgReg = imgReg.replace(/\?/gi, '\\?');
                var imgReg = imgReg.replace(/\+/gi, '\\+');
                var imgReg = imgReg.replace(/\*/gi, '\\*');

                var imgReg = imgReg.replace(/\^/gi, '\\^');
                var imgReg = imgReg.replace(/\$/gi, '\\$');

                var reg = new RegExp(imgReg, 'i');

                var pos = string.search(reg)

                //////////////////////////////////// 拆分 //////////////////////////////////

                var correctPos;
                //拆分
                var stringX = string.substring(0, pos);

                /**
                 stringX = stringX.replace(/&lt;/img, '<');
                 stringX = stringX.replace(/&gt;/img, '>');

                 stringX = stringX.replace(/&quot;/img, '"');
                 stringX = stringX.replace(/&apos;/img, '\'');
                 stringX = stringX.replace(/&amp;/img, '&');   **/

                stringX = stringX.replace(/&lt;|&gt;|&quot;|&apos;|&amp;|&#39;|&#62;|&#60;|&#34;|&#38;|&#x26;|&#x3c;|&#x3e;|&#x27;|&#x22/img, 'x');

                correctPos = stringX.length;
                //console.log('xpost = ' + stringX.length);

                //////////////////////////////////// 拆分 //////////////////////////////////
                if (emotionImgReg.test(src)) {
                    string = string.replace(reg, ' ');
                    var name = src.replace(emotionXMLAddrReg, '');
                    var part = parseInt(name);
                    QYEmotionString += '<f p="' + correctPos + '" c="' + emotionMap[part] + '" b="1"/>';
                } else {
                    if (/^(http|https):\/\//ig.test(src) && !/[<>'"&]/g.test(src)) {
                        string = string.replace(reg, ' ');
                        QYEmotionString += '<f p="' + correctPos + '" c="' + src + '" />';
                    } else {
                        string = string.replace(reg, '');
                    }
                }
            }
        }
        //////////////////////////////////// 字符转义 //////////////////////////////////
        string = string.replace(/\n/gim, '&#x0D;&#x0A;');

        string = string.replace(/</img, '&lt;');
        string = string.replace(/>/img, '&gt;');

        string = string.replace(/"/img, '&quot;');
        string = string.replace(/'/img, '&#39;');

        string = string.replace(/\\/img, '&#92;');

        //console.log('t ==== ' + string)
        //////////////////////////////////// 字符转义 //////////////////////////////////

        var fontStyleString;

        fontStyleString = ' t="' + string + '"  '

        fontStyleString += ' type="0" ';

        if (fontStyle.fontFamily) {
            fontStyleString += ' f="' + fontStyle.fontFamily + '"  '
        }
        if (fontStyle.fontSize) {
            fontStyleString += ' h="' + parseInt(fontStyle.fontSize) + '"  '
        }
        if (fontStyle.fontColor) {
            fontStyleString += ' c="' + (fontStyle.fontColor).replace(/#/, '') + '"  '
        }
        if (fontStyle.fontWeight) {
            fontStyleString += ' b="' + fontStyle.fontWeight + '"  '
        }
        if (fontStyle.fontItalic) {
            fontStyleString += ' i="' + fontStyle.fontItalic + '"  '
        }
        if (fontStyle.fontUnderline) {
            fontStyleString += ' u="' + fontStyle.fontUnderline + '"  '
        }

        //console.log('\n\n\n\n\n\n<m ' + fontStyleString + '>' + QYEmotionString + '</m>' + '\n\n\n\n\n\n');

        tmpContain.html('');
        return '<m ' + fontStyleString + '>' + QYEmotionString + '</m>';
    },
    decodeEmotionXML: function (string) {

        if (!string) {
            return false;
        }

        var emotionMap = {};
        var emotionMapTip = {};

        var xmlDoc = $.parseXML(string);
        var $xml = $(xmlDoc);
        $xml.find('item').each(function () {
            var pic = $(this).attr('pic');
            var symbol = $(this).attr('symbol');
            var name = $(this).attr('name');

            emotionMap[pic.match(/\d+/)] = symbol;
            emotionMapTip[pic.match(/\d+/)] = name;
        });

        return [emotionMap, emotionMapTip];
    },
    decodeLanguageXML: function (string) {

        if (!string) {
            return false;
        }

        var languageTemplate = {};
        var xmlDoc = $.parseXML(string);
        var $xml = $(xmlDoc);
        var reg = /^(.*?)#\/((?:\/\/)*?(?:[^\/][\/]?)*?)#\/(.*?)$/i;

        $xml.find('trans_unit').each(function () {

            var times = 1;
            var trans_unit = $(this);
            var sourceValue = trans_unit.find('source').text();
            var targetValue = trans_unit.find('target').text();

            sourceValue = jQuery.trim(sourceValue);
            targetValue = jQuery.trim(targetValue);

            if (sourceValue && targetValue) {
                var index = sourceValue.replace(reg, '$1(.*?)$3')
                var content = targetValue.replace(reg, '$1$$' + times + '$3')

                while (reg.test(index)) {
                    times++;
                    index = index.replace(reg, '$1(.*?)$3')
                    content = content.replace(reg, '$1$$' + times + '$3')
                }

                index = '^' + index + '$'

                languageTemplate [index] = content
            }
        });
        return languageTemplate;
    }
}

//消息显示
QYJSUtil.chatMessageArea = function (chatMessageTitle, chatMessageArea, languageTemplate, iniConfig) {

    //消息显示框
    var chatMessageTitle = chatMessageTitle;
    var chatMessageArea = chatMessageArea;
    var languageTemplate = languageTemplate;
    var iniConfig = iniConfig;

    this.setMessageTitle = function (title) {
        var title = title.replace(/\r\n/gi, '<br/>');
        var title = title.replace(/\n/gi, '<br/>');
        var title = title.replace(/\r/gi, '<br/>');
        if (iniConfig.getConfig('wMode') == 'mini') {
            iniConfig.setConfig('hasImgInMessage', true);
        }

        chatMessageTitle.html(title);
    }

    this.addChatMessage = function (message) {
        var message = message.replace(/\t/gi, '&nbsp;&nbsp;&nbsp;&nbsp;')
        chatMessageArea.append(message);
    }

    this.addTimeTitle = function (title) {
        var time = this.getCurrentDateTime();
        var message = '<p><span style="color:#008000;">' + title + '</span>(' + this.getCurrentDateTime() + ')</p>'
        this.addChatMessage(message);
    }

    this.getCurrentDateTime = function () {
        var dateTime = new Date();
        var year = dateTime.getFullYear();
        var month = dateTime.getMonth() + 1;
        var day = dateTime.getDate();
        var hour = dateTime.getHours();
        var minute = dateTime.getMinutes();
        var second = dateTime.getSeconds();
        var currentTime = year + '-' + (month > 9 ? '' : '0') + month + '-' + (day > 9 ? '' : '0') + day + ' ' + (hour > 9 ? '' : '0') + hour + ':' + (minute > 9 ? '' : '0') + minute + ':' + (second > 9 ? '' : '0') + second;
        return  currentTime;
    }

    this.addQYChatMessage = function (message) {
        //try {
        var message = QYJSUtil.QYmessagcoder.decodeQYMessageXML(message, iniConfig, languageTemplate, this);
        this.addChatMessage(message);
        //} catch (e) {
        //    this.addChatMessage(languageTemplate.languageInterpret('出错了！错误位置：消息解释，错误代码：' + e));
        //}
    }

    //添加无格式消息
    this.addRawChatMessage = function (message, type) {
        /**
         *0:'sentMessageTitle',
         1:'receiveMessageTitle',
         2:'noticeMessage',
         3:'errorMessage',
         4:'CCRobotMessage'
         */

        var message = message.replace(/\r\n/gi, '<br/>')
        var message = message.replace(/\n/gi, '<br/>')
        var message = message.replace(/\r/gi, '<br/>')

        message = message.replace(/&#x0A;&#x0D;/gmi, '<br/>')
        message = message.replace(/&#x0A;/gmi, '<br/>');
        message = message.replace(/&#x0D;/gmi, '<br/>')

        message = message.replace(/\s/gi, '&nbsp;')

        var message = '<p class="' + type + '">' + message + '</p>'

        this.addChatMessage(message);
    }

    //无格式化消息
    this.addNoReformRawChatMessage = function (message) {
        var message = '<p>' + message + '</p>'
        this.addChatMessage(message);
    }

    //无格式化固定消息
    this.addNoReformFixedMessage = function (message, type) {
        var queue = chatMessageArea.find('p[rel="fixed"]')

        try {
            if (queue.html()) {
                queue.html('').html(message)
                return true;
            }
        } catch (e) {

        }

        var message = '<p class="' + type + '" rel="fixed">' + message + '</p>'
        this.addChatMessage(message);
    }

    //添加固定消息
    this.addFixedMessage = function (message, type) {
        /**
         *0:'sentMessageTitle',
         1:'receiveMessageTitle',
         2:'noticeMessage',
         3:'errorMessage',
         4:'CCRobotMessage'
         */

        var message = message.replace(/\r\n/gi, '<br/>')
        var message = message.replace(/\n/gi, '<br/>')
        var message = message.replace(/\r/gi, '<br/>')

        message = message.replace(/&#x0A;&#x0D;/gmi, '<br/>')
        message = message.replace(/&#x0A;/gmi, '<br/>');
        message = message.replace(/&#x0D;/gmi, '<br/>')
        message = message.replace(/\s/gi, '&nbsp;')

        var queue = chatMessageArea.find('p[rel="fixed"]')

        try {
            if (queue.html()) {
                queue.html('').html(message)
                return true;
            }
        } catch (e) {

        }

        var message = '<p class="' + type + '" rel="fixed">' + message + '</p>'
        this.addChatMessage(message);
    }

    //读取聊天消息
    this.getChatContent = function () {
        return  chatMessageArea.html();
    }

    //增加客服列表
    this.addClerk = function (param) {

        var status;
        var color;
        if (param.status == 1) {
            status = languageTemplate.languageInterpret('在线');
            color = '#000066';
        } else {
            status = languageTemplate.languageInterpret('离线');
            color = '#666666';
        }

        var string = " <span class='pickClerkItem' style='margin-right: 15px;' > <a class='pickClerk'  no='" + param.clerkId + "' herf='#' nickname='" + param.nickname + "'>" + param.nickname + "<span style='color:" + color + ";'>[" + status + "]</span></a></span>  ";
        this.addChatMessage(string);
    }

};
//文本编辑器
QYJSUtil.RichText = function (languageTemplate, iniConfig, widget) {

    var languageTemplate = languageTemplate;
    var iniConfig = iniConfig;

    var widget = widget;

    var browser = {};
    var ua = navigator.userAgent.toLowerCase();

    var editoRange = '';

    browser.msie = (/msie ([\d.]+)/).test(ua);
    browser.firefox = (/firefox\/([\d.]+)/).test(ua);
    browser.chrome = (/chrome\/([\d.]+)/).test(ua);

    var ie6 = !-[1, ] && !window.XMLHttpRequest;
    var ie7 = (navigator.appName == "Microsoft Internet Explorer" && navigator.appVersion.match(/7./i) == "7.");
    var ie8 = (navigator.appName == "Microsoft Internet Explorer" && navigator.appVersion.match(/8./i) == "8.");
    var ie10 = /msie/i.test(navigator.userAgent) && (function () {
        "use strict";
        return this === undefined;
    }());
    var ie11 = (/netscape/.test(navigator.appName.toLowerCase()) && /like\sgecko/.test(ua))

    var editorDoc = '';
    var editorWindow = '';

    var richText = this;
    var container;

    var editorPadding = 0;
    if (iniConfig.getConfig('wMode') == 'big') {
        editorPadding = document.all ? 60 : 80;
    }

    //字体设计
    var fontStyle = {};
    var insertRangeHtml = function (win, html) {
        var range = null;
        var sel = null;
        win.focus();

        if (browser.msie && !ie10) {
            range = editoRange ? editoRange : win.document.selection.createRange();
            if (range.parentElement) {
                if (range.parentElement().document != win.document) {
                    range = null;
                }
            }

        } else if (browser.firefox || browser.chrome || ie10 || ie11) {
            var sel = win.getSelection();
            if (sel.rangeCount > 0) {
                range = sel.getRangeAt(0);
            }
        }

        if (range != null) {
            if (browser.msie && !ie10) {
                if (range.pasteHTML != undefined) {
                    range.collapse(false);
                    range.select();
                    range.pasteHTML(html);
                    return true;
                }
            } else if (browser.firefox || browser.chrome || ie10 || ie11) {
                if (range.deleteContents != undefined && range.insertNode != undefined) {

                    var fragment = range.createContextualFragment(html);
                    var oLastNode = fragment.lastChild; //获得DocumentFragment的末尾位置
                    range.insertNode(fragment);
                    range.setEndAfter(oLastNode);//设置末尾位置
                    range.collapse(false);//合并范围至末尾
                    sel.removeAllRanges();//清除range
                    sel.addRange(range);//设置range

                    return true;
                }
            }
        }
        return false;

    }

    var createEditor = function (containerBox) {

        container = $('#' + containerBox);
        container.html('<iframe frameborder="0" style="padding: 0px;"></iframe>');

        //创建全局 工具栏、编辑框
        var editor = container.find('iframe')[0];

        editorWindow = editor.contentWindow;
        editorDoc = editor.contentWindow.document;

        editor.style.width = '100%';
        editor.style.height = '100%';

        if (browser.firefox) {
            editor.onload = function () {
                editorDoc.designMode = "on";
                editorDoc.contentEditable = true;
                editorDoc.execCommand('enableObjectResizing', false, 'false');
            }
        }
        else {
            editorDoc.designMode = "on";
            editorDoc.contentEditable = true;
        }

        var extraStyle = ''
        if (ie11 && !document.all) {
            extraStyle = "<style>html p{margin:0px; padding:0px;}</style>"
        }

        editorDoc.open();
        editorDoc.write("<!DOCTYPE html PUBLIC \"-//W3C//DTD XHTML 1.0 Transitional//EN\" \"http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd\">" +
            "<html xmlns=\"http://www.w3.org/1999/xhtml\"><head>" + extraStyle +
            "<meta http-equiv=\"X-UA-Compatible\" content=\"IE=EmulateIE7\">" +
            "</head><body style='font-family: arial, \"宋体\";margin:0px; padding: 0px;  height: 100%;" +
            ((ie6 || ie7 || ie8) ? " overflow-x:auto;" : " overflow-x:hidden;") +
            "word-break:break-all; ' >" +
            "</body></html>");
        editorDoc.close();

        richText.setFontSize(10);
        richText.setRightPadding(editorPadding);
        
        if(iniConfig.getConfig('language') == 'russian'){
            richText.setFontFamily('arial');
            richText.setFontWeight('bold');
        }

        if (ie11) {
            $(editorDoc).find('body').html('&nbsp;').html('');
        }
    }

    //取得焦点
    this.getFocus = function () {
        editorWindow.focus();
    }

    this.addCursor = function () {

        if (browser.firefox) {
            var message = $(editorDoc).find('body').html();
            if (!message) {
                insertRangeHtml(editorWindow, '<span style="margin:0px; padding:0px;" ignore="true">&nbsp;</span>');
            }
        } else {
            insertRangeHtml(editorWindow, '<span></span>');
        }
        this.resizeBody();
    }

    this.closeEditor = function () {
        iniConfig.setConfig('closeEditor', true);

        $(editorDoc).find('body').html('');
        widget.showWidget('inputPanelMask');

        $(window).focus();
    }

    this.openEditor = function () {
        iniConfig.setConfig('closeEditor', false);

        $(editorDoc).find('body').html('');
        widget.closeWidget('inputPanelMask');

        $(window).focus();
    }

    this.getMessage = function () {
        var style = '';
        if (fontStyle.fontFamily) {
            style += ' font-family:' + fontStyle.fontFamily + '; ';
        }

        if (fontStyle.fontSize) {
            style += ' font-size:' + fontStyle.fontSize + '; ';
        }

        if (fontStyle.fontColor) {
            style += ' color:#' + fontStyle.fontColor + '; ';
        }

        if (fontStyle.fontWeight) {
            style += ' font-weight:' + fontStyle.fontWeight + '; ';
        }

        if (fontStyle.fontItalic) {
            style += ' font-style:' + fontStyle.fontItalic + '; ';
        }

        if (fontStyle.fontUnderline) {
            style += ' text-decoration:' + fontStyle.fontUnderline + '; ';
        }

        var message = this.beautifulMessage();

        //匹配url
        var reg2 = new RegExp("([h|f]t[t|p]p?s?:\/\/[^<>\"“”\\s\\u4e00-\\u9fa5]*)", "ig");
        var regString = message.match(reg2);

        if (/^(ftp|http|https){1}:\/\//.test(regString)) {
            var notice = languageTemplate.languageInterpret('不要打开不信任的网站!');
            message = message.replace(reg2, "<a href='$1' target='__blank' style='color:blue;text-decoration: underline' title='" + notice + "'>$1</a>");
        }

        message = "<p style=' " + style + "'>" + message + "</p>";

        return    message

    }

    this.getMessageWithQYFormat = function () {
        var message = this.beautifulMessage();
        return  QYJSUtil.QYmessagcoder.encodeQYMessageXML(fontStyle, message, iniConfig)
    }

    this.getChatInputMessage = function () {
        return [fontStyle, this.beautifulMessage()];
    }

    this.beautifulMessage = function () {

        var message = $(editorDoc).find('body').html();

        if (document.all) {
            message = message.replace(/^<p>((\s)|(&nbsp;))*<\/p>/ig, '');
        }

        //console.log('<br/>\n' + message + 'before=============================\n');
        message = message.replace(/\n/ig, '');
        message = message.replace(/<span.*?ignore="true">&nbsp;<\/span>/img, '');
        message = message.replace(/<(?:p|h1|h2|h3|h4|h5|h6)[^>]*?>(.*?)<\/p>/img, '<br/>$1');
        message = message.replace(/<(?!img|br)[^>]*>/gim, "");

        message = message.replace(/<br[^>]*?>/gmi, '<br\/>')
        message = message.replace(/<img.*?src\S*?=\s*?['|"](.*?)['|"].*?>/gmi, '<img src="$1">')

        //去掉开头 结尾换行
        message = message.replace(/^<br.*?>(.*)/i, '$1')
        message = message.replace(/(.*)<br\/?>$/i, '$1')

        message = message.replace(/&nbsp;/img, ' ');

        //console.log('<br/>\n' + message + 'last=============================\n');

        return message;
    }

    this.resizeBody = function () {
        $(editorDoc).find('body').css({'text-align': 'left', 'margin': '0'});
    }

    this.setRightPadding = function (value) {
        $(editorDoc).find('body').css('padding-right', value)
    }

    this.setLayout = function () {
        $(editorDoc).find('body').width(container.width() - editorPadding);
    }

    this.clearInput = function () {
        $(editorDoc).find('body').html('&nbsp').html('');
    }

    this.setFontFamily = function (value) {
        $(editorDoc).find('body').css('font-family', value);
        fontStyle.fontFamily = value;
        iniConfig.setConfig('fontStyle', fontStyle);
    }

    this.setFontSize = function (value) {
        $(editorDoc).find('body').css('font-size', value + 'pt');
        fontStyle.fontSize = value + 'px';
        iniConfig.setConfig('fontStyle', fontStyle);
    }

    this.toHEXvalue = function (value) {
        var value = parseInt(value);
        value > 0 ? value.toString(16) : '00';
        if (value == 0) {
            return '00';
        } else if (value > 0 && value < 10) {
            return '0' + value.toString();
        } else if (value >= 10) {
            return  value.toString(16);
        }
    }

    this.setFontColor = function (value) {
        $(editorDoc).find('body').css('color', value);

        if (/rgb/i.test(value)) {
            var colors = (value).match(/(\d+)\s*,\s*(\d+)\s*,\s*(\d+)/i);
            var r = this.toHEXvalue(colors[1]);
            var g = this.toHEXvalue(colors[2]);
            var b = this.toHEXvalue(colors[3]);
            fontStyle.fontColor = r + g + b;
        } else {
            fontStyle.fontColor = value
        }
        iniConfig.setConfig('fontStyle', fontStyle);
        this.resizeBody();
    }

    this.setFontWeight = function (value) {
        $(editorDoc).find('body').css('font-weight', value);
        fontStyle.fontWeight = value;
        iniConfig.setConfig('fontStyle', fontStyle);
        this.resizeBody();
    };

    this.setFontItalic = function (value) {
        $(editorDoc).find('body').css('font-style', value);
        fontStyle.fontItalic = value;
        iniConfig.setConfig('fontStyle', fontStyle);
        this.resizeBody();
    };

    this.setFontUnderline = function (value) {
        $(editorDoc).find('body').css('text-decoration', value);
        fontStyle.fontUnderline = value;
        iniConfig.setConfig('fontStyle', fontStyle);
        this.resizeBody();
    };

    this.insertEmotion = function (src) {

        if (src != null) {
            var img = $('<img/>');
            img.attr('src', src + '?' + (new Date()));
            img.attr('times', 0);
            img.css({'display': 'inline_block', 'width': '46px', 'height': '46px'});
            var imgHTML = img[0].outerHTML;
            insertRangeHtml(editorWindow, imgHTML);

            if (ie6 || ie7) {
                img.one('load', function () {
                    richText.checkImgDisplay();
                })
            }
        }

        if (document.all) {
            richText.updateRange();
        }
    }

    // 检查图像显示
    this.checkImgDisplay = function () {
        $(editorDoc).find('body').find('img').each(function () {
            var times = parseInt($(this).attr('times'));
            if (times < 2) {
                $(this).width(46).height(46).show().focus();
                $(this).attr('src', $(this).attr('src') + '?' + (new Date()))
            }
            times++;
            $(this).attr('times', times);
        });
    }

    this.insertNewline = function () {
        insertRangeHtml(editorWindow, "<br/>");
    }

    this.getEditorBody = function () {
        return $(editorDoc).find(ie11 ? 'html' : 'body')[0]
    }

    this.getEditorWindow = function () {
        return editorWindow;
    }

    this.setLeaveMessageTemplate = function (string) {
        var string = string.replace(/\n/gi, '<br/>')
        var string = string.replace(/\n/gi, '')
        var string = string.replace(/\r/gi, '')

        if (ie10 && iniConfig.getConfig('wMode') !== 'big') {
            $(editorDoc).find('body').html(string).css('overflow-x', 'hidden')
        } else {
            $(editorDoc).find('body').html(string)
        }
    }

    //更新光标
    this.updateRange = function () {
        editoRange = editorWindow.document.selection.createRange();
    }

    this.run = function (container, width, height) {
        createEditor(container, width, height);
    }
}

//下拉菜单生成器
QYJSUtil.SelectCreator = function () {
    this.run = function (targetObj, listValue, listText) {
        if (targetObj && listValue instanceof  Array && listText instanceof  Array && listValue.length > 0 && listText.length == listValue.length) {

            for (var i = 0; i < listText.length; i++) {
                if (!listText[i]) {
                    continue;
                }
                targetObj.append('<option value="' + listValue[i] + '">' + listText[i] + '</option>')
            }
        }
    }
}


//表情选择器
QYJSUtil.CreateEmotion = function (emotion, iniConfig) {

    var img = [
        0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16,
        17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29,
        30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42,
        43, 44, 45, 46, 47, 48, 49, 50, 51
    ];

    var imgPath = iniConfig.getConfig('emotionImgPath');
    var emotionObj = emotion
    var emotionCreate = false;

    var tips = iniConfig.getConfig('emotionMapTip');

    this.run = function () {

        var leftPosition = 0;
        var topPosition = 0;

        for (var i = 0; i < img.length - 1; i++) {
            var div = $('<div></div>');
            var a = $('<a></a>');

            a.attr('href', '#');

            if (i % 11 == 0) {
                topPosition = i / 11;
            }

            leftPosition = (i % 11);

            var left_ = leftPosition * 32
            var top_ = topPosition * 32;
            var scroll_ = '-' + left_ + 'px -' + top_ + 'px'

            a.css('background-position', scroll_);
            if (tips) {
                var title = tips[i];
                a.attr('title', title);
                a.attr('alt', title);
            }

            a.attr('name', i + '.gif');
            div.append(a);
            emotionObj.append(div);
        }

        emotionCreate = true;
        this.hide();
    }

    this.toggle = function () {
        if (/none/i.test(emotionObj.css('display'))) {
            emotionObj.show();
            emotionObj.focus();
        } else {
            emotionObj.hide();
        }
    }

    this.hide = function () {
        emotionObj.hide();
    }

    this.getEmotionImg = function (value) {
        return imgPath + value;
    }

    this.getEmotionObj = function () {
        return   emotionObj.find('a');
    }

    this.css = function (css) {
        return emotionObj.css(css);
    }

}

//颜色生成器
QYJSUtil.ColorPicker = function (container, languageTemplate, iniConfig) {

    var languageTemplate = languageTemplate;
    var ColorHex = new Array('00', '33', '66', '99', 'CC', 'FF')
    var SpColorHex = new Array('FF0000', '00FF00', '0000FF', 'FFFF00', '00FFFF', 'FF00FF')

    var ColorPickerObj = $('#' + container);
    var min = iniConfig.getConfig('wMode');

    this.run = function () {
        var colorTable = ''
        /**
         for (var i = 0; i < 2; i++) {
         for (var j = 0; j < 6; j++) {

         colorTable += '<tr height=11 i="' + i + '" j="' + j + '" >'
         if (i == 0) {
         colorTable = colorTable + '<td width=11 style="cursor:pointer;background-color:#' + ColorHex[j] + ColorHex[j] + ColorHex[j] + '">'
         }
         else {
         colorTable = colorTable + '<td width=11 style="cursor:pointer;background-color:#' + SpColorHex[j] + '" >'
         }
         colorTable += '<td width=11 style="cursor:pointer;background-color:#000000" >'
         for (var k = 0; k < 3; k++) {
         for (var l = 0; l < 6; l++) {
         colorTable = colorTable + '<td width=11 style="cursor:pointer;background-color:#' + ColorHex[k + i * 3] + ColorHex[l] + ColorHex[j] + '" >'
         }
         }
         }
         }

         colorTable = '<table border="1" cellspacing="0" cellpadding="0" style="text-align:center;cursor:pointer;border-collapse:collapse;background-color: #ffffff" bordercolor="#000000" >'
         + '<tr><td colspan="21" align="center">' + languageTemplate.languageInterpret('点击拾取颜色') + '</td></tr>'
         + colorTable + '</table>';
         */
        colorTable += '<div class="colorPickTitle"><p align="center">' + languageTemplate.languageInterpret('点击拾取颜色') + '</p></div>'
            + '<div class="colorValue" style="background:#fe0000;cursor:pointer"></div>'
            + '<div class="colorValue" style="background:#fd7f06;cursor:pointer "></div>'
            + '<div class="colorValue" style="background:#008100;cursor:pointer "></div>'
            + '<div class="colorValue" style="background:#0080ca;cursor:pointer "></div>'
            + '<div class="colorValue" style="background:#07fbff;cursor:pointer "></div>'

            + '<div class="colorValue" style="background:#654946;cursor:pointer "></div>'
            + '<div class="colorValue" style="background:#807600;cursor:pointer "></div>'
            + '<div class="colorValue" style="background:#fc81ff;cursor:pointer "></div>'
            + '<div class="colorValue" style="background:#fc3e80;cursor:pointer "></div>'
            + '<div class="colorValue" style="background:#8200fe;cursor:pointer "></div>'

            + '<div class="colorValue" style="background:#000000;cursor:pointer "></div>'
            + '<div class="colorValue" style="background:#818181;cursor:pointer "></div>';

        ColorPickerObj.append(colorTable);
        ColorPickerObj.css({'position': 'absolute', 'overFlow': 'hidden', 'display': 'none'});
        colorObj = ColorPickerObj.find('div.colorValue');
    }

    this.setTop = function (value) {
        ColorPickerObj.css('top', parseInt(value))
    }

    this.setLeft = function (value) {
        ColorPickerObj.css('left', parseInt(value))
    }

    this.setWidth = function (value) {
        ColorPickerObj.css('width', parseInt(value))
    }

    this.toggle = function () {
        ColorPickerObj.toggle();
    }

    this.hide = function () {
        ColorPickerObj.hide();
    }

    this.getColorObj = function () {
        return  colorObj;
    }
    this.css = function (css) {
        return  ColorPickerObj.css(css);
    }
}

//用户评价
QYJSUtil.assess = function (assessBox, iniConfig, languageTemplate) {
    var assessBox = $('#' + assessBox);
    var iniConfig = iniConfig;
    var assess = this;
    var successMessage = languageTemplate.languageInterpret('感谢您的评价，我们将继续为您服务！');
    var noConsultedError = languageTemplate.languageInterpret('请咨询后再评价！');
    var lastAssessId = '';
    var assessContentCache = ''

    this.create = function () {
        var string = ''
            + '<span class="left"><strong> ' + languageTemplate.languageInterpret('请您对我们的服务进行评价') + '</strong></span>'
            + '<div class="right close"  style="width:17px; height:17px;clear: none; float:right"></div>'
            + '<br/>'
            + '<input name="rating5" type="radio" value="5" checked class="pj_radio" />' + languageTemplate.languageInterpret('非常满意') + '&nbsp;&nbsp;'
            + '<input name="rating5" type="radio" value="4" class="pj_radio" />' + languageTemplate.languageInterpret('比较满意') + '&nbsp; &nbsp;'
            + '<input name="rating5" type="radio" value="3" class="pj_radio" />' + languageTemplate.languageInterpret('一般') + '&nbsp;&nbsp;'
            + '<input name="rating5" type="radio" value="2" class="pj_radio" />' + languageTemplate.languageInterpret('比较差') + '&nbsp;&nbsp;'
            + '<input name="rating5" type="radio" value="1" class="pj_radio" />' + languageTemplate.languageInterpret('恶劣') + ' <br />'
            + '<textarea name="" cols="3" rows="" style="height:50px; width:372px; line-height:18px; margin:8px 0; padding:1px 3px"></textarea><br />'
            + '<span  name="" type="button" value="' + languageTemplate.languageInterpret('评价') + '" class="subAssess" >' + languageTemplate.languageInterpret('评价') + '<span>'
        assessBox.html(string);

        assessBox.bind('click', function (event) {
            event.stopPropagation();
        });
        assessBox.find('.close').bind('click',function (event) {
            assessBox.trigger('closeAssess');
            event.stopPropagation();
        }).hide().show()

        assessBox.find('.subAssess').bind('click',function (event) {
            assessBox.trigger('subAssess');
            event.stopPropagation();
        }).hide().show()
    }

    this.hide = function () {
        assessBox.hide();
    };

    this.show = function () {
        assessBox.show();
    };

    this.getAssess = function () {
        var assessContent = $.trim(assessBox.find('textarea').val());
        if (assessContent.length > 500) {
            alert(languageTemplate.languageInterpret('最多可以写入500个字；'))
            return;
        }

        if (assessContentCache == assessContent && lastAssessId) {
            return {'sameAssessError': 1};
        }

        var star = assessBox.find("input:checked").val();
        return {'content': assessContent, 'star': star, 'sameAssessError': 0, 'successMessage': successMessage, 'noConsultedError': noConsultedError, 'lastAssessId': lastAssessId};
    }

    this.clearInput = function () {
        assessBox.find('textarea').val('');
    }

    this.css = function (css) {
        return   assessBox.css(css);
    }

    this.saveLastAssessInfo = function (assessId, message) {
        assessContentCache = message
        lastAssessId = assessId;
    }
}

//公司信息面板
QYJSUtil.clerkCard = function (clerkLogo, clerkDesc, clerkContact, clerkAd, clerkCardPenelSwitchButton, iniConfig) {

    var clerkLogo = clerkLogo;
    var clerkDesc = clerkDesc;
    var clerkContact = clerkContact;
    var clerkAd = clerkAd;
    var switchButton = clerkCardPenelSwitchButton;
    var iniConfig = iniConfig;

    var clerkJobId = clerkContact.find('li.clerkJobId');
    var nickName = clerkContact.find('li.nickName');
    var clerkName = clerkContact.find('li.clerkName');
    var clerkTelphone = clerkContact.find('li.clerkTelphone');
    var clerkEmail = clerkContact.find('li.clerkEmail');
    var clerkQQ = clerkContact.find('li.clerkQQ');
    var clerkMSN = clerkContact.find('li.clerkMSN');
    var clerkWangWang = clerkContact.find('li.clerkWangWang');
    var clerkSkype = clerkContact.find('li.clerkSkype');
    var clerkAliWangWang = clerkContact.find('li.clerkAliWangWang');
    var language = iniConfig.getConfig('language');
    var ie6 = !-[1, ] && !window.XMLHttpRequest;

    //设置广告
    this.setAdertisment = function (img, redirectUrl) {
        var adverState = iniConfig.getConfig('adverState');

        if (parseInt(adverState) == 0) {
            clerkAd.html('').html("<a href='" + redirectUrl + "' target='_blank'><img   src ='" + img + "'/></a>");
            clerkAd.show()

            if (ie6) {
                clerkAd.focus();
            }
        } else {
            clerkAd.hide();
        }
    }

    //切换客服
    this.clerkInfoChange = function () {
        clerkContact.find('li').hide();
    }

    //设置LOGO
    this.setLogo = function (img, redirectUrl) {

        clerkLogo.html("<a href='" + redirectUrl + "' target='_blank'><img src ='" + img + "' border:none;'/></a>");

        var logoImg = clerkLogo.find('img');
        logoImg.hide();
        logoImg.one('load',function () {
            var logoWidth = parseInt(logoImg.width());
            var logoHeight = parseInt(logoImg.height());
            var newHeight = '';
            var newWidth = '';

            if (logoWidth > 150 && logoHeight > 150) {
                if (logoWidth > logoHeight) {
                    newHeight = ((logoHeight * 150) / logoWidth ).toFixed(0);
                    newWidth = 150;
                } else {
                    newWidth = ( ( logoWidth * 150) / logoHeight ).toFixed(0);
                    newHeight = 150;
                }

            } else if (logoWidth > 150 && logoHeight <= 150) {
                newWidth = 150;
                newHeight = ((logoHeight * 150) / logoWidth ).toFixed(0);

            } else if (logoHeight > 150 && logoWidth <= 150) {
                newHeight = 150;
                newWidth = ( ( logoWidth * 150) / logoHeight ).toFixed(0);
            }
            logoImg.width(newWidth).height(newHeight);

        }).show();

    }

    //设置简介
    this.setDes = function (desc) {

        clerkDesc.html(desc);
        if (ie6) {
            clerkDesc.focus();
        }
    }

    //设置工号
    this.setClerkJobId = function (info) {

        if (info) {
            clerkJobId.show();
            clerkJobId.find('span').eq(1).html('').html(info);
            if (ie6) {
                clerkJobId.focus();
            }
        }
    }

    //设置昵称
    this.setClerkNickName = function (info) {

        if (info) {
            nickName.show();
            nickName.find('span').eq(1).html('').html(info);

            if (ie6) {
                nickName.focus();
            }
        }
    }

    //设置名称
    this.setClerkName = function (info) {

        if (info) {
            clerkName.show();
            clerkName.find('span').eq(1).html('').html(info);

            if (ie6) {
                clerkName.focus();
            }
        }
    }

    //设置邮箱
    this.setClerkEmail = function (info) {

        if (info) {
            clerkEmail.show();
            clerkEmail.find('span').eq(1).html('').html(info);

            if (ie6) {
                clerkEmail.focus();
            }
        }
    }

    //设置电话
    this.setClerkTelphone = function (info) {

        if (info) {
            clerkTelphone.show();
            clerkTelphone.find('span').eq(1).html('').html(info);

            if (ie6) {
                clerkTelphone.focus();
            }
        }
    }

    //设置QQ
    this.setClerkQQ = function (info) {

        if (info) {
            var imageUrl = iniConfig.getConfig('qiyeQQImage');
            if (/^[4|8]00\d+$/.test(info)) {
                var link = 'http://bizapp.qq.com/webc.htm?new=0&sid=' + info + '&eid=&o=&q=7&ref='
            } else {
                var link = 'tencent://message/?uin=' + info + '&Site=&Menu=yes'
            }
            clerkQQ.show();
            clerkQQ.find('span').eq(1).html('').html('<a href="' + link + '"  target=blank >' + info + '</a>');
            clerkQQ.find('span').eq(0).html('<img  style="position: absolute;top:-1px;right:1px;"  src="' + imageUrl + '"/>').css({'position': 'relative'});

            if (ie6) {
                clerkQQ.focus();
            }
        }
    }

    //设置MSN
    this.setClerkMSN = function (info) {

        if (info) {
            clerkMSN.show();
            clerkMSN.find('span').eq(1).html('').html('<a href="msnim:chat?contact=' + info + '" target=blank>' + info + '</a> ');
            clerkMSN.find('span').eq(0).html('<img  style="position: absolute;top:-1px;right:-2px;" src="http://messenger.services.live.com/users/' + info + '/presenceimage?mkt=zh_CN"/>').css({'position': 'relative'});

            if (ie6) {
                clerkMSN.focus();
            }
        }
    }

    //设置淘宝旺旺
    this.setClerkWangWang = function (info) {

        if (info) {
            clerkWangWang.show();
            var link = 'http://www.taobao.com/webww/ww.php?ver=3&touid=' + encodeURIComponent(info) + '&siteid=cntaobao&status=2&charset=utf-8';
            clerkWangWang.find('span').eq(1).html('').html('<a href="' + link + '"  target=blank >' + info + '</a>');
            clerkWangWang.find('span').eq(0).html('<img  style="position: absolute;top:-1px; right:0px;"  ' +
                'src ="http://amos.alicdn.com/online.aw?v=2&uid=' + encodeURIComponent(info) + '&site=cntaobao&s=2&charset=utf-8"/>').css({'position': 'relative'});

            if (ie6) {
                clerkWangWang.focus();
            }
        }
    }

    //设置阿里旺旺
    this.setClerkALIWangWang = function (info) {

        if (info) {
            clerkAliWangWang.show();
            var link = 'http://amos.im.alisoft.com/msg.aw?v=2&uid=' + encodeURIComponent(info) + '&site=cnalichn&s=4&charset=UTF-8'
            clerkAliWangWang.find('span').eq(1).html('').html('<a href="' + link + '"  target=blank >' + info + '</a>');
            var wrap = $('<div></div>').css({"position": 'absolute', "top": '-4px', 'width': '23px', "height": '23px', 'overflow': 'hidden'})
            if (language == 'en') {
                wrap.css("left", '40px')
            } else if (language == 'russian') {
                wrap.css("left", '18px')
            } else {
                wrap.css("left", '8px')
            }
            var img = $('<img/>').attr('src', 'http://amos.im.alisoft.com/online.aw?v=2&uid=' + encodeURIComponent(info) + '&site=cnalichn&s=4&charset=UTF-8').appendTo(wrap)
            clerkAliWangWang.find('span').eq(0).append(wrap).css({'position': 'relative'});

            if (ie6) {
                clerkAliWangWang.focus();
            }
        }
    }

    this.setClerkSkype = function (info) {

        if (info) {
            clerkSkype.show();
            //var link = 'callto://' + info
            var link = 'skype:' + info + '?chat'
            clerkSkype.find('span').eq(1).html('').html('<a href="' + link + '"  target=blank >' + info + '</a>');
            clerkSkype.find('span').eq(0).html('<img  style="position: absolute;top:-1px;right:0px;"  src="http://mystatus.skype.com/smallicon/' + info + '"/>').css({'position': 'relative'});

            if (ie6) {
                clerkSkype.focus();
            }
        }
    }

    this.switchPanel = function () {

        if (switchButton.hasClass('index')) {
            this.hide();
        } else {
            this.show();
        }
    }

    this.show = function () {
        if (!switchButton.hasClass('index')) {
            (clerkLogo.parent()).show()
            clerkLogo.show()
            clerkDesc.show()
            clerkContact.show()
            switchButton.addClass('index')
        }
    }

    this.hide = function () {
        if (switchButton.hasClass('index')) {
            (clerkLogo.parent()).hide()
            clerkLogo.hide()
            clerkDesc.hide()
            clerkContact.hide()
            switchButton.removeClass('index')
        }
    }
}

//下拉菜单生成器
QYJSUtil.ImselectCreator = function (container, iniConfig) {
    var container = container;
    var iniConfig = iniConfig;
    var clerkQQ = container.find('li.clerkQQ');
    var clerkMSN = container.find('li.clerkMSN');
    var clerkWangWang = container.find('li.clerkWangWang');
    var clerkSkype = container.find('li.clerkSkype');
    var clerkAliWangWang = container.find('li.clerkAliWangWang');

    //切换客服
    this.clerkInfoChange = function () {
        container.find('li').hide();
        container.find('ul').children().removeClass('on');
    }

    this.show = function () {
        container.find('ul').children().removeClass('noBottomBorder');
        container.find('ul').children('.on').last().addClass('noBottomBorder');
        container.show().hide().show();
    }

    this.hide = function () {
        container.hide()
    }

    //设置QQ
    this.setClerkQQ = function (info) {

        if (info) {
            var imageUrl = iniConfig.getConfig('qiyeQQImage');
            if (/^[4|8]00\d+$/.test(info)) {
                var link = 'http://bizapp.qq.com/webc.htm?new=0&sid=' + info + '&eid=&o=&q=7&ref=';
            } else {
                var link = 'tencent://message/?uin=' + info + '&Site=&Menu=yes'
            }
            clerkQQ.show().addClass('on');
            clerkQQ.find('span').eq(1).attr('links', link);
            clerkQQ.find('span').eq(0).html('<img style="position: absolute; right:17px;" src="' + imageUrl + '"/>').css({'position': 'relative', "right": '0px'});
            clerkQQ.focus();
        }
    }

    //设置MSN
    this.setClerkMSN = function (info) {

    }

    //设置淘宝旺旺
    this.setClerkWangWang = function (info) {

        if (info) {
            clerkWangWang.show().addClass('on');
            var link = 'http://www.taobao.com/webww/ww.php?ver=3&touid=' + encodeURIComponent(info) + '&siteid=cntaobao&status=2&charset=utf-8';
            clerkWangWang.find('span').eq(1).attr('links', link);
            clerkWangWang.find('span').eq(0).html('<img ' +
                'src ="http://amos.alicdn.com/online.aw?v=2&uid=' + encodeURIComponent(info) + '&site=cntaobao&s=2&charset=utf-8"/>').css({'position': 'relative', 'left': '-10px'});
            clerkWangWang.focus();
        }
    }

    //设置阿里旺旺
    this.setClerkALIWangWang = function (info) {

        if (info) {
            clerkAliWangWang.show().addClass('on');
            var link = 'http://amos.im.alisoft.com/msg.aw?v=2&uid=' + encodeURIComponent(info) + '&site=cnalichn&s=4&charset=UTF-8';
            clerkAliWangWang.find('span').eq(1).attr('links', link);
            var wrap = $('<div></div>').css({"position": 'absolute', "left": '2px', "top": '3px', 'width': '23px', "height": '23px', 'overflow': 'hidden'});
            var img = $('<img/>').attr('src', 'http://amos.im.alisoft.com/online.aw?v=2&uid=' + encodeURIComponent(info) + '&site=cnalichn&s=4&charset=UTF-8').appendTo(wrap);
            clerkAliWangWang.find('span').eq(0).append(wrap).css({'position': 'relative', 'left': '-8px'});
            clerkAliWangWang.focus();
        }
    }

    this.setClerkSkype = function (info) {

        if (info) {
            clerkSkype.show().addClass('on');
            var link = 'callto://' + info;
            clerkSkype.find('span').eq(1).attr('links', link)
            clerkSkype.find('span').eq(0).html('<img  style="position: absolute;top:5px;left:0px;"  src="http://mystatus.skype.com/smallicon/' + info + '"/>').css({'position': 'relative', 'left': '0px'});
            clerkSkype.focus();
        }
    }

}
//文件上传面板
QYJSUtil.UploadFilePanel = function (fileUploadPanelObj, fileUploadPanelSwitchButtonObj, itemCreatorObj) {

    //切换按钮
    var switchButton = fileUploadPanelSwitchButtonObj;

    //文件上传信息面板
    var fileUploadPanel = fileUploadPanelObj;

    //上传文件项目生成器
    var itemCreator = itemCreatorObj;

    //上传文件列表
    var uploadFileList = {};

    this.switchPanel = function () {
        if (switchButton.hasClass('index')) {
            this.hide();

        } else {
            this.show()
        }
    }

    this.show = function () {
        fileUploadPanel.show()
        switchButton.addClass('index')
    }

    this.hide = function () {
        fileUploadPanel.hide()
        switchButton.removeClass('index')
    }

    //增加文件传输项
    this.addFileUpload = function (string) {

        //item:id ,obj
        var item = itemCreator.createFileUploadItem(string);
        var dom = item.getDom();
        var id = item.getId();

        fileUploadPanel.append(dom);
        uploadFileList[id] = item;
    }

    //更新上传进度
    this.updateFileUploadStatus = function (string) {
        var param = QYJSUtil.QYmessagcoder.decodeUploadFileStatusXML(string);

        if (uploadFileList[param['id']]) {
            uploadFileList[param['id']].updateUpdate(param['uploadSize'], param['size'], param['percent']);
        }
    }

    //上传成功
    this.updateFileUploadSuccess = function (id) {
        if (uploadFileList[id]) {
            uploadFileList[id].updateFileUploadSuccess();
        }
    }

    //上传错误
    this.fileUploadError = function (id, errorCode, errorId) {
        if (uploadFileList[id]) {
            uploadFileList[id].fileUploadError(errorCode, errorId);
        }
    }

    //删除上传文件项目
    this.deleteUpdateFileUpload = function (id) {
        if (uploadFileList[id]) {
            uploadFileList[id].cancel();
        }
    }
}

//上传文件项目生成器
QYJSUtil.UploadFileItemCreator = function (messageInterface, languageTemplate) {

    //面板管理接口
    var fileUploadPanel;

    var messageInterface = messageInterface;
    var languageTemplate = languageTemplate;

    //文件项目生成器
    this.createFileUploadItem = function (param) {

        var string = '<div class="file_tp">'
            + ' <dl class="cls">'
            + ' <dt class="left" style="width:42px;; heigth:24px;"><img src="' + param.icon + '"></dt>'
            + ' <dd class="left" style="width:130px; overflow:hidden; height:36px;"> '
            + languageTemplate.languageInterpret('正在上传文件') + '<br> ' + param.name + '</dd>'
            + ' </dl>'
            + ' <div class="file_tp_pr" style="position: relative;"><p style="height: 16px; background: #72d1fb;width: 0%; float:left;"></p>'
            + ' <p style="position: absolute; top:0px;left:0px;width:173px;text-align:center"> '
            + languageTemplate.languageInterpret('正在上传') + ': 0%</p></div>'
            + ' <div class="file_info cls"><span class="left size">0KB/0KB</span> <span style="padding-left:10px;float:left;" class="uploadSpeed">0KB</span> <span class="right"><a href="#" class="delete" rel="' + param['id'] + '">'
            + languageTemplate.languageInterpret('取消') + '</a></span></div>'
            + ' </div> ';

        var dom = $(string);
        return  new (QYJSUtil.UploadFileItem)(dom, param, fileUploadPanel, messageInterface, languageTemplate);
    }

    //添加面板管理接口
    this.fileUploadPanel = function (fileUploadPanelObj) {
        fileUploadPanel = fileUploadPanelObj;
    }
}
//文件上传项目
QYJSUtil.UploadFileItem = function (itemObj, param, fileUploadPanelObj, messageInterface, languageTemplate) {

    var item = itemObj;
    var param = param;
    var fileUploadPanel = fileUploadPanelObj;
    var messageInterface = messageInterface;
    var startTime = Math.round(new Date().getTime() / 1000);
    var languageTemplate = languageTemplate;
    var uploadCompleted = false;
    var firstUpdateLoadedData = true;
    var uploadSuccessFanilly = false;
    var aDelete;

    (aDelete = item.find('.right').find('.delete')).bind('click', function () {
        fileUploadPanel.deleteUpdateFileUpload(this.getAttribute('rel'));
    })

    this.getId = function () {
        return param.id;
    }
    this.getDom = function () {
        return item;
    }

    this.cancel = function () {
        if (uploadCompleted) {
            item.remove();
            this.eventRemove();
        } else {
            messageInterface.cancelUploadFile(param['id']);
            this.cancelUploadingFile();
        }
        return true;
    }

    this.unitExchange = function (number) {
        var numberString = '';
        var number = parseInt(number);

        if (isNaN(number)) {
            numberString = '0'
        } else {
            if (number >= 1024 * 1024 * 1024) {

                numberString = (number / (1024 * 1024 * 1024)).toFixed(2) + 'G';

            } else if (number < 1024 * 1024 * 1024 && number >= 1024 * 1024) {

                numberString = (number / (1024 * 1024 )).toFixed(2) + 'M';

            } else if (number < 1024 * 1024 && number >= 1024) {

                numberString = (number / 1024 ).toFixed(2) + 'KB';

            } else {
                numberString = number.toFixed(2) + 'B';
            }
        }
        return numberString;
    }

    this.updateUpdate = function (uploadSize, size, percent) {

        var uploadSpeed = (param['totalSize'] / Math.round(new Date().getTime() / 1000) - startTime).toFixed(2);

        var title = item.find('.cls').find('dd.left')
        var bar = item.find('.file_tp_pr');
        var uploadStatus = item.find('.file_info').find('.size');
        var uploadSpeed_ = item.find('.file_info').find('.uploadSpeed');
        var aDelete = item.find('.right').find('.delete');

        if (/**(uploadSize >= param.totalSize && !firstUpdateLoadedData) || **/uploadSuccessFanilly) {
            title.html(languageTemplate.languageInterpret('上传成功') + '<br/>' + param.name)
            bar.hide();
            uploadStatus.html(languageTemplate.languageInterpret('大小') + '：' + this.unitExchange(size));
            uploadSpeed_.html('');
            aDelete.html(languageTemplate.languageInterpret('清除'));
            uploadCompleted = true;
        }
        else {
            bar.find('p').eq(0).css('width', (uploadSize * 100 / size).toFixed(2) + '%');
            (bar.find('p').eq(1)).html(languageTemplate.languageInterpret('正在上传') + ': ' + (uploadSize * 100 / size).toFixed(2) + '%');
            uploadStatus.html(this.unitExchange(uploadSize) + '/' + this.unitExchange(size));
            var time = Math.round(new Date().getTime() / 1000) - parseInt(startTime)
            var speed = this.unitExchange(uploadSize / time);
            uploadSpeed_.html(speed);
            aDelete.html(languageTemplate.languageInterpret('取消'));
        }
        firstUpdateLoadedData = false;
    }

    this.fileUploadError = function (errorCode, errorId) {
        uploadCompleted = true;
        var title = item.find('.cls').find('dd.left')
        var bar = item.find('.file_tp_pr');

        var uploadSpeed_ = item.find('.file_info').find('.uploadSpeed');
        var aDelete = item.find('.right').find('.delete');

        title.html(languageTemplate.languageInterpret('上传失败') + '<br/>' + param.name)
        bar.remove();
        aDelete.html(languageTemplate.languageInterpret('清除'));
        clearInterval(errorId)
    }

    this.updateFileUploadSuccess = function () {
        uploadSuccessFanilly = true;
    }

    this.cancelUploadingFile = function () {
        var title = item.find('.cls').find('dd.left')
        var bar = item.find('.file_tp_pr');
        var uploadStatus = item.find('.file_info').find('.size');
        var uploadSpeed_ = item.find('.file_info').find('.uploadSpeed');
        var aDelete = item.find('.right').find('.delete');

        title.html(languageTemplate.languageInterpret('上传已取消') + '<br/>' + param.name)
        bar.remove();
        uploadStatus.html(languageTemplate.languageInterpret('大小') + '：' + this.unitExchange(param['totalSize']));
        uploadSpeed_.html('');
        aDelete.html(languageTemplate.languageInterpret('清除'));
        uploadCompleted = true;
    }

    this.eventRemove = function () {
        (item.find('.right').find('.delete')).unbind('click');
    }
}

//自动缩放图片
QYJSUtil.reSizeImg = function (imgObj, targetWidth, wMode, isTitle) {

    if (imgObj.attr('originWidth') == 0 || imgObj.attr('originWidth') == '' || imgObj.attr('originHeight') == 0 || imgObj.attr('originHeight') == '') {
        if (imgObj.width() == 0 || imgObj.width() == '') {
            return;
        }
        imgObj.attr('originWidth', imgObj.width());
        imgObj.attr('originHeight', imgObj.height());
    }

    var ie6 = (!-[1, ] && !window.XMLHttpRequest);
    var originWidth = imgObj.attr('originWidth');
    var originHeight = imgObj.attr('originHeight');

    if (ie6) {
        var chatWidth = targetWidth - 50;

    } else {
        var chatWidth = targetWidth - 35;
    }

    if (wMode == 'mini' && isTitle) {
        chatWidth += 20;
    }


    if (originHeight > 0 && originWidth > 0) {
        if (chatWidth > originWidth) {

            imgObj.width(originWidth);
            imgObj.height(originHeight);

        } else {
            imgObj.width(chatWidth);
            imgObj.height((originHeight * chatWidth / originWidth).toFixed(0));
        }
    }

}

QYJSUtil.inArray = function (value, arrayObj) {

    for (var i = 0; i < arrayObj.length; i++) {
        if (value == arrayObj[i]) {
            return true;
        }
    }
    return false;
}

QYJSUtil.objAttrExits = function (attr, obj) {

    for (var x in obj) {
        if (x == attr) {
            return true;
        }
    }
    return false;
}

//  保存网页
QYJSUtil.buidWebPage = function (title, content) {
    var doc = '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">  '
        + '<html xmlns="http://www.w3.org/1999/xhtml">'
        + '<head>'
        + '<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />'
        + '<title>' + title
        + '</title>'
        + '</head>'
        + '<body  style="font-size:13px;color:#38476c;">'
        + content
        + '</body>'
        + '</html>'
    return doc;
}

//截屏插件
QYJSUtil.iniCatchScreenPlus = function (iniConfig, languageTemplate) {
    var catchScreenParam = iniConfig.getConfig('catchScreenParam');

    if (QYJSUtil.browsers.isie) {
        var plusCheck = false;

        try {
            new ActiveXObject('CCWEBCTRL.CCWebCtrlCtrl.1');
            plusCheck = true;
        }
        catch (e) {
            var urlCheck = './catchScreenPlusInstaller.php?websiteid=' + iniConfig.getConfig('websiteId') + '&clienturl=' + encodeURIComponent(iniConfig.getConfig('clientUrl'));

            var minWidth = iniConfig.getConfig('windowMinWidth') + 150;
            var minHeight = iniConfig.getConfig('windowMinHeight') + 250;

            window.open(urlCheck + '&winmode=0', '_blank', "toolbar=no,scrollbars=yes,menubar=no,status=no,resizable=yes,location=no,width=" + minWidth + ",height=" + minHeight + ",top=100,left=200");
        }

        if (plusCheck) {
            $('#ccweb').html('<OBJECT  style="visibility: hidden;"  ID="CCWebCtrl" WIDTH=0 HEIGHT=0 CLASSID="CLSID:F35358A3-C22A-42CE-AAEE-87FEBE4C4AAD" CODEBASE="CCWebCtrl.cab#version=' + catchScreenParam.version + '"></OBJECT>');
            var CCWebCtrl = $('#CCWebCtrl')[0];
            CCWebCtrl.setUploadRootURL = catchScreenParam.activex;
            CCWebCtrl.CatchScreen();
        }
    } else {
        alert(languageTemplate.languageInterpret('当前浏览器不支持截图功能，您可以通过QQ截图后发送给客服，也可以使用IE浏览器继续咨询。'));
    }
}

//文件下载
QYJSUtil.downLoadFile = function (file) {

    var iframe = $('<iframe/>');
    iframe.attr('src', file);
    iframe.css('display', 'none');
    $('body').prepend(iframe);
    setTimeout(function () {
        iframe.remove();
    }, 10000)
}


//界面翻译
QYJSUtil.languageInterpretHTML = function (languageTemplate) {

    $("label[complete='n']").each(function () {
        var txt = $(this).attr('interpret')
        var interpretTxt = languageTemplate.languageInterpret(txt);
        $(this).text(interpretTxt).attr('complete', 'y');
    });

    $("span[complete='n']").each(function () {
        var txt = $(this).attr('interpret')
        var displayText = $(this).attr('displayText');
        var interpretTxt = languageTemplate.languageInterpret(txt);

        if (displayText == 'n') {
            $(this).attr('title', interpretTxt).attr('alt', interpretTxt).attr('complete', 'y');
        } else {
            $(this).text(interpretTxt).attr('complete', 'y');
        }
    });

    $("img[complete='n']").each(function () {
        var txt = $(this).attr('interpret')
        var interpretTxt = languageTemplate.languageInterpret(txt);

        $(this).attr('alt', interpretTxt).attr('title', interpretTxt).attr('complete', 'y');
    });

    $("li[complete='n']").each(function () {
        var txt = $(this).attr('interpret')
        var interpretTxt = languageTemplate.languageInterpret(txt);

        $(this).attr('alt', interpretTxt).attr('title', interpretTxt).attr('complete', 'y');
    });

}

//整理截屏文件地址
QYJSUtil.getCatchScreenPic = function (path, iniConfig) {
    var path = jQuery.trim(path);
    path = path.replace(/(\r|\n)/img, '');

    if (/(.*?\.jpg)(.+)/.test(path)) {
        path = path.replace(/(.*?\.jpg)(.+)/, '$1');
    }

    if (/0$/.test(path)) {
        path = path.replace(/0$/, '');
    }

    var catchScreenPic = $('<div>');
    $('body').prepend(catchScreenPic);
    catchScreenPic.hide();
    catchScreenPic.html('').html($('<img src="' + path + '" />'));

    setTimeout(function () {
        catchScreenPic.remove();
    }, 5000)

    var fontStyle = iniConfig.getConfig('fontStyle');
    return [fontStyle, catchScreenPic.html()];

}

//生成文件消息HTML
QYJSUtil.buildDownLoadFileToHTML = function (fileName, fileNameNotice, fileUrl, title, downloadNotice, iniConfig) {
    var fileDownloadAddr = iniConfig.getConfig('fileDownloadAddr');

    var downloadUrl = fileDownloadAddr + '?file=' + encodeURIComponent(fileUrl) + '&fileName=' + QYJSUtil.Url.encode(fileName);

    var download = '<p class="textIndent"> ' + fileNameNotice + '<br/>' + '<a  href="' + '#' + '"  onclick="javascript:chat.downloadFile(\'' + downloadUrl + '\')">' + downloadNotice + '</a></p>';
    return  download;
}

//生成 机器人 欢迎词
QYJSUtil.buildRobotWelcomeWords = function (img, text) {
    var message = "<p><table cellpadding='0' cellspacing='0' border='0'><tr><td><img src='" + img + "' originwidth='100' originheight='100' style='width:100px; height:100px;'/></td><td style='padding-left: 10px;'>" + text + "</td></tr></table></p>";
    return message
}


//js php 双向url字符 简单 加密 解密
QYJSUtil.Url = {

    // public method for url encoding
    encode: function (string) {
        return escape(this._utf8_encode(string));
    },

    // public method for url decoding
    decode: function (string) {
        return this._utf8_decode(unescape(string));
    },

    // private method for UTF-8 encoding
    _utf8_encode: function (string) {
        string = string.replace(/\r\n/g, "\n");
        var utftext = "";

        for (var n = 0; n < string.length; n++) {

            var c = string.charCodeAt(n);

            if (c < 128) {
                utftext += String.fromCharCode(c);

            } else if ((c > 127) && (c < 2048)) {
                utftext += String.fromCharCode((c >> 6) | 192);
                utftext += String.fromCharCode((c & 63) | 128);
            } else {
                utftext += String.fromCharCode((c >> 12) | 224);
                utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                utftext += String.fromCharCode((c & 63) | 128);
            }
        }
        return utftext;
    },

    // private method for UTF-8 decoding
    _utf8_decode: function (utftext) {
        var string = "";
        var i = 0;
        var c = 0;
        var c1 = 0;
        var c2 = 0;
        var c3;

        while (i < utftext.length) {

            c = utftext.charCodeAt(i);

            if (c < 128) {
                string += String.fromCharCode(c);
                i++;
            } else if ((c > 191) && (c < 224)) {
                c2 = utftext.charCodeAt(i + 1);
                string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
                i += 2;
            } else {
                c2 = utftext.charCodeAt(i + 1);
                c3 = utftext.charCodeAt(i + 2);
                string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
                i += 3;
            }
        }
        return string;
    }
}

//标题栏
QYJSUtil.setDocumentTitle = function (documentTitle) {
    documentTitle = documentTitle.replace(/\\\'/gi, '\'');
    documentTitle = documentTitle.replace(/\\\"/gi, '"');
    documentTitle = documentTitle.replace(/\\\\/gi, '\\');
    window.document.title = documentTitle;
}

//浮动广告
QYJSUtil.floatAdvertisment = function (adUrl, adImage, adBgColor, container) {

    var adUrl = adUrl;
    var adImage = adImage;
    var container = container;
    var adBgColor = adBgColor
    var created = false

    this.hide = function () {
        container.hide()
    }

    this.show = function () {

        if (created == false) {
            this.build()
        }
        container.show()
    }

    this.build = function () {

        var html = "<img id='floatAdvertisment' src='" + adImage + "'>"
        html += "<img id='floatAdvertismentCloseButton' src='/vclient/chat/assets/images/close.gif'>";
        container.html(html).show().css('background-color', adBgColor)
        created = true
    }

    this.openWindow = function () {
        if (adUrl) {
            window.open(adUrl, '__blank');
        }
    }
}

