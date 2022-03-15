var socket;
// var circles = [];
var colorPicker;
//Find out Div Element
var dataContainerOrientation = document.getElementById('dataContainerOrientation');
var dataContainerMotion = document.getElementById('dataContainerMotion');
var ball = document.getElementById("ball");
var garden = document.getElementById("garden");

var maxX = 500;
var maxY = 500;
//alert(maxY);

//Declare the value to send via socket.
var gyroMapX=0, gyroMapY=0;


socket = io.connect('https://143.248.109.186:8080');
// make event called 'mouse' and write an anonymous callback function
socket.on('mouse',
  // When we receive data
  function(data) {
    console.log("Got: " + data.x + " " + data.y);
    fill(colorPicker.color());
    noStroke();
    ellipse(data.x, data.y, 4, 4);

  }
);

function setup() {
  canvas = createCanvas(980, 640);
  canvas.position(0,0);
  // canvas.style('z-index', '-1');
  // background(175);
  resetSketch();
  var button = createButton("reset");
  button.mousePressed(setup);
}

function resetSketch() {
  colorPicker = createColorPicker ('#ed225d');
  colorPicker.position(50, height + 5);
}

function draw() {
  stroke(colorPicker.color());
  fill(colorPicker.color());
  //socket.emit('circle',{x: gyroMapX, y:gyroMapY});

  //3.
  //Draw the position with circle, every frame.
  //
  circle(gyroMapX, gyroMapY, 20);

}

function touchMoved() {
  //line(mouseX, mouseY, pmouseX, pmouseY);
  //console.log(beta, gamma);
  //console.log(gyroMapX, gyroMapY);
  //sendmouse(mouseX,mouseY);

  //4.
  //Send data with socket, only when the touch is pressed.
  //It will draw automatically with existing code.
  //




  return false;
}

function touchStarted(){
  socket.emit('circle',{x: gyroMapX, y:gyroMapY});
  console.log(gyroMapX, gyroMapY);
  return false;
}

/*if(beta > 90) {beta = 90};
if(beta < -90) {beta = -90};
beta +90;
gamma +90;

ball.style.top = (maxX*beta/180 + 100) + "px";
ball.style.left = (maxY*gamma/180 + 100) + "px";*/ // You don't need this

//}, true);
//}
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


    //볼을 움직이자.
    if(beta > 90) {beta = 90};
    if(beta < -90) {beta = -90};

    if(gamma > 90) {gamma = 90};
    if(gamma < -90) {gamma = -90};
    //2.
    //Set declared values with beta and gamma.
    //You will want to multiply some values to match the frame
    //For instance,  gyroMapX = beta*width/90
    //

    ball.style.top = (maxY*gamma/180 + 100) + "px";
    ball.style.left = (maxX*beta/180 + 100) + "px";
    gyroMapX = (maxX*beta/180 + 100)*48/25 + 288;
    gyroMapY = (maxY*gamma/180 + 100)*32/25 + 192;

    // sendCircle(gyroMapX, gyroMapY);
    //socket.emit('circle',{x: gyroMapX, y:gyroMapY});

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
// Function for sending to the socket
function sendCircle(xpos, ypos) {
  // We are sending!
  console.log("sendCircle: " + xpos + " " + ypos);

  // Make a little object with  and y
  var data = {
    x: xpos,
    y: ypos
  };

  socket.emit('circle',data);
}
