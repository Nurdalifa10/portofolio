const form = document.getElementById('komentar-form');
const list = document.querySelector('.komentar-list');

// Ambil data dari localStorage
let komentarData = JSON.parse(localStorage.getItem('komentarData')) || [];

function simpanKeLocalStorage() {
  localStorage.setItem('komentarData', JSON.stringify(komentarData));
}

function tampilkanKomentar() {
  list.innerHTML = '';
  komentarData.forEach(komentar => {
    const item = document.createElement('div');
    item.classList.add('komentar-item');
    item.innerHTML = `
      <strong>${komentar.nama}</strong> <small>${komentar.tanggal}</small>
      <p>${komentar.pesan}</p>
    `;
    list.appendChild(item);
  });
}

form.addEventListener('submit', function(e) {
  e.preventDefault();
  const nama = form.nama.value.trim();
  const pesan = form.pesan.value.trim();

  if (!nama || !pesan) return;

  const tanggal = new Date().toLocaleDateString('id-ID', {
    day: '2-digit', month: 'long', year: 'numeric'
  });

  const komentarBaru = { nama, pesan, tanggal };
  komentarData.unshift(komentarBaru);

  simpanKeLocalStorage();
  form.reset();
  tampilkanKomentar();
});

document.addEventListener('DOMContentLoaded', tampilkanKomentar);
function typingLoop(elementId, textArray, delay = 250) { // ← delay diperbesar
  const element = document.getElementById(elementId);
  const span = element.querySelector('span');
  let textIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function type() {
    const fullText = textArray[textIndex];
    const visibleText = fullText.substring(0, charIndex);
    span.textContent = visibleText;

    if (isDeleting) {
      charIndex--;
      if (charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % textArray.length;
        setTimeout(type, 1000); // jeda sebelum mengetik ulang
        return;
      }
    } else {
      charIndex++;
      if (charIndex === fullText.length) {
        isDeleting = true;
        setTimeout(type, 1500); // jeda setelah selesai mengetik
        return;
      }
    }

    setTimeout(type, isDeleting ? delay / 2 : delay);
  }

  type();
}

document.addEventListener('DOMContentLoaded', () => {
  typingLoop('selamat-datang', ['TANG']);
});

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('scroll-visible');
        // Hanya jalankan sekali, jika ingin ulangi hapus baris ini
        // observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.2
  });

  document.querySelectorAll("section").forEach(sec => {
    observer.observe(sec);
  });

