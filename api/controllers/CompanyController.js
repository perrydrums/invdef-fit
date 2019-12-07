/**
 * CompanyController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

  list: (req, res) => {
    Company.find({}).exec((err, companies) => {
      if (err) {
        return res.send(500, {error: 'Database error'});
      }
      return res.view('company/list', { companies });
    });
  },

  add: (req, res) => {
    return res.view('company/add');
  },

  create: (req, res) => {
    Company.create({
      name: req.body.name,
    }).exec((err) => {
      if (err) {
        return res.send(500, {error: 'Database error'});
      }

      return res.redirect('/companies');
    });
  },

  delete: (req, res) => {
    Company.destroy({id: req.body.id}).exec(async (err) => {
      if (err) {
        return res.send(500, {error: 'Database error'});
      }

      return res.redirect('/companies');
    });
  },

  edit: (req, res) => {
    Company.findOne({id: req.param('id')}).exec((err, company) => {
      if (err) {
        return res.send(500, {error: 'Database error'});
      }
      return res.view('company/edit', { company });
    });
  },

  update: (req, res) => {
    const id = req.param('id');

    Company.update({ id }, {
      name: req.body.name,
    }).exec((err) => {
      if (err) {
        return res.send(500, {error: 'Database error'});
      }
      return res.redirect('/companies');
    });
  },

};

