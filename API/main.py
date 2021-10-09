from selenium import webdriver
from selenium.webdriver.support.wait import WebDriverWait
from selenium.webdriver.common.by import By
from selenium.webdriver.support import expected_conditions as EC
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

URL = "https://www.vanderbilt.edu/catalogs/kuali/undergraduate.php/#/courses?group=Computer%20Science"
driver = webdriver.Safari()
def scrapeMenu(URL):
    # establishing connection to the main catalog
    driver.get(URL)
    global courses, links
    courses = WebDriverWait(driver, 10).until(
        EC.presence_of_all_elements_located(
            (By.CSS_SELECTOR, ".style__item___N3dlN [href]")))  # get all course listing and respective hyperlinks
    links = [course.get_attribute('href') for course in courses]



def scrapeCourse(URL, name): #get info on a single course
    driver.get(URL)
    course = WebDriverWait(driver, 10).until(
        EC.presence_of_all_elements_located(
            (By.CSS_SELECTOR, ".course-view__pre___2VF54")))
    description = course[0].text
    startIndex = description.find("Prereq")
    prereq = []
    if description.find("Prereq")!= -1:
        getPreReqs(startIndex, description, prereq, name)
    print("name:", name, "\n\tPrereqs: ", prereq,"\n\tDescription: ",description)

def getPreReqs(startIndex, description, prereq, name):
    startIndex = startIndex + description[startIndex:].find("CS") + 3
    if (name == "CS3262 - Applied Machine Learning"): #special case, fix if have time
        prereq.append([])
        prereq[0].append("2201")
        prereq[0].append("2204")
        return
    if (name == "CS2212 - Discrete Structures"): #special case, fix if have time
        prereq.append([])
        prereq[0].append("1000")
        prereq[0].append("1100")
        prereq[0].append("1101")
        prereq[0].append("1103")
        prereq[0].append("1004")
        prereq[0].append("1151")
        return

    prereq.append([description[startIndex:startIndex+4]])
    tmp = 0
    while description[startIndex+4:].find("CS") != -1 and startIndex < len(description):

        if description[startIndex+4:description[startIndex+4:].find("CS")+startIndex+4].find(",") != -1 or description[startIndex+4:description[startIndex+4:].find("CS")+startIndex+4].find(";")!= -1: #comma in between --> and
            startIndex = description[startIndex+4:].find("CS")+startIndex+4+3 #fix this
            prereq.append([description[startIndex:startIndex+4]])
            tmp = tmp+1
        else:

            startIndex = description[startIndex+4:].find("CS")+startIndex+4 + 3 #fix this
            prereq[tmp].append([description[startIndex:startIndex+4]])




scrapeMenu(URL)
for i in range(42):
    scrapeCourse(links[i], courses[i].text)
    scrapeMenu(URL)




















