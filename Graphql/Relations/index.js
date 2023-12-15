const {
    userRelation,
    studentRelation,
    deviceRelation,
    signInOutRelation,
    exprimentRelation,
    StudentExperimentRelation,
    StudentCategoryRelation,
    CategoriesRelation,
    adminRelation,
    roleRelation
  } = require('../../Resolvers');
  
  const Relations = {
    ...adminRelation,
    ...userRelation,
    ...roleRelation,
    ...deviceRelation,
    ...studentRelation,
    ...signInOutRelation,
    ...exprimentRelation,
    ...StudentExperimentRelation,
    ...StudentCategoryRelation,
    ...CategoriesRelation
  };
  
  module.exports = Relations;
  