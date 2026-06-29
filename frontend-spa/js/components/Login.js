const Login = {
    template: `
    <div class="inv-login-page">

        <!-- Top bar -->
        <div class="inv-login-topbar">
            <div class="brand-icon" style="width:34px;height:34px;background:var(--primary);border-radius:8px;display:flex;align-items:center;justify-content:center;color:white;font-size:1rem;">📦</div>
            <span style="font-weight:700;font-size:1rem;color:var(--text-primary);">E-Inventory</span>
        </div>

        <!-- Center card -->
        <div class="inv-login-center">
            <div class="inv-login-card">

                <div class="login-icon">🔐</div>

                <h2>Selamat Datang</h2>
                <p class="login-desc">Masuk ke sistem manajemen inventaris.</p>

                <div class="inv-form-group">
                    <label>Username</label>
                    <input
                        v-model="username"
                        type="text"
                        placeholder="Masukkan username"
                        class="inv-input"
                    >
                </div>

                <div class="inv-form-group">
                    <label>Password</label>
                    <input
                        v-model="password"
                        type="password"
                        placeholder="Masukkan password"
                        class="inv-input"
                    >
                </div>

                <button
                    @click="login"
                    class="btn btn-primary"
                    style="width:100%;justify-content:center;padding:0.7rem;margin-top:0.5rem;font-size:0.95rem;"
                >
                    Masuk →
                </button>

            </div>
        </div>

    </div>
    `,
    data() {
        return {
            username: "",
            password: ""
        }
    },
    methods: {
        async login() {
            try {
                const res = await axios.post("http://localhost:8080/api/login", {
                    username: this.username,
                    password: this.password
                }, {
                    headers: { "Content-Type": "application/json" }
                });

                const token = res.data.token || (res.data.data ? res.data.data.token : null);

                if (token) {
                    localStorage.setItem("token", token);
                    localStorage.setItem("isLogin", true);
                    this.$router.push("/dashboard");
                } else {
                    alert("Sesi login habis / Token tidak ditemukan dalam respons");
                }

            } catch (err) {
                alert("Login gagal: " + (err.response?.data?.messages || "Terjadi kesalahan jaringan"));
            }
        }
    }
};
