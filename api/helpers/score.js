module.exports = {

  friendlyName: 'Get score from 1 to 5 for a certain value.',
  description: 'Get score from 1 to 5 for a certain value.',
  inputs: {
    field: {
      type: 'string',
      required: true,
    },
    result: {
      type: 'number',
      required: true,
    },
  },

  fn: async (inputs) => {

    try {
      const s = await Score.findOne({ field: inputs.field });

      if (!s) { return 0; }

      let score = (inputs.result / s.max * 5).toFixed(1);
      if (score > 5) { score = 5; }
      if (score < 1) { score = 1; }
      return score;
    }
    catch (e) {
      return 0;
    }

  }

};

