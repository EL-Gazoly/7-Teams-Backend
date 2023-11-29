import { userRelation, studentRelation,deviceRelation,
signInOutRelation, exprimentRelation, StudentExperimentRelation,
StudentCategoryRelation, CategoriesRelation, adminRelation ,roleRelation } from "../../Resolvers";
const Relations = {
    ...adminRelation,
    ...userRelation,
    ...roleRelation,
    ...deviceRelation,
    ...studentRelation,
    ...signInOutRelation,
    ...exprimentRelation,
    ...StudentExperimentRelation,
    ...StudentCategoryRelation,
    ...CategoriesRelation
}

export default Relations