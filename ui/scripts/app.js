/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


//main bootstrap function
window.bootstrap = function(){
    
    /*
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
    */
    
    var UserCollection = Backbone.Collection.extend({
       url:"user" 
    });
    
    
    var UserModel = Backbone.Model.extend({
       url:"user"
    });
    
    var CreateUserView = Backbone.View.extend({
        
        events:{
            "click #create-user-submit":"onSubmit"
        },
        
        
        model:null,
        
        
        initialize:function(){
            this.model = new UserModel({alias:"Enter Your Name"});
        },
        
        onSubmit:function(e){
            
            var alias = $(this.el).find("input[name='alias']").val();
            
            this.model.set({"alias":alias});
            
            this.model.save();
            e.preventDefault();
        }
        
    });
    
    var WelcomeView = Backbone.View.extend({});
    
    
    var viewConfig = {
        "newUser":CreateUserView,
        "welcome":WelcomeView
    }
    
    
    var AppView = Backbone.View.extend({
        
       el:$("#main")[0],
       
       template:"Start",
       
       viewMap:viewConfig,
       
       activeView:null,
       
       initialize:function(){
         _.bindAll(this, "render");
         this.switchView("welcome");
       },
       
       render:function(){
           this.el.innerHTML = _.template(this.template, {});
       },
       
       
       switchView:function(viewName){
           
           var url = "template/" + viewName;
           
           var self = this;
           
           if(this.activeView != null){
               //activeView.destroy();
           }
           
           var clz = this.viewMap[viewName];
           
           this.activeView = new clz({el:this.el});
           
           
           $.get(url, function(data){
               self.updateTemplate(data);
           });
           
       },
       
       
       updateTemplate:function(tmp){
           this.template = tmp;
           this.render();
       }
        
        
    });
    
    
    
    
    
    
    
    
    
    
    
    
    var app = new AppView();
    
    
    var AppRouter = Backbone.Router.extend({
       
       view:app,
       
       routes:{
           "user/new":"newUser",
           "user/:id":"navigateUser",
           "other":"other"
       },
       
       other:function(){
         console.log("other url");  
       },
       
       
       navigateUser:function(id){
         console.log("navigate");  
       },
       
       
       newUser:function(){
        this.view.switchView("newUser");
       }
       
        
    });
    
    
    var router = new AppRouter();
    
    Backbone.history.start();
    
}


$(function(){
   
    if(window.fbComplete == true){
        window.bootstrap();
    }else{
        window.onFBComplete = window.bootstrap;
    }
   
});
