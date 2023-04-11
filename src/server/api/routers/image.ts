import { z } from 'zod';

import { createTRPCRouter, publicProcedure, protectedProcedure } from '../trpc';

export const ImageRouter = createTRPCRouter({
  hello: publicProcedure.input(z.object({ text: z.string() })).query(({ input }) => {
    return {
      greeting: `Hello ${input.text}`,
    };
  }),

  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.example.findMany();
  }),

  getSecretMessage: protectedProcedure.query(() => {
    return 'you can now see this secret message!';
  }),

  /**
  createpresignedurl: protectedProcedure.mutation(async ({ input, ctx }) => {  
        return new Promise((resolve, reject) => {
            const params = {
                Bucket: 'dabara2',
                Fields : {
                    key: `/portfolio/${ctx.session.user.id}`,
                },
                Expires: 60,
                Conditions: [
                    ['content-length-range', 0, 1048576],
                ],
            };
            s3.createPresignedPost(params, (err, data) => {
                if (err) {
                    reject(err);
                }
                resolve(data);
            });
        });
    }), */

  addportfolio: protectedProcedure
    .input(
      z.object({
        url: z.string(),
        public_id: z.string(),
        title: z.string(),
        description: z.string(),
        link: z.string().optional(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const portfolio = await ctx.prisma.portfolio.create({
        data: {
          url: input.url,
          image: input.public_id,
          title: input.title,
          description: input.description,
          github: input.link || null,
          user: {
            connect: {
              id: ctx.session.user.id,
            },
          },
        },
      });
      return portfolio;
    }),

  getuserimages: publicProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .query(async ({ input, ctx }) => {
      const images = await ctx.prisma.portfolio.findMany({
        where: {
          userId: input.id,
        },
      });
      return images;
    }),

  deleteportfolio: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const portfolio = await ctx.prisma.portfolio.delete({
        where: {
          id: input.id,
        },
      });
      return portfolio;
    }),
});
