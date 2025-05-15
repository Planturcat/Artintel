@echo off
echo Updating pnpm-lock.yaml to match package.json...
cd website
pnpm install --no-frozen-lockfile
echo Done! Now commit the updated pnpm-lock.yaml file.
pause
