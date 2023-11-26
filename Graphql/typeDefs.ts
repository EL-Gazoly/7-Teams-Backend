const typeDefs = `#graphql
type Query {
  users: [User!]!
  user(id: String!): User
 
}
scalar DateTime

type Mutation {
  createUser(data: CreateUserInput!): User!
  updateUser(id: String!, data: UpdateUserInput!): User!
  deleteUser(id: String!): User!
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
type Student {
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
type SignInOut{
  id: String!
  studentId: String!
  signInTime: DateTime!
  signOutTime: DateTime
  student: Student!
}
type Expriment{
  ExprimentId: String!
  name: String!
  chapterNumber: Int!
  StudentExpriment: [StudentExperiment!]
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