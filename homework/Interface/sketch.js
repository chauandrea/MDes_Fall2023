// Model URL
let imageModelURL = 'https://teachablemachine.withgoogle.com/models/yoOUPKblq/';

// Video
let video;
let flippedVideo;
// To store the classification
let label = "";

// Load the model first
let classifier;
function preload() {
  classifier = ml5.imageClassifier(imageModelURL + 'model.json');
}

// Inventory
let inventory = [];
let canMergeSalad = false;
let isMergeModalOpen = false;
let hasConfirmedMerge = false;

function setup() {
  createCanvas(640, 600); // Increased canvas height for the inventory below
  // Create the video
  video = createCapture(VIDEO);
  video.size(640, 480);
  video.hide();

  flippedVideo = ml5.flipImage(video);
  // Start classifying
  classifyVideo();
}

function draw() {
  background(0);

  // Draw the video at the top
  image(flippedVideo, 0, 0);

  // Draw the label
  fill(255);
  textSize(16);
  textAlign(CENTER);
  text(label, width / 2, height - 20);

  // Draw the inventory below the camera box
  drawInventory();

  // Draw the merge modal if it's open
  drawMergeModal();
}

// Function to draw the inventory
function drawInventory() {
  // Draw grey box behind small inventory boxes
  fill(103, 101, 240); // Blue-purple color
  rect(0, 480, width, height - 480);

  // Draw inventory tab
  fill(205, 210, 236);
  rect(0, 480, width, 130);

  // Draw "Inventory" text
  fill(255); 
  textSize(20);
  textAlign(LEFT);
  text("Inventory", 10, height - 10);

  // Display inventory items
  fill(0);
  textSize(12);
  textAlign(CENTER);

  for (let i = 0; i < inventory.length; i++) {
    const { item, count } = inventory[i];
    const boxX = 50 + i * 80;
    const boxY = 500; // Adjusted Y position for the inventory

    // Draw the box
    fill(255);
    rect(boxX - 20, boxY, 40, 30);

    // Draw item name above the box
    fill(255);
    textSize(12);
    textAlign(CENTER);
    text(item, boxX, boxY - 20);

    // Draw item count inside the box
    fill(0);
    textSize(12);
    text(count, boxX, boxY + 20);
  }
}

// Get a prediction for the current video frame
function classifyVideo() {
  flippedVideo = ml5.flipImage(video);
  classifier.classify(flippedVideo, gotResult);
  flippedVideo.remove();
}

// When we get a result
function gotResult(error, results) {
  if (error) {
    console.error(error);
    return;
  }

  label = results[0].label;

  // Add item to inventory if it's not "nothing"
  addToInventory(label);

  // Check if user has apple and orange in the inventory
  const hasApple = inventory.some(item => item.item === "apple" && item.count > 0);
  const hasOrange = inventory.some(item => item.item === "orange" && item.count > 0);

  // Check if user can merge salad
  canMergeSalad = hasApple && hasOrange;

  // If the user can merge salad and hasn't confirmed, open the merge modal
  if (canMergeSalad && !hasConfirmedMerge) {
    openMergeModal();
  }

  // Classify again!
  classifyVideo();
}

// Function to add item to inventory
function addToInventory(item) {
  if (item && item !== "nothing") {
    const inventoryItem = inventory.find(entry => entry.item === item);

    if (inventoryItem) {
      inventoryItem.count++;
    } else {
      inventory.push({ item, count: 1 });
    }
  }
}

// Function to draw the merge modal
function drawMergeModal() {
  if (isMergeModalOpen) {
    // Draw the modal background
    fill(0, 150); // Semi-transparent black
    rect(0, 0, width, height);

    // Draw the modal content
    fill(255);
    textSize(24);
    textAlign(CENTER, CENTER);
    text("Do you want to merge Apple and Orange to create a Salad?", width / 2, height / 2 - 20);

    // Draw the "Yes" button
    fill(0, 200, 0); // Green color
    rect(width / 2 - 60, height / 2 + 20, 50, 30);
    fill(255);
    text("Yes", width / 2 - 45, height / 2 + 35);

    // Draw the "No" button
    fill(200, 0, 0); // Red color
    rect(width / 2 + 10, height / 2 + 20, 50, 30);
    fill(255);
    text("No", width / 2 + 25, height / 2 + 35);
  }
}

// Function to handle mouse clicks when the merge modal is open
function mouseClicked() {
  if (isMergeModalOpen) {
    // Check if the mouse is over the "Yes" button
    if (mouseX > width / 2 - 60 && mouseX < width / 2 - 10 &&
        mouseY > height / 2 + 20 && mouseY < height / 2 + 50) {
      // Merge items and close the merge modal
      mergeItems();
    }

    // Check if the mouse is over the "No" button
    if (mouseX > width / 2 + 10 && mouseX < width / 2 + 60 &&
        mouseY > height / 2 + 20 && mouseY < height / 2 + 50) {
      // Close the merge modal without merging
      closeMergeModal();
    }
  }
}

// Function to merge items and add salad to the inventory
function mergeItems() {
  if (canMergeSalad && !hasConfirmedMerge) {
    const appleIndex = inventory.findIndex(item => item.item === "apple");
    const orangeIndex = inventory.findIndex(item => item.item === "orange");

    // Decrease counts of apple and orange
    inventory[appleIndex].count--;
    inventory[orangeIndex].count--;

    // Add salad to the inventory
    const saladIndex = inventory.findIndex(item => item.item === "salad");
    if (saladIndex !== -1) {
      inventory[saladIndex].count++;
    } else {
      inventory.push({ item: "salad", count: 1 });
    }

    // Set the merge confirmation flag
    hasConfirmedMerge = true;
  }

  // Close the merge modal
  closeMergeModal();
}

// Function to open the merge modal
function openMergeModal() {
  hasConfirmedMerge = false;
  isMergeModalOpen = true;
}

// Function to close the merge modal
function closeMergeModal() {
  isMergeModalOpen = false;
}

// Function to handle key presses
function keyPressed() {
  // Check if the 'm' key is pressed
  if (key === 'm' || key === 'M') {
    // Open the merge modal
    openMergeModal();
  }
}
