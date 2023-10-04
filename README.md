# MilkiteaStudio :carrot: :rabbit:

Milkitea Studio operates as an e-commerce platform specializing in facilitating business-to-consumer transactions. Our website serves as a marketing where Milkitea Studio showcases and offers its range of products for purchase, providing users with the opportunity to acquire high-quality goods crafted by Milkitea Studio.

## Table Of Contents :scroll:
* :rabbit2: [Introduction](##Introduction)
* :rabbit2: [Features](##Features)
* :rabbit2: [User Story](##User-Story)
  * 🥕 Users
  * 🥕 Store / Products
  * 🥕 User's Cart
  * 🥕 User's payment
  * 🥕 User's shipping address
  * 🥕 Search
* :rabbit2: [MVP List](##MVP-List)
* :rabbit2: [Schema](##-Schema)

## Introduction :rabbit:

Hello! I'm Sena, the creator of milkiteastudios, and I am here to share my art + my love for creating. 
Floating somewhere between cute and unsettling, my current work involves bunnies in strange, dream-like worlds, along with other funky things. Besides my digital illustration work, I also make handmade items that reps my current obsession with making shy bunnies. :carrot: :rabbit2: 🎨
* :rabbit2: Artistic Wonderland: Dive into a world where creativity knows no bounds. Explore a unique collection of digital artworks, each brimming with imaginative storytelling.
* :rabbit2: Handmade Treasures: Discover an assortment of meticulously crafted items that embody the essence of charming and shy bunnies, each one handcrafted with love and care. 🥕🐰

## Features :art:

* :rabbit2: Create an account and add your payment and shipping info for easy checkout :money_with_wings: :money_with_wings: :money_with_wings:
* :rabbit2: Browse an eclectic array of thoughtfully crafted artworks and creations, each capturing the captivating essence of shy bunnies and other enchanting characters, lovingly shaped with care and precision 🎨🥕🐰🌟
* :rabbit2: Why pause now? Expedite the process by placing these captivating goods into your cart, and they'll soon be in your possession. 🛒🌟


## User Story :rabbit:

### Users 🐰

Sign Up
* As an unregistered and unauthorized user, I want to be able to sign up for the website via a sign-up form
   * When I'm on the /signup page:
      * I would like to be able to enter my email, username, and preferred password on a clearly laid out form.
      * I would like the website to log me in upon successful completion of the sign-up form.
      * When I enter invalid data on the sign-up form:
         * I would like the website to inform me of the validations I failed to pass, and repopulate the form with my valid entries (except my password).
              * So that I can try again without needing to refill forms I entered valid data into.
      
Log In
* As a registered and unauthorized user, I want to be able to log in to the website via a login form.
   * When I'm on the /login page:
       * I would like to be able to enter my email and password on a clearly laid out form.
       * I would like the website to log me in upon successful completion of the login form.
       * When I enter invalid data on the login form:
          * I would like the website to inform me of the validations I failed to pass, and repopulate the form with my valid entries (except my password).
               * So that I can try again without needing to refill forms I entered valid data into.

Demo User
* As an unregistered and unauthorized user, I would like an easy to find and clear button on both the /signup and /login pages to allow me to visit the site as a guest without signing up or logging in.
   * When I'm on either the /signup or /login pages:
       * I can click on a Demo User button to log me in and allow me access as a normal user.
          * So that I can test the site's features and functionality without needing to stop and enter credentials.

Log Out
* As a logged in user, I want to log out via an easy to find log out button on the navigation bar.
   * While on any page of the site:
       * I can log out of my account and be redirected to the homepage.
          * So that I can easily log out to keep my information secure.
        
### Products / Store (if Sena or admin) 🐰

Create a New Product Listing
* When creating a product, I should be able to input essential details such as the product name, description, price, available quantity, and upload images to showcase the item's features.
* Upon submission, the newly created product should be added to my store's inventory and made visible to our customers.

View a Comprehensive List of All the Products Currently Available / Unavailable (sold out) in My store
* The product list should display essential information, including the product name, price, and current stock quantity, to assist me in monitoring inventory levels.
* For efficient management, I anticipate that I can easily access the details of each product by clicking on its listing.

Capability to Update Any Product
* When editing a product, I should be able to modify various attributes, such as the product's name, description, price, and available quantity.
* I should also be able to upload new images or update existing ones to accurately represent the product.
* After making changes, I expect the updated information to be reflected on the product listing immediately.

Ability to Remove Product From Store
* To achieve this, I should be able to select a product and initiate the deletion process.
* Upon confirmation, the product should be permanently removed from my store, ensuring that customers can no longer view or purchase it.

### User's Cart (Online Shopper) 🐰

Add Item to My Cart
* Adding the item to my cart should be a simple and intuitive process, allowing me to specify the quantity if needed.

View the Contents of the Cart
* When I view my cart, I expect to see a clear and detailed list of all the items I've added, including their names, quantities, prices, and total cost.
* This visibility is essential for me to review my selections before proceeding with the purchase.

Adjust the Quantity of Specific Items
* To do this, I should have the option to update the number of items for each product in my cart.
* This flexibility ensures that I can easily fine-tune my order to match my preferences.

Remove Item From My Cart
* This action should be straightforward and efficient, allowing me to declutter my cart and finalize my purchase with confidence.

### User's Payment Information (Online Shopper) 🐰

Add a Payment Method
* Adding a payment method should involve providing the necessary information, such as credit card details or other payment credentials.
* This process should be user-friendly and secure to ensure the safety of my financial information.

View a Comprehensive List of All the Payment Methods Associated with My Account
* The list should include details like card type (e.g., Visa, Mastercard), the last four digits of the card, and an option to set a default payment method if desired.
* This visibility allows me to keep track of the payment methods available for my transactions.

 Ability to Update My Payment Methods
* Updating a payment method should be straightforward, allowing me to modify information such as card number, expiration date, or billing address as needed.
* This ensures that my payment information remains accurate and up-to-date.

Ability to Delete Payment Methods
* The process of deleting a payment method should be secure and straightforward, with appropriate confirmation steps to prevent accidental removal.

### User's Address Information (Online Shopper) 🐰

Add a New Shipping Address
* Adding a shipping address should involve providing essential information such as my address, city, postal code, and any additional details to ensure accurate delivery.
* This process should be straightforward and secure to ensure that my orders are shipped to the correct location.

View a Comprehensive List of All the Address Associated with My Account
* The list should display details such as the address label (e.g., Home, Work), the complete address, and the option to set a default shipping address if needed.
* This visibility allows me to manage and select the appropriate shipping address during the checkout process.

Ability to Update My Shipping Address
* Updating a shipping address should be straightforward, allowing me to modify details such as the address, city, postal code, or additional notes.
* This ensures that my shipping information remains accurate and up-to-date.

Ability to Delete Shipping Address
* The process of deleting a shipping address should be secure and straightforward, with appropriate confirmation steps to prevent accidental removal.

### Search (Online Shopper) 🐰

Search Bar Prominently Displayed, Where I can easily View the Item Names
* This search bar should be intuitive, inviting me to enter keywords, product names, or relevant terms to discover items of interest.
* As I start typing in the search bar, I anticipate that suggested results or auto-complete suggestions will appear to assist me in refining my search.

Ability to Search for Specific Items
* After entering my search query, I expect the website to promptly display a list of search results that match my criteria.
* Each search result should include the item name to help me identify the products.
* Clicking on a search result should take me to the product's detailed page for further exploration.

Remove Search
* This can be achieved through a clear and easily accessible option that allows me to clear my search query and return to browsing the entire product catalog.

## MVP List :rabbit:

•	New account creation, log in, log out, and guest/demo login
 o	Users can sign up, log in, and log out
 o	Users can use a Guest log in to try the site (checkout as guest)
 o	Users can’t use certain features without logging in (like checking out)
  	Users can’t use features like selling goods unless they are admin like Milkitea’s Studio 
  	Logged in users are directed to the homepage where all the items are located.

•	Store / Products (if admin)
 o	Admin should be able to create a product in their store (CREATE)
 o	Admin should be able to view all their products in their store (READ)
 o	Admin should be able to update their products in their store (UPDATE)
 o	Admin should be able to delete a product in their store (DELETE)

•	User’s Cart
 o	User should be able to add an item to their cart (CREATE)
 o	User should be able to view all the items in their cart (READ)
 o	User should be able to update the number of items in their cart (UPDATE)
 o	User should be able to delete an item from their cart (DELETE)

•	User’s payment
 o	User should be able to add a payment method in their account (CREATE)
 o	User should be able to view all their payment method in their account (READ)
 o	User should be able to update their payment method in their account (UPDATE)
 o	User should be able to delete a payment method in their account (DELETE)

•	User’s address / shipping address
 o	User should be able to add a shipping address to their account (CREATE)
 o	User should be able to view all their addresses added in their account (READ)
 o	User should be able to update their shipping address in their account (UPDATE)
 o	User should be able to delete a shipping address in their account (DELETE)

•	Search
 o	User should be able to view the item name (READ)
 o	User should be able to search the item (UPDATE)
 o	User should be able to remove their search (DELETE)

## Schema :rabbit:

![MilkiTea Studio](https://github.com/Korozami/MilkiteaStudio/assets/104758287/6ec52bbd-3484-4d0e-8ed2-98ea42d5174b)
