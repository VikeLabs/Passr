import { S3 } from 'aws-sdk'

const fileToModifyCache = [ 'index.html' ]
const s3Conn = new S3()

export function handler(event: string, context: any){
    const eventObj = JSON.parse(event)
    const userParams = eventObj["CodePipeline.job"].data.actionConfiguration.configuration.UserParameters
    console.log(userParams)

    fileToModifyCache.forEach((val) => {
        console.log(val)
    })
}

export default handler
