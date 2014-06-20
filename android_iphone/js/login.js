/**
 * 登陆JS文件
 * 
 * @author	    莫伟德
 * @date		2013-11-01
 * @email		412511016@qq.com	
 * @qq			412511016
 * @version		v1.0
 * @copyright	copyright 2013-2014	WeiXiao.com All Rights Reserved	
 */


/**
 * 
 * 服务器访问地址
 */
var apiHost = "http://c020901.vhost.bindow.cn/weixiao/index.php?callback=?";

/**
 * 网络访问函数
 * @param {Object} url	请求的网络地址
 * @param {Object} callback	回调函数
 */
function xmlHttp(url,callback){
	if(url == ''){
		uexWindow.alert('参数错误','请求地址不能为空！','返回');
	}else{
		$.getJSON(url,callback);
	}
}
/**
 * foot部分菜单切换函数
 * @param {Object} type
 */
function windowOpen(type){
	if(type == 'index'){
		changeFooterBg(type);
		zy_con("content", "index_detail.html", 0, $$("header").offsetHeight);
		setTimeout(function(){
			zy_resize("content",0,$$("header").offsetHeight);
		},1);
	}else if(type == 'share'){
		changeFooterBg(type);
		zy_con("content", "share_detail.html", 0, $$("header").offsetHeight);
		setTimeout(function(){
			zy_resize("content",0,$$("header").offsetHeight);
		},1);
	}else if(type == 'info'){
		changeFooterBg(type);
		zy_con("content", "info_detail.html", 0, $$("header").offsetHeight);
		setTimeout(function(){
			zy_resize("content",0,$$("header").offsetHeight);
		},1);
	}else if(type == 'activity'){
		changeFooterBg(type);
		zy_con("content", "activity_detail.html", 0, $$("header").offsetHeight);
		setTimeout(function(){
			zy_resize("content",0,$$("header").offsetHeight);
		},1);
	}
}

function checkHtml5(){
	if(!window.localStorge){
		uexWindow.alert('提示','您的手机浏览器可能不支持html5,请下载最新浏览器！');
	}
}

/**
 * 改变底部菜单背景
 * @param {Object} type
 */
function changeFooterBg(type){
	$('#footer .uhide').removeAttr('checked');
	$('#footer .'+type).attr('checked',true);
}


/**
 * HTML5 localStorge.getItem 函数的封装
 * @param {Object} key
 */
function getLocalStorge(key){
	var item = localStorage.getItem(key);
	if(item=='' || item=='0' || item==null || typeof(item)=="undefined"){
		return false;
	}else{
		return item;
	}
}

function loginWeixiao(){
			//该方法用于访问index.html中的JS：uexWindow.evaluateScript("root","0","test()");
			//该方法用于访问index_detail.html中的JS：	uexWindow.evaluatePopoverScript('root','content','test()');
		   var username = $('#username').val();
	        var password = $('#password').val();
	         if(username.length < 1){
		      uexWindow.toast("0","5","登录失败，用户名不能为空…","2000");
		      return false;
	             }
	          var uname = username;
	          var pwd = password;
	          uexWindow.toast("1","5","登录中，请稍后…","0");
	          var loginURL = apiHost + '&m=Index&a=login&username='+uname+'&pwd='+pwd;
	          xmlHttp(loginURL,showLoginResult);	
		}
/**
 * 登录回调函数
 * @param {Object} data
 */
function showLoginResult(data){
	uexWindow.closeToast();
	var returnCode = data.code;
	if(returnCode == 404){
		uexWindow.toast("0","5","登录失败，用户名或密码错误…","2000");
	}else if(returnCode == 200){
		uexWindow.toast("0","5","登录成功！","2000");
		localStorage.setItem('uid',data.uid);
		localStorage.setItem('username',data.username);
		localStorage.setItem('pwd',data.pwd);
		localStorage.setItem('uname',data.uname);
		uexWindow.evaluateScript("root","0","windowOpen('index')");
		uexWindow.evaluatePopoverScript('root','content','init()');
		//延迟两秒跳转窗口
		setTimeout(function () {
			uexWindow.close(-1);
		}, 2000);
	}else{
		uexWindow.toast("0","5","登录失败，未知错误…","2000");
	}
}
/**
 * 登录跳转函数
 * @param {Object} data
 */
 function goToLogin(){
 	 uexWindow.open("login",0,"login.html",0,"","",0);
 }
/**
 * 添加课程跳转函数
 * @param {Object} data
 */
 function goClassWindow(){
 	 uexWindow.open("commitclass",0,"commitClass.html",0,"","",0);
 }

/**
 * 课程跳转函数
 * @param {Object} data
 */ 
  
  function goToClass(){
  	var uid =localStorage.uid;
	     if(uid){ uexWindow.open("class",0,"class.html",0,"","",0);}else
		 {uexWindow.alert('提示','请登录！','返回');}
 }
 /**
 * 画板跳转函数
 * @param {Object} data
 */ 
  
  function goToDraw(){
  	var uid =localStorage.uid;
	     if(uid){ uexWindow.open("draw",0,"draw.html",0,"","",0);}else
		 {uexWindow.alert('提示','请登录！','返回');}
 	
 }
 /**
 * 活动查询跳转函数
 * @param {Object} data
 */ 
 function goToActList(){
  	var uid =localStorage.uid;
	     if(uid){ uexWindow.open("actList",0,"actList.html",0,"","",0);}else
		 {uexWindow.alert('提示','请登录！','返回');}
	
 }
 /**
 * 活动查询跳转函数
 * @param {Object} data
 */ 
 function goComment(id){
  	localStorage.setItem('PubId',id);
 	 uexWindow.open("pubcomment",0,"comment.html",0,"","",0);
 }
 /**
 * 清楚localstorage函数
 * @param {Object} data
 */
 function clearLocal(){
		localStorage.clear();
		uexWindow.evaluateScript("root","0","windowOpen('index')");
		uexWindow.toast("0","5","注销成功！","2000");
		 
	 }
/**
 * 登录初始函数
 * @param {Object} data
 */
function init(){
	var uid = localStorage.uid;
	if (uid) {
		var infoUrl = apiHost + '&m=Index&a=userinfo&uid=' + uid;
		xmlHttp(infoUrl, showUser);
	}
}
/**
 * 用户主页展示函数
 * @param {Object} data
 */
function showUser(items){
	
		
		var nickname = items.uname;
		var age = items.uage;
		var sex = items.usex;
		var area = items.uarea;
		var sign = items.usign;
		var pic = items.upic;
		$("#user_pic").append('<img src="'+pic+'"style="width:3.125em; height:3.125em"/>');
		$("#user_name").append(nickname);
		$("#user_age").append(age);
		$("#user_sex").append(sex);
		$("#user_area").append(area);
		$("#user_sign").append(sign);
	
}
/**
 * 发布跳转函数
 * @param {Object} data
 */ 
  
  function goToPublish(){
  	var uid =localStorage.uid;
	     if(uid){ uexWindow.open("publish",0,"publish.html",0,"","",0);}else
         {uexWindow.alert('提示','请登录！','返回');}
 	
 }
 /**
 * 心情发布函数
 * @param {Object} data
 */ 
  
  function publishContent(){
  	     var uid =localStorage.uid;
	        var content = $('#pcontent').val();
	         if(content.length < 1){
		      uexWindow.toast("0","5","发表失败，内容不能为空…","2000");
		      return false;
	             }
	          uexWindow.toast("1","5","发表中，请稍后…","0");
	          var url =  'http://c020901.vhost.bindow.cn/weixiao/index.php?&m=Index&a=publish&uid='+uid+'&content='+content;
	          xmlHttp(url,showPubResult);
 }
 /**
 * 发布回调函数
 * @param {Object} data
 */
function showPubResult(){
	    uexWindow.closeToast();
		uexWindow.toast("0","5","发表成功！","2000");
		uexWindow.evaluateScript("root","0","windowOpen('share')");
		uexWindow.evaluatePopoverScript('root','content','getPublish()');
		//延迟两秒跳转窗口
		setTimeout(function () {
			uexWindow.close(-1);
		}, 2000);
	}

/**
 * 自动获取心情函数
 * @param {Object} data
 */
function getPublish(){
	   	uexWindow.toast("1","5","数据加载中…","0");
		page++;
	    var url = apiHost+'&m=Index&a=share&page='+page;
	    xmlHttp(url,showPublish);
	}
/**
 * 心情回调函数，用于处理服务器端返回的帖子数据，显示在客户端上
 * @param {Object} items	服务器端返回的json数据
 */
function showPublish(items){
	var forumObj = $("#forum_list");
	//forumObj.html('');
	if(!items){
		uexWindow.alert('提示','已经最后一页了！','关闭');
	    uexWindow.closeToast();
		return;
	}
	for(var i in items){
		var item = items[i];
		
		var tr = '';
		var trHeader = '<div ontouchstart="zy_touch(\'btn-act\')"  class="shareList" onclick="goPublishWin();"><div class="ub-f1 ub ub-ver">';
		var trTitle = '<div class="title"><img src="'+item.upic+'"style="width:1.5625em; height:1.5625em; vertical-align:middle;"/>'+item.uname+'</div>';
		var trOtherInfo = '<div class="otherInfo"></div>';
		var trContent='<div class="title1">'+item.content+'</div>';
		var trConment='<div class="com" onclick="goComment('+item.id+')">'+'[评论]'+'</div>';
		var trFooter = '</div>';
		tr = trHeader+trTitle+trOtherInfo+trContent+trConment+trFooter;
		forumObj.append(tr);
	}
	uexWindow.closeToast();
}
/**
 * 活动发布函数
 * @param {Object} data
 */ 
  
  function publishAct(){
  	     var uname =localStorage.uname;
		 var subject = $('#asubject').val();
		 var author = $('#author').val();
		 var tel = $('#atel').val();
		 var num = $('#anum').val();
		 var date = $('#adate').val();
	     var content = $('#acontent').val();
		 var img ='http://c020901.vhost.bindow.cn/weixiao/images/fun.jpg';
			  if(content.length < 1){
		      uexWindow.toast("0","5","发表失败，活动内容不能为空…","2000");
		      return false;
	             }
	          uexWindow.toast("1","5","发表中，请稍后…","0");
	          var url =  'http://c020901.vhost.bindow.cn/weixiao/index.php?&m=Index&a=publishAct&asubject='+subject+'&author='+author+'&atel='+tel+'&anum='+num+'&adate='+date+'&acontent='+content+'&img='+img;
	          xmlHttp(url,showPubActResult);
 }
 /**
 * 发布回调函数
 * @param {Object} data
 */
function showPubActResult(){
	    uexWindow.closeToast();
		uexWindow.toast("0","5","发表成功！","2000");
		uexWindow.evaluateScript("root","0","windowOpen('activity')");
		uexWindow.evaluatePopoverScript('root','content','getActivity()');
		//延迟两秒跳转窗口
		setTimeout(function () {
			uexWindow.close(-1);
		}, 2000);
	}

/**
 * 自动获取评论函数
 * @param {Object} data
 */
function getComment(){
  	     var pid =localStorage.PubId;
	   	uexWindow.toast("1","5","数据加载中…","0");
	    var url = apiHost+'&m=Index&a=getComment&pid='+pid;
	    xmlHttp(url,showComment);
	}
/**
 * 评论回调函数，用于处理服务器端返回的帖子数据，显示在客户端上
 * @param {Object} items	服务器端返回的json数据
 */
function showComment(items){
	var forumObj = $("#comment");
	forumObj.html('');
	$('#total').html(items.count);
	for(var i in items.content){
		var item = items.content[i];
		
		var tr = '';
		var trHeader = '<div ontouchstart="zy_touch(\'btn-act\')" style="height:auto;" class="forumList" onclick="goPublishWin();"><div class="ub-f1 ub ub-ver">';
		var trTitle = '<div class="title">'+item.uname+'</div>';
		var trOtherInfo = '<div class="otherInfo"></div>';
		var trContent='<div class="title1">'+item.comment+'</div>';
		var trFooter = '</div>';
		tr = trHeader+trTitle+trOtherInfo+trContent+trFooter;
		forumObj.append(tr);
	}
	uexWindow.closeToast();
}
/**
 * 评论发布
 * @param {Object} data
 */ 
  
  function publishComment(){
  	     var pid =localStorage.PubId;
  	     var uid =localStorage.uid;
  	     var uname =localStorage.uname;
		 if(!uid){
		 	uexWindow.toast("0","5","发表失败，尚未登录…","2000");
		      return false;
		 }
		 var content = $('#pcontent').val();
			  if(content.length < 1){
		      uexWindow.toast("0","5","发表失败，内容不能为空…","2000");
		      return false;
	             }
	          uexWindow.toast("1","5","发表中，请稍后…","0");
	          var url =  'http://c020901.vhost.bindow.cn/weixiao/index.php?&m=Index&a=publishCommentAdd&uid='+uid+'&pid='+pid+'&uname='+uname+'&content='+content;
	          xmlHttp(url,publishCommentResult);
 }
 /**
 * 发布回调函数
 * @param {Object} data
 */
function publishCommentResult(){
	    uexWindow.closeToast();
		uexWindow.toast("0","5","发表成功！","2000");
		$('#pcontent').val('');
		uexWindow.evaluateScript("pubcomment","0","getComment()");
		//uexWindow.evaluatePopoverScript('root','content','getActivity()');
		//延迟两秒跳转窗口
		setTimeout(function () {
			uexWindow.closeToast();
	    	//uexWindow.closeToast();
		}, 2000);
	}