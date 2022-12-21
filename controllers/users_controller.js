const User = require('../models/user');

module.exports.profile = function (req, res) {
    if (req.cookies.user_id){
        User.findById(req.cookies.user_id, function(err, user){
            if(user){
                return res.render('users', {
                    title: "User Profile",
                    user: user
                })
            }else {
                return res.redirect('users/sign-in')
            }
            
        });
    }else{
        return res.render('/users/sign-in');
    }
  
}

// rendering signIn view
module.exports.signIn = function(req, res) {
    return res.render('user_sign_in', {
        title : 'Sign In'
    })
    
}

// rendering signUp view
module.exports.signUp = function(req, res){
    return res.render('user_sign_up', {
        title : 'Sign Up'
    })
}

// get the signup data
module.exports.create = function(req, res){
    if (req.body.password != req.body.confirm_password) {
        return res.redirect('back');
    }
    User.findOne({ email: req.body.email}, function(err, user){
        if(err){
            console.log('error in finding the user in signing up');
            return
        }

        if (!user){
            User.create(req.body, function(err, user){
                if(err){
                    console.log('error in creating user while signing up');
                    return
                }
                return res.redirect('/users/sign-in')
            })
        }else{
            return res.redirect('back');
        }
    })

}

// SignIn and create a session for the user
module.exports.createSession = function(req, res){
    // steps tp authenticate
    // find the user
    User.findOne({email: req.body.email}, function(err, user){
        if(err){
            console.log('error in finding the user in signing in');
            return
        }
        
        if (user){
            // handle passowrd which does'nt match
            if (user.password != req.body.password){
                return res.redirect('back');
            }
            // handle user found
            res.cookie('user_id', user.id);
            return res.redirect('/users/profile');

        }else{
            // handle user not found
            return res.redirect('back')
        }
    })
}

// deleting session

module.exports.clearSession = function(req, res){
    req.clearCookie('user_id');
    return res.redirect('/users/sign-in');
}