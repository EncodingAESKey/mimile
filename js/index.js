//搜索框的ul
function fn(data){
//	jqautocompletecallback([{"name":"棉袄","count":2,"categoryname":null,"categoryid":null},{"name":"棉被","count"
//:5,"categoryname":null,"categoryid":null},{"name":"棉服","count":2,"categoryname":null,"categoryid":null
//},{"name":"棉服 男","count":2,"categoryname":null,"categoryid":null},{"name":"棉服女","count":358,"categoryname"
//:null,"categoryid":null},{"name":"棉麻","count":4,"categoryname":null,"categoryid":null},{"name":"棉马甲"
//,"count":1,"categoryname":null,"categoryid":null},{"name":"棉袜","count":26,"categoryname":null,"categoryid"
//:null},{"name":"棉鞋","count":7,"categoryname":null,"categoryid":null},{"name":"棉服女 海外","count":-1,"categoryname"
//:null,"categoryid":null}])
	//console.log(data);
	for(var i = 0; i < data.length; i ++){
		var oLi = document.createElement("li");
		oLi.className = "searchLi";
		oLi.innerHTML = data[i].name;
		searchUl.appendChild(oLi);
	}
	searchUl.onmousemove = function(evt){
		var e = evt || window.event;
		var target = e.srcElement || e.target;
		if(target.nodeName.toLowerCase() == "li"){
			target.style.background = "#D93600";
			target.style.color = "white";
			target.onclick = function(){
				keyword.value = target.innerHTML;
			}
		}
	}
	searchUl.onmouseout = function(evt){
		var e = evt || window.event;
		var target = e.srcElement || e.target;
		if(target.nodeName.toLowerCase() == "li"){
			target.style.background = "";
			target.style.color = "";
		}
	}
}
//楼层的上下图片轮播
$.extend({
	//par  装ul的父节点
	//lBtn 左按钮
	//rBtn 右按钮
	updown : function(json){
		//找到对应的元素节点
		var par = $("." + json.par);
		var lBtn = $("." + json.lBtn);
		var rBtn = $("." + json.rBtn);
		//拷贝当前的ul 当第一个ul运动完之后 运动第二个，再把第一个ul添加到第二个后面
		var ul = par.children("ul");
		var li = ul.children("li");
		//克隆前三个li  当最后一个li出现时把ul的top改为0
		var li1 = li.first().clone();
		ul.append(li1);
		var li2 = li.eq(1).clone();
		ul.append(li2);
		var li3 = li.eq(2).clone();
		ul.append(li3);
		//获得li的个数
		var size = li.size();
		function toTop(){
			i ++;
			if(i == size + 1){
				$(ul).css("top",0);
				i = 0;
			}
			$(ul).stop().animate({top : -i * 50});
		}
		function toBottom(){
			i --;
			if(i == -1){
				$(ul).css({"top" : -(size - 1) * 50});
				i = size - 2;
			}
			$(ul).stop().animate({top : -i * 50});
		}
		//盒子的移入移除事件
		$(par).hover(function(){
			clearInterval(timer);
		},function(){
			timer = setInterval(function(){
				toTop();
			},3000)
		})
		//左按钮右按钮进入时清除计时器 离开时开启计时器
		lBtn.mouseenter(function(){
			clearInterval(timer);
		}).mouseleave(function(){
			clearInterval(timer);
			timer = setInterval(function(){
				toLeft();
			},3000);
		})
		rBtn.mouseenter(function(){
			clearInterval(timer);
		}).mouseleave(function(){
			clearInterval(timer);
			timer = setInterval(function(){
				toBottom();
			},3000);
		})
		//左按钮点击
		lBtn.click(function(){
			toBottom();
		})
		//右按钮
		rBtn.click(function(){
			toTop();
		})
		//让ul运动
		var timer = setInterval(function(){
			toTop();
		},3000);
		var i = 0;
	}
})
//楼层的左右图片轮播
$.extend({
	//par  装ul的父节点
	//lBtn 左按钮
	//rBtn 右按钮
	funk : function(json){
		//找到对应的元素节点
		var par = $("." + json.par);
		var lBtn = $("." + json.lBtn);
		//console.log(lBtn)
		var rBtn = $("." + json.rBtn);	
		
		var ul = par.children("ul");
		//克隆第一个li  当最后一个li出现时把ul的left改为0
		var li1 = ul.children("li").first().clone();

		ul.append(li1);
		
		var li = ul.children("li");
		//获得li的宽度
		var wid = li.first().width();
		//获得li的个数
		var size = li.size();
		
		var i = 0;
		function toLeft(){
			i ++;
			if(i == size){
				$(ul).css({left : 0});
				i = 1;
			}
			$(ul).stop().animate({left : -i * wid});
		}
		function toRight(){
			i --;
			if(i == -1){
				$(ul).css({left : -(size - 1) * wid});
				i = size - 2;
			}
			$(ul).stop().animate({left : -i * wid});
		}
		//盒子的移入移除事件
		//移除时一定要再清除一次计时器让后重新开启计时器 不然就会触发多个计时器导致图片移动速度变快
		$(par).hover(function(){
			clearInterval(timer);
		},function(){
			clearInterval(timer);
			timer = setInterval(function(){
				toLeft();
			},3000);
		})
		//左按钮右按钮进入时清除计时器 离开时开启计时器
		lBtn.mouseenter(function(){
			clearInterval(timer);
		}).mouseleave(function(){
			clearInterval(timer);
			timer = setInterval(function(){
				toLeft();
			},3000);
		})
		rBtn.mouseenter(function(){
			clearInterval(timer);
		}).mouseleave(function(){
			clearInterval(timer);
			timer = setInterval(function(){
				toLeft();
			},3000);
		})
		//左按钮点击
		lBtn.click(function(){
			toRight();
		})
		//右按钮
		rBtn.click(function(){
			toLeft();
		})
		
		//让ul运动
		var timer = setInterval(function(){
			toLeft();
		},3000);
	}
})