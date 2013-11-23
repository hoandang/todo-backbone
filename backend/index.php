<?php

require 'vendor/autoload.php';
use RedBean_Facade as R;

$app = new \Slim\Slim();

$response = $app->response();
$response->header('Content-Type', 'application/json');

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') 
{
    if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD']) && (
       $_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD'] == 'GET' ||
       $_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD'] == 'POST' ||
       $_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD'] == 'DELETE' ||
       $_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD'] == 'PUT' )) 
    {
        $response->header('Access-Control-Allow-Origin: *');
        $response->header("Access-Control-Allow-Credentials: true");
        $response->header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept');
        $response->header('Access-Control-Allow-Methods: POST, GET, OPTIONS, DELETE, PUT');
        $response->header('Access-Control-Max-Age: 86400');
    }
    exit;
}

R::setup('mysql:host=localhost; dbname=todo', 'root','root');

$app->get ('/tasks', function () use ($app) {
    $tasks = R::findAll ('tasks');
    echo json_encode (R::exportAll($tasks));
});

$app->get ('/tasks/:id', function ($id) use ($app) {
    $task = R::findOne ('tasks', 'id=?', array ($id));
    echo $task;
});

$app->post ('/tasks', function () use ($app) {
    $input = json_decode ($app->request()->getBody());
    $newTask = R::dispense ('tasks');

    $newTask->title = $input->title;
    $newTask->priority = $input->priority;
    echo json_encode (R::store ($newTask));
});

$app->put ('/tasks/:id', function ($id) use ($app) {
    $input = json_decode ($app->request()->getBody());
    $updateTask = R::findOne ('tasks', 'id=?', array ($id));
    $updateTask->title = $input->title;
    $updateTask->priority = $input->priority;
    echo json_encode (R::store ($updateTask));
});

$app->delete ('/tasks/:id', function ($id) use ($app) {
    $destroyTask = R::findOne ('tasks', 'id=?', array ($id));
    R::trash ($destroyTask);
    $app->response()->status (204);
});

$app->run();

