// data.js - Previous version restored (17 sites, 4 categories: Vulkanik/Tektonik/Sedimen/Metamorf)
// Dynamic filters will show 4, diverse enough w/ emojis.

const lokasiGeologi = [
    // VULKANIK (6)
    {
        nama: "Gunung Ciremai",
        koordinat: [-6.892, 108.406],
        kategori: "Vulkanik",
        emoji: "🌋",
        info: {
            batuan: "Andesit, Dasit, Piroklastik",
            umur: "Holosen (<11.700 thn)",
            skalaWaktu: "Kenozoikum - Kuarter",
            bencana: "Lahar, Piroklastik, Gas",
            lempeng: "Subduksi Indo-Australia (Busur Sunda)"
        },
        deskripsi: "Stratovulkan ganda teraktif di Jawa Barat. Magma andesitik dari subduksi lempeng."
    },
    {
        nama: "Gunung Merapi",
        koordinat: [-7.537, 110.446],
        kategori: "Vulkanik",
        emoji: "🌋",
        info: {
            batuan: "Andesit, Basalt, Lava",
            umur: "Holosen",
            skalaWaktu: "Kenozoikum",
            bencana: "Lahar panas, Awan panas",
            lempeng: "Subduksi Indo-Australia"
        },
        deskripsi: "Gunung api paling aktif di Indonesia. Dome lava sering runtuh memicu lahar."
    },
    {
        nama: "Gunung Krakatau",
        koordinat: [-6.102, 105.423],
        kategori: "Vulkanik",
        emoji: "💥",
        info: {
            batuan: "Andesit, Obsidian",
            umur: "Holosen",
            skalaWaktu: "Kenozoikum",
            bencana: "Letusan dahsyat 1883",
            lempeng: "Subduksi Sunda Strait"
        },
        deskripsi: "Legendaris letusan 1883. Saat ini Anak Krakatau tumbuh aktif."
    },
    {
        nama: "Gunung Bromo",
        koordinat: [-7.942, 112.953],
        kategori: "Vulkanik",
        emoji: "🌋",
        info: {
            batuan: "Basalt, Trachyt",
            umur: "Kuarter",
            skalaWaktu: "Kenozoikum",
            bencana: "Emisi gas, letusan kecil",
            lempeng: "Busur Vulkanik Jawa Timur"
        },
        deskripsi: "Tengah Tengger Caldera. Ikon wisata geologi Indonesia."
    },
    {
        nama: "Gunung Rinjani",
        koordinat: [-8.415, 116.457],
        kategori: "Vulkanik",
        emoji: "⛰️",
        info: {
            batuan: "Andesit, Basalt",
            umur: "Kuarter",
            skalaWaktu: "Kenozoikum",
            bencana: "Lahar, longsor",
            lempeng: "Subduksi Flores Back-arc"
        },
        deskripsi: "Gunung tertinggi Lombok. Danau Segara Anak di caldera."
    },
    {
        nama: "Gunung Agung",
        koordinat: [-8.342, 115.508],
        kategori: "Vulkanik",
        emoji: "🌋",
        info: {
            batuan: "Andesit",
            umur: "Holosen",
            skalaWaktu: "Kenozoikum",
            bencana: "Letusan 1963, Abu vulkanik",
            lempeng: "Subduksi Bali"
        },
        deskripsi: "Gunung suci Bali. Letusan 1963 global impact."
    },

    // TEKTONIK (5)
    {
        nama: "Sesar Lembang",
        koordinat: [-6.825, 107.615],
        kategori: "Tektonik",
        emoji: "📉",
        info: {
            batuan: "Breksi, Endapan Danau",
            umur: "Pleistosen",
            skalaWaktu: "Kenozoikum",
            bencana: "Gempa Terestrial M6+",
            lempeng: "Sesar Intra-Lempeng Sunda"
        },
        deskripsi: "Patahan 29km utara Bandung. Potensi gempa tinggi."
    },
    {
        nama: "Sesar Palu-Koro",
        koordinat: [-0.907, 119.850],
        kategori: "Tektonik",
        emoji: "💥",
        info: {
            batuan: "Batuan Metamorf",
            umur: "Kuarter",
            skalaWaktu: "Kenozoikum",
            bencana: "Gempa + Tsunami 2018",
            lempeng: "Transform Fault Sulawesi"
        },
        deskripsi: "Sesar strike-slip kanan. Gempa M7.5 + likuifaksi 2018."
    },
    {
        nama: "Sesar Sumatera",
        koordinat: [0.000, 99.500],
        kategori: "Tektonik",
        emoji: "📉",
        info: {
            batuan: "Granite, Metamorf",
            umur: "Miosen - Kuarter",
            skalaWaktu: "Kenozoikum",
            bencana: "Gempa M>8",
            lempeng: "Great Sumatran Fault"
        },
        deskripsi: "Sesar strike-slip 1900km. Padang gempa 2009."
    },
    {
        nama: "Pegunungan Jayawijaya",
        koordinat: [-4.000, 137.000],
        kategori: "Tektonik",
        emoji: "⛰️",
        info: {
            batuan: "Metamorf, Ultramafik",
            umur: "Mesozoikum",
            skalaWaktu: "Era Fanerozoikum",
            bencana: "Longsor pegunungan",
            lempeng: "Tumbukan Pasifik - Australia"
        },
        deskripsi: "Pegunungan tengah Papua. Tertua di Indonesia."
    },
    {
        nama: "Zona Subduksi Selatan Jawa",
        koordinat: [-9.000, 110.000],
        kategori: "Tektonik",
        emoji: "🌊",
        info: {
            batuan: "Ophiolit, Blueschist",
            umur: "Tersier - Kuarter",
            skalaWaktu: "Kenozoikum",
            bencana: "Gempa Megathrust M9",
            lempeng: "Subduksi Indo-Australia"
        },
        deskripsi: "Trench terdalam. Sumber gempa besar + tsunami."
    },

    // SEDIMEN (4)
    {
        nama: "Cekungan Jatibarang",
        koordinat: [-6.474, 108.312],
        kategori: "Sedimen",
        emoji: "🏔️",
        info: {
            batuan: "Batupasir, Batulempung, Tuff",
            umur: "Miosen",
            skalaWaktu: "Kenozoikum",
            bencana: "Tanah longsor",
            lempeng: "Fore-arc Basin"
        },
        deskripsi: "Reservoir migas utama. Endapan turbidit."
    },
    {
        nama: "Dataran Aluvial Jawa Tengah",
        koordinat: [-7.000, 110.000],
        kategori: "Sedimen",
        emoji: "🌾",
        info: {
            batuan: "Aluvial, Lempung",
            umur: "Holosen",
            skalaWaktu: "Kuarter",
            bencana: "Banjir, subsidence",
            lempeng: "Endapan sungai"
        },
        deskripsi: "Sawah subur dari sedimentasi Bengawan Solo."
    },
    {
        nama: "Cekungan Kutai",
        koordinat: [0.000, 117.000],
        kategori: "Sedimen",
        emoji: "🛢️",
        info: {
            batuan: "Batupasir, Shale",
            umur: "Eosen - Pliosen",
            skalaWaktu: "Kenozoikum",
            bencana: "Penurunan tanah",
            lempeng: "Rift Basin Kalimantan"
        },
        deskripsi: "Cekungan migas terbesar Indonesia."
    },
    {
        nama: "Formasi Tonasa",
        koordinat: [-4.000, 119.500],
        kategori: "Sedimen",
        emoji: "🏝️",
        info: {
            batuan: "Batugamping, Reefal",
            umur: "Miosen",
            skalaWaktu: "Kenozoikum",
            bencana: "Karst collapse",
            lempeng: "Carbonate Platform"
        },
        deskripsi: "Batu gamping kaya fosil Sulawesi Selatan."
    },

    // METAMORF (2)
    {
        nama: "Kompleks Metamorf Toraja",
        koordinat: [-2.9, 119.9],
        kategori: "Metamorf",
        emoji: "🔮",
        info: {
            batuan: "Mika Skis, Gneis, Amphibolit",
            umur: "Eosen - Miosen",
            skalaWaktu: "Kenozoikum",
            bencana: "Longsor batuan rapuh",
            lempeng: "Orogeni Sulawesi"
        },
        deskripsi: "Zona metamorf high-grade Sulawesi Selatan dari tumbukan lempeng."
    },
    {
        nama: "Batuan Metamorf Papua Tengah",
        koordinat: [-3.5, 135.5],
        kategori: "Metamorf",
        emoji: "🪨",
        info: {
            batuan: "Skis, Fillit, Marmer",
            umur: "Mesozoikum - Tersier",
            skalaWaktu: "Fanerozoikum",
            bencana: "Gempa tektonik",
            lempeng: "Tumbukan kontinen"
        },
        deskripsi: "Metamorf dari kolisi lempeng di Pegunungan Lengguru."
    }
];

