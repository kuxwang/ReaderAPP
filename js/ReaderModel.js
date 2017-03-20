//获取章节信息
var Chapter_id;
var ChapterTotal;
var title_list=[];
//Init接收一个函数为参数，返回该函数 将获得的数据作为该函数的参数

var Init =function(UIcallback){
	getFictionInfo(function(data){     //  data是chapter.json数据
		getCurChapterContent(Chapter_id,function(jiemadata){ //data和上面没用关系
			UIcallback && UIcallback(jiemadata); //这里data是章节内容解码的data
			
		});
	});
};

var getFictionInfo=function(callback){
	$.get('data/chapter.json',function(data){
		//获得章节信息的回调
		Chapter_id=Util.StorageGetter('last_chapter_id');
		if(Chapter_id ==null){
			Chapter_id= data.chapters[1].chapter_id;//从JSON里获取ID
		}
		ChapterTotal=data.chapters.length;		
		//将获取的标题放入title_list数组
		for(var s=0;s<ChapterTotal;s++){
			var title = data.chapters[s].title;
			title_list.push(title);
		};
		//将数组中的值每一个作为一个li添加到html里
		for(var x=0;x<ChapterTotal;x++){
			var html_li=$('<li calss="hehe">' + title_list[x]+ '</li>');
			Dom.chapter_list.append(html_li);
		};
		//
		callback && callback(data); //参数chapter.json的数据 
	},'json')
};
var getCurChapterContent=function(chapter_id,contentCallback){
	//获得章节的内容
	$.get('data/data' +chapter_id+ '.json',function(data){//特定ID data
		if(data.result == 0) {
			var url=data.jsonp;
			Util.getBSONP(url,function(jiemadata){
				contentCallback && contentCallback(jiemadata);  //data变为指定id解析后的json数据
			});
		}
	},'json')
};
var prevChapter = function(UIcallback){
	Chapter_id = parseInt(Chapter_id,10);
	if(Chapter_id == 0){
		return;
	}
	Chapter_id -= 1;
	getCurChapterContent(Chapter_id,UIcallback);
	Util.StorageSetter('last_chapter_id',Chapter_id);
	
}
var nextChapter = function(UIcallback){
	Chapter_id = parseInt(Chapter_id,10);
	if(Chapter_id == ChapterTotal){
		return;
	};
	Chapter_id += 1;
	getCurChapterContent(Chapter_id,UIcallback);
	Util.StorageSetter('last_chapter_id',Chapter_id);
}



	

//渲染基本的UI结构
function ReaderBaseFrame(container){
	//JSON数据传入返回一个HTML
	function parseChapterData(jsonData){
		var jsonObj=JSON.parse(jsonData);
		var html='<h4>' +jsonObj.t+ '</h4>';
		for(var i=0;i<jsonObj.p.length;i++) {
			html +='<p>' + jsonObj.p[i] + '</p>'
		};
		return html;
	}
	//添加到内容区
	return function(data){
		container.html(parseChapterData(data));
	}	
};

function xuanRan(container,jsonData){
	//转换为JS的对象
	var content=JSON.parse(jsonData);
	var html='<h4>' +content.t+ '</h4>';
	for(var i=0;i<content.p.length;i++) {
		html +='<p>' + content.p[i] + '</p>'
	};
	var button=$('<div class="m_button_bar"><ul class="u_tab"><li id="prev_button">上一章</li><li id="next_button">下一章</li></ul></div>')
	container.html(html);
	container.append(button);
}





