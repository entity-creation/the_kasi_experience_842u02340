// =============================================================
// THEME CONFIGURATION SYSTEM
// Each ThemeConfig drives colors, typography, animations, and
// component-level styling across every tier and shared component.
// =============================================================

export type ThemeConfig = {
  colors: {
    background: string;
    surface: string;
    primary: string;
    secondary: string;
    accent: string;
    text: string;
    textLight?: string;
    shadow: string;
  };
  typography: {
    headingFont: string;
    bodyFont: string;
    letterFont?: string;
    headingSize: string;
    bodySize: string;
  };
  animations: {
    letterReveal: 'typewriter' | 'inkSpread' | 'fold' | 'subtitle';
    transitionPreset: 'fadeSlow' | 'cinematic' | 'bounce' | 'bloom';
    photoEffect: 'fade' | 'kenBurns' | 'polaroid' | 'sticker';
    buttonHover: 'scale' | 'glow' | 'pulse';
  };
  layout: {
    backgroundStyle: string;
    cardStyle: string;
    spacing: 'tight' | 'comfortable' | 'generous';
  };
  components: {
    letter: {
      backgroundTexture: string;
      waxSealAnimation: boolean;
      handwritingAnimation: boolean;
      paperFoldEffect: boolean;
    };
    photos: {
      maxPerPage: number;
      frameStyle: 'none' | 'rounded' | 'polaroid' | 'tilted' | 'spotlight';
      hoverEffect: 'zoom' | 'glow' | 'none';
      transition: 'fade' | 'kenBurns' | 'slide';
    };
    audio: {
      playerStyle: 'minimal' | 'vinyl' | 'filmScore' | 'boombox' | 'luxuryVinyl';
      waveformAnimation: boolean;
    };
    video: {
      frameStyle: 'rounded' | 'cinemaScreen' | 'vintage' | 'phoneMockup';
      fullscreenOnPlay: boolean;
    };
    buttons: {
      shape: 'rounded' | 'heart' | 'bubble' | 'thinOutline';
      hoverAnimation: 'scale' | 'glow' | 'bounce';
      soundEffect?: boolean;
    };
    groupMessages: {
      presentation: 'heartBalloons' | 'filmStrips' | 'bouncingBubbles' | 'goldEnvelopes';
      animation: 'float' | 'slide' | 'pop';
    };
    giftReveal: {
      animation: 'boxOpen' | 'hologram' | 'confetti' | 'jewelryBox';
      particleEffect: 'petals' | 'lightBeams' | 'confetti' | 'goldDust';
    };
    quiz: {
      cardStyle: 'loveLetter' | 'floating3D' | 'gameShow' | 'tarot';
      revealEffect: 'hover' | 'flip' | 'shake';
    };
  };
  transitions: {
    sceneTransition: 'fade' | 'fadeToBlack' | 'slideBounce' | 'bloom';
    duration: number;
    easing: string;
  };
  endingScreen: {
    message: string;
    animation: 'fadeOut' | 'zoomOut' | 'confetti' | 'goldParticles';
  };
};

// =============================================================
// THEME IMPLEMENTATIONS
// =============================================================

export const themes: Record<string, ThemeConfig> = {

  // -----------------------------------------------------------
  // GENERIC – Clean, minimal, universally warm. Default for Tier 1.
  // -----------------------------------------------------------
  generic: {
    colors: {
      background: '#FAFAFA',
      surface: '#FFFFFF',
      primary: '#EDE7DD',
      secondary: '#D1C7B8',
      accent: '#C4A484',
      text: '#333333',
      textLight: '#888888',
      shadow: 'rgba(0,0,0,0.06)',
    },
    typography: {
      headingFont: "'Cormorant', serif",
      bodyFont: "'Lato', sans-serif",
      letterFont: "'EB Garamond', serif",
      headingSize: '2rem',
      bodySize: '1rem',
    },
    animations: {
      letterReveal: 'typewriter',
      transitionPreset: 'fadeSlow',
      photoEffect: 'fade',
      buttonHover: 'scale',
    },
    layout: {
      backgroundStyle: 'soft-white',
      cardStyle: 'rounded-panel',
      spacing: 'comfortable',
    },
    components: {
      letter: { backgroundTexture: 'vintage-paper', waxSealAnimation: false, handwritingAnimation: true, paperFoldEffect: false },
      photos: { maxPerPage: 8, frameStyle: 'rounded', hoverEffect: 'zoom', transition: 'fade' },
      audio: { playerStyle: 'minimal', waveformAnimation: false },
      video: { frameStyle: 'rounded', fullscreenOnPlay: false },
      buttons: { shape: 'rounded', hoverAnimation: 'scale' },
      groupMessages: { presentation: 'goldEnvelopes', animation: 'slide' },
      giftReveal: { animation: 'boxOpen', particleEffect: 'petals' },
      quiz: { cardStyle: 'loveLetter', revealEffect: 'hover' },
    },
    transitions: { sceneTransition: 'fade', duration: 0.8, easing: 'easeInOut' },
    endingScreen: { message: 'Made with care for you', animation: 'fadeOut' },
  },

  // -----------------------------------------------------------
  // ROMANTIC – Soft pinks, gold, wax seals, polaroids, vinyl.
  // -----------------------------------------------------------
  romantic: {
    colors: {
      background: '#FADADD',
      surface: '#FFF1E6',
      primary: '#F8C8D2',
      secondary: '#FFB7B2',
      accent: '#D4AF37',
      text: '#4A3B3B',
      textLight: '#9C7B7B',
      shadow: 'rgba(0,0,0,0.10)',
    },
    typography: {
      headingFont: "'Playfair Display', serif",
      bodyFont: "'Cormorant Garamond', serif",
      letterFont: "'Great Vibes', cursive",
      headingSize: '2.5rem',
      bodySize: '1.1rem',
    },
    animations: {
      letterReveal: 'inkSpread',
      transitionPreset: 'fadeSlow',
      photoEffect: 'polaroid',
      buttonHover: 'pulse',
    },
    layout: {
      backgroundStyle: 'soft-blur-hearts',
      cardStyle: 'floating-card',
      spacing: 'generous',
    },
    components: {
      letter: { backgroundTexture: 'vintage-paper', waxSealAnimation: true, handwritingAnimation: true, paperFoldEffect: true },
      photos: { maxPerPage: 8, frameStyle: 'polaroid', hoverEffect: 'glow', transition: 'fade' },
      audio: { playerStyle: 'vinyl', waveformAnimation: true },
      video: { frameStyle: 'vintage', fullscreenOnPlay: false },
      buttons: { shape: 'heart', hoverAnimation: 'bounce' },
      groupMessages: { presentation: 'heartBalloons', animation: 'float' },
      giftReveal: { animation: 'boxOpen', particleEffect: 'petals' },
      quiz: { cardStyle: 'loveLetter', revealEffect: 'hover' },
    },
    transitions: { sceneTransition: 'fade', duration: 1.2, easing: 'easeInOut' },
    endingScreen: { message: 'Forever begins here…', animation: 'fadeOut' },
  },

  // -----------------------------------------------------------
  // CINEMATIC – Dark navy, neon blue, Ken Burns, film score.
  // -----------------------------------------------------------
  cinematic: {
    colors: {
      background: '#0B0F1A',
      surface: '#1A1F2E',
      primary: '#4DA3FF',
      secondary: '#2C3E66',
      accent: '#E0E7FF',
      text: '#F0F0F0',
      textLight: '#8899BB',
      shadow: 'rgba(0,0,0,0.6)',
    },
    typography: {
      headingFont: "'Montserrat', sans-serif",
      bodyFont: "'Open Sans', sans-serif",
      letterFont: "'Courier Prime', monospace",
      headingSize: '3rem',
      bodySize: '1rem',
    },
    animations: {
      letterReveal: 'subtitle',
      transitionPreset: 'cinematic',
      photoEffect: 'kenBurns',
      buttonHover: 'glow',
    },
    layout: {
      backgroundStyle: 'full-screen-scene',
      cardStyle: 'letterbox',
      spacing: 'generous',
    },
    components: {
      letter: { backgroundTexture: 'subtitle-overlay', waxSealAnimation: false, handwritingAnimation: false, paperFoldEffect: false },
      photos: { maxPerPage: 6, frameStyle: 'none', hoverEffect: 'none', transition: 'kenBurns' },
      audio: { playerStyle: 'filmScore', waveformAnimation: true },
      video: { frameStyle: 'cinemaScreen', fullscreenOnPlay: true },
      buttons: { shape: 'thinOutline', hoverAnimation: 'glow' },
      groupMessages: { presentation: 'filmStrips', animation: 'slide' },
      giftReveal: { animation: 'hologram', particleEffect: 'lightBeams' },
      quiz: { cardStyle: 'floating3D', revealEffect: 'hover' },
    },
    transitions: { sceneTransition: 'fadeToBlack', duration: 0.6, easing: 'easeInOut' },
    endingScreen: { message: 'End of Chapter One', animation: 'zoomOut' },
  },

  // -----------------------------------------------------------
  // PLAYFUL – Bright gradients, bouncy cards, boombox, confetti.
  // -----------------------------------------------------------
  playful: {
    colors: {
      background: 'linear-gradient(135deg, #FFE0F0 0%, #E0F7FA 100%)',
      surface: '#FFFFFF',
      primary: '#FFB347',
      secondary: '#A2E1E0',
      accent: '#FF6F61',
      text: '#2D2D2D',
      textLight: '#777777',
      shadow: 'rgba(0,0,0,0.10)',
    },
    typography: {
      headingFont: "'Nunito', sans-serif",
      bodyFont: "'Quicksand', sans-serif",
      letterFont: "'Comic Neue', cursive",
      headingSize: '2rem',
      bodySize: '1rem',
    },
    animations: {
      letterReveal: 'typewriter',
      transitionPreset: 'bounce',
      photoEffect: 'sticker',
      buttonHover: 'scale',
    },
    layout: {
      backgroundStyle: 'bright-gradients',
      cardStyle: 'bouncy-card',
      spacing: 'comfortable',
    },
    components: {
      letter: { backgroundTexture: 'comic-speech-bubble', waxSealAnimation: false, handwritingAnimation: true, paperFoldEffect: false },
      photos: { maxPerPage: 12, frameStyle: 'tilted', hoverEffect: 'zoom', transition: 'slide' },
      audio: { playerStyle: 'boombox', waveformAnimation: true },
      video: { frameStyle: 'phoneMockup', fullscreenOnPlay: false },
      buttons: { shape: 'bubble', hoverAnimation: 'bounce' },
      groupMessages: { presentation: 'bouncingBubbles', animation: 'pop' },
      giftReveal: { animation: 'confetti', particleEffect: 'confetti' },
      quiz: { cardStyle: 'gameShow', revealEffect: 'shake' },
    },
    transitions: { sceneTransition: 'slideBounce', duration: 0.5, easing: 'easeOutBack' },
    endingScreen: { message: 'You made someone smile :)', animation: 'confetti' },
  },

  // -----------------------------------------------------------
  // LUXURY – Black & gold, spotlight photos, jewelry box reveal.
  // -----------------------------------------------------------
  luxury: {
    colors: {
      background: '#0A0A0A',
      surface: '#141414',
      primary: '#C8A24A',
      secondary: '#2C2C2C',
      accent: '#F5E6B8',
      text: '#E5E5E5',
      textLight: '#888888',
      shadow: 'rgba(0,0,0,0.8)',
    },
    typography: {
      headingFont: "'Cormorant', serif",
      bodyFont: "'Lato', sans-serif",
      letterFont: "'EB Garamond', serif",
      headingSize: '3.5rem',
      bodySize: '1.1rem',
    },
    animations: {
      letterReveal: 'inkSpread',
      transitionPreset: 'bloom',
      photoEffect: 'fade',
      buttonHover: 'glow',
    },
    layout: {
      backgroundStyle: 'deep-dark-gradients',
      cardStyle: 'luxury-minimal',
      spacing: 'generous',
    },
    components: {
      letter: { backgroundTexture: 'gold-embossed', waxSealAnimation: true, handwritingAnimation: false, paperFoldEffect: false },
      photos: { maxPerPage: 8, frameStyle: 'spotlight', hoverEffect: 'glow', transition: 'fade' },
      audio: { playerStyle: 'luxuryVinyl', waveformAnimation: true },
      video: { frameStyle: 'cinemaScreen', fullscreenOnPlay: false },
      buttons: { shape: 'thinOutline', hoverAnimation: 'glow' },
      groupMessages: { presentation: 'goldEnvelopes', animation: 'float' },
      giftReveal: { animation: 'jewelryBox', particleEffect: 'goldDust' },
      quiz: { cardStyle: 'tarot', revealEffect: 'flip' },
    },
    transitions: { sceneTransition: 'bloom', duration: 1.5, easing: 'easeInOut' },
    endingScreen: { message: 'A memory worth keeping forever', animation: 'goldParticles' },
  },
  // -----------------------------------------------------------
  // CELEBRATION – Sixth theme. Adapts to any festive event via
  // celebrationEvent in the experience JSON. The base values here
  // are SSR/fallback defaults; celebrationVariants.ts overrides
  // them at runtime inside ThemeProvider when theme === 'celebration'.
  // backgroundStyle: 'event-dynamic' signals CelebrationBackground
  // to render the event-specific SVG pattern.
  // -----------------------------------------------------------
  celebration: {
    colors: {
      background: '#1A1A2E',
      surface:    '#16213E',
      primary:    '#0F3460',
      secondary:  '#533483',
      accent:     '#E94560',
      text:       '#FFFFFF',
      textLight:  '#A8A8C0',
      shadow:     'rgba(0,0,0,0.5)',
    },
    typography: {
      headingFont: "\'Cormorant\', serif",
      bodyFont:    "\'Lato\', sans-serif",
      letterFont:  "\'EB Garamond\', serif",
      headingSize: '3rem',
      bodySize:    '1.1rem',
    },
    animations: {
      letterReveal:     'inkSpread',
      transitionPreset: 'bloom',
      photoEffect:      'fade',
      buttonHover:      'glow',
    },
    layout: {
      backgroundStyle: 'event-dynamic',
      cardStyle:       'celebration-card',
      spacing:         'generous',
    },
    components: {
      letter: {
        backgroundTexture:    'event-dynamic',
        waxSealAnimation:     true,
        handwritingAnimation: false,
        paperFoldEffect:      false,
      },
      photos: { maxPerPage: 8, frameStyle: 'rounded', hoverEffect: 'glow', transition: 'fade' },
      audio:  { playerStyle: 'vinyl', waveformAnimation: true },
      video:  { frameStyle: 'rounded', fullscreenOnPlay: false },
      buttons: { shape: 'rounded', hoverAnimation: 'glow' },
      groupMessages: { presentation: 'goldEnvelopes', animation: 'float' },
      giftReveal:    { animation: 'boxOpen', particleEffect: 'goldDust' },
      quiz:          { cardStyle: 'loveLetter', revealEffect: 'flip' },
    },
    transitions: { sceneTransition: 'bloom', duration: 1.2, easing: 'easeInOut' },
    endingScreen: { message: 'May this celebration be remembered forever', animation: 'goldParticles' },
  },
};

// NOTE: The celebration theme's colors are overridden at runtime
// by ThemeProvider when it detects theme === 'celebration'.
// The base values above serve as SSR/no-JS fallbacks only.
