import PrimaryButton from "../PrimaryButton";
import { toJpeg, toPng } from "html-to-image";

const PreviewModal = ({ open, params, handleClose }) => {

    const onCloseClick = () => {
        handleClose()
    }


    const handleDownload = async () => {
        const element = document.getElementById("preview-image");
        if (!element) return;

        const mimeType = (params?.to_type === "image/jpeg" || params?.to_type === "image/jpg") ? "image/jpeg" :
            params?.to_type === "image/webp" ? "image/webp" :
                "image/png";

        try {
            let dataUrl;

            if (mimeType === "image/jpeg") {
                dataUrl = await toJpeg(element, { pixelRatio: 10 });
            } else if (mimeType === "image/webp") {
                const pngDataUrl = await toPng(element, { pixelRatio: 10 });
                dataUrl = await convertToWebp(pngDataUrl);
            } else {
                dataUrl = await toPng(element, { pixelRatio: 10 });
            }

            const link = document.createElement("a");
            link.href = dataUrl;
            link.download = `download.${mimeType.split("/")[1]}`;
            link.click();
        } catch (error) {
            console.error("Failed to download image:", error);
        }
    };

    const convertToWebp = async (pngDataUrl) => {
        return new Promise((resolve) => {
            const img = new Image();
            img.src = pngDataUrl;
            img.onload = () => {
                const canvas = document.createElement("canvas");
                canvas.width = img.width;
                canvas.height = img.height;
                const ctx = canvas.getContext("2d");
                ctx.drawImage(img, 0, 0);
                resolve(canvas.toDataURL("image/webp"));
            };
        });
    };

    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 bg-black/10 bg-opacity-50 flex justify-center items-center w-full">

            <div className="bg-white rounded-md shadow-lg lg:w-[625px] w-[325px] flex flex-col relative">
                {/* close icon btn */}
                <div className='w-full flex items-center justify-between p-4'>
                    <p className="lg:text-base text-sm text-[#b53836] font-bold">Preview</p>
                    <button onClick={onCloseClick}>
                        <img src={"/close.svg"} alt="close" className='w-4 h-4' />
                    </button>
                </div>

                <div className='flex flex-col gap-4'>

                    <div className="w-full h-96 rounded bg-slate-400">
                        <img id="preview-image" src={params?.preview} alt="preview_image" className="w-full h-full object-contain" />
                    </div>

                </div>

                <div className="flex items-center justify-end gap-4 p-4">

                    <PrimaryButton onClick={onCloseClick} color="bg-[#202020]" width={"w-fit"} label="Close" />
                    <PrimaryButton onClick={handleDownload} color="bg-[#28a745]" width={"w-fit"} label="Download" />

                </div>

            </div>

        </div>
    );
}


export default PreviewModal