// data.js - GeoMap Indonesia V2.0
// Geological Timeline Compatible Edition

const lokasiGeologi = [

    // ======================================================
    // VULKANIK
    // ======================================================

    {
        nama: "Gunung Ciremai",
        koordinat: [-6.892, 108.406],
        kategori: "Vulkanik",
        era: "Kuarter",
        wilayah: "jawa",
        emoji: "🌋",

        info: {
            batuan: "Andesit, Dasit, Piroklastik",
            umur: "Holosen (<11.700 tahun)",
            skalaWaktu: "Kuarter",
            bencana: "Lahar, Piroklastik, Gas",
            lempeng: "Subduksi Indo-Australia"
        },

        deskripsi:
            "Stratovulkan aktif tertinggi di Jawa Barat dengan magma andesitik hasil subduksi lempeng Indo-Australia."
    },

    {
        nama: "Gunung Merapi",
        koordinat: [-7.537, 110.446],
        kategori: "Vulkanik",
        era: "Kuarter",
        wilayah: "jawa",
        emoji: "🌋",

        info: {
            batuan: "Andesit, Basalt",
            umur: "Holosen",
            skalaWaktu: "Kuarter",
            bencana: "Awan panas, Lahar",
            lempeng: "Subduksi Indo-Australia"
        },

        deskripsi:
            "Salah satu gunung api paling aktif di dunia dengan aktivitas dome lava yang sangat intens."
    },

    {
        nama: "Gunung Krakatau",
        koordinat: [-6.102, 105.423],
        kategori: "Vulkanik",
        era: "Kuarter",
        wilayah: "selat sunda",
        emoji: "🌋",

        info: {
            batuan: "Andesit, Obsidian",
            umur: "Holosen",
            skalaWaktu: "Kuarter",
            bencana: "Letusan eksplosif",
            lempeng: "Subduksi Sunda"
        },

        deskripsi:
            "Kompleks vulkanik legendaris akibat letusan besar tahun 1883 yang memicu tsunami global."
    },

    {
        nama: "Gunung Bromo",
        koordinat: [-7.942, 112.953],
        kategori: "Vulkanik",
        era: "Kuarter",
        wilayah: "jawa",
        emoji: "🌋",

        info: {
            batuan: "Basalt, Andesit",
            umur: "Kuarter",
            skalaWaktu: "Kuarter",
            bencana: "Abu vulkanik",
            lempeng: "Busur Vulkanik Jawa"
        },

        deskripsi:
            "Gunung api aktif di Kaldera Tengger dan menjadi ikon geowisata Indonesia."
    },

    {
        nama: "Gunung Rinjani",
        koordinat: [-8.415, 116.457],
        kategori: "Vulkanik",
        era: "Kuarter",
        wilayah: "nusa tenggara",
        emoji: "🌋",

        info: {
            batuan: "Andesit, Basalt",
            umur: "Kuarter",
            skalaWaktu: "Kuarter",
            bencana: "Lahar, Longsor",
            lempeng: "Subduksi Flores"
        },

        deskripsi:
            "Gunung api besar di Lombok dengan kaldera Segara Anak yang terkenal."
    },

    {
        nama: "Gunung Agung",
        koordinat: [-8.342, 115.508],
        kategori: "Vulkanik",
        era: "Kuarter",
        wilayah: "bali",
        emoji: "🌋",

        info: {
            batuan: "Andesit",
            umur: "Holosen",
            skalaWaktu: "Kuarter",
            bencana: "Abu vulkanik",
            lempeng: "Subduksi Bali"
        },

        deskripsi:
            "Gunung suci Bali dengan aktivitas vulkanik yang masih sangat aktif."
    },

    // ======================================================
    // TEKTONIK
    // ======================================================

    {
        nama: "Sesar Lembang",
        koordinat: [-6.825, 107.615],
        kategori: "Tektonik",
        era: "Kuarter",
        wilayah: "jawa",
        emoji: "📉",

        info: {
            batuan: "Breksi, Sedimen Danau",
            umur: "Pleistosen",
            skalaWaktu: "Kuarter",
            bencana: "Gempa darat",
            lempeng: "Sunda Block"
        },

        deskripsi:
            "Patahan aktif sepanjang utara Bandung dengan potensi gempa merusak."
    },

    {
        nama: "Sesar Palu-Koro",
        koordinat: [-0.907, 119.850],
        kategori: "Tektonik",
        era: "Kuarter",
        wilayah: "sulawesi",
        emoji: "📉",

        info: {
            batuan: "Metamorf",
            umur: "Kuarter",
            skalaWaktu: "Kuarter",
            bencana: "Gempa dan tsunami",
            lempeng: "Transform Fault"
        },

        deskripsi:
            "Sesar geser aktif penyebab gempa dan tsunami Palu 2018."
    },

    {
        nama: "Sesar Sumatera",
        koordinat: [-0.000, 99.500],
        kategori: "Tektonik",
        era: "Neogen",
        wilayah: "sumatera",
        emoji: "📉",

        info: {
            batuan: "Granit, Metamorf",
            umur: "Miosen - Sekarang",
            skalaWaktu: "Neogen",
            bencana: "Gempa besar",
            lempeng: "Great Sumatran Fault"
        },

        deskripsi:
            "Sistem sesar besar sepanjang Pulau Sumatera akibat subduksi miring."
    },

    {
        nama: "Pegunungan Jayawijaya",
        koordinat: [-4.000, 137.000],
        kategori: "Tektonik",
        era: "Neogen",
        wilayah: "papua",
        emoji: "📉",

        info: {
            batuan: "Metamorf, Ultramafik",
            umur: "Mesozoikum - Neogen",
            skalaWaktu: "Neogen",
            bencana: "Longsor",
            lempeng: "Kolisi Australia-Pasifik"
        },

        deskripsi:
            "Pegunungan hasil tumbukan lempeng yang masih terus mengalami pengangkatan."
    },

    {
        nama: "Zona Subduksi Selatan Jawa",
        koordinat: [-9.000, 110.000],
        kategori: "Tektonik",
        era: "Mesozoikum",
        wilayah: "jawa",
        emoji: "📉",

        info: {
            batuan: "Ophiolit, Blueschist",
            umur: "Mesozoikum",
            skalaWaktu: "Mesozoikum",
            bencana: "Megathrust",
            lempeng: "Indo-Australia"
        },

        deskripsi:
            "Zona subduksi aktif pembentuk busur vulkanik Jawa."
    },

    {
        nama: "Sesar Cimandiri",
        koordinat: [-6.9889, 106.5510],
        kategori: "Tektonik",
        era: "Neogen",
        wilayah: "jawa",
        emoji: "📉",

        info: {
            batuan: "Breksi Vulkanik",
            umur: "Miosen - Sekarang",
            skalaWaktu: "Neogen",
            bencana: "Gempa bumi",
            lempeng: "Sesar Aktif Jawa Barat"
        },

        deskripsi:
            "Sesar aktif memanjang dari Pelabuhan Ratu hingga Cianjur."
    },

    // ======================================================
    // SEDIMEN
    // ======================================================

    {
        nama: "Cekungan Jatibarang",
        koordinat: [-6.474, 108.312],
        kategori: "Sedimen",
        era: "Neogen",
        wilayah: "jawa",
        emoji: "🛢️",

        info: {
            batuan: "Batupasir, Batulempung",
            umur: "Miosen",
            skalaWaktu: "Neogen",
            bencana: "Longsor",
            lempeng: "Fore Arc Basin"
        },

        deskripsi:
            "Cekungan sedimen penting penghasil hidrokarbon di Jawa Barat."
    },

    {
        nama: "Cekungan Kutai",
        koordinat: [0.000, 117.000],
        kategori: "Sedimen",
        era: "Paleogen",
        wilayah: "kalimantan",
        emoji: "🛢️",

        info: {
            batuan: "Batupasir, Shale",
            umur: "Eosen - Pliosen",
            skalaWaktu: "Paleogen",
            bencana: "Penurunan tanah",
            lempeng: "Kalimantan Basin"
        },

        deskripsi:
            "Cekungan sedimen terbesar di Indonesia dengan cadangan migas besar."
    },

    {
        nama: "Formasi Tonasa",
        koordinat: [-4.000, 119.500],
        kategori: "Sedimen",
        era: "Paleogen",
        wilayah: "sulawesi",
        emoji: "🛢️",

        info: {
            batuan: "Batugamping",
            umur: "Eosen",
            skalaWaktu: "Paleogen",
            bencana: "Karst collapse",
            lempeng: "Carbonate Platform"
        },

        deskripsi:
            "Formasi karbonat kaya fosil laut di Sulawesi Selatan."
    },

    // ======================================================
    // METAMORF
    // ======================================================

    {
        nama: "Kompleks Metamorf Toraja",
        koordinat: [-2.9, 119.9],
        kategori: "Metamorf",
        era: "Paleogen",
        wilayah: "sulawesi",
        emoji: "💎",

        info: {
            batuan: "Skis, Gneis",
            umur: "Eosen - Miosen",
            skalaWaktu: "Paleogen",
            bencana: "Longsor",
            lempeng: "Orogeni Sulawesi"
        },

        deskripsi:
            "Zona metamorf tingkat tinggi akibat tumbukan mikro-kontinen Sulawesi."
    },

    {
        nama: "Batuan Metamorf Papua Tengah",
        koordinat: [-3.5, 135.5],
        kategori: "Metamorf",
        era: "Mesozoikum",
        wilayah: "papua",
        emoji: "💎",

        info: {
            batuan: "Skis, Fillit, Marmer",
            umur: "Mesozoikum",
            skalaWaktu: "Mesozoikum",
            bencana: "Gempa tektonik",
            lempeng: "Kolisi Kontinen"
        },

        deskripsi:
            "Batuan metamorf hasil tekanan dan temperatur tinggi akibat kolisi lempeng."
    }

];