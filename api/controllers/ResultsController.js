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
    const anatomy = await Anatomies.findOne({ id: req.param('id') }).populate('platoon');
    if (anatomy) {
      let results = {};

      results['anatomy'] = anatomy;
      results['strength'] = await Strength.findOne({ anatomyId: anatomy.id }).catch(() => { return null; });
      results['agility'] = await Agility.findOne({ anatomyId: anatomy.id }).catch(() => { return null; });

      return res.view('result', { ...results, moment });
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

