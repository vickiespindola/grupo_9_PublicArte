const {
    validationResult
} = require('express-validator');
const db = require('../database/models');

const {
    Console
} = require('console');
const sequelize = db.sequelize;

const controller = {
    //listar
    list: (req, res, next) => {
        Products.findAll({
                include: ['brands','categories','producers','images'],
                order: [
                    ['name', 'ASC']
                ]
            })
            .then(products => {
                res.render('admin/admin', {
                    products
                })
            })
            .catch((error) => res.send(error))
    },
    //crear
    create: (req, res, next) => {
        res.render('admin/create');
    },

    store: (req, res) => {

        const errors = validationResult(req);

        if (errors.isEmpty()) {
            const {
                titulo,
                marca,
                categoria,
                descripcion,
                precio,
                marca,
                categoria
            } = req.body

            let img = req.files[0].filename;

            db.Products.create({
                    name: titulo.trim(),
                    description: descripcion.trim(),
                    price: +precio.trim(),
                    avatar: img ? img : 'default-image.png',
                    id_brand: marca,
                    id_category: categoria
                })
                .then(() => {
                    return res.redirect('/admin')
                })
                .catch(error => {
                    res.render(error)
                })
        }

    },

    //editar
    edit: (req, res) => {
        db.Products.findByPk(+req.params.id)
            .then(producto => res.render('admin/edit', {
                producto
            }))
            .catch(error => {
                res.render(error)
            })
    },

    update: (req, res) => {

        const errors = validationResult(req);

        if (errors.isEmpty()) {
            const {
                titulo,
                marca,
                categoria,
                descripcion,
                precio,
                marca,
                categoria
            } = req.body

            let img = req.files[0] ? req.files[0].filename : undefined;

            db.users.update({
                    name: titulo.trim(),
                    description: descripcion.trim(),
                    price: +precio.trim(),
                    avatar: img ? img : 'default-image.png',
                    id_brand: marca,
                    id_category: categoria
                }, {
                    where: {
                        id: +req.params.id
                    }
                })
                .then(producto => {
                    res.redirect("/admin", {
                        producto
                    })
                })
                .catch(err => {
                    res.send(err)
                })

        } else {

            res.render('user/editProfile', {
                errors: errors.mapped(),
                old: req.body
            })
        }

    },

    destroy: (req, res) => {
        db.Products.destroy({
                where: {
                    id: req.params.id
                }
            })
            .then(result => {
                return res.redirect("/admin")
            })
            .catch((error) => {
                res.send(error)
            })
    }

}
module.exports = controller;