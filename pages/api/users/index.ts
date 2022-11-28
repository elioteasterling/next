import { User } from '@prisma/client'
import { prisma } from '../client'

export async function getUsers  ()           { return await prisma().user.findMany() }
export async function getUser   (user: User) { return await prisma().user.findUnique({        where: {id: user.id}}) }
export async function createUser(user: User) { return await prisma().user.create({data: user}) }
export async function updateUser(user: User) { return await prisma().user.update({data: user, where: {id: user.id}}) }
export async function removeUser(id: string) { return await prisma().user.delete({            where: {id}}) }
