var height=600;
var width=600;
var ranx;
var rany;
var marks=[];
var scores=[];
var shot = 1;
var score = 0;


var c = document.getElementById("canvas");
c.width = width;
c.height = height;
var co = c.getContext("2d");

var back = new Image();
back.src="/static/target.png";
back.width=570;back.height=570;
var dot = new Image();
dot.src="/static/red.png";
dot.width=25;dot.height=25;
var mark = new Image();
mark.src="/static/bullet.png";
mark.width=60;mark.height=60;


document.onkeypress = function(e){
	var e = window.event || e;
	if(e.charCode === 32){
		window.clearInterval(ref);
		if(shot<=6){
			var d = Math.pow((Math.pow(ranx,2)+Math.pow(rany,2)),0.5);
			scores[scores.length] = sco(d);
			score += sco(d);
			marks[marks.length]=[ranx,rany];
			dumpcen(mark,ranx,rany);
			refr();
			shot++;
			//for(var i=0;i<scores.length;i++){
				//co.font="20px Monospace";
				//co.fillText(scores[i],20+i*30,30);
				var u = document.getElementById("score");
				var l = document.getElementById((shot-1)+"");
				l.innerHTML=sco(d)+"";
			//}
		}
	}
};

function sub(sc){
	var uname = getCookie("uname");
	var nam = window.prompt("Name : ",uname);
	setCookie("uname",nam,1);
	if(nam){
		var x  = window.confirm("Submit?");
		if(x){
			var xm = new XMLHttpRequest();
			xm.open("GET","/submit?u="+nam+"&s="+sc,true);
			xm.send();
		}
	}
	ref2 = window.setTimeout(refr,2000);
	reset();
}

function reset(){
	marks=[];
	scores=[];
	shot = 1;
	//score = 0;
}

function setCookie(c_name,value,exdays){
	var exdate=new Date();
	exdate.setDate(exdate.getDate() + exdays);
	var c_value=escape(value) + ((exdays==null) ? "" : "; expires="+exdate.toUTCString());
	document.cookie=c_name + "=" + c_value;
}

function getCookie(c_name){
	var c_value = document.cookie;
	var c_start = c_value.indexOf(" " + c_name + "=");
	if (c_start == -1){
	  c_start = c_value.indexOf(c_name + "=");
	  }
	if (c_start == -1){
	 	c_value = null;
	 }else{
	 	c_start = c_value.indexOf("=", c_start) + 1;
	 	var c_end = c_value.indexOf(";", c_start);
	 	if (c_end == -1){
	  		c_end = c_value.length;
		}
		c_value = unescape(c_value.substring(c_start,c_end));
	}
	return c_value;
}

function sco(d){
	var sc=0;
	if(d<=24) {sc=10;}
	else if (d<=50) sc=9;
	else if(d<=76) sc=8;
	else if(d<=102) sc=7;
	else if(d<=128) sc=6;
	else if(d<=155) sc=5;
	else if(d<=179) sc=4;
	else if(d<=206) sc=3;
	else if(d<=232) sc=2;
	else if(d<=258) sc=1;
	return sc;
}

function calcen(img,px,py){//calcualte centre of a photo
	var aw = img.width;
	var ah = img.height;
	var x = px+width/2;
	var y = py+height/2;
	x=x-aw/2;
	y=y-ah/2;
	return [x,y];
}

function dumpcen(img,px,py){//dump img 
	var p = calcen(img,px,py);
	co.drawImage(img,p[0],p[1],img.width,img.height);
}

function rans(){
	var x  = Math.random()
	if(x>=0.5) return 1;
	else return -1;
}

function an(){
	if(shot<=6){
		c.width=width;
		dumpcen(back,0,0);
		ranx = rans()*Math.random() * width/2;
		rany = rans()*Math.random() * height/2;
		for(var i=0;i<marks.length;i++) dumpcen(mark,marks[i][0],marks[i][1]);
		dumpcen(dot,ranx,rany);
	}else{
		window.clearInterval(ref);
		sub(score);
		co.font="75px Sans-Serif";
		var gradient=co.createLinearGradient(0,0,c.width,0);
		gradient.addColorStop("0","red");
		co.fillStyle=gradient;
		co.fillText("Your SCORE : " + score, 0,300);
		score=0;
		for(var i=1;i<=6;i++){
		var e = document.getElementById(i+"");
		e.innerHTML = "&otimes;";
	}
	}
}

var ref;
var ref2;
function refr(){
	window.clearTimeout(ref2);
	ref = window.setInterval(an,1000/3);
}
window.onload=refr;