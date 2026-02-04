import { Station, StationCategory, WeeklySchedule } from './types';

export const MAIN_STATION: Station = {
  id: 'radio-520-main',
  name: 'Rádio 520',
  description: 'A Sua Rádio',
  category: StationCategory.POP,
  streamUrl: 'https://servidor40.brlogic.com:7054/live', 
  imageUrl: 'https://public-rf-upload.minhawebradio.net/249695/ad/b6446222f52320d849ecf2331c6ae16d.jpg',
  tags: ['hits', 'pop', 'live']
};

export const STATIONS: Station[] = [
  MAIN_STATION,
  {
    id: 'lofi-girl',
    name: 'Lofi Girl',
    description: 'Beats to relax/study to',
    category: StationCategory.LOFI,
    streamUrl: 'https://play.streamafrica.net/lofiradio', 
    imageUrl: 'https://picsum.photos/id/1015/400/400',
    tags: ['relax', 'study', 'chill', 'beats', 'background']
  },
  {
    id: 'night-ride',
    name: 'Night Ride FM',
    description: 'Synthwave & Retrowave',
    category: StationCategory.ELECTRONIC,
    streamUrl: 'https://stream.nightride.fm/nightride.m4a',
    imageUrl: 'https://picsum.photos/id/1041/400/400',
    tags: ['synthwave', 'driving', 'cyberpunk', 'retro', '80s']
  },
  {
    id: 'classic-fm',
    name: 'Classic FM',
    description: 'The world\'s greatest music',
    category: StationCategory.CLASSICAL,
    streamUrl: 'https://media-ssl.musicradio.com/ClassicFM',
    imageUrl: 'https://picsum.photos/id/1025/400/400',
    tags: ['orchestra', 'piano', 'relaxing', 'intense', 'history']
  },
  {
    id: 'jazz-groove',
    name: 'The Jazz Groove',
    description: 'Laid-back Jazz',
    category: StationCategory.JAZZ,
    streamUrl: 'https://audio-edge-5bk.fake.stream/jazz-groove-fake',
    imageUrl: 'https://picsum.photos/id/1082/400/400',
    tags: ['smooth', 'saxophone', 'lounge', 'dinner', 'classy']
  },
  {
    id: 'bbc-news',
    name: 'BBC World Service',
    description: 'Global News & Analysis',
    category: StationCategory.NEWS,
    streamUrl: 'https://stream.live.vc.bbcmedia.co.uk/bbc_world_service',
    imageUrl: 'https://picsum.photos/id/1084/400/400',
    tags: ['news', 'talk', 'world', 'politics', 'information']
  },
  {
    id: 'defected',
    name: 'Defected Radio',
    description: 'House Music All Life Long',
    category: StationCategory.ELECTRONIC,
    streamUrl: 'https://26313.live.streamtheworld.com/DEFECTED_RADIO.mp3',
    imageUrl: 'https://picsum.photos/id/158/400/400',
    tags: ['house', 'dance', 'party', 'club', 'energy']
  },
  {
    id: 'humboldt-101',
    name: 'Humboldt 101',
    description: 'Reggae Roots',
    category: StationCategory.POP,
    streamUrl: 'https://ais-sa1.streamon.fm/7008_64k.aac',
    imageUrl: 'https://picsum.photos/id/453/400/400',
    tags: ['reggae', 'roots', 'chill', 'island', 'vibes']
  }
];

export const FALLBACK_STREAM = 'https://icecast2.rte.ie/rte2fm-mp3';

export const PROGRAMMING_SCHEDULE: WeeklySchedule = {
  // 0 = Sunday (Domingo)
  0: [
    { start: '00:00', end: '02:00', name: 'LOVE HITS' },
    { start: '02:00', end: '11:50', name: 'SUPERSEQUÊNCIA' },
    { start: '05:00', end: '07:00', name: 'ORASOM 520' }, // Note: Overlap in provided data, keeping logic to pick specific
    { start: '07:00', end: '11:50', name: 'RADIO520 CLASSIC HITS' },
    { start: '11:50', end: '12:00', name: 'REPÓRTER520' },
    { start: '12:00', end: '14:00', name: 'ZIRIGUIDUM' },
    { start: '14:00', end: '14:10', name: 'REPÓRTER520' },
    { start: '14:10', end: '18:00', name: 'BR520' },
    { start: '18:00', end: '18:10', name: 'HORA DA AVE MARIA' },
    { start: '18:10', end: '20:00', name: 'A ERA DO ROCK' },
    { start: '20:00', end: '20:10', name: 'REPÓRTER520' },
    { start: '20:10', end: '21:10', name: 'ZONA MISTA' }, // Fixed start time from provided list to match sequence
    { start: '21:10', end: '23:59', name: 'TOP BILLBOARD' }
  ],
  // 1 = Monday (Segunda)
  1: [
    { start: '00:00', end: '00:10', name: 'VERSUS520 - BATALHA MUSICAL' },
    { start: '00:10', end: '01:20', name: 'INSÔNIA' }, // Gap filled
    { start: '01:20', end: '01:30', name: 'REPÓRTER 520' },
    { start: '01:30', end: '05:00', name: 'INSÔNIA' },
    { start: '05:00', end: '08:00', name: 'GIRO520' },
    { start: '08:00', end: '08:10', name: 'VERSUS520 - BATALHA MUSICAL' },
    { start: '08:10', end: '10:00', name: 'CAFEÍNA' },
    { start: '10:00', end: '10:10', name: 'REPÓRTER520' },
    { start: '10:10', end: '12:00', name: 'VIBE520' },
    { start: '12:00', end: '12:10', name: 'REPÓRTER520' }, // Adjusted from list
    { start: '12:10', end: '12:20', name: 'REPÓRTER520' },
    { start: '12:20', end: '17:00', name: 'MARATONA520' },
    { start: '17:00', end: '17:10', name: 'VERSUS520 - BATALHA MUSICAL' },
    { start: '17:10', end: '18:00', name: 'BR520' },
    { start: '18:00', end: '18:10', name: 'HORA DA AVE MARIA' },
    { start: '18:10', end: '20:00', name: 'MIX520 - MUNDO' },
    { start: '20:00', end: '20:10', name: 'REPÓRTER520' },
    { start: '20:10', end: '21:10', name: 'ZONA MISTA' },
    { start: '21:10', end: '22:00', name: 'RÁDIO 520 - A SUA RÁDIO' },
    { start: '22:00', end: '22:10', name: 'VERSUS520 - BATALHA MUSICAL' },
    { start: '22:10', end: '23:59', name: 'RADIO520 CLASSIC HITS' }
  ],
  // 2 = Tuesday (Terça)
  2: [
    { start: '00:00', end: '00:10', name: 'VERSUS520 - BATALHA MUSICAL' },
    { start: '00:10', end: '01:10', name: 'INSÔNIA' },
    { start: '01:10', end: '01:20', name: 'REPÓRTER520' },
    { start: '01:30', end: '05:00', name: 'INSÔNIA' },
    { start: '05:00', end: '08:00', name: 'GIRO520' },
    { start: '08:00', end: '08:10', name: 'VERSUS520 - BATALHA MUSICAL' },
    { start: '08:10', end: '10:00', name: 'CAFEÍNA' },
    { start: '10:00', end: '10:10', name: 'REPÓRTER520' },
    { start: '10:10', end: '12:10', name: 'VIBE520' },
    { start: '12:10', end: '12:20', name: 'REPÓRTER520' },
    { start: '12:20', end: '17:00', name: 'MARATONA520' },
    { start: '17:00', end: '17:10', name: 'VERSUS520 - BATALHA MUSICAL' },
    { start: '17:10', end: '18:00', name: 'BR520' },
    { start: '18:00', end: '18:10', name: 'HORA DA AVE MARIA' },
    { start: '18:10', end: '20:00', name: 'MIX520 - MUNDO' },
    { start: '20:00', end: '20:10', name: 'REPÓRTER520' },
    { start: '20:10', end: '22:00', name: 'BUSINESS ROCK' },
    { start: '22:00', end: '22:10', name: 'VERSUS520 - BATALHA MUSICAL' },
    { start: '22:10', end: '23:59', name: 'RADIO520 CLASSIC HITS' }
  ],
  // 3 = Wednesday (Quarta)
  3: [
    { start: '00:00', end: '00:10', name: 'VERSUS520 - BATALHA MUSICAL' },
    { start: '00:10', end: '01:20', name: 'INSÔNIA' },
    { start: '01:20', end: '01:30', name: 'REPÓRTER520' },
    { start: '01:30', end: '05:00', name: 'INSÔNIA' },
    { start: '05:00', end: '08:00', name: 'GIRO520' },
    { start: '08:00', end: '08:10', name: 'VERSUS520 - BATALHA MUSICAL' },
    { start: '08:10', end: '10:00', name: 'CAFEÍNA' },
    { start: '10:00', end: '10:10', name: 'REPÓRTER520' },
    { start: '10:10', end: '12:10', name: 'VIBE520' },
    { start: '12:10', end: '12:20', name: 'REPÓRTER 520' },
    { start: '12:20', end: '17:00', name: 'MARATONA520' },
    { start: '17:00', end: '17:10', name: 'VERSUS520 - BATALHA MUSICAL' },
    { start: '17:10', end: '18:00', name: 'BR520' },
    { start: '18:00', end: '18:10', name: 'HORA DA AVE MARIA' },
    { start: '18:10', end: '20:00', name: 'MIX520 - MUNDO' },
    { start: '20:00', end: '20:10', name: 'REPÓRTER520' },
    { start: '20:10', end: '22:00', name: 'BEATS520' },
    { start: '22:00', end: '22:10', name: 'VERSUS520 - BATALHA MUSICAL' },
    { start: '22:10', end: '23:59', name: 'RADIO520 CLASSIC HITS' }
  ],
  // 4 = Thursday (Quinta)
  4: [
    { start: '00:00', end: '00:10', name: 'VERSUS520 - BATALHA MUSICAL' },
    { start: '00:10', end: '01:20', name: 'INSÔNIA' },
    { start: '01:20', end: '01:30', name: 'REPÓRTER 520' },
    { start: '01:30', end: '05:00', name: 'INSÔNIA' },
    { start: '05:00', end: '08:00', name: 'GIRO520' },
    { start: '08:00', end: '08:10', name: 'VERSUS520 - BATALHA MUSICAL' },
    { start: '08:10', end: '10:00', name: 'CAFEÍNA' },
    { start: '10:00', end: '10:10', name: 'REPÓRTER520' },
    { start: '10:10', end: '12:10', name: 'VIBE520' },
    { start: '12:10', end: '12:20', name: 'REPÓRTER520' },
    { start: '12:20', end: '17:00', name: 'MARATONA520' },
    { start: '17:00', end: '17:10', name: 'VERSUS520 - BATALHA MUSICAL' },
    { start: '17:10', end: '18:00', name: 'BR520' },
    { start: '18:00', end: '18:10', name: 'HORA DA AVE MARIA' },
    { start: '18:10', end: '20:00', name: 'MIX520 - MUNDO' },
    { start: '20:00', end: '20:10', name: 'REPÓRTER520' },
    { start: '20:15', end: '22:00', name: 'RÁDIO520 - TOP20' },
    { start: '22:00', end: '22:10', name: 'VERSUS520 - BATALHA MUSICAL' },
    { start: '22:10', end: '23:59', name: 'RADIO520 CLASSIC HITS' }
  ],
  // 5 = Friday (Sexta)
  5: [
    { start: '00:00', end: '00:10', name: 'VERSUS520 - BATALHA MUSICAL' },
    { start: '00:10', end: '01:20', name: 'INSÔNIA' },
    { start: '01:20', end: '01:30', name: 'REPÓRTER520' },
    { start: '01:30', end: '05:00', name: 'INSÔNIA' },
    { start: '05:00', end: '08:00', name: 'GIRO520' },
    { start: '08:00', end: '08:10', name: 'VERSUS520 - BATALHA MUSICAL' },
    { start: '08:10', end: '10:00', name: 'CAFEÍNA' },
    { start: '10:00', end: '10:10', name: 'REPÓRTER520' },
    { start: '10:10', end: '12:10', name: 'VIBE520' },
    { start: '12:10', end: '12:20', name: 'REPÓRTER520' },
    { start: '12:20', end: '16:50', name: 'MARATONA520' },
    { start: '16:50', end: '17:00', name: 'MÚSICA DO DIA' },
    { start: '17:00', end: '18:00', name: 'BR520' },
    { start: '18:00', end: '18:10', name: 'HORA DA AVE MARIA' },
    { start: '18:10', end: '20:00', name: 'MIX520 - MUNDO' },
    { start: '20:00', end: '20:10', name: 'REPÓRTER520' },
    { start: '20:10', end: '22:00', name: 'A ERA DO ROCK' },
    { start: '22:00', end: '22:10', name: 'VERSUS520 - BATALHA MUSICAL' },
    { start: '22:10', end: '23:59', name: 'RADIO520 CLASSIC HITS' }
  ],
  // 6 = Saturday (Sábado)
  6: [
    { start: '00:00', end: '00:10', name: 'VERSUS520 - BATALHA MUSICAL' },
    { start: '00:10', end: '02:00', name: 'LOVE HITS' },
    { start: '02:00', end: '10:10', name: 'RADIO520 CLASSIC HITS' },
    { start: '10:10', end: '10:20', name: 'REPÓRTER520' },
    { start: '10:20', end: '11:50', name: 'RÁDIO520 - TOP20' },
    { start: '11:50', end: '12:00', name: 'RÁDIO520 VIVA MELHOR' },
    { start: '12:00', end: '14:00', name: 'ZIRIGUIDUM' },
    { start: '14:00', end: '14:10', name: 'VERSUS520 - BATALHA MUSICAL' },
    { start: '14:10', end: '18:00', name: 'MARATONA520' },
    { start: '18:00', end: '18:10', name: 'HORA DA AVE MARIA' },
    { start: '18:10', end: '19:50', name: 'BR520' },
    { start: '19:50', end: '20:00', name: 'VERSUS520 - BATALHA MUSICAL' },
    { start: '20:00', end: '22:00', name: 'RÁDIO520 - DANCE CLUB' },
    { start: '22:00', end: '23:59', name: 'RÁDIO 520 - A SUA RÁDIO' }
  ]
};