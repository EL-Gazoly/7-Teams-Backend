import { userRelation, studentRelation,deviceRelation,
signInOutRelation, exprimentRelation, StudentExperimentRelation,
StudentCategoryRelation, CategoriesRelation } from "../../Resolvers";
const Relations = {
    ...userRelation,
    ...deviceRelation,
    ...studentRelation,
    ...signInOutRelation,
    ...exprimentRelation,
    ...StudentExperimentRelation,
    ...StudentCategoryRelation,
    ...CategoriesRelation
}

export default Relations