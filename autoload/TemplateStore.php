<?php

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of TemplateStore
 *
 * @author alex
 */
class TemplateStore {
    //put your code here
    
    
    function get()
    {
        $template_name = F3::get('PARAMS["template_name"]');
        
        
        $file = "";
        
        switch ($template_name) {
            case "newUser":
                
                $file = "tmpl/NewUser.html";

                break;

            default:
                $file = "tmpl/Welcome.html";
                break;
        }
        
        
        
        echo Template::serve($file);
        
    }
    
}

?>
