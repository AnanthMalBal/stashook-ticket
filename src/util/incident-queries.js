module.exports = {

    SearchIncident : `SELECT TI.incidentId, CB.cookId, CB.cookBookName, CAT.categoryName, CST.customerName, CST.mobileNumber, CST.alternateNumber, CST.address, 
    TI.supportType, TI.description, TI.createdDate, TI.modifiedDate, TI.taskStatus, TI.taskDuration, TI.priority, CONCAT(U1.userName, '(', U1.userId, ')') AS createdBy, 
    CONCAT(U2.userName, '(', U2.userId, ')') AS modifiedBy 
    FROM tix_incident TI 
    LEFT JOIN tix_cook_book CB  ON CB.cookId = TI.cookId   
    LEFT JOIN tix_category  CAT ON CB.categoryId = CAT.categoryId 
    LEFT JOIN tix_customer  CST ON CST.customerId = TI.customerId 
    LEFT JOIN users U1 ON U1.employeeId = TI.createdBy 
    LEFT JOIN users U2 ON U2.employeeId = TI.modifiedBy 
    WHERE CB.cookBookName LIKE ? OR CST.customerName LIKE ? OR CST.mobileNumber LIKE ? OR CST.alternateNumber LIKE ? OR CAT.categoryName LIKE ? OR TI.description LIKE ? `,

    UpdateIncident : `UPDATE tix_incident SET cookId= ?, supportType = ?, priority = ?, description = ?, taskStatus = ?, taskDuration = ?, modifiedBy = ?, modifiedDate = ? WHERE incidentId = ?`,

    MessageUserGroup : `SELECT * FROM tix_media_group WHERE status = 1 AND mediaType = ? AND groupName = ? `,

    GetIncident : `SELECT TI.incidentId, CB.cookId, CB.cookBookName, CAT.categoryName, CST.customerId, CST.customerName, CST.mobileNumber, CST.alternateNumber, 
    CST.address, TI.supportType, TI.description, TI.taskStatus, TI.taskDuration, TI.priority, CONCAT(U1.userName, '(', U1.userId, ')') AS modifiedBy, TI.modifiedDate 
    FROM tix_incident TI 
    LEFT JOIN tix_cook_book CB  ON CB.cookId = TI.cookId   
    LEFT JOIN tix_category  CAT ON CB.categoryId = CAT.categoryId 
    LEFT JOIN tix_customer  CST ON CST.customerId = TI.customerId 
    LEFT JOIN users U1 ON U1.employeeId = TI.modifiedBy 
    WHERE  TI.incidentId = ?`,

}