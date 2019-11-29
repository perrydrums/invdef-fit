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
      type: 'number',
      columnType: 'FLOAT'
    },
    agility1: {
      type: 'number',
      columnType: 'FLOAT'
    },
    agility2: {
      type: 'number',
      columnType: 'FLOAT'
    },
    sprint1: {
      type: 'number',
      columnType: 'FLOAT'
    },
    sprint2: {
      type: 'number',
      columnType: 'FLOAT'
    },
    run: {
      type: 'string',
    }
  },

};

