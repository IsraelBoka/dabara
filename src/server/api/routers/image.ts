import { z } from 'zod';

import { createTRPCRouter, publicProcedure, protectedProcedure } from '../trpc';
import aws from 'aws-sdk';
import { env } from '../../../env/server.mjs';
import cloudinary from 'cloudinary';
{
  /**

const s3 = new aws.S3({
    signatureVersion: 'v4',
    region: 'us-east-1',
    accessKeyId: env.AWS_ACCESS_KEY_ID,
    secretAccessKey: env.AWS_SECRET_ACCESS_KEY,
}); */
}

cloudinary.v2.config({
  cloud_name: env.CLOUDINARY_CLOUD_NAME,
  api_key: env.CLOUDINARY_API_KEY,
  api_secret: env.CLOUDINARY_API_SECRET,
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
        file: z.any(),
      }),
    )
    .mutation(({ input, ctx }) => {
      const url = cloudinary.v2.utils.url(`${ctx.session.user.id}`, {
        sign_url: true,
        type: 'fetch',
        expires_at: new Date().getTime() + 3600,
        cloud_name: env.CLOUDINARY_CLOUD_NAME,
        api_key: env.CLOUDINARY_API_KEY,
        api_secret: env.CLOUDINARY_API_SECRET,
      });

      {
        /**  const preset = await cloudinary.v2.api
        .create_upload_preset({
          name: `${ctx.session.user.id} - portfolio`,
          unsigned: false,
          folder: 'portfolio',
          allowed_formats: 'jpg, png',
        })
        .then((result) => {
          console.log(result);
        })
        .catch((error) => {
          console.log(error);
        });

      
      await cloudinary.v2.uploader
        .upload(input.file.path, {
          public_id: `portfolio / ${ctx.session.user.id}`,
          upload_preset: 'cld7jf1e90000upxwvrnrosba - portfolio',
        })
        .then((result) => {
          console.log('result : ', result);
        })
        .catch((error) => {
          console.log('error : ', error);
        });**/
      }

      return {
        url,
      };
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
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const portfolio = await ctx.prisma.portfolio.create({
        data: {
          url: input.url,
          image: input.public_id,
          userId: ctx.session.user.id,
          user: {
            connect: {
              id: ctx.session.user.id,
            },
          },
        },
      });
      return portfolio;
    }),
});
