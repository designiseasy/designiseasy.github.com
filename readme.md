# designiseasy.com

## Installation
This uses a fancy trick I learned from Octopress to manage branches. The
branch any work should be done in is `source`. Anything that's pushed to
`master` will show up on designiseasy.com.

Since we can switch the default branch on a github repo, installation
becomes a lot easier. Just copy and paste these commands:

`git clone git://github.com/designiseasy/designiseasy.github.com.git`

`mkdir deploy && cd deploy`

`git init && git remote add origin git@github.com:designiseasy/designiseasy.github.com.git && git pull origin master`

Install rvm, then install gems with:

`bundle install`

Make sure you have npm installed and then:

`npm install -g grunt-cli`

`npm install`

The fun part is that now when you `cd deploy` and then `cd -`, you
actually switch branches! This makes it much easier to run Jekyll with
plugins and then copy over the `_site` dir to `deploy`, add, commit, and then
`git push origin master --force` when you want to deploy.


## Info

Since we didn't feel like starting with a blank layout for [Jekyll](https://github.com/mojombo/jekyll), this repo was forked from @holman's [Left](https://github.com/holman/left). Thanks for the leg up Zach.

