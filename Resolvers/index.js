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
     signInOutQueries,
     signInOutMutations,
     signInOutRelation
   } = require('./SingInOut/index.js');
   
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
     CategoriesQueries,
     CategoriesMutations,
     CategoriesRelation
   } = require("./Categories/index.js");
   
   const {
     StudentCategoryQueries,
     StudentCategoryMutations,
     StudentCategoryRelation
   } = require("./StudentCategory/index.js");
   
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
   
     signInOutQueries,
     signInOutMutations,
     signInOutRelation,
   
     exprimentQueries,
     exprimentMutations,
     exprimentRelation,
   
     StudentExperimentQueries,
     StudentExperimentMutations,
     StudentExperimentRelation,
   
     CategoriesQueries,
     CategoriesMutations,
     CategoriesRelation,
   
     StudentCategoryQueries,
     StudentCategoryMutations,
     StudentCategoryRelation
   };
   