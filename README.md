# Deltarune-Speedrunning-Hub
The code source and database structure of the Deltarune Speedrunning Hub

---

# Setup the project

## Setup the Next.js project
- Create a Next.js empty project
- Clone this repository and merge it to the project you just created
- Open a command prompt in the root of the project and type `npm install --force`
  
## Setup the database
- Install a MySQL server on your server
- Install MySQL Workbench
- Connect to your database using MySQL Workbench
- Create a schema
- After that, open the folder `database_structure` of the project and open `dataBaseWithRows.mysql` with MySQL Workbench
- Select the schema you created and run the script. It should create all the tables and fill `chapters` and `sections`

## Connect the project to the database
- In the project's root, rename `envtemplate.local` to `.env.local`
- Open it and change the the following fields:
  - `HOST`: The IP the MySQL server is hosted on (`127.0.0.1` for local)
  - `DBPORT`: The port of the database (`3306` by default)
  - `USER`: The database's user you're using (`root` by default)
  - `PASSWORD`: The database's password
  - `DATABASE`: The schema of the project in your database
  - `IP_PORT`: the port the website is hosted on (`3000` by default)

# Contribution
If you'd like to contribute to the project, feel free to fork it and propose changes!
If you'd like to contact us, please join the [Discord server](https://discord.com/invite/N5fv4kEwsB) and ping @Vintagix or @ashmichda in #technical-talk
