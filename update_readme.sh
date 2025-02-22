#!/bin/bash



cd /Users/nandakishore/Documents/personals/my-portfolio
echo "Current Directory: $(pwd)"

DATE=$(date +'%m/%d')

git config --global --add safe.directory /Users/nandakishore/Documents/personals/my-portfolio
echo "Current Directory: $(pwd)"


FACT=$(curl -s "http://numbersapi.com/$DATE")


awk -v fact="**<b>📌 Daily Fact:</b>** $FACT" '
/^\*\*<b>📌 Daily Fact:<\/b>\*\*/ {print fact; found=1; next}
{print}
END {if (!found) print fact}
' README.md > temp.md && mv temp.md README.md

echo "Current Directory: $(pwd)"

git config user.name "nandakishore"
git config user.email "nandakishorep212@gmail.com"


git add .
git commit -m "Updated README with today's fact" || exit 0
git push git@github.com:nanda-kshr/nanda-kshr.git master
