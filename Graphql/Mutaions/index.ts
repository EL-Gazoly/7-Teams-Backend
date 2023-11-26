import {userMuation, deviceMutation, studentMutations,
signInOutMutations, exprimentMutations, StudentExperimentMutations,
CategoriesMutations } from '../../Resolvers'
const Mutation = {
    ...userMuation,
    ...deviceMutation,
    ...studentMutations,
    ...signInOutMutations,
    ...exprimentMutations,
    ...StudentExperimentMutations,
    ...CategoriesMutations
}

export default Mutation;