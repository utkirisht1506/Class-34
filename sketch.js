
var db;
var ball, position;

function setup(){
    db = firebase.database();
    createCanvas(500,500);
    ball = createSprite(250,250,10,10);
    ball.shapeColor = "red";

    //Reading the database
    db.ref("Ball/Position").on("value", readPos, showErr);
}

function draw(){
    background("white");
    if(position !== undefined){
        if(keyDown(LEFT_ARROW)){
            changePosition(-1,0);
        }
        else if(keyDown(RIGHT_ARROW)){
            changePosition(1,0);
        }
        else if(keyDown(UP_ARROW)){
            changePosition(0,-1);
        }
        else if(keyDown(DOWN_ARROW)){
            changePosition(0,+1);
        }
    }
    drawSprites();
}

function changePosition(x,y){

    db.ref("Ball/Position").set({
        x:position.x+x,
        y:position.y+y
    })

    
}

function readPos(data){
    position = data.val(); //transferring data from db to position

    ball.x = position.x;
    ball.y = position.y;
}

function showErr(){
    console.log("There was an error in db");
}


/*
.ref() - refers to the location of the field that we want

READING:
    .on() - turns on a listener that listens to any changes happening in that field

          - To get the data from the db
          - To check for errors in the database - ignorable

WRITING:
    .set() - to change a field


*/
