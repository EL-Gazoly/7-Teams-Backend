import {userQuery, deviceQuery, studentQueries,
signInOutQueries, exprimentQueries, StudentExperimentQueries } from '../../Resolvers';
const Query = {
    ...userQuery,
    ...deviceQuery,
    ...studentQueries,
    ...signInOutQueries,
    ...exprimentQueries,
    ...StudentExperimentQueries

}

export default Query;