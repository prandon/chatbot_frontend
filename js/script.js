let id = 1;
let inputBox = document.getElementById("userBox");
let chatBox = document.getElementById("chatBox");
let toggleViewBtn = document.getElementById("toggleViewBtn");
let chatContainer = document.getElementById("chatContainer");
let chatBoxHeader = document.getElementById("chatBoxHeader");

// When user hit send the message following function executes. 
const userAction = async () => {
  let input = inputBox.value;
  inputBox.value = "";
  if(input!=""){
    addMe(input, "sent", id++);
    const response = await fetch("http://localhost:8090", { // Your DialogFlow gateway api url
        method: "POST",
        body: JSON.stringify({
        q: input,
        session_id: "test",
        lang: "hi"
        }),
        headers: {
        "Content-Type": "application/json"
        }
    });
    const myJson = await response.json();
    // do something with myJson
    let res = myJson.queryResult.fulfillmentText;
    addMe(res, "received", id++);
    }
};

// This function adds messafe when message is sent or received
function addMe(input, msgDetails, id) {
  chatContainer.innerHTML +=
    '<div id="msg' + id + '" class="' + msgDetails + ' box-shadow">' + input + "</div>";
  chatContainer.scrollTop = chatContainer.scrollHeight;
}

// Toggling chatbox (Minimizing and maximizing)
function toggleView() {
  if (toggleViewBtn.innerText == "-") {
    toggleViewBtn.innerText = "^";
    chatBox.style.height = "50px";
    inputBox.style.display = "none";
  } else {
    toggleViewBtn.innerText = "-";
    chatBox.style.height = "450px";
    inputBox.style.display = "block";
  }
}

// Theme changing function 
function changeTheme(color){
    chatBoxHeader.style.backgroundColor = color;
    chatBoxHeader.style.color = 'white';
    toggleViewBtn.style.backgroundColor = color;
    toggleViewBtn.style.color = 'white';
    chatBox.style.backgroundImage= 'linear-gradient(to bottom, white 40%, '+color+')';

}

// Render themes
function renderThemes(){
    var themeContainer = document.getElementById("themes");
    let colors = ['red','orange','darkorange','blue','skyblue','black','darkgrey','gold','tomato','pink','aqua','indigo','lightskyblue','cornflowerblue','violet','#23456A'];

    for(let i of colors){
        themeContainer.innerHTML += `<div class="theme-box box-shadow" style="background-color:${i};color:white;" onclick="changeTheme('${i}')">${i.toUpperCase()}</div>`;
    }

    changeTheme('orange');
}

renderThemes();