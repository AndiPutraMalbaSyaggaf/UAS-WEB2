<?php

namespace App\Controllers;

use App\Models\KategoriModel;
use CodeIgniter\HTTP\ResponseInterface;
use CodeIgniter\RESTful\ResourceController;

class KategoriController extends ResourceController
{
    protected $modelName = KategoriModel::class;
    protected $format = 'json';

    public function index()
    {
       return $this->respond($this->model->findAll());
    }

    public function show($id = null)
    {
        return $this->respond($this->model->find($id));
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
            'message' => 'Data berhasil ditambahkan'
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
        'message' => 'Data berhasil diupdate'
    ]);
    }

    public function delete($id = null)
    {
        $this->model->delete($id);

        return $this->respondDeleted([
            'message' => 'Data berhasil dihapus'
        ]);
    }
}
