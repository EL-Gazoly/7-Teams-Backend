const typeDefs = `#graphql
type Query {
  admins: [Admin!]!
  admin(id: String!): Admin
  users: [User!]!
  user(id: String!): User
  roles: [Role!]!
  role(id: String!): Role
  devices: [Device!]!
  device(id: String!): Device
  students: [Student!]!
  student(id: String!): Student
  signInOuts: [SignInOut!]!
  signInOut(id: String!): SignInOut
  expriments: [Expriment!]!
  expriment(id: String!): Expriment
  studentExperiments: [StudentExperiment!]!
  studentExperiment(id: String!): StudentExperiment
  categories: [Categories!]!
  category(id: String!): Categories
  studentCategories: [StudentCategory!]!
  studentCategory(id: String!): StudentCategory
 
}
scalar DateTime

type Mutation {
  createAdmin(data: CreateAdminInput!): Admin!
  updateAdmin(id: String!, data: UpdateAdminInput!): Admin!
  deleteAdmin(id: String!): Admin!
  createUser(data: CreateUserInput!): User!
  updateUser(id: String!, data: UpdateUserInput!): User!
  deleteUser(id: String!): User!
  createDevice(data: CreateDeviceInput!): Device!
  updateDevice(id: String!, data: UpdateDeviceInput!): Device!
  deleteDevice(id: String!): Device!
  createStudent(data: CreateStudentInput!) : Student!
  updateStudent(id: String!, data: UpdateStudentInput!): Student!
  deleteStudent(id: String!): Student!
  deleteManyStudents(ids: [String!]!): [Student!]!
  createSignInOut(data: CreateSignInOutInput!): SignInOut!
  updateSignInOut(id: String!, data: UpdateSignInOutInput!): SignInOut!
  deleteSignInOut(id: String!): SignInOut!
  createExpriment(data: CreateExprimentInput!): Expriment!
  updateExpriment(id: String!, data: UpdateExprimentInput!): Expriment!
  deleteExpriment(id: String!): Expriment!
  createStudentExperiment(data: CreateStudentExperimentInput!): StudentExperiment!
  updateStudentExperiment(id: String!, data: UpdateStudentExperimentInput!): StudentExperiment!
  deleteStudentExperiment(id: String!): StudentExperiment!
  createCategories(data: CreateCategoriesInput!): Categories!
  updateCategories(id: String!, data: UpdateCategoriesInput!): Categories!
  deleteCategories(id: String!): Categories!
  createStudentCategory(data: CreateStudentCategoryInput!): StudentCategory!
  updateStudentCategory(id: String!, data: UpdateStudentCategoryInput!): StudentCategory!
  deleteStudentCategory(id: String!): StudentCategory!
  createRole(data: CreateRoleInput!): Role!
  updateRole(id: String!, data: UpdateRoleInput!): Role!
}

type Admin {
  id: String!
  name: String!
  email: String!
  hashedPassword: String!
  isLocked: Boolean
  LockedUntil: DateTime
  passwordRetryCount: Int
  createdAt: DateTime
  updatedAt: DateTime
  devices: [Device!]
  student: [Student!]
  users: [User!]
  roles: [Role!]

}

input CreateAdminInput {
  name: String!
  email: String!
  hashedPassword: String!
  isLocked: Boolean
  LockedUntil: DateTime
  passwordRetryCount: Int
}

input UpdateAdminInput {
  name: String
  email: String
  hashedPassword: String
  isLocked: Boolean
  LockedUntil: DateTime
  passwordRetryCount: Int
}

type Role {
  id: String!
  name: String!
  users: [User!]
  adminId: String!
  admin: Admin!
  isDevicesAccess: Boolean 
  isStudentsAccess: Boolean 
  isReportsAccess: Boolean 
  isLogsAccess: Boolean 
  isRolesAccess: Boolean 
  isUsersAccess: Boolean 
}

input CreateRoleInput {
  name: String!
  adminId: String!
  isDevicesAccess: Boolean 
  isStudentsAccess: Boolean 
  isReportsAccess: Boolean 
  isLogsAccess: Boolean 
  isRolesAccess: Boolean 
  isUsersAccess: Boolean 
}

input UpdateRoleInput {
  name: String
  isDevicesAccess: Boolean 
  isStudentsAccess: Boolean 
  isReportsAccess: Boolean 
  isLogsAccess: Boolean 
  isRolesAccess: Boolean 
  isUsersAccess: Boolean
}

type User {
  id: String!
  name: String!
  email: String!
  hashedPassword: String!
  isLocked: Boolean
  LockedUntil: DateTime
  passwordRetryCount: Int
  adminId: String!
  admin: Admin!
  roleId: String!
  role: String!
  createdAt: DateTime
  updatedAt: DateTime
 
}

input CreateUserInput {
  name: String!
  email: String!
  hashedPassword: String!
  role: String!
  isLocked: Boolean
  LockedUntil: DateTime
  passwordRetryCount: Int
  adminId: String!
}

input UpdateUserInput {
  name: String
  email: String
  hashedPassword: String
  role: String
  isLocked: Boolean
  LockedUntil: DateTime
  passwordRetryCount: Int
}

type Device {
  deviceId: String!
  name: String!
  macAddress: String!
  adminId: String!
  admin: Admin!
  studentId: String
  student: [Student!]
}
input CreateDeviceInput {
  name: String!
  macAddress: String!
  adminId: String!
}

input UpdateDeviceInput {
  name: String
  macAddress: String
  adminId: String
  studentId: String
}

type Student {
  generatedId: Int!
  studentId: String!
  name: String!
  facilityId: String!
  imageUrl: String
  TotalTime: Int
  completedCourses: Int
  adminId: String!
  admin: Admin!
  deviceId: String
  signInOUT: [SignInOut!]
  device: Device
  studnetExpriment: [StudentExperiment!]
  studentCategories: [StudentCategory!]
}
input CreateStudentInput {
  name: String!
  facilityId: String!
  imageUrl: String
  TotalTime: Int
  completedCourses: Int
  adminId: String!
  deviceId: String
}
input UpdateStudentInput {
  name: String
  facilityId: String
  imageUrl: String
  TotalTime: Int
  completedCourses: Int
  adminId: String
  deviceId: String

}
type SignInOut{
  id: String!
  studentId: String!
  signIn: DateTime!
  signOut: DateTime
  student: Student!
}
input CreateSignInOutInput {
  studentId: String!
  signIn: DateTime!
  signOut: DateTime
}
input UpdateSignInOutInput {
  studentId: String
  signIn: DateTime
  signOut: DateTime
}
type Expriment{
  ExprimentId: String!
  name: String!
  chatperNumber: Int!
  StudentExpriment: [StudentExperiment!]
}
input CreateExprimentInput {
  name: String!
  chatperNumber: Int!
}
input UpdateExprimentInput {
  name: String
  chatperNumber: Int
}
type StudentExperiment{
  id: String!
  studentId: String!
  exprimentId: String!
  student: Student!
  expriment: Expriment!
  progress: Float!
  practicalTestGrade: Float!
  theoreticalTestGrade: Float!
}
input CreateStudentExperimentInput {
  studentId: String!
  exprimentId: String!
  progress: Float
  practicalTestGrade: Float
  theoreticalTestGrade: Float
}
input UpdateStudentExperimentInput {
  studentId: String
  exprimentId: String
  progress: Float
  practicalTestGrade: Float
  theoreticalTestGrade: Float
}
type Categories{
  id: String!
  name: String!
  StudentCategory: [StudentCategory!]
}
input CreateCategoriesInput {
  name: String!
}
input UpdateCategoriesInput {
  name: String
}

type StudentCategory{
  id: String!
  studentId: String!
  categoryId: String!
  student: Student!
  categories: Categories!
  classNumber: Int!
}
input CreateStudentCategoryInput {
  studentId: String!
  categoryId: String!
  classNumber: Int!
}
input UpdateStudentCategoryInput {
  studentId: String
  categoryId: String
  classNumber: Int
}





`;


export default typeDefs;