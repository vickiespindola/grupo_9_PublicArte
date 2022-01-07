function clientUser(req, res, next) {
    if (req.session.userLogged.role != 3){
        return res.redirect('/')
    }
    next()
}

module.exports = clientUser