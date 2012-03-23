/************************************************************************
   파일명 : EgovHybrid.js
   설  명 : 모바일 전자정부 하이브리드 앱 실행환경 공통 JavaScript
   수정일       수정자        Version        Function 명
  -------      ----------      ----------     -----------------
  2012.02.14   서형주         1.0              최초 생성
************************************************************************/




/* ********************************************************
 * Ajax Error Setting
 ******************************************************** */

 $.ajaxSetup({
    		error:function(x,e){
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
    		}
    	});

 
 /* ********************************************************
  * EgovHybrid 클래스 정의
  ******************************************************** */ 
 EgovHybrid = function(hostServerURL){
	 this.hostServerURL = hostServerURL;
 }
 
 /* ********************************************************
  * Post Service Function
  ******************************************************** */
 EgovHybrid.prototype.post = function (url, params, success){
	$.post(this.hostServerURL + url, params, success);
}

/* ********************************************************
 * Get Service Function
 ******************************************************** */
 EgovHybrid.prototype.get = function (url, success){
	$.get(this.hostServerURL + url, success);
}

 /* ********************************************************
  * Get Service Function
  ******************************************************** */
  EgovHybrid.prototype.get = function (url, params, success){
 	$.get(this.hostServerURL + url, params, success);
 }
 