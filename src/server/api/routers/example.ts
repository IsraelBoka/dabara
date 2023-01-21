import { z } from "zod";

import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";

export const exampleRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),

  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.example.findMany();
  }),

  getSecretMessage: protectedProcedure.query(() => {
    return "you can now see this secret message!";
  }),

  addprofiletouser: protectedProcedure
  .input(
    z.object({
    name :z.string(),
    email: z.string(),
    about: z.string(),
    //page: z.string(),
    //fonction : z.string(),
    //residence : z.string(),
    //website: z.string(),
    //facebook: z.string().nullable(),
    //instagram : z.string().nullable(),
    //twitter : z.string().nullable(),
    //youtube : z.string().nullable(),
    //linkedin : z.string().nullable(),
    //github : z.string().nullable() 

}))
    .mutation(async ({ input, ctx }) => {
        const updatetheuser =  ctx.prisma.user.update({
            where: { id: ctx.session.user.id },
            data: {
            name: input.name,
            about: input.about, 
            },
        });     

        const createaprofil =  ctx.prisma.profil.create({
            data: {
            email: input.email,
            name : input.name,
            //website: input.website,
            //facebook: input.facebook,
            //instagram : input.instagram,
            //twitter : input.twitter,
            //youtube : input.youtube,
            //linkedin : input.linkedin,
            //github : input.github,
            userId: ctx.session.user.id,
            
            },
        });

        return Promise.all([updatetheuser, createaprofil]);
        }),
});
