/**
 * 初始化JS文件
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
var forumHost = "http://c020901.vhost.bindow.cn/weixiao/index.php?callback=?";

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



