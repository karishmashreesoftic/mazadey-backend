const axios = require("axios")

exports.changePassword = async(req,res) =>{
    try{
        if(req.body.password===req.body.newpassword){
            throw new Error("Current password and new password can't be same")
        }
        const response = await axios.get(`https://mzadey.com/wp-json/yith-proteo-child/v1/changepassword?email=${req.member.email}&password=${req.body.password}&new_password=${req.body.newpassword}`, { 
            headers: {
                "Accept-Encoding": "gzip,deflate,compress"
            }
        })
        const data = await response.data

        res.status(200).send({message: data.data.response[0].message})

    }catch(error){
        res.send({message: error.message})
    }   
}

exports.forgotPassword = async(req,res) =>{
    try{

        const response = await axios.get(`https://mzadey.com/wp-json/yith-proteo-child/v1/forgotpassword?email=${req.params.email}`, { 
            headers: {
                "Accept-Encoding": "gzip,deflate,compress"
            }
        })
        const data = await response.data

        res.status(200).send({message: data.data.response[0].message})

    }catch(error){
        res.send({message: error.message})
    }   
}
