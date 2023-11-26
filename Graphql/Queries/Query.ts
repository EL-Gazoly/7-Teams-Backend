import {userQuery, deviceQuery, studentQueries,
signInOutQueries, exprimentQueries, StudentExperimentQueries,
CategoriesQueries } from '../../Resolvers';
const Query = {
    ...userQuery,
    ...deviceQuery,
    ...studentQueries,
    ...signInOutQueries,
    ...exprimentQueries,
    ...StudentExperimentQueries,
    ...CategoriesQueries
}

export default Query;