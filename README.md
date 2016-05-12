MEAN stack
============

## GIT

`.git`

MEAN working setup

# Local development

## Prerequisites

Install these programs for running the app, if not already installed. It is good to install them globally, so with `-g` in the install code.

* Install MongoDB: Windows: http://docs.mongodb.org/manual/tutorial/install-mongodb-on-windows/ , Mac OS: http://docs.mongodb.org/manual/tutorial/install-mongodb-on-os-x/
* Install node.js (for using npm): http://nodejs.org/download/ (node -v 0.12.x and npm -v 2.1.x)
* (Install Git: http://git-scm.com/downloads) if not used already to clone this repo off course. (Setup: https://help.github.com/articles/set-up-git/) (Make sure PATH for git in windows is set: C:\Program Files (x86)\Git\bin;C:\Program Files (x86)\Git\cmd).
* Install Bower: `npm install -g bower`
* Install Grunt: `npm install -g grunt`
* Install Gulp: `npm install -g gulp` (https://github.com/gulpjs/gulp/blob/master/docs/getting-started.md)
* Install Mongoose: `npm install -g mongoose` (http://mongoosejs.com/docs/index.html)
* Install Imagemagick: http://www.imagemagick.org/script/binary-releases.php (globally install on system to be able to work with it)
* Install Sass: with ruby gems: `gem install sass` after installing ruby. (windows: http://rubyinstaller.org/) (Make sure PATH for gem in windows is set: C:\RubyXX\bin)
* Install Node-sass: `npm install -g node-sass`
* Install Python version 2.7.x
* (node-gyp) could create an error when installing, this is due to the incorrect usage of python and mvs2013 (microsoft visual studio 2013 required!!!)

## Setup

### First time

From the terminal:
* Run `npm install && bower install` from the main folder (this is the repo main folder)
* Run `cp /app/config/db.example.js /app/config/db.js` from the main folder
* Startup your local mongoDB or use the correct address in the file you created in the line above to an online mongoDB
* Run `gulp` from the same folder
* You should be able to see progress in build and collect process of gulp
* Then you can run the app via: `localhost:8000`

### Running (If already done npm and bower install and files are still up to date)

From the terminal:
* Startup your mongoDB: `C:\mongodb\bin\mongod.exe` or `mongod`.
* Run `gulp` from the main folder (this is the repo main folder)
* You should be able to see progress in build and collect process of gulp
* Then you can run the app via: `localhost:8000`

END LOCAL DEVELOPMENT

# Server deployment

# Dokku node mongo setup
## Full setup for a node mongo (MEAN) app with gulp/grunt in dokku.
### Creates a container for the node app and a container for the mongodb.

Steps:

1. Create server (Digital Ocean Droplet) with **Dokku v0.3.18 on 14.04** image. Add the following code to your SSH config (located at '~/.ssh/config').

        ```
        Host <ssh host>
        HostName <hostname or ip address>
        Port <ssh port, by default 22>
        User dokku
        RequestTTY yes
        ForwardAgent yes
        ```

2. Login into the server and Update local settings.

        ```shell
        sh -c "echo 'LANG=en_US.UTF-8\nLC_ALL=en_US.UTF-8' > /etc/default/locale"
        reboot
        ```

3. Open `http://<ip_address_of_droplet>` to configure dokku settings.

4. Install plugins on server.

        ```shell
        dokku plugin:install https://github.com/dokku/dokku-mongo.git mongo

        sudo dokku plugin:install https://github.com/dokku/dokku-letsencrypt.git
        ```

5. Create database. (on server) In below code, `app_name` can be anything. Choose root_domain here when you want to deploy to root domain. It should be used when configure the database.

        ```shell
        mongo:create <name>
        ```

6. Add dokku remote to your source code (from your development machine).
Change your MongoDB url to `process.env.MONGO_URI` and commit your source code (if it is not already this way).
In below code, `app_name` can be anything but for the correct use it must be the same as used when creating the database.

To be able to push applications to the server it needs your public SSH key in /home/dokku/.ssh/authorized_keys .

        ```shell
        #linux:
        cat ~/.ssh/id_rsa.pub | ssh root@<ssh host> "sudo sshcommand acl-add dokku <YOUR NAME>"

        #windows:

        ```

Push the app and let dokku build the container. Choose root_domain here when you want to deploy to root domain. This can take a while.

        ```shell
        git remote add spcweb dokku@<ssh host>:<app_name OR root_domain>
        git push spcweb master
        ```

Tip: when debugging it can be useful to start a shell inside the docker container:

        ```shell
        #linux:
        ssh <ssh host> run <app name> /bin/sh

        #windows:
        #use putty to go to the host
        ```

7. Add options for upload folder, to not overwrite it when deploying again. (on server)

        ```shell
        dokku docker-options:add <app name> deploy "-v /home/<app name>/media:/app/media"
        dokku docker-options:add <app name> deploy "-v /home/<app name>/media/data:/app/media/data"
        dokku docker-options:add <app name> deploy "-v /home/<app name>/media/players:/app/media/players"
        dokku docker-options:add <app name> deploy "-v /home/<app name>/media/pages:/app/media/pages"
        dokku docker-options:add <app name> deploy "-v /home/<app name>/media/extra:/app/media/extra"

        dokku deploy <app name>

        mongo:link <name> <app>
        ```

8. Some usefull commands:

You can also view mongodb config. If something went wrong you can find the logs with the second command. (on server)

        ```shell
        dokku config <app_name>

        dokku logs <app_name> -t
        ```

After testing, you can safely delete a demo app with:
        
        ```shell
        dokku ps:destroy <app_name>
        ```
		
Editing the database for more options, use Robomongo: 'http://robomongo.org/'. Download and install this, than connect to the database via SSH tunnel to 5.200.7.242 with username beheer and password in the Safe.
Than use for the connection: ip 172.17.0.19 and port 27017. As auth use: database: web3-production-production, username: web3, pass in the Safe.

For the mongodb plugin you have te following commands:
        
        ```shell
		mongo:clone <name> <new-name>  Create container <new-name> then copy data from <name> into <new-name>
        mongo:connect <name>           Connect via telnet to a mongo service
        mongo:create <name>            Create a mongo service with environment variables
        mongo:destroy <name>           Delete the service and stop its container if there are no links left
        mongo:export <name> > <file>   Export a dump of the mongo service database
        mongo:expose <name> [port]     Expose a mongo service on custom port if provided (random port otherwise)
        mongo:import <name> < <file>   Import a dump into the mongo service database
        mongo:info <name>              Print the connection information
        mongo:link <name> <app>        Link the mongo service to the app
        mongo:list                     List all mongo services
        mongo:logs <name> [-t]         Print the most recent log(s) for this service
        mongo:promote <name> <app>     Promote service <name> as MONGO_URL in <app>
        mongo:restart <name>           Graceful shutdown and restart of the mongo service container
        mongo:start <name>             Start a previously stopped mongo service
        mongo:stop <name>              Stop a running mongo service
        mongo:unexpose <name>          Unexpose a previously exposed mongo service
        mongo:unlink <name> <app>      Unlink the mongo service from the app
		```
		
Backing up a database

`mongo:export <name> > <file>` creates a backup of a whole database. The result can be optionally compressed in a gzipped tarball (tar.gz) by adding the `-tar` parameter after the database name. The dump is placed in the current directory and named `<databasename>-<date and time>`.
*Example: `mongo:export <name> > <file>`*

NOT WORKING WELL, USE ROBOMONGO!

Restoring a database

`path/to/dump` is `/home/soccerpc.com/mongodump`

`mongo:import <name> < <file>` can be used to restore dump created with `mongo:export <name> > <file>` (or `mongodump` which it uses internally). It can be used with a gzipped dump.
*Example: `mongo:import <name> < <file>`*
  
This will drop the database and re-create it completely from the dump.

Console

You can use the mongodb console for:
- view your DBs in this mongoDB: `show dbs`
- create or use a db called `mydb`: `use mydb`
- check wich db you are using now: `db`
- show collections in the current db: `show collections`
- find data in collection named `mycollection`: `db.myollection.find()`
- find one item in `mycollection`: `db.mycollection.findOne()`
- find data in `mycollection` with specific value: `db.mycollection.find( { x : 18 } )`
- find only limited amout of date in `mycollection`: `db.mycollection.find().limit(2)`
- find one item with index `4` in `mycollection`: `var c = db.mycollection.find()` and `printjson( c[4] )` 
- insert a new item into `mycollection`: `db.mycollection.insert( { name : "mongo" } )` or `j = { name : "mongo" } && db.mycollection.insert( j )`
- exit the shell: `exit`

##Ready!

END SERVER DEPLOYMENT
