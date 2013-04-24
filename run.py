#!/usr/bin/python
# Fetch last week's classes

CLASS_SCRIPT        ='classes.js'
ATTENDANT_SCRIPT    ='attendant.js'
PHANTOM_JS          ='phantomjs'

from subprocess import Popen, PIPE

LOCATIONS = ["http://florida.flywheelsports.com/reserve/miami-beach",
             "http://florida.flywheelsports.com/reserve/boca",
             "http://new-york.flywheelsports.com/reserve/flatiron",
             "http://new-york.flywheelsports.com/reserve/jcc",
             "http://new-york.flywheelsports.com/reserve/upper-east-side",
             "http://new-york.flywheelsports.com/reserve/sag-harbor",
             "http://new-york.flywheelsports.com/reserve/east-hampton",
             "http://new-york.flywheelsports.com/reserve/millburn",
             "http://new-york.flywheelsports.com/reserve/stamford",
             "http://new-york.flywheelsports.com/reserve/englewood",
             "http://chicago.flywheelsports.com/reserve/gold-coast",
             "http://chicago.flywheelsports.com/reserve/highland-park",
             "http://seattle.flywheelsports.com/reserve/south-lake-union",
             "http://seattle.flywheelsports.com/reserve/bellevue",
             "http://texas.flywheelsports.com/reserve/highland-park",
             "http://texas.flywheelsports.com/reserve/plano",
             "http://los-angeles.flywheelsports.com/reserve/west-hollywood",
             "http://los-angeles.flywheelsports.com/reserve/larchmont",
             "http://philadelphia.flywheelsports.com/reserve/center-city",
             "http://dubai.flywheelsports.com/reserve/burj-views"]

def get_classes(location):
    process = Popen(' '.join([PHANTOM_JS, CLASS_SCRIPT, location]),
                    shell=True,
                    stdout=PIPE)

    for l in process.stdout:
        l = l.strip()

        if not len(l):
            continue

        yield l.split('\t')[1]

def get_attendees(cls):
    process = Popen(' '.join([PHANTOM_JS, ATTENDANT_SCRIPT, cls]),
                    shell=True,
                    stdout=PIPE)
    return process.stdout.readline().strip()

def main(out_file):
    out = open(out_file, 'r')
    classes = frozenset(map(lambda a: a.strip(), out))
    out.close()

    out = open(out_file, 'a')
    print 'Classes previously processed: %d' % len(classes)
    for location in LOCATIONS:
        for cls in get_classes(location):
            if cls in classes:
                print 'Skipping', cls
            else:
                print 'Fetching', cls
                out.write(cls)
                out.write('\n')
                out.flush()

    out.close()

if __name__ == '__main__':
    import sys
    if len(sys.argv) != 2:
        print 'Usage: ./run.py [output file]'
    else:
        main(sys.argv[1])

