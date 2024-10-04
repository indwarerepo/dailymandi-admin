export const convertBase64 = (file: File) => {
  return new Promise((resolve, reject) => {
    if (!file) {
      reject("No file selected.");
      return;
    }

    if (!(file instanceof File)) {
      reject("Invalid file type.");
      return;
    }

    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);

    fileReader.onload = () => {
      resolve(fileReader.result);
    };

    fileReader.onerror = (error) => {
      reject(error);
    };
  });
};
