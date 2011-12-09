<?php


/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of User
 *
 * @author alex
 */
class User {

    function get() {
        
        
        $id = F3::get('PARAMS["userid"]');
        
        $user=new Axon('user');
        $user->load("id=".$id);
        
        
        $this->json($user->cast());
    }

    function post() {
        
        
        $user = new Axon('user');
        
        
        $handle = fopen('php://input','r');
        $jsonInput = fgets($handle);
        $decoded = json_decode($jsonInput,true);
        
        
        
        $user->alias = $decoded["alias"];
        $user->modified = date('Y-m-d H:i:s');
        
        $user->save();
        
        
        $response = array("status" => "success");
        
        $this->json($response); 
    }

    function put() {
        // same as updateitem.php
    }

    function delete() {
        // same as deleteitem.php
    }
    
    
    
    function json($data)
    {
        header('Content-Type: application/json;');
        echo json_encode($data, 0);
    }

}

?>
