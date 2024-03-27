//add event listener click to all buttons
const buttons = document.querySelectorAll("button");

// create a component that looks in html like this: <h3 class="actionMessage">Copied!</h3>
const actionMessage = document.createElement("h3");

actionMessage.classList.add("actionMessage");
actionMessage.textContent = "Copied!";

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    //copy the emoji to clipboard
    navigator.clipboard.writeText(button.textContent);

    //append the action message to .footer and delete it after 1 s
    document.querySelector(".footer").appendChild(actionMessage);
    setTimeout(() => {
      actionMessage.remove();
    }, 1000);
  });
});
