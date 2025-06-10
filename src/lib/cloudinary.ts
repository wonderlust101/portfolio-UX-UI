import { CloudinaryImage } from "@cloudinary/url-gen";
import { name } from "@cloudinary/url-gen/actions/namedTransformation";

if (!process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME) {
    throw new Error("Please define NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME in your environment.");
}

const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;

export function buildNamedTransformUrl(publicId: string, namedTransform: string, ): string {
    return new CloudinaryImage(publicId, {cloudName}).namedTransformation(name(namedTransform)).toURL();
}