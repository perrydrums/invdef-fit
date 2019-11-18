/**
 * FormulasController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const formulaEx = require('excel-formula');

module.exports = {

  list: (req, res) => {
    Formulas.find({}).exec((err, formulas) => {
      if (err) {
        return res.send(500, {error: 'Database error'});
      }
      return res.view('admin/formulas/list', { formulas });
    });
  },

  add: (req, res) => {
    return res.view('admin/formulas/add');
  },

  create: (req, res) => {
    Formulas.create({
      field: req.body.field,
      formula: req.body.formula,
    }).exec((err) => {
      if (err) {
        return res.send(500, {error: 'Database error'});
      }

      return res.redirect('/admin/formulas');
    });
  },

  delete: (req, res) => {
    Formulas.destroy({id: req.body.id}).exec(async (err) => {
      if (err) {
        return res.send(500, {error: 'Database error'});
      }

      return res.redirect('/admin/formulas');
    });
  },

  edit: (req, res) => {
    Formulas.findOne({id: req.param('id')}).exec((err, formula) => {
      if (err) {
        return res.send(500, {error: 'Database error'});
      }
      return res.view('admin/formulas/edit', { formula });
    });
  },

  update: (req, res) => {
    const id = req.param('id');

    Formulas.update({ id }, {
      field: req.body.field,
      formula: req.body.formula,
    }).exec((err) => {
      if (err) {
        return res.send(500, {error: 'Database error'});
      }
      return res.redirect('/admin/formulas');
    });
  },

  solve: (req, res) => {
    try {
      const value = eval(formulaEx.toJavaScript(req.body.formula));
      return res.send({value});
    }
    catch (e) {
      return res.send({error: e.message});
    }
  }

};

