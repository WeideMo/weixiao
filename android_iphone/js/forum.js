/**
 * 服务器地址
 */
var forumHost = "http://c020901.vhost.bindow.cn/weixiao/index.php?callback=?";
/**
 * 网络请求中转函数
 * 
 * @param {Object} url	服务器请求地址
 * @param {Object} callback		回调函数
 */
function xmlHttp(url,callback){
	if(url == ''){
		uexWindow.alert('参数错误','请求地址不能为空！','返回');
	}else{
		$.getJSON(url,callback);
	}
}

/**
 * 获取帖子列表
 */
function  getForumList(){
	uexWindow.toast("1","5","数据加载中…","0");
	page++;
	var url = forumHost+'&m=Index&a=news&page='+page;
	xmlHttp(url,showList);
}

/**
 * 回调函数，用于处理服务器端返回的帖子数据，显示在客户端上
 * @param {Object} items	服务器端返回的json数据
 */
function showList(items){
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
		var trHeader = '<div ontouchstart="zy_touch(\'btn-act\')" style="height:7em;" class="forumList" onclick="goNewsWindow('+item.id+')"><div class="ub-f1 ub ub-ver">';
		var trTitle = '<div class="title">'+item.subject+'</div>';
		var trOtherInfo = '<div class="otherInfo"><span>'+item.dateline+' '+item.author+'</span></div>';
		var trContent='<div class="title1"><img src="'+item.img+'" style="width:5em; height:5em; float:left;" />'+item.title+'</div>';
		var trFooter = '</div></div>';
		tr = trHeader+trTitle+trOtherInfo+trContent+trFooter;
		forumObj.append(tr);
	}
	uexWindow.closeToast();
}


function goThreadWindow(tid){
	uexWindow.toast("0","5","帖子查看功能已被屏蔽…","2000");
}
/**
 * 获取活动列表
 */
function  getActivity(){
	uexWindow.toast("1","5","数据加载中…","0");
	page++;
	var url = forumHost+'&m=Index&a=activity&page='+page;
	xmlHttp(url,showActList);
}
/**
 * 活动回调函数，用于处理服务器端返回的帖子数据，显示在客户端上
 * @param {Object} items	服务器端返回的json数据
 */
function showActList(items){
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
		var trHeader = '<div ontouchstart="zy_touch(\'btn-act\')" style="height:7em;" class="actList" onclick="goActWindow('+item.id+')"><div class="ub-f1 ub ub-ver">';
		var trTitle = '<div class="title">'+item.asubject+'</div>';
		var trOtherInfo = '<div class="otherInfo"><span>发起人：'+' '+item.author+'</span></div>';
		var trContent='<div class="title1"><img src="'+item.img+'" style="width:5em; height:5em; float:left;" />'+item.acontent+'</div>';
		var trFooter = '</div></div>';
		tr = trHeader+trTitle+trOtherInfo+trContent+trFooter;
		forumObj.append(tr);
	}
	uexWindow.closeToast();
}
/**
 * 活动详细跳转函数
 * @param {Object} data
 */
 function goActWindow(id){
 	localStorage.setItem('Actid',id);
 	 uexWindow.open("actcontent",0,"activity_content.html",0,"","",0);
 }
/**
 * 获取活动详细
 */
function  getActivityContent(){
	var id=localStorage.getItem('Actid');
	uexWindow.toast("1","5","数据加载中…","0");
	var url = forumHost+'&m=Index&a=activitycontent&uid='+localStorage.uid+'&id='+id;
	xmlHttp(url,showActListContent);
}
/**
 * 活动回调函数，用于处理服务器端返回的帖子数据，显示在客户端上
 * @param {Object} items	服务器端返回的json数据
 */
function showActListContent(items){
	var forumObj = $("#forum_list");
	forumObj.html('');
		var item = items.content;
		var atr='';
		if(items.ijoin>0) atr += '<div style="color:green;">已参加</div>';
		else if(localStorage.uid) atr+='<div onclick="ijoin();" style="cursor:pointer;style="color:orange;"">我要参加</div>';
		else atr+='<div style="color:red;">尚未登录</div>';
		atr+='<div style="color:#4169E1">'+items.joins+'/'+item.anum+'</div>';
		
		var tr = '';
		var trHeader = '<div ontouchstart="zy_touch(\'btn-act\')" class="actList"><div class="ub-f1 ub ub-ver">';
		var trTitle = '<div class="title">'+item.asubject+'</div>';
		var trOtherInfo = '<div class="otherInfo"><span>发起人：'+' '+item.author+'</span></div>';
		var trContent='<div class="act_img"><img src="'+item.img+'" style="width:15em; height:11.25em; margin-top:0.3125em;" /></div>';
		var trFooter = '<div class="title1">'+item.acontent+atr+'</div></div></div>';
		tr = trHeader+trTitle+trOtherInfo+trContent+trFooter;
		forumObj.append(tr);
	
	uexWindow.closeToast();
}
//  获取我参加的活动
function getActList(){
	var uid =localStorage.uid;
   	uexWindow.toast("1","5","数据加载中…","0");
    var url = apiHost+'&m=Index&a=getActList&uid='+uid;
    xmlHttp(url,showMyActList);
}
//  显示我参加的活动
function showMyActList(items){
	var forumObj = $("#content");
	forumObj.html('');
	for(var i in items){
		var item = items[i];
		
		var tr = '';
		var trHeader = '<div ontouchstart="zy_touch(\'btn-act\')"  class="shareList" onclick="goActWindow('+item.aid+');"><div class="ub-f1 ub ub-ver">';
		var trTitle = '<div class="title">'+item.adate+'</div>';
		var trOtherInfo = '<div class="otherInfo"></div>';
		var trContent='<div class="title1">'+item.asubject+'</div>';
		var trFooter = '</div>';
		tr = trHeader+trTitle+trOtherInfo+trContent+trFooter;
		forumObj.append(tr);
	}
	uexWindow.closeToast();
}
function ijoin(){
	var aid=localStorage.getItem('Actid');
	var uid=localStorage.getItem('uid');
	uexWindow.toast("1","5","数据加载中…","0");
	var url = forumHost+'&m=Index&a=newactivity&uid='+uid+'&aid='+aid;
	xmlHttp(url,showIjoin);
}
function showIjoin(json){
	alert(json.info);
	uexWindow.evaluateScript("actcontent","0","getActivityContent()");
}
/**
 * 发布活动调整函数
 * @param {Object} data
 */ 
  
  function goToPubAct(){
  	var uid =localStorage.uid;
	     if(uid){ uexWindow.open("pubActivity",0,"pubActivity.html",0,"","",0);}else
        {uexWindow.alert('提示','请登录！','返回');}
 	
 }
 /**
 * 新闻详细跳转函数
 * @param {Object} data
 */
 function goNewsWindow(id){
 	localStorage.setItem('nid',id);
 	 uexWindow.open("news",0,"news.html",0,"","",0);
 }
/**
 * 添加课程函数
 * @param {Object} data
 */ 
  
  function gocommitClass(){
  	     var uid =localStorage.uid;
		 var week = $('#week').val();
		 var number = $('#number').val();
		 var classname = $('#classname').val();
		 var teacher = $('#teacher').val();
		 var address = $('#address').val();
			  if(week.length < 1){
		      uexWindow.toast("0","5","添加失败，星期必填…","2000");
		      return false;
	             }
			  if(number.length < 1){
		      uexWindow.toast("0","5","添加失败，节数必填…","2000");
		      return false;
	             }
	          uexWindow.toast("1","5","添加中，请稍后…","0");
	          var url =  'http://c020901.vhost.bindow.cn/weixiao/index.php?callback=?&m=Index&a=addCommitClass&week='+week+'&number='+number+'&classname='+classname+'&teacher='+teacher+'&address='+address+'&uid='+uid;
	          //xmlHttp(url,showgocommitClass);
			  $.getJSON(url,function(json){
			  	 	uexWindow.closeToast();
					uexWindow.toast("0","5",json.info,"2000");
					if(json.status==1){
						location.reload();
					}
					//uexWindow.evaluateScript("root","0","windowOpen('activity')");
					uexWindow.evaluatePopoverScript('class','content','reloadlist()');
			  });
 }
/**
 * 修改课程函数
 * @param {Object} data
 */ 
  
  function goeditcommitClass(id){
  	     var uid =localStorage.uid;
		 var week = $('#week').val();
		 var number = $('#number').val();
		 var classname = $('#classname').val();
		 var teacher = $('#teacher').val();
		 var address = $('#address').val();
	          uexWindow.toast("1","5","添加中，请稍后…","0");
	          var url =  'http://c020901.vhost.bindow.cn/weixiao/index.php?callback=?&m=Index&a=editCommitClass&id='+id+'&week='+week+'&number='+number+'&classname='+classname+'&teacher='+teacher+'&address='+address+'&uid='+uid;
	          //xmlHttp(url,showgoeditcommitClass);
			  $.getJSON(url,function(json){
			  		uexWindow.closeToast();
					uexWindow.toast("0","5",json.info,"2000");
					//uexWindow.evaluateScript("root","0","windowOpen('activity')");
					uexWindow.evaluatePopoverScript('class','content','reloadlist()');
			  });
 }
 /**
 * 获取活动详细
 */
function  getNewsContent(){
	var id=localStorage.getItem('nid');
	uexWindow.toast("1","5","数据加载中…","0");
	var url = forumHost+'&m=Index&a=newscontent&id='+id;
	xmlHttp(url,showNewsContent);
}
/**
 * 活动回调函数，用于处理服务器端返回的帖子数据，显示在客户端上
 * @param {Object} items	服务器端返回的json数据
 */
function showNewsContent(items){
	var forumObj = $("#content");
	forumObj.html('');
		var subject = items.subject;
		var author = items.author;
		var img = items.img;
		var content = items.content;
		var dateline = items.dateline;
		
		
		var tr = '';
		var trHeader = '<div ontouchstart="zy_touch(\'btn-act\')" class="actList"><div class="ub-f1 ub ub-ver">';
		var trTitle = '<div class="title">'+subject+'</div>';
		var trOtherInfo = '<div class="otherInfo"><span>作者：'+' '+author+'</span><span>日期：'+' '+dateline+'</span></div>';
		var trContent='<div class="act_img"><img src="'+img+'" /></div>';
		var trFooter = '<div class="content1">'+content+'</div></div>';
		tr = trHeader+trTitle+trOtherInfo+trContent+trFooter;
		forumObj.append(tr);
	
	uexWindow.closeToast();
}