import {userMuation, deviceMutation, studentMutations,
signInOutMutations, exprimentMutations, StudentExperimentMutations,
CategoriesMutations, StudentCategoryMutations } from '../../Resolvers'
const Mutation = {
    ...userMuation,
    ...deviceMutation,
    ...studentMutations,
    ...signInOutMutations,
    ...exprimentMutations,
    ...StudentExperimentMutations,
    ...CategoriesMutations,
    ...StudentCategoryMutations
}

export default Mutation;