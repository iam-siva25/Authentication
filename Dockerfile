#start a temprory node js box and call is at builder
FROM node:18-alpine AS builder

#sets working folder to app
WORKDIR /app

#copying the package.json file from frontend folder
COPY package*.json ./

# install all dependencies
RUN npm install

#copy all rest of your files
COPY . .

#Runs the command that makes your final, tiny React files (usually in a build folder).
RUN npm run build


#STAGE 2

# starts a brand new tiny box with nginx web server
#Nginx is like a tiny, super-fast waiter that just serves the finished website files, making the final box much smaller than the builder box!
FROM nginx:alpine

#Copies the finished React files from the temporary builder box into the Nginx server's folder.
COPY --from=builder /app/build /usr/share/nginx/html

#tells the box inside nginx uses port 80
EXPOSE 80

# the command to start the nginx waiter
CMD ["nginx", "-g", "daemon off;"]