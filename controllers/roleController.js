const Member = require("../models/Member");
const axios = require("axios")

exports.checkRole = async(req,res) =>{
    try{

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
                {where:{_id: req.member._id}}
            )
        }

        res.sendStatus(200)

    }catch(error){
        console.log("error...",error.message)
        res.send({message: error.message})
    }   
}
