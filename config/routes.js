/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {

  '/': { view: 'pages/homepage' },

  '/results': 'AnatomiesController.list',

  'GET /result/:id': 'AnatomiesController.view',
  'GET /anatomies/edit/:id': 'AnatomiesController.edit',
  'POST /anatomies/update/:id': 'AnatomiesController.update',

  'GET /strength/add/:id': 'StrengthController.add',
  'GET /strength/edit/:id': 'StrengthController.edit',
  'POST /strength/update/:id': 'StrengthController.update',

  'GET /admin/formulas': 'FormulasController.list',
  'GET /admin/formulas/add': 'FormulasController.add',
  'GET /admin/formulas/edit/:id': 'FormulasController.edit',
  'POST /admin/formulas/update/:id': 'FormulasController.update',

};
