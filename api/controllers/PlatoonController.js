/**
 * PlatoonController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

  list: async (req, res) => {
    const platoons = await Platoon.find();
    return res.view('platoon/list', { platoons });
  },

  units: async (req, res) => {
    const anatomies = await Anatomies.find({ platoon: req.params.id }).populate('platoon');
    return res.view('platoon/units', { anatomies });
  },

};

