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
    CoursesQuery,
    ChapterQueries,
    certificatesQuery,
    closeAppQuery,
    logQueries,
    schoolQuery,

    
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
    ...CoursesQuery,
    ...ChapterQueries,
    ...certificatesQuery,
    ...closeAppQuery,
    ...logQueries,
    ...schoolQuery
  };
  
  module.exports = Query;
  