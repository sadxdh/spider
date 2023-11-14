#!/usr/bin/env python
# pylint: disable=unused-argument
# This program is dedicated to the public domain under the CC0 license.
"""
First, a few callback functions are defined. Then, those functions are passed to
the Application and registered at their respective places.
Then, the bot is started and runs until we press Ctrl-C on the command line.

Usage:
Example of a bot-user conversation using ConversationHandler.
Send /start to initiate the conversation.
Press Ctrl-C on the command line or send a signal to the process to stop the
bot.
"""

# encoding:utf-8
import logging
import requests
import json
import base64
from telegram import Update, ForceReply
from telegram.ext import (
    Application,
    CommandHandler,
    CallbackContext,
    MessageHandler,
    ContextTypes,
    filters,
)

# Enable logging
logging.basicConfig(
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s",
    level=logging.INFO)
# set higher logging level for httpx to avoid all GET and POST requests being logged
logging.getLogger("httpx").setLevel(logging.WARNING)

logger = logging.getLogger(__name__)


async def start(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    """Send a message when the command /start is issued."""
    user = update.effective_user
    await update.message.reply_html(
        rf"Hi {user.mention_html()}!",
        reply_markup=ForceReply(selective=True),
    )


async def send_girlvideo(update: Update,
                         context: ContextTypes.DEFAULT_TYPE) -> None:
    """Send a girlvideo when the command /girlvideo is issued."""
    girlvideo = requests.get('http://tucdn.wpon.cn/api-girl/index.php?wpon=url')
    if girlvideo.status_code == 200:
        logger.info("send_girlvideo result is %s", girlvideo.text)
        r = requests.get("http:" + girlvideo.text, allow_redirects=True)
        open('girlvideo.mp4', 'wb').write(r.content)
        await update.message.reply_video("girlvideo.mp4")
    else:
        logger.info("error:send_girlvideo status_code result is %s",
                    girlvideo.status_code)


async def send_girlpicture(update: Update,
                           context: ContextTypes.DEFAULT_TYPE) -> None:
    """Send a girlpicture when the command /girlpicture is issued."""
    girlpicture = requests.get(
        'https://v.api.aa1.cn/api/pc-girl_bz/index.php?wpon=ro38d57y8rhuwur3788y3rd'
    )
    if girlpicture.status_code == 200:
        logger.info("girlpicture status_code result is %s",
                    girlpicture.status_code)
        await update.message.reply_photo(girlpicture.content)
    else:
        logger.info("error:girlpicture status_code result is %s",
                    girlpicture.status_code)


async def send_baisi(update: Update,
                     context: ContextTypes.DEFAULT_TYPE) -> None:
    """Send a girlpicture when the command /girlpicture is issued."""
    baisi = requests.get('https://v2.api-m.com/api/baisi?return=302')
    if baisi.status_code == 200:
        logger.info("baisi status_code result is %s", baisi.status_code)
        await update.message.reply_photo(baisi.content)
    else:
        logger.info("error:baisi status_code result is %s", baisi.status_code)


async def send_onemessage(update: Update,
                          context: ContextTypes.DEFAULT_TYPE) -> None:
    """Send a onemessage when the command /onemessage is issued."""
    onemessage = requests.get('https://v.api.aa1.cn/api/yiyan/index.php')
    if onemessage.status_code == 200:
        logger.info("onemessage result is %s",
                    onemessage.text.strip('<p>').strip('</p>'))
        await update.message.reply_text(onemessage.text.strip('<p>').strip('</p>'))
    else:
        logger.info("error:onemessage status_code result is %s",
                    onemessage.status_code)


async def send_zhananmessage(update: Update,
                             context: ContextTypes.DEFAULT_TYPE) -> None:
    """Send a zhananmessage when the command /zhananmessage is issued."""
    zhananmessage = requests.get('https://api.pearktrue.cn/api/random/zhanan/')
    if zhananmessage.status_code == 200:
        logger.info("zhananmessage result is %s", zhananmessage.json()['text'])
        await update.message.reply_text(zhananmessage.json()['text'])
    else:
        logger.info("error:zhananmessage status_code result is %s",
                    zhananmessage.status_code)


async def photo(update: Update, context: ContextTypes.DEFAULT_TYPE) -> int:
    """Stores the photo and asks for a location."""
    # user = update.message.from_user
    photo_file = await update.message.photo[-1].get_file()
    await photo_file.download_to_drive("user_photo.jpg")
    OCR_result = send_OCR(get_token(), filename="user_photo.jpg")
    # logger.info("Photo of %s: %s", user.first_name, "user_photo.jpg")
    logger.info("OCR result is %s", OCR_result)
    await update.message.reply_text(OCR_result)


def get_token():
    url = "https://aip.baidubce.com/oauth/2.0/token?client_id=zFKiqkkhOmNCBf9Da8ynR2bb&client_secret=HpREr6aYw5n0V8H630V3fXBHSnaSxn1G&grant_type=client_credentials"
    payload = json.dumps("")
    headers = {'Content-Type': 'application/json', 'Accept': 'application/json'}
    response = requests.request("POST", url, headers=headers, data=payload)
    return response.json()['access_token']


def send_OCR(token, filename):
    '''
      通用文字识别（高精度版）
      '''
    request_url = "https://aip.baidubce.com/rest/2.0/ocr/v1/accurate_basic"
    # 二进制方式打开图片文件
    f = open(filename, 'rb')
    img = base64.b64encode(f.read())

    params = {"image": img}
    access_token = token
    request_url = request_url + "?access_token=" + access_token
    headers = {'content-type': 'application/x-www-form-urlencoded'}
    response = requests.post(request_url, data=params, headers=headers)
    words = []
    if response:
        for dit in response.json()['words_result']:
            words.append(dit['words'])
    return ''.join(words)


async def make_kelivoice(update: Update, context: CallbackContext):
    """Send a kelivoice when the command /kelivoice is issued."""
    voice_url = f'https://api.pearktrue.cn/api/genshinimpactaudio/?text={update.message.text.split(" ")[-1]}&speaker=可莉'
    logger.info("kelivoice url is %s", voice_url)
    kelivoice = requests.get(voice_url)
    if kelivoice.status_code == 200:
        logger.info("kelivoice result url is %s", kelivoice.json()['audiourl'])
        r = requests.get(kelivoice.json()['audiourl'],
                         allow_redirects=True)
        open('kelivoice.mp3', 'wb').write(r.content)
        await update.message.reply_voice(voice="kelivoice.mp3")
    else:
        logger.info("error:kelivoice status_code result is %s",
                    kelivoice.status_code)


async def help_command(update: Update,
                       context: ContextTypes.DEFAULT_TYPE) -> None:
    """Send a message when the command /help is issued."""
    await update.message.reply_text("Help!")


def main() -> None:
    """Run the bot."""
    TOKEN = "5977429934:AAFGn2VQWpkl8-RIi4EWoWKk3oh3GArzmGA"
    # Create the Application and pass it your bot's token.
    application = Application.builder().token(TOKEN).build()
    application.add_handler(CommandHandler("start", start))
    application.add_handler(MessageHandler(filters.PHOTO, photo))
    application.add_handler(CommandHandler("girlvideo", send_girlvideo))
    application.add_handler(CommandHandler("girlpicture", send_girlpicture))
    application.add_handler(CommandHandler("baisi", send_baisi))
    application.add_handler(CommandHandler("onemessage", send_onemessage))
    application.add_handler(CommandHandler("zhananmessage", send_zhananmessage))
    application.add_handler(CommandHandler("kelivoice", make_kelivoice))
    application.add_handler(CommandHandler("help", help_command))
    # Run the bot until the user presses Ctrl-C
    application.run_polling(allowed_updates=Update.ALL_TYPES)


if __name__ == "__main__":
    main()
