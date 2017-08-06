var xmlHttp;  
function createXMLHttp(){
    if (window.XMLHttpRequest) {
       xmlHttp = new XMLHttpRequest();                  
    } else {
       xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
}
      
function sendEmail(emailHref){
	    $('#emailMsg').html("");
		var toEmail = $("#toEmail").val();
		if(isBlank(toEmail)){
			$('#emailMsg').html("<span class='colorRed'>璇疯緭鍏ユ偍鐨勯偖绠憋紒</span>");
			return ;
		}
		var regMail = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/;
		if(!toEmail.match(regMail)){
			$('#emailMsg').html("<span class='colorRed'>閭鏍煎紡涓嶆纭紝璇烽噸鏂拌緭鍏ワ紒</span>");
			return ;
		}

		document.getElementById("emailButton").disabled = true;  // 鎸夐挳澶辨晥
		$("#emailButton").addClass("btn_blue_disable");
		$('#emailMsg').html("閭欢鍙戦€佷腑......");
		createXMLHttp();
		xmlHttp.onreadystatechange = sendEmailResult;
		xmlHttp.open("GET", emailHref.replace(/\&amp;/g, '&') + "&toEmail=" + toEmail, true);
		xmlHttp.setRequestHeader("If-Modified-Since","0");  // 闃叉缂撳瓨锛屽惁鍒檌e涓嬪彲鑳�(ie璁剧疆鏈夊叧)涓嶈兘澶氭鍙戦€侀偖浠�
		xmlHttp.send(null);
}

function sendEmailResult(){
	if(xmlHttp.readyState == 4){
		if(xmlHttp.status == 200){
			document.getElementById("emailButton").disabled = false;  // 鎸夐挳鏈夋晥
			$("#emailButton").removeClass("btn_blue_disable");
			if(xmlHttp.responseText === "fail"){
				$("#emailMsg").html("<span class='colorRed'>閭欢鍙戦€佸け璐ワ紝璇烽噸鏂板彂閫侊紒</span>");
			}else if(xmlHttp.responseText === "success"){
				$("#emailMsg").html("閭欢鍙戦€佹垚鍔燂紝璇锋敞鎰忔煡鏀讹紒");
			}else if(xmlHttp.responseText === "canNotReceiveCNReport"){
				$("#emailMsg").html("璇ラ偖绠卞彧鎺ユ敹鑻辨枃鎶ュ憡锛屽綋鍓嶄腑鏂囨姤鍛婄姝㈠彂閫侊紒");
			}
		}
	}
}
