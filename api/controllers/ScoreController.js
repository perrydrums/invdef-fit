/**
 * ScoreController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

  list: (req, res) => {
    const moment = require('moment');

    Score.find({}).exec((err, scores) => {
      if (err) {
        return res.send(500, {error: 'Database error'});
      }
      return res.view('admin/score/list', { scores, moment });
    });
  },

  add: (req, res) => {
    return res.view('admin/score/add');
  },

  create: (req, res) => {
    Score.create({
      field: req.body.field,
      max: req.body.max,
    }).exec((err) => {
      if (err) {
        return res.send(500, {error: 'Database error'});
      }

      return res.redirect('/admin/score');
    });
  },

  delete: (req, res) => {
    Score.destroy({id: req.body.id}).exec(async (err) => {
      if (err) {
        return res.send(500, {error: 'Database error'});
      }

      return res.redirect('/admin/score');
    });
  },

  edit: (req, res) => {
    Score.findOne({id: req.param('id')}).exec((err, score) => {
      if (err) {
        return res.send(500, {error: 'Database error'});
      }
      return res.view('admin/score/edit', { score });
    });
  },

  update: (req, res) => {
    const id = req.param('id');

    Score.update({ id }, {
      field: req.body.field,
      max: req.body.max,
    }).exec((err) => {
      if (err) {
        return res.send(500, {error: 'Database error'});
      }
      return res.redirect('/admin/score');
    });
  },

};

