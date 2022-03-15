var socket;
socket = io.connect('https://143.248.109.186:8080');
// make event called 'mouse' and write an anonymous callback function

//Find out Div Element
var dataContainerOrientation = document.getElementById('dataContainerOrientation');
var dataContainerMotion = document.getElementById('dataContainerMotion');
var ball = document.getElementById("ball");
var garden = document.getElementById("garden")

var maxX = 500;
var maxY = 500;
//alert(maxY);
var gyroMapX=0, gyroMapY=0;

function setup(){

}

function touchStarted(){
  socket.emit('circle',{x: gyroMapX, y:gyroMapY});
  console.log(gyroMapX, gyroMapY);
  return false;
}

//가속도계가 기기의 방향의 변화를 감지 했을때
if(window.DeviceOrientationEvent){
  //이벤트 리스너 등록
  window.addEventListener('deviceorientation', function(event) {
    var absolute = event.absolute;
    var alpha = event.alpha;
    var beta = event.beta; //(-180, 180)
    var gamma = event.gamma; //(-90, 90)
    console.log(gamma);
    $("#orientation_absolute").html("absolute:" + absolute);
    $("#orientation_alpha").html("alpha:" + alpha);
    $("#orientation_beta").html("beta:" + beta);
    $("#orientation_gamma").html("gamma:" + gamma);

    //move ball
    if(beta >  90) {beta = 90};
    if(beta < -90) {beta = -90};

    if(gamma > 90) {gamma = 90};
    if(gamma < -90) {gamma = -90};

    ball.style.top = (maxX*gamma/180 + 100) + "px";
    ball.style.left = (maxY*beta/180 + 100) + "px";
    gyroMapX = (maxX*beta/180 + 100)*48/25 + 288;
    gyroMapY = (maxY*gamma/180 + 100)*32/25 + 192;

  }, true);
}

//가속도에 변화가 발생 할때
if(window.DeviceMotionEvent){
  window.addEventListener('devicemotion', function(event){
    var x = event.accelerationIncludingGravity.x;
    var y = event.accelerationIncludingGravity.y;
    var z = event.accelerationIncludingGravity.z;
    //var r = event.accelerationIncludingGravity.r;
    var html = "x: " +x+ "<br>y: "+y+ "<br>z: " +z;
    dataContainerMotion.innerHTML = html;
  }, true);
}
