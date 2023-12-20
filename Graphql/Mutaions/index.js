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
    roleMuation,
    sendEmailService
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
    ...StudentCategoryMutations,
    ...sendEmailService
  };
  
  module.exports = Mutation;
  