;
(function(win, doc, callback) {
    'use strict';
    callback = callback || function() {};

    function detach() {
        if (doc.addEventListener) {
            doc.removeEventListener('DOMContentLoaded', completed);
        } else {
            doc.detachEvent('onreadystatechange', completed);
        }
    }

    function completed() {
        if (doc.addEventListener || event.type === 'load' || doc.readyState === 'complete') {
            detach();
            callback(window, window.jQuery);
        }
    }

    function init() {
        if (doc.addEventListener) {
            doc.addEventListener('DOMContentLoaded', completed);
        } else {
            doc.attachEvent('onreadystatechange', completed);
        }
    }
    init();
})(window, document, function(win, $) {
    var wow = function wow() {
        var $window = $(window);
        var $document = $(document);
        var $htmlbody = $('html,body');
        var cachedWidth = $(window).width();
        var targetId = null;
        var winW = function() {
            return window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth
        }
        var scrollWidth = function scrollWidth() {
            var scroll = 0;
            var scrollSize = 0;
            $('body').append("<div class='scollwrap' style='position:fixed;top:0; left:0; z-index:10; width:300px; height: 300px; overflow:auto; border: 1px solid blue;'><div style='height:500px; background:#ccc;'></div></div>")
            scroll = $('.scollwrap').width() - $('.scollwrap').find('div').width()
            scrollSize = $window.width() + scroll;
            $('.scollwrap').remove();
            return scrollSize
        };
        var device = function device() {
            var filter = "win16|win32|win64|mac|macintel";
            if (navigator.platform) {
                if (0 > filter.indexOf(navigator.platform.toLowerCase())) {
                    return "mobile"
                } else {
                    return "pc"
                }
            }
        };
        var wow_info_intro = function wow_info_intro() {
            var $kv_info = $('.kv_info');
            var $intro = $('.intro');
            $kv_info.on('click', '.d-item a', function(e) {
                var $this = $(this);
                var idx = $this.index('.kv_info_inner a');
                var barH = winW() > 768 ? $('.product-anchor-nav-nonprice-jsWrap').height() : $('.product-anchor-nav-nonprice-mo-jsWrap').height();
                if ($this.closest('li').hasClass('active')) {
                    return !1
                }
                targetId = $intro.find('.intro-obj-layer').find('.brightcove-con > .brightcove-cell').eq(idx).find('.vjs-tech').parent().attr('id');
                wow_video_play(targetId);
                $this.closest('.d-item').addClass('active').siblings().removeClass('active');
                $intro.find('.intro-obj-layer').show().find('.brightcove-con > .brightcove-cell').removeClass('active').eq(idx).addClass('active');
                $htmlbody.stop().animate({
                    scrollTop: $intro.offset().top - barH
                }, 500, function() {
                    $kv_info.find('.intro-obj-layer .close').focus()
                });
                return !1
            });
            $intro.on('click', '.intro-obj-layer .close', function(e) {
                var currentVdo = $intro.find('.brightcove-con > .active .vjs-tech').parent().attr('id');
                var targetIdx = $intro.find('.brightcove-con > .active').index();
                videojs(currentVdo).currentTime(0).pause();
                $('.video-js').removeClass('video-on');
                $intro.find('.intro-obj-layer').hide().find('.brightcove-con .brightcove-cell').removeClass('active');
                $kv_info.find('.kv_info_inner .active').removeClass('active');
                if (!($kv_info.find('.intro-obj-layer .close').hasClass('is-focus'))) {
                    $kv_info.find('.kv_info_inner li').eq(targetIdx).find('a').focus()
                }
                return !1
            });
            $kv_info.on('keydown', '.d-item a', function(e) {
                if (e.keyCode === 13) {
                    $intro.find('.intro-obj-layer .close').addClass('is-focus')
                }
            });
            $intro.on('keydown', '.intro-obj-layer .close', function(e) {
                if (e.keyCode === 13) {
                    $kv_info.find('.d-item.active a').addClass('is-focus')
                }
            })
        };
        var wow_info_slider = function wow_info_slider() {
            var $wow_info = $('.chef-slide-box');
            var $play = $('.wow-info__btn .play');
            var $stop = $('.wow-info__btn .pause');
            $wow_info.slick({
                autoplay: !0,
                dots: !0,
                appendDots: $('.wow-info__dot'),
                prevArrow: $('.chef-slide-arrow-prev'),
                nextArrow: $('.chef-slide-arrow-next')
            });
            $window.on('resize', function() {
                if ($wow_info.hasClass('slick-initialized')) {
                    $wow_info.slick('unslick')
                }
                $wow_info.slick({
                    autoplay: !0,
                    dots: !0,
                    appendDots: $('.wow-info__dot'),
                    prevArrow: $('.chef-slide-arrow-prev'),
                    nextArrow: $('.chef-slide-arrow-next')
                })
            })
            $play.hide();
            $document.on('click', '.wow-info__btn .pause', function() {
                $wow_info.slick('slickPause');
                $stop.hide();
                $play.show()
            }).on('click', '.wow-info__btn .play', function() {
                $wow_info.slick('slickPlay');
                $play.hide();
                $stop.show()
            })
        };
        var wow_info_inside = function wow_info_inside() {
            var $wow_inside = $('.wow-inside__slider');
            var wow_inside_modal = function wow_inside_modal() {
                $('.wow-inside__modal').addClass('wow-inside__modal--open')
            };
            $document.on('click', '.wow-inside__point a', function() {
                var $this = $(this);
                $('.wow-inside__point a').attr('tabindex', -1);
                $this.addClass('active');
                if ($wow_inside.hasClass('slick-initialized')) {
                    $wow_inside.slick('unslick')
                }
                $wow_inside.slick({
                    initialSlide: parseInt($this.attr('data-index')),
                    fade: !0,
                    cssEase: 'linear',
                    prevArrow: $('.chef-04-pop-prev'),
                    nextArrow: $('.chef-04-pop-next')
                });
                $wow_inside.on('beforeChange', function(event, slick, currentSlide, nextSlide) {
                    $('.wow-inside__point a').removeClass('active');
                    $('.chef-wave-point' + (nextSlide + 1) + '').addClass('active')
                })
                wow_inside_modal();
                setTimeout(function() {
                    if ($('.wow-inside__point a').lengtn == parseInt($this.attr('data-index')) + 1) {
                        $('.chef-04-pop-prev').focus()
                    } else {
                        $('.chef-04-pop-next').focus()
                    }
                }, 300)
                return !1
            }).on('click', '.chef-04-pop-close', function() {
                $('.wow-inside__point a').attr('tabindex', '');
                $('.wow-inside__modal').removeClass('wow-inside__modal--open');
                $('.wow-inside__point a').removeClass('active');
                return !1
            })
        };
        var wow_info_function = function wow_info_function() {
            var $wow_function = $('.feature_slider');
            if (device() == 'pc' && scrollWidth() > 768) {
                $wow_function.slick({
                    infinite: !1,
                    slidesToShow: 3,
                    prevArrow: $('.chef06-prev'),
                    nextArrow: $('.chef06-next')
                })
            }
            $window.on('resize', function() {
                var newWidth = $(window).width();
                if (scrollWidth() > 768 && device() == 'pc') {
                    if ($wow_function.hasClass('slick-initialized')) {
                        $wow_function.slick('unslick')
                    }
                    $wow_function.slick({
                        infinite: !1,
                        slidesToShow: 3,
                        prevArrow: $('.chef06-prev'),
                        nextArrow: $('.chef06-next')
                    })
                } else {
                    if ($wow_function.hasClass('slick-initialized')) {
                        $wow_function.slick('unslick')
                    }
                }
            })
        };
        var wow_info_video = function wow_info_video() {
            var video_wrap = $('.chef-pc-movie');
            var video_arr = [];
            var wow_video_set = function wow_video_set(callback) {
                $('.play_btn').hide();
                $.each(video_wrap, function(i, e) {
                    $(e).addClass('video--' + i + '');
                    $(e).find('.play_btn').attr('data-target', 'video--' + i + '');
                    video_arr.push({
                        target: 'video--' + i + '',
                        top: $(e).offset().top,
                        bottom: $(e).offset().top + $(e).outerHeight()
                    })
                });
                return callback()
            };
            var wow_video_play = function wow_video_play(target) {
                target = target.filter(function(e) {
                    if (e != undefined) {
                        return e
                    }
                });
                var wow_video_stop = function wow_video_stop(callback) {
                    $.each(video_wrap.find('video'), function(i, e) {
                        $(e)[0].pause()
                    });
                    return callback()
                };
                var wow_video_start = function wow_video_start() {
                    target.forEach(function(e) {
                        if (!$('.' + e + '').find('video').hasClass('state--play')) {
                            $('.' + e + '').find('.vCover').css({
                                'display': 'none',
                                'opacity': 0
                            });
                            var isPlaying = $('.' + e + '').find('video')[0].currentTime > 0 && !$('.' + e + '').find('video')[0].paused && !$('.' + e + '').find('video')[0].ended && $('.' + e + '').find('video')[0].readyState > 2;
                            if (!isPlaying) {
                                if ($('.' + e + '').find('video')[0].readyState) {
                                    $('.' + e + '').find('video')[0].play()
                                }
                            }
                        }
                        $('.' + e + '').find('video')[0].onended = function() {
                            $('.' + e + '').find('video').addClass('state--play');
                            $('.' + e + '').find('.play_btn').show()
                        }
                    })
                };
                wow_video_stop(wow_video_start)
            };
            var target_copy = [];
            var target_set = !0;
            var wow_video_check = function wow_video_check() {
                var window_top = $window.scrollTop();
                var window_bottom = window_top + $window.height();
                var target_arr = video_arr.map(function(ob) {
                    if (window_top <= ob.top) {
                        if (window_bottom >= ob.bottom) {
                            if (window_top <= ob.bottom) {
                                return ob.target
                            }
                        }
                    }
                });
                if (target_set) {
                    target_copy = target_arr;
                    target_set = !1
                }
                var result = !target_arr.some(function(e, i) {
                    return !(e == target_copy[i])
                });
                if (!result) {
                    $('.state--play').removeClass('state--play');
                    $('.play_btn').hide();
                    target_copy = target_arr
                }
                wow_video_play(target_arr)
            };
            $window.on('scroll', function() {
                if (device() == 'pc' && scrollWidth() >= 768) {
                    wow_video_check()
                }
            }).on('resize', function() {
                wow_video_check();
                var newWidth = $(window).width();
                if (device() == 'pc') {
                    wow_video_set(wow_video_check)
                } else {
                    if (newWidth !== cachedWidth) {
                        cachedWidth = newWidth;
                        wow_video_set(wow_video_check)
                    }
                }
            });
            $document.on('click', '.play_btn', function() {
                var $video_target = $('.' + $(this).attr('data-target') + '');
                $video_target.find('.vCover').css({
                    'display': 'none',
                    'opacity': 0
                });
                $video_target.find('video')[0].play();
                $video_target.find('video')[0].onended = function() {
                    $video_target.find('.play_btn').show()
                };
                $(this).hide();
                return !1
            }).on('click', '.chef03-play', function() {
                var $video_target = $('#' + $(this).attr('data-target') + '');
                var $this = $(this);
                var $img = $this.parents('.video_wrap_m').find('.vwm-img');
                $this.hide();
                $video_target[0].play();
                if ($img.is(':visible')) {
                    if (device() == 'pc' && scrollWidth() >= 768) {
                        $video_target[0].onplay = function() {
                            $img.hide()
                        }
                    } else {
                        $video_target[0].onprogress = function() {
                            $img.hide();
                            $video_target[0].pause();
                            $video_target[0].currentTime = 0;
                            $video_target[0].play();
                            $video_target[0].onprogress = function() {}
                        }
                    }
                }
                $video_target[0].onended = function() {
                    $this.show()
                };
                return !1
            });
            var video_init = function video_init() {
                wow_video_set(wow_video_check)
            };
            video_init()
        };
        var wow_info_gallery = function wow_info_gallery() {
            var $popup_gallery = $('.popup_gallery');
            var $gallerySlider = $('#gallerySlider');
            var $carousel = $('.slide-area');
            var _btntag = $('.gallery_thumb a');
            var $target;
            $popup_gallery.on('click', '.gallery_thumb a', function(e) {
                var _this = $(this);
                _btntag.attr('tabindex', -1);
                $target = e.currentTarget;
                if ($carousel.hasClass('slick-initialized')) {
                    $carousel.slick('unslick')
                }
                $carousel.slick({
                    infinite: !1,
                    initialSlide: parseInt($(this).attr('data-idx')) - 1,
                    prevArrow: $popup_gallery.find('.prev_btn'),
                    nextArrow: $popup_gallery.find('.next_btn')
                })
                $gallerySlider.addClass('gallery_slider-show ');
                setTimeout(function() {
                    if (parseInt(_this.attr('data-idx')) == _btntag.length) {
                        $popup_gallery.find('.prev_btn').focus()
                    } else {
                        $popup_gallery.find('.next_btn').focus()
                    }
                }, 350)
                return !1
            })
            $document.on('click', '.close_btn', function() {
                _btntag.attr('tabindex', "");
                if (!!$target) {
                    $target.focus()
                }
                $gallerySlider.removeClass('gallery_slider-show ');
                return !1
            })
        };
        var wow_info_family = function wow_info_family() {
            var $target = '.family';
            var $video_target;
            var video_reset = function video_reset() {
                $video_target.prev('img').show();
                $video_target[0].pause();
                $video_target[0].currentTime = 0;
                $video_target.parent().find('.hub-movie-btn-replay').hide()
                $video_target.parent().find('.hub-movie-btn-play').show()
            };
            $document.on('click', '' + $target + ' .family__category a', function() {
                var _index = $(this).data('section');
                var $this = $(this);
                $('' + $target + ' .family__category a').removeClass('family__category--active');
                $this.addClass('family__category--active');
                $('' + $target + ' .family__wrap > div').removeClass('family__wrap--show');
                $('' + $target + ' .family__wrap--' + (_index + 1) + '').addClass('family__wrap--show');
                if ($video_target) {
                    video_reset()
                }
                return !1
            }).on('click', '' + $target + ' .family__btn a', function() {
                var $this = $(this);
                var $container = $this.parent().next().find('.family__box');
                var _index = $this.data('index');
                $this.parent().find('a').removeClass('family__btn--active');
                $this.addClass('family__btn--active');
                $container.removeClass('family__box--show');
                $container.eq(_index).addClass('family__box--show');
                if ($video_target) {
                    video_reset()
                }
                return !1
            }).on('click', '.hub-movie-btn-play', function() {
                var $this = $(this);
                $video_target = $('#' + $(this).attr('data-target') + '');
                $video_target.prev('img').hide();
                $video_target[0].play();
                $this.hide();
                $this.next().show();
                $video_target[0].onended = function() {
                    $this.next().hide();
                    $this.next().next().show()
                };
                return !1
            }).on('click', '.hub-movie-btn-stop', function() {
                var $this = $(this);
                $video_target[0].pause();
                $this.hide();
                $this.prev().show();
                return !1
            }).on('click', '.hub-movie-btn-replay', function() {
                var $this = $(this);
                $video_target[0].play();
                $this.hide();
                $this.prev().show();
                return !1
            })
        };
        var wow_info_morevideo = function wow_info_morevideo() {
            $document.on('click', '.f09_video_2', function() {
                var $this = $(this);
                var $target = $this.find('.vjs-tech').parent();
                var targetId = $target.attr('id');
                var barH = winW() > 768 ? $('.product-anchor-nav-nonprice-jsWrap').height() : $('.product-anchor-nav-nonprice-mo-jsWrap').height();
                if (!($target.hasClass('vjs-has-started'))) {
                    if ($target.hasClass('video-on')) {
                        $target.removeClass('video-on')
                    } else {
                        $target.addClass('video-on')
                    }
                    wow_video_play(targetId);
                    $target.addClass('vjs-has-started').focus();
                    $htmlbody.animate({
                        'scrollTop': $('.feature.video').offset().top - barH
                    })
                }
            })
        }
        var wow_info_brightcove = function wow_info_brightcove() {
            var active_video = "";
            var active_show = "";
            var $htmlbody = $('html,body');
            $document.on('click', '.movie-btn-plus', function() {
                active_video = $('.' + $(this).data('target'));
                active_show = active_video.find('.video-view');
                if (!active_video.is(':visible')) {
                    $(this).addClass('active');
                    active_video.find('video')[0].currentTime = 0;
                    active_video.find('video')[0].pause();
                    active_video.show();
                    active_video.find('.layer-close').focus();
                    active_show.hide();
                    active_show.eq($(this).data('index')).show();
                    active_show.eq($(this).data('index')).find('video')[0].play();
                    if (device() == 'mobile' || scrollWidth() < 768) {
                        $htmlbody.stop().animate({
                            scrollTop: active_video.find('.layer-close').offset().top - $('.product-anchor-nav-nonprice-mo').height() - 100
                        }, 500)
                    } else {
                        $htmlbody.stop().animate({
                            scrollTop: active_video.find('.layer-close').offset().top - $('.product-anchor-nav-nonprice-jsWrap').height()
                        }, 500)
                    }
                }
                return !1
            }).on('click', '.layer-close', function() {
                var $close_target = $(this).parents('.video-pop');
                $.each($close_target.find('.video-view'), function(i, e) {
                    $(e).find('video')[0].currentTime = 0;
                    $(e).find('video')[0].pause()
                })
                $close_target.find('.video-view').hide();
                $close_target.hide();
                $close_target.parent().find('.movie-btn-plus.active').focus();
                return !1
            })
        }
        var page_setiong = function page_setiong() {
            var $container = $('.chef-list-imgbox').children('div');
            var $img_change = $('.img-change');
            $container.eq(0).addClass('on');
            $document.on('click', '.chef-list a', function() {
                if ($(this).attr('data-index') == 2) {
                    if ($img_change.hasClass('slick-initialized')) {
                        $img_change.slick('unslick')
                    }
                    $img_change.slick({
                        autoplay: !0,
                        autoplaySpeed: 1500,
                        arrows: !1,
                        fade: !0
                    })
                }
                $container.removeClass('on');
                $container.eq($(this).attr('data-index')).addClass('on');
                $('.chef-list li').removeClass('on');
                $(this).parent().addClass('on');
                return !1
            })
        };
        var wow_video_play = function wow_video_play(targetId) {
            if ($('.video-on')[0]) {
                $('.video-js.video-on').each(function() {
                    var $this = $(this);
                    var thisId = $this.attr('id');
                    wow_video_stop(thisId)
                })
            }
            $('.close').removeClass('is-focus');
            videojs(targetId).play();
            $('#' + targetId).addClass('video-on')
        }
        var wow_video_stop = function wow_video_stop(targetId) {
            var $close = $('#' + targetId).closest('.brightcove-con').siblings('.close');
            if ($close[0]) {
                $close.addClass('is-focus');
                $close.trigger('click')
            } else if ($('#' + targetId).closest('.video_screen')) {
                videojs(targetId).removeClass('vjs-has-started').removeClass('video-on').currentTime(0).pause()
            } else {
                videojs(targetId).currentTime(0).pause()
            }
        }
        var page_init = function page_init() {
            wow_info_intro();
            wow_info_slider();
            wow_info_inside();
            wow_info_function();
            wow_info_video();
            wow_info_gallery();
            wow_info_family();
            wow_info_morevideo();
            wow_info_brightcove();
            page_setiong()
        };
        page_init()
    }
    wow()
});