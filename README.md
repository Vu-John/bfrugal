## BFrugal

An application for saving you money. Find items online and save it to BFrugal. Get notified when a price drop occurs.

This application uses [Nokogiri](https://www.nokogiri.org/) to parse websites for product data and can be scheduled to run updates. When a price has dropped for a product users will receive an email with the product link.

NOTE: *BFrugal supports a finite number of sites check `./lib/modules/url_helper.rb` for list of sites*

### Getting Started

#### Prerequisites

Make sure you have [Ruby](https://www.ruby-lang.org), [Rails](https://rubyonrails.org/), [Bundler](http://bundler.io) and [Node.js](https://nodejs.org/en/) installed.

Create an `.env` file in the root directory

```
DEVISE_JWT_SECRET_KEY=<YOUR_OWN_SECRET_KEY>

# [OPTIONAL]
# (For usage with ./config/environments/production.rb)
GMAIL_USERNAME=<YOUR_GMAIL_ADDRESS>
GMAIL_PASSWORD=<YOUR_GMAIL_PASSWORD>
```

__Tip:__ you can run `rake secret` to get a key for `<YOUR_OWN_SECRET_KEY>`

#### Installing

1. Install server dependencies `bundle install` (*Note: Make sure to have the same version of Ruby and Rails as the project*)
2. Install client dependencies `cd client && npm install` (*Note: remember to return to root after installation has finished* `cd..`)
3. Start PostgresSQL server (Mac: [Postgres.app](https://postgresapp.com/), Windows: [EDBPostgres](https://www.enterprisedb.com/downloads/postgres-postgresql-downloads))
4. Run migrations `rake db:create db:migrate db:seed`
5. Run the application `bin/rake start`

### Deploying to Heroku

Install server dependencies for Heroku in the root directory `npm install`

Make sure you have [Heroku Toolbelt](https://toolbelt.heroku.com/) installed and are logged in

#### Step 1 - Create Heroku app and add repo

```sh
heroku create <name_of_application>
heroku buildpacks:add heroku/nodejs --index 1
heroku buildpacks:add heroku/ruby --index 2
git push heroku master
heroku run rake db:migrate db:seed
```

#### Step 2 - Add env envariables
- Login to [Heroku](https://www.heroku.com/) and open up your your app (`<name_of_application>`)
- Go to settings and under `Config Vars` add:

```
DEVISE_JWT_SECRET_KEY=<YOUR_OWN_SECRET_KEY>
GMAIL_USERNAME=<YOUR_GMAIL_ADDRESS>
GMAIL_PASSWORD=<YOUR_GMAIL_PASSWORD>
```
__Tip:__ you can run `rake secret` to get a key for `<YOUR_OWN_SECRET_KEY>`

#### Step 3 (optional) - Schedule updates for DB data and emails
- Add [Heroku Scheduler](https://devcenter.heroku.com/articles/scheduler) to your application
- Open up your app in the Heroku and go to the `Resources` tab
- Click on `Heroku Scheduler` add on
- Click on `Add new job` and add `rake scrape:update_items` with your desired schedule and save

#### Step 4 - View the application
`heroku open`

[![Deploy to Heroku](https://www.herokucdn.com/deploy/button.png)](https://heroku.com/deploy)


### Usage

1. Open up https://localhost:3000 or your Heroku App
2. Register for an account and Login
3. Find a product from a web that is supported by this application and copy the url link (check `./lib/modules/url_helper.rb` for supported sites)
4. Paste the URL link into the form input
5. Run `rake scrape:update_items` task to update data or user Heroku Scheduler to run the task everyday/hour/etc...

### Built With

* __Frontend:__ ReactJS, Redux
* __Backend:__ Ruby 2.5.1, Rails 5.2.2
* __Database:__ PostgresSQL 10
