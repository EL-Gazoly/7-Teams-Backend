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
    ...CoursesQuery,
    ...ChapterQueries
  };
  
  module.exports = Query;
  