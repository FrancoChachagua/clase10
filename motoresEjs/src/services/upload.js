import multer from 'multer';

//configuracion de almacenamiento multer
const storage = multer.diskStorage({
    destination:function(req,file,cb) {
        cb(null, 'public')
    },
    filename:function(req,file,cb){
        cb(null, Date.now()+file.fieldname+"."+file.mimetype.split('/')[1])
    }
})
const upload = multer({storage:storage})

export default upload;