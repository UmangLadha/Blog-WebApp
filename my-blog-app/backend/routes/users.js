import express from 'express'
const router = express.Router();
import { v4 as uuidv4 } from 'uuid';


let users = [
	{
	  id: 1,
	  first_name: 'John',
	  last_name: 'Doe',
	  email: 'johndoe@example.com',
	},
	{
	  id: 12,
	  first_name: 'Alice',
	  last_name: 'Smith',
	  email: 'alicesmith@example.com',
	},
  ];

  // accessing the user data
  router.get("/", (req,res)=>{
	res.send(users);
  })

  //adding the new user in database
  router.post('/', (req, res) => {
    const user = req.body;

    users.push({ ...user, id: uuidv4() });

    res.send(`${user.first_name} has been added to the Database`);
})

// accessing the spcific user data
router.get('/:id', (req, res) => {
    const { id } = req.params;
	console.log("inside id", id);

    const foundUser = users.find((user) => user.id == id)
	console.log("foundUser", foundUser)
    res.send(foundUser)
});

//deleting the specific user 
router.delete('/:id', (req,res)=>{
	const { id } = req.params;

	users = users.filter(user=> user.id!==id)

	res.send(`${id} user deleted succesfully`);
})

//updating the specific user data 
router.patch('/:id', (req, res) => {
	const { id } = req.params;
  
	const { first_name, last_name, email} = req.body;
  
	const user = users.find((user) => user.id === id)
  
	if(first_name) user.first_name = first_name;
	if(last_name) user.last_name = last_name;
	if(email) user.email = email;
  
	res.send(`User with the ${id} has been updated`)
  
  });



  export default router