FrontEnd :
React + Vite + TailwindCSS + framermotion

Backend :
Node JS + Express JS + MongoDB

Required Dependencies :
For frontend - react-router-dom , framermotion , tailwindcss , materialui

For Authorization and Authentication :
After registration and Login using cookies to maintain the session of the user, use local storage for authentication
case 1 : while user registered redirect to login Page
case 2 : while user logged in redirect to dashboard page
case 3 : while user in dashboard page protect user from navigating to login and register page, in the footer links like privacy, support, refer and earn allowed for navigation
case 4 : footer links are allowed for every page navigation
case 5 : once the user is logged out protect user from navigating to dashboard and redirect user to the home page
case 6 : when user is in dashboard page and clicks the back button alert the user with the pop up using the useBlocker hook

Backend User : for Login and Registration pages
Registration - Id, Name, Email and Password, Date of Account Creation

Backend List (for Each User) : In Contacts
Create List - UserID , [{"Id" : "", "Email" : "", "Phone_Number": "", "Testimonial_Link": ""}, {..}, ...]

Backend for UserDashboard : Chart Creation
line Chart - total listData for year and month view
Pie Chart - total linkClicked for each Campaign
Leads - Total listof customer who clicked the links are the leads and send a curated message for that customer with the knowing the links clicked for what messages

Backend for Calendar :
Required_Data - UserID, (Email,Message,Testimonial campaign dates), (List Data)
Onclick a Date - Retrieve match date and Campaign Dates and show

Backend for Email Campaign :
Required_Data - UserID, EmailSent Date, EmailSentListId, EmailContent

Backend for Message Campaign :
Required_Data - UserID, EmailSent Date, EmailSentListId, EmailContent

Backend for Testimonial Campaign :
Required_Data - UserID, EmailSent Date, EmailSentListId, EmailContent

For testimonial : 
Provide two buttons one for listing testimonials and another for generating testimonial link
onclick generate link a link is generated with params /xyz
In BE - userID, generated link, 
In Testimonial list - EmailId, UserName, Stars, Testimonial,

Create steps

step 1 - 