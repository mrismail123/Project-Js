app.post('/register', async (req, res) => {
    try {
      const newUser = new User(req.body); // Create a new user from the request data
      await newUser.save(); // Save the user in the database
      res.status(201).send('User registered successfully!');
    } catch (err) {
      console.error(err);
      res.status(500).send('Error registering user.');
    }
  });