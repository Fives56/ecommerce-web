# EcommerceWeb

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.0.6.

## Installation
Clone the repository and install:

``
git clone https://github.com/Fives56/ecommerce-web
  cd ecommerce-web
  ``
Install the dependencies:
``npm install``

## Development server
Run ng serve for a dev server. Navigate to http://localhost:4200/. The application will automatically reload if you change any of the source files.

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Usage
After running the development server, you can access the application at http://localhost:4200/.

The application is divided into different views:

- Products: Displays a list of products with their details and a cart icon. Route: /.
- Product Details: Displays the details of a specific product. Route: /product/:id.
- Login: Displays the login form for the user to access their account. Route: /login.
- Payment: Displays the payment form for the user to complete the order. Route: /checkout. You need authentication to access this route.

### Authentication
In the login form you can use the following credentials:

``Username: johnd
Password: m38rmF$``

An alternative option is:

``Username: kevinryan
Password: kev02937@``

## Development

In case you want to edit the project locally you can clone the repository and make pull requests to the main branch.

### Prerequisites
Before you start, make sure you have the following installed:

Node.js (v18.2.0 or higher)
Angular CLI (v18.2.0 or higher)
Git

### Generate files
Run ng generate component component-name to generate a new component. You can also use ``ng generate directive|pipe|service|class|guard|interface|enum|module``.

### Build
Run ``ng build`` to build the project. The build artifacts will be stored in the dist/ directory.

### Running unit tests
Run ``ng test`` to execute the unit tests via Karma.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.

