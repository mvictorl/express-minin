import colors from 'colors'

export function requestTime(request, response, next) {
  request.requestTime = Date.now()
  next()
}

export function logger(request, response, next) {
  console.log(colors.bgGreen.black(`Req.time: ${Date(request.requestTime)}`))
  next()
}