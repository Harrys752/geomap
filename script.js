// GeoMap V1.1 - Ariss Edition (Final Optimized)
document.addEventListener('DOMContentLoaded', function () {
    // 1. Inisialisasi Peta - Fokus awal Indonesia
    const map = L.map('map').setView([-2.5489, 118.0149], 5);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap | GeoMap Indonesia'
    }).addTo(map);

    // Variabel Global
    let layers = {};
    let allMarkers = [];

    // Dataset lokasi untuk mempermudah pencarian regional (Bisa ditambah sesuai kebutuhan)
    const knownPlaces = {
        'bandung': [-6.9175, 107.6191],
        'jakarta': [-6.2088, 106.8456],
        'yogyakarta': [-7.7956, 110.3695],
        'jogja': [-7.7956, 110.3695],
        'surabaya': [-7.2575, 112.7521],
        'medan': [3.5952, 98.6728],
        'palu': [-0.907, 119.85],
        'jawa': [-7.0, 110.0],
        'sumatera': [-0.5897, 101.3431],
        'kalimantan': [-0.0001, 113.9213],
        'sulawesi': [-1.4300, 121.4456],
        'papua': [-4.2699, 138.0803]
    };

    // 2. Fungsi Hitung Jarak (Haversine Formula)
    function haversineDistance(coords1, coords2) {
        const R = 6371;
        const dLat = (coords2[0] - coords1[0]) * Math.PI / 180;
        const dLon = (coords2[1] - coords1[1]) * Math.PI / 180;
        const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(coords1[0] * Math.PI / 180) * Math.cos(coords2[0] * Math.PI / 180) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
        return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    }

    // 3. Update Sidebar UI - Menampilkan Detail Geologi
    function updateSidebar(loc) {
        const panel = document.getElementById('info-panel');
        if (!panel) return;

        // Efek transisi sederhana dengan template literal
        panel.innerHTML = `
            <div style="animation: fadeIn 0.4s ease-out; color: white;">
                <h2 style="color:#f1c40f; margin-bottom:10px;">${loc.emoji} ${loc.nama}</h2>
                <span style="background:#e67e22; padding:2px 8px; border-radius:4px; font-size:0.8rem; text-transform:uppercase;">
                    ${loc.kategori}
                </span>
                <hr style="border: 0.5px solid #444; margin: 15px 0;">
                
                <div style="display: grid; gap: 8px; font-size: 0.9rem;">
                    <p><strong>💎 Jenis Batuan:</strong> ${loc.info.batuan}</p>
                    <p><strong>⏳ Umur Geologi:</strong> ${loc.info.umur}</p>
                    <p><strong>🌍 Setting Tektonik:</strong> ${loc.info.lempeng}</p>
                </div>

                <div style="background:rgba(255,255,255,0.05); padding:15px; border-radius:8px; margin:15px 0; font-size:0.9rem; line-height:1.6; border-left: 4px solid #f1c40f;">
                    ${loc.deskripsi}
                </div>

                <button onclick="window.open('https://www.google.com/search?q=Geologi+${loc.nama}', '_blank')" 
                        style="width:100%; padding:12px; cursor:pointer; background:#f1c40f; border:none; border-radius:5px; font-weight:bold; transition: 0.3s;">
                    Explorasi Literatur
                </button>
            </div>
        `;
    }

    // 4. Generate Filter Checkbox secara Dinamis
    function generateFilters(categories) {
        const container = document.getElementById('dynamic-filters');
        if (!container) return;

        container.innerHTML = '';
        categories.forEach(cat => {
            const item = document.createElement('div');
            item.className = 'filter-item';
            item.style.cssText = 'display:flex; align-items:center; margin-bottom:12px;';

            item.innerHTML = `
                <label class="switch">
                    <input type="checkbox" id="check-${cat}" data-cat="${cat}" checked>
                    <span class="slider"></span>
                </label>
                <span style="margin-left:12px; color:white; font-size:0.9rem; text-transform: capitalize;">${cat}</span>
            `;
            container.appendChild(item);

            const cb = document.getElementById(`check-${cat}`);
            if (cb) {
                cb.addEventListener('change', function () {
                    if (this.checked) { map.addLayer(layers[cat]); }
                    else { map.removeLayer(layers[cat]); }
                });
            }
        });
    }

    // 5. Inisialisasi Aplikasi (Logika Auto-Identify Wilayah)
    function initApp() {
        if (typeof lokasiGeologi === 'undefined') return;
        const categories = [...new Set(lokasiGeologi.map(loc => loc.kategori.toLowerCase()))];
        categories.forEach(cat => { layers[cat] = L.layerGroup().addTo(map); });

        lokasiGeologi.forEach(loc => {
            const geoIcon = L.divIcon({
                html: `<div style="font-size: 28px;">${loc.emoji}</div>`,
                className: 'custom-div-icon',
                iconSize: [36, 36], iconAnchor: [18, 36]
            });
            const marker = L.marker(loc.koordinat, { icon: geoIcon });

            // --- LOGIKA PENENTU WILAYAH (Biar nggak usah ketik manual di data.js) ---
            let detectedRegion = "";
            const [lat, lng] = loc.koordinat;
            const desc = loc.deskripsi.toLowerCase();
            const nama = loc.nama.toLowerCase();

            // Cek lewat teks dulu (paling akurat)
            if (desc.includes('kalimantan') || nama.includes('kalimantan')) detectedRegion = "kalimantan";
            else if (desc.includes('sulawesi') || nama.includes('sulawesi')) detectedRegion = "sulawesi";
            else if (desc.includes('sumatera') || nama.includes('sumatera')) detectedRegion = "sumatera";
            else if (desc.includes('jawa') || nama.includes('jawa')) detectedRegion = "jawa";
            else if (desc.includes('papua') || nama.includes('papua')) detectedRegion = "papua";
            // Jika teks nggak ada, pakai koordinat (Fallback)
            else {
                if (lng >= 108 && lng < 120 && lat >= -5) detectedRegion = "kalimantan";
                else if (lng >= 119 && lng < 127) detectedRegion = "sulawesi";
                else if (lng >= 109 && lng < 116 && lat < -5) detectedRegion = "jawa";
            }

            marker.on('click', () => {
                map.flyTo(loc.koordinat, 12);
                updateSidebar(loc);
            });

            layers[loc.kategori.toLowerCase()].addLayer(marker);

            allMarkers.push({
                marker: marker,
                loc: loc,
                regionTag: detectedRegion
            });
        });
        generateFilters(categories);
    }

    // 6. Search System (Flexible Matching - Ariss Edition)
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase().trim();

            // 1. Reset jika kosong
            if (query === "") {
                allMarkers.forEach(m => {
                    m.marker.setOpacity(1);
                    if (m.marker.getElement()) m.marker.getElement().style.display = 'block';
                });
                map.setView([-2.5489, 118.0149], 5);
                return;
            }

            // 2. Deteksi Target Pulau
            const islands = ['kalimantan', 'jawa', 'sumatera', 'sulawesi', 'papua', 'bali'];
            let targetIsland = islands.find(isl => isl.includes(query) || query.includes(isl));

            // 3. Filter Marker
            allMarkers.forEach(m => {
                const nama = m.loc.nama.toLowerCase();
                const desc = m.loc.deskripsi.toLowerCase();
                const [lat, lng] = m.loc.koordinat; // Ambil koordinat marker

                const isTextMatch = nama.includes(query) || desc.includes(query);

                let isInsideIsland = false;

                if (targetIsland === 'kalimantan') {
                    // Batas Kalimantan: Bujur 108 sampai 119
                    isInsideIsland = (lng >= 108 && lng <= 119 && lat >= -4.5 && lat <= 7);
                }
                else if (targetIsland === 'jawa') {
                    // Batas Jawa: 
                    // Bujur: 105.1 (Ujung Kulon) sampai 114.6 (Banyuwangi)
                    // Lintang: Harus di bawah -5.8 (biar nggak narik Kalimantan/Sumatera)
                    isInsideIsland = (lng >= 105.1 && lng <= 114.6 && lat <= -5.8 && lat >= -8.8);
                }
                else if (targetIsland === 'bali') {
                    // Batas Bali (biar nggak nebeng ke Jawa atau Lombok)
                    isInsideIsland = (lng > 114.6 && lng <= 115.5 && lat <= -8);
                }

                // Eksekusi Tampil/Sembunyi
                if (isTextMatch || isInsideIsland) {
                    m.marker.setOpacity(1);
                    if (m.marker.getElement()) m.marker.getElement().style.display = 'block';
                } else {
                    m.marker.setOpacity(0);
                    if (m.marker.getElement()) m.marker.getElement().style.display = 'none';
                }
            });

            // 4. Zoom ke pulau
            if (targetIsland && knownPlaces[targetIsland]) {
                map.flyTo(knownPlaces[targetIsland], 6, { duration: 1.5 });
            }
        });
    }

    // Jalankan aplikasi
    initApp();
});