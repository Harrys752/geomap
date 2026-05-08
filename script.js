// ======================================================
// GeoMap Indonesia V2.0 - Geological Timeline Edition
// ======================================================

document.addEventListener('DOMContentLoaded', function () {

    // Initialize map
    const map = L.map('map').setView([-2.5489, 118.0149], 5);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap | GeoMap Indonesia'
    }).addTo(map);

    // Global variables
    let layers = {};
    let allMarkers = [];

    // Known places for quick search
    const knownPlaces = {
        'jawa': [-7.2, 110.0],
        'sumatera': [0.0, 101.0],
        'kalimantan': [0.0, 114.0],
        'sulawesi': [-2.0, 121.0],
        'papua': [-4.0, 138.0],
        'bali': [-8.4, 115.2],
        'bandung': [-6.9, 107.6],
        'jakarta': [-6.2, 106.8],
        'yogyakarta': [-7.8, 110.3],
        'surabaya': [-7.2, 112.7]
    };

    // Geological eras
    const eras = [
        { name: "Paleozoikum", short: "541-252 jt thn" },
        { name: "Mesozoikum", short: "252-66 jt thn" },
        { name: "Paleogen", short: "66-23 jt thn" },
        { name: "Neogen", short: "23-2.5 jt thn" },
        { name: "Kuarter", short: "2.5 jt thn-sekarang" }
    ];

    // Update sidebar with location details
    function updateSidebar(loc) {
        const panel = document.getElementById('info-panel');
        if (!panel) return;

        panel.innerHTML = `
            <div class="detail-panel">
                <h2 class="detail-title">${loc.emoji} ${loc.nama}</h2>
                <span class="detail-category">${loc.kategori}</span>
                <hr>
                <div class="detail-grid">
                    <p><strong>🪨 Jenis Batuan:</strong><br>${loc.info.batuan}</p>
                    <p><strong>🕰️ Umur:</strong><br>${loc.info.umur}</p>
                    <p><strong>🌍 Tektonik:</strong><br>${loc.info.lempeng}</p>
                    <p><strong>📚 Era:</strong><br>${loc.era}</p>
                </div>
                <div class="detail-description">${loc.deskripsi}</div>
                <button class="explore-btn" onclick="window.open('https://www.google.com/search?q=Geologi+${loc.nama}', '_blank')">Explorasi Literatur</button>
            </div>
        `;
    }

    // Generate filter checkboxes
    function generateFilters(categories) {
        const container = document.getElementById('dynamic-filters');
        if (!container) return;

        container.innerHTML = '';

        categories.forEach(cat => {
            const item = document.createElement('div');
            item.className = 'filter-item';
            item.innerHTML = `
                <label class="switch">
                    <input type="checkbox" checked data-cat="${cat}" id="check-${cat}">
                    <span class="slider"></span>
                </label>
                <span class="label-text">${cat}</span>
            `;

            container.appendChild(item);

            const checkbox = document.getElementById(`check-${cat}`);
            checkbox.addEventListener('change', function () {
                if (this.checked) {
                    map.addLayer(layers[cat]);
                } else {
                    map.removeLayer(layers[cat]);
                }
            });
        });
    }

    // Initialize app with markers and layers
    function initApp() {
        if (typeof lokasiGeologi === 'undefined') return;

        // Get unique categories
        const categories = [...new Set(lokasiGeologi.map(loc => loc.kategori.toLowerCase()))];

        // Create layers for each category
        categories.forEach(cat => {
            layers[cat] = L.layerGroup().addTo(map);
        });

        // Add markers to map
        lokasiGeologi.forEach(loc => {
            const geoIcon = L.divIcon({
                html: `<div style="font-size:28px;">${loc.emoji}</div>`,
                className: 'custom-div-icon',
                iconSize: [36, 36],
                iconAnchor: [18, 36]
            });

            const marker = L.marker(loc.koordinat, { icon: geoIcon });

            marker.on('click', () => {
                map.flyTo(loc.koordinat, 10, { duration: 1.5 });
                updateSidebar(loc);
            });

            layers[loc.kategori.toLowerCase()].addLayer(marker);
            allMarkers.push({ marker: marker, loc: loc });
        });

        generateFilters(categories);
    }

    // Search functionality
    const searchInput = document.getElementById('searchInput');

    if (searchInput) {
        searchInput.addEventListener('input', function (e) {
            const query = e.target.value.toLowerCase().trim();

            if (query === '') {
                allMarkers.forEach(m => {
                    m.marker.setOpacity(1);
                    if (m.marker.getElement()) m.marker.getElement().style.display = 'block';
                });
                map.setView([-2.5489, 118.0149], 5);
                return;
            }

            allMarkers.forEach(m => {
                const nama = m.loc.nama.toLowerCase();
                const desc = m.loc.deskripsi.toLowerCase();
                const wilayah = m.loc.wilayah.toLowerCase();

                const isMatch = nama.includes(query) || desc.includes(query) || wilayah.includes(query);

                if (isMatch) {
                    m.marker.setOpacity(1);
                    if (m.marker.getElement()) m.marker.getElement().style.display = 'block';
                } else {
                    m.marker.setOpacity(0);
                    if (m.marker.getElement()) m.marker.getElement().style.display = 'none';
                }
            });

            if (knownPlaces[query]) {
                map.flyTo(knownPlaces[query], 6, { duration: 1.5 });
            }
        });
    }

    // Generate timeline UI
    const timelineLabels = document.getElementById('timelineLabels');

    if (timelineLabels) {
        timelineLabels.innerHTML = '';

        eras.forEach((era, index) => {
            const div = document.createElement('div');
            div.className = 'timeline-label';

            if (index === eras.length - 1) {
                div.classList.add('active');
            }

            div.innerHTML = `<strong>${era.name}</strong><small>${era.short}</small>`;
            timelineLabels.appendChild(div);
        });
    }

    // Timeline slider functionality
    const eraSlider = document.getElementById('eraSlider');
    const selectedEra = document.getElementById('selected-era');

    if (eraSlider && selectedEra) {
        eraSlider.max = eras.length - 1;
        eraSlider.value = eras.length - 1;

        eraSlider.addEventListener('input', function () {
            const selectedIndex = parseInt(this.value);
            const activeEra = eras[selectedIndex];

            selectedEra.innerHTML = `Era Aktif: <strong>${activeEra.name}</strong><br><small>${activeEra.short}</small>`;

            const labels = document.querySelectorAll('.timeline-label');
            labels.forEach(label => label.classList.remove('active'));

            if (labels[selectedIndex]) {
                labels[selectedIndex].classList.add('active');
            }

            // Filter markers based on geological era
            allMarkers.forEach(m => {
                if (!m.loc.era) return;

                const markerEra = m.loc.era;
                const markerIndex = eras.findIndex(e => e.name === markerEra);

                // Geological logic: older structures remain visible in modern eras
                if (markerIndex <= selectedIndex) {
                    m.marker.setOpacity(1);
                    if (m.marker.getElement()) m.marker.getElement().style.display = 'block';
                } else {
                    m.marker.setOpacity(0);
                    if (m.marker.getElement()) m.marker.getElement().style.display = 'none';
                }
            });
        });
    }

    // Start app
    initApp();

});