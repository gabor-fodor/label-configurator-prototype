const formats = [
  { id: '14r', shape: 'round', size: '14mm Ø', label: 'Rund' },
  { id: '1811', shape: 'rect', size: '18 x 11 mm', label: 'Rechteckig' },
  { id: '2212', shape: 'special', size: '22 x 12 mm', label: 'Sonderwellenrand' },
  { id: '2216', shape: 'special', size: '22 x 16 mm', label: 'Sonderwellenrand' },
  { id: '2512', shape: 'rect', size: '25 x 12 mm', label: 'Rechteckig' },
  { id: '2516', shape: 'rect', size: '25 x 16 mm', label: 'Rechteckig' },
  { id: '2612', shape: 'special', size: '26 x 12 mm', label: 'Sonderwellenrand' },
  { id: '2928', shape: 'rect', size: '29 x 28 mm', label: 'Fast quadratisch' },
  { id: '3219', shape: 'rect', size: '32 x 19 mm', label: 'Rechteckig' },
  { id: '3635', shape: 'rect', size: '36 x 35 mm', label: 'Fast quadratisch' },
  { id: '3719', shape: 'rect', size: '37 x 19 mm', label: 'Breit' },
  { id: '3728', shape: 'rect', size: '37 x 28 mm', label: 'Großes Rechteck' },
  { id: '2616', shape: 'rect', size: '26 x 16 mm', label: 'Standard' }
];

const mockProducts = [
  { id: 'A21000618', name: 'premium 6.18', price: 119.98, image: 'http://localhost:8080/handauszeichner/premium_12_22_G.png' },
  { id: 'A21000718', name: 'premium 7.18', price: 129.95, image: 'http://localhost:8080/handauszeichner/premium_12_22_G.png' },
  { id: 'A21000818', name: 'premium 8.18', price: 139.50, image: 'http://localhost:8080/handauszeichner/premium_12_22_G.png' }
];

const paperColors = [
  { id: 'white', label: 'weiß', hex: '#ffffff', category: 'Standard-Farben' },
  { id: 'fullred', label: 'vollrot', hex: '#e20031', category: 'Standard-Farben' },
  { id: 'fullyellow', label: 'vollgelb', hex: '#ffed00', category: 'Standard-Farben' },
  { id: 'fullgreen', label: 'vollgrün', hex: '#009640', category: 'Standard-Farben' },
  { id: 'fullblue', label: 'vollblau', hex: '#00549f', category: 'Standard-Farben' },
  { id: 'fullbeige', label: 'vollbeige', hex: '#d9c0a3', category: 'Standard-Farben' },
  { id: 'fullorange', label: 'vollorange', hex: '#f39200', category: 'Standard-Farben' },
  { id: 'rosa', label: 'Rosa', hex: '#f4c7d7', category: 'Standard-Farben' },
  { id: 'pink', label: 'Pink', hex: '#e4007c', category: 'Standard-Farben' },
  { id: 'lila', label: 'Lila', hex: '#a1006b', category: 'Standard-Farben' },
  { id: 'braun', label: 'Braun', hex: '#7a684b', category: 'Standard-Farben' },
  { id: 'grau', label: 'Grau', hex: '#9d9e9e', category: 'Standard-Farben' },
  { id: 'fluoorange', label: 'Fluor orange', hex: '#ff8c4c', category: 'Leuchtfarben (Fluor)' },
  { id: 'fluorrot', label: 'Fluor rot', hex: '#ff5f6e', category: 'Leuchtfarben (Fluor)' },
  { id: 'fluorgelb', label: 'Fluor gelb', hex: '#fff100', category: 'Leuchtfarben (Fluor)' },
  { id: 'fluorgruen', label: 'Fluor grün', hex: '#77bc1f', category: 'Leuchtfarben (Fluor)' }
];

let state = {
  currentStep: 0,
  selectedFormat: formats[1],
  labelType: 'stock',
  selectedColor: paperColors[0],
  lines: 1,
  shapeFilter: 'all',
  selectedProducts: []
};

const steps = [
  { title: "Preisauszeichnungsetiketten individuell konfigurieren", desc: "Starten Sie jetzt Ihren persönlichen Konfigurationsprozess." },
  { title: "Schritt 1: Wählen Sie das Format aus", desc: "Wählen Sie die Form und Größe aus, die am besten zu Ihrem Produkt passt." },
  { title: "Schritt 2: Etiketten-Typ", desc: "Möchten Sie ein Lageretikett oder ein individuelles Etikett?" },
  { title: "Schritt 3: Papierfarbe", desc: "Wählen Sie die Farbe des Papiers aus." },
  { title: "Schritt 4: Wie viele Druckzeilen benötigen Sie in Ihrem Gerät?", desc: "Wie viele Zeilen an Informationen müssen Sie drucken?" },
  { title: "Schritt 5: Verfügbare Geräte", desc: "Wählen Sie die Produkte aus, für die Sie eine Anfrage stellen möchten." },
  { title: "Schritt 6: Anfragedetails", desc: "Bitte geben Sie Ihre Kontaktdaten an, damit wir Ihnen ein maßgeschneidertes Angebot zusenden können." },
  { title: "Schritt 7: Abschluss", desc: "Ihre Anfrage wurde erfolgreich übermittelt." }
];

function renderFormats() {
  const container = document.getElementById('format-grid');
  if (!container) return;
  
  container.innerHTML = '';
  const filtered = state.shapeFilter === 'all' 
    ? formats 
    : formats.filter(f => f.shape === state.shapeFilter);

  filtered.forEach(f => {
    const card = document.createElement('div');
    card.className = `bento-card format-card-small ${state.selectedFormat.id === f.id ? 'active' : ''}`;
    card.onclick = () => selectFormat(f);
    
    let svgPath = '';
    if (f.shape === 'round') svgPath = '<circle cx="30" cy="30" r="25" fill="none" stroke="currentColor" stroke-width="2"/>';
    else if (f.shape === 'rect') svgPath = '<rect x="10" y="15" width="40" height="30" fill="none" stroke="currentColor" stroke-width="2"/>';
    else svgPath = '<path d="M10,20 Q5,20 5,30 Q5,40 10,40 L50,40 Q55,40 55,30 Q55,20 50,20 Z" fill="none" stroke="currentColor" stroke-width="2"/>';

    card.innerHTML = `
      <div class="format-icon-mini"><svg viewBox="0 0 60 60" width="40" height="40">${svgPath}</svg></div>
      <div class="format-info-mini"><strong>${f.size}</strong></div>
    `;
    container.appendChild(card);
  });
}

function renderProducts() {
  const container = document.getElementById('product-results');
  if (!container) return;
  
  container.innerHTML = '';
  mockProducts.forEach(p => {
    const card = document.createElement('div');
    card.className = `product-card ${state.selectedProducts.includes(p.id) ? 'selected' : ''}`;
    card.onclick = (e) => {
      e.stopPropagation();
      toggleProduct(p.id);
    };
    
    card.innerHTML = `
      <div class="product-selection-ui">
        <input type="checkbox" ${state.selectedProducts.includes(p.id) ? 'checked' : ''} onchange="toggleProduct('${p.id}')" />
      </div>
      <div class="product-visual">
        <img src="${p.image}" alt="${p.name}" class="mini-device">
        <div class="price-tag-container ${state.selectedFormat.shape}">
          <div class="price-tag-content">
            <span class="price-val">€${p.price.toFixed(2)}</span>
          </div>
        </div>
      </div>
      <div class="product-details">
        <h3 class="product-brand">${p.name}</h3>
        <table class="spec-table">
          <tr><td>Format:</td><td>${state.selectedFormat.size}</td></tr>
          <tr><td>Druckzeilen:</td><td>${state.lines}</td></tr>
          <tr><td>Artikelnummer:</td><td>${p.id}</td></tr>
        </table>
      </div>
    `;
    container.appendChild(card);
  });
}

function renderInquiryArticles() {
  const container = document.getElementById('inquiry-articles-list');
  if (!container) return;
  container.innerHTML = '';
  state.selectedProducts.forEach(id => {
    const badge = document.createElement('div');
    badge.className = 'article-badge';
    badge.innerText = `Artikelnummer ${id}`;
    container.appendChild(badge);
  });
}

function updateUI() {
  // 1. Update Steps visibility
  document.querySelectorAll('.step-container').forEach((el) => {
    el.classList.toggle('active', el.id === `step-${state.currentStep}`);
  });

  // 2. Hide/Show Global Elements
  const header = document.querySelector('.header-card');
  const footer = document.querySelector('.footer-card');
  const isSplashOrSuccess = (state.currentStep === 0 || state.currentStep === 7);
  
  if (header) header.style.display = isSplashOrSuccess ? 'none' : 'flex';
  if (footer) footer.style.display = isSplashOrSuccess ? 'none' : 'flex';

  // 3. Update Header Content
  if (state.currentStep > 0 && state.currentStep < 7) {
    if (document.getElementById('step-badge')) {
      document.getElementById('step-badge').innerText = `Schritt ${state.currentStep} von 6`;
    }
    if (document.getElementById('step-title')) {
      document.getElementById('step-title').innerText = steps[state.currentStep].title;
    }
    if (document.getElementById('step-desc')) {
      document.getElementById('step-desc').innerText = steps[state.currentStep].desc;
    }

    // 4. Update Progress
    const percent = ((state.currentStep) / 6) * 100;
    if (document.getElementById('progress')) {
      document.getElementById('progress').style.width = `${percent}%`;
    }
    if (document.getElementById('progress-text')) {
      document.getElementById('progress-text').innerText = `${Math.round(percent)}% abgeschlossen`;
    }
  }

  // 4. Dynamic Content Rendering
  if (state.currentStep === 1) renderFormats();
  if (state.currentStep === 3) renderColors();
  if (state.currentStep === 5) renderProducts();
  if (state.currentStep === 6) renderInquiryArticles();

  // 5. Update Lines Selection
  document.querySelectorAll('.btn-line').forEach((btn, index) => {
    btn.classList.toggle('active', (index + 1) === state.lines);
  });

  // 6. Footer Buttons
  const btnBack = document.getElementById('btn-back');
  const btnNext = document.getElementById('btn-next');
  const btnInquiry = document.getElementById('btn-inquiry');
  const btnSubmitFinal = document.getElementById('btn-submit-final');

  if (btnBack) btnBack.disabled = state.currentStep === 1;

  if (state.currentStep >= 1 && state.currentStep <= 4) {
    if (btnNext) btnNext.style.display = 'block';
    if (btnInquiry) btnInquiry.style.display = 'none';
    if (btnSubmitFinal) btnSubmitFinal.style.display = 'none';
  } else if (state.currentStep === 5) {
    if (btnNext) btnNext.style.display = 'none';
    if (btnInquiry) btnInquiry.style.display = 'block';
    if (btnSubmitFinal) btnSubmitFinal.style.display = 'none';
    if (btnInquiry) btnInquiry.disabled = state.selectedProducts.length === 0;
  } else if (state.currentStep === 6) {
    if (btnNext) btnNext.style.display = 'none';
    if (btnInquiry) btnInquiry.style.display = 'none';
    if (btnSubmitFinal) btnSubmitFinal.style.display = 'block';
  }
}

window.nextStep = () => { if (state.currentStep < 7) { state.currentStep++; updateUI(); } };
window.prevStep = () => { if (state.currentStep > 0) { state.currentStep--; updateUI(); } };

window.selectLabelType = (type) => { 
  state.labelType = type; 
  document.querySelectorAll('.btn-label-type').forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('onclick').includes(type));
  });
  updateUI(); 
};

window.setShapeFilter = (filter) => {
  state.shapeFilter = filter;
  document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.toggle('active', btn.dataset.filter === filter));
  renderFormats();
};

window.selectFormat = (format) => { state.selectedFormat = format; updateUI(); };

window.renderColors = () => {
  const container = document.getElementById('color-grid');
  if (!container) return;
  container.innerHTML = '';
  
  const categories = [...new Set(paperColors.map(c => c.category))];
  
  categories.forEach(cat => {
    const section = document.createElement('div');
    section.className = 'color-category-section';
    section.innerHTML = `<h3 class="color-category-title">${cat}</h3>`;
    
    const grid = document.createElement('div');
    grid.className = 'color-palette-grid';
    
    paperColors.filter(c => c.category === cat).forEach(c => {
      const card = document.createElement('div');
      card.className = `color-circle-card ${state.selectedColor.id === c.id ? 'active' : ''}`;
      card.onclick = () => selectColor(c);
      card.innerHTML = `
        <div class="color-circle-swatch" style="background-color: ${c.hex}" title="${c.label}"></div>
        <div class="color-circle-label">${c.label}</div>
      `;
      grid.appendChild(card);
    });
    
    section.appendChild(grid);
    container.appendChild(section);
  });
};

window.selectColor = (color) => { state.selectedColor = color; updateUI(); };
window.selectLines = (lines) => { state.lines = lines; updateUI(); };

window.toggleProduct = (id) => {
  const index = state.selectedProducts.indexOf(id);
  if (index === -1) state.selectedProducts.push(id);
  else state.selectedProducts.splice(index, 1);
  updateUI();
};

window.submitForm = () => {
  // transition to step 7
  state.currentStep = 7;
  updateUI();
};

window.finishConfigurator = () => {
  alert('Konfiguration abgeschlossen!');
  window.location.reload();
};

// Initial Render
updateUI();
document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => setShapeFilter(btn.dataset.filter));
});

if (document.getElementById('btn-start')) {
  document.getElementById('btn-start').addEventListener('click', nextStep);
}
