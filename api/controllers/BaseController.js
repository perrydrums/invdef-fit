/**
 * BaseController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

  edit: (req, res) => {
    Anatomies.findOne({ id: req.param('id') }).exec(async (err, anatomy) => {
      if (err) {
        res.send(500, {error: 'Result not found'});
      }

      let results = {};
      results['anatomy'] = anatomy;
      results['strength'] = await Strength.findOne({ anatomyId: anatomy.id }).catch(() => { return null; });

      res.view('edit', { ...results });
    });
  },

};

