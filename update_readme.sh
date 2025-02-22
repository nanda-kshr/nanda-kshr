#!/bin/bash

#0 */2 * * */bin/bash /Users/nandakishore/Documents/personals/my-portfolioupdate_readme.sh >> /Users/nandakishore/Documents/personals/my-portfolio/log.txt 2>&1

cd /Users/nandakishore/Documents/personals/my-portfolio || exit


DATE=$(date +'%m/%d')


FACT=$(curl -s "http://numbersapi.com/$DATE")


awk -v fact="**<b>📌 Daily Fact:</b>** $FACT" '
/^\*\*<b>📌 Daily Fact:<\/b>\*\*/ {print fact; found=1; next}
{print}
END {if (!found) print fact}
' README.md > temp.md && mv temp.md README.md


git config user.name "Nandakishore"
git config user.email "nandakishorep212@gmail.com"


git add .
git commit -m "Updated README with today's fact" || exit 0
git push git@github.com:nanda-kshr/nanda-kshr.git master
