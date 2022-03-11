function fetchLocation(){

  return new Promise( (resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  })
}

export default fetchLocation;