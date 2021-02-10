
// var admin = require("firebase-admin");

// var serviceAccount = require("path/to/serviceAccountKey.json");

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount)
// });


const express = require('express');
const app = express();
const { Storage } = require("@google-cloud/storage");
// const Multer = require('multer');
const uuid = require("uuid");
const path = require("path");




const storage = new Storage({
  projectId: "mgsecurity-2020",
  keyFilename: path.join(__dirname,"mgsecurity-2020-30813db0ebd8.json")
});

const bucket = storage.bucket("mgsecurity-2020.appspot.com");
const uploadImageToStorage = async (path, imagebuffer) => {
	return new Promise((resolve, reject) => {
		if (!imagebuffer) {
			reject("No image file");
		}
		// console.log("inside upload to storage");

		// console.log("inside storage upload")
		let newFileName = `/${path}`;

		let fileUploadBucket = bucket.file(newFileName);
		// console.log(file.mimetype);
		const token = uuid.v4();

		const blobStream = fileUploadBucket.createWriteStream({
			metadata: {
				contentType: "image/jpeg",
				metadata: {
					firebaseStorageDownloadTokens: token,
				},
			},
			resumable: false,
			timeout: 30000
		});

		blobStream.on('error', (error) => {
			console.log(error);
			reject('Something is wrong! Unable to upload at the moment.');
		});
		blobStream.on("finish", () => {
			// The public URL can be used to directly access the file via HTTP.
			// const url = format(`https://storage.googleapis.com/${bucket.name}/${fileUploadBucket.name}`);
			const url =
				"https://firebasestorage.googleapis.com/v0/b/" +
				bucket.name +
				"/o/" +
				encodeURIComponent(newFileName) +
				"?alt=media&token=" +
				token;
			resolve(url);
		});
		let finalimageBuffer=imagebuffer;
		blobStream.end(finalimageBuffer);
  });	           
};

module.exports.uploadToFirebase = async (path, imagebuffer) => {
	// console.log("inside upload to firebase");
	// let url;
	let imgUrl;
	await uploadImageToStorage(path, imagebuffer)
    .then((imageUrl) => {
		console.log(imageUrl);
		imgUrl=imageUrl;})
	return imgUrl;
}

