
(function(){
	var $=function(id){return document.getElementById(id);}
	var Tasks = {
		show:function(obj){
			obj.className='';
			return this;
		},
		hide:function(obj){
			obj.className='hide';
			return this;
		},
		//存储dom
		$txtHeight:$('txtHeight'),
		$modifyButton:$('modifyButton'),
		//指针
		height:window.localStorage.getItem('height'),
		//初始化
		init:function(){
            //读取保存的值
			Tasks.$txtHeight.value = Tasks.height;

			/*注册事件*/
			//回车修改
			Tasks.$modifyButton.addEventListener('click',function(){
               window.localStorage.setItem('height', Tasks.$txtHeight.value);
			}, false);

			Tasks.$txtHeight.addEventListener('keyup', function()
				{
                  Tasks.$txtHeight.value=Tasks.$txtHeight.value.replace(/[^\d]/g,'')   
				},true);

			Tasks.$txtHeight.addEventListener('beforepaste', function(){
                clipboardData.setData('text',clipboardData.getData('text').replace(/[^\d]/g,''))
			});
		}
	}
	Tasks.init();
})();
