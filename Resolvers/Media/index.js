const { Upload } = require("@aws-sdk/lib-storage");
const { S3Client } = require("@aws-sdk/client-s3");

const { readFileS3 } = require('../../Middlewares/file')
const prisma = require('../../config/database');
const mime = require('mime-types');


const uploadToS3 = async (file) => {
    try {
        
        const {fileBuffer, name} = await readFileS3(file)
        
        const s3Client = new S3Client({
            credentials: {
                accessKeyId: process.env.AMAZON_ACCESS_KEY_ID,
                secretAccessKey: process.env.AMAZON_ACCESS_SECRET_KEY
            },
            region: process.env.AMAZON_REGION
        });
        

        const uploadParams = {
            Bucket: process.env.AMAZON_BUCKET_NAME,
            Key: name,
            Body: fileBuffer,
        };
        const parallelUploads3 = new Upload({
            client : s3Client,
            params : uploadParams
        })

        const response = await parallelUploads3.done()
       
        return {response, name};
    } catch (err) {
        console.log('Error', err);
        throw err;
    }
};


const MediaQueries = {
    pictures: async (parent, args, ctx) => {
        return await prisma.pictures.findMany()
    },
    picture: async (parent, args, ctx) => {
        const { pictureId } = args;
        return await prisma.pictures.findUnique({
            where: {
                pictureId: pictureId
            }
        })
    },
    getPicturesByFacilityId: async (parent, args, ctx) => {
        const { facilityId } = args;
        return await prisma.pictures.findMany({
            where: {
                facilityId: facilityId
            }
        })
    },
    getVideosByFacilityId: async (parent, args, ctx) => {
        const { facilityId } = args;
        return await prisma.videos.findMany({
            where: {
                facilityId: facilityId
            }
        })
    }
    ,
    videos: async (parent, args, ctx) => {
        return await prisma.videos.findMany()
    },
    video: async (parent, args, ctx) => {
        const { videoId } = args;
        return await prisma.videos.findUnique({
            where: {
                videoId: videoId
            }
        })
    }

}

const MediaMutation = {
    uploadFileToS3: async(_, args, ctx) => {
        const { file, facilityId  } = args;
        const adminId = ctx.user.adminId;
        const {response, name} = await uploadToS3(file);
        const mimeType = mime.lookup(name);
         const {Location, Key} =  response;
         console.log('Mime Type', mimeType);
         
         
        if (mimeType === 'image/jpeg' || mimeType === 'image/png' || mimeType === 'image/jpg') {
            await prisma.pictures.create({
                data: {
                    location: Location,
                    key: Key,
                    facilityId: facilityId,
                    adminId: adminId
                }
            })
        }
        else if (mimeType === 'video/mp4') {
            await prisma.videos.create({
                data: {
                    location: Location,
                    key: Key,
                    facilityId: facilityId,
                    adminId: adminId
                }
            })
        }
       
       
        return "successUpload"
    },
};


const MediaRelation = {
    Pictures:{
        student: async (parent, args, context, info) => {
            return await prisma.student.findUnique({
                where: {
                    facilityId: parent.facilityId
                }
            })
        },
        admin: async (parent, args, context, info) => {
            return await prisma.admin.findUnique({
                where: {
                    adminId: parent.adminId
                }
            })
        }
    }

}




module.exports = {
    MediaQueries,
    MediaMutation,
    MediaRelation
}