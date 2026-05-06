// GeoMap V1.1 - Ariss Edition (Final Fix)
document.addEventListener('DOMContentLoaded', function() {
    // 1. Inisialisasi Peta
    const map = L.map('map').setView([-2.5489, 118.0149], 5);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap | GeoMap Indonesia'
    }).addTo(map);

    // Variabel Global
    let layers = {};
    let allMarkers = [];
    const knownPlaces = {
        'bandung': [-6.9175, 107.6191], 'jakarta': [-6.2088, 106.8456],
        'yogyakarta': [-7.7956, 110.3695], 'jogja': [-7.7956, 110.3695],
        'surabaya': [-7.2575, 112.7521], 'medan': [3.5952, 98.6728],
        'palu': [-0.907, 119.85], 'jawa': [-7.0, 110.0]
    };

    // 2. Fungsi Jarak (Haversine)
    function haversineDistance(coords1, coords2) {
        const R = 6371; 
        const dLat = (coords2[0] - coords1[0]) * Math.PI / 180;
        const dLon = (coords2[1] - coords1[1]) * Math.PI / 180;
        const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
                  Math.cos(coords1[0] * Math.PI / 180) * Math.cos(coords2[0] * Math.PI / 180) *
                  Math.sin(dLon/2) * Math.sin(dLon/2);
        return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    }

    // 3. Update Sidebar UI
    function updateSidebar(loc) {
        const panel = document.getElementById('info-panel');
        if (!panel) return;

        panel.innerHTML = `
            <div style="animation: fadeIn 0.5s ease;">
                <h3 style="color:#f1c40f">${loc.emoji} ${loc.nama}</h3>
                <hr style="border: 0.5px solid #555">
                <p><strong>💎 Batuan:</strong> ${loc.info.batuan}</p>
                <p><strong>⏳ Umur:</strong> ${loc.info.umur}</p>
                <p><strong>🌍 Lempeng:</strong> ${loc.info.lempeng}</p>
                <div style="background:rgba(255,255,255,0.1); padding:15px; border-radius:8px; margin:15px 0; font-size:0.9rem; line-height:1.5">
                    ${loc.deskripsi}
                </div>
                <button onclick="window.open('https://www.google.com/search?q=Geologi+${loc.nama}', '_blank')" 
                        style="width:100%; padding:10px; cursor:pointer; background:#f1c40f; border:none; border-radius:5px; font-weight:bold">
                        Pelajari Lebih Lanjut
                </button>
            </div>
        `;
    }

    // 4. Generate Filter Switch
    function generateFilters(categories) {
        const container = document.getElementById('dynamic-filters');
        if (!container) return;

        container.innerHTML = ''; 
        categories.forEach(cat => {
            const item = document.createElement('div');
            item.className = 'filter-item';
            item.style.display = 'flex';
            item.style.alignItems = 'center';
            item.style.marginBottom = '10px';
            
            item.innerHTML = `
                <label class="switch">
                    <input type="checkbox" id="check-${cat}" data-cat="${cat}" checked>
                    <span class="slider"></span>
                </label>
                <span style="margin-left:10px; color:white; text-transform: capitalize;">${cat}</span>
            `;
            container.appendChild(item);

            const cb = document.getElementById(`check-${cat}`);
            if (cb) {
                cb.addEventListener('change', function() {
                    if (this.checked) { map.addLayer(layers[cat]); }
                    else { map.removeLayer(layers[cat]); }
                });
            }
        });
    }

    // 5. Inisialisasi Aplikasi
    function initApp() {
        if (typeof lokasiGeologi === 'undefined') {
            console.error("Data lokasiGeologi tidak ditemukan!");
            return;
        }

        const categories = [...new Set(lokasiGeologi.map(loc => loc.kategori.toLowerCase()))];
        
        categories.forEach(cat => {
            layers[cat] = L.layerGroup().addTo(map);
        });

        lokasiGeologi.forEach(loc => {
            const geoIcon = L.divIcon({
                html: `<div style="font-size: 28px;">${loc.emoji}</div>`,
                className: 'custom-div-icon',
                iconSize: [36, 36],
                iconAnchor: [18, 36]
            });

            const marker = L.marker(loc.koordinat, { icon: geoIcon });
            marker.on('click', () => {
                map.flyTo(loc.koordinat, 12, { duration: 1.5 });
                updateSidebar(loc);
            });

            const catLower = loc.kategori.toLowerCase();
            layers[catLower].addLayer(marker);
            allMarkers.push({ marker, loc, category: catLower });
        });

        generateFilters(categories);
    }

    // 6. Search System
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        const SEARCH_RADIUS_KM = 450; 

        searchInput.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase().trim();
            let geoCenter = null;

            for (const [place, coords] of Object.entries(knownPlaces)) {
                if (place.includes(query) || query.includes(place)) { 
                    geoCenter = coords; 
                    break; 
                }
            }

            allMarkers.forEach(({ marker, loc }) => {
                const isTextMatch = loc.nama.toLowerCase().includes(query) || 
                                    loc.deskripsi.toLowerCase().includes(query);
                
                let isGeoMatch = false;
                if (geoCenter) {
                    const dist = haversineDistance(loc.koordinat, geoCenter);
                    isGeoMatch = dist < SEARCH_RADIUS_KM;
                }

                if (query === "" || isTextMatch || isGeoMatch) {
                    marker.setOpacity(1);
                    if (marker.getElement()) marker.getElement().style.display = 'block';
                } else {
                    marker.setOpacity(0);
                    if (marker.getElement()) marker.getElement().style.display = 'none';
                }
            });

            if (geoCenter && query.length > 2) {
                const zoomLevel = query.length < 5 ? 6 : 8; 
                map.flyTo(geoCenter, zoomLevel, { duration: 1 });
            } else if (query === "") {
                map.setView([-2.5489, 118.0149], 5);
            }
        });
    }

    // Jalankan Aplikasi
    initApp();
});