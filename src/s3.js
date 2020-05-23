
import AWS from 'aws-sdk'

const BUCKET = 'shareimg-bucket'
const REGION = 'us-east-1'
const ACCESS_KEY = 'ASIA2X75E2CZECFVIL43'
const SECRET_KEY = 'JfQpPygc8sWCAkGqKcNjhqzTaZAfuWLO+tYI9gwg'

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
