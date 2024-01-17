document.addEventListener('DOMContentLoaded',()=>{
    const startButton=document.getElementById('startRecognition');
    const stopButton=document.getElementById('stopRecongnition');
    const transcriptionElement=document.getElementById('transcription');
    const readTranscriptionButton=document.getElementById('readTranscription');

    let recognition;

    const initRecognition=()=>{
        recognition=new webkitSpeechRecognition()|| new SpeechRecognitionAlternative();

        //initially declare Spech Recognition instant method
        recognition.onresult=(event)=>{
            const transcript=event.results[0][0].transcript;
            transcriptionElement.textContent=transcript;
        };

        recognition.onend=()=>{
            startButton.disabled=false;
            stopButton.disabled=true;
            readTranscriptionButton.disabled=false;
        };
    };

    startButton.addEventListener('click',()=>{
        initRecognition();
        recognition.start();
        startButton.disabled=true;
        stopButton.disabled=false;
        readTranscriptionButton.disabled=true;
    });

    stopButton.addEventListener('click',()=>{
        recognition.stop();
    });

    readTranscriptionButton.addEventListener('click',()=>{
        const synth=window.speechSynthesis;
        const utterance=new SpeechSynthesisUtterance(transcriptionElement.textContent);
        synth.speak(utterance);
    });

});