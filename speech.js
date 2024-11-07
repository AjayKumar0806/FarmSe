// Initialize the speech synthesis
const synth = window.speechSynthesis;

/**
 * Function to convert text to speech
 * @param {string} text - The text to be spoken
 */
const textToSpeech = (text) => {
  // Create a new SpeechSynthesisUtterance instance
  const speech = new SpeechSynthesisUtterance(text);
  
  // Set properties for clarity
  speech.lang = "hi-IN"; // Set language to Hindi
  speech.volume = 1; // Volume level (0 to 1)
  speech.rate = 1.2; // Increased rate for responsiveness
  speech.pitch = 1.5; // Higher pitch for clarity

  // Select a female Hindi voice, if available
  const voices = synth.getVoices();
  const clearIndianVoice = voices.find(voice => voice.lang === 'hi-IN' && voice.name.toLowerCase().includes('female'));

  if (clearIndianVoice) {
    speech.voice = clearIndianVoice; // Assign the selected voice
  }

  // Add event listeners for logging
  speech.onstart = () => {
    console.log('Speech started'); // Log when speech starts
  };

  speech.onend = () => {
    console.log('Speech ended'); // Log when speech ends
  };

  speech.onerror = (event) => {
    console.error('Speech error:', event.error); // Handle errors
  };

  // Speak the text
  synth.speak(speech);
};

// Ensure voices are loaded before using the function
synth.onvoiceschanged = () => {
  const voices = synth.getVoices();
  console.log(voices); // Log available voices for debugging
};

// Export the function for use in other modules
export { textToSpeech };
