var balloon;

var database;

function setup() {
  createCanvas(500,500);
  balloon = createSprite(100,100,10,10)

  backgroundImage = loadImage("Hot Air Ballon-01.png")
  database = firebase.database()
  var balloonPosition=database.ref('balloon/position')
  balloonPosition.on("value",readPosition, showError)
}

function draw() {
  if(backgroundImage)
    background(backgroundImage)

  if(keyDown(LEFT_ARROW)) {
    //balloon.x = balloon.x-10
    updatePosition(-1,0)
  }
  else if(keyDown(RIGHT_ARROW)) {
    //balloon.x = balloon.x+10
    updatePosition(1,0)
  }
  else if(keyDown(UP_ARROW)) {
    //balloon.y = balloon.y-10
    updatePosition(0,-1)
  }
  else if(keyDown(DOWN_ARROW)) {
    //balloon.y = balloon.y+10
    updatePosition(0,1)
  } 

  drawSprites();
} 

function updatePosition(x,y) {
 database.ref('balloon/position').set({
   'x': position.x + x,
   'y': position.y + y
 })
}

function readPosition(data) {
   position = data.val();
   balloon.x = position.x;
   balloon.y = position.y;
}

function showError() {
 console.log("Error in writing to the database");
}