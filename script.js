const input = document.getElementById("input");
const searchBtn = document.getElementById("searchBtn");
const loader = document.getElementById("loader");
const result = document.getElementById("result");
const copyBtn = document.getElementById("copyBtn");
const clearBtn = document.getElementById("clearBtn");
const shareBtn = document.getElementById("shareBtn");
const clickSound = document.getElementById("clickSound");
const doneSound = document.getElementById("doneSound");

searchBtn.addEventListener("click", async () => {
  const number = input.value.trim();
  clickSound.play();

  if (!/^\d{11}$/.test(number) && !/^\d{13}$/.test(number)) {
    alert("Enter valid 11-digit number or 13-digit CNIC");
    return;
  }

  loader.style.display = "block";
  result.textContent = "";
  shareBtn.href = "#";

  try {
    const res = await fetch(
      `https://api.allorigins.win/get?url=${encodeURIComponent(`https://fam-official.serv00.net/sim/api.php?num=${number}`)}`
    );
    const data = await res.json();
    const content = JSON.parse(data.contents);

    result.textContent = JSON.stringify(content, null, 2);
    doneSound.play();

    shareBtn.href = `https://wa.me/?text=${encodeURIComponent(result.textContent)}`;
  } catch (err) {
    result.textContent = "Error fetching data";
  }

  loader.style.display = "none";
});

copyBtn.addEventListener("click", () => {
  navigator.clipboard.writeText(result.textContent);
  alert("Result copied!");
});

clearBtn.addEventListener("click", () => {
  result.textContent = "";
  input.value = "";
  shareBtn.href = "#";
});
