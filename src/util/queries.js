module.exports = {

    CustomerSelect : `SELECT * FROM customer WHERE (customerName LIKE ? OR mobileNo LIKE ? OR alternateMobileNo LIKE ?)`
}