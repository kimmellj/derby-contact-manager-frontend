set :application, "derby-contact-manager-frontend"
set :repository,  "git@github.com:kimmellj/derby-contact-manager-frontend.git"

set :deploy_to, "/var/www/derby-contanct-manager-frontend"

set :scm, :git # You can set :scm explicitly or Capistrano will make an intelligent guess based on known version control directory names
# Or: `accurev`, `bzr`, `cvs`, `darcs`, `git`, `mercurial`, `perforce`, `subversion` or `none`

role :web, "www.jkimmell.com"                          # Your HTTP server, Apache/etc
role :app, "www.jkimmell.com"                          # This may be the same as your `Web` server
role :db,  "www.jkimmell.com", :primary => true # This is where Rails migrations will run

# if you want to clean up old releases on each deploy uncomment this:
after "deploy:restart", "deploy:cleanup"