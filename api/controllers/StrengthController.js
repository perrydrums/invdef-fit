/**
 * StrengthController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

  list: (req, res) => {
    Strength.find({}).exec((err, strength) => {
      if (err) {
        return res.send(500, {error: 'Database error'});
      }
      return res.view('strength/list', { strength });
    });
  },

  add: (req, res) => {
    Anatomies.findOne({ id: req.param('id') }).exec((err, anatomy) => {
      if (err) {
        return res.redirect('/');
      }
      return res.view('strength/add', { anatomy });
    });
  },

  create: (req, res) => {
    Strength.create({
      anatomyId: req.body.anatomyId,
      shoulderPressReps: req.body.shoulderPressReps,
      shoulderPressWeight: req.body.shoulderPressWeight,
      squatReps: req.body.squatReps,
      squatWeight: req.body.squatWeight,
      pullUpReps: req.body.pullUpReps,
      coreStability: req.body.coreStability,
    }).exec((err) => {
      if (err) {
        res.send(500, {error: 'Database error'});
      }
      return res.redirect('/strength/list');
    });
  },

  delete: (req, res) => {
    Strength.destroy({id: req.body.id}).exec((err) => {
      if (err) {
        res.send(500, {error: 'Database error'});
      }
      res.redirect('/strength/list');
    });

    return false;
  },

  edit: (req, res) => {
    Strength.findOne({id: req.param('id')}).exec(async (err, strength) => {
      if (err) {
        res.send(500, {error: 'Database error'});
      }

      const anatomy = await Anatomies.findOne({ id: strength.anatomyId }).catch(() => { return null; });

      res.view('strength/edit', { strength, anatomy });
    });
  },

  update: (req, res) => {
    const id = req.body.anatomyId;

    Strength.update({ id: req.param('id') }, {
      anatomyId: req.body.anatomyId,
      shoulderPressReps: req.body.shoulderPressReps,
      shoulderPressWeight: req.body.shoulderPressWeight,
      squatReps: req.body.squatReps,
      squatWeight: req.body.squatWeight,
      pullUpReps: req.body.pullUpReps,
      coreStability: req.body.coreStability,
    }).exec((err) => {
      if (err) {
        res.send(500, {error: 'Database error'});
      }
      res.redirect('/result/' + id);
    });
  }

};

