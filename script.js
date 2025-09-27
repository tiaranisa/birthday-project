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
  const paragraphs = [...letterBox.querySelectorAll("p")]; // ambil semua <p>

  letterBox.innerHTML = ""; // kosongin dulu
  letterBox.classList.add("letter-show");

  let pIndex = 0;
  let charIndex = 0;

  function type() {
    if (pIndex < paragraphs.length) {
      if (!letterBox.querySelectorAll("p")[pIndex]) {
        const newP = document.createElement("p");
        newP.className = paragraphs[pIndex].className;
        letterBox.appendChild(newP);
      }

      const currentP = letterBox.querySelectorAll("p")[pIndex];
      const text = paragraphs[pIndex].innerHTML; 

      if (charIndex < text.length) {
        currentP.innerHTML += text.charAt(charIndex);
        charIndex++;
        setTimeout(type, 35); // speed ketik
      } else {
        charIndex = 0;
        pIndex++;
        setTimeout(type, 200); // jeda antar paragraf
      }
    }
  }

  type();
}


function goToPage4() {
  // langsung aktifkan page 4 tanpa fade-in
  const current = document.querySelector(".page.active");
  const next = document.getElementById("page4");

  if (current) {
    current.classList.remove("active", "fade-out");
  }
  next.classList.add("active");

  // play backsound barengan
  const audio = document.getElementById("backsound");
  if (audio) {
    audio.currentTime = 0; // mulai dari awal
    audio.play().catch(err => {
      console.log("Autoplay diblokir, user harus klik dulu:", err);
    });
    audio.loop = true;
  }

  // munculin confetti
  const confetti = document.createElement("img");
  confetti.src = "assets/confetti.gif";
  confetti.classList.add("confetti-gif");
  document.body.appendChild(confetti);

  setTimeout(() => {
    confetti.remove();
  }, 2000);

  // mulai animasi love + efek ketik
  startLoveAnimation();
  typeWriterEffect();
}
