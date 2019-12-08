/**
 * AgilityTest
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
      return res.view('agility/add', { anatomy });
    });
  },

  create: async (req, res) => {
    const jumpScore = await sails.helpers.score('jump', req.body.jumpHeight);
    const agilityScore = await sails.helpers.score('agility', parseFloat(req.body.agility1) + parseFloat(req.body.agility2));
    const sprintScore = await sails.helpers.score('sprint', parseFloat(req.body.sprint1) + parseFloat(req.body.sprint2));
    const runScore = await sails.helpers.score('run', req.body.run);
    const score = ((parseFloat(jumpScore) + parseFloat(agilityScore) + parseFloat(sprintScore)) / 3).toFixed(1);

    Agility.create({
      anatomyId: req.body.anatomyId,
      jumpHeight: req.body.jumpHeight,
      agility1: req.body.agility1,
      agility2: req.body.agility2,
      sprint1: req.body.sprint1,
      sprint2: req.body.sprint2,
      run: req.body.run,
      jumpScore,
      agilityScore,
      sprintScore,
      runScore,
      score,
    }).exec((err) => {
      if (err) {
        res.send(500, {error: 'Database error'});
      }
      Anatomies.find({}).sort({updatedAt:-1}).exec((err, anatomy) => {
        if (err) {
          return res.send(500, {error: 'Database error'});
        }
        res.redirect('/result/' + req.body.anatomyId);
      });
    });
  },

  delete: (req, res) => {
    Agility.destroy({id: req.body.id}).exec((err) => {
      if (err) {
        res.send(500, {error: 'Database error'});
      }
      res.redirect('/agility/list');
    });

    return false;
  },

  edit: (req, res) => {
    Agility.findOne({id: req.param('id')}).exec(async (err, agility) => {
      if (err) {
        res.send(500, {error: 'Database error'});
      }

      const anatomy = await Anatomies.findOne({ id: agility.anatomyId }).catch(() => { return null; });

      res.view('agility/edit', { agility, anatomy });
    });
  },

  update: async (req, res) => {
    const id = req.body.anatomyId;
    const jumpScore = await sails.helpers.score('jump', req.body.jumpHeight);
    const agilityScore = await sails.helpers.score('agility', parseFloat(req.body.agility1) + parseFloat(req.body.agility2));
    const sprintScore = await sails.helpers.score('sprint', parseFloat(req.body.sprint1) + parseFloat(req.body.sprint2));
    const runScore = await sails.helpers.score('run', req.body.run);
    const score = ((parseFloat(jumpScore) + parseFloat(agilityScore) + parseFloat(sprintScore)) / 3).toFixed(1);

    Agility.update({ id: req.param('id') }, {
      anatomyId: req.body.anatomyId,
      jumpHeight: req.body.jumpHeight,
      agility1: req.body.agility1,
      agility2: req.body.agility2,
      sprint1: req.body.sprint1,
      sprint2: req.body.sprint2,
      run: req.body.run,
      jumpScore,
      agilityScore,
      sprintScore,
      runScore,
      score,
    }).exec((err) => {
      if (err) {
        res.send(500, {error: 'Database error'});
      }
      res.redirect('/result/' + id);
    });
  }

};

