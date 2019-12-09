/**
 * ResultsController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

  list: async (req, res) => {
    const anatomies = await Anatomies.find().populate('platoon');
    if (anatomies) {
      return res.view('anatomies/list', { anatomies });
    }
  },

  view: async (req, res) => {
    const moment = require('moment');
    const md5 = require('md5');

    const anatomy = await Anatomies.findOne({ id: req.param('id') }).populate('platoon');
    if (anatomy) {
      let results = {};

      results['anatomy'] = anatomy;
      results['strength'] = await Strength.findOne({ anatomyId: anatomy.id }).catch(() => { return null; });
      results['agility'] = await Agility.findOne({ anatomyId: anatomy.id }).catch(() => { return null; });

      const platoon = await Platoon.findOne({ id: anatomy.platoon.id }).catch(() => { return null; });
      let averages = {};

      if (platoon) {
        averages['name']          = platoon.name;
        averages['fat']           = await Anatomies.avg('fat').where({ platoon: platoon.id }) || 0;
        averages['coreStability'] = await sails.helpers.getAverageByPlatoon('strength', 'coreStability', platoon.id) || 0;
        averages['strength']      = await sails.helpers.getAverageByPlatoon('strength', 'score', platoon.id) || 0;
        averages['agility']       = await sails.helpers.getAverageByPlatoon('agility', 'score', platoon.id) || 0;
        averages['endurance']     = await sails.helpers.getAverageByPlatoon('agility', 'runScore', platoon.id) || 0;
      }

      return res.view('result', { ...results, moment, averages, md5 });
    }
  },

  delete: (req, res) => {
    Anatomies.destroy({id: req.body.id}).exec(async (err) => {
      if (err) {
        return res.send(500, {error: 'Database error'});
      }

      await Strength.destroy({ anatomyId: req.body.id }).catch(() => { return null; });
      await Agility.destroy({ anatomyId: req.body.id }).catch(() => { return null; });

      return res.redirect('/results');
    });
  },

  charts: (req, res) => {
    Anatomies.findOne({ id: req.param('id') }).exec(async (err, anatomy) => {
      if (err) {
        return res.send(500, {error: 'Database error'});
      }

      let results = {};
      results['anatomy'] = anatomy;
      results['strength'] = await Strength.findOne({ anatomyId: anatomy.id }).catch(() => { return null; });
      results['agility'] = await Agility.findOne({ anatomyId: anatomy.id }).catch(() => { return null; });

      return res.view('charts', { ...results });
    });
  }

};

