import {userMuation, deviceMutation, studentMutations,
signInOutMutations, exprimentMutations, StudentExperimentMutations } from '../../Resolvers'
const Mutation = {
    ...userMuation,
    ...deviceMutation,
    ...studentMutations,
    ...signInOutMutations,
    ...exprimentMutations,
    ...StudentExperimentMutations
}

export default Mutation;