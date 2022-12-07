const getTimestamp = () => {
    const date = new Date()
    return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`
}

//export const DATE_UTILS = { getTimestamp }
const DATE_UTILS = { getTimestamp }
module.exports = DATE_UTILS

