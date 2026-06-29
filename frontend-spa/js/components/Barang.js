const Barang = {
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
            <router-link to="/dashboard" class="inv-back">← Dashboard</router-link>
        </header>

        <div class="inv-main">

            <div class="inv-page-header">
                <div>
                    <h2 class="inv-page-title">📦 Data Barang</h2>
                    <p class="inv-page-subtitle">Kelola stok dan inventaris barang</p>
                </div>
                <button @click="showModal=true" class="btn" style="background:var(--amber);color:white;">
                    + Tambah Barang
                </button>
            </div>

            <!-- Tabel -->
            <div class="inv-card">
                <div class="inv-table-wrapper">
                    <table class="inv-table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Nama Barang</th>
                                <th>Stok</th>
                                <th>Harga</th>
                                <th>Kategori</th>
                                <th>Supplier</th>
                                <th>Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-if="barangs.length === 0">
                                <td colspan="7">
                                    <div class="inv-empty">
                                        <div class="empty-icon">📦</div>
                                        <p>Belum ada data barang.</p>
                                    </div>
                                </td>
                            </tr>
                            <tr v-for="item in barangs" :key="item.id">
                                <td><span class="inv-badge blue">#{{ item.id }}</span></td>
                                <td style="font-weight:500;">{{ item.nama_barang }}</td>
                                <td>
                                    <span class="inv-badge" :style="item.stok < 5 ? 'background:var(--danger-light);color:var(--danger)' : 'background:var(--emerald-light);color:var(--emerald)'">
                                        {{ item.stok }}
                                    </span>
                                </td>
                                <td style="color:var(--text-secondary);">Rp {{ Number(item.harga).toLocaleString('id-ID') }}</td>
                                <td style="color:var(--text-secondary);">{{ item.nama_kategori }}</td>
                                <td style="color:var(--text-secondary);">{{ item.nama_supplier }}</td>
                                <td>
                                    <button @click="editBarang(item)" class="btn btn-warning btn-sm" style="margin-right:0.5rem;">Edit</button>
                                    <button @click="hapusBarang(item.id)" class="btn btn-danger btn-sm">Hapus</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

        </div>

        <!-- Modal -->
        <div v-if="showModal" class="inv-modal-backdrop">
            <div class="inv-modal">
                <div class="inv-modal-header">
                    <h2>{{ editId ? '✏️ Edit Barang' : '➕ Tambah Barang' }}</h2>
                    <button @click="tutupModal" class="modal-close">✕</button>
                </div>

                <div class="inv-form-group">
                    <label>Nama Barang</label>
                    <input v-model="form.nama_barang" placeholder="Nama barang" class="inv-input">
                </div>
                <div style="display:grid;grid-template-columns:1fr 1fr;gap:0.75rem;">
                    <div class="inv-form-group">
                        <label>Stok</label>
                        <input v-model="form.stok" type="number" placeholder="0" class="inv-input">
                    </div>
                    <div class="inv-form-group">
                        <label>Harga (Rp)</label>
                        <input v-model="form.harga" type="number" placeholder="0" class="inv-input">
                    </div>
                </div>
                <div class="inv-form-group">
                    <label>Kategori</label>
                    <select v-model="form.kategori_id" class="inv-select">
                        <option value="">Pilih Kategori</option>
                        <option v-for="k in kategoris" :key="k.id" :value="k.id">{{ k.nama_kategori }}</option>
                    </select>
                </div>
                <div class="inv-form-group">
                    <label>Supplier</label>
                    <select v-model="form.supplier_id" class="inv-select">
                        <option value="">Pilih Supplier</option>
                        <option v-for="s in suppliers" :key="s.id" :value="s.id">{{ s.nama_supplier }}</option>
                    </select>
                </div>

                <div class="inv-modal-footer">
                    <button @click="simpanBarang" class="btn btn-success" style="flex:1;justify-content:center;">Simpan</button>
                    <button @click="tutupModal" class="btn btn-ghost">Batal</button>
                </div>
            </div>
        </div>

    </div>
    `,
    data() {
        return {
            barangs: [],
            kategoris: [],
            suppliers: [],
            showModal: false,
            editId: null,
            form: { nama_barang: '', stok: '', harga: '', kategori_id: '', supplier_id: '' }
        }
    },
    mounted() {
        this.getBarang();
        this.getKategori();
        this.getSupplier();
    },
    methods: {
        async getBarang() {
            const response = await axios.get("http://localhost:8080/api/barang");
            this.barangs = response.data;
        },
        async getKategori() {
            const response = await axios.get("http://localhost:8080/api/kategori");
            this.kategoris = response.data;
        },
        async getSupplier() {
            const response = await axios.get("http://localhost:8080/api/supplier");
            this.suppliers = response.data;
        },
        async simpanBarang() {
            if (this.editId == null) {
                await axios.post("http://localhost:8080/api/barang", this.form);
            } else {
                await axios.put("http://localhost:8080/api/barang/" + this.editId, this.form);
                this.editId = null;
            }
            this.showModal = false;
            this.getBarang();
        },
        editBarang(item) {
            this.editId = item.id;
            this.form = {
                nama_barang: item.nama_barang,
                stok: item.stok,
                harga: item.harga,
                kategori_id: item.kategori_id,
                supplier_id: item.supplier_id
            };
            this.showModal = true;
        },
        async hapusBarang(id) {
            if (confirm("Yakin hapus data barang ini?")) {
                await axios.delete("http://localhost:8080/api/barang/" + id);
                this.getBarang();
            }
        },
        tutupModal() {
            this.showModal = false;
            this.editId = null;
            this.form = { nama_barang: '', stok: '', harga: '', kategori_id: '', supplier_id: '' };
        }
    }
};
console.log('Barang component loaded!');
