const PASSWORD = "akoya";

const lockScreen = document.getElementById("lockScreen");
const mainContent = document.getElementById("mainContent");
const passwordInput = document.getElementById("passwordInput");
const enterBtn = document.getElementById("enterBtn");
const togglePassword = document.getElementById("togglePassword");
const error = document.getElementById("error");
const song = document.getElementById("song");
const musicBtn = document.getElementById("musicBtn");
const musicText = document.getElementById("musicText");
const scrollBtn = document.getElementById("scrollBtn");
const floatingBg = document.querySelector(".floating-bg");

function showHearts(count = 28) {
  const symbols = ["♥","♡","❤","💕","💗","💖","💞"];
  for (let i = 0; i < count; i++) {
    setTimeout(() => {
      const heart = document.createElement("span");
      heart.className = "float-heart";
      heart.textContent = symbols[Math.floor(Math.random() * symbols.length)];
      heart.style.left = Math.random() * 100 + "vw";
      heart.style.setProperty("--size", (14 + Math.random() * 24) + "px");
      heart.style.setProperty("--duration", (5 + Math.random() * 6) + "s");
      heart.style.setProperty("--drift", (-90 + Math.random() * 180) + "px");
      floatingBg.appendChild(heart);
      setTimeout(() => heart.remove(), 12000);
    }, i * 100);
  }
}

function openPage() {
  lockScreen.classList.add("hidden");
  mainContent.classList.remove("hidden");
  document.body.style.overflowY = "auto";
  showHearts(45);
  // يبدأ التشغيل تلقائيًا عند السماح من المتصفح بعد تفاعل المستخدم مع زر الدخول.
  song.play().then(() => {
    musicBtn.textContent = "❚❚";
    musicText.textContent = "الأغنية شغالة 🎵";
  }).catch(() => {
    musicText.textContent = "اضغط ▶ لتشغيل الأغنية";
  });
}

function checkPassword() {
  const value = passwordInput.value.trim();
  if (value.toLowerCase() === PASSWORD) {
    error.classList.remove("show");
    openPage();
  } else {
    error.classList.add("show");
    lockScreen.querySelector(".lock-card").classList.remove("shake");
    void lockScreen.querySelector(".lock-card").offsetWidth;
    lockScreen.querySelector(".lock-card").classList.add("shake");
    passwordInput.focus();
  }
}

enterBtn.addEventListener("click", checkPassword);
passwordInput.addEventListener("keydown", e => {
  if (e.key === "Enter") checkPassword();
});

togglePassword.addEventListener("click", () => {
  const hidden = passwordInput.type === "password";
  passwordInput.type = hidden ? "text" : "password";
  togglePassword.textContent = hidden ? "🙈" : "👁️";
});

musicBtn.addEventListener("click", async () => {
  if (song.paused) {
    try {
      await song.play();
      musicBtn.textContent = "❚❚";
      musicText.textContent = "الأغنية شغالة 🎵";
    } catch {
      musicText.textContent = "حط ملف song.mp3 داخل المشروع";
    }
  } else {
    song.pause();
    musicBtn.textContent = "▶";
    musicText.textContent = "الأغنية متوقفة";
  }
});

song.addEventListener("ended", () => {
  musicBtn.textContent = "▶";
  musicText.textContent = "الأغنية خلصت 🎵";
});

scrollBtn.addEventListener("click", () => {
  document.querySelector(".message-section").scrollIntoView({behavior:"smooth"});
});

// قلوب مستمرة بعد فتح الصفحة
setInterval(() => {
  if (!mainContent.classList.contains("hidden")) showHearts(2);
}, 1300);
