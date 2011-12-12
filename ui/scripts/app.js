//main bootstrap function
window.bootstrap = function(){
    
    
    if(window.FB == undefined){
        
        FB = {
            
            login:function(cb, opts){
                
                cb({authResponse:{uid:"1234"}});
            },
            
            api:function(api, cb){
                cb({});
            }
        }
    }
    
    
    
    var FacebookController = {
        
        authResponse:null,
        userResponse:null,
        FB:FB,
        
        login:function(perms, cb){
            
            var self = this;
            
            this.FB.login(function(response) {
                if (response.authResponse) {
                    self.authResponse = response.authResponse;
                    cb();
                } else {
                    self.authResponse = null;
                }
            }, {
                scope: perms
            });
        },
        
        
        getUser:function(){
            
            var self = this;
            
            this.FB.api('/me', function(response) {
                self.userResponse = response;
            });
        }
        
    }
    
    var BrewModel = Backbone.Model.extend({
       urlRoot:"brew"
    });
    
    
    var BrewCollection = Backbone.Collection.extend({
       url:"brew"
    });
    
    var brews = new BrewCollection();
    
    var UserCollection = Backbone.Collection.extend({
       url:"user"
    });
    
    var users = new UserCollection({});
    
    var UserModel = Backbone.Model.extend({
       urlRoot:"user"
    });
    
    var CreateUserView = Backbone.View.extend({
        
        events:{
            "click #create-user-submit":"onSubmit",
            "click #create-user-facebook":"onFacebook"
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
        },
        
        onFacebook:function(e){
            
            var self = this;
            
            FacebookController.login("", function(){
                self.updateFacebookDetails();
            });
        },
        
        updateFacebookDetails:function(){
            
            var fbid = FacebookController.authResponse.uid;
            this.model.set({'fbid':fbid});
        }
        
    });
    
    var WelcomeView = Backbone.View.extend({});
    
    var LoginView = Backbone.View.extend({
        
        
        addFacebookUser:function(){
            
            var fbid = FacebookController.authResponse.uid;
            var self = this;
            
            var opts = {
                
                data: JSON.stringify({"fbid":fbid}),
                url:"login/facebook",
                success:function(data){
                    self.onLogin(data);
                }
            }
            
            
            Backbone.sync("create", null, opts);
        },
        
        onLogin:function(data){
            users.add(data);
            window.location.hash = "user/" + data.id;
        },
        
        fbLogin:function(){
            
            console.log("fbLogin");
            
            var self = this;
            
            FacebookController.login('', function(){
                self.addFacebookUser();
            });
        }
        
    });
    
    
    var UserView = Backbone.View.extend({
        
        
    });
    
    var BrewView = Backbone.View.extend({
        
       
        setModel:function(model){
            this.model = model;
        }
        
    });
    
    Views = {
        NEW_USER:"newUser",
        WELCOME:"welcome",
        LOGIN:"login",
        USER:"user",
        BREW:"brew"
    }
    
    var viewConfig = {};
    
    viewConfig[Views.NEW_USER] = CreateUserView;
    viewConfig[Views.WELCOME] = WelcomeView;
    viewConfig[Views.LOGIN] = LoginView;
    viewConfig[Views.USER] = UserView;
    viewConfig[Views.BREW] = BrewView;
    
    
    var AppView = Backbone.View.extend({
        
       el:$("#main")[0],
       
       template:"Start",
       
       viewMap:viewConfig,
       
       viewName:"",
       activeView:null,
       
       initialize:function(){
         _.bindAll(this, "render");
       },
       
       render:function(){
           this.el.innerHTML = _.template(this.template, {});
       },
       
       
       switchView:function(viewName){
           
           if(this.viewName == viewName){
               return this.activeView;
           }
           
           this.viewName = viewName;
           
           var url = "template/" + viewName;
           
           var self = this;
           
           var clz = this.viewMap[viewName];
           
           this.activeView = new clz({el:this.el});
           
           
           $.get(url, function(data){
               self.updateTemplate(data);
           });
           
           return this.activeView;
       },
       
       
       updateTemplate:function(tmp){
           this.template = tmp;
           this.render();
       }
        
        
    });
    
    
    
    
    
    
    
    
    
    
    
    
    var app = new AppView();
    
    
    var AppRouter = Backbone.Router.extend({
       
       view:app,
       
       brews:brews,
       
       routes:{
           "user/new":"newUser",
           "user/:id":"navigateUser",
           "login":"login",
           "login/facebook":"loginFacebook",
           "brew/new":"newBrew",
           "brew/:id":"navigateBrew",
           "*actions":"home"
       },
       
       home:function(){
         this.view.switchView(Views.WELCOME);      
       },
       
       login:function(){
         this.view.switchView(Views.LOGIN);
       },
       
       loginFacebook:function(){
           this.view.switchView(Views.LOGIN).fbLogin();
       },
       
       
       navigateUser:function(id){
         console.log("navigate "+id);
         this.view.switchView(Views.USER);
       },
       
       navigateBrew:function(id){
          var model = new BrewModel({id:id});
          model.fetch();
          this.view.switchView(Views.BREW).setModel(model);
       },
       
       
       newBrew:function(){
        this.view.switchView(Views.NEW_USER);
       },
       
       
       newUser:function(){
        this.view.switchView(Views.NEW_USER);
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
   
   window.bootstrap();
   
});
