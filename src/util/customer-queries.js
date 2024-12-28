module.exports = {


    SearchCustomer : `SELECT TC.customerId, TC.customerName, TC.mobileNumber, TC.alternateNumber, TC.address, 
    CONCAT(U1.userName, '(', U1.userId, ')') AS createdBy, TC.createdDate, TC.status FROM tix_customer TC 
    LEFT JOIN users U1 ON U1.employeeId = TC.createdBy WHERE
    TC.customerName LIKE ? OR TC.mobileNumber LIKE ? OR TC.alternateNumber LIKE ? `,

    GetCustomerNameOrMobile : `SELECT TC.* FROM tix_customer TC WHERE TC.customerId = ? OR (TC.mobileNumber = ? OR REPLACE(TC.customerName, ' ', '') LIKE ?)`,

}