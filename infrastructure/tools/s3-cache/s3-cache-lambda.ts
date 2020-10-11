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

function processBigThing(command: string, helper: (s: string) => string){
    console.log(`Processing command: ${command}`)
    // we now call the helper, for whatever reason we needed;
    console.log(helper(command))
    // Maybe do somehting with the result of helper...
}

export default handler
