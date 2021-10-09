
class Courses:
    global map

    def __init__(self, id, name, description, prereqs):
        self.id = id
        self.name = name
        self.description = description
        self.prereqs = prereqs
        self.weight = map[id]

    def get_id(self):
        return self.id

    def get_name(self):
        return self.name

    def get_weight(self):
        return self.weight

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