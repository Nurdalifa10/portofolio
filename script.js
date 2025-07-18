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