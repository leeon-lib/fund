# Testing the Fund ERP App

## Prerequisites

### MongoDB Version Compatibility
This app uses an old version of Mongoose (via mongodb-core) that relies on the legacy OP_QUERY protocol. **MongoDB 7.0+ does NOT work** — queries will silently fail with `UnsupportedOpQueryCommand` errors.

**Use MongoDB 4.4** (tested working):
```bash
# Download MongoDB 4.4 standalone binary
wget -q https://fastdl.mongodb.org/linux/mongodb-linux-x86_64-ubuntu2004-4.4.29.tgz -O /tmp/mongo44.tgz
tar -xzf /tmp/mongo44.tgz -C /tmp/

# May need libssl1.1
wget -q http://archive.ubuntu.com/ubuntu/pool/main/o/openssl/libssl1.1_1.1.1f-1ubuntu2_amd64.deb -O /tmp/libssl1.1.deb
sudo dpkg -i /tmp/libssl1.1.deb

# Start MongoDB 4.4
mkdir -p /tmp/mongo44data
/tmp/mongodb-linux-x86_64-ubuntu2004-4.4.29/bin/mongod --dbpath /tmp/mongo44data --port 27017 --fork --logpath /tmp/mongo44.log
```

### Node.js App
```bash
# Do NOT run npm install — it may fail due to old dependency (mailer@2.4.1).
# node_modules is already in the repo.
cd /home/ubuntu/fund && node ./bin/www &
```

The app runs on `http://localhost:3000`.

## Authentication

The app uses signed cookies for auth. To test authenticated features:

1. Create a test user directly in MongoDB (registration requires email activation which won't work locally):
```bash
cd /home/ubuntu/fund && node -e "
var mongoose = require('mongoose');
var utility = require('utility');
require('./models');
var User = mongoose.model('User');
var user = new User({
  email: 'test@test.com',
  password: utility.md5('test123'),
  is_activated: true
});
user.save(function(err, doc) {
  console.log('Created:', doc._id, doc.email);
  mongoose.disconnect();
});
"
```

2. Log in at `/signin` with email: `test@test.com`, password: `test123`

**Note:** The login button is `type='button'` (not submit) — it uses JavaScript to submit the form. The signin page has a pre-existing Pug template bug (`undefind` typo) that causes `#{email}` to render literally on failed login attempts.

## Key Routes

| Feature | URL | Notes |
|---------|-----|-------|
| Dashboard | `/dashboard` | Shows aggregated stats |
| Fund Portfolio | `/funds` | CRUD, works without auth (empty data) |
| Expenses | `/expenses` | CRUD, works without auth (empty data) |
| Expense Summary | `/expenses/summary` | Category breakdown |
| User Profile | `/profile` | Redirects to `/signin` if no auth |
| Login | `/signin` | POST with email/password |
| Register | `/signup` | Requires email activation |

## Testing Tips

- Fund and expense list pages render with empty data when not authenticated — useful for smoke testing
- Profile redirects to `/signin` when not authenticated
- After login, the app redirects to `/index` which is a 404 — navigate manually to `/dashboard` or `/funds`
- The `deleted_at` field uses soft deletes — records are not actually removed from MongoDB
- Activity log on dashboard will always show empty because activity creation is not wired in

## Devin Secrets Needed
No secrets required — the app runs entirely locally with MongoDB.
