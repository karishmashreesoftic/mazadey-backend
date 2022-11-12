const { ObjectId } = require("mongodb")

exports.getFile = async(req, res) => {
    try{
        gfs.find({
                _id: ObjectId(req.params.id)
            })
            .toArray((err, files) => {
                if (!files || files.length === 0) {
                    return res.status(404).json({
                        err: "no files exist"
                    });
                }
            gfs.openDownloadStreamByName(files[0].filename).pipe(res);
        });
 
    }catch(error){
        res.send({error: error.message})
    }
}