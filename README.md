# Where's My Son?

For 8 months in 2024/25 I solo travelled around the UK and Europe in a campervan visiting a variety of places. Many of my family and friends were interested in where I had been and were concerned for my safety due to mebeing on my own. While location tracking services are available, such as Google Maps, I didn't want people constantly being able to see where I was to maintain some independance and sense of adventure.

My solution was a web app that allowed me to mark my location whenever I chose to which others could then look at. The addition of an image for each location and a timestamp also means an interesting log of all the places I have visited gets created.

I wanted to use this small project to reaquaint myself with web development and further my understanding of React.

## Technologies
For the back end of this project I opted to use **FastAPI** due to its rapid development time and the limited requirements for that part of the system to meet.

The database is in **SQLite** as not much data is needed to be stored in it and its integration with FastAPI well documented.

The front end is written in **Typescript** using the **React** framework as I have used React before and wanted to become more profficient with it.

## How To Run

## Example screenshots
![screenshot1](screenshots/Screenshot%20from%202025-03-27%2019-12-59.png "Screenshot1")
Main Page for viewing locations on the map
![screenshot2](screenshots/Screenshot%20from%202025-03-27%2019-13-27.png "Screenshot2")
Example of clicked location, showing latitude, longitude, timestamp and an image
![screenshot3](screenshots/Screenshot%20from%202025-03-27%2019-14-05.png "Screenshot3")
Example of clicked location, showing latitude, longitude, timestamp and an image

## Potential Future Development
- Login system to allow multiple different users to log their journeys
- Deploy on the open web using a containerisation software such as Docker
- Animations between web pages to provide a smoother user experience