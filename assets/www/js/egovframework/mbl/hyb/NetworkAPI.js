/************************************************************************
   파일명 : EgovHybrid.js

   설  명 : 모바일 전자정부 하이브리드 앱 Network API 가이드 프로그램 JavaScript
   수정일       수정자        Version        Function 명
  -------      ----------      ----------     -----------------
  2012.02.14   서형주         1.0              최초 생성
************************************************************************/


/* ********************************************************
 * Network Info List 화면 이동 함수

 ******************************************************** */
function fn_goNetworkInfoList() {
	
	var url = "/sample/egovSampleList.do"; 
	var params = {random : Math.random() };
		
	// get the data from server
	egovHyb.get(url, params, function(data) {
		
		var list_html = "";
		var totcnt = data.networkInfoList.length;
		
		for (var i = 0; i < totcnt; i++) {
			result = data.networkInfoList[i];

			list_html += "<li><h3>UUID : " + result.uuid + "</h3>";
			list_html += "<p><strong>Network Connection Type : " + result.networkType + "</strong></p>";
			list_html += "<p>Availibility : " + result.useYn + "</p></li>";
			
		}
		
		 var theList = $('#theList');
		 theList.html(list_html);
		
		$.mobile.changePage("#networkInfoList", "slide", false, false);
		theList.listview("refresh"); 
		setTimeout(loadiScroll, 200);
		
		
	}).error(function(x,e){//override global error function
		if(x.status==0){
			jAlert('Netowork Error!!\n Please Check Your Network.');
		}else if(x.status==404){
			jAlert('Requested URL not found.');
		}else if(x.status==500){
			jAlert('Internel Server Error.');
		}else if(e=='parsererror'){
			jAlert('Error.\nParsing JSON Request failed.');
		}else if(e=='timeout'){
			jAlert('Request Time out.');
		}else {
			jAlert('Unknow Error.\n'+x.responseText);
		}
	});

	
    
}


/* ********************************************************
 * Network Info 로딩 함수
 ******************************************************** */
function loadNetworkInfo() {
    
    var networkState = navigator.network.connection.type;
     
    var states = {};
    states[Connection.UNKNOWN]  = 'Unknown connection';
    states[Connection.ETHERNET] = 'Ethernet connection';
    states[Connection.WIFI]     = 'WiFi connection';
    states[Connection.CELL_2G]  = 'Cell 2G connection';
    states[Connection.CELL_3G]  = 'Cell 3G connection';
    states[Connection.CELL_4G]  = 'Cell 4G connection';
    states[Connection.NONE]     = 'No network connection';
    
    
    $('.ui-body-b:eq(1)').html(device.platform);
    $('.ui-body-b:eq(3)').html(states[networkState]);
    $('.ui-body-b:eq(5)').html(device.version);

    
}




/* ********************************************************
 * Network Info 서버 전송 함수
 ******************************************************** */
function fn_registNetworkInfo() {
	
	var useYn = "";
	var networkState = navigator.network.connection.type;
	if(networkState == Connection.NONE)
		useYn = "N";
	else
		useYn = "Y";
	
	var url = "/sample/addSample.do"; 
	var params = {uuid :  device.uuid,
			networktype: networkState, 
			useYn:  useYn};
	
	
	// send the data
	egovHyb.post(url, params, function(data) {
		
		
		if(data.resultState == "OK"){
			fn_goNetworkInfoList();
		}else{
			$("#alert_dialog").click( function() {
				jAlert('데이터 전송 중 오류가 발생 했습니다.', '전송 오류', 'c');
				});
		}	
		
		
		
	});

    
}

/* ********************************************************
 * Network Info List 삭제 요청 함수
 ******************************************************** */
function fn_deleteNetworkInfoList() {
	
	var url = "/sample/deleteSample.do"; 
	
	
	// send the data
	egovHyb.post(url, function(data) {
		
		
		if(data.resultState == "OK"){
			$.mobile.changePage("#networkInfo", { transition: "slide", reverse: true });
		}else{
			$("#alert_dialog").click( function() {
				jAlert('데이터 삭제 중 오류가 발생 했습니다.', '삭제 오류', 'c');
				});
		}
		
	});
	
    
}



/* ********************************************************
 * Network Info 전송 확인 함수
 ******************************************************** */
function confirm_registNetworkInfo(){
	jConfirm('Network 정보를 서버로 전송 하시겠습니까?', '알림', 'c', function(r){
		if(r == true){
			fn_registNetworkInfo();
		}else{
			
		}
		
	});
	
	
}


/* ********************************************************
 * Network Info List 삭제 확인 함수
 ******************************************************** */
function confirm_deleteNetworkInfoList(){
	jConfirm('Network Info List를 초기화 하시겠습니까??', '알림', 'c', function(r){
		if(r == true){
			 fn_deleteNetworkInfoList();
		}else{
			
		}
		
	});
	
	
}















