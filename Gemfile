source "https://rubygems.org"

# Jekyll
gem "jekyll", "~> 4.3.2"
gem "jekyll-sass-converter", "~> 3.0"
gem "kramdown-parser-gfm"
gem "kramdown", "~> 2.3.2"

# Plugins
gem "jekyll-feed", "~> 0.15.1"
gem "jekyll-sitemap"
gem "jekyll-seo-tag"

# Theme
gem "minima"

# Windows specific gems
platforms :mingw, :x64_mingw, :mswin do
  gem "tzinfo", "~> 2.0"
  gem "tzinfo-data"
end

# Lock http_parser.rb gem to 0.6.x on JRuby builds since
# newer versions of the gem do not have a Java counterpart.
gem "http_parser.rb", "~> 0.6.0", :platforms => [:jruby]
