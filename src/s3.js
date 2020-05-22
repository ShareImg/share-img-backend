
import AWS from 'aws-sdk'

const BUCKET = 'shareimg-ske14'
const REGION = 'us-east-1'
const ACCESS_KEY = 'ASIAVIJVTJHCLPTTDT3A'
const SECRET_KEY = 'esIVPLks00iFjIcoKPCARMvW8Lv2LVcRNEuBRBVc'

const localImage = './cat.png'
const imageRemoteName = `catImage_${new Date().getTime()}.png`

const s3 = new AWS.S3({
  accessKeyId: ACCESS_KEY,
  secretAccessKey: SECRET_KEY,
  region: REGION
})

export default s3
