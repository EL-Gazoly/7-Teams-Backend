import {userQuery, deviceQuery, studentQueries,
signInOutQueries } from '../../Resolvers';
const Query = {
    ...userQuery,
    ...deviceQuery,
    ...studentQueries,
    ...signInOutQueries

}

export default Query;