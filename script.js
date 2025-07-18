let btn = document.querySelector('#btn');
let content = document.querySelector('#content');
let voice = document.querySelector('#voice');

function speak(text) {
    let text_speak = new SpeechSynthesisUtterance(text);
    text_speak.rate = 1;
    text_speak.pitch = 1;
    text_speak.volume = 1;
    text_speak.lang = "en-AU"; // Australian English
    window.speechSynthesis.speak(text_speak);
}

function wishMe() {
    let day = new Date();
    let hours = day.getHours();
    if (hours >= 0 && hours < 12) {
        speak("Good Morning, I'm Zyra, your virtual assistant");
    } else if (hours >= 12 && hours < 16) {
        speak("Good Afternoon, I'm Zyra, your virtual assistant");
    } else {
        speak("Good Evening, I'm Zyra, your virtual assistant");
    }
}

window.addEventListener('load', () => { wishMe(); });

let SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
let recognition = new SpeechRecognition();

recognition.onresult = (event) => {
    let transcript = event.results[event.resultIndex][0].transcript.trim();
    content.innerText = transcript;
    takeCommand(transcript.toLowerCase());
};

recognition.onend = () => {
    console.log("Speech recognition stopped.");
    btn.style.display = "flex";
    voice.style.display = "none";
};

btn.addEventListener("click", () => {
    recognition.start();
    console.log("Speech recognition started.");
    btn.style.display = "none";
    voice.style.display = "block";
});

function takeCommand(message) {
    if (message.includes("hello") || message.includes("hey")) {
        speak("Hello.....,good to see you.. what can I help you with?");
    } else if (message.includes("how are you")) {
        speak("I'm here to assist you with anything you need.");
    } else if (message.includes("time")) {
        let now = new Date();
        speak(`The time is ${now.getHours()} : ${now.getMinutes()}`);
    } else if (message.includes("who are you")) {
        speak("I am a virtual assistant, created by Avinash Soni .");
    } else if (message.includes("open youtube")) {
        speak("Opening YouTube...");
        window.open("https://www.youtube.com/", "_blank");
    } else if (message.includes("open google")) {
        speak("Opening Google...");
        window.open("https://www.google.com/", "_blank");
    } else if (message.includes("open facebook")) {
        speak("Opening Facebook...");
        window.open("https://www.facebook.com/", "_blank");
    } else if (message.includes("open instagram")) {
        speak("Opening Instagram...");
        window.open("https://www.instagram.com/", "_blank");
    }else if (message.includes("open calculator")) {
        speak("Opening calculator...");
        window.open("calculator://");
    } else if (message.includes("very good")||message.includes("by")||message.includes("bye")) {
        speak("thank you..... ,i'm happy to talk to you... and always hear to assist you");
    }else {
        speak(`Here's what I found on the internet regarding ${message}`);
        window.open(`https://www.bing.com/search?q=${message}`);
    }
}
