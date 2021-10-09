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

def scrapeMenu(URL):
    # establishing connection to the main catalog
    driver = webdriver.Safari()
    driver.get(URL)
    global courses, links
    courses = WebDriverWait(driver, 10).until(
        EC.presence_of_all_elements_located(
            (By.CSS_SELECTOR, ".style__item___N3dlN [href]")))  # get all course listing and respective hyperlinks
    links = [course.get_attribute('href') for course in courses]


def buildGraph(courses, links):
    global G
    G=nx.DiGraph()
    #G.add_node("1100", course = )
    i = 0
    for course in courses:
        print(course.text)
        print(links[i])
        i = i + 1


scrapeMenu(URL)
buildGraph(courses, links)















