var mongoose = require('mongoose');
var Todo = mongoose.model('Todo');
var utils = require('../utils');

exports.index = function (req, res, next) {
    var userId = utils.getUserId(req);

    Todo.find({user_id: userId})
        .sort({'done': 1, 'updated_at': -1})
        .exec(function (err, todos) {
            if (err) return next(err);

            res.render('index', {
                title: 'Todo List example for benchmark testing',
                todos: todos
            });
        });
};

exports.manageCookies = function (req, res, next) {
    var userId = utils.getUserId(req);

    if (!userId) {
        res.cookie('user_id', utils.makeId());
    }

    next();
};

exports.readCsv = function (req, res, next) {
    var csv = require('fast-csv');
    var userId = utils.getUserId(req);
    var path = "public/downloads/" + userId + ".csv";

    Todo.find({user_id: userId})
        .sort({'done': 1, 'updated_at': -1})
        .exec(function (err, todos) {
            if (err) return next(err);

            var data = [];

            todos.forEach(function(item) {
                data.push({content: item.content, done: item.done ? '1' : '0', updated_at: item.updated_at});
            });

            csv.writeToPath(path, data, {headers: true, delimiter: ';'})
                .on("finish", function(){
                    console.log("CSV File generated: " + path);
                    res.download(path);
                });
        });
}

exports.create = function (req, res, next) {
    new Todo({
        user_id: utils.getUserId(req),
        content: req.body.content,
        updated_at: Date.now()
    }).save(function (err) {
        if (err) return next(err);

        res.redirect('/');
    });
};

exports.delete = function (req, res, next) {
    Todo.findById(req.params.id, function (err, todo) {
        var userId = utils.getUserId(req);

        if (todo.user_id !== userId) {
            res.sendStatus(403);
        }

        todo.remove(function (err) {
            if (err) return next(err);

            res.redirect('/');
        });
    });
};

exports.done = function (req, res) {
    Todo.findById(req.params.id, function (err, todo) {
        var userId = utils.getUserId(req);

        if (todo.user_id !== userId) {
            res.sendStatus(403);
        }

        todo.done = true;
        todo.save(function () {
            res.redirect('/');
        });
    });
};

exports.edit = function (req, res, next) {
    var userId = utils.getUserId(req);

    Todo.find({user_id: userId}).sort('-updated_at').exec(function (err, todos) {
        if (err) return next(err);

        res.render('edit', {
            title: 'Express Todo Example',
            todos: todos,
            current: req.params.id
        });
    });
};

exports.update = function (req, res, next) {
    Todo.findById(req.params.id, function (err, todo) {
        var userId = utils.getUserId(req);

        if (todo.user_id !== userId) {
            res.sendStatus(403);
        }

        todo.content = req.body.content;
        todo.updated_at = Date.now();
        todo.save(function (err) {
            if (err) return next(err);

            res.redirect('/');
        });
    });
};