// Add this in the App component

const setAutoLogout = useCallback((milliseconds) => {
  setTimeout(() => {
    dispatch(logout()).then( () => {
      navigate('/');
    });
  }, milliseconds);
}, [dispatch]);


// Add this in the App component useEffect()

  const expiryDate = localStorage.getItem("expiryDate");
  
  if (!token || !expiryDate) {
    return;
  }

  if (new Date(expiryDate) <= new Date()) {
    dispatch(logout());
    return;
  }

  const remainingTimeInMs =
    new Date(expiryDate).getTime() - new Date().getTime();
  
  setAutoLogout(remainingTimeInMs);

// Add this in the sendLoginData function in authenticationActions 
const remainingTimeInMs = 60 * 60 * 1000;
const expiryDate = new Date(new Date().getTime() + remainingTimeInMs);
localStorage.setItem("expiryDate", expiryDate.toISOString()); 