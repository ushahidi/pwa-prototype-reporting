handleFormSubmit(e); {
    e.preventDefault();
    let userData = this.state.newUser;

    fetch('https://rominacsvsms.ushahidi.io/posts/create/14',{
        method: "POST",
        body: JSON.stringify(userData),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
      }).then(response => {
        response.json().then(data =>{
          console.log("Successful" + data);
        })
    })
  }    