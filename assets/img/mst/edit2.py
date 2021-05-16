import os

def convert(strng):
    name = ''

    if strng[8:10] == '11': name = 'nov'+strng[10:17]+'.jpg'

    elif strng[8:10] == "10": name = 'oct'+strng[10:17]+'.jpg'

    elif strng[8:10] == "9": name = 'sep'+strng[10:17]+'.jpg'

    return name
# # convert('IMG_20201106_103535432_HDR.jpg
# # convert('IMG_20201105_170645080.jpg
dirloc ="C:/Users/User/Documents/GitHub/aaaa/static/assets/img/mst/"
dirloc2 = "C:/Users/User/Documents/GitHub/aaaa/static/assets/img/mst2/"
for file in os.listdir(dirloc):
    if file.startswith('IMG'):
        os.rename(file, convert(file))
