module.exports = {
    isOwner:function(request, response){
        if (request.session.is_logined) { // Check if a user is logged in [Check is_logined], after login_process
            return true;
        } else {
            return false;
        }
    },
    statusUI:function(request, response){
        var authStatusUI = '<a href="/auth/login">login</a>'
        if(this.isOwner(request, response)){
            authStatusUI = `${request.session.nickname} | <a href="/auth/logout">logout</a>`
        }
        return authStatusUI;
    }
}