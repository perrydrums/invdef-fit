/**
 * Strength.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    anatomyId: {
      type: 'string',
    },
    shoulderPressReps: {
      type: 'number',
    },
    shoulderPressWeight: {
      type: 'number',
    },
    squatReps: {
      type: 'number',
    },
    squatWeight: {
      type: 'number',
    },
    pullUpReps: {
      type: 'number',
    },
    coreStability: {
      type: 'number',
      columnType: 'FLOAT'
    },
  },

};

