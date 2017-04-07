(function(window){
	function addClass(e, c) {
		var newclass = e.className.split(" ");
		if(e.className == "") newclass = [];
		newclass.push(c);
		e.className = newclass.join(" ");
	};
	function extend(source, target){
		for(var key in target){
			source[key] = target[key];
		}
		return source;
	}
	function getFontSize(){
		var clientWidth = document.documentElement.clientWidth;
		if(clientWidth < 640)
			return 16 * (clientWidth / 375) + "px";
		else
			return 16;
	}
	
	var layer = {
		initOpen: function(dom, options){
			dom.style.fontSize = getFontSize();
						
			var body = document.querySelector("body");
			var bg = document.createElement("div");
			addClass(bg, "mobile-dialog-bg");
			
			if(options.bottom){
				bg.addEventListener("click", function(){
					handleClose();
				});
			}
			
			body.appendChild(bg);
			body.appendChild(dom);
			
			var isAnimationEnd = false;
			if(dom.style["webkitAnimation"] != undefined || dom.style["animation"] != undefined){
				isAnimationEnd = true;
			}
			function handleClose(){
				if(isAnimationEnd){
					layer.close([bg]);
					addClass(dom, options.closeAnimation);
					dom.addEventListener("webkitAnimationEnd", function(){
						layer.close([dom]);
					});
					dom.addEventListener("animationend", function(){
						layer.close([dom]);
					});
				}else{
					layer.close([bg, dom]);
				}
			}
			
			//set button click event
			options.btns.forEach(function(btn, i){
				if(i != 0 && i <= options.btns.length - 1){
					if(!options.bottom){
						btn.addEventListener("click", function(){
							handleClose();
							options.sureBtnClick();
						});
					}else{
						btn.addEventListener("click", function(){
							handleClose();
							options.btnClick(this.getAttribute("i"));
						});
					}
				}else{
					btn.addEventListener("click", handleClose);
				}
			});
			
			if(!options.bottom){
				//set position
				dom.style.top = (document.documentElement.clientHeight - dom.offsetHeight) / 2 + "px";
				dom.style.left = (document.documentElement.clientWidth - dom.offsetWidth) / 2 + "px";
			}
		},
		close: function(doms){
			var body = document.querySelector("body");
			for(var i = 0; i < doms.length; i++){
				body.removeChild(doms[i]);
			}
		}
	};
	
	var dialog = {
		alert: function(content){
			var btn = document.createElement("div");
			btn.innerText = "确定";
			addClass(btn, "dialog-button");
			
			var opts = {};
			opts.btns = [btn];
			
			this.open(content, opts);
		},
		confirm: function(content, options){
			var opts = {
				sureBtnText: "确定",
				sureBtnClick: function(){}
			};
			opts = extend(opts, options);
			
			var cancelBtn = document.createElement("div");
			cancelBtn.innerText = "取消";
			addClass(cancelBtn, "dialog-cancel-button");
			
			var sureBtn = document.createElement("div");
			sureBtn.innerText = opts.sureBtnText;
			addClass(sureBtn, "dialog-sure-button");
			
			opts.btns = [cancelBtn, sureBtn];
			this.open(content, opts);
		},
		open: function(content, options){
			var dialog = document.createElement("div");
			var dialogContent = document.createElement("div");
			
			addClass(dialog, "mobile-dialog");
			addClass(dialog, "animation-zoom-in");
			addClass(dialogContent, "dialog-content");
			
			dialogContent.innerText = content;
			
			dialog.appendChild(dialogContent);
			
			options.btns.forEach(function(btn, i){
				dialog.appendChild(btn);
			});
			options.closeAnimation = "animation-zoom-out";
			
			layer.initOpen(dialog, options);
		},
		showBottom: function(options){
			var opts = {
				btn: ["删除"],
				btnColor: [],
				btnClick: function(index){}
			};
			opts = extend(opts, options);
			opts.bottom = true;
			if(opts.btn.length == 1 && opts.btn[0] == "删除"){
				opts.btnColor = ["#EE2C2C"];
			}
			
			var bottomDialog = document.createElement("div");
			var dialogItem = document.createElement("div");
			var cancelBtn = document.createElement("div");
			cancelBtn.innerText = "取消";
			addClass(bottomDialog, "mobile-bottom-dialog");
			addClass(bottomDialog, "animation-bottom-in");
			addClass(dialogItem, "bottom-btn-item");
			addClass(cancelBtn, "dialog-cancel-btn");
			
			bottomDialog.appendChild(dialogItem);
			bottomDialog.appendChild(cancelBtn);
			
			opts.btns = [];
			opts.btns.push(cancelBtn);
			opts.btn.forEach(function(btn, i){
				var btn = document.createElement("div");
				btn.innerText = opts.btn[i];
				btn.setAttribute("i", i + 1);
				addClass(btn, "dialog-item-btn");
				if(opts.btnColor[i])
					btn.style.color = opts.btnColor[i];
				dialogItem.appendChild(btn);
				opts.btns.push(btn);
			});
			opts.closeAnimation = "animation-bottom-out";
			
			layer.initOpen(bottomDialog, opts);
		},
		toast: function(content, time){
			time = time || 3;
			var toast = document.createElement("div");
			var toastContent = document.createElement("div");
			
			addClass(toast, "mobile-toast");
			addClass(toast, "animation-fade-in");
			addClass(toastContent, "toast-content");
			
			toastContent.innerText = content;
			
			toast.appendChild(toastContent);
			
			var body = document.querySelector("body");
			body.appendChild(toast);
			
			toast.style.fontSize = getFontSize();
			toast.style.left = (document.documentElement.clientWidth - toast.offsetWidth) / 2 + "px";
			
			setTimeout(function(){
				body.removeChild(toast);
			}, time * 1000);
		},
		loadElement: [],
		loading: function(options){
			var opts = {
				src: "img",
				hint: ""
			}
			opts = extend(opts, options);
			
			var loadingBg = document.createElement("div");
			var loading = document.createElement("div");
			var img = document.createElement("img");
			
			addClass(loadingBg, "mobile-loading-bg");
			addClass(loading, "mobile-loading");
			addClass(loading, "animation-zoom-in");
			img.src = opts.src + "/loading.gif";
			loading.appendChild(img);
			
			if(opts.hint){
				var loadingContent = document.createElement("div");
				addClass(loadingContent, "loading-content");
				loadingContent.innerText = opts.hint;
				loading.appendChild(loadingContent);
			}
			
			var body = document.querySelector("body");
			body.appendChild(loadingBg);
			body.appendChild(loading);
			
			loading.style.fontSize = getFontSize();
			loading.style.left = (document.documentElement.clientWidth - loading.offsetWidth) / 2 + "px";
			loading.style.top = (document.documentElement.clientHeight - loading.offsetHeight) / 2 + "px";
			
			this.loadElement.push(loadingBg);
			this.loadElement.push(loading);
		},
		closeLoading: function(){
			layer.close(this.loadElement);
			this.loadElement = [];
		}
	}
	
	window.dialog = dialog;
})(window);
