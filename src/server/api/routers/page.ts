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
        email: z.string().optional(),
        about: z.string().optional(),
        fonction: z.string().optional(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const user = await ctx.prisma.user.update({
        where: { id: ctx.session.user.id },
        data: {
          name: input.name,
          email: input.email,
          about: input.about,
          fonction: input.fonction,
        },
      });
      return user;
    }),
});
