import { ImageResponse } from '@vercel/og';

export const config = {
  runtime: 'edge',
};

export default function handler(_request: Request) {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: '#1f1f1f',
          padding: '64px 72px',
          color: '#f5f5f5',
        }}
      >
        {/* Wordmark — top-left */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            fontSize: 32,
            fontWeight: 600,
            letterSpacing: '0.02em',
            color: '#ffffff',
          }}
        >
          LORE
        </div>

        {/* Headline — centered */}
        <div
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'flex-start',
            paddingRight: 80,
          }}
        >
          <div
            style={{
              fontSize: 60,
              fontWeight: 500,
              lineHeight: 1.15,
              letterSpacing: '-0.02em',
              color: '#ffffff',
            }}
          >
            Qualified custody and tokenization for emerging-market fund managers
          </div>
        </div>

        {/* 3-stat strip — bottom */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            borderTop: '1px solid #333333',
            paddingTop: 28,
            gap: 56,
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: 32, fontWeight: 600, color: '#ffffff' }}>
              $847.3M
            </span>
            <span style={{ fontSize: 18, color: '#9a9a9a', marginTop: 4 }}>
              AUM
            </span>
          </div>
          <div style={{ width: 1, height: 56, backgroundColor: '#333333' }} />
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: 32, fontWeight: 600, color: '#ffffff' }}>
              14
            </span>
            <span style={{ fontSize: 18, color: '#9a9a9a', marginTop: 4 }}>
              LTPs
            </span>
          </div>
          <div style={{ width: 1, height: 56, backgroundColor: '#333333' }} />
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: 32, fontWeight: 600, color: '#ffffff' }}>
              312
            </span>
            <span style={{ fontSize: 18, color: '#9a9a9a', marginTop: 4 }}>
              Investors
            </span>
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      headers: {
        'Cache-Control': 'public, max-age=86400, stale-while-revalidate=604800',
      },
    }
  );
}
