const mongoos = require('mongoose');
const connectDB = async()=>{
    try {
        await mongoos.connect('mongodb+srv://saimadhuri5002:2302saib@expensetrackercluster.xq7mr3v.mongodb.net/expense_tracker?retryWrites=true&w=majority')

            console.log("Connected!!!")
    } catch (error) {
        console.log("Not Connected!!")
    }
}
module.exports = connectDB