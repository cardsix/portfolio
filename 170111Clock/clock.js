var canvas=document.getElementById("myCanvas");
var ctx=canvas.getContext("2d");
var width=ctx.canvas.width;  //获取当前canvas的宽高
var height=ctx.canvas.height;
var rem=width/300; //比例，使时钟放大时保持外观一直
var r=width/2-8*rem;  //预留了阴影和线宽的位置；因为r已经是和width相关的，因此下面的r不需要再*rem

//画表盘
function drawBg(){
	ctx.save();
	ctx.translate(width/2,width/2);  //重新映射中心位置到canvas中间，默认是在左上角
	ctx.lineWidth=4*rem;
	ctx.shadowBlur=3*rem;
	ctx.shadowColor="#222";  //阴影的颜色深一点
	ctx.shadowOffsetX=3*rem;
	ctx.shadowOffsetY=3*rem;
	ctx.strokeStyle="#666";  //边框颜色
	var grd=ctx.createRadialGradient(0,0,10*rem,0,0,r); // 表示渐变范围是半径10到r的位置
	grd.addColorStop(0,"#fefefe");
	grd.addColorStop(1,"#dedede");
	ctx.fillStyle=grd;  //这一句不能少，填充的颜色是上面定义的渐变色
	ctx.arc(0,0,r,0,2*Math.PI);  //这里虽然想不通为什么，但的确是减去线宽的一半。
	ctx.stroke();
	ctx.fill();
	//ctx.restore();
}
//画刻度
function drawScale(){
	//ctx.save();
	ctx.shadowBlur = 0;
	ctx.shadowColor = "";
	ctx.shadowOffsetX = 0;
	ctx.shadowOffsetY = 0;
	for(var i=0;i<60;i++){
		ctx.beginPath();
		if(i%5==0){
			ctx.strokeStyle="#222";
			ctx.lineWidth=4;
			ctx.lineTo((r-8*rem)*Math.cos(2*Math.PI/60*i),(r-8*rem)*Math.sin(2*Math.PI/60*i));
		}else{
			ctx.strokeStyle="#666";
			ctx.lineWidth=2;
			ctx.lineTo((r-4*rem)*Math.cos(2*Math.PI/60*i),(r-4*rem)*Math.sin(2*Math.PI/60*i));
		}
		ctx.lineTo(r*Math.cos(2*Math.PI/60*i),r*Math.sin(2*Math.PI/60*i));
		ctx.stroke();
	}
	//ctx.restore();
}
//画时针
function drawHour(hour,min){
	ctx.save();  //不加这个的话，分针直接从时针处开始算。
	ctx.beginPath();
	ctx.lineWidth=6*rem;
	ctx.lineCap="round";
	ctx.strokeStyle="#222";
	ctx.rotate(2*Math.PI/12*(hour-3)+2*Math.PI/12/60*min);  //起始角在3那里
	ctx.moveTo(-15*rem,0);
	ctx.lineTo(r/2,0);
	ctx.stroke();
	ctx.restore();
}
//画分针
function drawMin(min){
	ctx.save();
	ctx.beginPath();
	ctx.lineWidth=3*rem;
	ctx.lineCap="round";
	ctx.strokeStyle="#222";
	ctx.rotate(2*Math.PI/60*(min-15));  //起始角在3那里
	ctx.moveTo(-15*rem,0);
	ctx.lineTo(r/2+30*rem,0);
	ctx.stroke();
	ctx.restore();
}
//画秒针
function drawSec(sec){
	ctx.save();
	ctx.beginPath();
	ctx.fillStyle="#c14543";
	ctx.rotate(2*Math.PI/60*(sec-15));  //起始角在3那里
	ctx.moveTo(-15*rem,2*rem);
	ctx.lineTo(-15*rem,-2*rem);
	ctx.lineTo(r-8*rem,-1*rem);
	ctx.lineTo(r-8*rem,1*rem);
	ctx.fill();
	ctx.restore();
}
//画固定点
function drawDot(){
	ctx.beginPath();
	ctx.fillStyle="#fff";
	ctx.arc(0,0,6*rem,0,2*Math.PI);
	ctx.fill();
}
//画动态时钟
function draw(){
	ctx.clearRect(0,0,width,height); //每秒清除一次矩形
	var date=new Date();
	var h=date.getHours();
	var m=date.getMinutes();
	var s=date.getSeconds();
	drawBg();
	drawScale();
	drawHour(h,m);
	drawMin(m);
	drawSec(s);
	drawDot();
	ctx.restore();
}
//定时器
var timer=setInterval(draw, 1000);
draw(); //先执行一次，不然页面会卡一下。
