var data = $('#inputLoadTag').val();
data = JSON.parse(data);
creatMenu('#main-container',data);
function creatMenu(parentDomId,data){
//=================================================================
var sidebarDom = $('<div class="sidebar" id="sidebar"></div>');
//==============================
var sidebar_shortcutsDom = $('<div class="sidebar-shortcuts" id="sidebar-shortcuts"></div>');
var sidebar_shortcuts_largeDom = $('<div class="sidebar-shortcuts-large" id="sidebar-shortcuts-large"></div>');
var sidebar_shortcuts_miniDom = $('<div class="sidebar-shortcuts-mini" id="sidebar-shortcuts-mini"></div>');
//================================
sidebar_shortcuts_largeDom.appendTo(sidebar_shortcutsDom);
sidebar_shortcuts_miniDom.appendTo(sidebar_shortcutsDom);
var sidebarHiddle = $('<input type="hidden" id="sidebarHiddle" class="sidebarHiddle">');
sidebarHiddle.appendTo(sidebarDom);
sidebar_shortcutsDom.appendTo(sidebarDom);
//===============================================================
var dataList = '<ul class="nav nav-list">';
$.each(data.ArrJson,function(index1,item1){
	if(item1.active){sidebarHiddle.attr('data-nth1',index1);}
	if(!item1.children){
		if(item1.iclass == 'icon-calendar'){
			dataList+='<li><a href="'+item1.url+'"><i class="'+item1.iclass+'"></i><span class="menu-text">'+item1.name+'<span class="badge badge-transparent tooltip-error" title="" data-original-title="'+item1.calendarNum+'&nbsp;Important&nbsp;Events"><i class="icon-warning-sign red bigger-130"></i></span></span></a></li>';
		}else{
    		dataList+='<li><a href="'+item1.url+'"><i class="'+item1.iclass+'"></i><span class="menu-text">'+item1.name+'</span></a></li>';
		}
	}else{
		if(item1.iclass == 'icon-file-alt'){
			dataList+='<li><a href="'+item1.url+'" class="dropdown-toggle"><i class="'+item1.iclass+'"></i><span class="menu-text">'+item1.name+'<span class="badge badge-primary ">'+item1.otherPages+'</span></span><b class="arrow icon-angle-down"></b></a><ul class="submenu">';
		}else{
			dataList+='<li><a href="'+item1.url+'" class="dropdown-toggle"><i class="'+item1.iclass+'"></i><span class="menu-text">'+item1.name+'</span><b class="arrow icon-angle-down"></b></a><ul class="submenu">';
		}
		$.each(item1.children,function(index2,item2){
			if(item2.active){sidebarHiddle.attr('data-nth1',index1).attr('data-nth2',index2);};
		    if(!item2.children){
		    	dataList+='<li><a href="'+item2.url+'"><i class="'+item2.iclass+'"></i>'+item2.name+'</a></li>';
		    }else{
		    	dataList+='<li><a href="'+item2.url+'" class="dropdown-toggle"><i class="'+item2.iclass+'"></i>'+item2.name+'<b class="arrow icon-angle-down"></b></a><ul class="submenu">';
		    	$.each(item2.children,function(index3,item3){
		    		if(item3.active){sidebarHiddle.attr('data-nth1',index1).attr('data-nth2',index2).attr('data-nth3',index3);};
				    if(!item3.children){
				    	dataList+='<li><a href="'+item3.url+'"><i class="'+item3.iclass+'"></i>'+item3.name+'</a></li>';
				    }else{
				    	dataList+='<li><a href="'+item3.url+'" class="dropdown-toggle"><i class="'+item3.iclass+'"></i>'+item3.name+'<b class="arrow icon-angle-down"></b></a><ul class="submenu">';
				    	$.each(item3.children,function(index4,item4){
				    		if(item4.active){sidebarHiddle.attr('data-nth1',index1).attr('data-nth2',index2).attr('data-nth3',index3).attr('data-nth4',index4);};
				    		if(!item4.children){
						    	dataList+='<li><a href="'+item4.url+'"><i class="'+item4.iclass+'"></i>'+item4.name+'</a></li>';
							}
						});
				    	dataList+='</ul></li>';
				    }
				});
		    	dataList+='</ul></li>';
		    }
		});
		dataList+='</ul></li>';
	}
});
dataList+='</ul>';
$(sidebarDom).append(dataList);
//============================================
var sidebar_collapse = '<div class="sidebar-collapse" id="sidebar-collapse"><i class="icon-double-angle-left"></i></div>';
sidebarDom.append(sidebar_collapse);
sidebarDom.appendTo(parentDomId);
var findSidebarHiddle = sidebarDom.find('#sidebarHiddle');
var nth1,nth2,nth3,nth4;
if(findSidebarHiddle.attr('data-nth4')){
	sidebarDom.find('.nav-list>li:eq("'+findSidebarHiddle.attr('data-nth1')+'")').addClass('active open');
	sidebarDom.find('.nav-list>li:eq("'+findSidebarHiddle.attr('data-nth1')+'")>ul>li:eq("'+findSidebarHiddle.attr('data-nth2')+'")').addClass('active  open');
	sidebarDom.find('.nav-list>li:eq("'+findSidebarHiddle.attr('data-nth1')+'")>ul>li:eq("'+findSidebarHiddle.attr('data-nth2')+'")>ul>li:eq("'+findSidebarHiddle.attr('data-nth3')+'")').addClass('active  open');
	sidebarDom.find('.nav-list>li:eq("'+findSidebarHiddle.attr('data-nth1')+'")>ul>li:eq("'+findSidebarHiddle.attr('data-nth2')+'")>ul>li:eq("'+findSidebarHiddle.attr('data-nth3')+'")>ul>li:eq("'+findSidebarHiddle.attr('data-nth4')+'")').addClass('active');
}else if(findSidebarHiddle.attr('data-nth3')){
	sidebarDom.find('.nav-list>li:eq("'+findSidebarHiddle.attr('data-nth1')+'")').addClass('active  open');
	sidebarDom.find('.nav-list>li:eq("'+findSidebarHiddle.attr('data-nth1')+'")>ul>li:eq("'+findSidebarHiddle.attr('data-nth2')+'")').addClass('active  open');
	sidebarDom.find('.nav-list>li:eq("'+findSidebarHiddle.attr('data-nth1')+'")>ul>li:eq("'+findSidebarHiddle.attr('data-nth2')+'")>ul>li:eq("'+findSidebarHiddle.attr('data-nth3')+'")').addClass('active');
}else if(findSidebarHiddle.attr('data-nth2')){
	sidebarDom.find('.nav-list>li:eq("'+findSidebarHiddle.attr('data-nth1')+'")').addClass('active  open');
	sidebarDom.find('.nav-list>li:eq("'+findSidebarHiddle.attr('data-nth1')+'")>ul>li:eq("'+findSidebarHiddle.attr('data-nth2')+'")').addClass('active');
}else if(findSidebarHiddle.attr('data-nth1')){
	sidebarDom.find('.nav-list>li:eq("'+findSidebarHiddle.attr('data-nth1')+'")').addClass('active');
}




}