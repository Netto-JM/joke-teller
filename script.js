const button = document.getElementById('button');
const audioElement = document.getElementById('audio');

// Passin Jokes to VoiceRSS
const tellMe = joke => {
  console.log(`Tell me: ${joke}`);
  VoiceRSS.speech({
    key: 'b8bbdfdca46e484a93af4cdbe1251d47',
    src: joke,
    hl: 'en-us',
    v: 'Linda',
    r: 0, 
    c: 'mp3',
    f: '44khz_16bit_stereo',
    ssml: false
  });
};

const toggleButton = () => {
  button.disabled = !button.disabled;
};

// Get Jokes From Jokes API
const getJokes = async () => {
  const apiUrl = "https://v2.jokeapi.dev/joke/Programming";
  let joke;
  try{
    const response = await fetch(apiUrl);
    const data = await response.json();
    joke = data.joke ? data.joke : data.setup + "\n" + data.delivery;
    // Text-to-Speech
    tellMe(joke);
    // Disable Button
    toggleButton();
  } catch (error) {
    console.log("Fetch failed", error);
  }
};

// Event Listeners
button.addEventListener("click", getJokes);
audioElement.addEventListener('ended', toggleButton);