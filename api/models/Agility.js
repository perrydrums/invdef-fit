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
    jumpScore: {
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
    agilityScore: {
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
    sprintScore: {
      type: 'number',
      columnType: 'FLOAT'
    },
    run: {
      type: 'string',
    },
    runScore: {
      type: 'number',
      columnType: 'FLOAT'
    },
    score: {
      type: 'number',
      columnType: 'FLOAT'
    }
  },

};

