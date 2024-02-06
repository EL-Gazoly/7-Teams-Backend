const {
    userMuation,
    deviceMutation,
    studentMutations,
    exprimentMutations,
    StudentExperimentMutations,
    adminMuation,
    roleMuation,
    sendEmailService,
    teamMutation,
    ClassesMutations,
    ChapterMutations,
    CourseMutation,
    certificatesMutation,
    closeAppMutation,
    logMutations
  } = require('../../Resolvers');
  
  const Mutation = {
    ...adminMuation,
    ...roleMuation,
    ...userMuation,
    ...deviceMutation,
    ...studentMutations,
    ...exprimentMutations,
    ...StudentExperimentMutations,
    ...sendEmailService,
    ...teamMutation,
    ...ClassesMutations,
    ...CourseMutation,
    ...ChapterMutations,
    ...certificatesMutation,
    ...closeAppMutation,
    ...logMutations
    
  };
  
  module.exports = Mutation;
  