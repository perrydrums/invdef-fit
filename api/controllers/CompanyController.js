/**
 * CompanyController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

  list: async (req, res) => {
    const companies = await Company.find();
    return res.view('company/list', { companies });
  },

  platoons: async (req, res) => {
    const platoons = await Platoon.find({ company: req.param('companyId') }).populate('company').populate('units');
    return res.view('platoon/list', { platoons });
  },

  overview: async (req, res) => {
    const company = await Company.find({ id: req.param('companyId') });
    const platoons = await Platoon.find({ company: req.param('companyId') }).populate('units');
    return res.view('company/overview', { company, platoons });
  },

  adminList: (req, res) => {
    Company.find({}).exec((err, companies) => {
      if (err) {
        return res.send(500, {error: 'Database error'});
      }
      return res.view('admin/company/list', { companies });
    });
  },

  add: (req, res) => {
    return res.view('admin/company/add');
  },

  create: (req, res) => {
    Company.create({
      name: req.body.name,
    }).exec((err) => {
      if (err) {
        return res.send(500, {error: 'Database error'});
      }

      return res.redirect('/admin/companies');
    });
  },

  delete: (req, res) => {
    Company.destroy({id: req.body.id}).exec(async (err) => {
      if (err) {
        return res.send(500, {error: 'Database error'});
      }

      return res.redirect('/admin/companies');
    });
  },

  edit: (req, res) => {
    Company.findOne({id: req.param('id')}).exec((err, company) => {
      if (err) {
        return res.send(500, {error: 'Database error'});
      }
      return res.view('admin/company/edit', { company });
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
      return res.redirect('/admin/companies');
    });
  },

};

