from selenium import webdriver
from selenium.webdriver.support.wait import WebDriverWait
from selenium.webdriver.common.by import By
from selenium.webdriver.support import expected_conditions as EC
import csv
import Courses
import networkx as nx


class Course(object):
    def __init__(self, id, name, description, url):
        self.id = id #webscraping
        self.name = name #webscraping
        self.description = description #webscraping
        self.url = url #webscraping
        self.prereqs = [] #as array of arrays [[1 or 2] and [3 or 4]]
        self.weight = 1 #helper algorithm
        self.degree = 0 #increase as building the graph
        self.prof = {} #as a dictionary { name:rating }, use helper function
        self.availability = 1 #as percent, use helper function
        self.keywords = [] #array of strings

map = {
        "1101": "Core",
        "1104": "Core",
        "2201": "Core",
        "2212": "Core",
        "2123": "Core",
        "3251": "Core",
        "3281": "Core",
        "3250": "Core",
        "3270": "Core",

        "2231": "Hardware",
        "3276": "Hardware",
        "3282": "Hardware",
        "4284": "Hardware",

        "3253": "Software Engineering/Design",
        "3254": "Software Engineering/Design",
        "3274": "Software Engineering/Design",
        "4278": "Software Engineering/Design",
        "4279": "Software Engineering/Design",

        "3258": "Graphics/Animation/VR",
        "3259": "Graphics/Animation/VR",
        "4249": "Graphics/Animation/VR",

        "3262": "ML/AI",
        "4260": "ML/AI",
        "4262": "ML/AI",
        "4267": "ML/AI",
        "4269": "ML/AI",

        "3265": "Data",
        "4266": "Data",

        "3860": "Research",
        "3861": "Research",

        "4277": "Cybersecurity",
        "4285": "Cybersecurity",

        "4283": "Network/Cloud",
        "4287": "Network/Cloud",
        "4288": "Network/Cloud",

        "4959": "Computer Science Seminar",

        "3252": "Theory"
    }
major = "CS"
if major == "CS":
    URL = "https://www.vanderbilt.edu/catalogs/kuali/undergraduate.php/#/courses?group=Computer%20Science"
if major == "EECE":
    URL = "https://www.vanderbilt.edu/catalogs/kuali/undergraduate.php/#/courses?group=Electrical%20%26%20Computer%20Engineering"
driver = webdriver.Safari()


def scrapeMenu(URL):
    # establishing connection to the main catalog
    driver.get(URL)
    global courses, links
    courses = WebDriverWait(driver, 20).until(
        EC.presence_of_all_elements_located(
            (By.CSS_SELECTOR, ".style__item___N3dlN [href]")))  # get all course listing and respective hyperlinks
    links = [course.get_attribute('href') for course in courses]


def scrapeAll(URL):

    course_writer = open("course_file.txt","w")

    for i in range(len(courses)):
        scrapeCourse(links[i], courses[i].text, course_writer)
        scrapeMenu(URL)
    course_writer.close()

def scrapeCourse(URL, name, course_writer): #get info on a single course
    driver.get(URL)
    course = WebDriverWait(driver, 20).until(
        EC.presence_of_all_elements_located(
            (By.CSS_SELECTOR, ".course-view__pre___2VF54")))
    description = course[0].text
    startIndex = description.find("Prereq")
    prereq = []
    term = ["FALL", "SPRING"]
    if description.find("Prereq")!= -1:
        getPreReqs(startIndex, description, prereq, name)
        if description[startIndex:].find("FALL") != -1 and description[startIndex:].find("SPRING") == -1:
            term = ["FALL"]
        if description[startIndex:].find("SPRING") != -1 and description[startIndex:].find("FALL") == -1:
            term = ["SPRING"]
    print("name:", name, "\n\tPrereqs: ", prereq,"\n\tDescription: ",description, "\n\tTerm: ",term)
    exportTXT(name, description, prereq, term, course_writer)

def getPreReqs(startIndex, description, prereq, name):
    startIndex = startIndex + description[startIndex:].find(major) + len(major)+1
    if(name == "CS2212 - Discrete Structures"):
        prereq.append([])
        prereq[0].append("None")
        return

    if (name == "CS3262 - Applied Machine Learning"): #special case, fix if have time
        prereq.append([])
        prereq[0].append("1100")
        prereq[0].append("2201")
        prereq[0].append("2204")
        return

    if (name == "CS2201 - Program Design and Data Structures"):  # special case, fix if have time
        prereq.append([])
        prereq[0].append("1101")
        prereq[0].append("1104")
        return


    if (name == "CS2204 - Program Design and Data Structures for Scientific Computing"):  # special case, fix if have time
        prereq.append([])
        prereq[0].append("1100")
        prereq[0].append("1104")
        return

    prereq.append([description[startIndex:startIndex+4]])
    tmp = 0
    while description[startIndex+4:].find(major) != -1 and startIndex < len(description):
        if description[startIndex+4:description[startIndex+4:].find(major)+startIndex+4].find(",") != -1 or description[startIndex+4:description[startIndex+4:].find(major)+startIndex+4].find(";")!= -1: #comma in between --> and
            startIndex = description[startIndex+4:].find(major)+startIndex+4+len(major)+1 #fix this
            prereq.append([description[startIndex:startIndex+4]])
            tmp = tmp+1
        else:
            startIndex = description[startIndex+4:].find(major)+startIndex+4 + len(major)+1 #fix this
            prereq[tmp].append([description[startIndex:startIndex+4]])

def exportTXT(name, description, prereq, term, course_writer):
        result = []
        id = name[2:6]
        result.append(id)
        if len(prereq) == 0:
            result.append("None")
        else:
            for p in prereq:
                result.append(toString(p))
        result.append("\""+name[9:]+"\"")
        result.append("\""+description+"\"")
        result.append(toString(term))
        if id in map.keys():
            result.append(map.get(id)+"\n")
        else:
            result.append("None"+"\n")
        #print(result)
        course_writer.write(writeList(result))

def toString(p):
    tmp = ""
    for i in range(0,len(p)):
        if i == 0:
            tmp = tmp + p[0]
        else:
            tmp = tmp+"/"+p[i]
    return tmp

def writeList(result):
    tmp = ""
    for i in range(len(result)-1):
        tmp = tmp + result[i] + ","
    return tmp + result[(len(result)-1)]


scrapeMenu(URL)
scrapeAll(URL)




















