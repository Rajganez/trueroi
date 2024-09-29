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

I preferred this approach to solidify my javascript core knowledge. And I realized this the best when I implemented.

1. Implement custom JSON stringify
2. Implement custom Object assign
3. Implement custom Deep Equal
4. Implement custom lodash memoize
5. Implement custom Promise.allSettled
6. Implement custom call method
7. Implement custom apply method
8. Implement custom bind method
9. Implement custom setTimeout
10. Implement custom setInterval
11. Implement custom Event Emitter
12. Implement custom Deep Flatten
13. Implement custom Promise.any
14. Implement custom Deep Clone
15. Implement custom Promise.all
16. Implement custom Object is
17. Implement custom javascript promises
18. Implement custom JSON parse
19. Implement debouncing rate limiting
20. Implement throttling rate limiting
21. Implement custom lodash get
22. Implement custom lodash set
23. Implement custom lodash omit
24. Implement custom lodash memoize once
25. Implement custom lodash chunk
26. Implement custom lodash once
27. Implement custom Promise.race
28. Implement Virtual DOM I (serializing)
29. Implement Virtual DOM II (deserializing)
30. Implement custom lodash partial

Twilo recovery code 4PTGJMHVDYVGNMK9GGVE9Z9S

const accountSid = 'AC6a40120f3968cff6667dcf66f51a4849';
const authToken = 'eddfb26b2bc42fce7f58683fbb1145ce';
const client = require('twilio')(accountSid, authToken);
client.messages
    .create({
        to: '[HandsetNumber]'
    })
    .then(message => console.log(message.sid));


const accountSid = 'AC6a40120f3968cff6667dcf66f51a4849';
const authToken = 'eddfb26b2bc42fce7f58683fbb1145ce';
const client = require('twilio')(accountSid, authToken);
client.messages
    .create({
        body: 'Test Message',
        from: '+15705593334',
        to: '+918838539223'
    })
    .then(message => console.log(message.sid));
