const { or, rule, shield } = require('graphql-shield');
const jwt = require('jsonwebtoken');

const isAuthenticated = rule({ cache: 'contextual' })(
    async (parent, args, ctx, info) => {
      const token = ctx.req.headers.authorization;
      if (!token) {
        return false;
      }
      try {
        const decoded = await jwt.verify(token, `${process.env.JWT_SECRET_KET}`);
        ctx.user = decoded;
        return true;
      } catch (error) {
        return false;
      }
    },
  );
  const allowAll = rule({ cache: 'contextual' })(async (parent, args, ctx, info) => {
    return true;
  });
  
  
  const isAdmin = rule({ cache: 'contextual' })(async (parent, args, ctx, info) => {
    const token = ctx.req.headers.authorization;
    if (!token) {
      return false;
    }
    try {
      const decoded = await jwt.verify(token, `${process.env.JWT_SECRET_KET}`);
      ctx.user = decoded;
      return ctx.user.isAdmin;
    } catch (error) {
      return false;
    }
  });
  
  const isDevicesAccess = rule({ cache: 'contextual' })(async (parent, args, ctx, info) => {
    const token = ctx.req.headers.authorization;
    if (!token) {
      return false;
    }
    try {
      const decoded = await jwt.verify(token, `${process.env.JWT_SECRET_KET}`);
      ctx.user = decoded;
      return ctx.user.isDevicesAccess;
    } catch (error) {
      return false;
    }
  });
  
  const isStudentsAccess = rule({ cache: 'contextual' })(async (parent, args, ctx, info) => {
    console.log('isStudentsAccess')
    const token = ctx.req.headers.authorization;
    console.log(token)
    if (!token) {
      return false;
    }
    try {
      const decoded = await jwt.verify(token, `${process.env.JWT_SECRET_KET}`);
      ctx.user = decoded;
      console.log(ctx.user)
      return ctx.user.isStudentsAccess;
    } catch (error) {
      return false;
    }
  });
  
  const isReportsAccess = rule({ cache: 'contextual' })(async (parent, args, ctx, info) => {
    const token = ctx.req.headers.authorization;
    if (!token) {
      return false;
    }
    try {
      const decoded = await jwt.verify(token, `${process.env.JWT_SECRET_KET}`);
      ctx.user = decoded;
      return ctx.user.isReportsAccess;
    } catch (error) {
      return false;
    }
  });
  
  const isLogsAccess = rule({ cache: 'contextual' })(async (parent, args, ctx, info) => {
    const token = ctx.req.headers.authorization;
    if (!token) {
      return false;
    }
    try {
      const decoded = await jwt.verify(token, `${process.env.JWT_SECRET_KET}`);
      ctx.user = decoded;
      return ctx.user.isLogsAccess;
    } catch (error) {
      return false;
    }
  });
  
  const isRolesAccess = rule({ cache: 'contextual' })(async (parent, args, ctx, info) => {
    const token = ctx.req.headers.authorization;
    if (!token) {
      return false;
    }
    try {
      const decoded = await jwt.verify(token, `${process.env.JWT_SECRET_KET}`);
      ctx.user = decoded;
      return ctx.user.isRolesAccess;
    } catch (error) {
      return false;
    }
  });
  
  const isUsersAccess = rule({ cache: 'contextual' })(async (parent, args, ctx, info) => {
    const token = ctx.req.headers.authorization;
    if (!token) {
      return false;
    }
    try {
      const decoded = await jwt.verify(token, `${process.env.JWT_SECRET_KET}`);
      ctx.user = decoded;
      return ctx.user.isUsersAccess;
    } catch (error) {
      return false;
    }
  });
  
  
  
  const permession = shield({
    Query: {
      users: or(isAdmin, isUsersAccess),
      user: or(isAdmin, isUsersAccess),
      roles: or(isAdmin, isRolesAccess),
      role: or(isAdmin, isRolesAccess),
      devices: or(isAdmin, isDevicesAccess),
      device: or(isAdmin, isDevicesAccess),
      students: or(isAdmin, isStudentsAccess),
      student: or(isAdmin, isStudentsAccess),
      studentExperiments: or(isAdmin, isReportsAccess),
      studentExperiment: or(isAdmin, isReportsAccess),
      expriments: isAuthenticated,
      expriment: isAuthenticated,
      admins: isAuthenticated,
      admin: isAuthenticated,
      teams: isAuthenticated,
      team: isAuthenticated,
      classes: isAuthenticated,
      class: isAuthenticated,
      courses: isAuthenticated,
      course: isAuthenticated,
      expriments: isAuthenticated,
      expriment: isAuthenticated,
      chapters: isAuthenticated,
      chapter: isAuthenticated,
      certificates: isAuthenticated,
      certificate: isAuthenticated,
      studentActuallyBegein: isAuthenticated,
      
    },
    Mutation: {
      loginAdmin: allowAll,
      loginUser: allowAll,
      createUser: or(isAdmin, isUsersAccess),
      updateUser: or(isAdmin, isUsersAccess),
      deleteUser: or(isAdmin, isUsersAccess),
      createRole: or(isAdmin, isRolesAccess),
      updateRole: or(isAdmin, isRolesAccess),
      deleteRole: or(isAdmin, isRolesAccess),
      createDevice: or(isAdmin, isDevicesAccess),
      updateDevice: or(isAdmin, isDevicesAccess),
      deleteDevice: or(isAdmin, isDevicesAccess),
      createStudent: or(isAdmin, isStudentsAccess),
      updateStudent: or(isAdmin, isStudentsAccess),
      deleteStudent: or(isAdmin, isStudentsAccess),
      deleteManyStudents: or(isAdmin, isStudentsAccess),
      createStudentExperiment: allowAll,
      updateStudentExperiment: allowAll,
      deleteStudentExperiment: isAdmin,
      createAdmin: allowAll,
      updateAdmin: allowAll,
      deleteAdmin: allowAll,
      createTeam: isAuthenticated,
      updateTeam: isAuthenticated,
      deleteTeam: isAuthenticated,
      createClass: isAuthenticated,
      updateClass: isAuthenticated,
      deleteClass: isAuthenticated,
      createCourse: isAuthenticated,
      updateCourse: isAuthenticated,
      deleteCourse: isAuthenticated,
      createExpriment: isAuthenticated,
      updateExpriment: isAuthenticated,
      deleteExpriment: isAuthenticated,
      createChapter: isAuthenticated,
      updateChapter: isAuthenticated,
      deleteChapter: isAuthenticated,
      createCertificate: isAuthenticated,
      updateCertificate: isAuthenticated,
      deleteCertificate: isAuthenticated,
    },
  })

  module.exports = permession;