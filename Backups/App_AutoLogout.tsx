// Add this in the App component

const setAutoLogout = useCallback((milliseconds) => {
  setTimeout(() => {
    dispatch(logout()).then( () => {
      navigate('/');
    });
  }, milliseconds);
}, [dispatch]);


// Add this in the App component useEffect()

  if (new Date(expiryDate) <= new Date()) {
    dispatch(logout());
    return;
  }

  const remainingTimeInMs =
    new Date(expiryDate).getTime() - new Date().getTime();
  
  setAutoLogout(remainingTimeInMs);