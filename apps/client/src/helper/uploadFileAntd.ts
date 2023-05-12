import { RcFile } from 'antd/es/upload';
import { UploadFile } from "antd";

export const onPreview = async (file: UploadFile) => {
  let src = file.url as string;
  if (!src) {
    src = await new Promise((resolve) => {
      const reader = new FileReader();
      reader.readAsDataURL(file.originFileObj as RcFile);
      reader.onload = () => resolve(reader.result as string);
    });
  }
  const image: HTMLImageElement = new Image();
  const imgWindow = window.open(src);
  imgWindow?.document.write(image.outerHTML);
};