import Image from 'next/image';

interface ImagePreviewProps {
    images: string[];
}

const ImagePreview: React.FC<ImagePreviewProps> = ({ images }) => {
    return (
        <div className="mt-2 grid grid-cols-8 sm:grid-cols-4 gap-1 text-ellipsis overflow-hidden ...">
            {images.map((img, index) => (
                <div key={index} className="relative w-7 h-7 sm:w-6 sm:h-6">
                    <Image
                        src={img}
                        alt={`Image Preview ${index}`}
                        layout="fill"
                        objectFit="cover"
                        className="rounded-none border-2"
                    />
                </div>
            ))}
        </div>
    );
};

export default ImagePreview;
