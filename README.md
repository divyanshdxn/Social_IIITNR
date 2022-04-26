# SocialMedia_IIITNayaRaipur

Social-IIITNR (InsCon) is a social media platform geared towards solving these problems by connecting the members of the IIIT-NR family. It relies heavily on databases to store, filter search, and retrieve categorized information and provides well-structured interfaces in the form of a WebApp and Android App. Our Android App and Website include features like they would be aware of all the clubs and their events, they can share their work and be recognized by others. Students will have complete information about Training and Placement cell and E-cell updates.
 This project could be extended in the future with many more features such as making virtual rooms and an Alumni referral system. Our database has been set up using  PostGres and client access using ElephantSql and used NestJS server which uses Express at backend and is only accessible for iiitnr domains which are handled in backend only.

Live Access : http://social-iiitnr.herokuapp.com/login

## Flow of project

### Login Flow
For user login, we have used the google authentication service. Google provides a robust method of user authentication and authorization through the Google Cloud Platform (GCP). To log in a user, we request google from the frontend to give an id token which is essentially a JWT token, after authorizing the user, google gives an id token. Then this id token is sent to the backend server, at the server this token is validated, if the token is found valid we extract the user information and create an entry for the user in our database if it does not exist. In case of an invalid or expired token, the server returns a 401 (unauthorized) response.

### Accessing a protected endpoint
For each of the protected endpoints, each request needs to pass the id token in the Request Header as a Bearer token which gives the user’s identity.


### API Endpoints
All the endpoints are categorized according to the feature. Every feature has common endpoints Create, Read, Update and Delete (CRUD) These are the following features:
    - Auth     
    - Profile    
    - Post        
    - Pages    
    - Events     
    - Media
    
## Screenshots

<img alt="app_login"
        height="423" src=https://github.com/DeepanshuPratik/SocialMedia_IIITNayaRaipur/blob/main/android/SocialIIITNR/app/src/main/res/drawable/app_login.jpeg />
<img alt="app_ecell"
        height="423" src=https://github.com/DeepanshuPratik/SocialMedia_IIITNayaRaipur/blob/main/android/SocialIIITNR/app/src/main/res/drawable/app_ecell.jpeg />
<img alt="app_feeds"
        height="423" src=https://github.com/DeepanshuPratik/SocialMedia_IIITNayaRaipur/blob/main/android/SocialIIITNR/app/src/main/res/drawable/app_feeds.jpeg />
<img alt="app_post_start"
        height="423" src=https://github.com/DeepanshuPratik/SocialMedia_IIITNayaRaipur/blob/main/android/SocialIIITNR/app/src/main/res/drawable/app_post_start.jpeg />
<img alt="app_post"
        height="423" src=https://github.com/DeepanshuPratik/SocialMedia_IIITNayaRaipur/blob/main/android/SocialIIITNR/app/src/main/res/drawable/app_post.jpeg />
<img alt="app_profile"
        height="423" src=https://github.com/DeepanshuPratik/SocialMedia_IIITNayaRaipur/blob/main/android/SocialIIITNR/app/src/main/res/drawable/app_profile.jpeg />
<img alt="website_login"
        height="423" src=https://github.com/DeepanshuPratik/SocialMedia_IIITNayaRaipur/blob/main/android/SocialIIITNR/app/src/main/res/drawable/website_login.jpeg />
<img alt="website_feeds"
        height="423" src=https://github.com/DeepanshuPratik/SocialMedia_IIITNayaRaipur/blob/main/android/SocialIIITNR/app/src/main/res/drawable/website_feeds.jpeg />
<img alt="website_post"
        height="423" src=https://github.com/DeepanshuPratik/SocialMedia_IIITNayaRaipur/blob/main/android/SocialIIITNR/app/src/main/res/drawable/website_post.jpeg />        

        
