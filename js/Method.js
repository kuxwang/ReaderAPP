/*    封装LocalStorage方法和JSONP解码    */
var Util=(function(){
	var prefix='html5_reader_';
	var StorageGetter=function(key){
		return localStorage.getItem(prefix + key);
	};
	var StorageSetter=function(key,val){
		return localStorage.setItem(prefix + key,val);
	};
	var getBSONP=function(url,callbacK){
		return $.jsonp({
			url : url,
			cache : true,
			callback : 'duokan_fiction_chapter',
			success : function(result){	
				var data=$.base64.decode(result);
				var json = decodeURIComponent(escape(data));				
				callbacK(json);
			}
		});
	};
	return {
		getBSONP : getBSONP,
		StorageGetter : StorageGetter,
		StorageSetter : StorageSetter
	};
})();