import { z } from 'zod';

import { createTRPCRouter, publicProcedure, protectedProcedure } from '../trpc';
import aws from 'aws-sdk';
import { env } from '../../../env/server.mjs';

const s3 = new aws.S3({
  signatureVersion: 'v4',
  region: 'us-east-1',
  accessKeyId: env.AWS_ACCESS_KEY_ID,
  secretAccessKey: env.AWS_SECRET_ACCESS_KEY,
});

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

  createpresignedurl: protectedProcedure
    .input(
      z.object({
        filename: z.string(),
        filetype: z.string(),
      }),
    )
    .mutation(({ input, ctx }) => {
      const url = s3.getSignedUrl('putObject', {
        Bucket: env.AWS_BUCKET_NAME,
        Key: `portfolio/${ctx.session.user.id}/${input.filename}`,
        ContentType: input.filetype,
        Expires: 60 * 5,
      });

      return url;
    }),

  addportfolio: protectedProcedure
    .input(
      z.object({
        public_id: z.string(),
        title: z.string(),
        description: z.string(),
        link: z.string().optional(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const portfolio = await ctx.prisma.portfolio.create({
        data: {
          url: `https://${env.AWS_BUCKET_NAME}.s3.amazonaws.com/portfolio/${ctx.session.user.id}/${input.public_id}`,
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
