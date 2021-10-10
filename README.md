# Vandy Course Buddy

Submitted by: Du Duong, Binh Ho, Tiger Li, Hieu Vu

## Sypnosis

Vandy Course Buddy is a CS major interactive roadmap that allows you to customize different paths to completing your CS major. Our goal is to build a better course planner than what the university offers in YES. Vandy Course Buddy is fast, colorful, and easy-to-use, and makes course shopping fun and intuitive.

## Setup

There are two folders, `API` and `Front-End`.

1. To start, navigate to `../BackEnd` and `../vandycsreqer` and do `npm install` for setup installations
2. Then, start the backend services -> navigate to `../BackEnd/` and run command `npm start` in terminal
3. After that, start front services -> navigate to `../vandycsreqer` and run command `npm start` in terminal

**NOTE: THESE MUST BE DONE IN ORDER**

## Description and Reflections
The courses that are greyed out are courses that you can take, but you haven’t selected yet. As you select courses, new courses will pop up, indicating that you can select those. If you notice, each course is colored to match a pre-determined category, for example: machine learning or AI courses are in green, and graphics courses are in purple.

 

You can view the descriptions by clicking on this button here, to see if you are interested in it.  

 

Here, let’s reset this webpage by unselecting the intro class.

 

By unselecting an earlier class, the program will automatically unselect courses that requires the earlier class.

 

For a CS major using this website, the user will select the courses that they have already taken. From here, you can see all classes that you can take and begin to plan what you want to take in the future. For example, an incoming freshmen CS major can use this tool to plan out their course path. They might initially want to take 1101, then 2212 and 2201. As they fill out their course selections, they may have second thoughts on taking 1101, and instead what to take 1104. If they select 1104 and then unselect 1101, it does not reset the paths, as 1101 and 1104 provide similar paths forward. In fact, picking 1104 here would open up a new path in 2204.

 

Once the user is satisfied with the path that they have selected, they can choose to download a PDF detailing their course selections, so they can have it on hand the next time course selection opens up.

 

Other features that we want to add but didn’t have the time to implement, include adding connecting arrow between the courses to show their relations. At the moment, this feature has been implemented in the backend, but is not represented in the UI. We also wanted to add a search bar, that could bring up any course even if you couldn’t select it currently, and then highlight all of the paths that you can take to get there. In addition, we wanted the capability in hovering over any course to show the paths that this course opens up. Furthermore, we wanted to add in different tabs so that you can plan multiple paths at the same time and overlaying the tabs to see the difference. Lastly, all of the course info are webscrapped, and there wasn’t much hardcoding involved, thus, if we had more time, we also wanted to branch out and add in other majors.

 

In the end, we wish we had more time to clean up the front-end to make it better looking. One challenge we faced was how we were going to design the backend. We were going to use python and MySQL to do this but after many re-designs, we settled on making our own data structure in Javascript to do all of the graph operations. We had a lot of fun working on Vandy Course Buddy, and we hope that during course registration season, Vandy Course Buddy can help CS majors get more sleep than we had in the last 2 days.
