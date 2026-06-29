<?php

namespace App\Controllers;

use App\Models\BarangModel;
use CodeIgniter\RESTful\ResourceController;

class BarangController extends ResourceController
{
    protected $modelName = BarangModel::class;
    protected $format    = 'json';

    public function index()
    {
        $db = \Config\Database::connect();

        $data = $db->table('barang')
            ->select('
                barang.*,
                kategori.nama_kategori,
                supplier.nama_supplier
            ')
            ->join('kategori', 'kategori.id = barang.kategori_id')
            ->join('supplier', 'supplier.id = barang.supplier_id')
            ->get()
            ->getResultArray();

        return $this->respond($data);
    }

    public function show($id = null)
    {
        $data = $this->model->find($id);

        if (!$data) {
            return $this->failNotFound('Data barang tidak ditemukan');
        }

        return $this->respond($data);
    }

    public function create()
    {
        $data = $this->request->getJSON(true);

        if (empty($data)) {
            $data = $this->request->getPost();
        }

        $result = $this->model->insert($data);

        if (!$result) {
            return $this->fail($this->model->errors());
        }

        return $this->respondCreated([
            'message' => 'Barang berhasil ditambahkan'
        ]);
    }

    public function update($id = null)
    {
        $data = $this->request->getJSON(true);

        if (empty($data)) {
            $data = $this->request->getRawInput();
        }

        $result = $this->model->update($id, $data);

        if (!$result) {
            return $this->fail($this->model->errors());
        }

        return $this->respond([
            'message' => 'Barang berhasil diupdate'
        ]);
    }

    public function delete($id = null)
    {
        $barang = $this->model->find($id);

        if (!$barang) {
            return $this->failNotFound('Data barang tidak ditemukan');
        }

        $this->model->delete($id);

        return $this->respondDeleted([
            'message' => 'Barang berhasil dihapus'
        ]);
    }
}
