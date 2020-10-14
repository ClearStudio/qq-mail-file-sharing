// ==UserScript==
// @name         QQ邮箱文件中转站分享
// @namespace    http://clear.studio
// @version      0.5
// @description  在QQ邮箱的文件中转站中显示文件分享按钮
// @author       Kytrun
// @match        *://mail.qq.com/cgi-bin/*
// @require      https://cdn.jsdelivr.net/npm/jquery/dist/jquery.min.js
// ==/UserScript==

(function () {
    'use strict';
    var $ = window.$;
    $(function () {
        var iframe = $('iframe[allowfullscreen]')[0];
        var getPrm = function (url, par) {
            var urlsearch = url.split('?');
            var pstr = urlsearch[1].split('&');
            for (var i = pstr.length - 1; i >= 0; i--) {
                var tep = pstr[i].split("=");
                if (tep[0] == par) {
                    return tep[1];
                }
            }
            return (false);
        };
        var fileBtnText = '文件中转站';
        var fileBtn;
        $("a").each(function () {
            if ($(this).text().match(fileBtnText)) {
                fileBtn = this;
            }
        });

        $(fileBtn).click(function () {
            setTimeout(function () {
                $(iframe).ready(function(){
                    var iframeDocument = iframe.contentWindow.document;
                    var downloadBtns = $(iframeDocument).find('a.download');
                    $(downloadBtns).each(function () {
                        var li = $(this).parent();
                        var k = getPrm(this.href, 'k');
                        var code = getPrm(this.href, 'code');
                        var shareLink = 'https://iwx.mail.qq.com/ftn/download?func=3&key=' + k + '&code=' + code + '&k=' + k;
                        var downLink = 'https://iwx.mail.qq.com/ftn/download?func=4&key=' + k + '&code=' + code + '&k=' + k;
                        var shareBtn = '<a class="ft_i_action send" target="_blank" href="' + shareLink + '" hidefocus><b style="margin: 5px;">↪</b>分享</a>';
                        var downBtn = "<a onclick='prompt(&quot;提取文件直链&quot;,&quot;" + downLink + "&quot;)'><b style='margin: 5px;'>↓</b>直链</a>";
                        li.append(shareBtn);
                        li.append(downBtn);
                    })
                })
            }, 3000);
        });
    });
})();
