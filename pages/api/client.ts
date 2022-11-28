import { PrismaClient } from '@prisma/client' 
import { PrismaClientOptions } from '@prisma/client/runtime'

class SyncClient {
    static instance: PrismaClient<PrismaClientOptions, never> = new PrismaClient()
}

export const prisma =() => SyncClient.instance
