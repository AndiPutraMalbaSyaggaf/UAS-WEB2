<?php

namespace App\Controllers;

use App\Models\UserModel;
use CodeIgniter\RESTful\ResourceController;

class AuthController extends ResourceController
{
    public function login()
    {
      $data = $this->request->getJSON(true);

        if (!$data) {
            return $this->failUnauthorized('Data tidak terbaca');
        }

        $username = $data['username'] ?? '';
        $password = $data['password'] ?? '';

        $userModel = new UserModel();
        $user = $userModel->where('username', $username)->first();

        if (!$user) {
            return $this->failUnauthorized('User tidak ditemukan');
        }

        if (!isset($user['password'])) {
            return $this->failServerError('Password kosong di database');
        }

        if (!password_verify($password, $user['password'])) {
            return $this->failUnauthorized('Password salah');
        }

        $token = bin2hex(random_bytes(32));

        $userModel->update($user['id'], [
            'token' => $token
        ]);

        return $this->respond([
            'status' => 200,
            'message' => 'Login berhasil',
            'token' => $token,
            'user' => $user['username']
    ]);
}
                            
    public function register()
    {
        $userModel = new UserModel();

        $data = [
            'username' => $this->request->getVar('username'),
            'password' => password_hash(
                $this->request->getVar('password'),
                PASSWORD_DEFAULT
            )
        ];

        $userModel->insert($data);

        return $this->respond([
            'status' => 200,
            'message' => 'User berhasil dibuat'
        ]);
    }
}