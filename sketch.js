var ball;
var database, position;
function setup(){
    createCanvas(500,500);
    ball = createSprite(250,250,10,10);
    ball.shapeColor = "red";
    database = firebase.database()
    console.log(database)
    var ballPositionRef = database.ref('ball/position')
    ballPositionRef.on("value", readPosition)
}

function draw(){
    background("white");
    if(position !== undefined){
        if(keyDown(LEFT_ARROW)){
            writePosition(-1,0);
        }
        else if(keyDown(RIGHT_ARROW)){
            writePosition(1,0);
        }
        else if(keyDown(UP_ARROW)){
            writePosition(0,-1);
        }
        else if(keyDown(DOWN_ARROW)){
            writePosition(0,+1);
        }

    }
    drawSprites()
}

function writePosition(x,y){
    database.ref('ball/position').update({
        x: position.x + x,
        y: position.y + y
    })
    console.log("writing data to the database")
}

function readPosition(data){
    position = data.val()
    ball.x = position.x;
    ball.y = position.y;
    console.log("reading data from database")
}