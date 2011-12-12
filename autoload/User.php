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
        
        
        BrewCommon::json_output($user->cast());
    }

    function post() {
        
        
        $user = new Axon('user');
        
        
        $decoded = BrewCommon::decode_json_post();
        
        
        $user->alias = $decoded["alias"];
        $user->modified = date('Y-m-d H:i:s');
        
        $user->save();
        
        
        $response = array("status" => "success");
        
        
        BrewCommon::json_output($response);
    }

    function put() {
        // same as updateitem.php
    }

    function delete() {
        // same as deleteitem.php
    }
    
    
    function loginViaFacebook()
    {
        $decoded = BrewCommon::decode_json_post();
        
        $user = new Axon('fbuserview');
        $user->load("fbid=".$decoded["fbid"]);
        
        
        BrewCommon::json_output($user->cast());
    }
    
    function loginViaTwitter()
    {
        $user = new Axon('user');
        
        $decoded = BrewCommon::decode_json_post();
        
        echo $decoded['twid'];
    }
    

}

?>
