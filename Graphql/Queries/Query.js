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
    certificatesQuery
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
    ...certificatesQuery
  };
  
  module.exports = Query;
  