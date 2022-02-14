function convertTimeToString(time){
    return time.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
}

export default convertTimeToString;