import type { IUser, PetInfo } from '../UserTypes'

import { PrismaClient } from '@prisma/client'
import { hashSync } from 'bcrypt';
const cors = require('cors');
import type { Request, Response } from 'express';
let res = {} as Response<IUser>;
let req = {} as Request;
const prisma = new PrismaClient();
export default class UserService {
  constructor(req: Request) {
    this.createUserRecord(req, res)
  }

  async createUserRecord(req: Request, res: Response): Promise<Response<IUser>> {
    console.log(req.body.pets, 'req.body')
  const hashedPassword = hashSync(req.body.password, 10) 
  const userAge =Number.parseInt(req.body.age)
  const petsObject = req.body.pets.map((pet:any)=>{
    return {
      petName: pet.petName,
      petColor: pet.petColor,
      petAge: Number.parseInt(pet.petAge),
      petKind: pet.petKind
    }
  
  })
    try {
      await prisma.users
        .create({
          data: {
            name: req.body.name,
            age: userAge,
            isActive: req.body.isActive,
            email: req.body.email,
            password: hashedPassword,
            pets: {
              create: petsObject
            }
          }
        })
        .then((data) => {
          console.log(data, 'data')

          return Promise.resolve({} as Response<IUser>)
        })
    } catch (error) {
      console.log(error, 'error')
      res.status(500).json({ error: 'An error occurred while creating the user' })
    }
    return Promise.resolve({} as Response<IUser>)
  }
}
