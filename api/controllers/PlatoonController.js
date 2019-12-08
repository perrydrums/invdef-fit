/**
 * PlatoonController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

  units: async (req, res) => {
    const anatomies = await Anatomies.find({ platoon: req.param('platoonId') }).populate('platoon');
    return res.view('platoon/units', { anatomies });
  },

  overview: async (req, res) => {
    const platoon = await Platoon.findOne({ id: req.param('platoonId') });
    const anatomies = await Anatomies.find({ platoon: req.param('platoonId') });

    let averages = {};

    averages['fat'] = await Anatomies.avg('fat').where({ platoon: req.param('platoonId') }) || 0;
    averages['coreStability'] = await sails.helpers.getAverageByPlatoon('strength', 'coreStability', platoon.id) || 0;
    averages['strength'] = await sails.helpers.getAverageByPlatoon('strength', 'score', platoon.id) || 0;
    averages['agility'] = await sails.helpers.getAverageByPlatoon('agility', 'score', platoon.id) || 0;
    averages['endurance'] = await sails.helpers.getAverageByPlatoon('agility', 'runScore', platoon.id) || 0;

    return res.view('platoon/overview', { platoon, anatomies, averages });
  },

  adminList: async (req, res) => {
    const platoons = await Platoon.find().populate('company').populate('units');
    return res.view('admin/platoon/list', { platoons });
  },

  add: async (req, res) => {
    const companies = await Company.find();
    return res.view('admin/platoon/add', { companies });
  },

  create: (req, res) => {
    Platoon.create({
      name: req.body.name,
      company: req.body.company,
    }).exec((err) => {
      if (err) {
        return res.send(500, {error: 'Database error'});
      }

      return res.redirect('/admin/platoons');
    });
  },

  delete: (req, res) => {
    Platoon.destroy({id: req.body.id}).exec(async (err) => {
      if (err) {
        return res.send(500, {error: 'Database error'});
      }

      return res.redirect('/admin/platoons');
    });
  },

  edit: (req, res) => {
    Platoon.findOne({id: req.param('id')}).exec(async (err, platoon) => {
      if (err) {
        return res.send(500, {error: 'Database error'});
      }
      const companies = await Company.find();
      return res.view('admin/platoon/edit', { platoon, companies });
    });
  },

  update: (req, res) => {
    const id = req.param('id');

    Platoon.update({ id }, {
      name: req.body.name,
      company: req.body.company,
    }).exec((err) => {
      if (err) {
        return res.send(500, {error: 'Database error'});
      }
      return res.redirect('/admin/platoons');
    });
  },

};

