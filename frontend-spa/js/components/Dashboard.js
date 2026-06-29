const Dashboard = {
    template: `
    <div style="min-height:100vh;background:var(--bg);">

        <!-- Header -->
        <header class="inv-header">
            <div class="inv-header-brand">
                <div class="brand-icon">📦</div>
                <div>
                    <h1>E-Inventory</h1>
                    <span>Management System</span>
                </div>
            </div>
            <button @click="logout" class="btn btn-logout btn-sm">
                Keluar
            </button>
        </header>

        <div class="inv-main">

            <!-- Sapaan -->
            <div style="margin-bottom:1.75rem;">
                <h2 style="font-size:1.5rem;font-weight:700;color:var(--text-primary);">Halo, Andi Putra Malba Syaggaf </h2>
                <p style="color:var(--text-muted);font-size:0.88rem;margin-top:2px;">Selamat datang kembali di sistem inventaris.</p>
            </div>

            <!-- Statistik -->
            <div class="inv-stats">

                <div class="inv-stat-card">
                    <div class="inv-stat-icon blue">📂</div>
                    <div class="inv-stat-info">
                        <h3>Total Kategori</h3>
                        <div class="stat-value" style="color:var(--primary);">{{ totalKategori }}</div>
                    </div>
                </div>

                <div class="inv-stat-card">
                    <div class="inv-stat-icon green">🚚</div>
                    <div class="inv-stat-info">
                        <h3>Total Supplier</h3>
                        <div class="stat-value" style="color:var(--emerald);">{{ totalSupplier }}</div>
                    </div>
                </div>

                <div class="inv-stat-card">
                    <div class="inv-stat-icon amber">📦</div>
                    <div class="inv-stat-info">
                        <h3>Total Barang</h3>
                        <div class="stat-value" style="color:var(--amber);">{{ totalBarang }}</div>
                    </div>
                </div>

            </div>

            <!-- Menu -->
            <div class="inv-menu-grid">

                <!-- Kategori -->
                <div class="inv-menu-card">
                    <div class="menu-icon" style="background:var(--primary-light);">📂</div>
                    <h3 style="color:var(--primary);">Kategori</h3>
                    <p>Mengelola seluruh kategori barang yang tersedia dalam sistem.</p>
                    <router-link
                        to="/kategori"
                        class="menu-link btn"
                        style="background:var(--primary);color:white;"
                    >
                        Kelola Kategori →
                    </router-link>
                </div>

                <!-- Supplier -->
                <div class="inv-menu-card">
                    <div class="menu-icon" style="background:var(--emerald-light);">🚚</div>
                    <h3 style="color:var(--emerald);">Supplier</h3>
                    <p>Mengelola supplier yang bekerja sama dengan perusahaan.</p>
                    <router-link
                        to="/supplier"
                        class="menu-link btn"
                        style="background:var(--emerald);color:white;"
                    >
                        Kelola Supplier →
                    </router-link>
                </div>

                <!-- Barang -->
                <div class="inv-menu-card">
                    <div class="menu-icon" style="background:var(--amber-light);">📦</div>
                    <h3 style="color:var(--amber);">Barang</h3>
                    <p>Mengelola stok dan inventaris barang perusahaan secara lengkap.</p>
                    <router-link
                        to="/barang"
                        class="menu-link btn"
                        style="background:var(--amber);color:white;"
                    >
                        Kelola Barang →
                    </router-link>
                </div>

            </div>

        </div>
    </div>
    `,
    data() {
        return {
            totalKategori: '...',
            totalSupplier: '...',
            totalBarang: '...'
        }
    },
    mounted() {
        this.loadStats();
    },
    methods: {
        async loadStats() {
            try {
                const [resKategori, resSupplier, resBarang] = await Promise.all([
                    axios.get("http://localhost:8080/api/kategori"),
                    axios.get("http://localhost:8080/api/supplier"),
                    axios.get("http://localhost:8080/api/barang")
                ]);
                this.totalKategori = Array.isArray(resKategori.data) ? resKategori.data.length : (resKategori.data.data?.length ?? 0);
                this.totalSupplier = Array.isArray(resSupplier.data) ? resSupplier.data.length : (resSupplier.data.data?.length ?? 0);
                this.totalBarang   = Array.isArray(resBarang.data)   ? resBarang.data.length   : (resBarang.data.data?.length   ?? 0);
            } catch (err) {
                console.error("Gagal memuat statistik:", err);
                this.totalKategori = '?';
                this.totalSupplier = '?';
                this.totalBarang   = '?';
            }
        },
        logout() {
            localStorage.removeItem("token");
            localStorage.removeItem("isLogin");
            this.$router.push("/login");
        }
    }
};

console.log("Dashboard Loaded");
