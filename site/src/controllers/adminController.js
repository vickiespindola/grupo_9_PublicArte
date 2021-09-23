const controller = {
    list: function (req, res, next) {
        res.render('admin/admin');
    },
    edit: function (req, res, next) {
        res.render('admin/edit');
    },
    create: function (req, res, next) {
        res.render('admin/create');
    }
}
module.exports = controller;