/**
 * Invitación de Boda - Sofia & Alexander (S&A)
 * Fecha: 27 de Noviembre de 2027
 * Establecimiento La Angélica
 */

document.addEventListener('DOMContentLoaded', () => {
  initEnvelope();
  initCountdown();
  initPetalsCanvas();
  initMusicPlayer();
  initGallery();
  initClipboardButtons();
  initCalendarButtons();
  initRsvpForm();
  initGuestTable();
});

/* ==========================================================================
   1. APERTURA DEL SOBRE INTERACTIVO
   ========================================================================== */
function initEnvelope() {
  const envelopeOverlay = document.getElementById('envelope-overlay');
  const envelope = document.getElementById('envelope');
  const waxSeal = document.getElementById('wax-seal');
  const invitationMain = document.getElementById('invitation-main');

  if (!envelopeOverlay || !waxSeal) return;

  let isOpening = false;

  const openInvitation = () => {
    if (isOpening) return;
    isOpening = true;

    // Sonido sutil de apertura romántica con Web Audio API
    playChimeSound();

    // Ráfaga de confeti / destellos dorados
    triggerCelebrationBurst();

    // Iniciar animación de apertura de solapas
    envelope.classList.add('is-opening');

    // Reproducir música de fondo automáticamente si el usuario interactuó
    startBackgroundMelody();

    setTimeout(() => {
      envelopeOverlay.classList.add('opened');
      invitationMain.classList.add('revealed');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 950);
  };

  waxSeal.addEventListener('click', openInvitation);
  envelope.addEventListener('click', openInvitation);
}

/* ==========================================================================
   2. CUENTA REGRESIVA (COUNTDOWN A 27/11/2027)
   ========================================================================== */
function initCountdown() {
  const weddingDate = new Date('2027-11-27T18:00:00').getTime();

  const daysEl = document.getElementById('days');
  const hoursEl = document.getElementById('hours');
  const minutesEl = document.getElementById('minutes');
  const secondsEl = document.getElementById('seconds');

  if (!daysEl) return;

  function updateTimer() {
    const now = new Date().getTime();
    const distance = weddingDate - now;

    if (distance < 0) {
      daysEl.innerText = '00';
      hoursEl.innerText = '00';
      minutesEl.innerText = '00';
      secondsEl.innerText = '00';
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    daysEl.innerText = String(days).padStart(2, '0');
    hoursEl.innerText = String(hours).padStart(2, '0');
    minutesEl.innerText = String(minutes).padStart(2, '0');
    secondsEl.innerText = String(seconds).padStart(2, '0');
  }

  updateTimer();
  setInterval(updateTimer, 1000);
}

/* ==========================================================================
   3. PÉTALOS Y DESTELLOS FLOTANTES (CANVAS ANIMADO)
   ========================================================================== */
function initPetalsCanvas() {
  const canvas = document.getElementById('petals-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const petals = [];
  const petalCount = 28;

  class Petal {
    constructor() {
      this.reset(true);
    }

    reset(initial = false) {
      this.x = Math.random() * width;
      this.y = initial ? Math.random() * height : -20;
      this.size = Math.random() * 9 + 7;
      this.speedY = Math.random() * 1.2 + 0.6;
      this.speedX = Math.random() * 1 - 0.5;
      this.rotation = Math.random() * 360;
      this.rotationSpeed = (Math.random() - 0.5) * 1.5;
      this.opacity = Math.random() * 0.45 + 0.25;
      this.isGold = Math.random() > 0.6;
      this.color = this.isGold ? 'rgba(212, 175, 55, ' : 'rgba(235, 175, 175, ';
    }

    update() {
      this.y += this.speedY;
      this.x += Math.sin(this.y / 30) * 0.6 + this.speedX;
      this.rotation += this.rotationSpeed;

      if (this.y > height + 20 || this.x < -20 || this.x > width + 20) {
        this.reset();
      }
    }

    draw() {
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate((this.rotation * Math.PI) / 180);
      ctx.beginPath();
      ctx.ellipse(0, 0, this.size, this.size * 0.55, 0, 0, Math.PI * 2);
      ctx.fillStyle = this.color + this.opacity + ')';
      ctx.fill();
      ctx.restore();
    }
  }

  for (let i = 0; i < petalCount; i++) {
    petals.push(new Petal());
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);
    for (let p of petals) {
      p.update();
      p.draw();
    }
    requestAnimationFrame(animate);
  }
  animate();
}

/* ==========================================================================
   4. RÁFAGA DE CONFETI AL ABRIR EL SOBRE
   ========================================================================== */
function triggerCelebrationBurst() {
  const canvas = document.createElement('canvas');
  canvas.style.position = 'fixed';
  canvas.style.inset = '0';
  canvas.style.width = '100vw';
  canvas.style.height = '100vh';
  canvas.style.pointerEvents = 'none';
  canvas.style.zIndex = '1500';
  document.body.appendChild(canvas);

  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const particles = [];
  const colors = ['#D4AF37', '#F3E5AB', '#D9A098', '#FFFFFF', '#6B7C65'];

  for (let i = 0; i < 90; i++) {
    particles.push({
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
      vx: (Math.random() - 0.5) * 16,
      vy: (Math.random() - 0.7) * 16,
      size: Math.random() * 8 + 4,
      color: colors[Math.floor(Math.random() * colors.length)],
      alpha: 1,
      rotation: Math.random() * 360,
      decay: Math.random() * 0.015 + 0.008
    });
  }

  function renderBurst() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let activeCount = 0;

    for (let p of particles) {
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.35;
      p.alpha -= p.decay;
      p.rotation += 4;

      if (p.alpha > 0) {
        activeCount++;
        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
        ctx.restore();
      }
    }

    if (activeCount > 0) {
      requestAnimationFrame(renderBurst);
    } else {
      canvas.remove();
    }
  }
  renderBurst();
}

/* ==========================================================================
   5. REPRODUCTOR DE MÚSICA Y SINTETIZADOR ACÚSTICO ROMÁNTICO
   ========================================================================== */
let audioCtx = null;
let melodyInterval = null;
let isMelodyPlaying = false;

function initAudioContext() {
  if (!audioCtx) {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    audioCtx = new AudioContext();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
}

function playPianoNote(frequency, time, duration = 1.2, volume = 0.15) {
  if (!audioCtx) return;
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();

  osc.type = 'triangle';
  osc.frequency.setValueAtTime(frequency, time);

  gain.gain.setValueAtTime(0.001, time);
  gain.gain.exponentialRampToValueAtTime(volume, time + 0.04);
  gain.gain.exponentialRampToValueAtTime(0.0001, time + duration);

  osc.connect(gain);
  gain.connect(audioCtx.destination);

  osc.start(time);
  osc.stop(time + duration);
}

function playChimeSound() {
  initAudioContext();
  const now = audioCtx.currentTime;
  const chord = [523.25, 659.25, 783.99, 1046.5, 1318.51];
  chord.forEach((freq, idx) => {
    playPianoNote(freq, now + idx * 0.1, 1.8, 0.18);
  });
}

function startBackgroundMelody() {
  initAudioContext();
  if (isMelodyPlaying) return;
  isMelodyPlaying = true;
  updateMusicUI(true);

  const melodyNotes = [
    [587.33, 440.0, 293.66],
    [440.0, 329.63, 220.0],
    [493.88, 369.99, 246.94],
    [369.99, 293.66, 185.0],
    [392.0, 329.63, 196.0],
    [293.66, 440.0, 293.66],
    [392.0, 493.88, 196.0],
    [440.0, 554.37, 220.0]
  ];

  let currentStep = 0;

  function playStep() {
    if (!isMelodyPlaying) return;
    const now = audioCtx.currentTime;
    const chord = melodyNotes[currentStep];

    chord.forEach((freq, idx) => {
      playPianoNote(freq, now + idx * 0.15, 2.5, 0.12);
    });

    currentStep = (currentStep + 1) % melodyNotes.length;
  }

  playStep();
  melodyInterval = setInterval(playStep, 2400);
}

function stopBackgroundMelody() {
  isMelodyPlaying = false;
  if (melodyInterval) {
    clearInterval(melodyInterval);
    melodyInterval = null;
  }
  updateMusicUI(false);
}

function initMusicPlayer() {
  const musicBtn = document.getElementById('music-toggle-btn');
  if (!musicBtn) return;

  musicBtn.addEventListener('click', () => {
    initAudioContext();
    if (isMelodyPlaying) {
      stopBackgroundMelody();
      showToast('Música en pausa');
    } else {
      startBackgroundMelody();
      showToast('Reproduciendo melodía romántica 🎵');
    }
  });
}

function updateMusicUI(playing) {
  const musicBtn = document.getElementById('music-toggle-btn');
  const musicLabel = document.getElementById('music-label');
  if (!musicBtn) return;

  if (playing) {
    musicBtn.classList.add('playing');
    musicBtn.innerHTML = `
      <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
        <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
      </svg>
    `;
    if (musicLabel) musicLabel.innerText = 'Melodía: On';
  } else {
    musicBtn.classList.remove('playing');
    musicBtn.innerHTML = `
      <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
        <path d="M8 5v14l11-7z"/>
      </svg>
    `;
    if (musicLabel) musicLabel.innerText = 'Melodía: Off';
  }
}

/* ==========================================================================
   6. GALERÍA DE FOTOS Y LIGHTBOX CON SOPORTE PARA AGREGAR FOTOS
   ========================================================================== */
const defaultPhotos = [
  { src: 'assets/images/couple-1.jpg', caption: 'Sofia & Alexander - Establecimiento La Angélica' },
  { src: 'assets/images/couple-2.jpg', caption: 'Nuestra historia de amor' },
  { src: 'assets/images/couple-3.jpg', caption: 'Celebrando nuestro compromiso' }
];

let galleryPhotos = [...defaultPhotos];
let currentLightboxIndex = 0;

function initGallery() {
  try {
    const saved = localStorage.getItem('wedding_custom_photos_sa');
    if (saved) {
      galleryPhotos = JSON.parse(saved);
    }
  } catch (e) {
    console.warn('Storage not accessible:', e);
  }

  renderGallery();

  const photoInput = document.getElementById('photo-file-input');
  if (photoInput) {
    photoInput.addEventListener('change', handlePhotoUpload);
  }

  const lightboxModal = document.getElementById('lightbox-modal');
  const lightboxClose = document.getElementById('lightbox-close');
  const lightboxPrev = document.getElementById('lightbox-prev');
  const lightboxNext = document.getElementById('lightbox-next');

  if (lightboxClose) {
    lightboxClose.addEventListener('click', closeLightbox);
  }

  if (lightboxPrev) {
    lightboxPrev.addEventListener('click', () => changeLightboxPhoto(-1));
  }

  if (lightboxNext) {
    lightboxNext.addEventListener('click', () => changeLightboxPhoto(1));
  }

  if (lightboxModal) {
    lightboxModal.addEventListener('click', (e) => {
      if (e.target === lightboxModal) {
        closeLightbox();
      }
    });
  }

  document.addEventListener('keydown', (e) => {
    if (!lightboxModal.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') changeLightboxPhoto(-1);
    if (e.key === 'ArrowRight') changeLightboxPhoto(1);
  });
}

function renderGallery() {
  const galleryGrid = document.getElementById('gallery-grid');
  if (!galleryGrid) return;

  galleryGrid.innerHTML = '';

  galleryPhotos.forEach((photo, index) => {
    const item = document.createElement('div');
    item.className = 'gallery-item';
    item.setAttribute('role', 'button');
    item.setAttribute('tabindex', '0');
    item.setAttribute('aria-label', photo.caption || `Foto de boda ${index + 1}`);

    item.innerHTML = `
      <img src="${photo.src}" alt="${photo.caption || 'Foto de boda'}" class="gallery-img" loading="lazy" />
      <div class="gallery-overlay">
        <svg viewBox="0 0 24 24" width="30" height="30" fill="currentColor">
          <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
        </svg>
      </div>
    `;

    item.addEventListener('click', () => openLightbox(index));
    galleryGrid.appendChild(item);
  });
}

function handlePhotoUpload(event) {
  const files = event.target.files;
  if (!files || files.length === 0) return;

  Array.from(files).forEach((file) => {
    if (!file.type.startsWith('image/')) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      galleryPhotos.unshift({
        src: e.target.result,
        caption: `Recuerdo especial - Sofia & Alexander`
      });

      try {
        localStorage.setItem('wedding_custom_photos_sa', JSON.stringify(galleryPhotos.slice(0, 10)));
      } catch (err) {
        console.warn('LocalStorage limit reached for image storage');
      }

      renderGallery();
      showToast('¡Foto agregada a la galería con éxito! ✨');
    };
    reader.readAsDataURL(file);
  });

  event.target.value = '';
}

function openLightbox(index) {
  currentLightboxIndex = index;
  const modal = document.getElementById('lightbox-modal');
  const img = document.getElementById('lightbox-img');
  const caption = document.getElementById('lightbox-caption');

  if (!modal || !img) return;

  img.src = galleryPhotos[currentLightboxIndex].src;
  if (caption) {
    caption.innerText = galleryPhotos[currentLightboxIndex].caption || '';
  }

  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  const modal = document.getElementById('lightbox-modal');
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
}

function changeLightboxPhoto(direction) {
  currentLightboxIndex = (currentLightboxIndex + direction + galleryPhotos.length) % galleryPhotos.length;
  const img = document.getElementById('lightbox-img');
  const caption = document.getElementById('lightbox-caption');

  if (img) {
    img.src = galleryPhotos[currentLightboxIndex].src;
  }
  if (caption) {
    caption.innerText = galleryPhotos[currentLightboxIndex].caption || '';
  }
}

/* ==========================================================================
   7. COPIAR DATOS BANCARIOS (CBU / ALIAS)
   ========================================================================== */
function initClipboardButtons() {
  const copyButtons = document.querySelectorAll('.btn-copy');

  copyButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const textToCopy = btn.getAttribute('data-copy');
      if (!textToCopy) return;

      navigator.clipboard.writeText(textToCopy).then(
        () => {
          showToast(`¡Copiado: ${textToCopy}! ✨`);
          const originalText = btn.innerText;
          btn.innerText = '¡Copiado!';
          setTimeout(() => {
            btn.innerText = originalText;
          }, 2000);
        },
        () => {
          const tempInput = document.createElement('input');
          tempInput.value = textToCopy;
          document.body.appendChild(tempInput);
          tempInput.select();
          document.execCommand('copy');
          document.body.removeChild(tempInput);
          showToast(`¡Copiado: ${textToCopy}! ✨`);
        }
      );
    });
  });
}

/* ==========================================================================
   8. AGENDAR EN GOOGLE CALENDAR & APPLE/OUTLOOK (.ICS)
   ========================================================================== */
function initCalendarButtons() {
  const googleBtn = document.getElementById('btn-google-cal');
  const icsBtn = document.getElementById('btn-ics-cal');

  const title = encodeURIComponent('Boda de Sofia y Alexander 💍');
  const details = encodeURIComponent(
    '¡Nos casamos! Te esperamos para celebrar este día tan especial con nosotros en Establecimiento La Angélica. ¡No olvides confirmar tu asistencia!'
  );
  const location = encodeURIComponent('Establecimiento La Angélica, https://maps.app.goo.gl/MxfvpKQpEJUZecMeA');
  const startUtc = '20271127T210000Z';
  const endUtc = '20271128T080000Z';

  if (googleBtn) {
    const googleUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${startUtc}/${endUtc}&details=${details}&location=${location}`;
    googleBtn.href = googleUrl;
    googleBtn.target = '_blank';
  }

  if (icsBtn) {
    icsBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const icsContent = [
        'BEGIN:VCALENDAR',
        'VERSION:2.0',
        'PRODID:-//Sofia & Alexander Wedding//ES',
        'BEGIN:VEVENT',
        `SUMMARY:Boda de Sofia y Alexander 💍`,
        `DESCRIPTION:¡Nos casamos! Queremos que nos acompañes en este día tan especial en Establecimiento La Angélica.`,
        `LOCATION:Establecimiento La Angélica`,
        `DTSTART:${startUtc}`,
        `DTEND:${endUtc}`,
        'STATUS:CONFIRMED',
        'END:VEVENT',
        'END:VCALENDAR'
      ].join('\r\n');

      const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.setAttribute('download', 'Boda_Sofia_y_Alexander_2027.ics');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      showToast('Calendario descargado 📅');
    });
  }
}

/* ==========================================================================
   9. GESTIÓN Y PERSISTENCIA DE LA TABLA DE INVITADOS
   ========================================================================== */
const GUESTS_STORAGE_KEY = 'wedding_confirmed_guests_sa_table_v2';

let guestsData = [];

function loadStoredGuests() {
  try {
    const stored = localStorage.getItem(GUESTS_STORAGE_KEY);
    if (stored) {
      guestsData = JSON.parse(stored);
    } else {
      // Ejemplo inicial para que los novios vean cómo se organiza la tabla
      guestsData = [
        {
          id: 'sample-1',
          date: '28/09/2026 19:30',
          name: 'Mariana & Carlos Rossi',
          attendance: 'si',
          adults: '2',
          kids: '1 niño (5 años)',
          dietary: 'Celíaco (Sin TACC)',
          song: 'Bailando - Enrique Iglesias',
          message: '¡Muchas felicidades a los dos! No vemos la hora de celebrar juntos.'
        }
      ];
      saveStoredGuests();
    }
  } catch (e) {
    console.warn('Error loading guest list from localStorage:', e);
    guestsData = [];
  }
}

function saveStoredGuests() {
  try {
    localStorage.setItem(GUESTS_STORAGE_KEY, JSON.stringify(guestsData));
  } catch (e) {
    console.warn('Error saving guest list:', e);
  }
}

function initGuestTable() {
  loadStoredGuests();
  renderGuestTable();

  // Búsqueda en tiempo real
  const searchInput = document.getElementById('guest-search-input');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      renderGuestTable(e.target.value.toLowerCase().trim());
    });
  }

  // Exportar a Excel (CSV)
  const exportBtn = document.getElementById('btn-export-csv');
  if (exportBtn) {
    exportBtn.addEventListener('click', exportGuestsToCSV);
  }
}

function renderGuestTable(query = '') {
  const tbody = document.getElementById('guests-table-body');
  const countPill = document.getElementById('total-guests-count');
  const emptyState = document.getElementById('table-empty-state');
  const table = document.getElementById('guests-table');

  if (!tbody) return;

  const filteredGuests = guestsData.filter((g) => {
    if (!query) return true;
    return (
      (g.name && g.name.toLowerCase().includes(query)) ||
      (g.kids && g.kids.toLowerCase().includes(query)) ||
      (g.dietary && g.dietary.toLowerCase().includes(query)) ||
      (g.song && g.song.toLowerCase().includes(query)) ||
      (g.message && g.message.toLowerCase().includes(query))
    );
  });

  // Contar confirmados
  const confirmedResponses = guestsData.filter((g) => g.attendance === 'si');
  const totalAdults = confirmedResponses.reduce((acc, curr) => acc + parseInt(curr.adults || '1', 10), 0);

  if (countPill) {
    countPill.innerText = `${totalAdults} adultos confirmados (${guestsData.length} respuestas registradas)`;
  }

  tbody.innerHTML = '';

  if (filteredGuests.length === 0) {
    if (emptyState) emptyState.style.display = 'block';
    if (table) table.style.display = 'none';
  } else {
    if (emptyState) emptyState.style.display = 'none';
    if (table) table.style.display = 'table';

    filteredGuests.forEach((guest) => {
      const tr = document.createElement('tr');
      const isAttending = guest.attendance === 'si';

      tr.innerHTML = `
        <td style="font-size: 0.8rem; color: var(--color-text-muted);">${guest.date || '-'}</td>
        <td style="font-weight: 600; white-space: normal; min-width: 140px;">${escapeHtml(guest.name)}</td>
        <td>
          <span class="${isAttending ? 'badge-confirmed' : 'badge-declined'}">
            ${isAttending ? '✓ Sí Asiste' : '✕ No Asiste'}
          </span>
        </td>
        <td style="text-align: center;">${isAttending ? (guest.adults || '1') : '-'}</td>
        <td style="white-space: normal; min-width: 130px;">${isAttending ? escapeHtml(guest.kids || 'Ninguno') : '-'}</td>
        <td style="white-space: normal; min-width: 140px;">${isAttending ? escapeHtml(guest.dietary || 'Ninguna') : '-'}</td>
        <td>${isAttending && guest.song ? '🎵 ' + escapeHtml(guest.song) : '-'}</td>
        <td style="max-width: 180px; white-space: normal; font-size: 0.82rem;" title="${escapeHtml(guest.message || '')}">
          ${guest.message ? escapeHtml(guest.message) : '-'}
        </td>
        <td style="text-align: center;">
          <button class="btn-delete-guest" data-id="${guest.id}" title="Eliminar registro">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
              <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/>
            </svg>
          </button>
        </td>
      `;

      const deleteBtn = tr.querySelector('.btn-delete-guest');
      if (deleteBtn) {
        deleteBtn.addEventListener('click', () => {
          if (confirm(`¿Deseas eliminar a "${guest.name}" de la lista?`)) {
            guestsData = guestsData.filter((item) => item.id !== guest.id);
            saveStoredGuests();
            renderGuestTable(query);
            showToast('Registro eliminado de la lista');
          }
        });
      }

      tbody.appendChild(tr);
    });
  }
}

function exportGuestsToCSV() {
  if (guestsData.length === 0) {
    showToast('No hay invitados registrados para exportar.');
    return;
  }

  const headers = ['Fecha', 'Asistentes', 'Asistencia', 'Adultos', 'Niños y Edades', 'Dieta o Alergias', 'Cancion', 'Mensaje'];
  const rows = guestsData.map((g) => [
    `"${g.date || ''}"`,
    `"${(g.name || '').replace(/"/g, '""')}"`,
    `"${g.attendance === 'si' ? 'Sí Asiste' : 'No Asiste'}"`,
    `"${g.attendance === 'si' ? (g.adults || '1') : '0'}"`,
    `"${(g.kids || '').replace(/"/g, '""')}"`,
    `"${(g.dietary || '').replace(/"/g, '""')}"`,
    `"${(g.song || '').replace(/"/g, '""')}"`,
    `"${(g.message || '').replace(/"/g, '""')}"`
  ]);

  const csvContent = '\uFEFF' + [headers.join(','), ...rows.map((r) => r.join(','))].join('\r\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.setAttribute('download', 'Invitados_Confirmados_Boda_Sofia_y_Alexander_2027.csv');
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  showToast('¡Lista descargada en formato Excel (.csv)! 📊');
}

function escapeHtml(text) {
  if (!text) return '';
  const div = document.createElement('div');
  div.innerText = text;
  return div.innerHTML;
}

/* ==========================================================================
   10. FORMULARIO RSVP Y ENVÍO A WHATSAPP + GUARDADO EN TABLA
   ========================================================================== */
function initRsvpForm() {
  const form = document.getElementById('rsvp-form');
  const attendanceRadios = document.querySelectorAll('input[name="attendance"]');
  const groupGuestCount = document.getElementById('group-guest-count');
  const groupKidsInfo = document.getElementById('group-kids-info');
  const groupDietaryMenu = document.getElementById('group-dietary-menu');

  if (!form) return;

  // Ocultar opciones de comida/niños/personas si no asiste
  attendanceRadios.forEach((radio) => {
    radio.addEventListener('change', () => {
      const isYes = document.querySelector('input[name="attendance"]:checked').value === 'si';
      if (groupGuestCount) groupGuestCount.style.display = isYes ? 'flex' : 'none';
      if (groupKidsInfo) groupKidsInfo.style.display = isYes ? 'flex' : 'none';
      if (groupDietaryMenu) groupDietaryMenu.style.display = isYes ? 'flex' : 'none';
    });
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('guest-name').value.trim();
    const attendance = document.querySelector('input[name="attendance"]:checked').value;
    const adults = document.getElementById('guest-count') ? document.getElementById('guest-count').value : '1';
    const kids = document.getElementById('kids-info') ? document.getElementById('kids-info').value.trim() : '';
    const dietary = document.getElementById('dietary-menu') ? document.getElementById('dietary-menu').value.trim() : '';
    const song = document.getElementById('song-request') ? document.getElementById('song-request').value.trim() : '';
    const message = document.getElementById('guest-message') ? document.getElementById('guest-message').value.trim() : '';

    if (!name) {
      showToast('Por favor ingresa los nombres y apellidos de todos los que confirman');
      return;
    }

    // 1. Guardar en la tabla organizada
    const now = new Date();
    const formattedDate = `${String(now.getDate()).padStart(2, '0')}/${String(now.getMonth() + 1).padStart(2, '0')}/${now.getFullYear()} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

    const newGuestEntry = {
      id: 'guest-' + Date.now(),
      date: formattedDate,
      name: name,
      attendance: attendance,
      adults: attendance === 'si' ? adults : '0',
      kids: attendance === 'si' ? (kids || 'Ninguno') : '-',
      dietary: attendance === 'si' ? (dietary || 'Ninguna') : '-',
      song: song,
      message: message
    };

    guestsData.unshift(newGuestEntry);
    saveStoredGuests();
    renderGuestTable();

    // 2. Formatear y Enviar a WhatsApp
    let text = `💍 *CONFIRMACIÓN DE ASISTENCIA - BODA SOFIA Y ALEXANDER* 💍\n\n`;
    text += `👥 *Asistentes:* ${name}\n`;
    text += `💌 *Asistencia:* ${attendance === 'si' ? '¡Sí, confirmamos con alegría! 🎉' : 'Lamentablemente no podremos asistir 😢'}\n`;

    if (attendance === 'si') {
      text += `👤 *Adultos:* ${adults}\n`;
      if (kids) {
        text += `👶 *Niños y Edades:* ${kids}\n`;
      }
      if (dietary) {
        text += `🥗 *Alergia o Dieta Especial:* ${dietary}\n`;
      }
      if (song) {
        text += `🎶 *Tema para la fiesta:* ${song}\n`;
      }
    }

    if (message) {
      text += `💬 *Mensaje para los novios:* "${message}"\n`;
    }

    text += `\n📅 *Fecha:* 27/11/2027\n📍 *Lugar:* Establecimiento La Angélica`;

    const encodedText = encodeURIComponent(text);
    const whatsappUrl = `https://api.whatsapp.com/send?phone=5493454048992&text=${encodedText}`;

    window.open(whatsappUrl, '_blank');
    showToast('¡Confirmación registrada y enviada a WhatsApp! 💌');

    // Limpiar formulario excepto radio default
    document.getElementById('guest-name').value = '';
    if (document.getElementById('kids-info')) document.getElementById('kids-info').value = '';
    if (document.getElementById('dietary-menu')) document.getElementById('dietary-menu').value = '';
    if (document.getElementById('song-request')) document.getElementById('song-request').value = '';
    if (document.getElementById('guest-message')) document.getElementById('guest-message').value = '';
  });
}

/* ==========================================================================
   11. TOAST DE NOTIFICACIÓN
   ========================================================================== */
let toastTimeout = null;
function showToast(message) {
  let toast = document.getElementById('toast-notification');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toast-notification';
    toast.className = 'toast-notification';
    document.body.appendChild(toast);
  }

  toast.innerText = message;
  toast.classList.add('show');

  if (toastTimeout) clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => {
    toast.classList.remove('show');
  }, 3200);
}
