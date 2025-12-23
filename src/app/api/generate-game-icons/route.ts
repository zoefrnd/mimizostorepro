import { NextRequest, NextResponse } from 'next/server';
import ZAI from 'z-ai-web-dev-sdk';
import fs from 'fs';
import path from 'path';

// Game icon prompts based on research
const gameIcons = [
  {
    name: 'mobile-legends',
    prompt: 'Mobile Legends Bang Bang logo icon, letter M in gold and yellow gradient, shield emblem shape, professional gaming app icon, white background, high quality, clean design'
  },
  {
    name: 'pubg',
    prompt: 'PUBG Mobile game logo icon, shield badge emblem with yellow and orange gradient, battle royale theme, professional gaming app icon, white background, high quality'
  },
  {
    name: 'free-fire',
    prompt: 'Free Fire game logo icon, character figure with orange and red flames, survival battle royale theme, professional gaming app icon, white background, high quality, dynamic design'
  },
  {
    name: 'genshin-impact',
    prompt: 'Genshin Impact game logo icon, element symbol with wind theme, blue and cyan gradient, anime style, professional gaming app icon, white background, high quality, mystical design'
  },
  {
    name: 'valorant',
    prompt: 'Valorant game logo icon, stylized letter V with red and pink gradient, tactical shooter theme, professional gaming app icon, white background, high quality, modern esports design'
  },
  {
    name: 'steam',
    prompt: 'Steam gaming platform logo icon, gear wheel mechanism with blue and white colors, professional app icon, white background, high quality, clean design'
  },
  {
    name: 'cod',
    prompt: 'Call of Duty Mobile game logo icon, COD text with military theme, green and black colors, tactical shooter style, professional gaming app icon, white background, high quality'
  },
  {
    name: 'efootball',
    prompt: 'eFootball Mobile game logo icon, soccer ball with blue and white colors, sports game theme, professional gaming app icon, white background, high quality, clean design'
  }
];

export async function POST(request: NextRequest) {
  try {
    const { game } = await request.json();

    // Find the game icon prompt
    const gameIcon = gameIcons.find(g => g.name === game);

    if (!gameIcon) {
      return NextResponse.json(
        { error: 'Game not found' },
        { status: 404 }
      );
    }

    // Initialize ZAI SDK
    const zai = await ZAI.create();

    // Generate image
    const response = await zai.images.generations.create({
      prompt: gameIcon.prompt,
      size: '1024x1024'
    });

    if (!response.data || !response.data[0] || !response.data[0].base64) {
      throw new Error('Invalid response from image generation API');
    }

    const imageBase64 = response.data[0].base64;
    const buffer = Buffer.from(imageBase64, 'base64');

    // Create public/icons directory if it doesn't exist
    const publicDir = path.join(process.cwd(), 'public');
    const iconsDir = path.join(publicDir, 'game-icons');

    if (!fs.existsSync(iconsDir)) {
      fs.mkdirSync(iconsDir, { recursive: true });
    }

    // Save the image
    const filename = `${gameIcon.name}-icon.png`;
    const filepath = path.join(iconsDir, filename);
    fs.writeFileSync(filepath, buffer);

    return NextResponse.json({
      success: true,
      game: gameIcon.name,
      imageUrl: `/game-icons/${filename}`,
      prompt: gameIcon.prompt
    });

  } catch (error: any) {
    console.error('Error generating game icon:', error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Failed to generate game icon'
      },
      { status: 500 }
    );
  }
}

// Generate all game icons
export async function GET() {
  try {
    const zai = await ZAI.create();
    const results = [];

    // Create icons directory
    const publicDir = path.join(process.cwd(), 'public');
    const iconsDir = path.join(publicDir, 'game-icons');

    if (!fs.existsSync(iconsDir)) {
      fs.mkdirSync(iconsDir, { recursive: true });
    }

    // Generate all icons
    for (const gameIcon of gameIcons) {
      try {
        console.log(`Generating icon for ${gameIcon.name}...`);

        const response = await zai.images.generations.create({
          prompt: gameIcon.prompt,
          size: '1024x1024'
        });

        if (!response.data || !response.data[0] || !response.data[0].base64) {
          console.error(`Invalid response for ${gameIcon.name}`);
          continue;
        }

        const imageBase64 = response.data[0].base64;
        const buffer = Buffer.from(imageBase64, 'base64');

        const filename = `${gameIcon.name}-icon.png`;
        const filepath = path.join(iconsDir, filename);
        fs.writeFileSync(filepath, buffer);

        results.push({
          success: true,
          game: gameIcon.name,
          imageUrl: `/game-icons/${filename}`
        });

        console.log(`✓ Generated: ${filename}`);

        // Add delay between generations to avoid rate limiting
        await new Promise(resolve => setTimeout(resolve, 1000));

      } catch (error: any) {
        console.error(`✗ Failed to generate ${gameIcon.name}:`, error.message);
        results.push({
          success: false,
          game: gameIcon.name,
          error: error.message
        });
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Generated all game icons',
      results
    });

  } catch (error: any) {
    console.error('Error generating game icons:', error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Failed to generate game icons'
      },
      { status: 500 }
    );
  }
}
