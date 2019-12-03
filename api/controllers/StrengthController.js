/**
 * StrengthController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

  add: (req, res) => {
    Anatomies.findOne({ id: req.param('id') }).exec((err, anatomy) => {
      if (err) {
        return res.redirect('/');
      }
      return res.view('strength/add', { anatomy });
    });
  },

  create: async (req, res) => {
    const shoulderPressScore = await sails.helpers.score('shoulderPress', req.body.shoulderPressReps * req.body.shoulderPressWeight);
    const squatScore = await sails.helpers.score('squats', req.body.squatReps * req.body.squatWeight);
    const pullUpScore = await sails.helpers.score('pullUp', req.body.pullUpReps);
    const coreStabilityScore = await sails.helpers.score('coreStability', req.body.coreStability);
    const score = ((parseFloat(shoulderPressScore) + parseFloat(squatScore) + parseFloat(pullUpScore) + parseFloat(coreStabilityScore)) / 4).toFixed(1);

    Strength.create({
      anatomyId: req.body.anatomyId,
      shoulderPressReps: req.body.shoulderPressReps,
      shoulderPressWeight: req.body.shoulderPressWeight,
      squatReps: req.body.squatReps,
      squatWeight: req.body.squatWeight,
      pullUpReps: req.body.pullUpReps,
      coreStability: req.body.coreStability,
      shoulderPressScore,
      squatScore,
      pullUpScore,
      coreStabilityScore,
      score,
    }).exec((err) => {
      if (err) {
        res.send(500, {error: 'Database error'});
      }

      return res.redirect('/agility/add/' + req.body.anatomyId);
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

  update: async (req, res) => {
    const id = req.body.anatomyId;
    const shoulderPressScore = await sails.helpers.score('shoulderPress', req.body.shoulderPressReps * req.body.shoulderPressWeight);
    const squatScore = await sails.helpers.score('squats', req.body.squatReps * req.body.squatWeight);
    const pullUpScore = await sails.helpers.score('pullUp', req.body.pullUpReps);
    const coreStabilityScore = await sails.helpers.score('coreStability', req.body.coreStability);
    const score = ((parseFloat(shoulderPressScore) + parseFloat(squatScore) + parseFloat(pullUpScore) + parseFloat(coreStabilityScore)) / 4).toFixed(1);

    Strength.update({ id: req.param('id') }, {
      anatomyId: req.body.anatomyId,
      shoulderPressReps: req.body.shoulderPressReps,
      shoulderPressWeight: req.body.shoulderPressWeight,
      squatReps: req.body.squatReps,
      squatWeight: req.body.squatWeight,
      pullUpReps: req.body.pullUpReps,
      coreStability: req.body.coreStability,
      shoulderPressScore,
      squatScore,
      pullUpScore,
      coreStabilityScore,
      score,
    }).exec((err) => {
      if (err) {
        res.send(500, {error: 'Database error'});
      }
      res.redirect('/result/' + id);
    });
  }

};

