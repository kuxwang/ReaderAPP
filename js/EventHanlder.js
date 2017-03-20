//DOM元素
var Dom={
	top_nav : $('#top_nav'),           				//上导航
	bottom_nav : $('.bottom_nav'),					//下导航
	font_container : $('.font_container'),			//内容字体
	night_day_switch_button :$('#night_button'),	//黑白切换按钮
	font_button :$('#font_button'),					//字体设置按钮
	chapter_bk : $('.chapter_bk'),
	chapter_list : $('.chapter_list')
}
var RootContainer=$('#fiction_container');    		//内容区域
var Win=$(window);
var Doc=$(document);
var readerUI;    //向内容区添加内容
readerUI=ReaderBaseFrame(RootContainer);


//取得默认字体
var initFontSize=Util.StorageGetter('font_size');
initFontSize=parseInt(initFontSize);
if(!initFontSize){
	initFontSize=14;
}
RootContainer.css('font-size',initFontSize); //设置内容区字体

//取得默认背景颜色
var initBackground=Util.StorageGetter('background');
if(!initBackground){
	initBackground='#eee';
}
RootContainer.css('background-color',initBackground);


//time key值 false白天
var time=Util.StorageGetter('time');
if(time=='false') {
	$('#day_icon').hide();
	$('#night_icon').show();
};
if(time=='true') {
	$('#day_icon').show();
	$('#night_icon').hide();
};

//滚动时所有导航隐藏
Win.scroll(function(){
	Dom.top_nav.hide();
	Dom.bottom_nav.hide();
	Dom.font_container.hide();
	Dom.font_button.removeClass('current');
});

//点击显示按钮 弹出选项  
Dom.font_button.click(function(){
	if(Dom.bottom_nav.css('dispaly') !== 'none' && Dom.font_container.css('display')==='none'){
		Dom.font_container.show();
		Dom.font_button.addClass('current');
	}else{
		Dom.font_container.hide();
		Dom.font_button.removeClass('current');

	};
});					
//白天晚上切换
Dom.night_day_switch_button.click(function(){
	if($('#day_icon').css('display')=='none'){
		$('#day_icon').show();
		$('#night_icon').hide();
		RootContainer.css('background-color','#333333');
		Util.StorageSetter('background','#333333');
		Util.StorageSetter('time',true);
	}else{
		$('#day_icon').hide();
		$('#night_icon').show();
		RootContainer.css('background-color','#F8F8F8');
		Util.StorageSetter('background','#F8F8F8');
		Util.StorageSetter('time',false);
	};					
});

//增大字体
$('#large_font').click(function(){
	if(initFontSize>20){
		return;
	};
	initFontSize+=1;
	RootContainer.css('font-size',initFontSize);
	Util.StorageSetter('font_size',initFontSize);
});
//减小字体
$('#small_font').click(function(){
	if(initFontSize<12){
		return;
	};
	initFontSize-=1;
	RootContainer.css('font-size',initFontSize);
	Util.StorageSetter('font_size',initFontSize);
});
//设置背景颜色   默认是#eee
$('.bk_container').click(function(){
	//bk_color 获取点击的这个DIV内图标的颜色  将改颜色存入localStorage
	var bk_color=$(this).find('div').css('background-color');
	RootContainer.css('background-color',bk_color);
	Util.StorageSetter('background',bk_color);
});


//上一章
$('#prev_button').click(function(){
	prevChapter(function(data){
		readerUI(data);
	});
});
//下一章
$('#next_button').click(function(){
	nextChapter(function(data){
		readerUI(data);
	});
});
//目录按钮
$('#menu_button').click(function(){
	if(Dom.bottom_nav.css('dispaly') !== 'none' && Dom.chapter_bk.css('display') =='none'){
		Dom.chapter_bk.show();
		Dom.chapter_list.show();
		//点击目录选项切换章节 
		Dom.chapter_list.delegate('li','click',function(event){
		var index=$(this).index();
	
		$.get('data/chapter.json',function(data){
			getCurChapterContent(index+1,function(data){
				readerUI(data);
			});
			Util.StorageSetter('last_chapter_id',index+1);
		},'json');
		event.stopPropagation()
})
	}else{
		 Dom.chapter_bk.hide();
		 Dom.chapter_list.hide();
	};
});

//点击屏幕中间弹出/关闭导航
$('#action_mid').click(function(){
if(Dom.top_nav.css('display')==='none'){
	Dom.top_nav.show();
	Dom.bottom_nav.show();

}else{
	Dom.top_nav.hide();
	Dom.bottom_nav.hide();
	Dom.font_container.hide();
	Dom.font_button.removeClass('current');
};
});
//点击屏幕下方下翻页	
$('#next_action_mid').click(function(){
	var i=$('body').scrollTop();
	i += 635;
	$('body').scrollTop(i);		
});
//点击屏幕上方上翻页	
$('#prev_action_mid').click(function(){
	var i=$('body').scrollTop();
	i -= 635;
	$('body').scrollTop(i);
});