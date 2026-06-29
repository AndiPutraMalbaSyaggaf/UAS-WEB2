const Kategori = {
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
                    <h2 class="inv-page-title">📂 Data Kategori</h2>
                    <p class="inv-page-subtitle">Kelola semua kategori barang</p>
                </div>
                <button @click="showModal=true" class="btn btn-primary">
                    + Tambah Kategori
                </button>
            </div>

            <!-- Tabel -->
            <div class="inv-card">
                <div class="inv-table-wrapper">
                    <table class="inv-table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Nama Kategori</th>
                                <th>Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-if="kategoris.length === 0">
                                <td colspan="3">
                                    <div class="inv-empty">
                                        <div class="empty-icon">📂</div>
                                        <p>Belum ada data kategori.</p>
                                    </div>
                                </td>
                            </tr>
                            <tr v-for="item in kategoris" :key="item.id">
                                <td>
                                    <span class="inv-badge blue">#{{ item.id }}</span>
                                </td>
                                <td style="font-weight:500;">{{ item.nama_kategori }}</td>
                                <td>
                                    <button @click="editKategori(item)" class="btn btn-warning btn-sm" style="margin-right:0.5rem;">Edit</button>
                                    <button @click="hapusKategori(item.id)" class="btn btn-danger btn-sm">Hapus</button>
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
                    <h2>{{ editId ? '✏️ Edit Kategori' : '➕ Tambah Kategori' }}</h2>
                    <button @click="tutupModal" class="modal-close">✕</button>
                </div>

                <div class="inv-form-group">
                    <label>Nama Kategori</label>
                    <input
                        v-model="form.nama_kategori"
                        type="text"
                        placeholder="Masukkan nama kategori"
                        class="inv-input"
                    >
                </div>

                <div class="inv-modal-footer">
                    <button @click="simpanKategori" class="btn btn-success" style="flex:1;justify-content:center;">Simpan</button>
                    <button @click="tutupModal" class="btn btn-ghost">Batal</button>
                </div>
            </div>
        </div>

    </div>
    `,
    data() {
        return {
            kategoris: [],
            showModal: false,
            editId: null,
            form: { nama_kategori: '' }
        }
    },
    mounted() {
        this.getKategori();
    },
    methods: {
        async getKategori() {
            const response = await axios.get("http://localhost:8080/api/kategori");
            this.kategoris = response.data;
        },
        async simpanKategori() {
            if (this.editId == null) {
                await axios.post("http://localhost:8080/api/kategori", this.form);
            } else {
                await axios.put("http://localhost:8080/api/kategori/" + this.editId, this.form);
                this.editId = null;
            }
            this.form.nama_kategori = '';
            this.showModal = false;
            this.getKategori();
        },
        async hapusKategori(id) {
            if (confirm("Yakin hapus kategori ini?")) {
                await axios.delete("http://localhost:8080/api/kategori/" + id);
                this.getKategori();
            }
        },
        editKategori(item) {
            this.editId = item.id;
            this.form.nama_kategori = item.nama_kategori;
            this.showModal = true;
        },
        tutupModal() {
            this.showModal = false;
            this.editId = null;
            this.form.nama_kategori = '';
        }
    }
};
console.log('Kategori component loaded!');
