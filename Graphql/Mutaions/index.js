const {
    userMuation,
    deviceMutation,
    studentMutations,
    signInOutMutations,
    exprimentMutations,
    StudentExperimentMutations,
    CategoriesMutations,
    StudentCategoryMutations,
    adminMuation,
    roleMuation
  } = require('../../Resolvers');
  
  const Mutation = {
    ...adminMuation,
    ...roleMuation,
    ...userMuation,
    ...deviceMutation,
    ...studentMutations,
    ...signInOutMutations,
    ...exprimentMutations,
    ...StudentExperimentMutations,
    ...CategoriesMutations,
    ...StudentCategoryMutations
  };
  
  module.exports = Mutation;
  