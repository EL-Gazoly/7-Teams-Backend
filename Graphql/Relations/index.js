const {
    userRelation,
    studentRelation,
    deviceRelation,
    exprimentRelation,
    StudentExperimentRelation,
    adminRelation,
    roleRelation,
    teamRelation,
    classesRelations,
    ChapterRelations,
    CourseRelation,
    certificatesRelations,
    closeAppRelation
  } = require('../../Resolvers');
  
  const Relations = {
    ...adminRelation,
    ...userRelation,
    ...roleRelation,
    ...deviceRelation,
    ...studentRelation,
    ...exprimentRelation,
    ...StudentExperimentRelation,
    ...teamRelation,
    ...classesRelations,
    ...CourseRelation,
    ...ChapterRelations,
    ...certificatesRelations,
    ...closeAppRelation
 
  };
  
  module.exports = Relations;
  