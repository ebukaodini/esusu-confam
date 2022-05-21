const serverError = (res, message, data = {}, statusCode = 500) => {
  res.status(statusCode).json({
    status: false,
    message: message,
    data: data ?? {}
  })
}

const badRequest = (res, message, data = {}, statusCode = 400) => {
  res.status(statusCode).json({
    status: false,
    message: message,
    data: data ?? {}
  })
}

const success = (res, message, data = {}, statusCode = 200) => {
  res.status(statusCode).json({
    status: true,
    message: message,
    data: data ?? {}
  })
}

module.exports = { serverError, badRequest, success }
