<?php

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of Brew
 *
 * @author alex
 */
class Brew 
{
    //put your code here
    
    
    function get()
    {
        
        $id = F3::get('PARAMS["brew_id"]');
        
        $brew = new Axon("userbrewview");
        $brew->load("brew_id=".$id);
        
        
        $data = BrewCommon::format_brew_object($brew->cast());
        
        BrewCommon::json_output($data);
    }
    
    
    function put()
    {
        $brew = new Axon("brew");
        
        $request = BrewCommon::decode_json_post();
        
        
        $brew->modified = date('Y-m-d H:i:s');
        $brew->save();
        
        $uid = $request['user'];
        
        
        $this->create_relation($brew->_id, $uid, 1);
    }
    
    
    
    function create_relation($bid, $uid, $rel)
    {
        $rel = new Axon("brewuser");
        $rel->uid = $uid;
        $rel->bid = $bid;
        $rel->rel = $rel; //owner
        
        $rel->save();
    }
    
}

?>
