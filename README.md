# Dor Marketing Site

See Jekyll and liquid template docs.

https://jekyllrb.com/docs/home/
https://shopify.github.io/liquid/

## Installation + Getting Started

Install Jekyll and bundler through gem. If you don't have ruby installed on your machine you'll need to install that first.
`gem install jekyll bundler`

Install npm packages
`npm i`

Run the server (runs bundle exec jekyll serve)
`npx gulp`

If you run into build errors, you may need to run with bundle exec:
`bundle exec npx gulp`


## Directory Structure

src/

- _views: contains all the top level pages
- _layouts: contains all the reusable layouts that wrap pages
- _includes: contains reusable partials (header, footer, etc)
- _sass: contains scss partials that get included in assets/css/main.scss
- _data: contains JSON files for easily managing data that may be updated externally (i.e. press links)

_dist: The output directory that Jekyll builds to
