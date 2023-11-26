import {userMuation, deviceMutation, studentMutations,
signInOutMutations, exprimentMutations } from '../../Resolvers'
const Mutation = {
    ...userMuation,
    ...deviceMutation,
    ...studentMutations,
    ...signInOutMutations,
    ...exprimentMutations
}

export default Mutation;