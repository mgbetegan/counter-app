import {definePreset} from '@primeuix/themes';
import Aura from '@primeuix/themes/aura';

export const PPTheme = definePreset(Aura, {
  semantic: {
    primary: {
      50:  '#f6f5fe',
      100: '#eeedfc',
      200: '#dedcfa',
      300: '#c5c0f5',
      400: '#a89ef0',
      500: '#6c5ce7',
      600: '#5b4fd6',
      700: '#4a3fc7',
      800: '#3d34a8',
      900: '#322b89',
      950: '#211c5e',
    },
    colorScheme: {
      light: {
        primary: {
          color:         '{primary.500}',
          contrastColor: '#ffffff',
          hoverColor:    '{primary.600}',
          activeColor:   '{primary.700}',
        },
        highlight: {
          background:      '#f6f5fe',
          focusBackground: '#eeedfc',
          color:           '#4a3fc7',
          focusColor:      '#3d34a8',
        },
        surface: {
          0:   '#ffffff',
          50:  '#f7f7fb',   // Lavender Mist
          100: '#f0f0f6',
          200: '#e4e4ee',
          300: '#d4d4e0',
          400: '#b0b0c4',
          500: '#8888a0',   // Slate
          600: '#555568',
          700: '#2d2e3a',   // Ink Deep
          800: '#232430',
          900: '#191a23',   // Ink
          950: '#111118',
        },
      },
      dark: {
        primary: {
          color:         '#a89ef0',
          contrastColor: '#111118',
          hoverColor:    '#c5c0f5',
          activeColor:   '#dedcfa',
        },
        highlight: {
          background:      'rgba(108, 92, 231, 0.16)',
          focusBackground: 'rgba(108, 92, 231, 0.24)',
          color:           'rgba(255,255,255,.87)',
          focusColor:      'rgba(255,255,255,.87)',
        },
        surface: {
          0:   '#111118',   // Ink profond
          50:  '#191a23',
          100: '#232430',   // Ink
          200: '#2d2e3a',
          300: '#3e3f50',
          400: '#555568',
          500: '#8888a0',
          600: '#b0b0c4',
          700: '#d4d4e0',
          800: '#e4e4ee',
          900: '#f0f0f6',
          950: '#ffffff',
        },
      },
    },
  },
  components: {
    // Success - Mint (Vert Papernest #2ed8a3)
    success: {
      50:  '#f0fcf7',   // 20% tint
      100: '#e0f9f0',   // 40% tint
      200: '#b8f0da',   // 60% tint
      300: '#8ae7c3',   // 80% tint
      400: '#5ee4ba',
      500: '#2ed8a3',   // 100% - Mint
      600: '#1ab390',
      700: '#158e72',
      800: '#116e59',
      900: '#0e5545',
      950: '#083829',
    },
    // Warning - Iris (reprend la primaire comme warning, même logique que ton Sunshade)
    warn: {
      50:  '#f6f5fe',   // 20% tint
      100: '#eeedfc',   // 40% tint
      200: '#dedcfa',   // 60% tint
      300: '#c5c0f5',   // 80% tint
      400: '#a89ef0',
      500: '#6c5ce7',   // 100% - Iris
      600: '#5b4fd6',
      700: '#4a3fc7',
      800: '#3d34a8',
      900: '#322b89',
      950: '#211c5e',
    },
    // Info - Periwinkle (Bleu doux dérivé de la primaire #6b96e7)
    info: {
      50:  '#f5f8fe',   // 20% tint
      100: '#ebf1fd',   // 40% tint
      200: '#d6e3fb',   // 60% tint
      300: '#b8cef7',   // 80% tint
      400: '#94b5f2',
      500: '#6b96e7',   // 100% - Periwinkle
      600: '#5278d4',
      700: '#3f5fba',
      800: '#334d98',
      900: '#283c76',
      950: '#1a274d',
    },
    // Danger - Rouge harmonisé avec la palette
    danger: {
      50:  '#fef2f2',
      100: '#fee2e2',
      200: '#fecaca',
      300: '#fca5a5',
      400: '#f87171',
      500: '#ef4444',
      600: '#dc2626',
      700: '#b91c1c',
      800: '#991b1b',
      900: '#7f1d1d',
      950: '#450a0a',
    },
  }
});
