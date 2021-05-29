# A buy and sell Web App

Create an IIIT (BASAR) version of OLX.com, that is, an E-commerce website where students can sell used items, to other students.

## User Permissions

### Student

A student can

* register himself on the app
* provide various details like facebook profile, email, phone number, room no. for contact
* view and edit his profile
* edit privacy settings (whether to include his contact number and room no. of hostel)
* change his password
* search for various products and contact the concerned student for buying it
* upload details of a product to be sold online (to be verified by admin)
* turn on bidding for a product, he/she sells
* view bidding history of a product, he/she sells and turn bidding off, if he wants to fix the price.
* edit the products he has uploaded
* mark some of his products as *favorites*
* delete a product when it is sold
* bid some amount for a product he likes (But this is just to get listed in the owner's view and there is nothing like verification of account details, so it may also happen that a person can bid an amount that is less than the highest bid done. This is to ensure that all get a fair chance of bidding and no fake bids can rise issues.)
* edit his bid
* view bid history of a product he owns

### Admin

An admin can

* view and edit his profile
* approve a product (if admin flags as appropriate then only,
all users will be able to see that product online. This is to ensure that no fake or obscene images are uploaded as well as no vulgar language is used )
* mark some of his products as *favorites*

## A note to the viewers

1. You can try logging in as an **admin** by entering the following credentials:

* **username**: *admin*
* **password**: *pass123*

2. You can also register yourself as a student and then login to view the options available to a student or use the following credentials:

* **username**: *jagan9*
* **password**: *cool1234*

3. When a user logs in and views the detail of a product, the number of views of that product increases by 1. In this way, the top 3 products with the maximum number of views are displayed on the home page.

## View live App

Hosted at **https://rgukt-ola.web.app/** <br/>
and also you try at **https://rgukt-ola.firebase.com/**

## Tech Stack Used

### The Tech Stack

* [React](https://reactjs.org/docs/) - Front-end web app framework used
* [Node.js](https://nodejs.org/en/docs/) - JavaScript runtime environment 

### Middleware

* [Redux](https://redux.js.org/basics/usage-with-react) - For flux architecture, and fetching rapidly data
* [Firebase](https://firebase.com/) - Cloud server to store the images
