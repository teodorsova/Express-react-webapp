# ReFood

Student-made web app that allows users to share food they no longer consume

## What is the main necessity this product meets?

ReFood raises awareness about food waste in a fun way, giving communitites the possibility to share the food they do not consume anymore with other people, instead of throwing it away, ultimately wasting it.

## To whom is this app addressed?

Our app is destined for anyone that wants to step up and make a choice between wasting and saving/recycling food.

## How does it work?

ReFood is a hybrid between social media and selling platforms, but instead of posting selfies or selling your old laptop, anyone has a wall in which he/she can see announcements from nearby (our aim is to make the delivery process as fast as possible, so the food is still edible). You can also add your own announcements for any type of food, search for a particular type, or a particular user.

## Project plan

Our project plan includes implementing the following functions:

- making a list organized by categories with the product available in the user's fridge

- getting notified when a product reaches the valability term; the app allows the user to mark products as available to be shared

- possibility to define groups of friends and label according to their food preferences; the user can invite friends to see the list of available products.

- any user can claim products in other users' lists

- the app allows sharing content on social media platforms

## Instructions

Open 2 terminals in VSCode and run `npm start` on both of them (one in api and the other in the client folder).

If any error apprears, try using `npm install` first.

Using POSTMAN you can:

- GET at localhost:3001/api/listing to perform a SELECT ALL query.
- POST at localhost:3001/api/listing a json of format (fill in the values), to INSERT a new table entry:  
   `{ "foodName": "", "description": "", //optional "isAvailable": "", //default false "listingDate": "", "expirationDate": "", "location": "", "quantity": , "userName" : "", "imgSrc" : "" //optional }`

      ```
      {
      "foodName": "Kebap",
      "description": "With mayo and ketchup",
      "isAvailable": "true",
      "listingDate": "2022-12-06",
      "expirationDate": "2022-12-16",
      "location": "Warsow",
      "quantity": 20,
      "userName" : "Andreea"

  }

```

- PUT at localhost:3001/api/listing with the same json format, but this time with an id as first field in the body, to execute either an UPDATE (if the id matches an existing one), or a INSERT INTO (the given id is deleted as it is generated with auto-increment).

- DELETE at localhost:3001/api/listing with a json containing only the id.
and then refresh the client to see the new food listing (auto GET request).
```
