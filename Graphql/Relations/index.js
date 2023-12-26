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
    certificatesRelations
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
    ...certificatesRelations
 
  };
  
  module.exports = Relations;
  