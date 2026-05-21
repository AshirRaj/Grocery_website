 Grocery Website

This is a MERN stack Grocery Website project with Seller, Admin, and User functionality.

## Important Note

When the project runs for the first time with a new MongoDB URL, no products will be available on the website.

To show products on the website, first the seller must add products, then the admin must approve those products.

---

## Project Structure

```txt
GROCERY_WEBSITE/
├── frontend/
├── backend/
Seller Login

To login as a seller, open this URL:

http://localhost:5173/seller

Seller login credentials:

Email: admin@gmail.com
Password: admin123

After seller login, go to Add Product and add products.

Product images are available inside the frontend assets folder:

frontend/src/assets/

The seller can use those product images while adding products.

Admin Login

To login as admin, open this URL:

http://localhost:5173/admin

Admin login credentials:

Email: admin@grocery.com
Password: admin123

These admin credentials can be changed from the .env file inside the backend folder.

Example:

ADMIN_EMAIL=admin@grocery.com
ADMIN_PASSWORD=admin123
Product Approval Process

After the seller adds products, those products will not directly appear on the website.

The admin must:

Login using the admin URL.
Go to Approve Product.
Approve the products added by the seller.

After approval, the products will be visible to users on the main website.

User Website

Users can open the normal website URL:

http://localhost:5173

Only approved products will be shown to users.

Flow of the Project
Start backend and frontend.
Open seller login:
http://localhost:5173/seller
Login with seller credentials.
Add products.
Open admin login:
http://localhost:5173/admin
Login with admin credentials.
Approve the products.
Open user website:
http://localhost:5173
Approved products will be visible on the website.

One correction: you wrote **“after this /admin”** — correct URL should be:

```txt
http://localhost:5173/admin

And seller URL should be:

http://localhost:5173/seller