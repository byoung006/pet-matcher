// server.ts
import express from 'express'
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'
const app = express()
import cors from 'cors';
const prisma = new PrismaClient()
import { IUser } from '../src/UserTypes'
import UserService from '../src/services/UserCreationService'
app.use(cors())
app.use(express.json())
function excludePasswordFromUsers(users: IUser[]) {
  return users.map((user) => {
    const { password, email, ...rest } = user
    return rest
  })
}

function excludePasswordForUser(user: IUser | null) {
  if (user?.password && user.email) {
    const { password, email, ...newUserObject } = user
    return newUserObject
  }
}
function excludeMatchesForUser(user: any) {
  if (user?.usermatches) {
    const { usermatches, ...newUserObject } = user
    return newUserObject
  }
}
app.get('/api/users', async (req, res) => {
  // find the user, and their pets and return them
  const usersFromDb: IUser[] | null = await prisma.users.findMany({
    include: {
      pets: true,
      matches: true,
      matchedBy: false,
      // Include matches in the query
    }
  })
  if (usersFromDb?.length) {
    const validUsers = usersFromDb.filter(
      (user) => user.name.length !== 0 && user.email.length !== 0
    )
    const usersFiltered = excludePasswordFromUsers(validUsers)

    res.json(usersFiltered)
  }
})

app.get('/api/users/:id', async (req, res) => {
  const { id } = req.params
  const user: IUser | null = await prisma.users.findUnique({
    where: {
      id: Number(id)
    },
    include: {
      pets: true,
      matches: true,
      matchedBy:false
    }
  })
  const filteredUser = excludePasswordForUser(user)
  res.json(filteredUser)
})
app.post('/api/users/login', async (req, res) => {
  const { email, password }: { email: string; password: string } = req.body
  const user = await prisma.users.findUnique({
    where: {
      email: email
    },
    include: {
      pets: true,
      matches:false,
    }
  })

  if (user && bcrypt.compareSync(password, user.password)) {
    let sanitizedUser = excludePasswordForUser(user)
    res.json({ isAuthorized: true, user: sanitizedUser })
  } else {
    res.status(401).json({ error: 'Invalid credentials' })
  }
})
// create an endpoint that adds a user to the database
app.post('/api/users/create', async (req, res) => {
  const user = await new UserService(req)
  if (user) {
    res.json(user)
  } else {
    res.status(500).json({ error: 'An error occurred while creating the user' })
  }
})
// endpoint to match with a user
app.post(`/api/users/match/`, async (req, res) => {
  const { id, matchId } = req.body;
  if (id === matchId) {
    return res.json({ error: "attempted to match with yourself" });
  }

  try {
    // Check if the match already exists
    const matchExists = await prisma.userMatch.findUnique({
      where: {
        matcherId_matcheeId: {
          matcherId: Number(id),
          matcheeId: Number(matchId),
        },
      },
    });

    // If the match does not exist, create it
    if (!matchExists) {
      await prisma.userMatch.create({
        data: {
          matcherId: Number(id),
          matcheeId: Number(matchId),
        },
      });

      // Also create the reverse match to ensure both users are connected
      // await prisma.userMatch.create({
      //   data: {
      //     matcherId: Number(matchId),
      //     matcheeId: Number(id),
      //   },
      // });
    }

    // Fetch the updated user with matches
    const userWithMatches = await prisma.users.findUnique({
      where: {
        id: Number(id),
      },
      include: {
        pets: true,
        matches: true,
        matchedBy: true,
      },
    });

    let filterPassword = excludePasswordForUser(userWithMatches);
    let filterMatches = excludeMatchesForUser(filterPassword);
    res.json(filterMatches);
  } catch (e) {
    console.log(e, "error matching");
    res.status(500).json({ error: "An error occurred while matching the user" });
  }
})
// create an endpoint that returns all of a user's matches from the database
app.get('/api/users/:id/matches', async (req, res) => {
  const { id } = req.params
  console.log(id, 'id of match')

  try {
    const userWithMatches = await prisma.users.findUnique({
      where: {
        id: Number(id)
      },
      include: {
      matches: true // Assuming 'matches' is the relation field in your Prisma schema
      }
    })

    if (!userWithMatches) {
      return res.status(404).json({ error: 'User not found' })
    }
    const matchIds = userWithMatches.matches.map((match: any) => match.matcheeId);
    const matchLookup = await prisma.users.findMany({
      where:{
        id:{
          in: matchIds
        } 
      }, 
      include:{
        pets:true,
      }
    })
    let scrubbedResponse = excludePasswordFromUsers(matchLookup)
    res.json(scrubbedResponse)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'An error occurred while fetching the matches' })
  }
})

app.listen(8000, () => console.log('Server listening on port 8000'))
