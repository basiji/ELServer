var csrf_token = '123';
	$(document).bind("ajaxSend", function(elm, xhr, s){	
	   //if (s.type == "POST") {
	   if (!/^(GET|HEAD|OPTIONS|TRACE)$/i.test(s.type)) {
		xhr.setRequestHeader('X-CSRF-Token', csrf_token);
	   }
	});
	//if ($("#cardnumber").length >= 1)
		//$("#cardnumber").val('');
	if ($(window).width() > 768)
		$("#cardnumber").focus(); 
	if (top.frames.length != 0) 
		{
			//alert('شما مجاز به استفاده از فريم نيستيد.');
			top.location = window.location;
		}
        var aspect_ratio = 0.0726075949367089;
		jQuery(window).resize(function() {
			$("#topnavbar").height( $("#topnavbar").width() * aspect_ratio );
		});
		
		$(function ()
        {
			PSGateWayPackage();
			$("#topnavbar").height($("#topnavbar").width() * aspect_ratio );
			$("a[href^='#demo']").click(function (evt)
            {
                evt.preventDefault();
                var scroll_to = $($(this).attr("href")).offset().top;
                $("html,body").animate({ scrollTop: scroll_to - 80 }, 600);
            });
            $("a[href^='#bg']").click(function (evt)
            {
                evt.preventDefault();
                $("body").removeClass("light").removeClass("dark").addClass($(this).data("class")).css("background-image", "url('css/" + $(this).data("file") + "')");
                console.log($(this).data("file"));


            });
            $("a[href^='#color']").click(function (evt)
            {
                evt.preventDefault();
                var elm = $(".tabbable");
                elm.removeClass("grey").removeClass("dark").removeClass("dark-input").addClass($(this).data("class"));
                if (elm.hasClass("dark dark-input"))
                {
                    $(".btn", elm).addClass("btn-inverse");
                }
                else
                {
                    $(".btn", elm).removeClass("btn-inverse");
                }

            });
            $(".color-swatch div").each(function ()
            {
                $(this).css("background-color", $(this).data("color"));
            });
            $(".color-swatch div").click(function (evt)
            {
                evt.stopPropagation();
                $("body").removeClass("light").removeClass("dark").addClass($(this).data("class")).css("background-color", $(this).data("color"));
            });
            $("#texture-check").mouseup(function (evt)
            {
                evt.preventDefault();

                if (!$(this).hasClass("active"))
                {
                    $("body").css("background-image", "url(css/n1.png)");
                }
                else
                {
                    $("body").css("background-image", "none");
                }
            });

            $("a[href='#']").click(function (evt)
            {
                evt.preventDefault();
            });

            $("a[data-toggle='popover']").popover({
                trigger:"hover",html:true,placement:"top"
            });
        });
		if ($('#cardnumber').length > 0){
			if ($('#cardnumber').val().length > 6 && $('#GatewayFetchBankNameDiv').html().length < 1)
				$('#GatewayFetchBankNameDiv').html(FetchBankName($('#cardnumber').val().replace(/[^0-9*]/g, '')));
		}
		

		$('#cardlistcombo').on('change',function(e){
			if (this.value == 'NoSavedCard'){
				$('.cardnumber4div').slideDown('500', function(){$(this).show();});
				$('#expmah').val('');
				$('#expyear').val('');				
				$('.expdatealert').slideUp('500', function(){$(this).hide();});
			}
			else{ 
				$('.cardnumber4div').slideUp('500', function(){$(this).hide();});
				if (this.options[this.selectedIndex].getAttribute('expiration') == 'true'){
					$('#expmah').val('••');
					$('#expyear').val('••');
					$('.expdatealert').slideDown('500', function(){$(this).show();});
				}
				else{
					$('#expmah').val('');
					$('#expyear').val('');				
					$('.expdatealert').slideUp('500', function(){$(this).hide();});
				}
					
			}
				
		});
		
		$("#secondpass, #cvv2, #expmah, #expyear, #captchacode").keyup(function () {
			//$(this).prop("autocomplete","off");
			//$(this).val(Num2En($(this).val()));			
			var ipgformval = Num2En($(this).val());			
			$(this).val(ipgformval.replace(/[^0-9*]/g, ''));
			
			//if ($('#captchacode').val().length == 5 && $(window).width() < 768){
			if ($('#captchacode').is(":focus") && $('#captchacode').val().length == 5){
				$('html, body').animate({
				  scrollTop: $(".paymentap").offset().top
				}, 1000);			
			}
		});
		$(".cardnumberap").keyup(function () {			
			//$(this).prop("autocomplete","off");
			//$(this).val(Num2En($(this).val()));			
			var cardval = Num2En($(this).val());
			$(this).val(cardval.replace(/[^0-9*]/g, ''));
			
			if ($('input:[name=cardnumber1]').val().length == 4 && $('input:[name=cardnumber2]').val().length >= 2){
				var bincardtxt = $('input:[name=cardnumber1]').val()+$('input:[name=cardnumber2]').val().substr(0,2);
				$('#GatewayFetchBankNameDiv').html(FetchBankName(bincardtxt));
			}			
			
			if (this.value.length == this.maxLength) {
			  var $next = $(this).next('.cardnumberap');
				//$(this).next('.cardnumberap').focus();				
			  if ($next.length){
				  $(this).next('.cardnumberap').focus();
				  var tmpStr = $(this).next('.cardnumberap').val();
				  $(this).next('.cardnumberap').val('');				  
				  $(this).next('.cardnumberap').val(tmpStr);				  				  
				  $(this).next('.cardnumberap').focus().val($(this).next('.cardnumberap').val());
				}
			  else
				$('#secondpass').focus().val($('#secondpass').val());
				  //$(this).blur();
			}
		});
		$(document).ready(function() {
			var isWebKit = /webkit/.test(navigator.userAgent.toLowerCase());
			var isEdge = navigator.userAgent.search("Edge") > 0;	
			if (!isEdge && isWebKit){		
				$("#secondpass, #cvv2").addClass("PasswordStyleInput");
				$("#secondpass, #cvv2").prop("type", "tel");
				//$("#secondpass, #cvv2").attr("type", "tel");
				//setTimeout(function() {
					//$("#secondpass, #cvv2").addClass("PasswordStyleInput");
					//$("#secondpass, #cvv2").prop("type", "tel");			
				//}, 1);
			}			
		});
	var image = new Image();
	image.src = '/img/aploader.gif';		