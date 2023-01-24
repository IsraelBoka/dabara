import { z } from "zod";

import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";

export const ProfileRouter = createTRPCRouter({
  addprofiletouser: protectedProcedure
  .input(
    z.object({
    name :z.string(),
    email: z.string(),
    about: z.string(),
    page: z.string(),
    fonction : z.string(),
    competence : z.string().array(),
    residence : z.string(),
    website: z.string().nullable(),
    facebook: z.string().nullable(),
    instagram : z.string().nullable(),
    twitter : z.string().nullable(),
    youtube : z.string().nullable(),
    linkedin : z.string().nullable(),
    github : z.string().nullable() }))
    .mutation(async ({ input, ctx }) => {
        const updatetheuser =  ctx.prisma.user.update({
            where: { id: ctx.session.user.id },
            data: {
            name: input.name,
            about: input.about, 
            page : input.page,
            fonction : input.fonction,
            },
        });     

        const createaprofil =  ctx.prisma.profil.create({
            data: {
            name : input.name,
            email: input.email,
            website: input.website,
            facebook: input.facebook,
            instagram : input.instagram,
            twitter : input.twitter,
            youtube : input.youtube,
            linkedin : input.linkedin,
            github : input.github,
            userId: ctx.session.user.id,
            },
        });

        const multiplecompetence = ctx.prisma.competence.createMany({
            data: input.competence.map((competence) => ({
                name: competence,
                niveau : "0", 
                userId: ctx.session.user.id,
            })),
        });

        await ctx.prisma.$transaction([updatetheuser, createaprofil, multiplecompetence]);
        return { success: true };
        }),

        getprofile: protectedProcedure
        .input(z.object({
            id: z.string()
        }))
        .query(async ({ ctx, input }) => {
            const profile = await ctx.prisma.profil.findFirst({
                where :{
                    userId: input.id,
                }
            })
            return profile;
        }),
});
