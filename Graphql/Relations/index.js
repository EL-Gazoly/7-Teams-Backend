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
    closeAppRelation,
    logRelation,
    schoolRelations,
    MediaRelation 
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
    ...closeAppRelation,
    ...logRelation,
    ...schoolRelations,
    ...MediaRelation
 
  };
  
  module.exports = Relations;
  