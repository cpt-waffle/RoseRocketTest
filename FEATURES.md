## Rose Rocket Coding Challenge ­ Packing Page

**Required Features**

At any point in time (read: real time), users should be able to see what items are already in the boxes as well as items which are available for packing.

At any point in time (read: real time), users should be able to see all the users that are online on the page.

Any user can drag an item from the list of available items to any box that hasn’t exceeded its weight limit.

Any user can remove item from a box making it available for drag.

Any number of users are able to join the collaboration page without any authentication (just by opening the webpage). Upon opening the page a new user object should be created with a random name and random unique id.

**Extra Features**

- Added option to create new item and add it to an item list using a modal.
- Added some level of error checking on the backend server.

**Front-End Screen Shots and User Stories**

A user joins the collaboration page without authentication and gets assigned a new username and id.
![1](https://github.com/vasiliy-klimkin/RoseRocketTest/blob/master/docs/images/rr1main_menu.png?raw=true)
A user adds an item into one of the boxes (Drag and Drop. Note: You have to drag the items into the white area, and not just on the entire box. I made it this way so that they user has to be sure what he wants item he wants to drag in that box and has to pay alittle more attention.). That item becomes **unavailable** because it has been used.
![2](https://github.com/vasiliy-klimkin/RoseRocketTest/blob/master/docs/images/rr2ItemsAddedAndGrayedOut.png?raw=true)
A user tries to add a new item to the item list. Items modal appears. User cannot leave create an empty item because the submit button is grayed out and is disabled.
![3](https://github.com/vasiliy-klimkin/RoseRocketTest/blob/master/docs/images/rr3AddNewItemModal.png?raw=true)
A user adds a negative weight. Modal submit is disabled due to invalid parameters.
![4](https://github.com/vasiliy-klimkin/RoseRocketTest/blob/master/docs/images/rr4addNewItemModalUnacceptableParams.png?raw=true)
A user fills the proper parameters for the new item. Submit button is now available.
![5](https://github.com/vasiliy-klimkin/RoseRocketTest/blob/master/docs/images/rr4addNewItemModalAcceptableParams.png?raw=true)
A user adds the item which appears on the item list.
![6](https://github.com/vasiliy-klimkin/RoseRocketTest/blob/master/docs/images/rr5AddedItem.png?raw=true)
A user moves the new added item into a box. That new item is made unavailable.
![7](https://github.com/vasiliy-klimkin/RoseRocketTest/blob/master/docs/images/rr6AddedItemMovedIntoBoxAndUnavailable.png?raw=true)
Multiple users can see what is happening. (Node js server using websockets, everything is happening in real time.)
![8](https://github.com/vasiliy-klimkin/RoseRocketTest/blob/master/docs/images/rr7MultiUser.png?raw=true)

**Server Screen Shot**

Server `console.logs` some *basic* helpful logs about what has happenening.
-![8](https://github.com/vasiliy-klimkin/RoseRocketTest/blob/master/docs/images/rr8ServerConsoleLogs.png?raw=true)