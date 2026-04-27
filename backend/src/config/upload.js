import multer from 'multer';
import fs from 'fs';
import path from 'path';
const dir=process.env.UPLOAD_DIR||'uploads';
fs.mkdirSync(dir,{recursive:true});
const storage=multer.diskStorage({destination:dir,filename:(req,file,cb)=>cb(null,Date.now()+'-'+file.originalname.replace(/[^a-zA-Z0-9_.-]/g,'_'))});
export const upload=multer({storage,limits:{fileSize:10*1024*1024}});
export function fileUrl(filename){return `/uploads/${path.basename(filename)}`;}
