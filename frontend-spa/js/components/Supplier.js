const Supplier = {
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
                    <h2 class="inv-page-title">🚚 Data Supplier</h2>
                    <p class="inv-page-subtitle">Kelola daftar supplier perusahaan</p>
                </div>
                <button @click="showModal=true" class="btn" style="background:var(--emerald);color:white;">
                    + Tambah Supplier
                </button>
            </div>

            <!-- Tabel -->
            <div class="inv-card">
                <div class="inv-table-wrapper">
                    <table class="inv-table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Nama Supplier</th>
                                <th>Alamat</th>
                                <th>Telepon</th>
                                <th>Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-if="suppliers.length === 0">
                                <td colspan="5">
                                    <div class="inv-empty">
                                        <div class="empty-icon">🚚</div>
                                        <p>Belum ada data supplier.</p>
                                    </div>
                                </td>
                            </tr>
                            <tr v-for="item in suppliers" :key="item.id">
                                <td><span class="inv-badge green">#{{ item.id }}</span></td>
                                <td style="font-weight:500;">{{ item.nama_supplier }}</td>
                                <td style="color:var(--text-secondary);">{{ item.alamat }}</td>
                                <td style="color:var(--text-secondary);">{{ item.telepon }}</td>
                                <td>
                                    <button @click="editSupplier(item)" class="btn btn-warning btn-sm" style="margin-right:0.5rem;">Edit</button>
                                    <button @click="hapusSupplier(item.id)" class="btn btn-danger btn-sm">Hapus</button>
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
                    <h2>{{ editId ? '✏️ Edit Supplier' : '➕ Tambah Supplier' }}</h2>
                    <button @click="tutupModal" class="modal-close">✕</button>
                </div>

                <div class="inv-form-group">
                    <label>Nama Supplier</label>
                    <input v-model="form.nama_supplier" placeholder="Nama supplier" class="inv-input">
                </div>
                <div class="inv-form-group">
                    <label>Alamat</label>
                    <input v-model="form.alamat" placeholder="Alamat lengkap" class="inv-input">
                </div>
                <div class="inv-form-group">
                    <label>Telepon</label>
                    <input v-model="form.telepon" placeholder="Nomor telepon" class="inv-input">
                </div>

                <div class="inv-modal-footer">
                    <button @click="simpanSupplier" class="btn btn-success" style="flex:1;justify-content:center;">Simpan</button>
                    <button @click="tutupModal" class="btn btn-ghost">Batal</button>
                </div>
            </div>
        </div>

    </div>
    `,
    data() {
        return {
            suppliers: [],
            showModal: false,
            editId: null,
            form: { nama_supplier: '', alamat: '', telepon: '' }
        }
    },
    mounted() {
        this.getSupplier();
    },
    methods: {
        async getSupplier() {
            const response = await axios.get("http://localhost:8080/api/supplier");
            this.suppliers = response.data;
        },
        async simpanSupplier() {
            if (this.editId == null) {
                await axios.post("http://localhost:8080/api/supplier", this.form);
            } else {
                await axios.put("http://localhost:8080/api/supplier/" + this.editId, this.form);
                this.editId = null;
            }
            this.form = { nama_supplier: '', alamat: '', telepon: '' };
            this.showModal = false;
            this.getSupplier();
        },
        async hapusSupplier(id) {
            if (confirm("Yakin hapus data supplier ini?")) {
                await axios.delete("http://localhost:8080/api/supplier/" + id);
                this.getSupplier();
            }
        },
        editSupplier(item) {
            this.editId = item.id;
            this.form = { nama_supplier: item.nama_supplier, alamat: item.alamat, telepon: item.telepon };
            this.showModal = true;
        },
        tutupModal() {
            this.showModal = false;
            this.editId = null;
            this.form = { nama_supplier: '', alamat: '', telepon: '' };
        }
    }
};
console.log('Supplier component loaded!');
