<?php

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of BrewCommon
 *
 * @author alex
 */
class BrewCommon {
    //put your code here
    
    
    public static function format_brew_object($db_obj)
    {
        $user = array("id"=>$db_obj["user_id"], "alias"=>$db_obj["user_alias"], "relation"=>$db_obj["user_relation"]);
        
        $cat = array("id"=>$db_obj["cat_id"], "name"=>$db_obj["cat_name"]);
        
        $type = array("id"=>$db_obj["type_id"], "name"=>$db_obj["type_name"], "category"=>$cat);
        
        $obj = array("id"=>$db_obj["brew_id"], "description"=>$db_obj["brew_description"], "type"=>$type, "user"=>$user);
        
        return $obj;
    }
    
    
    public static function decode_json_post()
    {
        $handle = fopen('php://input','r');
        $jsonInput = fgets($handle);
        return json_decode($jsonInput,true);
    }
    
    
    public static function json_output($data)
    {
        header('Content-Type: application/json;');
        echo json_encode($data, 0);
    }
}

?>
