module.exports = {

    LoginAuthenticate : `SELECT U.userPwd, U.employeeId FROM users U JOIN usersmedia UM ON U.employeeId = UM.employeeId WHERE U.status = 1 AND (U.employeeId = ? OR UM.emailId = ? OR UM.mobileNo = ?)`
}