const axios = require("axios")

exports.addToWatchlist = async(req,res) =>{
    try{
        const watchlistres = await axios.get(`https://mzadey.com/wp-json/yith-proteo-child/v1/additeminwatchlist?user_id=${req.member._id}&&auction_id=${req.body.itemid}`,{
            headers: {
                "Accept-Encoding": "gzip,deflate,compress"
            }
        })
        let watchlist = await watchlistres.data
        // console.log("watchlist..",watchlist)

        res.status(201).send({message: watchlist})

    }catch(error){
        res.send({message: error.message})
    }   
}

exports.removeFromWatchlist = async(req,res) =>{
    try{
        const watchlistres = await axios.get(`https://mzadey.com/wp-json/yith-proteo-child/v1/removeitemfromwatchlist?user_id=${req.member._id}&&auction_id=${req.params.id}`,{
            headers: {
                "Accept-Encoding": "gzip,deflate,compress"
            }
        })
        let watchlist = await watchlistres.data
        // console.log("watchlist..",watchlist)

        res.status(201).send({message: watchlist})
        
    }catch(error){
        res.send({message: error.message})
    }   
}