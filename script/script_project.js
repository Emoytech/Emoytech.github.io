function blink()
    {
        if (document.querySelector('.text-pointer').style.visibility == 'hidden')
            {
                document.querySelector('.text-pointer').style.visibility = 'visible';
            }
            else
            {
                document.querySelector('.text-pointer').style.visibility = 'hidden';
            }
    }
// Blink every 500ms
window.setInterval(blink, 500);

const input = document.querySelector("#input");
const table = document.querySelector("table");

let typingInterval;
let isTyping = false;

table.addEventListener("click", (e) => {
  const cell = e.target.closest("td");
  if (!cell) return;

  if (isTyping) return;

  const text = cell.textContent.trim();

  let cmd, action;

  if (text === ".") {
    cmd = "cd .";
    action = () => window.location.reload();
  } else if (text === "..") {
    cmd = "cd ..";
    action = () => window.location.href = "index.html";
  } else if(text === "'blog & report.html'/"){
    cmd = "cd 'blog & report.html'/"
    action = () => window.location.href = "blog.html";
  } else if(text === "whoami.txt"){
    cmd = "cat whoami.txt"
    action = () => window.location.href = "whoami.html";
  } else {
    const link = cell.querySelector(".file-link");
    if (!link) return;
    cmd = "cat \"" + link.textContent.trim() + "\"";
    action = () => window.open(link.dataset.href, "_blank");
  }

  clearInterval(typingInterval);
  input.textContent = "";
  isTyping = true;

  let i = 0;
  typingInterval = setInterval(() => {
    input.textContent += cmd[i];
    i++;

    if (i === cmd.length) {
      clearInterval(typingInterval);
      isTyping = false;
       setTimeout(() => {
        action();
        input.textContent = "";
       }, 400);
    }
  }, 50);
});
window.addEventListener("pageshow", (e) => {
  if (e.persisted) {
    clearInterval(typingInterval);
    isTyping = false;
    input.textContent = "";
  }
});