function blink() {
  const pointer = document.querySelector('.text-pointer');
  if (pointer.style.visibility === 'hidden') {
    pointer.style.visibility = 'visible';
  } else {
    pointer.style.visibility = 'hidden';
  }
}
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
  } else if(text === "projects/"){
    cmd = "cd projects/"
    action = () => window.location.href = "projects.html";
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

const routes = {
  home: { cmd: "cd home/", href: "index.html" },
  projects:     { cmd: "cd  projects/",     href: "projects.html" },
  contact:  { cmd: "cat whoami.txt",       href: "whoami.html" }
};
const navinput = document.querySelector("#input");
const navList = document.querySelector(".navbar ul");
navList.addEventListener("click", (e) => {
  const li = e.target.closest("li");
  if (!li) return; // clicked outside an li

  const route = routes[li.className];
  if (!route) return; // unknown class, ignore

  if (isTyping) return; // ignore clicks mid-animation

  // reset in case anything was left over
  clearInterval(typingInterval);
  navinput.textContent = "";
  isTyping = true;

  let i = 0;
  typingInterval = setInterval(() => {
    input.textContent += route.cmd[i];
    i++;
    if (i === route.cmd.length) {
      clearInterval(typingInterval);
      setTimeout(() => {
        window.location.href = route.href;
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