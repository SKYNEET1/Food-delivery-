const mongoose = require('mongoose');

const dbConnect = () => {
    mongoose.connect(process.env.DATABASE_URL)
        .then(() => console.log('DB Connected Successfully'))
        .catch((error) => console.error('Error in connecting DB', error))
}

module.exports = dbConnect