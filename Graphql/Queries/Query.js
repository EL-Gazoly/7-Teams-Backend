const {
    userQuery,
    deviceQuery,
    studentQueries,
    exprimentQueries,
    StudentExperimentQueries,
    adminQuery,
    roleQuery,
    teamQuery,
    ClassesQueries,
    ChapterQueries
  } = require('../../Resolvers');
  
  const Query = {
    ...adminQuery,
    ...roleQuery,
    ...userQuery,
    ...deviceQuery,
    ...studentQueries,
    ...exprimentQueries,
    ...StudentExperimentQueries,
    ...teamQuery,
    ...ClassesQueries,
    ...ChapterQueries
  };
  
  module.exports = Query;
  