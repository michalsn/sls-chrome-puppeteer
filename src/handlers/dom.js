import dom from '../commands/dom'

export default async function handler (event, context, callback) {
  let responseBody
  let contentType

  const request = event.queryStringParameters || event
  
  if (!request.url) {
    return callback('URL parameter is required')
  }

  if (event.headers) {
    contentType = event.headers['Content-Type'] || ''
  }

  if (!['application/json', 'text/plain'].includes(contentType)) {
    contentType = 'application/json'
  }

  try {
    responseBody = await dom(request)

    if (contentType == 'application/json') {
      responseBody = JSON.stringify(responseBody)
    } else {
      responseBody = responseBody.data || ''
    }

  } catch (error) {
    console.error('Error getting DOM for url')
    return callback(error)
  }

  return callback(null, {
    statusCode: 200,
    body: responseBody,
    headers: {
      'Content-Type': contentType,
    },
  })
}
