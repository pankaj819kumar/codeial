const mongoose = require('mongoose');

async function main() {
    await mongoose.connect('mongodb://localhost/codeial_db');
}

main().then(function () {
    console.log('connected to database successfully.');
}).catch(function (err) {
    console.log('error connecting to database ', err);
})