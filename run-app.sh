#!/bin/bash

# enter MySQL username and password
read -p "Enter your MySQL username: " username

read -p "Enter your MySQL password: " -s password

# create a new database schema for the project
mysql -u $username -p$password -e "CREATE DATABASE note_management_system"

# get the JDBC URL for the created database
url="jdbc:mysql://localhost:3306/note_management_system"

# set the MySQL credentials in the application.properties file
sed -i "/spring.datasource.url=/ s|=.*|=$url|"  backend/src/main/resources/application.properties
sed -i "/spring.datasource.username=/ s/=.*/=$username/"  backend/src/main/resources/application.properties
sed -i "/spring.datasource.password=/ s/=.*/=$password/"  backend/src/main/resources/application.properties

# build the backend server
cd backend
./mvnw clean package

# install the frontend dependencies
cd ../frontend
npm install

echo ""
echo "run 'java -jar target/backend-0.0.1-SNAPSHOT.jar' to start the backend server form the backend/ directory."
echo "run 'npm run dev' from the frontend/ directory to start the client."
