/**
 * Agility.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    anatomyId: {
      type: 'number',
    },
    jumpHeight: {
      type: 'float',
    },
    agility1: {
      type: 'float',
    },
    agility2: {
      type: 'float',
    },
    sprint1: {
      type: 'float',
    },
    sprint2: {
      type: 'float',
    },
    run: {
      type: 'string',
    }
  },

};

