import {userMuation, deviceMutation, studentMutations} from '../../Resolvers'
const Mutation = {
    ...userMuation,
    ...deviceMutation,
    ...studentMutations
}

export default Mutation;