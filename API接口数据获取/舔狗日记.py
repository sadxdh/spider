import requests
import pyperclip
import pyautogui
import time

url = "https://v.api.aa1.cn/api/tiangou/txt.php?aa1=text"

while True:
    time.sleep(3)
    resp = requests.get(url)
    txt = resp.text.strip('<p>').strip('</p>')
    print(txt)

    pyperclip.copy(txt)
    # pyperclip.paste()
    pyautogui.hotkey('Ctrl', 'v')
    # pyautogui.hotkey('command', 'txt')
    # pyautogui.typewrite(txt, interval=0.15)
    pyautogui.press("space")
    pyautogui.press("enter")