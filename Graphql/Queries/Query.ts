import {userQuery, deviceQuery, studentQueries} from '../../Resolvers';
const Query = {
    ...userQuery,
    ...deviceQuery,
    ...studentQueries

}

export default Query;