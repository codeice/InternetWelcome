//每一页的动画显示函数数组
var functionArray = new Array();

function setSrc(node){
	var src =  node.getAttribute('data-src');
	node.setAttribute('src',src);
}
//排序动画系列方法
function orderNodes(currentNode,nodes,count){
	var temp;
	if(count < nodes.length ){
		var index = $(currentNode).data('order');
		if(typeof index == 'number'){
			temp = nodes[index];
			nodes[index] = currentNode;
		}else{
			temp = nodes[count+1];
		}
		nodes = orderNodes(temp,nodes,count+1);
	}
	return nodes;
}
//动画系列依次执行方法
function animations(nodes){
	var interval = 0;
    var node,nextNode,animationName,offset,now,isTransition;
    for(var i = 0,l = nodes.length; i<l; i++){
        node = $(nodes[i]);
        animationName = node.data('animation');
        if(nodes[i+1]){
        	var duration = parseFloat(node.css('transition-duration'));
        	duration = duration ? duration : parseFloat(node.css('-webkit-transition-duration'));
        	if(!duration){
        		duration = parseFloat(node.css('animation-duration'));
        		duration = duration ? duration : parseFloat(node.css('-webkit-animation-duration'));
        		duration = duration ? duration : 0;
        	}
        	var delay = parseFloat(node.css('transition-delay'));
        	delay = delay ? delay : parseFloat(node.css('-webkit-transition-delay'));
        	if(!delay){
        		delay =  parseFloat(node.css('animation-delay'));
        		delay = delay ? delay : parseFloat(node.css('-webkit-animation-delay'));
        		delay = delay ? delay : 0;
        	}
        	interval = duration + delay;
        	now = interval;
        	offset = node.data('offset');
        	if(typeof offset == 'number'){
        		now = offset + interval;
        	}
        	nextNode = $(nodes[i+1]);
        	if(parseFloat(nextNode.css('transition-duration')) || parseFloat(nextNode.css('-webkit-transition-duration'))){
        		nextNode.css({'-webkit-transition-delay': now + 's','transition-delay': now + 's'});	
        	}else{
        		nextNode.css({'-webkit-animation-delay': now + 's','animation-delay':now + 's'});
        	}
        }
        node.addClass(animationName);
    };
}
//翻页过度动画
var goNextPage = {
	interval: null,
	teta: 45,
	gotoNext: function(contentBox){
		contentBox.removeClass('hide')
		var offset = contentBox[0].offsetTop;
		goNextPage.scrolling(offset);
		goNextPage.teta = 45;
	},
	step: function(offset){
    	var scrollHeight = $(window).scrollTop();
    	if(goNextPage.teta >22.5){
    		goNextPage.teta -= 0.1;
    	}
    	scrollHeight += goNextPage.teta;
    	if(scrollHeight >= offset){
    	  scrollHeight = offset;
    	  clearInterval(goNextPage.interval);
    	}
    	document.documentElement.scrollTop = scrollHeight;
    	document.body.scrollTop = scrollHeight;
  	},
	scrolling: function(offset){
    	goNextPage.interval = setInterval(function(){
    	  	goNextPage.step(offset);
    	}, 17);
	}
}
//svg 动画控制
var circleDrawing = {
	interval: null,
	degs: -90,
	arc: 804.2477057,
	circleText: document.getElementById('circleText'),
	circleLine: document.getElementById('circleLine'),
	bigCircle: document.getElementById('bigCircle'),
	step: function(){
		if(circleDrawing.degs==270){
				clearInterval(circleDrawing.interval);
		}  
    	else if(circleDrawing.degs < 270){
    		circleDrawing.degs += 1;
    	}  
    	else{
    		circleDrawing.degs -= 1;
    	}
    	circleDrawing.arc-=2.2340214;
    	circleDrawing.arc = circleDrawing.arc>0?circleDrawing.arc:0;
    	circleDrawing.bigCircle.setAttribute('stroke-dashoffset',circleDrawing.arc);
    	circleDrawing.circleText.setAttribute('transform','rotate('+ circleDrawing.degs +',0,0)');
    	circleDrawing.circleLine.setAttribute('transform','rotate('+ circleDrawing.degs +',0,0)');
	},
	drawing: function (){
		circleDrawing.interval = setInterval(function(){
			circleDrawing.step(circleDrawing.degs);
		}, 10);
	}
}

//show frist page
functionArray[0] = new Object();
functionArray[0].functions = function(){
	var animateNodes = $('#index-1 [data-animation]');
	animations(animateNodes);
}
//show second page
functionArray[1] = new Object();
functionArray[1].functions = function(){
	var building1 = $('#building1'),building2 = $('#building2');
	building2.on('load',function(){
		var animateNodes = $('#index-2 [data-animation]');
		animateNodes = orderNodes(animateNodes[0],animateNodes,0);
		animations(animateNodes);
	});
	building1.on('load',function(){
		setSrc(building2[0]);
	});
	setSrc(building1[0]);
}
//show third page
functionArray[2] = new Object();
functionArray[2].functions = function(){
	var animateNodes = $('#index-3 [data-animation]');
	animations(animateNodes);
}
//show the fourth page
functionArray[3] = new Object();
functionArray[3].functions = function(){
	var animateNodes = $('#index-4 [data-animation]');
	animations(animateNodes);
}
//show the fifth page
functionArray[4] = new Object();
functionArray[4].functions = function(){
	circleDrawing.drawing();
	var animateNodes = $('#index-5 [data-animation]');
	animateNodes = orderNodes(animateNodes[0],animateNodes,0);
	animations(animateNodes);
}
//show the sixth page
functionArray[5] = new Object();
functionArray[5].functions = function(){
	circleDrawing.drawing();
	var animateNodes = $('#index-6 [data-animation]');
	animations(animateNodes);
}
//show the seventh page
functionArray[6] = new Object();
functionArray[6].functions = function(){
	var animateNodes = $('#index-7 [data-animation]');
	animateNodes = orderNodes(animateNodes[0],animateNodes,0);
	animations(animateNodes);
}
//show the eighth page
functionArray[7] = new Object();
functionArray[7].functions = function(){
	var animateNodes = $('#index-8 [data-animation]');
	animations(animateNodes);
}
//show the ninth page
functionArray[8] = new Object();
functionArray[8].functions = function(){
	var animateNodes = $('#index-9 [data-animation]');
	animations(animateNodes);
}
//show the tenth page
functionArray[9] = new Object();
functionArray[9].functions = function(){
	var animateNodes = $('#index-10 [data-animation]');
	animations(animateNodes);
}
//show the eleventh page
functionArray[10] = new Object();
functionArray[10].functions = function(){
	var animateNodes = $('#index-11 [data-animation]');
	animations(animateNodes);
}

Zepto(function($){
	var myMusic = document.getElementById('myMusic');
	var playMusic = document.getElementById('playMusic');
	
	functionArray[0].functions();
	var supporttouch = (
	    ('ontouchstart' in window && /mobile|tablet/.test(navigator.userAgent.toLowerCase())) ||
	    (window.DocumentTouch && document instanceof window.DocumentTouch)  ||
	    (window.navigator.msPointerEnabled && window.navigator.msMaxTouchPoints > 0) || //IE 10
	    (window.navigator.pointerEnabled && window.navigator.maxTouchPoints > 0) || //IE >=11
	    false
	);
	if(supporttouch){
		$('#container .icon-arrow').each(function(i){
			addEvent('touchstart',this,turnToNextPage);
		});
		addEvent('touchstart',playMusic,function(){
			palyMusic(playMusic,myMusic);
		});
		document.ontouchstart = function(){
			myMusic.play();
			this.ontouchstart = null;
		}
	}else{
		$('#container .icon-arrow').click(function () {
			turnToNextPage.call(this);
		});
		$(playMusic).click(function(){
			palyMusic(this,myMusic);
		});
		document.onclick = function(){
			myMusic.play();
			this.onclick = null;
		}
	}
});

//翻页
function turnToNextPage(){
	var contentBox = $(this).closest('.content-box').next();
	if(contentBox.length ==0){
		return;
	}
	turningPage(contentBox);
}

//翻页后执行动画
function turningPage(contentBox){
	goNextPage.gotoNext(contentBox);
	var index = contentBox.index();
	if(functionArray[index] && !functionArray[index].ran){
		setTimeout(functionArray[index].functions,400);
		functionArray[index].ran = true;
	}
}

//添加事件监听
function addEvent(eventName, element, func) {
    if (document.addEventListener) {
    	element.addEventListener(eventName, function() {
    		func.call(element);
    	}, false);
    }
    else {
    	element.attachEvent("on" + eventName, function() {
    		func.call(element);
    	});
    }
}

function palyMusic(playButton,audio){
	playButton = $(playButton);
	if (audio.paused){
  		audio.play();
  		playButton.removeClass('off');
	}else {
	  audio.pause();
	  playButton.addClass('off') ;
	} 
	
}

