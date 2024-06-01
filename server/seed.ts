import { PrismaClient } from "@prisma/client";
import type { IUser as UserType } from "../src/UserTypes.d.ts";
import * as fs from "fs";
import bcrypt from 'bcrypt'
const prisma = new PrismaClient();

async function main() {
const usersData: UserType[] = JSON.parse(fs.readFileSync("C:\\Users\\byoun\\Documents\\code\\vue-app\\vue-project\\server\\users.json", "utf-8"));
const prisma = new PrismaClient().$extends({
  query: {
    users: {
     $allOperations({ operation, args, query }) {
      if (['create', 'update','upsert'].includes(operation) && args['create']) {
          args['create'].password = bcrypt.hashSync(args['create'].password, 10)
        }
        return query(args)
      } 
    },
    },
  },
)
  for (const user of usersData) {
     await prisma.users.upsert({
        where: { id: user.id }, // assuming 'name' is unique
        create: {
          name: user.name,
          age: user.age,
          isActive: user.isActive,
          email: user.email, 
          password: user.password,
          pets: {
            create: user.pets.map(pet => ({
              petName: pet.petName,
              petColor: pet.petColor,
              petAge: pet.petAge,
              petKind: pet.petKind,
            })),
          },
        },
        update: {
          age: user.age,
          isActive: user.isActive,
        },
      });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });