import { Invitation, PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const resolvers = {
    Query: {
        users: () => prisma.user.findMany({
            select: {
                id:     true,
                image:  true,
                role:   true,
            }
        }),
        user: (id: string) => prisma.user.findUnique({
            where : { id }
        }),
        songs: () => ({
            select: {
                id:          true,
                title:       true,
                description: true,
                url:         true,
                imageUrl:    true,
                category:    true
            }
        }),
        song: (id: number) => prisma.song.findUnique({
            select: {
                id:          true,
                title:       true,
                description: true,
                url:         true,
                imageUrl:    true,
                category:    true,
            },
            where: { id }
        }),
        invites: (id:   string)     => prisma.user.findUnique({
            select: { invitations: true, inviters: true },
            where : { id }
        }), 
    },
    Mutation : {
        invite:  (data: Invitation) => prisma.invitation.create( { data } )
    }
  }
