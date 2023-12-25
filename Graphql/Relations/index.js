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
    ChapterRelations
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
    ...ChapterRelations
 
  };
  
  module.exports = Relations;
  