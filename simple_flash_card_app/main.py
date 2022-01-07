import csv
import random
from tkinter import *

BACKGROUND_COLOR = "#B1DDC6"
BACKGROUND_COLOR_lb = "#91c2af"


def word_seen():
    show_en_word()
    for translation in words_to_learn:
        if word["text"] in translation:
            print(word["text"])
            words_to_learn.remove(translation)
            break
    with open(path, "w") as csv_file:
        file_str = ""
        for translation in words_to_learn:
            file_str += f"{translation[0]},{translation[1]}\n"
        csv_file.write(file_str)


def show_en_word():
    for translation in french_words:
        if translation[0] == word["text"]:
            en_word = translation[1]
    canvas.itemconfig(card, image=card_back_img)
    word.config(text=en_word, fg="white", bg=BACKGROUND_COLOR_lb)
    title.config(text="English", fg="white", bg=BACKGROUND_COLOR_lb)
    window.after(3000, func=update_fr_word)


def update_fr_word():
    canvas.itemconfig(card, image=card_front_img)
    title.config(text="French", fg="black", bg="white")
    word.config(text=random.choice(french_words)[0], bg="white", fg="black", font=("Arial", 60, "bold"))


# makes dict of the french words
french_words = []
with open("data/french_words.csv") as csv_file:
    for [fr, en] in csv.reader(csv_file):
        french_words.append([fr, en])
path = "data/words_to_learn.csv"

# checks if the file exists and creates one if it doesnt
try:
    f = open(path)
except FileNotFoundError:
    str = ""
    for translation in french_words:
        str += f"{translation[0]},{translation[1]}\n"
    f = open(path, "w")
    f.write(str)
finally:
    f.close()

# makes the words to learn list
with open(path) as csv_file:
    words_to_learn = [*csv.reader(csv_file)]
    print(words_to_learn)

window = Tk()
window.config(bg=BACKGROUND_COLOR, padx=50, pady=50)

# images
card_back_img = PhotoImage(file="images/card_back.png")
card_front_img = PhotoImage(file="images/card_front.png")
right_img = PhotoImage(file="images/right.png")
wrong_img = PhotoImage(file="images/wrong.png")

canvas = Canvas(width=800, height=525, bg=BACKGROUND_COLOR, highlightthickness=0)
card = canvas.create_image(400, 262.5, image=card_front_img)

right_btn = Button(image=right_img, highlightthickness=0, borderwidth=0, command=word_seen)
right_btn.grid(row=1, column=0)

wrong_btn = Button(image=wrong_img, highlightthickness=0, borderwidth=0, command=show_en_word)
wrong_btn.grid(row=1, column=1)

title = Label(text="french", font=("Arial", 40, "italic"))
title.place(x=300, y=150)

word = Label()
update_fr_word()
word.place(x=275, y=263)

canvas.grid(row=0, column=0, columnspan=2)

window.mainloop()
