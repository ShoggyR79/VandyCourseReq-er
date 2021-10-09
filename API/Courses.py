
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
        "1101": "core",
        "1104": "core",
        "2201": "core",
        "2212": "core",
        "2123": "core",
        "3251": "core",
        "3281": "core",
        "3250": "core",
        "3270": "core",

        "2231": "hardware",
        "3276": "hardware",
        "3282": "hardware",
        "4284": "hardware",

        "3253": "softwareED",
        "3254": "softwareED",
        "3274": "softwareED",
        "4278": "softwareED",
        "4279": "softwareED",

        "3258": "gavr",
        "3259": "gavr",
        "4249": "gavr",

        "3262": "mlai",
        "4260": "mlai",
        "4262": "mlai",
        "4267": "mlai",
        "4269": "mlai",

        "3265": "data",
        "4266": "data",

        "3860": "research",
        "3861": "research",

        "4277": "cybersecurity",
        "4285": "cybersecurity",

        "4283": "netCloud",
        "4287": "netCloud",
        "4288": "netCloud",

        "4959": "seminar",

        "3252": "theory"
    }