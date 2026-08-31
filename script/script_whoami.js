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

function updateClock() {
  const now = new Date();
  const timeStr = now.toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    timeZone: "Asia/Kolkata"
  });

  const offsetStr = "UTC +05:30";

  document.querySelector("#clock").textContent = `${timeStr} (${offsetStr})`;
}

updateClock();
setInterval(updateClock, 100);