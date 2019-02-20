let id = 1;

// When user hit send the message following function executes. 
const userAction = async () => {
  let input = document.getElementById("userBox").value;
  document.getElementById("userBox").value = "";
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
};

// This function adds messafe when message is sent or received
function addMe(input, msgDetails, id) {
  let chatContainer = document.getElementById("chatLog");
  chatContainer.innerHTML +=
    '<div id="msg' + id + '" class="' + msgDetails + '">' + input + "</div>";
  chatContainer.scrollTop = chatContainer.scrollHeight;
}

// Toggling chatbox (Minimizing and maximizing)
function toggleView() {
  let inputBox = document.getElementById("userBox");
  let chatBox = document.getElementById("chatBox");
  let toggleView = document.getElementById("toggleView");

  if (toggleView.innerText == "-") {
    toggleView.innerText = "^";
    chatBox.style.height = "50px";
    inputBox.style.display = "none";
  } else {
    toggleView.innerText = "-";
    chatBox.style.height = "450px";
    inputBox.style.display = "block";
  }
}
