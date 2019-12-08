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

  'GET /companies': 'CompanyController.list',
  'GET /companies/:companyId': 'CompanyController.overview',
  'GET /companies/:companyId/platoons': 'CompanyController.platoons',
  'GET /companies/:companyId/platoons/:platoonId': 'PlatoonController.overview',
  'GET /companies/:companyId/platoons/:platoonId/units': 'PlatoonController.units',

  'GET /anatomies/edit/:id': 'AnatomiesController.edit',
  'POST /anatomies/update/:id': 'AnatomiesController.update',

  'GET /strength/add/:id': 'StrengthController.add',
  'GET /strength/edit/:id': 'StrengthController.edit',
  'POST /strength/update/:id': 'StrengthController.update',

  'GET /agility/add/:id': 'AgilityController.add',
  'GET /agility/edit/:id': 'AgilityController.edit',
  'POST /agility/update/:id': 'AgilityController.update',

  'GET /admin/companies': 'CompanyController.adminList',
  'GET /admin/companies/add': 'CompanyController.add',
  'GET /admin/companies/edit/:id': 'CompanyController.edit',
  'POST /admin/companies/update/:id': 'CompanyController.update',

  'GET /admin/platoons': 'PlatoonController.adminList',
  'GET /admin/platoons/add': 'PlatoonController.add',
  'GET /admin/platoons/edit/:id': 'PlatoonController.edit',
  'POST /admin/platoons/update/:id': 'PlatoonController.update',

  'GET /admin/formulas': 'FormulasController.list',
  'GET /admin/formulas/add': 'FormulasController.add',
  'GET /admin/formulas/edit/:id': 'FormulasController.edit',
  'POST /admin/formulas/update/:id': 'FormulasController.update',
  'POST /formulas/solve': 'FormulasController.solve',

  'GET /admin/score': 'ScoreController.list',
  'GET /admin/score/add': 'ScoreController.add',
  'GET /admin/score/edit/:id': 'ScoreController.edit',
  'POST /admin/score/update/:id': 'ScoreController.update',

};
