//sound detection varibles.

let classifier;
// Label
let label = 'listening...';
let mySound;
// Teachable Machine model URL:
let soundModel = 'https://teachablemachine.withgoogle.com/models/e23rm51VA/';

//art variables

//Referenced chatGPT. Minor adjustments to get balls to stop bouncing.
let coins = []; // Array to store the circles
let gravity = 0.5; // Gravity value for the falling animation
let bounceFactor = 0.3; // Factor for the bounce effect
let minSpeed = 0.2; // Minimum speed threshold to stop bouncing

//

function preload() {
  // Load the model
  classifier = ml5.soundClassifier(soundModel + 'model.json');
  mySound = loadSound('ohno.mp3');

  
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  // Start classifying
  // The sound model will continuously listen to the microphone
  classifier.classify(gotResult);
  
}

function draw() {
  
    background(200,100,0);
  
  let centerX = windowWidth / 2;
  let centerY = windowHeight / 2;
  
  //Shadow
  noStroke();
  fill(150,50,0);
  ellipse(centerX - 40, centerY + 95,270, 90)

  
    // Draw jar lid opening
  noStroke(); 
  fill(0,00,100,180);
  ellipse(centerX, centerY - 120, 150, 60);
  
  // Draw bottom of jar
  fill(0, 200, 255); 
  noStroke(); 
  ellipse(centerX, centerY + 90, 196, 70);
  
       // Draw all coins
  updateAndDrawcoins();
  
    // Draw jar body
  fill(0, 150, 255,150); 
  noStroke(); 
  rect(centerX - 102, centerY - 90, 205, 229, 25, 25, 60, 60);
  
  // Draw jar lid rim
  fill(0,150,255,150); 
  ellipse(centerX, centerY - 110, 190, 100);
  

  
  
  
  //Draw highlights
  stroke(255,255,255,200);
  strokeWeight(2);
 
  
  noFill();
  let x1 = centerX + 30;
  let y1 = centerY - 37;
  
  let x2 = centerX + 60;
  let y2 = centerY - 40;
  
  let x3 = centerX + 80;
  let y3 = centerY - 50;
  
  let x4 = centerX + 93;
  let y4 = centerY - 70;
  
  bezier(x1,y1, x2,y2, x3,y3, x4,y4)
 
  

}

function updateAndDrawcoins() {
  
    // Define region within the jar's bounds where the coin can appear
  let centerX = windowWidth / 2;
  let centerY = windowHeight / 2;
  let jarTop = centerY + 60;
  let jarBottom = centerY + 100;
  
  
  for (let i = 0; i < coins.length; i++) {
    // Update circle position (falling animation)
    coins[i].y += coins[i].speedY;
    coins[i].speedY += gravity;
    
    // Bounce effect
    if (coins[i].y + coins[i].size / 2 >= jarBottom) {
      coins[i].y = jarBottom - coins[i].size / 2; // Adjust position to stay within canvas
      coins[i].speedY *= -bounceFactor; // Reverse direction and reduce speed
      
      // Stop bouncing if speed falls below threshold
      if (abs(coins[i].speedY) < minSpeed) {
        coins[i].speedY = 0; // Set speed to 0
      }
    }
    

    
    // Draw the circle
    fill(255, 215, 0);
    noStroke();
    ellipse(coins[i].x, coins[i].y, coins[i].size, coins[i].size);
  }
}

// The model recognizing a sound will trigger this event
function gotResult(error, results) {
  
  let centerX = windowWidth / 2;
  let jarLeft = centerX - 70;
  let jarRight = centerX + 70;
  let randomX = random(jarLeft, jarRight);

  
  if (error) {
    console.error(error);
    return;
  }
  // The results are in an array ordered by confidence.
  // console.log(results[0]);
  label = results[0].label;
  
    let newCoin = {
    x: randomX,
    y: 0,
    size: 20,
    speedY: random(4, 5)
    };
      
  if (label == "fword") {
    console.log(label);
    coins.push(newCoin);
    mySound.play();
  }
}
