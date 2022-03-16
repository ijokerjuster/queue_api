const { ref, uploadBytes, getDownloadURL } = require("firebase/storage");
const firebaseStorage = require("../models/Firebase");

const service = {
  async upload(file) {
    try {
      const timestamp = Date.now();
      const [name, type] = file.originalname.split(".");
      const fileName = `queue/images/${name}_${timestamp}.${type}`;
      const metadata = {
        contentType: file.mimetype,
      };

      const storageRef = ref(firebaseStorage, fileName);
      const snapshot = await uploadBytes(storageRef, file.buffer, metadata);
      const downloadURL = await getDownloadURL(snapshot.ref);
      return downloadURL;
    } catch (error) {
      throw error;
    }
  },
};

module.exports = { ...service };
