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

  create: (req, res) => {
    Agility.create({
      anatomyId: req.body.anatomyId,
      jumpHeight: req.body.jumpHeight,
      agility1: req.body.agility1,
      agility2: req.body.agility2,
      sprint1: req.body.sprint1,
      sprint2: req.body.sprint2,
    }).exec((err) => {
      if (err) {
        res.send(500, {error: 'Database error'});
      }
      Anatomies.find({}).sort({updatedAt:-1}).exec((err, anatomy) => {
        if (err) {
          return res.send(500, {error: 'Database error'});
        }
        return res.redirect('/agility/add/' + anatomy[0].id);
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

  update: (req, res) => {
    const id = req.body.anatomyId;

    Agility.update({ id: req.param('id') }, {
      anatomyId: req.body.anatomyId,
      jumpHeight: req.body.jumpHeight,
      agility1: req.body.agility1,
      agility2: req.body.agility2,
      sprint1: req.body.sprint1,
      sprint2: req.body.sprint2,
    }).exec((err) => {
      if (err) {
        res.send(500, {error: 'Database error'});
      }
      res.redirect('/result/' + id);
    });
  }

};

