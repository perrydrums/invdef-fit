/**
 * CompanyController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

  list: async (req, res) => {
    const companies = await Company.find().populate('platoons');
    return res.view('company/list', { companies });
  },

  platoons: async (req, res) => {
    const platoons = await Platoon.find({ company: req.param('companyId') }).populate('company').populate('units');
    return res.view('platoon/list', { platoons });
  },

  overview: async (req, res) => {
    const md5 = require('md5');

    const company = await Company.find({ id: req.param('companyId') });
    const platoons = await Platoon.find({ company: req.param('companyId') }).populate('units').populate('company');
    let averages = [];

    for (let i = 0; i < platoons.length; i ++) {
      let a = {};
      a['name'] = platoons[i].name;

      a['fat']           = await Anatomies.avg('fat').where({ platoon: platoons[i].id }) || 0;
      a['coreStability'] = await sails.helpers.getAverageByPlatoon('strength', 'coreStability', platoons[i].id) || 0;
      a['strength']      = await sails.helpers.getAverageByPlatoon('strength', 'score', platoons[i].id) || 0;
      a['agility']       = await sails.helpers.getAverageByPlatoon('agility', 'score', platoons[i].id) || 0;
      a['endurance']     = await sails.helpers.getAverageByPlatoon('agility', 'runScore', platoons[i].id) || 0;

      averages.push(a);
    }

    return res.view('company/overview', { company, platoons, averages, md5 });
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

