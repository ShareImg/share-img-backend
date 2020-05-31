
import AWS from 'aws-sdk'

const BUCKET = process.env.BUCKET;
const REGION = process.env.REGION;
const ACCESS_KEY = process.env.ACCESS_KEY;
const SECRET_KEY = process.env.SECRET_KEY;

const localImage = './cat.png'
const imageRemoteName = `catImage_${new Date().getTime()}.png`

// const s3Client = new AWS.S3({
const s3 = new AWS.S3({
  accessKeyId: ACCESS_KEY,
  secretAccessKey: SECRET_KEY,
  Bucket: BUCKET,
  region: REGION
})

// const uploadParams = {
//   Bucket: BUCKET, 
//   Key: '', // pass key
//   Body: null, // pass file body
// };

// const s3 = {};
// s3.s3Client = s3Client;
// s3.uploadParams = uploadParams;

export default s3
