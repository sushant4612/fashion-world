import { v2 as cloudinary } from "cloudinary";

interface CloudinaryConfig{
    cloud_name: string,
    api_key: string,
    api_secret: string
}

const cloudinaryConnect = async (): Promise<void> => {
    const {CLOUDINARY_API_KEY, CLOUDINARY_SECRET_KEY, CLOUDINARY_NAME} = process.env;

    if(!CLOUDINARY_API_KEY || !CLOUDINARY_SECRET_KEY || !CLOUDINARY_NAME){
        throw new Error("Missing Cloudinary configuration in environment variables. ")
    }

    const cloudinaryConfig: CloudinaryConfig = {
        cloud_name: CLOUDINARY_NAME, 
        api_key: CLOUDINARY_API_KEY, 
        api_secret: CLOUDINARY_SECRET_KEY
    }

    cloudinary.config(
        cloudinaryConfig
    )
}

export default cloudinaryConnect;