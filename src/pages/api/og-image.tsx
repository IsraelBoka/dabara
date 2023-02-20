import { ImageResponse } from '@vercel/og';
import { type NextRequest } from 'next/server';

export const config = {
  runtime: 'experimental-edge',
};

const interMedium = fetch(new URL('../../../public/fonts/Inter-Medium.ttf', import.meta.url)).then(
  (res) => res.arrayBuffer(),
);

const interRegular = fetch(
  new URL('../../../public/fonts/Inter-Regular.ttf', import.meta.url),
).then((res) => res.arrayBuffer());

const handler = async (req: NextRequest) => {
  const searchParams = new URLSearchParams(req.nextUrl.search);
  const title = searchParams.get('title') || 'Hello World';
  const image =
    searchParams.get('image') ||
    'https://og-image.now.sh/**Hello%20World**.png?theme=light&md=1&fontSize=100px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fvercel-triangle-white.svg';
  const interMediumFontData = await interMedium;
  const interRegularFontData = await interRegular;

  return new ImageResponse(
    (
      <div tw="flex h-full bg-[#1c1e2b] flex-row-reverse text-[#f7f8f8]">
        <div tw="w-1/2 flex h-full bg-[#21232f]">
          {
            // eslint-disable-next-line @next/next/no-img-element
          }
          <div tw="flex flex-col mx-auto my-auto items-center ">
            <img
              src={image}
              tw=" rounded-full flex h-[150px] w-[150px] "
              width={200}
              height={200}
              alt="rien du tout "
            />

            <h1 tw="text-2xl font-medium"> Développeur web fullstack</h1>
          </div>
          <div
            tw="absolute left-[-80px] top-[-30px]  h-[120%] bg-[#1c1e2b]  w-[150px] "
            style={{
              transform: 'rotate(12deg)',
            }}
          ></div>
        </div>
        <div tw="w-1/2  flex flex-col mt-auto p-8 mb-auto z-10 relative">
          <h1 tw="text-5xl">Découvrez le portfolio de {title} </h1>
          <h1 tw="text-3xl">Parcourez son travail et contactez-le pour vos projets</h1>
        </div>
      </div>
    ),
    {
      fonts: [
        {
          name: 'Inter',
          data: interMediumFontData,
          weight: 500,
        },
        {
          name: 'Inter',
          data: interRegularFontData,
          weight: 400,
        },
      ],
    },
  );
};

export default handler;
