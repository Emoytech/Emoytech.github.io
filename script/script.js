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

// Lookup table
const routes = {
  projects: { cmd: "cd projects/", href: "projects.html" },
  blog:     { cmd: "cd 'blog & reports/'",     href: "blog.html" },
  contact:  { cmd: "cat whoami.txt",       href: "whoami.html" }
};

const input = document.querySelector("#input");
const navList = document.querySelector(".navbar ul");

let typingInterval;
let isTyping = false;

navList.addEventListener("click", (e) => {
  const li = e.target.closest("li");
  if (!li) return; // clicked outside an li

  const route = routes[li.className];
  if (!route) return; // unknown class, ignore

  if (isTyping) return; // ignore clicks mid-animation

  // reset in case anything was left over
  clearInterval(typingInterval);
  input.textContent = "";
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
