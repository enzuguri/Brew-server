<?php

require __DIR__.'/lib/base.php';

$db_conn = new DB('mysql:host=localhost;port=8889;dbname=brew','root','root');

F3::set("DB", $db_conn);
F3::set('CACHE',FALSE);
F3::set('DEBUG',1);
F3::set('UI','ui/');
F3::set('AUTOLOAD','autoload/');

F3::set('EXTERNS',FALSE);

F3::route("GET /", function(){
    F3::set("APP_ID", "158311827603632");
    echo Template::serve("index.html");
});


F3::route("GET /channel", function(){
   

 $cache_expire = 60*60*24*365;
 header("Pragma: public");
 header("Cache-Control: max-age=".$cache_expire);
 header('Expires: ' . gmdate('D, d M Y H:i:s', time()+$cache_expire) . ' GMT');
 
 echo '<script src="//connect.facebook.net/en_US/all.js"></script>';
    
});



F3::route("POST /login/facebook", "User->loginViaFacebook");
F3::route("POST /login/twitter", "User->loginViaTwitter");

F3::route("POST /user", "User->post");
F3::map("/user/@userid", "User");

F3::map("/brew/@brew_id", "Brew");

F3::map("/template/@template_name", "TemplateStore");

F3::run();

?>
