module.exports = (req,res,next)=>{
    if(req.cookies.PublicArte){
        req.session.userLogged = req.cookies.PublicArte;
    }
    next()
}