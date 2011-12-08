/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


//main bootstrap function
window.bootstrap = function(){
    
    FB.login(function(response) {
        if (response.authResponse) {
            console.log('Welcome!  Fetching your information.... ');
            FB.api('/me', function(response) {
                console.log('Good to see you, ' + response.name + '.');
                
            });
        } else {
            console.log('User cancelled login or did not fully authorize.');
        }
    }, {
        scope: ''
    });
    
    
    
    
}


$(function(){
   
    if(window.fbComplete == true){
        window.bootstrap();
    }else{
        window.onFBComplete = window.bootstrap;
    }
   
});
