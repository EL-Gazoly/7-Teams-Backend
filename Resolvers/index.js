const {
     adminQuery,
     adminMuation,
     adminRelation
   } = require("./Admin/index.js");
   
   const {
     userMuation,
     userQuery,
     userRelation
   } = require("./User/index.js");
   
   const {
     roleQuery,
     roleMuation,
     roleRelation
   } = require("./Role/index.js");
   
   const {
     deviceMutation,
     deviceQuery,
     deviceRelation
   } = require("./Device/index.js");
   
   const {
     studentQueries,
     studentMutations,
     studentRelation
   } = require('./Student/index.js');
   
   const {
     exprimentQueries,
     exprimentMutations,
     exprimentRelation
   } = require("./Expriment/index.js");
   
   const {
     StudentExperimentQueries,
     StudentExperimentMutations,
     StudentExperimentRelation
   } = require("./StudentExpriments/index.js");

   const {
      teamQuery,
      teamMutation,
      teamRelation
   } = require('./Teams/index.js')
   
   const sendEmailService = require("./Email/index.js");

   const {
      ClassesQueries,
      ClassesMutations,
      classesRelations

   } = require('./Classes/index.js')

  const {
    ChapterQueries,
    ChapterMutations,
    ChapterRelations
    
  } = require('./Chapters/index.js')

  const {
    CoursesQuery,
    CourseRelation,
    CourseMutation
  }= require('./Courses/index.js')
   
   module.exports = {
     adminQuery,
     adminMuation,
     adminRelation,
   
     userMuation,
     userQuery,
     userRelation,
   
     roleQuery,
     roleMuation,
     roleRelation,
   
     deviceMutation,
     deviceQuery,
     deviceRelation,
   
     studentQueries,
     studentMutations,
     studentRelation,
   
     exprimentQueries,
     exprimentMutations,
     exprimentRelation,
   
     StudentExperimentQueries,
     StudentExperimentMutations,
     StudentExperimentRelation,

      teamQuery,
      teamMutation,
      teamRelation,

      ClassesQueries,
      ClassesMutations,
      classesRelations,

      CoursesQuery,
      CourseRelation,
      CourseMutation,

      ChapterQueries,
      ChapterMutations,
      ChapterRelations,
   
      sendEmailService
   };
   