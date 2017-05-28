var stage, bgPic, textMaskPic;

function showToast(errMsg) {
	$(".toast .toast-msg").text(errMsg);
	$(".toast").show();
	setTimeout(function() {
		$(".toast").hide();
	}, 1500);
}
$(function() {
	stage = new createjs.Stage("Canvas");
	bgPic = new Image();
	bgPic.src = "img/bg.jpg";

	bgPic.onload = handleBgLoad;
})

function handleBgLoad(event) {
	var image = event.target;
	var bitmap = new createjs.Bitmap(image);
	stage.addChild(bitmap);
	stage.update();
}

function addText() {
	bgPic = new Image();
	bgPic.src = "img/bg.jpg";

	bgPic.onload = handleBgLoad;
	var text = $("#name-ipt").val() + "520♡";
	var textArry = text.split("");
	var textLength = textArry.length;
	var container = new createjs.Container();
	container.x = 245;
	container.y = 140;
	container.setBounds(0, 0, 70, 657);

	var fontSize = 40;
	$.each(textArry, function(index, value) {
		var text = new createjs.Text(value, "40px Arial", "#feffd5");
		text.set({
			textAlign: 'center',
		});
		var matrix = new createjs.Matrix2D(1.1, -0.6 + (0.3 / textLength) * index, 0, 1, 0, (fontSize + 5) * index);
		matrix.decompose(text);
		container.addChild(text);
	});
	textMaskPic = new Image();
	textMaskPic.src = "img/text-bg.png";
	textMaskPic.onload = function() {
		var image = event.target;
		var bitmap = new createjs.Bitmap(image);
		bitmap.x = -19;
		bitmap.scaleX = 400 / 750;
		bitmap.scaleY = 400 / 750;
		container.addChild(bitmap);
		stage.addChild(container);
		stage.update();

	}

}
var str = '';
var now = ''
$(function() {
	$('#name-ipt').bind('focus', filter_time);
	$("#btn").bind("click", function() {

		if ($("#name-ipt").val() == "") {
			showToast("请输入姓名");
			return false;
		}
		$(".loading").show();
		$(".form").hide();
		addText();

		setTimeout(function() {
			var canvas = document.getElementById("Canvas");
			$.post("/pic", {
				imgData: canvas.toDataURL("image/png")
			}, function(result) {
				location.href = "/pic/" + result.id
			});
		}, 200)

	})
})

function filter_time() {
	var time = setInterval(filter_staff_from_exist, 100);
	$(this).bind('blur', function() {
		clearInterval(time);
	});
};

function filter_staff_from_exist() {
	now = $.trim($('#name-ipt').val());
	if (now != '' && now != str) {		
		addText();
	}
	str = now;
}

$(function() {
	
	
})