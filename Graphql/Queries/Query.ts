import {userQuery, deviceQuery, studentQueries,
signInOutQueries, exprimentQueries } from '../../Resolvers';
const Query = {
    ...userQuery,
    ...deviceQuery,
    ...studentQueries,
    ...signInOutQueries,
    ...exprimentQueries

}

export default Query;