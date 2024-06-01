// server.ts
import * as express from 'express'
import { PrismaClient } from '@prisma/client'
import * as bcrypt from 'bcrypt'
const app = express()
const cors = require('cors')
const prisma = new PrismaClient()
import { IUser } from '../src/UserTypes';
import UserService from '../src/services/UserCreationService'
app.use(cors())
app.use(express.json())
function excludePasswordFromUsers(
  users: IUser[],
) {
  return users.map((user) => {
    const { password, email, ...rest } = user
    return rest
  });
}

function excludePasswordForUser(
  user: IUser,
) {
  const {password,  email, ...newUserObject} = user
  return newUserObject 
}
app.get('/api/users', async (req, res) => {
  // find the user, and their pets and return them
  const users: IUser[] = await prisma.users.findMany({
    include: {
      pets: true
    }
  });
  const usersFiltered = excludePasswordFromUsers(users);

  res.json(usersFiltered)
})

app.get('/api/users/:id', async (req, res) => {
  const { id } = req.params
  const user = await prisma.users.findUnique({
    where: {
      id: Number(id)
    }, 
    include: {
      pets: true
    },
  })
  const filteredUser = excludePasswordForUser(user);
  res.json(filteredUser)
})
app.post('/api/users/login', async (req, res) => {
  const { email, password }: { email: string, password: string } = req.body;
  const user = await prisma.users.findUnique({
    where: {
      email: email,
    },
    include:{
      pets:true
    }
  });

  if (user && bcrypt.compareSync(password, user.password)) {
    let sanitizedUser = excludePasswordForUser(user)
    res.json({isAuthorized:true, user:sanitizedUser});
  } else {
    res.status(401).json({ error: 'Invalid credentials' });
  }
});
// create an endpoint that adds a user to the database 
app.post('/api/users/create', async (req, res) => {
  const user = await new UserService(req)
  if (user) {
    res.json(user)
  }
  else {
    res.status(500).json({ error: 'An error occurred while creating the user' })
  }
})
app.post(`/api/users/match/:id`, async (req, res) => {
  const { id } = req.params
const match = await prisma.users.update(
  {
    where: {
      id: Number(id)
    },
    data: {
      matches: 
      {
        connect: req.body.id
      } 
    }
  }

)
res.json(match)
})

app.listen(8000, () => console.log('Server listening on port 8000'))
