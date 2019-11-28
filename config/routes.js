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

  'GET /results': 'ResultsController.list',
  'GET /result/:id': 'ResultsController.view',
  'POST /results/delete': 'ResultsController.delete',
  'GET /charts/:id': 'ResultsController.charts',

  'GET /platoons': 'PlatoonController.list',
  'GET /platoon/:id': 'PlatoonController.overview',
  'GET /platoon/:id/units': 'PlatoonController.units',

  'GET /anatomies/edit/:id': 'AnatomiesController.edit',
  'POST /anatomies/update/:id': 'AnatomiesController.update',

  'GET /strength/add/:id': 'StrengthController.add',
  'GET /strength/edit/:id': 'StrengthController.edit',
  'POST /strength/update/:id': 'StrengthController.update',

  'GET /agility/add/:id': 'AgilityController.add',
  'GET /agility/edit/:id': 'AgilityController.edit',
  'POST /agility/update/:id': 'AgilityController.update',

  'GET /admin/formulas': 'FormulasController.list',
  'GET /admin/formulas/add': 'FormulasController.add',
  'GET /admin/formulas/edit/:id': 'FormulasController.edit',
  'POST /admin/formulas/update/:id': 'FormulasController.update',
  'POST /formulas/solve': 'FormulasController.solve',

};
