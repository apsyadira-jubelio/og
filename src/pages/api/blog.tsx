/* eslint-disable @next/next/no-img-element */
import { ImageResponse } from '@vercel/og';
import clsx from 'clsx';
import { NextRequest } from 'next/server';
import { CSSProperties } from 'react';

import { apiURL } from '@/constant/env';

export const inter400 = fetch(
  new URL('../../assets/Inter-Regular.ttf', import.meta.url)
).then((res) => res.arrayBuffer());

export const inter500 = fetch(
  new URL('../../assets/Inter-Medium.ttf', import.meta.url)
).then((res) => res.arrayBuffer());

export const config = {
  runtime: 'experimental-edge',
  revalidate: 10,
};

export default async function handler(req: NextRequest) {
  const interRegular = await inter400;
  const interMedium = await inter500;

  const { searchParams } = new URL(req.url);

  const siteName = searchParams.get('siteName');
  const description = searchParams.get('description');
  const theme = searchParams.get('theme');
  const logo = searchParams.get('logo');
  const templateTitle = searchParams.get('templateTitle');
  const logoWidth = searchParams.get('logoWidth');
  const logoHeight = searchParams.get('logoHeight');
  const banner = searchParams.get('banner');

  const query = {
    siteName: siteName ?? 'Site Name',
    description: description ?? 'Description',
    theme: theme ?? 'dark',
    logo: logo ?? `${apiURL}/jpage.png`,
    templateTitle,
    logoWidth: logoWidth ? +logoWidth : 100,
    logoHeight: logoHeight ? +logoHeight : undefined,
    banner: banner ?? `${apiURL}/jpage.png`,
  };

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          fontFamily: 'Inter',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          backgroundColor: 'rgba(14,17,17,1)',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            gap: '1rem',
            height: '100%',
            width: '100%',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              textAlign: 'left',
              height: '100%',
              width: '0%',
              flexGrow: 1,
              padding: '4rem 0 5rem 3rem',
            }}
          >
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: '-32px',
              }}
            >
              <img
                style={{
                  width: 50,
                  height: 30,
                }}
                src={`${apiURL}/icons/${
                  query.theme === 'dark' ? 'light.png' : 'dark.png'
                }`}
                alt='Favicon'
              />
              <h3
                tw={clsx(
                  'ml-2 text-3xl font-bold',
                  query.theme === 'dark' ? 'text-gray-300' : 'text-black'
                )}
              >
                /{query.siteName}
              </h3>
            </div>
            <h1 tw={clsx('mt-0', 'text-4xl leading-tight font-normal')}>
              <span
                style={
                  {
                    backgroundImage: 'linear-gradient(90deg, #00e887, #00e0f3)',
                    backgroundClip: 'text',
                    '-webkit-background-clip': 'text',
                    color: 'transparent',
                    padding: '0.5rem 0',
                  } as CSSProperties
                }
              >
                {query.templateTitle}
              </span>
            </h1>
            {description && (
              <p tw='mt-0 text-xl text-gray-300'>{description}</p>
            )}
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                gap: '1.4rem',
                alignItems: 'center',
                marginTop: 'auto',
              }}
            >
              <img
                tw='w-[80px] rounded-full'
                src={query.logo}
                alt='Photo of me'
              />
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.1rem',
                }}
              >
                <p
                  style={{ margin: 0 }}
                  tw='font-medium text-[1.6rem] mt-0 text-white'
                >
                  {templateTitle}
                </p>
                <p style={{ margin: 0 }} tw='text-xl mt-0 text-gray-300'>
                  @{siteName}
                </p>
              </div>
            </div>
          </div>

          {banner && (
            <div style={{ display: 'flex' }}>
              <img tw={clsx('h-[100vh] block')} src={banner} alt='Banner' />
              <div
                style={{
                  backgroundImage:
                    'linear-gradient(to right, rgba(14,17,17,1), rgba(0,0,0,0))',
                }}
                tw={clsx(['absolute inset-0 '])}
              ></div>
            </div>
          )}
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      emoji: 'twemoji',
      fonts: [
        {
          name: 'Inter',
          data: interRegular,
          weight: 400,
        },
        {
          name: 'Inter',
          data: interMedium,
          weight: 500,
        },
      ],
    }
  );
}
