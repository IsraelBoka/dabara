import { z } from 'zod';

import { createTRPCRouter, publicProcedure, protectedProcedure } from '../trpc';

export const pageRouter = createTRPCRouter({
  hello: publicProcedure.input(z.object({ text: z.string() })).query(({ input }) => {
    return {
      greeting: `Hello ${input.text}`,
    };
  }),

  getUser: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.user.findUnique({
      where: {
        id: ctx.session?.user?.id,
      },
    });
  }),

  getProfileUser: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const profile = await ctx.prisma.profil.findFirst({
        where: {
          userId: input.id,
        },
      });
      return profile;
    }),

  Updatepage: protectedProcedure
    .input(z.object({ page: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const page = await ctx.prisma.user.update({
        where: { id: ctx.session.user.id },
        data: { page: input.page },
      });
      return page;
    }),

  getPage: publicProcedure.input(z.object({ page: z.string() })).query(async ({ input, ctx }) => {
    const page = await ctx.prisma.user.findFirst({
      where: { page: input.page },
      include: {
        Profil: true,
        Competence: true,
      },
    });
    return page;
  }),

  getPagebyId: protectedProcedure.query(async ({ ctx }) => {
    const page = await ctx.prisma.user.findFirst({
      select: {
        page: true,
      },
      where: { id: ctx.session.user.id },
    });
    return page;
  }),

  verifypage: protectedProcedure
    .input(z.object({ page: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const page = await ctx.prisma.user.findFirst({
        where: { page: input.page },
      });
      if (page) {
        return true;
      } else {
        return false;
      }
    }),

  updateuser: protectedProcedure
    .input(
      z.object({
        name: z.string().optional(),
        email: z.string().email().optional(),
        disponibilite: z.string().optional(),
        adresse: z.string().optional(),
        about: z.string().optional(),
        fonction: z.string().optional(),
        competence: z.string().array().optional(),
        tafencours: z.string().optional(),
        website: z.string().optional(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      if (input.competence) {
        const deletecompetence = ctx.prisma.competence.deleteMany({
          where: {
            userId: ctx.session.user.id,
          },
        });

        const createcompetence = ctx.prisma.competence.createMany({
          data: input.competence.map((name) => ({
            name,
            userId: ctx.session.user.id,
          })),
        });

        return ctx.prisma.$transaction([deletecompetence, createcompetence]);
      }

      const updatetheuser = ctx.prisma.user.update({
        data: {
          name: input.name,
          email: input.email,
          about: input.about,
          fonction: input.fonction,
          adresse: input.adresse,
          disponibilite: input.disponibilite,
          Profil: {
            update: {
              travailencours: input.tafencours,
              website: input.website,
            },
          },
        },

        where: { id: ctx.session.user.id },
      });

      return updatetheuser;
    }),
});
