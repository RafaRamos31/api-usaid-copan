
export function throwNotFoundException(element, message) {
  const error = {
    error: true,
    title: element + " Not Found",
    errorMessage: message,
    statusCode: 404
  }
  return error;
}

export function throwInvalidIDError(element, message) {
  const error = {
    error: true,
    title: "Invalid " + element + "ID format.",
    errorMessage: message,
    statusCode: 400
  }
  return error;
}

export function throwInvalidArgsError(message) {
  const error = {
    error: true,
    title: "Invalid Args",
    errorMessage: message,
    statusCode: 400
  }
  return error;
}
