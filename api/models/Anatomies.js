/**
 * Anatomies.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    firstName: {
      type: 'string',
    },
    lastName: {
      type: 'string',
    },
    unit: {
      type: 'string',
    },
    peoplesoft: {
      type: 'string',
    },
    height: {
      type: 'number',
      columnType: 'FLOAT'
    },
    weight: {
      type: 'number',
      columnType: 'FLOAT'
    },
    bmi: {
      type: 'number',
      columnType: 'FLOAT'
    },
    fat: {
      type: 'number',
      columnType: 'FLOAT'
    },

    platoon: {
      model: 'platoon',
    },
  },

};

