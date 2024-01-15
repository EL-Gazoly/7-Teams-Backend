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
    closeAppMutation
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
    ...closeAppMutation
    
  };
  
  module.exports = Mutation;
  