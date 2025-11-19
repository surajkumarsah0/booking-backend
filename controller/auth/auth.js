const { sequelize } = require('../../database/connection');
const userModel = require('../../database/model/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
try {
const signupUser= async(req,res)=>{
    try{
    if(!req.body){
        return res.status(400).json({error: 'Request body is missing'});
    }
    console.log(req.body);
    const { username, password} = req.body;
    if(!username || !password){
      return res.status(400).json({error: 'Username and password are required'});
    }
    const existingUsers= await userModel.findOne({where:{username}});
    if(existingUsers){
      return res.status(409).json({error: 'Username already exists'});
    }
   
    const hashedPassword = await bcrypt.hash(password, 10); // Replace with actual hashing logic  

   await userModel.create({
        username,
        password: hashedPassword
    }); 
    res.status(201).json({message: 'User signed up successfully'});

    } catch (error) {
      console.error('Error during signup:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
}
} catch (error) {
    console.error("Error defining signupUser function:", error);
}

try {
const loginUser = async(req, res) => {
    // Logic to authenticate user and generate JWT token
    try {
   if (!req.body) {
     return res.status(400).json({ error: 'Request body is missing' });
   }    
    console.log(req.body);
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password are required' });
    }
    // Add authentication logic here (e.g., verify username and password)
    const user= await userModel.findOne({ where: { username } });
    if (!user) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }
    const isValidUser = bcrypt.compareSync(password, user.password); // Replace with actual authentication logic   
    if (!isValidUser) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    const token = jwt.sign({ userId: user.id }, 'your_secret_key', { expiresIn: '1h' });

    res.status(200).json({ message: 'User logged in successfully', token });
    } catch (error) {   
        console.error('Error during login:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}
} catch (error) {
    console.error("Error defining loginUser function:", error);
}

module.exports={signupUser,loginUser};
