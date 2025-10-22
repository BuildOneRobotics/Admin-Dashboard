# Admin Dashboard Setup

## Vercel Environment Variables

Add these environment variables in your Vercel project settings:

```
ADMIN_PASSWORD_BENSTEELS=24122012
ADMIN_PASSWORD_ETHANPATMORE=1012
```

## User Roles

### bensteels (CEO)
- Full access to all features
- Can view revenue and financial data
- Can manage all users
- Username: `bensteels`

### ethanpatmore (Admin)
- Can view, edit, and moderate
- Limited access to financial data
- Cannot manage users
- Username: `ethanpatmore`

## Local Development

1. Copy `config.js` (already configured for local dev)
2. Open `index.html` in browser
3. Login with credentials above

## Production

Environment variables are automatically loaded from Vercel settings.
