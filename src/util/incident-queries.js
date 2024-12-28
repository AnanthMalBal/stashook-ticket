module.exports = {

    SearchIncident : `SELECT INC.incidentId, CB.cookId, CB.cookBookName, CAT.categoryName, CST.customerName, CST.mobileNumber, CST.alternateNumber, CST.address, 
    INC.supportType, INC.description, INC.createdDate, INC.modifiedDate, INC.taskStatus, INC.taskDuration, CONCAT(U1.userName, '(', U1.userId, ')') AS createdBy, 
    CONCAT(U2.userName, '(', U2.userId, ')') AS modifiedBy 
    FROM tix_incident INC 
    LEFT JOIN tix_cook_book CB  ON CB.cookId = INC.cookId   
    LEFT JOIN tix_category  CAT ON CB.categoryId = CAT.categoryId 
    LEFT JOIN tix_customer  CST ON CST.customerId = INC.customerId 
    LEFT JOIN users U1 ON U1.employeeId = INC.createdBy 
    LEFT JOIN users U2 ON U2.employeeId = INC.modifiedBy 
    WHERE CB.cookBookName LIKE ? OR CST.customerName LIKE ? OR CST.mobileNumber LIKE ? OR CST.alternateNumber LIKE ? OR CAT.categoryName LIKE ? OR INC.description LIKE ? `,

    UpdateIncident : `UPDATE tix_incident SET cookId= ?, supportType = ?, description = ?, taskStatus = ?, taskDuration = ?, modifiedBy = ?, modifiedDate = ? WHERE incidentId = ?`,

    GetIncident : `SELECT TI.* FROM tix_incident TI WHERE TI.incidentId = ?`,

}