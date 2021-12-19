<?php

namespace App\Packages\Shared\Infrastructure\Repositories;

use App\Exceptions\RepositoryException;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\App;

abstract class AbstractRepository implements RepositoryInterface
{

    /**
     * @var App
     */
//    private $app;

    /**
     * @var
     */
    protected $model;

    /**
     * @param App $app
     * @throws \App\Exceptions\RepositoryException
     */
    public function __construct(/*?App $app*/)
    {
//        $this->app = $app;
        $this->makeModel();
    }

    /**
     * @return Model
     * @throws RepositoryException
     */
    public function makeModel()
    {
        $model = App::make($this->model());

        if (!$model instanceof Model)
            throw new RepositoryException("Class {$this->model()} must be an instance of Illuminate\\Database\\Eloquent\\Model");

        return $this->model = $model;
    }

    /**
     * Specify Model class name
     *
     * @return mixed
     */
    abstract function model();

    /**
     * Mapping to DTO
     *
     * @return mixed
     */
    abstract function mapProps($model);

    /**
     * Query with callback
     * @param array $columns
     * @param array $columns
     * @return mixed
     */
    public function query($applyFilter = null, $columns = array('*'))
    {
        $query = $this->model;
        if (is_callable($applyFilter)) $query = $applyFilter($this->model);
        return $query->get($columns)->map(function ($item) {
            return $this->mapProps($item);
        });
    }

    /**
     * @param array $columns
     * @return mixed
     */
    public function all($columns = array('*'))
    {
        return $this->model->get($columns)->map(function ($item) {
            return $this->mapProps($item);
        });
    }

    /**
     * @param int $perPage
     * @param array $columns
     * @return mixed
     */
//    public function paginate($perPage = 15, $columns = array('*')) {
//        return $this->model->paginate($perPage, $columns);
//    }

    /**
     * @param array $data
     * @return mixed
     */
    public function create(array $data)
    {
        return $this->mapProps($this->model->create($data));
    }

    /**
     * @param array $data
     * @param $id
     * @param string $attribute
     * @return mixed
     */
    public function update(array $data, $id, $attribute = "id")
    {
        return $this->model->where($attribute, '=', $id)->update($data);
    }

    /**
     * @param $id
     * @return mixed
     */
    public function delete($id)
    {
        return $this->model->destroy($id);
    }

    /**
     * @param $id
     * @param array $columns
     * @return mixed
     */
    public function find($id, $columns = array('*'))
    {
        return $this->mapProps($this->model->find($id, $columns));
    }

//    /**
//     * @param $attribute
//     * @param $value
//     * @param array $columns
//     * @return mixed
//     */
//    public function findBy($attribute, $value, $columns = array('*'))
//    {
//        return $this->mapProps($this->model->where($attribute, '=', $value)->get($columns));
//    }
}
