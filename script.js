let currentPage = 1;

function showPage(pageNum) {
  const current = document.querySelector(".page.active");
  const next = document.getElementById("page" + pageNum);

  if (current && current !== next) {
    // kasih fade-out dulu
    current.classList.add("fade-out");

    // tunggu animasi selesai
    setTimeout(() => {
      current.classList.remove("active", "fade-out");

      // kasih fade-in ke page baru
      next.classList.add("active", "fade-in");

      // hapus fade-in setelah selesai biar bisa dipakai lagi nanti
      next.addEventListener("animationend", () => {
        next.classList.remove("fade-in");
      }, { once: true });

      // khusus page 4
      if (pageNum === 4) {
        const audio = document.getElementById("backsound");
        audio.play();
        audio.loop = true;
        startLoveAnimation();
        typeWriterEffect();
      }
    }, 800); // sama kayak durasi transition di CSS
  } else {
    next.classList.add("active");
  }
}




// efek balon + sparkle jatuh
function startLoveAnimation() {
  const icons = ["🎈", "✨"]; // pilihan icon

  setInterval(() => {
    const icon = document.createElement("div");
    icon.classList.add("love"); // class biar animasi jatuhnya sama
    icon.textContent = icons[Math.floor(Math.random() * icons.length)];
    icon.style.left = Math.random() * 100 + "vw";
    icon.style.animationDuration = (Math.random() * 2 + 3) + "s";
    document.body.appendChild(icon);

    setTimeout(() => {
      icon.remove();
    }, 5000);
  }, 500);
}

// efek ketik surat
function typeWriterEffect() {
  const letterBox = document.querySelector(".letter-scroll");
  const text = letterBox.innerHTML; // ambil isi asli
  letterBox.innerHTML = ""; // kosongin dulu

  // kasih class biar animasi slideIn jalan
  letterBox.classList.add("letter-show");

  let i = 0;
  function type() {
    if (i < text.length) {
      letterBox.innerHTML += text.charAt(i);
      i++;
      setTimeout(type, 35); // speed ketik
    }
  }

  // langsung jalan tanpa delay
  type();
}

function goToPage4() {
  // langsung tampilkan page 4
  showPage(4);

  // langsung munculin confetti bareng
  const confetti = document.createElement("img");
  confetti.src = "assets/confetti.gif";
  confetti.classList.add("confetti-gif");
  document.body.appendChild(confetti);

  // hapus confetti setelah durasi gif selesai
  setTimeout(() => {
    confetti.remove();
  }, 1000);
}

