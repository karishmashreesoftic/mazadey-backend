const Member =  require('../../models/Member')
const jwt = require('jsonwebtoken');
const Token = require('../../models/Token');
const axios = require("axios");

exports.login = async(req,res) =>{
    try{

        const response = await axios.post("https://mzadey.com/wp-json/aam/v2/authenticate?", null, { 
            params: {
                password: req.body.password,
                username: req.body.email,
            },
            headers: {
                "Accept-Encoding": "gzip,deflate,compress"
            }
        })
        const data = await response.data
        // console.log("data..",data)

        const encodedToken = Buffer.from(`${process.env.WP_ADMIN_USERNAME}:${process.env.WP_ADMIN_PASSWORD}`).toString('base64');

        const userrole = await axios.get("https://mzadey.com/wp-json/wp/v2/users/2?context=edit",{
            headers: {
                'Authorization': 'Basic '+ encodedToken,
                "Accept-Encoding": "gzip,deflate,compress"
            }
        })

        const roles = await userrole.data.roles

        if(roles.includes("registered_user")){
            await Member.update(
                {status: "registered"},
                {where:{_id: data.user.data.ID}}
            )
        }

        const member = await Member.findByPk(data.user.data.ID)
        const token = jwt.sign({_id: member._id}, process.env.JWT_SECRET)
        const newToken = await Token.create({token: token, member: member._id})

        res.status(201).send({member, token: newToken.token, message: "Login Successful"})
    }catch(error){
        let msg = error.message;
        if(error.response && error.response.data.reason){
            msg = error.response.data.reason
        }
        console.log("error...",msg)
        res.send({message: msg})
    }   
}