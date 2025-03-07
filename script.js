msgs = [
  {
    author: "Anonymous",
    time: Date("07-03-2025T16:44:00"),
    msg: "Hello, World!",
  },
];

function updateMessages(messages) {
  let messageList = document.getElementById("messageList");
  messageList.innerHTML = "";
  messages.forEach((message) => {
    let messageTime = new Date(message.time).toLocaleString("en-GB", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    }).replace(",", ""); // Format: 01/01/2021, 00:00:00
    
    let li = document.createElement("li");
    li.classList.add("messageBox");

    // Bonjour la XSS ! Important de fix ça
    li.innerHTML = `
    <span class="messageMetadata">
      <p class="messageAuthor">${message.author}</p>
      <p class="messageTime">${messageTime}</p>
    </span>
    <p class="messageText">${message.msg}</p>
    `;

    messageList.appendChild(li);
  });

  // Scroll liste vers le bas
  messageList.scrollTop = messageList.scrollHeight;
}

function addMessage() {
  let message = document.getElementById("messageInputBox").value;
  let author = document.getElementById("authorInputBox").value;
  msgs.push({
    author: author,
    time: Date(),
    msg: message,
  });
  updateMessages(msgs);
}

// updateMessages(msgs);
