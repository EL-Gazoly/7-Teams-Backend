import {userMuation, deviceMutation} from '../../Resolvers'
const Mutation = {
    ...userMuation,
    ...deviceMutation
}

export default Mutation;