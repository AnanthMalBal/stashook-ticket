module.exports = {

    SearchCookBook : `SELECT CB.cookId, CAT.categoryName, CB.description , CB.keywords, CB.createdDate, CB.modifiedDate,  
    CONCAT(U1.userName, '(', U1.userId, ')') AS createdBy, CONCAT(U2.userName, '(', U2.userId, ')') AS modifiedBy 
    FROM tix_cook_book CB 
    LEFT JOIN tix_category CAT ON CB.categoryId = CAT.categoryId 
    LEFT JOIN users U1 ON U1.employeeId = CB.createdBy 
    LEFT JOIN users U2 ON U2.employeeId = CB.modifiedBy  WHERE 
    CAT.categoryId LIKE ? AND (CB.description LIKE ? OR CB.keywords LIKE ?)`,

    SearchTraceCookBook : `SELECT CB.cookId, CAT.categoryName, CB.description, CB.keywords  FROM tix_cook_book CB 
    LEFT JOIN tix_category CAT ON CB.categoryId = CAT.categoryId WHERE 
    CAT.categoryName IN (?) OR CB.keywords IN (?)`,

    GetCookBook : `SELECT CB.* FROM tix_cook_book CB WHERE (CB.cookId = ? OR REPLACE(CB.cookBookName, ' ', '') LIKE ?)`,

    UpdateCookBook : `UPDATE tix_cook_book SET cookBookName= ?, goLinks = ?, categoryId = ?, description = ?, keywords = ?, modifiedBy = ?, modifiedDate = ? WHERE cookId = ?`,

    BlockCookBook : `UPDATE tix_cook_book SET status = ?, modifiedBy = ?, modifiedDate = ? WHERE cookId = ?`,

}