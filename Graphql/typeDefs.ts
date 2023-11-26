const typeDefs = `#graphql
type Query {
  users: [User!]!
  user(id: String!): User
  devices: [Device!]!
  device(id: String!): Device
  students: [Student!]!
  student(id: String!): Student
  signInOuts: [SignInOut!]!
  signInOut(id: String!): SignInOut
  expriments: [Expriment!]!
  expriment(id: String!): Expriment
 
}
scalar DateTime

type Mutation {
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
}

type User {
  id: String!
  name: String!
  email: String!
  hashedPassword: String!
  role: String!
  isLocked: Boolean
  LockedUntil: DateTime
  passwordRetryCount: Int
  createdAt: DateTime
  updatedAt: DateTime
  devices: [Device!]
  student: [Student!]
}

input CreateUserInput {
  name: String!
  email: String!
  hashedPassword: String!
  role: String!
  isLocked: Boolean
  LockedUntil: DateTime
  passwordRetryCount: Int
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
  userId: String!
  user: User!
  student: [Student!]
}
input CreateDeviceInput {
  generatedId: Int
  name: String!
  macAddress: String!
  userId: String!

}

input UpdateDeviceInput {
  name: String
  macAddress: String
  userId: String
}

type Student {
  generatedId: Int!
  studentId: String!
  name: String!
  facilityId: String!
  imageUrl: String
  TotalTime: Int
  completedCourses: Int
  userId: String!
  user: User!
  deviceId: String
  signInOUT: [SignInOut!]
  connectDevice: Device
  studnetExpriment: [StudentExperiment!]
  studentCategories: [StudentCategory!]
}
input CreateStudentInput {
  name: String!
  facilityId: String!
  imageUrl: String
  TotalTime: Int
  completedCourses: Int
  userId: String!
  deviceId: String
}
input UpdateStudentInput {
  name: String
  facilityId: String
  imageUrl: String
  TotalTime: Int
  completedCourses: Int
  userId: String
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
type Categories{
  id: String!
  name: String!
  StudentCategory: [StudentCategory!]
}

type StudentCategory{
  id: String!
  studentId: String!
  categoryId: String!
  student: Student!
  categories: Categories!
  progress: Float!
  practicalTestGrade: Float!
  theoreticalTestGrade: Float!
}




`;


export default typeDefs;