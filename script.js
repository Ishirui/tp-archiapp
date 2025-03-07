msgs = [{ msg: "Hello World" }, { msg: "Blah Blah" }, { msg: "I love cats" }];

function updateMessages(messages) {
  let messageList = document.getElementById("messageList");
  messageList.innerHTML = "";
  messages.forEach((message) => {
    let li = document.createElement("li");
    li.classList.add("messageBox");
    li.textContent = message.msg;
    messageList.appendChild(li);
  });
}

function addMessage() {
  let message = document.getElementById("messageInputBox").value;
  msgs.push({ msg: message });
  updateMessages(msgs);
}

updateMessages(msgs);
