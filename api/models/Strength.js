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
    shoulderPressScore: {
      type: 'number',
      columnType: 'FLOAT'
    },
    squatReps: {
      type: 'number',
    },
    squatWeight: {
      type: 'number',
    },
    squatScore: {
      type: 'number',
      columnType: 'FLOAT'
    },
    pullUpReps: {
      type: 'number',
    },
    pullUpScore: {
      type: 'number',
      columnType: 'FLOAT'
    },
    coreStability: {
      type: 'number',
      columnType: 'FLOAT'
    },
    coreStabilityScore: {
      type: 'number',
      columnType: 'FLOAT'
    },
    score: {
      type: 'number',
      columnType: 'FLOAT'
    },
  },

};

