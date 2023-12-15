const {
    userQuery,
    deviceQuery,
    studentQueries,
    signInOutQueries,
    exprimentQueries,
    StudentExperimentQueries,
    CategoriesQueries,
    StudentCategoryQueries,
    adminQuery,
    roleQuery
  } = require('../../Resolvers');
  
  const Query = {
    ...adminQuery,
    ...roleQuery,
    ...userQuery,
    ...deviceQuery,
    ...studentQueries,
    ...signInOutQueries,
    ...exprimentQueries,
    ...StudentExperimentQueries,
    ...CategoriesQueries,
    ...StudentCategoryQueries
  };
  
  module.exports = Query;
  