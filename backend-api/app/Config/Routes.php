<?php

use CodeIgniter\Router\RouteCollection;

/** @var RouteCollection $routes */

/*
|--------------------------------------------------------------------------
| CORS OPTIONS
|--------------------------------------------------------------------------
*/
$routes->options('(:any)', static function () {
    return service('response')->setStatusCode(200);
});

/*
|--------------------------------------------------------------------------
| HOME
|--------------------------------------------------------------------------
*/
$routes->get('/', 'Home::index');

/*
|--------------------------------------------------------------------------
| AUTH (TANPA TOKEN)
|--------------------------------------------------------------------------
*/
$routes->post('api/login', 'AuthController::login');
$routes->post('api/register', 'AuthController::register');

/*
|--------------------------------------------------------------------------
| API WAJIB TOKEN
|--------------------------------------------------------------------------
*/
$routes->group('api', ['filter' => 'auth'], function ($routes) {

    /*
    |--------------------------------------------------------------------------
    | KATEGORI
    |--------------------------------------------------------------------------
    */
    $routes->get('kategori', 'KategoriController::index');
    $routes->post('kategori', 'KategoriController::create');
    $routes->get('kategori/(:num)', 'KategoriController::show/$1');
    $routes->put('kategori/(:num)', 'KategoriController::update/$1');
    $routes->delete('kategori/(:num)', 'KategoriController::delete/$1');

    /*
    |--------------------------------------------------------------------------
    | SUPPLIER
    |--------------------------------------------------------------------------
    */
    $routes->get('supplier', 'SupplierController::index');
    $routes->post('supplier', 'SupplierController::create');
    $routes->get('supplier/(:num)', 'SupplierController::show/$1');
    $routes->put('supplier/(:num)', 'SupplierController::update/$1');
    $routes->delete('supplier/(:num)', 'SupplierController::delete/$1');

    /*
    |--------------------------------------------------------------------------
    | BARANG
    |--------------------------------------------------------------------------
    */
    $routes->get('barang', 'BarangController::index');
    $routes->post('barang', 'BarangController::create');
    $routes->get('barang/(:num)', 'BarangController::show/$1');
    $routes->put('barang/(:num)', 'BarangController::update/$1');
    $routes->delete('barang/(:num)', 'BarangController::delete/$1');
});