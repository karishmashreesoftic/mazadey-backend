const Member =  require('../../models/Member')
const {sendOTP} = require('./otpController')

exports.signup = async(req,res) =>{
    try{
        if(await Member.findOne({mobile: req.body.mobile, membertype: req.body.membertype})){
            throw new Error(`Mobile number is already associated with ${req.body.membertype} account.`)
        }
        if(await Member.findOne({username: req.body.username})){
            throw new Error("Username is already taken, Please choose unique username.")
        }
        const newMember = new Member(req.body)
        await newMember.save()

        const otp = await sendOTP(newMember.mobile)
        if(otp!==true){
            throw new Error(otp)
        }

        res.sendStatus(200)

    }catch(error){
        let em;
        if(error.errors){
            em =  error.errors[Object.keys(error.errors)[0]].properties.message
        }else{
            em =  error.message
        }
        res.send({error: em})
    }   
}