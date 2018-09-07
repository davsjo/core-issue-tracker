# core-issue-tracker

Small service which gathers github public data from our open source repos to simplify our issue tracking within the team. I.e. make sure we don't miss out on important feedback. Backend is based on javascript service using the Qlik Associative engine powering the backend and acting as a link to the frontend implementation found in: 
https://github.com/JohanBjerning/issue-dashboard-front

*The project is mostly done in hackaton for knowledge gaining purposes. Beware of ugly code!*

In the future we should probably go for the Github v4 API since the v3 used in the project will be deprecated soon and sends a lot of unnecessary information. 

# Installation

The following instructions apply for testing out the service locally. When deploying the config.js file needs to be updated with the correct engine IP.

## Run engine in a docker container

Note that before you deploy, you must accept the Qlik Core EULA by setting the ACCEPT_EULA environment variable.

ACCEPT_EULA=yes docker-compose up -d

## Create a personal GitHub token

You need a personal Github token in order to query the github API [authenticate to the API over Basic Authentication](https://developer.github.com/v3/auth/#basic-authentication).

Create a [personal token](https://github.com/settings/tokens) with at least public_repo scope

## Create personalized service configuration

1. Copy the (config-example.js) file and rename to config.js.
2. Copy your newly created Github token into the githubToken 

## Install all necessary packages 

`npm install`

# Execution

`npm run start`



