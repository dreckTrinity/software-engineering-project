import pandas as pd
import re, csv

def bigPrint(df):
    with pd.option_context('display.max_rows', None, 'display.max_columns', None):  # more options can be specified also
        print(df)

pat = re.compile('CSCI.\d{4}')
def cleanPrerequisites(course_list):
    if '21 hours' in course_list:
        return ",".join(['CSCI-9999'])

    prereqs = []

    # just stupid formating workaround from raw data 
    space_idx = course_list.index(' ')
    course_list = course_list[space_idx+1:]
    
    # different courses are delimited with ','
    # within each their description is separated with ';'
    courses = course_list.split(',')

    for course in courses:

        # get all the courses from the description string
        matches = re.findall(pat,course)

        # regulate the naming so courses are all "XXXX-0000" instead of "XXXX 0000"
        matches = list(map(lambda x: x.replace(' ', '-'), matches))

        # add the matches to the list
        prereqs.extend(matches)

    return " ".join(prereqs)

def getRows(filename):
    df = pd.read_excel(filename)
    
    # only want to work with a subset of input columns
    relevant_cols = ['course','title', 'credits', 'printed specs']
    df = df[relevant_cols]
    df.rename(columns={'printed specs':'prerequisites'}, inplace=True)
    df.rename(columns={'credits':'creditHours'}, inplace=True)
    df.rename(columns={'title':'name'}, inplace=True)
    
    # only retain CSCI courses
    df = df[df.apply(lambda x: x['course'].split('-')[0] == 'CSCI', axis=1)]

    # clean the prerequisite values and store in the df
    for dict in df.itertuples():
        idx = dict.Index
        str = ""
        if not pd.isnull(df.at[idx,'prerequisites']):
            str = cleanPrerequisites(dict.prerequisites)
        df.at[idx,'prerequisites'] = str
    df[['courseDept','courseNum']] = df['course'].str.split('-',expand=True)
    df.drop(columns=['course'], inplace=True)
    # move the rightmost column to the leftmost
    cols = list(df.columns.values)
    cols = ['name', 'courseNum', 'courseDept', 'creditHours', 'prerequisites']
    print(cols)
    df = df[cols]
    #cols = ['name', 'courseNum', 'courseSection', 'courseDept', 'instructor', 'creditHours', 'pathways', 'prerequisites', 'location', 'meetingTime', 'courseDescription']
    df.insert(2, 'courseSection', '1')
    df.insert(4, 'instructor', ' ')
    df.insert(6, 'pathways', ' ')
    df.insert(8, 'location', ' ')
    df.insert(9, 'meetingTime', ' ')
    df.insert(10, 'courseDescription', ' ')
    print(df)
    return df
getRows("courses.xlsx")
getRows("courses.xlsx").to_csv("cleanPrerequisites.csv", sep=',',
                              index=False,
                              quoting=csv.QUOTE_NONE)