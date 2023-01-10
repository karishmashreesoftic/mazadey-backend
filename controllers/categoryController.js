const axios = require("axios")

exports.getCategorylist = async(req,res) =>{
    try{

        const categoryresponse = await axios.get(`https://mzadey.com/wp-json/yith-proteo-child/v1/getallcategories`,{
            headers: {
                "Accept-Encoding": "gzip,deflate,compress"
            }
        })
        let cs = await categoryresponse.data
        cs = cs.data.category_list

        let categories = []
        for(let j=0; j<cs.length; j++){
            let tc = cs[j]
            if(tc.term_name){
                categories.push(tc.term_name)
            }
        }

        res.status(200).send({categories})

    }catch(error){
        res.send({message: error.message})
    }   
}
