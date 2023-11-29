import {userMuation, deviceMutation, studentMutations,
signInOutMutations, exprimentMutations, StudentExperimentMutations,
CategoriesMutations, StudentCategoryMutations, adminMuation, roleMuation } from '../../Resolvers'
const Mutation = {
    ...adminMuation,
    ...roleMuation,
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