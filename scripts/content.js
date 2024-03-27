let recentEmojis = [];
//check if recentEmojis list exists in local storage
if (localStorage.getItem("recentEmojis")) {
  recentEmojis = JSON.parse(localStorage.getItem("recentEmojis"));
  //loop through array and add emoji buttons to .recent-emoji from 8th list item to 1st
  document.querySelector(".recent-emoji").innerHTML = "";
  for (let i = recentEmojis.length - 1; i >= 0; i--) {
    const emojiButton = document.createElement("button");
    emojiButton.textContent = recentEmojis[i];
    emojiButton.classList.add("emoji");
    //add this same event listener to the new emoji buttons
    emojiButton.addEventListener("click", () => {
      navigator.clipboard.writeText(emojiButton.textContent);
      actionMessage.textContent = "Copied!";
      document.querySelector(".footer").appendChild(actionMessage);
      setTimeout(() => {
        actionMessage.remove();
      }, 1000);
    });
    document.querySelector(".recent-emoji").appendChild(emojiButton);
  }
}
//add event listener click to all buttons
const buttons = document.querySelectorAll("button");

// create a component that looks in html like this: <h3 class="actionMessage">Copied!</h3>
const actionMessage = document.createElement("h3");

actionMessage.classList.add("actionMessage");
actionMessage.textContent = "Copied!";

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    //refresh the action message
    actionMessage.remove();
    actionMessage.textContent = "Copied!";
    actionMessage.classList.add("actionMessage");

    //copy the emoji to clipboard
    navigator.clipboard.writeText(button.textContent);

    //add the emoji to recentEmojis array
    recentEmojis.push(button.textContent);
    //if the array has more than 8 emojis, remove the first one
    if (recentEmojis.length > 8) {
      recentEmojis.shift();
    }
    // loop through array and add emoji buttons to .recent-emoji from 8th list item to 1st
    document.querySelector(".recent-emoji").innerHTML = "";
    for (let i = recentEmojis.length - 1; i >= 0; i--) {
      // check if emoji already exists in list
      if (recentEmojis.indexOf(recentEmojis[i]) !== i) {
        recentEmojis.splice(i, 1);
        continue;
      }

      const emojiButton = document.createElement("button");
      emojiButton.textContent = recentEmojis[i];
      emojiButton.classList.add("emoji");

      // save this array to local storage
      localStorage.setItem("recentEmojis", JSON.stringify(recentEmojis));
      // add this same event listener to the new emoji buttons
      emojiButton.addEventListener("click", () => {
        navigator.clipboard.writeText(emojiButton.textContent);
        actionMessage.textContent = "Copied!";
        document.querySelector(".footer").appendChild(actionMessage);
        setTimeout(() => {
          actionMessage.remove();
        }, 1000);
      });
      document.querySelector(".recent-emoji").appendChild(emojiButton);
    }

    //append the action message to .footer and delete it after 1 s
    document.querySelector(".footer").appendChild(actionMessage);
    setTimeout(() => {
      actionMessage.remove();
    }, 1000);
  });
});
