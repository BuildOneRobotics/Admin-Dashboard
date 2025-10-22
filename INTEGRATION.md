# Integration with BuildOne Website

## How to Connect Both Sites

### 1. Shared Authentication (Cross-Domain)
Add to `https://buildonerobotics.vercel.app`:

```javascript
// In your main website's auth system
function syncAdminAuth(username, role) {
  localStorage.setItem('adminUser', JSON.stringify({ username, role }));
}
```

### 2. API Endpoints Needed on Main Website

Add these API routes to `https://buildonerobotics.vercel.app`:

**GET /api/posts** - Returns all forum posts
```json
[
  {
    "id": "post123",
    "title": "Post Title",
    "author": "username",
    "content": "Post content",
    "timestamp": 1234567890
  }
]
```

**DELETE /api/posts/:id** - Deletes a post (admin only)

**POST /api/announcements** - Creates announcement
```json
{
  "title": "Announcement Title",
  "content": "Content here",
  "author": "bensteels",
  "timestamp": 1234567890
}
```

**GET /api/stats** - Returns site statistics
```json
{
  "totalUsers": 100,
  "activePosts": 50,
  "forumTopics": 25,
  "announcements": 5
}
```

### 3. CORS Configuration

Add to your main website's API:

```javascript
// Enable CORS for admin dashboard
res.setHeader('Access-Control-Allow-Origin', 'https://admin-dashboard-phi-green-90.vercel.app');
res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE');
res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
```

### 4. Shared Data Storage

Both sites should use the same database/storage:
- Firebase Realtime Database
- Supabase
- MongoDB Atlas
- Or any shared backend

### Current Setup

The admin dashboard is configured to:
- Call APIs at `https://buildonerobotics.vercel.app`
- Display real forum posts
- Allow post deletion
- Create announcements
- Share partnership notes between Ben and Ethan

### Next Steps

1. Add API endpoints to main website
2. Enable CORS for admin dashboard domain
3. Connect to shared database
4. Test cross-site functionality
