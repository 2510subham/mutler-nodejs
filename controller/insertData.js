const details = require('../modals/details');
// const main = require('../utils/extractData');
const path = require('path');
const exceljs = require('exceljs');



const insertData = async (req, res) => {

    // const data = await main();
    // console.log(data);
    // res.send(data);
    console.log("insert data")
    try {
        async function main() {
            const workbook = new exceljs.Workbook();
            await workbook.xlsx.readFile('/home/subham/Videos/multer-nodejs/mutler-nodejs/uploads/excelFile.xlsx');//define the path where the file is stored
            const eachSeries = workbook.getWorksheet(1);

            let rowNumber = 1;
            eachSeries.eachRow({ includeEmpty: false }, async (row) => { //eachSeries of each row is added
                if (rowNumber === 1) {
                    rowNumber++;
                    return;
                }
                if (await details.findOne({ email: row.getCell(2).value })) {
                    rowNumber++;
                    console.log("Already exists");
                    return;
                }

                const newData = new details({
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
        res.sendFile(path.join(__dirname, '..' + '/end.html'));
    } catch (err) {
        console.log(err);
        res.send(err);
    }
}

module.exports = insertData;