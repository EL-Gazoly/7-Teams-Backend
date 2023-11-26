import {userQuery, deviceQuery, studentQueries,
signInOutQueries, exprimentQueries, StudentExperimentQueries,
CategoriesQueries, StudentCategoryQueries } from '../../Resolvers';
const Query = {
    ...userQuery,
    ...deviceQuery,
    ...studentQueries,
    ...signInOutQueries,
    ...exprimentQueries,
    ...StudentExperimentQueries,
    ...CategoriesQueries,
    ...StudentCategoryQueries
}

export default Query;