var socket;
var circles = [];
var index = 0;
var colorPicker;
var prevdata = {x: -1, y: -1};
var prevdata2 = {x: -1, y: -1};

 socket = io.connect('https://143.248.109.186:8080');

 function setup() {
   canvas = createCanvas(980, 640);
   canvas.position(0,0);
   colorPicker = createColorPicker ('#ed225d');
   colorPicker.position(50, height + 5);
   // canvas.style('z-index', '-1');
   // background(175);
   // resetSketch();
   // var button = createButton("reset");
   // button.mousePressed(setup);
 }

 // function resetSketch() {
 //   colorPicker = createColorPicker ('#ed225d');
 //   colorPicker.position(50, height + 5);
 // }

  function draw() {
    stroke(colorPicker.color());
    fill(colorPicker.color());
   // if (mouseIsPressed === true) {
   //   line(mouseX, mouseY, pmouseX, pmouseY);
   // }

  //   if (keyIsPressed === true) {    //eraser tool - hold any key and drag mouse around to use eraser
  //     noStroke();
  //     fill(255);
  //     ellipse(mouseX,mouseY,30,30);
  //     x=mouseY;
  //     y=mouseX;
  // }
  socket.on('circle',function(data){
    console.log(data);
    fill(60, 250,255);
    noStroke();
    //ellipse(data.x, data.y, 4, 4);
    stroke(0,0,255);
    circle(data.x*200, data.y*200, 20);
    // if(prevdata2.x >= 0 && prevdata2.y >= 0){
    //   line(data.x, data.y, prevdata.x, prevdata.y);
    // }
    //
    // prevdata2.x = data.x;
    // prevdata2.y = data.y;
  });

  // background(220);
  while(index < circles.length) {
    // ellipse(circles[index].x, circles[index].y, circles[index].d);
    index += 1;
  }
  if (mouseIsPressed) {
    // add a circle where the mouse is
    // not this: ellipse(mouseX, mouseY, 10);
    circles[circles.length] = { x: mouseX, y: mouseY, d: 10 };
  }

  }

  function mouseClicked(){
    prevdata.x = -1;
    prevdata.y = -1;
    console.log("clicked");
  }

  function mouseDragged() {
     // line(mouseX, mouseY, pmouseX, pmouseY);
    // Send the mouse coordinates
    console.log("draged");
    //console.log("sendmouse: " + mouseX + " " + mouseY);
    var data = {x: mouseX, y: mouseY};
    socket.emit('mouse',data);
  }


  socket.on('mouse', function(data) {
    console.log("Got: " + data.x + " " + data.y);
    fill(60, 250,255);
    noStroke();
    //ellipse(data.x, data.y, 4, 4);
    stroke(0,0,255);
    if(prevdata.x >= 0 && prevdata.y >= 0){
      line(data.x, data.y, prevdata.x, prevdata.y);
    }

    prevdata.x = data.x;
    prevdata.y = data.y;
  });

  function mouseReleased(){
    prevdata.x = -1;
    prevdata.y = -1;
    console.log("released")

  }

  // function touchMoved() {
  //   stroke(102);
  //   fill(102);
  //   return false;
  // }
