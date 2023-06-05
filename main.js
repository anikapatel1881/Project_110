Webcam.set({
    width:250,
    height:300,
    image_format: 'png',
    png_quality: 90
});

camera = document.getElementById("camera");

Webcam.attach('#camera');

function take_snapshot(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML = '<img id="captured_image" src="'+data_uri+'"/>';
    });
}

classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/LvAvRdVD4/model.json", modelLoaded);

function modelLoaded(){
    console.log("Model loaded successfulluy!");
}

function speak(){
    var synth = window.speechSynthesis;
    speak_data_1 = "The first prediction is" + prediction_1;
    var utterThis = new SpeechSynthesisUtterance(speak_data_1);
    synth.speak(utterThis);
}

function check(){
    img = document.getElementById("captured_image");
    classifier.classify(img, gotResult);
}

function gotResult(error, results){
    if(error){
        console.log(error);
    } else {
        console.log(results);
        document.getElementById("result_hand_gesture_name").innerHTML = results[0].label;
        document.getElementById("result_hand_gesture_name2").innerHTML = results[1].label;
        prediction_1 = results[0].label;
        prediction_2 = results[1].label;
        speak();
        if(results[0].label == "thumbs_up"){
            document.getElementById("update_hand_gesture").innerHTML = "Emoji" + "&#128077";
        }
        if(results[0].label == "peace"){
            document.getElementById("update_hand_gesture").innerHTML = "Emoji" + "&#9996";
        }
        if(results[0].label == "amazing"){
            document.getElementById("update_hand_gesture").innerHTML = "Emoji" + "&#128076";
        }
        if(results[1].label == "thumbs_up"){
            document.getElementById("update_hand_gesture2").innerHTML = "Emoji" + "&#128077";
        }
        if(results[1].label == "peace"){
            document.getElementById("update_hand_gesture2").innerHTML = "Emoji" + "&#9996";
        }
        if(results[1].label == "amazing"){
            document.getElementById("update_hand_gesture2").innerHTML = "Emoji" + "&#128076";
        }
        
    }
}