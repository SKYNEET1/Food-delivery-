const { hashPassword } = require("../utils/hash");

const otpCreation = async () => {
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    console.log(otp)
    hashOtp = await hashPassword(otp);
    if(!hashOtp){
        throw new Error('Could not hash the password');
    }

    return {hashOtp}
}

module.exports = otpCreation