/**
 * AnatomiesController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

  add: async (req, res) => {
    const platoons = await Platoon.find();
    return res.view('anatomies/add', {platoons});
  },

  create: async (req, res) => {
    Anatomies.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      unit: req.body.unit,
      platoon: req.body.platoon,
      peoplesoft: req.body.peoplesoft,
      height: req.body.height,
      weight: req.body.weight,
      bmi: req.body.bmi,
      fat: req.body.fat,
    }).exec((err) => {
      if (err) {
        return res.send(500, {error: 'Database error'});
      }

      Anatomies.find({}).sort({updatedAt:-1}).exec((err, anatomy) => {
        if (err) {
          return res.send(500, {error: 'Database error'});
        }

        return res.redirect('/strength/add/' + anatomy[0].id);
      });
    });
  },

  edit: async (req, res) => {
    const platoons = await Platoon.find();
    const anatomy = await Anatomies.findOne({ id: req.param('id') }).populate('platoon');
    if (anatomy) {
      return res.view('anatomies/edit', { anatomy, platoons });
    }
  },

  update: async (req, res) => {
    const id = req.param('id');

    Anatomies.update({ id }, {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      unit: req.body.unit,
      platoon: req.body.platoon,
      peoplesoft: req.body.peoplesoft,
      height: req.body.height,
      weight: req.body.weight,
      bmi: req.body.bmi,
      fat: req.body.fat,
    }).exec((err) => {
      if (err) {
        return res.send(500, {error: 'Database error'});
      }
      return res.redirect('/result/' + id);
    });
  }

};

