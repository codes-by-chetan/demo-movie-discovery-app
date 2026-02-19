# Movie Discovery App

A cross-platform React Native mobile application for discovering, searching, and reviewing movies. Built with modern technologies including React Navigation, NativeWind, and the TMDB API.

## Features

- **Movie Discovery**: Browse trending and popular movies
- **Search**: Search for movies by title with debounced input
- **Movie Details**: View comprehensive movie information including cast, ratings, and synopsis
- **User Reviews**: Read and manage user reviews for movies
- **Pagination**: Efficient pagination support for large movie lists
- **Responsive Design**: Optimized for both Android and iOS devices

## Tech Stack

- **React Native** (v0.84.0): Cross-platform mobile development
- **React Navigation** (v7.1.28): Screen and navigation management
- **TypeScript**: Type-safe development
- **NativeWind** (v4.2.1): Tailwind CSS styling for React Native
- **Axios**: HTTP client for API requests
- **Jest**: Testing framework
- **TMDB API**: Movie data source

## Project Structure

```
src/
├── components/          # Reusable UI components
│   └── MovieCard.tsx
├── config/             # Configuration files
│   └── env.ts          # Environment variables setup
├── constants/          # App constants
│   └── api.ts          # API endpoints
├── hooks/              # Custom React hooks
│   ├── useDebouncedValue.ts
│   └── usePaginatedMovies.ts
├── navigation/         # Navigation configuration
│   └── AppNavigator.tsx
├── screens/            # Screen components
│   ├── HomeScreen.tsx
│   ├── MovieDetailsScreen.tsx
│   ├── SearchScreen.tsx
│   └── UserReviewScreen.tsx
├── services/           # API services
│   └── tmdb-service.ts
├── types/              # TypeScript type definitions
│   └── movie.ts
└── utils/              # Utility functions
```

## Prerequisites

Before you begin, ensure you have:

- Node.js >= 22.11.0
- npm or Yarn
- [React Native environment setup](https://reactnative.dev/docs/environment-setup)
- TMDB API key (get one at [themoviedb.org](https://www.themoviedb.org/settings/api))

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd MovieDiscoveryApp
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   Create a `.env` file in the root directory:
   ```
   TMDB_API_KEY=your_api_key_here
   TMDB_LANGUAGE=en-US
   TMDB_REGION=US
   ```

4. **Install iOS dependencies** (macOS only)
   ```bash
   bundle install
   bundle exec pod install
   ```

## Running the App

### Start Metro Development Server

```bash
npm start
# or
npm run start:reset  # Reset cache
```

### Android

```bash
npm run android
```

Build and run on connected Android device or emulator.

### iOS

```bash
npm run ios
```

Build and run on iOS Simulator or device.

## Available Scripts

- `npm start` - Start Metro development server
- `npm run start:reset` - Start Metro with cache reset
- `npm run android` - Build and run on Android
- `npm run ios` - Build and run on iOS
- `npm run lint` - Run ESLint
- `npm test` - Run Jest tests

## Development Tips

### Hot Reload

Changes are automatically reflected with Fast Refresh. To force reload:

- **Android**: Press `R` twice or use Dev Menu (<kbd>Ctrl</kbd>+<kbd>M</kbd>)
- **iOS**: Press `R` in Simulator

### Environment Configuration

The app validates required environment variables on startup. Ensure `TMDB_API_KEY` is set before running.

### Styling

The app uses NativeWind with Tailwind CSS. Update styles in:
- [tailwind.config.js](tailwind.config.js)
- [global.css](global.css)

## Testing

Run the test suite:

```bash
npm test
```

## Troubleshooting

### Metro Issues
```bash
npm run start:reset
```

### Android Build Issues
```bash
cd android
./gradlew clean
cd ..
npm run android
```

### iOS Issues
```bash
cd ios
rm -rf Pods Podfile.lock
pod install
cd ..
npm run ios
```

### Missing TMDB API Key
Ensure your `.env` file is properly configured with `TMDB_API_KEY`.

## Contributing

1. Create a feature branch
2. Make your changes
3. Run linter: `npm run lint`
4. Submit a pull request

## Resources

- [React Native Documentation](https://reactnative.dev)
- [React Navigation Guide](https://reactnavigation.org)
- [TMDB API Documentation](https://developer.themoviedb.org/docs)
- [NativeWind Documentation](https://www.nativewind.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)

## License

This project is private and proprietary.
