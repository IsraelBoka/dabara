import { ImageResponse } from '@vercel/og';
import { type NextRequest } from 'next/server';
import { Logo } from '../../components/icons/logo';

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
  const title = searchParams.get('title') || 'Boka Israël';
  const image =
    searchParams.get('image') ||
    'https://og-image.now.sh/**Hello%20World**.png?theme=light&md=1&fontSize=100px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fvercel-triangle-white.svg';
  const fonction = searchParams.get('fonction') || 'Développeur';

  const interMediumFontData = await interMedium;
  const interRegularFontData = await interRegular;

  return new ImageResponse(
    (
      <div tw="flex h-full bg-[#1c1e2b] flex-row-reverse text-[#f7f8f8]">
        <div tw="w-1/2 flex h-full bg-[#21232f]">
          <div tw="flex flex-col mx-auto my-auto items-center ">
            {/* es-lint-disable-next-line @next/no-img-element */}
            <img
              src={image}
              tw=" rounded-full flex h-[150px] w-[150px] "
              width={200}
              height={200}
              alt="rien du tout "
            />

            <h1 tw="text-2xl font-medium">{fonction}</h1>
          </div>
          <div
            tw="absolute left-[-80px] top-[-30px]  h-[120%] bg-[#1c1e2b]  w-[150px] "
            style={{
              transform: 'rotate(12deg)',
            }}
          ></div>
        </div>
        <div tw="w-1/2  flex flex-col mt-auto p-8 mb-auto z-10 relative">
          <div tw="flex flex-row items-center border rounded-md">
            <svg
              width="947"
              height="945"
              style={{
                height: '70px',
                width: '70px',
                border: '1px solid #f7f8f8',
                borderRadius: '10%',
              }}
              viewBox="0 0 947 945"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g filter="url(#filter0_d_80411_82)">
                <g filter="url(#filter1_d_80411_82)">
                  <path
                    d="M676.564 215.658C621.246 158.47 543.582 127.431 460.658 129.369C377.734 131.307 296.343 166.064 234.39 225.992C172.436 285.921 134.996 366.112 130.304 448.926C125.613 531.74 154.055 610.391 209.373 667.579L442.969 441.619L676.564 215.658Z"
                    fill="#93C5FD"
                  />
                </g>
                <g filter="url(#filter2_d_80411_82)">
                  <path
                    d="M269.492 728.239C324.522 785.704 402.029 817.133 484.961 815.612C567.894 814.091 649.459 779.745 711.713 720.129C773.967 660.512 811.81 580.51 816.918 497.721C822.026 414.932 793.98 336.138 738.95 278.673L504.221 503.456L269.492 728.239Z"
                    fill="#FDE047"
                  />
                </g>
              </g>
              <defs>
                <filter
                  id="filter0_d_80411_82"
                  x="125.804"
                  y="129.284"
                  width="695.707"
                  height="694.381"
                  filterUnits="userSpaceOnUse"
                  colorInterpolationFilters="sRGB"
                >
                  <feFlood floodOpacity="0" result="BackgroundImageFix" />
                  <feColorMatrix
                    in="SourceAlpha"
                    type="matrix"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                    result="hardAlpha"
                  />
                  <feOffset dy="4" />
                  <feGaussianBlur stdDeviation="2" />
                  <feComposite in2="hardAlpha" operator="out" />
                  <feColorMatrix
                    type="matrix"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
                  />
                  <feBlend
                    mode="normal"
                    in2="BackgroundImageFix"
                    result="effect1_dropShadow_80411_82"
                  />
                  <feBlend
                    mode="normal"
                    in="SourceGraphic"
                    in2="effect1_dropShadow_80411_82"
                    result="shape"
                  />
                </filter>
                <filter
                  id="filter1_d_80411_82"
                  x="125.804"
                  y="129.284"
                  width="554.76"
                  height="546.295"
                  filterUnits="userSpaceOnUse"
                  colorInterpolationFilters="sRGB"
                >
                  <feFlood floodOpacity="0" result="BackgroundImageFix" />
                  <feColorMatrix
                    in="SourceAlpha"
                    type="matrix"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                    result="hardAlpha"
                  />
                  <feOffset dy="4" />
                  <feGaussianBlur stdDeviation="2" />
                  <feComposite in2="hardAlpha" operator="out" />
                  <feColorMatrix
                    type="matrix"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
                  />
                  <feBlend
                    mode="normal"
                    in2="BackgroundImageFix"
                    result="effect1_dropShadow_80411_82"
                  />
                  <feBlend
                    mode="normal"
                    in="SourceGraphic"
                    in2="effect1_dropShadow_80411_82"
                    result="shape"
                  />
                </filter>
                <filter
                  id="filter2_d_80411_82"
                  x="265.492"
                  y="278.673"
                  width="556.019"
                  height="544.992"
                  filterUnits="userSpaceOnUse"
                  colorInterpolationFilters="sRGB"
                >
                  <feFlood floodOpacity="0" result="BackgroundImageFix" />
                  <feColorMatrix
                    in="SourceAlpha"
                    type="matrix"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                    result="hardAlpha"
                  />
                  <feOffset dy="4" />
                  <feGaussianBlur stdDeviation="2" />
                  <feComposite in2="hardAlpha" operator="out" />
                  <feColorMatrix
                    type="matrix"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
                  />
                  <feBlend
                    mode="normal"
                    in2="BackgroundImageFix"
                    result="effect1_dropShadow_80411_82"
                  />
                  <feBlend
                    mode="normal"
                    in="SourceGraphic"
                    in2="effect1_dropShadow_80411_82"
                    result="shape"
                  />
                </filter>
              </defs>
            </svg>
          </div>
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
