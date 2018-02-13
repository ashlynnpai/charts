import openpyxl
wb = openpyxl.load_workbook('unis.xlsx')
sheet = wb.worksheets[0]
year = 2007
infolist = []
infodict = {}

for row in range(4, 54):
    num = 67
    infodict["uni"] = sheet['A' + str(row)].value
    infodict["state"] = sheet['B' + str(row)].value
    for i in range(2007,2018):
        infodict[i] = int(sheet[chr(num) + str(row)].value)
        num += 1
    infolist.append(infodict)
    infodict = {}

print infolist

