var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

var N = 0;

function koch3(n, alpha, x0, y0, length) {
	if (n == 0) {
		var x1 = parseInt(x0, 10);
		var y1 = parseInt(y0, 10);
		var x2 = parseInt((x0 + length * Math.cos(alpha)), 10);
		var y2 = parseInt((y0 + length * Math.sin(alpha)), 10);
		drawLine(x1, y1, x2, y2);
	} else {
		length = length / 3;
		var x1 = x0;
		var y1 = y0;
		var x2 = x1 + length * Math.cos(alpha);
		var y2 = y1 + length * Math.sin(alpha);
		var x3 = x2 + length * Math.cos(alpha + toRadians(60));
		var y3 = y2 + length * Math.sin(alpha + toRadians(60));
		var x4 = x3 + length * Math.cos(alpha - toRadians(60));
		var y4 = y3 + length * Math.sin(alpha - toRadians(60));
		koch3(n-1, alpha, x1, y1, length);
		koch3(n-1, alpha + toRadians(60), x2, y2, length);
		koch3(n-1, alpha - toRadians(60), x3, y3, length); 
		koch3(n-1, alpha, x4, y4, length);		
	}	
}

function drawLine(x1, y1, x2, y2) {
	ctx.beginPath();
	ctx.moveTo(x1, canvas.height - y1);
	ctx.lineTo(x2, canvas.height - y2);
	ctx.stroke();	
}

function toRadians(alpha) {
	return (alpha * Math.PI) / 180;
}

function inc() {
	N++;	
}

function dec() {
	if (N > 0) {
		N--;
	}
}

function update(f) {
	if (typeof f === 'function') {
		f();
	}
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	koch3(N, 0, 10, 2 * canvas.height / 3, canvas.width / 3);
	koch3(N, toRadians(-60), 10, 2 * canvas.height / 3, canvas.width / 3);
	document.getElementById("n").innerHTML = "n = " + N;	
}