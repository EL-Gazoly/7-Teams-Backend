import {userQuery, deviceQuery, studentQueries,
signInOutQueries, exprimentQueries, StudentExperimentQueries,
CategoriesQueries, StudentCategoryQueries, adminQuery, roleQuery } from '../../Resolvers';
const Query = {
    ...adminQuery,
    ...roleQuery,
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