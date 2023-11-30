
var sound=''
var leftWristX=0;
var leftWristY=0;
var rightWristX=0;
var rightWristY=0;
var scoreLeftWrist=0;
var scoreRightWrist=0;
function preload(){
    sound=loadSound('music.mp3');
}

function setup() {
   canvas=createCanvas(400,300);
   canvas.position(490,200);
   video=createCapture(VIDEO);
   video.hide();

   poseNet=ml5.poseNet(video,modelLoaded);
   poseNet.on('pose',gotPoses);
}

function tocar(){
    sound.play();
    sound.setVolume(0.3);
    sound.rate(1);
}
function modelLoaded() {
    console.log('modelo carregado');
}
function draw() {
    image(video,0,0,399,399)
    fill('red');
    stroke('red'); 
    if (scoreLeftWrist>0.2) {
        circle(leftWristX,leftWristY,21);
        NumberLeftWristY=Number(leftWristY);
        removeDecimal=floor(NumberLeftWristY);
        volume=removeDecimal/500;
        document.getElementById('volume').innerHTML='Volume='+volume;
        sound.setVolume(volume)
    }
    if (scoreRightWrist>0.2) {
        circle(rightWristX,rightWristY,21);
        if (rightWristY>0&&rightWristY<=100) {
            document.getElementById('speed').innerHTML='Velocidade=0.5x';
            sound.rate(0.5)
        }
        else if (rightWristY>100&&rightWristY<=200) {
            document.getElementById('speed').innerHTML='Velocidade=1.0x';
            sound.rate(1)
        }
        else if (rightWristY>200&&rightWristY<=300) {
            document.getElementById('speed').innerHTML='Velocidade=1.5x';
            sound.rate(1.5)
        }
        else if (rightWristY>300&&rightWristY<=400) {
            document.getElementById('speed').innerHTML='Velocidade=2.0x';
            sound.rate(2)
        }
        else if (rightWristY>400) {
            document.getElementById('speed').innerHTML='Velocidade=2.5x';
            sound.rate(2.5)
        }
    }
}
function gotPoses(results) {
    if (results.length>0) {
        console.log(results)
        leftWristX=results[0].pose.leftWrist.x;
        leftWristY=results[0].pose.leftWrist.y;

        rightWristX=results[0].pose.rightWrist.x;
        rightWristY=results[0].pose.rightWrist.y;
        scoreLeftWrist=results[0].pose.keypoints[9].score;
        scoreRightWrist=results[0].pose.keypoints[10].score;
    }

}