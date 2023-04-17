export function getAverageColorFromImageUrl(imageUrl: string): Promise<string> {
  return new Promise<string>((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "Anonymous";
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        reject("Failed to create canvas context");
        return;
      }
      ctx.drawImage(img, 0, 0);
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const pixelArray = imageData.data;
      let totalR = 0,
        totalG = 0,
        totalB = 0;
      for (let i = 0; i < pixelArray.length; i += 4) {
        totalR += pixelArray[i];
        totalG += pixelArray[i + 1];
        totalB += pixelArray[i + 2];
      }
      const pixelCount = pixelArray.length / 4;
      const avgR = Math.round(totalR / pixelCount);
      const avgG = Math.round(totalG / pixelCount);
      const avgB = Math.round(totalB / pixelCount);
      const avgColor = `rgb(${avgR},${avgG},${avgB})`;
      resolve(avgColor);
    };
    img.onerror = () => {
      reject("Failed to load image");
    };
    img.src = imageUrl;
  });
}
