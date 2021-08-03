// VoiceRSS JavaScript SDK (http://www.voicerss.org/sdk/javascript.aspx)

import { API_KEY } from "./env.js";
import { VoiceRSS } from "./voiceRSS.js";

const button = document.getElementById("button");
export const audioElement = document.getElementById("audio");

// Disable/Enable Button
function toggleButton() {
    button.disabled = !button.disabled;
}

// Passing Joke to VoiceRSS API
function tellMe(joke) {
    VoiceRSS.speech({
        key: API_KEY,
        src: joke,
        hl: 'en-us',
        v: 'Linda',
        r: 0, 
        c: 'mp3',
        f: '44khz_16bit_stereo',
        ssml: false
    });
}


// Get Jokes from Joke API
async function getJokes() {
    let joke = "";
    const apiUrl = "https://v2.jokeapi.dev/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist";
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        // Check if we have two parts joke or one part.
        joke =  data.setup ? `${data.setup}... ${data.delivery}` : `${data.joke}`;
        // Text-to-Speech
        tellMe(joke);
        // Disable Button
        toggleButton();
        
    } catch (err) {
        console.error(`Whoops, ${err}`);
    }
}


// Event Listeners 
button.addEventListener("click", getJokes);
audioElement.addEventListener("ended", toggleButton);