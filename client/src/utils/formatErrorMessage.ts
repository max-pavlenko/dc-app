export function formatErrorMessage(error: string) {
    let formattedError = error.replace(/"/g, '');
    return formattedError.replace('Error validating request body. ', '')
}
