/**
 * AnatomiesController
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

      return res.view('result', { ...results });
    });
  },

  add: (req, res) => {
    return res.view('anatomies/add');
  },

  create: (req, res) => {
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

  delete: (req, res) => {
    Anatomies.destroy({id: req.body.id}).exec(async (err) => {
      if (err) {
        return res.send(500, {error: 'Database error'});
      }

      await Strength.destroy({ anatomyId: req.body.id }).catch(() => { return null; });

      return res.redirect('/anatomies/list');
    });
  },

  edit: (req, res) => {
    Anatomies.findOne({id: req.param('id')}).exec((err, anatomy) => {
      if (err) {
        return res.send(500, {error: 'Database error'});
      }
      return res.view('anatomies/edit', { anatomy });
    });
  },

  update: (req, res) => {
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

