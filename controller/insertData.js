const details = require('../modals/details');
// const main = require('../utils/extractData');
// const path = require('path');
const exceljs = require('exceljs');



const insertData = async (req, res) => {

    // const data = await main();
    // console.log(data);
    // res.send(data);
    console.log("insert data")
    try {
        async function main() {
            const workbook = new exceljs.Workbook();
            await workbook.xlsx.readFile('/home/subham/Videos/assignment-reunion/backend/uploads/excelFile.xlsx');
            const worksheet = workbook.getWorksheet(1);

            // const extractedData = [];
            let rowNumber = 1;

            const columns = worksheet.getRow(1);
            //extarct the name of column
            const columnNames = [];
            columns.eachCell(cell => {
                columnNames.push(cell.value);
            });
            // console.log("column names", columnNames);
            //extracting the name of the column
            worksheet.eachRow({ includeEmpty: false }, async (row) => {
                if (rowNumber === 1) {
                    rowNumber++;
                    return;
                }
                if (await details.findOne({ email: row.getCell(2).value })) {
                    rowNumber++;
                    console.log("Already exists");
                    return;
                }

                const newData = await new details({
                    name: row.getCell(1).value,
                    email: row.getCell(2).value,
                    phone: row.getCell(3).value,
                    Date_of_birth: row.getCell(4).value,
                    work_experience: row.getCell(5).value,
                    resume_title: row.getCell(6).value,
                    current_location: row.getCell(7).value,
                    postal_address: row.getCell(8).value,
                    current_employer: row.getCell(9).value,
                    current_designation: row.getCell(10).value,
                });
                // console.log("new data", newData)


                try {
                    await newData.save();
                    console.log('User saved successfully:', newData);
                    rowNumber++;
                } catch (err) {
                    res.send("error occured")

                    rowNumber++;
                }
            });
        }
        await main();
        res.send("Data inserted successfully");
    } catch (err) {
        console.log(err);
        res.send(err);
    }
}

module.exports = insertData;