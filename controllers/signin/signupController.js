const Member =  require('../../models/Member')
const {sendOTP, verifyOTP} = require('./otpController')

exports.signup = async(req, res) => {
    try{

        if(await Member.findOne({mobile: req.body.mobile, membertype: req.body.membertype})){
            throw new Error(`Mobile number is already associated with other ${req.body.membertype} account.`)
        }
        if(await Member.findOne({email: req.body.email, membertype: req.body.membertype})){
            throw new Error(`Email address is already associated with other ${req.body.membertype} account.`)
        }
        if(await Member.findOne({username: req.body.username})){
            throw new Error("Username is already taken, Please choose unique username.")
        }

        const verified = await verifyOTP(req.body.mobile, req.body.code)
        if(verified.error){
            throw new Error(verified.error)
        }

        const newMember = new Member(req.body)
        await newMember.save()   
        const token = await newMember.generateAuthToken() 
        res.status(201).send({member: newMember, token})

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