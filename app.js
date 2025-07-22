let notes = JSON.parse(localStorage.getItem("notes")) || [];
let editingNoteIndex = null;

// Sayfa yüklendiğinde notları göster
window.onload = renderNotes;

// Notları kutular halinde listele
function renderNotes() {
  const noteList = document.getElementById("noteList");
  noteList.innerHTML = "";

  notes.forEach((note, index) => {
    const div = document.createElement("div");
    div.className = "note-card";
    div.innerHTML = `
      <div>
        <h4>${note.title}</h4>
      </div>
      <div class="note-actions">
        <button onclick="editNote(${index}); event.stopPropagation();">✏️</button>
        <button onclick="deleteNote(${index}); event.stopPropagation();">🗑️</button>
      </div>
    `;
    div.onclick = () => editNote(index);
    noteList.appendChild(div);
  });

  // "+" yeni not kutusu
  const addDiv = document.createElement("div");
  addDiv.className = "note-card add-new";
  addDiv.innerHTML = `➕`;
  addDiv.onclick = () => newNote();
  noteList.appendChild(addDiv);
}

// Yeni not oluştur
function newNote() {
  editingNoteIndex = null;
  document.getElementById("noteTitleInput").value = "";
  document.getElementById("noteContentInput").value = "";
  document.getElementById("noteEditor").style.display = "block";
  document.getElementById("editorTitle").innerText = "Yeni Not Oluştur";
}

// Mevcut notu düzenle
function editNote(index) {
  editingNoteIndex = index;
  document.getElementById("noteTitleInput").value = notes[index].title;
  document.getElementById("noteContentInput").value = notes[index].content;
  document.getElementById("noteEditor").style.display = "block";
  document.getElementById("editorTitle").innerText = `"${notes[index].title}" Notunu Düzenle`;
}

// Notu kaydet (yeni ya da güncelleme)
function saveNote() {
  const title = document.getElementById("noteTitleInput").value.trim();
  const content = document.getElementById("noteContentInput").value;
  if (!title) return alert("Lütfen not başlığı girin!");

  const note = { title, content };

  if (editingNoteIndex !== null) {
    notes[editingNoteIndex] = note;
  } else {
    notes.push(note);
  }

  localStorage.setItem("notes", JSON.stringify(notes));
  document.getElementById("noteEditor").style.display = "none";
  renderNotes();
}

// Not içeriğini temizle
function clearContent() {
  document.getElementById("noteContentInput").value = "";
}

// Editörü kapat
function closeEditor() {
  document.getElementById("noteEditor").style.display = "none";
}

// Belirli bir notu sil
function deleteNote(index) {
  if (confirm("Bu notu silmek istiyor musunuz?")) {
    notes.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(notes));
    renderNotes();
  }
}

// Tüm notları sil
function clearAllNotes() {
  if (confirm("Tüm notlar silinecek, emin misiniz?")) {
    notes = [];
    localStorage.removeItem("notes");
    renderNotes();
  }
}

// Menüleri aç/kapat
function toggleMenu(id) {
  document.querySelectorAll(".menu").forEach(menu => {
    if (menu.id === id) {
      menu.style.display = menu.style.display === "block" ? "none" : "block";
    } else {
      menu.style.display = "none";
    }
  });
}

// Karanlık mod aç/kapat
function toggleDarkMode() {
  const body = document.body;
  const dark = body.classList.contains("dark-mode");
  body.classList.toggle("dark-mode", !dark);
  body.style.backgroundColor = dark ? "#f0f0f0" : "#222";
  body.style.color = dark ? "#000" : "#fff";
}

function setupMenuHover(menuContainerId, menuId) {
  const container = document.getElementById(menuContainerId);
  const menu = document.getElementById(menuId);

  // Menü ve buton üzerine gelince göster
  container.addEventListener("mouseenter", () => {
    menu.style.display = "block";
  });

  // Menü ve butondan çıkınca gizle
  container.addEventListener("mouseleave", () => {
    menu.style.display = "none";
  });
}

function openEditor(title = '', content = '') {
  document.getElementById('noteTitleInput').value = title;
  document.getElementById('noteContentInput').value = content;
  document.getElementById('editorTitle').textContent = title ? 'Notu Düzenle' : 'Yeni Not';

  // Popup'ı göster
  document.getElementById('noteEditor').style.display = 'block';

  // Arka planı blur yap
  document.getElementById('noteList').classList.add('blur-background');
  document.getElementById('menuBar').classList.add('blur-background');
}

function closeEditor() {
  document.getElementById('noteEditor').style.display = 'none';

  // Blur'u kaldır
  document.getElementById('noteList').classList.remove('blur-background');
  document.getElementById('menuBar').classList.remove('blur-background');
}

// Örnek: tüm menü konteynerleri için ayarla
setupMenuHover("fileMenuContainer", "fileMenu");
setupMenuHover("editMenuContainer", "editMenu");
// diğer menüler için aynı şekilde çağır
