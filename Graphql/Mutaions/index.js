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
    logMutations,
    schoolMutations,
    MediaMutation
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
    ...logMutations,
    ...schoolMutations,
    ...MediaMutation
    
  };
  
  module.exports = Mutation;
  