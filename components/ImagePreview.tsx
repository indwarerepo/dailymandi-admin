import Image from 'next/image';

interface ImagePreviewProps {
    images: string[];
}

const ImagePreview: React.FC<ImagePreviewProps> = ({ images }) => {
    return (
        <div className="mt-2 grid grid-cols-3 gap-2">
            {images.map((img, index) => (
                <div key={index} className="relative w-32 h-32">
                    <Image
                        src={img}
                        alt={`Image Preview ${index}`}
                        layout="fill"
                        objectFit="cover"
                        className="rounded-md"
                    />
                </div>
            ))}
        </div>
    );
};

export default ImagePreview;
