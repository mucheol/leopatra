function over_img(img,n){

	var hover = "_"+n;
	if (img.hasClass("on") == false && img.find("img").length > 0){
		menuimg = img.find("img");

		if (menuimg.attr("src").indexOf(".jpg") > 0){
			menuimg_type = ".jpg";
		}else if (menuimg.attr("src").indexOf(".gif") > 0){
			menuimg_type = ".gif";
		}else if (menuimg.attr("src").indexOf(".png") > 0){
			menuimg_type = ".png";
		}


		menuimg_src = menuimg.attr("src").split("_off")[0];
		menuimg_src = menuimg_src.split("_on")[0];
		menuimg_src = menuimg_src.split("_select")[0];
		menuimg.attr("src",menuimg_src+hover+menuimg_type);
	}
}

// gnb
function gnb(dep1, dep2){
	var gnb = $('#gnb');
	var gnbDep1 = gnb.find('.gnbDep1 > a');
	var gnbDep2 = gnb.find('.gnbDep2');
	var gnbTimeout;

	if(gnb.length <= 0){
		return;
	}

	if(dep1 != '' && dep2 !== ''){
		gnb.find('.gnbDep1').eq(dep1-1).addClass('on');
		gnb.find('.gnbDep1').eq(dep1-1).find('.gnbDep2 > li').eq(dep2-1).addClass('on');
	}

	gnbDep1.on('mouseenter' , function(){
		clearTimeout(gnbTimeout);

		gnb.find('.gnbDep1').removeClass('on');
		$(this).closest('.gnbDep1').addClass('on');
	});

	gnb.find('.gnbArea').on('mouseleave' , function(){
		clearTimeout(gnbTimeout);

		gnbTimeout = setTimeout(function(){
			gnb.find('.gnbDep1').removeClass('on');

			if(dep1 != '' && dep2 !== ''){
				gnb.find('.gnbDep1').eq(dep1-1).addClass('on');
				gnb.find('.gnbDep1').eq(dep1-1).find('.gnbDep2 > li').eq(dep2-1).addClass('on');
			}
		}, 300);
	});

}


//팝업 - 윈도우
function pop_window(url,w,h){
    window.open(url, "팝업" , "width="+w+",height="+h+', scrollbars=yes, resizable=no, toolbar=no, top=100, left=100');
}


// datepickerUI ( 달력 UI)
function datepickerUI(){
    var el;
    var elBtn;
    var elIco;

    el = $('input.inpDate');
    elBtn = $('.ui-datepicker-trigger');
    elIco = $('.btnCalendar');

	el.closest('.dateWrap').on('click' , function(){
		$(this).find(el).focus();
	});

    bindEvents();

    function defaultOption(){
        if($.datepicker && !window.GROBAL_DATAPICKER){
            $.datepicker.regional['en'] = {
                closeText: '닫기',
                prevText: '이전달',
                nextText: '다음달',
                currentText: '오늘',
                monthNames: ["01","02","03","04","05","06","07","08","09","10","11","12"],
                monthNamesShort: ["01","02","03","04","05","06","07","08","09","10","11","12"],
                dayNames: ["일", "월", "화", "수", "목", "금", "토"],
                dayNamesShort: ["일", "월", "화", "수", "목", "금", "토"],
                dayNamesMin: ["일", "월", "화", "수", "목", "금", "토"],
                weekHeader: 'Wk',
                dateFormat: 'yy-mm-dd ',
                buttonText: '달력보기',
                showMonthAfterYear: true,
                yearSuffix: '.',
                showOtherMonths: true,
                showButtonPanel: false,
                changeMonth: false,
                changeYear: false,
                constrainInput: true,
//                showOn: 'button',
                buttonText:'Select date',
                onSelect : function(dateText, inst){
                   // $(this).focus();
                }
            };
            $.datepicker.setDefaults($.datepicker.regional['en']);
            window.GROBAL_DATAPICKER = true;
        }
    }

    function bindEvents(){
        defaultOption();

        if($.datepicker){

			el.each(function(idx, obj){
				// 달 선택
				if($(obj).hasClass('inpMonth')){
					$(obj).monthpicker({
						monthNames: ["1","2","3","4","5","6","7","8","9","10","11","12"],
						monthNamesShort: ["1","2","3","4","5","6","7","8","9","10","11","12"],
						buttonImageOnly: true,
						changeYear: false,
						yearRange: 'c-2:c+2',
						dateFormat: 'yy-mm',
						yearSuffix: '.'
					});
				}
				else{
					$(obj).datepicker();
				}
			});

            elBtn = $('.ui-datepicker-trigger');
            elIco = $('.btnCalendar');
            elBtn.hide();

            // 키보드 접근 불가능하게 하기 위해 href 제거
            elIco.attr('aria-hidden', true);
            elIco.removeAttr('href').css('cursor','pointer');
            elIco.off('click.eventCalendar').on('click.eventCalendar' , function(e){
                e.preventDefault();
                $(this).closest('.inputDate').find('.ui-datepicker-trigger').trigger('click');
                $(this).closest('.inputDate').find('input:text').trigger('focus');
            });

            el.off('click.eventCalendar').on('click.eventCalendar' , function(e){
                e.preventDefault();
                $(this).closest('.inputDate').find('.ui-datepicker-trigger').trigger('click');
                $(this).closest('.inputDate').find('input:text').trigger('focus');
            });
        }
    }
}

// 탭 메뉴
function tabUI() {
	var el;

	el = $('.tabsGroup');

	if(el.length <= 0){
		return;
	}


	el.each(function(idx, obj){
		if($(obj).find('.tabs > li').hasClass('on')){
			$(obj).find('.tabs > li').each(function(){
				var idx = $(this).filter('.on').index();
				if(idx >= 0){
					$(obj).find('.tabs > li').eq(idx).addClass('on').siblings().removeClass('on');
					$(obj).find('> .tabsCont').hide().eq(idx).show();
				}

			});
		}
		else{
			$(obj).find('.tabs > li').eq(0).addClass('on').siblings().removeClass('on');
			$(obj).find('> .tabsCont').hide().eq(0).show();
		}

		bindEvents(obj);
	});



	function bindEvents(obj){
		var $this = $(obj);

		$this.find('.tabs > li > a').on('click', function(e){
			e.preventDefault();
			var index = $(this).closest('li').index();

			if($this.find('> .tabsCont').eq(index).length <= 0){
				return;
			}

			$(this).closest(el).find('.tabs > li').eq(index).addClass('on').siblings().removeClass('on');
			$(this).closest(el).find('> .tabsCont').hide().eq(index).show();

		});

	}
}

// LayerPopup 열기
var idxLayPop = 0;
function layerPop(n, target){
	if(n == 'open'){
		idxLayPop = idxLayPop + 1;
		var sct = $(document).scrollTop();
		var settings = {
			opacity : 0,
			y : -100
		}

		TweenMax.set($('.layerPop'+target), {zIndex : 9999 + idxLayPop});
		TweenMax.set($('.layerPop'+target).find('.layerPopArea'), settings);

        $('html').addClass('closeHidden');

		$('.layerPop'+target).stop().fadeIn(300, function(){
			TweenMax.to($('.layerPop'+target).find('.layerPopArea'), 0.4, {
				opacity : 1,
				y : 0
			});
		});

	}else{
		idxLayPop = idxLayPop - 1;
		TweenMax.to($('.layerPop'+target).find('.layerPopArea'), 0.4, {
			opacity : 0,
			y : -100,
			onComplete : function(){
				$('.layerPop'+target).stop().fadeOut(300, function(){
					$('.layerPop'+target).find('.layerPopArea').removeAttr('style');
				});

				$('.layerPop'+target).find('.popCont').removeAttr('style');

				if($('html').css('margin-top').length){
					var sct = Math.abs(parseInt($('html').css('margin-top')));
					//$('html').scrollTop(sct);
					$('html').removeAttr('style');
				}

                $('html').removeClass('closeHidden');

			}
		});
	}
}

// headerUI
function headerUI(){
	var el = $('#header');

	if(el.length <= 0){
		return;
	}

	$(window).off('scroll.headerEvt').on('scroll.headerEvt' , function(){
		var sct = $(this).scrollTop();

		if(sct >= el.outerHeight(true)){
			el.addClass('change');
		}
		else{
			el.removeClass('change');
		}
	}).trigger('scroll.headerEvt');
}

// commSwiperUI
function commSwiperUI(){
	if($('.produceSlide .swiper-slide').length > 3){
		var produceSlideSwiper = new Swiper('.produceSlide .swiper', {
			loop : false,
			slidesPerView: 3,
			spaceBetween: 38,
			observeParents : true,
			observer : true,
			navigation: {
				nextEl: '.produceSlide .ctrlBoxSwiper .btnSwiper.next',
				prevEl: '.produceSlide .ctrlBoxSwiper .btnSwiper.prev',
			},
			speed : 300,
			simulateTouch  : false
		});
	}
	else{
		$('.produceSlide .ctrlBoxSwiper').hide();
	}

	if($('.prdList .prdItem').length > 3){
		var pridListSwiper = new Swiper('.prdList .swiper', {
			loop : false,
			slidesPerView: 3,
			observeParents : true,
			observer : true,
			pagination: {
				el: ".prdList .ctrlBoxSwiper .paginationSwiper",
				clickable : true
			},
			navigation: {
				nextEl: '.prdList .ctrlBoxSwiper .btnSwiper.next',
				prevEl: '.prdList .ctrlBoxSwiper .btnSwiper.prev',
			},
			speed : 300,
			simulateTouch  : false
		});
	}
	else{
		$('.prdList .ctrlBoxSwiper').hide();
	}
}

// locationUI
function locationUI(){
	var el = $('.locationWrap');

	if(el.length <= 0 ){
		return;
	}

	el.find('.location .locationLink').each(function(idx, obj){
		if($(obj).find('.selectMenu').length <= 0){
			$(obj).addClass('solo')
		}
	});

	el.find('.locationLink > a').not('.solo').on('click' , function(e){
		e.preventDefault();

		if($(this).next('.selectMenu').hasClass('open')){
			$(this).removeClass('active');
			$(this).next('.selectMenu').removeClass('open');
		}
		else{
			el.find('.locationLink > a').removeClass('active');
			el.find('.selectMenu').removeClass('open');
			$(this).addClass('active');
			$(this).next('.selectMenu').addClass('open');
		}
	});

	var elPos = el.offset().top;
	$(document).off('scroll.scrollLocation').on('scroll.scrollLocation' , function(){
		var sct = $(this).scrollTop();

		if(sct + $('#header').outerHeight(true) >= elPos){
			el.addClass('fixed');
			$('.container').addClass('locationWrapAdd');
		}
		else{
			el.removeClass('fixed');
			$('.container').removeClass('locationWrapAdd');
		}
	}).trigger('scroll.scrollLocation');
}

// searchAreaUI
function searchAreaUI(){
	var el = $('.searchArea');

	if(el.length <= 0 ){
		return;
	}

	el.find('.selectAnchor').on('click' , function(e){
		e.preventDefault();

		if($(this).next('.selectList').hasClass('open')){
			$(this).next('.selectList').removeClass('open');
		}
		else{
			el.find('.selectList').removeClass('open');
			$(this).next('.selectList').addClass('open');
		}
	});

	var elPos = el.offset().top;
	$(document).off('scroll.scrollSearchArea').on('scroll.scrollSearchArea' , function(){
		var sct = $(this).scrollTop();

		if($('.wrap').hasClass('artist')){
			return;
		}

		// if(sct + $('#header').outerHeight(true) >= elPos){
		// 	el.addClass('fixed');
		// 	$('.container').addClass('searchAreaAdd');
		// }
		// else{
		// 	el.removeClass('fixed');
		// 	$('.container').removeClass('searchAreaAdd');
		// }
	}).trigger('scroll.scrollSearchArea');
}

// 파일 첨부
function fileUploadUI(){
	var el = $('.fileBox');
	var uploadFile;

	if(el.length <= 0){
		return;
	}

	el.each(function(idx, obj){
		uploadFile = $(obj).find('.inpFile');

		if($(obj).hasClass('boxVertical')){
			uploadFile.on('change', function(){
				var filename;
				if(window.FileReader){
					if( $(this)[0].files[0] )		filename = $(this)[0].files[0].name;
					else							filename = '';
				} else {
					filename = $(this).val().split('/').pop().split('\\').pop();
				}

				$(this).closest(el).find('.fileDelete .inpText.value').text(filename);
				$(obj).find('.btnFileDelete').addClass("on");

			});

			// 첨부파일 삭제
			$(obj).find('.btnFileDelete').on('click', function(e){
				e.preventDefault();

				$(this).closest(el).find('.fileDelete .inpText.value').text('').trigger('change');
				$(this).removeClass('on');
			});
		}
		else{
			uploadFile.on('change', function(){
				var filename;
				if(window.FileReader){
					if( $(this)[0].files[0] )		filename = $(this)[0].files[0].name;
					else							filename = '';
				} else {
					filename = $(this).val().split('/').pop().split('\\').pop();
				}

				$(this).closest(el).find('.value').text(filename);
			});
		}
	});

}

// 아코디언
function accodianUI() {
	var el;

	el = $('.accoList');

	if(el.length <= 0){
		return;
	}

	el.find('.box').removeClass('on');

	bindEvents();

	function bindEvents(){
		el.find('.box a.inner').off('click.accodianEvt').on('click.accodianEvt', function(e){
			e.preventDefault();

			var index = $(this).closest('.box').index();

			el.find('.box').each(function(idx, obj){
				if(idx == index){
					if($(obj).hasClass('on')){
						$(obj).removeClass('on');
					}else{
						$(obj).addClass('on');
					}
				}else{
					$(obj).removeClass('on');
				}
			});

		});
	}
}

// mainUI
function mainUI(){
	var el = $('.mainWrap');

	if(el.length <= 0){
		return;
	}

	const mainVisualSwiper = new Swiper('.mainVisualSwiper .swiper', {
		observeParents : true,
		observer : true,
		navigation: {
			nextEl: '.mainVisualSwiper .ctrlBoxSwiper .btnSwiper.next',
			prevEl: '.mainVisualSwiper .ctrlBoxSwiper .btnSwiper.prev',
		},
		pagination : {
			el : '.mainVisualSwiper .ctrlBoxSwiper .paginationSwiper',
			type : 'fraction'
		},
		autoplay : {
			delay : 5000,
			disableOnInteraction : false
		},
		speed : 300,
		simulateTouch  : false,
		loop : true,
    loopAdditionalSlides : 1,
		on : {
			init : function(swiper){
				// 정지 / 재생
				el.find('.mainSection.visual .ctrlBoxSwiper .btnCtrl').on('click' , function(e){
					e.preventDefault();

					if($(this).hasClass('pause')){
						$(this).removeClass('pause');
						$(this).addClass('play');

						mainVisualSwiper.autoplay.stop();
					}
					else{
						$(this).addClass('pause');
						$(this).removeClass('play');

						mainVisualSwiper.autoplay.start();
					}
				});
			}
		}
	});

  let myVideo = document.querySelector(".myVideo");
  // let videoIndex = 6;

  mainVisualSwiper.on("slideChange", function () {
    // console.log(mainVisualSwiper.activeIndex, videoIndex);
    if (mainVisualSwiper.activeIndex === videoIndex) {
      myVideo.play();
    }
  });
  myVideo.addEventListener("ended", () => {
    myVideo.currentTime = 0;
    mainVisualSwiper.slideNext();
    mainVisualSwiper.autoplay.start();
    console.log("video END");
  });

	mainVisualSwiper.on('autoplayStop' , function(){
		el.find('.mainVisualSwiper .ctrlBoxSwiper .btnCtrl').removeClass('pause').addClass('play');
	});



	var communitySwiper = new Swiper('.communitySwiper .swiper', {
		observeParents : true,
		observer : true,
		centeredSlides : true,
		slidesPerView: 5,
		spaceBetween : 47,
		navigation: {
			nextEl: '.communitySwiper .ctrlBoxSwiper .btnSwiper.next',
			prevEl: '.communitySwiper .ctrlBoxSwiper .btnSwiper.prev',
		},
		speed : 300,
		simulateTouch  : false,
		loop : true
	});

	var curationSwiper = new Swiper('.curationSwiper .swiper', {
		observeParents : true,
		observer : true,
		navigation: {
			nextEl: '.curationSwiper .ctrlBoxSwiper .btnSwiper.next',
			prevEl: '.curationSwiper .ctrlBoxSwiper .btnSwiper.prev',
		},
		pagination : {
			el : '.curationSwiper .ctrlBoxSwiper .paginationSwiper'
		},
		speed : 300,
		simulateTouch  : false,
		loop : true
	});
}

// videoUI
function videoUI(){
	var el = $('.videoWrap.videoControl');

	if(el.length <= 0){
		return;
	}

	el.on('click', function(){
		$(this).find("video").each(function(){
			if(this.paused){
				$(this).parent().addClass("on");
				this.play();
				var _this = $(this)
				setTimeout(function(){_this.css("visibility","visible");},400)
			}else{
				$(this).parent().removeClass("on");
				this.pause();
			}
		})
	});
}

/* ToolTipLayer*/
function toolTipLayer(){
    var  el = $('.btnTooltip');

    if(el.length <= 0){
        return;
    }


    // open
    el.on('click' , function(e){
        e.preventDefault();

        var _this = $(this);

        TweenMax.set($('.layerToolTip') , {clearProps: 'all'});

        _this.next('.layerToolTip').addClass('open');
        TweenMax.set(_this.next('.layerToolTip') , {opacity : 0 , x :50});
        TweenMax.to(_this.next('.layerToolTip') , 0.3, {opacity : 1 , x : 0, display : 'block'});

        $(document).off('click.closeEvent').on('click.closeEvent' , function(e){
            if(_this.next('.layerToolTip').hasClass('open')){
                if(!_this.closest('div').has(e.target).length){
                    $('.layerToolTip').removeClass('open');
                    $('.layerToolTip').find('.layerToolTip').removeAttr('style');
                    TweenMax.set($('.layerToolTip') , {clearProps: 'all'});
                }
            }
        });
    });

    // close
    $(document).on('click' , '.layerToolTip .btnToolTipClose', function(e){
        e.preventDefault();

        $('.layerToolTip').removeClass('open');
        $('.layerToolTip').removeAttr('style');
        TweenMax.set($('.layerToolTip') , {clearProps: 'all'});
    });

}

$(function(){
	gnb();
	datepickerUI();
    tabUI();
	headerUI();
	commSwiperUI();
	searchAreaUI();
	locationUI();
	fileUploadUI();
	accodianUI();
	mainUI();
	videoUI();
	toolTipLayer();
});

$(document).ready(function(){
  // MK-01-0002
$('.dibBtn').on('click',function(){
  $(this).toggleClass('active');
})

  // PG-01-0002
$("input:radio[name=radInput]").click(function(){
    if($("input[name=radInput]:checked").val() == "1"){
      $("input:text[name=issuedQuantity]").attr("disabled",false);
      $("input:text[name=issuedQuantity]").attr("placeholder","수량을 입력해주세요.");
      $("input:text[name=pricePerPiece]").attr("disabled",true);
      $("input:text[name=pricePerPiece]").attr("placeholder","0");
      $("#cheongsan").removeClass('on');
    }else if($("input[name=radInput]:checked").val() == "2"){
      $("input:text[name=issuedQuantity]").attr("disabled",true);
      $("input:text[name=issuedQuantity]").attr("placeholder","0");
      $("input:text[name=pricePerPiece]").attr("disabled",false);
      $("input:text[name=pricePerPiece]").attr("placeholder","개당 가격을 입력해주세요.");
      $("#cheongsan").addClass('on');
    }
  });
  
  //PG-01-0008P
  $('#searchIdInput').on('change keyup',function(){
    if($('#searchIdInput').val() == ''){
      console.log('efkwj')
      $('#searchIdBtn').removeClass('on')
    }else {
      $('#searchIdBtn').addClass('on')
    }
  })
});
