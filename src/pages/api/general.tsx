/* eslint-disable @next/next/no-img-element */
import { ImageResponse } from '@vercel/og';
import clsx from 'clsx';
import { NextRequest } from 'next/server';

import { deploymentURL } from '@/constant/env';

export const inter400 = fetch(
  new URL('../../assets/Inter-Regular.ttf', import.meta.url)
).then((res) => res.arrayBuffer());

export const inter700 = fetch(
  new URL('../../assets/Inter-Bold.ttf', import.meta.url)
).then((res) => res.arrayBuffer());

export const config = {
  runtime: 'experimental-edge',
};

export default async function handler(req: NextRequest) {
  const interRegular = await inter400;
  const interBold = await inter700;

  const { searchParams } = new URL(req.url);

  const siteName = searchParams.get('siteName');
  const description = searchParams.get('description');
  const theme = searchParams.get('theme');
  const logo = searchParams.get('logo');
  const templateTitle = searchParams.get('templateTitle');
  const logoWidth = searchParams.get('logoWidth');
  const logoHeight = searchParams.get('logoHeight');

  const query = {
    siteName: siteName ?? 'Site Name',
    description: description ?? 'Description',
    theme: theme ?? 'dark',
    logo: logo ?? `${deploymentURL}/images/logo.jpg`,
    templateTitle,
    logoWidth: logoWidth ? +logoWidth : 100,
    logoHeight: logoHeight ? +logoHeight : undefined,
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
					padding: '0 5rem',
					backgroundImage: clsx(
						query.theme === 'dark'
							? 'linear-gradient(to right top, #89456a, #8c3871, #8c297b, #881a88, #7e0997, #6f32b4, #544bce, #0061e6, #0085f3, #009bd2, #00a999, #0cb160)'
							: 'linear-gradient(to right top, #fb5ab0, #ff608c, #ff7468, #ff9146, #ffaf29, #edc020, #d7d027, #bedf3b, #a4e551, #87e967, #66ec7f, #38ef97)'
					),
					// backgroundColor: clsx(query.theme === 'dark' ? '#222' : '#fff'),
				}}
			>
				<img
					style={{
						width: 250,
						height: 250,
						borderRadius: '100%',
						border: '2px white',
					}}
					src={query.logo}
					alt='Favicon'
				/>
				{query.templateTitle ? (
					<div
						style={{
							display: 'flex',
							flexDirection: 'column',
							justifyContent: 'center',
							alignItems: 'center',
							marginTop: '30px',
						}}
					>
						<h1 tw={clsx('mt-8', 'text-6xl font-bold', query.theme === 'dark' ? 'text-white' : 'text-black')}>
							{query.templateTitle}
						</h1>
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
								src={`${process.env.NEXT_PUBLIC_DOMAIN_URL}/icons/${query.theme === 'dark' ? 'light.png' : 'dark.png'}`}
								alt='Favicon'
							/>
							<h4 tw={clsx('ml-2 text-3xl font-bold', query.theme === 'dark' ? 'text-white' : 'text-black')}>
								/{query.siteName}
							</h4>
						</div>
					</div>
				) : (
					<h1 tw={clsx('mt-6', 'text-6xl font-bold', query.theme === 'dark' ? 'text-white' : 'text-black')}>
						{query.siteName}
					</h1>
				)}
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
          data: interBold,
          weight: 700,
        },
      ],
    }
  );
}
