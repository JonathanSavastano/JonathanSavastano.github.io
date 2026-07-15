// Grab the element with the ID 'growingInput' and store it in the 'textarea' variable
const textarea = document.getElementById('growingInput');

// Get the initial width of the textarea and store it in 'initialWidth'
const initialWidth = textarea.offsetWidth;

// Add an event listener to the textarea that triggers on 'input' (when user types or modifies content)
textarea.addEventListener('input', function() {
  // Reset the height to 'auto' to recalculate the height based on content
  this.style.height = 'auto';
  
  // Set the height to match the scroll height (the height of all the content)
  // This makes the textarea grow vertically to fit all the text
  this.style.height = this.scrollHeight + 'px';
  
  // Check if the content width (scrollWidth) is greater than the initial width
  if (this.scrollWidth > initialWidth) {
    // If content is wider than initial width, set width to 100% of its container
    // This makes the textarea expand horizontally
    this.style.width = '100%';
  }
});

//10 paragraph options
let textOne = "The sun rose over the misty mountains, painting the sky in hues of pink and gold. Birds began their morning chorus, filling the air with melodious chirps. A gentle breeze rustled through the trees, carrying the scent of pine and wildflowers. In the distance, a stream bubbled cheerfully, adding its voice to nature's symphony."
let textTwo = "Sarah opened the dusty old book, its pages yellowed with age. As she began to read, she was transported to a world of magic and adventure. The characters came to life in her imagination, their stories unfolding before her eyes. Hours passed unnoticed as she delved deeper into the enchanting tale."
let textThree = "The bustling city never seemed to sleep, its streets always alive with activity. Neon signs flickered in the night, casting a colorful glow on the sidewalks. Taxis honked their horns as they navigated through the sea of vehicles. Late-night revelers spilled out of clubs, their laughter echoing off the tall buildings."
let textFour = "The aroma of freshly baked bread wafted through the small bakery. Inside, the baker kneaded dough with practiced hands, his movements swift and sure. Rows of pastries lined the display case, each one a work of art. Customers chatted as they waited in line, eager to taste the day's creations."
let textFive = "The old clock tower stood tall in the town square, its face weathered by time. Its chimes rang out every hour, a familiar sound to the local residents. Pigeons perched on its ledges, cooing softly in the afternoon sun. Below, people hurried about their day, the clock a silent witness to their lives."
let textSix = "The laboratory hummed with the sound of equipment and quiet conversation. Scientists in white coats moved from station to station, absorbed in their work. Beakers bubbled with colorful liquids, and computers displayed complex data. In this room, groundbreaking discoveries were waiting to be made."
let textSeven = "The art gallery was a haven of tranquility in the midst of the busy city. Paintings of all styles and sizes adorned the walls, each telling its own story. Visitors moved quietly from one piece to another, lost in contemplation. The soft lighting highlighted the beauty of each brushstroke, bringing the artworks to life."
let textEight = "The garden was a riot of color, with flowers of every hue imaginable. Bees buzzed from bloom to bloom, their legs heavy with pollen. A stone path wound its way through the beds, inviting visitors to explore. In one corner, a small fountain provided a soothing backdrop of trickling water."
let textNine = "The library was a treasure trove of knowledge, its shelves lined with books on every subject. The scent of old paper and leather bindings filled the air, a comforting smell to book lovers. Students huddled over tables, poring over texts and taking notes. In the quiet corners, readers lost themselves in worlds of fiction and fact."
let textTen = "The beach stretched out as far as the eye could see, a golden ribbon between land and sea. Waves lapped gently at the shore, leaving behind seashells and smooth pebbles. Children laughed as they built sandcastles, their buckets and spades scattered around them. Seagulls wheeled overhead, their cries carried on the salty breeze."

// array of paragraph options
const textArray = [textOne, textTwo, textThree, textFour, textFive, textSix, textSeven, textEight, textNine, textTen]

let random;

// get the element with classname button and store it in variable button
const button = document.getElementsByClassName('button');

// add event listener for when button pressed
document.querySelector('.button').addEventListener('click', function() {
  let i = Math.floor(Math.random() * textArray.length);
  let r = textArray[i];
  random = r;
  document.querySelector('.random').innerHTML = random;
});

//variables for words per minute
let startTime, endTime, wordCount;

// grab the text area element by id
const textInput = document.getElementById('growingInput');
// grab the result element by id
const resultDisplay = document.getElementById('result');

// start timer when user focuses on the text input field
textInput.addEventListener('focus', startTimer);
// end the timer when the user leaves the input field
textInput.addEventListener('blur', endTimer);

// start timer
function startTimer() {
  startTime = new Date().getTime();
}

// end timer
function endTimer() {
  endTime = new Date().getTime();
  calculateWPM();
}

// calculate words per minute
function calculateWPM() {
  // get text input by user, remove leading/trailing whitespace
  const text = textInput.value.trim();
  // count number of words by splitting text at spaces
  wordCount = text.split(/\s+/).length;
  // calculate time elasped in minutes
  const timeElapsed = (endTime - startTime) / 60000;
  // caculate wpm using formula: WPM = words / time
  const wpm = Math.round(wordCount / timeElapsed);
  // display the calculated WPM
  resultDisplay.textContent = `Your typing speed: ${wpm} WPM`;
}