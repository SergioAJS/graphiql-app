# GraphiQL-app development plan

## General requirements

* [] Errors from the api side - (Not found, unhandled rejection, etc) should be displayed in a user-friendly format (toast, pop-up, or something like this - up to your decision).

___

* [] Localization **5 point**
* [] Sticky header **5 points**

## Welcome page

* [] If user is not authorized, main page should contain a link to Sign In / Sign Up page.
* [] If user is authorized, main page should contain a link to the Main route.

___

* [] The welcome page should contain general information about the developer, project, and course. **2 point**
* [] In the upper right corner there are 2 buttons: Sign In and Sign Up. **2 point**
* [] If login token is valid and unexpired, change buttons Sign In and Sign Up on "Go to Main Page" button. **2 points**
* [] When the token expires - the user should be redirected to the "Welcome page" automatically. **3 points**
* [] Pressing the Sign In / Sign up button redirects a user to the route with the Sign In / Sign up form. **1 point**

## Header

* [] All Private routes should contain sticky header. Moment when it become sticky (if there is a scroll on a page) should be animated: color can be changed or it's height can become smaller. Animated sticky header.
* [] Sign Out button - signs user out.

## Footer

* [] Footer should contain a link to the author's github, the year the application was created, course logo with link to the course.
* [] Footer is displayed on all pages of the application.

## Sign In / Sign Up

* [] For the authentication you should use Firebase with email option.
* [] Upon successful login, the user should be redirected to the Welcome page.
* [] If user has been logged in already and he/she tries to reach this route - he/she should be redirected to the Welcome page.

___

* [] Buttons for Sign In / Sign Up / Sign Out are everywhere where they should be **5 points**
* [] Client-side validation should be implemented (email and password strength - minimum 8 symbols, at least one letter, one digit, one special character). **10 points**
* [] Upon successful login, the user should be redirected to "Main route" **3 points**
* [] If user already logged in and he try to reach this routes - he should be redirected to Main route. **2 points**

## Main route - GraphiQL

* [] Working editor allowing to edit the query. **15 points**
* [] Working documentation explorer, should be visible only when sdl request will succeed. **15 points**
* [] Variables section. Should be closed/opened **5 points**
* [] Headers section. Should be closed/opened **5 points**
* [] Response section. **10 points**

## Submit task

* [] Link to pull request in rs app is submitted only by team leader ❗
* [] Make sure the pull request is available for review ❗ To do this, open the link that you submit in rs app in incognito browser mode.

## Penalties

* [] React default favicon - **5 points**
* [] The presence of errors and warnings in the console - **2 points for each**
* [] The presence in the console of the results of the console.log execution - **2 points for each**
* [] @ts-ignore or any usage (search through github repo) - **1 point for each**
* [] Making commits after the deadline - **20 points**
