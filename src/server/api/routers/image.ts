import { z } from "zod";

import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";
import aws from 'aws-sdk';
import { env } from "../../../env/server.mjs";
{/**

const s3 = new aws.S3({
    signatureVersion: 'v4',
    region: 'us-east-1',
    accessKeyId: env.AWS_ACCESS_KEY_ID,
    secretAccessKey: env.AWS_SECRET_ACCESS_KEY,
}); */}
export const ImageRouter = createTRPCRouter({
    
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
    
});
