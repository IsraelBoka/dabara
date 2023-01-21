import { z } from "zod";

import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";

export const ProfilRouter = createTRPCRouter({
  addprofiletouser: protectedProcedure
  .input(
    z.object({
    name :z.string(),
    email: z.string(),
    about: z.string(),
    page: z.string(),
    fonction : z.string(),
    website: z.string().nullable(),
    facebook: z.string().nullable(),
    instagram : z.string().nullable(),
    twitter : z.string().nullable(),
    youtube : z.string().nullable(),
    linkedin : z.string().nullable(),
    github : z.string().nullable() }))
    .mutation(async ({ input, ctx }) => {
        const user = await ctx.prisma.user.update({
            where: { id: ctx.session.user.id },
            data: {
            name: input.name,
            about: input.about, 
            page : input.page,
            fonction : input.fonction,
            },
        });

        const profile = await ctx.prisma.profile.create({
            data: {
            email: input.email,
            website: input.website,
            facebook: input.facebook,
            instagram : input.instagram,
            twitter : input.twitter,
            youtube : input.youtube,
            linkedin : input.linkedin,
            github : input.github,
            user: {
                connect: {
                id: ctx.session.user.id,
                },
            },
            },
        });


        const valider = await ctx.prisma.$transaction([user, profile]);
        return valider;
        }),
});
