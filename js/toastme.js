/*
 Toast notification popup jQuery plugin
 (c) 2016 Nupin Mathew <nupindev@gmail.com>
 License: MIT
*/
$(function () {
    /*Method to show a toast notification like popup with a message which will be closed after a fixed time*/
    $.fn.showToast = function (options) {
        var defaults = {
            message: 'This is a toast notification!',
            duration: 1500,
            mode: 'info'
        };
        var settings = $.extend({}, defaults, options);
        var self = this;
        var margin = 100;
        $(self).css("width", "auto");
        $(self).text(settings.message);
        var windowWidth = window.innerWidth;
        var toastWidth = $(self).innerWidth() + margin;
        if (toastWidth >= windowWidth) {
            toastWidth = windowWidth - margin;
            $(self).css("width", toastWidth);
        }
        else {
            toastWidth = $(self).innerWidth();
        }
        var left = (windowWidth - toastWidth) / 2.0;
        var leftInPercentage = left * 100 / windowWidth;
        $(self).css("left", leftInPercentage + "%");
        $(self).fadeIn(400);
        $(self).removeClass("success warning error");
        if (settings.mode == "success") {
            $(self).addClass('success');
        } else if (settings.mode == "warning") {
            $(self).addClass('warning');
        } else if (settings.mode == "error") {
            $(self).addClass('error');
        }
        setTimeout(function () {
            $(self).fadeOut(600);
        }, settings.duration);
    };
});