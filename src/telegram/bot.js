import { Telegraf } from "telegraf";
import config from "../config.js";

const rpa_bot = new Telegraf(config.token)

export const chat_id = '-4780034676'//chat Mtto_LD

rpa_bot.launch()

export default rpa_bot 