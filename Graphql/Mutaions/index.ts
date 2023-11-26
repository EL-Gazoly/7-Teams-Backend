import {userMuation, deviceMutation, studentMutations,
signInOutMutations } from '../../Resolvers'
const Mutation = {
    ...userMuation,
    ...deviceMutation,
    ...studentMutations,
    ...signInOutMutations
}

export default Mutation;