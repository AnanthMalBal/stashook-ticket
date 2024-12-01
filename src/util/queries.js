module.exports = {

    SearchCookBook : `SELECT CB.cookId, CAT.categoryName, CB.description , CB.keywords, CB.createdDate, CB.modifiedDate,  
    CONCAT(U1.userName, '(', U1.userId, ')') AS createdBy, CONCAT(U2.userName, '(', U2.userId, ')') AS modifiedBy 
    FROM tix_cook_book CB 
    LEFT JOIN tix_category CAT ON CB.categoryId = CAT.categoryId 
    LEFT JOIN users U1 ON U1.employeeId = CB.createdBy 
    LEFT JOIN users U2 ON U2.employeeId = CB.modifiedBy  WHERE 
    CAT.categoryName LIKE ? AND CB.description LIKE ? AND CB.keywords LIKE ? `,

    SearchTraceCookBook : `SELECT CB.cookId, CAT.categoryName, CB.description, CB.keywords  FROM tix_cook_book CB 
    LEFT JOIN tix_category CAT ON CB.categoryId = CAT.categoryId WHERE 
    CAT.categoryName IN (?) OR CB.keywords IN (?)`,

    GetCookBook : `SELECT CB.* FROM tix_cook_book CB WHERE cookId = ?`,

    UpdateCookBook : `UPDATE tix_cook_book SET cookBookName= ?, goLinks = ?, categoryId = ?, description = ?, keywords = ?, modifiedBy = ?, modifiedDate = ? WHERE cookId = ?`,

    BlockCookBook : `UPDATE tix_cook_book SET status = ?, modifiedBy = ?, modifiedDate = ? WHERE cookId = ?`,

    SearchIncident : `SELECT TI.incidentId, CB.categoryName, CB.description, CB.keywords, CB.createdDate, CB.modifiedDate,  
    CONCAT(U1.userName, '(', U1.userId, ')') AS createdBy, CONCAT(U2.userName, '(', U2.userId, ')') AS modifiedBy 
    FROM tix_incident TI 
    LEFT JOIN tix_cookbook CB ON CB.cookId = TI.cookId 
    LEFT JOIN users U1 ON U1.employeeId = CB.createdBy 
    LEFT JOIN users U2 ON U2.employeeId = CB.createdBy  WHERE 
    CAT.categoryName = ? AND CB.description LIKE ? AND CB.keywords LIKE ? `,

    GetIncident : `SELECT TI.* FROM tix_incident TI WHERE incidentId = ?`,

}