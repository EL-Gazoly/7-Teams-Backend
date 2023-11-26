import prisma from "../../config/database";
import {userQuery, deviceQuery} from '../../Resolvers';
const Query = {
    ...userQuery,
    ...deviceQuery

}

export default Query;