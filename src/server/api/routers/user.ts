import * as trpc from '@trpc/server';
import { db } from '../../db';
import bcrypt from 'bcrypt';
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const userRouter = createTRPCRouter({
  login: publicProcedure
    .input(z.object({ email: z.string().email(), password: z.string() }))
    .mutation(async ({ input }) => {
        const user = await db.user.findUnique({
          where: { email: input.email },
        });
  
        if (!user) {
          return { success: false, message: 'Login failed email not found', user };
        }
  
        const passwordMatch = await bcrypt.compare(input.password, user.password);
  
        if (!passwordMatch) {
          return { success: false, message: 'Login failed, password Incorrect', user };
        }
        return { success: true, message: 'Login Success', user };
    }),
      hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(async({ input }) => {
      await new Promise((resolve) => setTimeout(resolve, 3000));
      return {
        greeting: `Hello ${input.text}`,
      };
    }),
    registration: publicProcedure
    .input(z.object({ email: z.string().email(), password: z.string(), name: z.string() }))
    .mutation(async ({ input }) => {
          // Hash the password
          const hashedPassword = await bcrypt.hash(input.password, 10);
    
          // Create the user in the database
          const user = await db.user.create({
            data: {
              name: input.name,
              email: input.email,
              password: hashedPassword,
            },
          });
    
          // Omit the password when returning the user
          const { password, ...userWithoutPassword } = user;
          console.log(userWithoutPassword)
    
          return userWithoutPassword;
    }),
});