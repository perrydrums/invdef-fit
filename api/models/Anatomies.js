/**
 * Anatomies.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    name: {
      type: 'string',
    },
    height: {
      type: 'float',
    },
    weight: {
      type: 'float',
    },
    bmi: {
      type: 'float',
    },
    fat: {
      type: 'float',
    }
  },

};

