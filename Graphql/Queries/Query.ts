import prisma from "../../config/database";
import {userQuery} from '../../Resolvers';
const Query = {
    ...userQuery,
}

export default Query;