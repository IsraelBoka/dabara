import { z } from 'zod';

import { createTRPCRouter, publicProcedure, protectedProcedure } from '../trpc';

export const ProfileRouter = createTRPCRouter({
  addprofiletouser: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        email: z.string(),
        about: z.string(),
        page: z.string(),
        fonction: z.string(),
        competence: z.string().array(),
        residence: z.string(),
        website: z.string().optional(),
        facebook: z.string().optional(),
        instagram: z.string().optional(),
        twitter: z.string().optional(),
        youtube: z.string().optional(),
        linkedin: z.string().optional(),
        github: z.string().optional(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const updatetheuser = ctx.prisma.user.update({
        where: { id: ctx.session.user.id },
        data: {
          name: input.name,
          about: input.about,
          page: input.page,
          fonction: input.fonction,
        },
      });

      const createaprofil = ctx.prisma.profil.create({
        data: {
          name: input.name,
          email: input.email,
          website: input.website,
          facebook: input.facebook,
          instagram: input.instagram,
          twitter: input.twitter,
          youtube: input.youtube,
          linkedin: input.linkedin,
          github: input.github,
          userId: ctx.session.user.id,
        },
      });

      const multiplecompetence = ctx.prisma.competence.createMany({
        data: input.competence?.map((competence) => ({
          name: competence,
          niveau: '0',
          userId: ctx.session.user.id,
        })),
      });

      await ctx.prisma.$transaction([updatetheuser, createaprofil, multiplecompetence]);
      return { success: true };
    }),

  getprofile: protectedProcedure
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

  searchprofile: publicProcedure
    .input(
      z.object({
        search: z.string(),
        Tags: z.string().array().optional(),
        cursor: z.string().nullish(),
        limit: z.number().min(1).max(100).nullish(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const limit = input.limit ?? 50;
      const { cursor } = input;

      if (input.Tags === undefined || input.Tags.length === 0) {
        const profile = await ctx.prisma.user.findMany({
          take: limit + 1, // get an extra item at the end which we'll use as next cursor

          include: {
            Competence: true,
          },
          where: {
            name: {
              contains: input.search,
            },
            page: {
              not: null,
            },
          },

          cursor: cursor ? { id: cursor } : undefined,
          orderBy: {
            id: 'asc',
          },
        });

        let nextCursor: typeof cursor | undefined = undefined;
        if (profile.length > limit) {
          const nextItem = profile.pop();
          nextCursor = nextItem?.id;
        }
        return {
          profile,
          nextCursor,
        };
      }
    }),

  incrementview: publicProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const profile = await ctx.prisma.profil.update({
        where: {
          userId: input.id,
        },
        data: {
          views: {
            increment: 1,
          },
        },
      });
      return profile;
    }),

  updateprofile: protectedProcedure
    .input(
      z.object({
        name: z.string().optional(),
        email: z.string().optional(),
        about: z.string().optional(),
        page: z.string().optional(),
        fonction: z.string().optional(),
        competence: z.string().array().optional(),
        residence: z.string().optional(),
        website: z.string().optional(),
        facebook: z.string().optional(),
        instagram: z.string().optional(),
        twitter: z.string().optional(),
        youtube: z.string().optional(),
        linkedin: z.string().optional(),
        github: z.string().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const profile = await ctx.prisma.profil.update({
        where: {
          userId: ctx.session.user.id,
        },
        data: {
          name: input.name,
          email: input.email,
          website: input.website,
          facebook: input.facebook,
          instagram: input.instagram,
          twitter: input.twitter,
          youtube: input.youtube,
          linkedin: input.linkedin,
          github: input.github,
        },
      });
      return profile;
    }),

  updateportfolio: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        title: z.string().optional(),
        description: z.string().optional(),
        link: z.string().optional(),
        image: z.string().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const portfolio = await ctx.prisma.portfolio.updateMany({
        data: {
          title: input.title,
          description: input.description,
          github: input.link,
          image: input.image,
        },

        where: {
          id: input.id,
          userId: ctx.session.user.id,
        },
      });

      return portfolio;
    }),
});
