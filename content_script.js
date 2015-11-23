
console.log("Started!");

//html中注入浮动框
injectDom(document);

chrome.runtime.sendMessage({method: "getLocalStorage", key: "height"}, function(response) {
  console.log(response.data);
  var height = response.data; 

	if(!isNaN(height))
	{
		console.log("数字");
		modify(height);
	}  
});


function modify(newHeight)
{	
	{
		var style = "overflow: auto; width: 100%; height:" + newHeight + "px;"
		console.log("%s", style);
    	$(".dataTables_scrollBody").attr("style", style);
	}
}

function injectDom(doc){
	var oDisplay, oStyle, oHeader, oSwithcer, oScore;

    oDisplay = doc.createElement("div");
    oDisplay.className = "noahlu-miao";
    oDisplay.id = "noahlu-miao";

    oHeader = doc.createElement("header");
    oHeader.innerHTML = "<div>DBQuery Helper</div>" +
                        " [<a href='#' class='noahlu-miao-link'>展开</a>]";


    oStyle = doc.createElement("style");
    oStyle.innerHTML =
        ".noahlu-miao{border-radius:2px;background-color:rgba(5,5,5,0.15); padding:3px; position:fixed;top:30px;left:30px;z-index:1000000000;}" +
        ".noahlu-miao header{text-align:center;}" +
        ".noahlu-miao-link{font-size:10px; color:red;text-decoration:underline;margin-bottom:3px;text-align:center}" +
        ".noahlu-miao-timer{color:#fff;font-size:20px;padding:5px;border:1px solid #aaa;background-color:#bbb;border-radius:4px;}" +
        ".noahlu-score{text-align:center;color:red;}" +
        ".noahlu-miao-info{text-align: center; margin: 0px; font-size: 12px;}" +
        ".noahlu-hide{display:none}"

    oScore = doc.createElement('div');
    oScore.className = 'noahlu-score noahlu-hide';
    oScore.id = 'noahlu-score';

    oDisplay.appendChild(oHeader);
    oDisplay.appendChild(oScore);

    doc.head.appendChild(oStyle);
    doc.body.appendChild(oDisplay);

    // Toggle timer
    oSwithcer = oHeader.querySelectorAll('a')[0];
    oSwithcer.innerHTML = "刷新";
    oSwithcer.addEventListener('click', function(e){
        e.preventDefault();

        console.log("click!");
		chrome.runtime.sendMessage({method: "getLocalStorage", key: "height"}, function(response) {
 		console.log(response.data);
 		var height = response.data; 

		if(!isNaN(height))
		{
			console.log("数字");
            if (height <= 0) 
            {
                alert('请先设置大于0的高度！');
            }
            else
            {
			     modify(height);
            }
		}  
        else
        {
           alert('设置的高度值有非法字符！');
        }
});        
    })
}

