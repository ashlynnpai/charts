import openpyxl
import json
wb = openpyxl.load_workbook('unis.xlsx')
sheet = wb.worksheets[0]
year = 2007
infolist = []
infodict = {}

for row in range(4, 54):
    num = 67
    for i in range(2007,2018):
        infodict["uni"] = str(sheet['A' + str(row)].value)
        infodict["state"] = str(sheet['B' + str(row)].value)
        infodict["year"] = i
        infodict["tuition"] = int(sheet[chr(num) + str(row)].value)
        #infodict[i] = int(sheet[chr(num) + str(row)].value)
        num += 1
        infolist.append(infodict)
        infodict = {}

print json.dumps(infolist)

