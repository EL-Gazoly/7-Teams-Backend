const typeDefs = `#graphql
type Query {
  users: [User!]!
  user(id: String!): User
  devices: [Device!]!
  device(id: String!): Device
  students: [Student!]!
  student(id: String!): Student
  signInOuts: [SignInOut!]!
  categories: [Categories!]!
  experiments: [Experiment!]!
  experiment(id: String!): Experiment
  studentExperiments: [StudentExperiment!]!
  studentExperimentsByStudentId(studentId: String!): [StudentExperiment!]!
}
scalar DateTime

type Mutation {
  createUser(data: CreateUserInput!): User!
  updateUser(id: String!, data: UpdateUserInput!): User!
  deleteUser(id: String!): User!
  createDevice(data: CreateDeviceInput!): Device!
  updateDevice(id: String!, data: UpdateDeviceInput!): Device!
  deleteDevice(id: String!): Device!
  createStudent(data: CreateStudentInput!): Student!
  updateStudent(id: String!, data: UpdateStudentInput!): Student!
  deleteStudent(id: String!): Student!
  createSignInOut(data: CreateSignInOutInput!): SignInOut!
  createCategory(data: CreateCategoryInput!): Categories!
  createExperiment(data: CreateExperimentInput!): Experiment!
  createStudentExperiment(data: CreateStudentExperimentInput!): StudentExperiment!
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

type Device {
  deviceId: String!
  name: String!
  macAddress: String!
  createdAt: DateTime!
  updatedAt: DateTime!
  userId: String!
  user: User!
  student: [Student!]!
}

type Student {
  studentId: String!
  name: String!
  facilityId: String!
  role: String!
  imageUrl: String!
  totalTime: Int!
  completedCourses: Int!
  createdAt: DateTime!
  updatedAt: DateTime!
  userId: String!
  user: User!
  signInOut: [SignInOut!]!
  deviceID: String!
  connectedDevice: Device!
  studentExperiment: [StudentExperiment!]
  studentCategories: [StudentCategories!]
}

type SignInOut {
  id: String!
  studentId: String!
  student: Student!
  signIn: DateTime!
  signOut: DateTime
  createdAt: DateTime!
  updatedAt: DateTime!
}

type Categories {
  id: String!
  name: String!
  createdAt: DateTime!
  updatedAt: DateTime!
  studentCategories: [StudentCategories!]
}

type Experiment {
  experimentId: String!
  name: String!
  chapterNumber: Int!
  studentExperiment: [StudentExperiment!]
}

type StudentExperiment {
  id: String!
  studentId: String!
  experimentId: String!
  progress: Float!
  practicalTestGrade: Float!
  theoreticalTestGrade: Float!
  student: Student!
  experiment: Experiment!
  createdAt: DateTime!
  updatedAt: DateTime!
}

type StudentCategories {
  id: String!
  studentId: String!
  categoryId: String!
  student: Student!
  categories: Categories!
  createdAt: DateTime!
  updatedAt: DateTime!
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
  lockedUntil: DateTime
  passwordRetryCount: Int
}

input CreateDeviceInput {
  name: String!
  macAddress: String!
  userId: String!
}

input UpdateDeviceInput {
  name: String
  macAddress: String
  userId: String
}

input CreateStudentInput {
  name: String!
  facilityId: String!
  role: String!
  imageUrl: String!
  userId: String!
  deviceID: String!
}

input UpdateStudentInput {
  name: String
  facilityId: String
  role: String
  imageUrl: String
  userId: String
  deviceID: String
}

input CreateSignInOutInput {
  studentId: String!
  signIn: DateTime!
  signOut: DateTime
}

input CreateCategoryInput {
  name: String!
}

input CreateExperimentInput {
  name: String!
  chapterNumber: Int!
}

input CreateStudentExperimentInput {
  studentId: String!
  experimentId: String!
  progress: Float!
  practicalTestGrade: Float!
  theoreticalTestGrade: Float!
}

`;


export default typeDefs;