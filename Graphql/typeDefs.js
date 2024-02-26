const typeDefs = `#graphql
type Query {
  admins: [Admin!]!
  admin: Admin
  users: [User!]!
  user(id: String!): User 
  roles: [Role!]!
  role(id: String!): Role
  devices: [Device!]!
  device(id: String!): Device
  deviceByMac(macAddress: String!): Device
  students: [Student!]!
  student(studentId: String!): Student
  studentByGeneratedId(generatedId: String!): Student
  expriments: [Expriment!]!
  expriment(id: String!): Expriment
  studentExperiments: StudentExperimentDates
  studentExperiment(studentId: String!, exprimentId: String!): StudentExperiment
  teams: [Teams!]!
  team(id: String!): Teams
  classes: [Classes!]!
  class(id: String!): Classes
  courses: [Courses!]!
  course(id: String!): Courses
  chapters: [Chapters!]!
  chapter(id: String!): Chapters
  certificates: [Certificates!]!
  certificate(id: String!): Certificates
  timeByMonth: [Int]
  studentActuallyBegein: [Int]
  closeApps: [CloseApp!]!
  closeApp(id: String!): CloseApp
  
  StudentExpermientByPeriod(studentId: String!) :StudentExperimentDates

  logs(skip: Int, take: Int): [Logs!]!
  logsCount: Int
  log(logId: String!): Logs
  schools: [School!]!
  school(schoolId: String!): School
 
}
scalar DateTime

type Mutation {
  createAdmin(data: CreateAdminInput!): Admin!
  updateAdmin(id: String!, data: UpdateAdminInput!): Admin!
  deleteAdmin(id: String!): Admin!
  loginAdmin(email: String!, password: String!, deviceMacAddress: String, deviceName: String): Admin!
  createUser(data: CreateUserInput!, image: Upload): User!
  updateUser(id: String!, data: UpdateUserInput!, image: Upload): User!
  deleteUser(id: String!): User!
  loginUser(email: String!, hashedPassword: String!): User!
  createDevice(data: CreateDeviceInput!): Device!
  updateDevice(id: String!, data: UpdateDeviceInput!): Device!
  deleteDevice(id: String!): Device!
  createStudent(data: CreateStudentInput!, image: Upload) : Student!
  updateStudent(id: String!, data: UpdateStudentInput!): Student!
  deleteStudent(id: String!): Student!
  deleteManyStudents(ids: [String!]!): [Student!]!
  createExpriment(data: CreateExprimentInput!): Expriment!
  updateExpriment(id: String!, data: UpdateExprimentInput!): Expriment!
  deleteExpriment(id: String!): Expriment!
  createStudentExperiment(data: CreateStudentExperimentInput!): StudentExperiment!
  updateStudentExperiment( data: UpdateStudentExperimentInput!): StudentExperiment!
  deleteStudentExperiment(id: String!): StudentExperiment!
  createRole(data: CreateRoleInput!): Role!
  updateRole(id: String!, data: UpdateRoleInput!): Role!
  deleteRole(id: String!): Role!
  createTeam(data: CreateTeamInput!): Teams!
  updateTeam(id: String!, data: UpdateTeamInput!): Teams!
  deleteTeam(id: String!): Teams!
  createClass(data: CreateClassInput!): Classes!
  updateClass(id: String!, data: UpdateClassInput!): Classes!
  deleteClass(id: String!): Classes!
  createCourse(data: CreateCourseInput!): Courses!
  updateCourse(id: String!, data: UpdateCourseInput!): Courses!
  deleteCourse(id: String!): Courses!
  createChapter(data: CreateChapterInput!): Chapters!
  updateChapter(id: String!, data: UpdateChapterInput!): Chapters!
  deleteChapter(id: String!): Chapters!
  createCertificate(data: CreateCertificateInput!): Certificates!
  updateCertificate(id: String!, data: UpdateCertificateInput!): Certificates!
  deleteCertificate(id: String!): Certificates!

  loginStudent(generatedId: String!, password: String, macAddress: String!): Student!
  logoutStudent(generatedId: String!, macAddress: String!): Student!

  sendEmail(email: String!, certificate: Upload): String
  uploadStudentByExcel(file: Upload): Int
  createCloseApp(data: CloseAppInput!): CloseApp!
  updateCloseApp(id: String!, data: CloseAppInput!): CloseApp!
  deleteCloseApp(id: String!): CloseApp!
  createLog(data: CreateLogInput!): Logs!
  updateLog(logId: String!, data: CreateLogInput!): Logs!
  deleteLog(logId: String!): Logs!
  createSchool(data: CreateSchoolInput!): School
  updateSchool(schoolId:String ,name: String!): School
  deleteSchool(schoolId:String):School
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
  students: [Student!]
  users: [User!]
  roles: [Role!]
  token: String
  Team: [Teams!]
  closeApps: [CloseApp!]
  logs: [Logs!]
  schools: [School!]

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
  token: String
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
  isCoursesAccsess: Boolean
  isCertificatesAccess: Boolean
  isDashboardAccess: Boolean
  isLibraryAccess: Boolean
  token: String
}

input CreateRoleInput {
  name: String!
  isDevicesAccess: Boolean 
  isStudentsAccess: Boolean 
  isReportsAccess: Boolean 
  isLogsAccess: Boolean 
  isRolesAccess: Boolean 
  isUsersAccess: Boolean 
  isCoursesAccsess: Boolean
  isCertificatesAccess: Boolean
  isDashboardAccess: Boolean
  isLibraryAccess: Boolean
}

input UpdateRoleInput {
  name: String
  isDevicesAccess: Boolean 
  isStudentsAccess: Boolean 
  isReportsAccess: Boolean 
  isLogsAccess: Boolean 
  isRolesAccess: Boolean 
  isUsersAccess: Boolean
  isCoursesAccsess: Boolean
  isCertificatesAccess: Boolean
  isDashboardAccess: Boolean
  isLibraryAccess: Boolean
  token: String
}

type User {
  id: String!
  name: String!
  email: String!
  imageUrl: String
  hashedPassword: String!
  isLocked: Boolean
  LockedUntil: DateTime
  passwordRetryCount: Int
  adminId: String!
  admin: Admin!
  students: [Student!]
  devices: [Device!]
  roleId: String!
  roles: Role
  createdAt: DateTime
  updatedAt: DateTime
  token: String
  logs: [Logs!]
 
}

input CreateUserInput {
  name: String!
  email: String!
  hashedPassword: String!
  imageUrl: String
  roleId: String!
  isLocked: Boolean
  LockedUntil: DateTime
  passwordRetryCount: Int
  adminId: String
}

input UpdateUserInput {
  name: String
  email: String
  imageUrl: String
  hashedPassword: String
  roleId: String
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
scalar Upload

type Student {
  generatedId: Int!
  studentId: String!
  name: String!
  facilityId: String!
  imageUrl: String
  adminId: String!
  admin: Admin!
  deviceId: String
  device: Device
  teamId: String
  team: Teams
  classId: String
  class: Classes
  certificates: [Certificates!]
  studnetExpriment: [StudentExperiment!]
  closeApps: [CloseApp!]
  classalpha: String
  schoolName: String
  password: String
}

input CreateStudentInput {
  name: String!
  facilityId: String!
  imageUrl: String
  teamId: String
  classId: String
}
input UpdateStudentInput {
  name: String
  facilityId: String
  imageUrl: String
  TotalTime: Int
  completedCourses: Int
  adminId: String
  deviceId: String
  teamId: String
  classId: String
  password: String
}

type Expriment{
  exprimentId: String!
  name: String!
  chapterId: String!
  chapter: Chapters!
  StudentExpriment: [StudentExperiment!]
}
input CreateExprimentInput {
  name: String!
  chapterId: String!
}
input UpdateExprimentInput {
  name: String
  chapterId: Int
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
  enterTraining: Int
  enterTheortical: Int
  enterPratical: Int
  totalTrainingTime: Int 
  totalTheorticalTime: Int
  totalPraticalTime: Int
  createdAt: DateTime!
  updatedAt: DateTime!
}
type StudentExperimentDates {
  expriemntsByDay: [StudentExperiment!]
  expriementsByMonth: [StudentExperiment!]
  expriementsByYear: [StudentExperiment!]
}

input CreateStudentExperimentInput {
  studentId: String!
  exprimentId: String!
  progress: Float
  practicalTestGrade: Float
  theoreticalTestGrade: Float
  enterTraining: Int
  enterTheortical: Int
  enterPratical: Int
  totalTrainingTime: Int 
  totalTheorticalTime: Int
  totalPraticalTime: Int
}
input UpdateStudentExperimentInput {
  studentId: String
  exprimentId: String
  progress: Float
  practicalTestGrade: Float
  theoreticalTestGrade: Float
  enterTraining: Int
  enterTheortical: Int
  enterPratical: Int
  totalTrainingTime: Int 
  totalTheorticalTime: Int
  totalPraticalTime: Int
}
type Teams{
  teamId: String!
  name: String!
  students: [Student!]!
  classes: [Classes!]!
  adminId: String!
  admin: Admin!
  schoolId: String!
  school: School
}

input CreateTeamInput {
  name: String!
  schoolId: String!
}
input UpdateTeamInput {
  name: String
  schoolId: String!
}

type Classes{
  classId: String!
  number: String!
  students: [Student!]!
  courses: [Courses!]!
  teamId: String!
  team: Teams!
}
input CreateClassInput {
  number: String!
  teamId: String!
}
input UpdateClassInput {
  number: String
  teamId: String
}

type Courses{
  courseId: String!
  name: String!
  teamId: String!
  team: Teams!
  classId: String!
  class: Classes!
  chapters: [Chapters!]!

}

input CreateCourseInput {
  name: String!
  teamId: String!
  classId: String!
}
input UpdateCourseInput {
  name: String
  teamId: String
  classId: String
}

type Chapters{
  chapterId: String!
  name: String!
  courseId: String!
  course: Courses!
  expriments: [Expriment!]
}
input CreateChapterInput {
  name: String!
  courseId: String!
}
input UpdateChapterInput {
  name: String
  courseId: String
}
type Certificates{
  id: String!
  studentId: String!
  student: Student!
  createdAt: DateTime!
  updatedAt: DateTime!
}
input CreateCertificateInput {
  studentId: String!
}
input UpdateCertificateInput {
  studentId: String
}

type CloseApp {
  closeAppId: String!
  studentId: String!
  student: Student!
  adminId: String!
  admin: Admin!
  reason: String!
  createdAt: DateTime!
  updatedAt: DateTime!
}
input CloseAppInput {
  studentId: String!
  reason: String!
}

type Logs {
  logId: String!
  adminId: String!
  admin: Admin!
  userId: String!
  user: User
  action: String!
  createdAt: DateTime!
  updatedAt: DateTime!
}

input CreateLogInput {
  action: String!
}
type School {
  schoolId: String!
  name: String!
  teams: [Teams!]
  adminId: String
  admin: Admin
}

input CreateSchoolInput {
  name: String
}




`;


module.exports = typeDefs;