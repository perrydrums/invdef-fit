/**
 * ResultsController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

  list: (req, res) => {
    Anatomies.find({}).exec((err, anatomies) => {
      if (err) {
        return res.send(500, {error: 'Database error'});
      }
      return res.view('anatomies/list', { anatomies });
    });
  },

  view: (req, res) => {
    Anatomies.findOne({ id: req.param('id') }).exec(async (err, anatomy) => {
      if (err) {
        return res.send(500, {error: 'Database error'});
      }

      let results = {};
      results['anatomy'] = anatomy;
      results['strength'] = await Strength.findOne({ anatomyId: anatomy.id }).catch(() => { return null; });
      results['agility'] = await Agility.findOne({ anatomyId: anatomy.id }).catch(() => { return null; });

      return res.view('result', { ...results });
    });
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

