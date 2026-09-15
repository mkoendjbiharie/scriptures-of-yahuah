#!/usr/bin/env python3
"""
Generate comprehensive biblical people/names data using Claude Haiku
and import into Supabase `people` table.

Usage:
  python scripts/generate_names.py              # all
  python scripts/generate_names.py --resume     # skip existing slugs
  python scripts/generate_names.py --category prophet
"""
import os, sys, time, json, re, argparse
from pathlib import Path
from dotenv import load_dotenv

ROOT = Path(__file__).parent.parent
load_dotenv(ROOT / ".env.local")

import anthropic
from supabase import create_client

sb     = create_client(os.environ["NEXT_PUBLIC_SUPABASE_URL"], os.environ["SUPABASE_SERVICE_ROLE_KEY"])
claude = anthropic.Anthropic(api_key=os.environ["ANTHROPIC_API_KEY"])

# ── Master list ──────────────────────────────────────────────────────────────
# (slug, restored_name, hebrew, english, category, testament, first_mention)
PEOPLE = [
  # ── DIVINE / ANGELIC ──────────────────────────────────────────────────────
  ("mikael","Mikael","מִיכָאֵל","Michael","angel","both","Daniyel 10:13"),
  ("gabrael","Gaḇra'el","גַּבְרִיאֵל","Gabriel","angel","both","Daniyel 8:16"),
  ("shatan","Shatan","שָׂטָן","Satan/Adversary","angel","both","Iyob 1:6"),
  ("abaddon","Aḇaddon","אֲבַדּוֹן","Abaddon/Apollyon","angel","both","Iyob 26:6"),

  # ── PRE-FLOOD ─────────────────────────────────────────────────────────────
  ("adam","Aḏam","אָדָם","Adam","patriarch","old","Bereshit 1:26"),
  ("hawwah","Ḥawwah","חַוָּה","Eve","matriarch","old","Bereshit 3:20"),
  ("qayin","Qayin","קַיִן","Cain","other","old","Bereshit 4:1"),
  ("hebel","Heḇel","הֶבֶל","Abel","other","old","Bereshit 4:2"),
  ("sheth","Sheth","שֵׁת","Seth","patriarch","old","Bereshit 4:25"),
  ("enosh","Enosh","אֱנוֹשׁ","Enosh","patriarch","old","Bereshit 4:26"),
  ("qeynan","Qeynan","קֵינָן","Kenan","patriarch","old","Bereshit 5:9"),
  ("mahalal-el","Mahalalel","מַהֲלַלְאֵל","Mahalalel","patriarch","old","Bereshit 5:12"),
  ("yered","Yered","יֶרֶד","Jared","patriarch","old","Bereshit 5:15"),
  ("hanok","Ḥanok","חֲנוֹךְ","Enoch","patriarch","both","Bereshit 5:18"),
  ("methushelah","Methushelah","מְתוּשֶׁלַח","Methuselah","patriarch","old","Bereshit 5:21"),
  ("lemek","Lemek","לֶמֶךְ","Lamech","patriarch","old","Bereshit 5:25"),
  ("noah","Noaḥ","נֹחַ","Noah","patriarch","both","Bereshit 5:29"),
  ("shem","Shĕm","שֵׁם","Shem","patriarch","old","Bereshit 5:32"),
  ("ham","Ham","חָם","Ham","patriarch","old","Bereshit 5:32"),
  ("yapheth","Yapheth","יֶפֶת","Japheth","patriarch","old","Bereshit 5:32"),
  ("nimrod","Nimrod","נִמְרוֹד","Nimrod","king","old","Bereshit 10:8"),

  # ── PATRIARCHS & MATRIARCHS ───────────────────────────────────────────────
  ("abram","Aḇraham","אַבְרָהָם","Abraham","patriarch","both","Bereshit 11:26"),
  ("sarah","Sārāh","שָׂרָה","Sarah","matriarch","both","Bereshit 11:29"),
  ("lot","Lot","לוֹט","Lot","patriarch","old","Bereshit 11:27"),
  ("hagar","Hagar","הָגָר","Hagar","matriarch","old","Bereshit 16:1"),
  ("yishmael","Yishmael","יִשְׁמָעֵאל","Ishmael","patriarch","old","Bereshit 16:11"),
  ("yitshaq","Yitsḥaq","יִצְחָק","Isaac","patriarch","both","Bereshit 17:19"),
  ("ribqah","Riḇqah","רִבְקָה","Rebekah","matriarch","old","Bereshit 22:23"),
  ("esav","Esav","עֵשָׂו","Esau","patriarch","old","Bereshit 25:25"),
  ("yaaqob","Ya'aqoḇ","יַעֲקֹב","Jacob / Israel","patriarch","both","Bereshit 25:26"),
  ("rachel","Raḥel","רָחֵל","Rachel","matriarch","old","Bereshit 29:6"),
  ("leah","Leah","לֵאָה","Leah","matriarch","old","Bereshit 29:16"),
  ("bilhah","Bilhah","בִּלְהָה","Bilhah","matriarch","old","Bereshit 29:29"),
  ("zilpah","Zilpah","זִלְפָּה","Zilpah","matriarch","old","Bereshit 29:24"),
  ("reuben","Re'uḇĕn","רְאוּבֵן","Reuben","patriarch","old","Bereshit 29:32"),
  ("shimon","Shim'on","שִׁמְעוֹן","Simeon","patriarch","old","Bereshit 29:33"),
  ("lewi","Lĕwi","לֵוִי","Levi","patriarch","old","Bereshit 29:34"),
  ("yahudah-son","Yehudah","יְהוּדָה","Judah","patriarch","old","Bereshit 29:35"),
  ("dan-son","Dan","דָּן","Dan","patriarch","old","Bereshit 30:6"),
  ("naphtali","Naphtali","נַפְתָּלִי","Naphtali","patriarch","old","Bereshit 30:8"),
  ("gad","Gad","גָּד","Gad","patriarch","old","Bereshit 30:11"),
  ("asher","Asher","אָשֵׁר","Asher","patriarch","old","Bereshit 30:13"),
  ("yissaskar","Yissaskar","יִשָּׂשכָר","Issachar","patriarch","old","Bereshit 30:18"),
  ("zebulun","Zeḇulun","זְבוּלֻן","Zebulun","patriarch","old","Bereshit 30:20"),
  ("dinah","Dinah","דִּינָה","Dinah","other","old","Bereshit 30:21"),
  ("yoseph","Yosĕph","יוֹסֵף","Joseph","patriarch","old","Bereshit 30:24"),
  ("binyamin","Binyamin","בִּנְיָמִן","Benjamin","patriarch","old","Bereshit 35:18"),
  ("tamar","Tamar","תָּמָר","Tamar","matriarch","old","Bereshit 38:6"),
  ("perets","Perets","פֶּרֶץ","Perez","patriarch","old","Bereshit 38:29"),
  ("melkitsedek","Melkitsedek","מַלְכִּי־צֶדֶק","Melchizedek — king-priest of Salem; type of Yahusha","priest","both","Bereshit 14:18"),

  # ── EGYPT & EXODUS ────────────────────────────────────────────────────────
  ("mosheh","Mosheh","מֹשֶׁה","Moses","prophet","both","Shemoth 2:10"),
  ("aharon","Aharon","אַהֲרֹן","Aaron","priest","old","Shemoth 4:14"),
  ("miryam","Miryam","מִרְיָם","Miriam","prophetess","both","Shemoth 15:20"),
  ("yokheved","Yokheḇed","יוֹכֶבֶד","Jochebed","matriarch","old","Shemoth 6:20"),
  ("amram","Amram","עַמְרָם","Amram","patriarch","old","Shemoth 6:18"),
  ("yithro","Yithro","יִתְרוֹ","Jethro","other","old","Shemoth 3:1"),
  ("tsipporah","Tsipporah","צִפֹּרָה","Zipporah","matriarch","old","Shemoth 2:21"),
  ("pharaoh","Paroh","פַּרְעֹה","Pharaoh","king","old","Bereshit 12:15"),
  ("potiphar","Potiphar","פּוֹטִיפַר","Potiphar","other","old","Bereshit 37:36"),
  ("asnat","Asnat","אָסְנַת","Asenath","matriarch","old","Bereshit 41:45"),
  ("menashsheh","Menashsheh","מְנַשֶּׁה","Manasseh","patriarch","old","Bereshit 41:51"),
  ("ephrayim","Ephrayim","אֶפְרָיִם","Ephraim","patriarch","old","Bereshit 41:52"),
  ("rahab","Raḥaḇ","רָחָב","Rahab","other","old","Yahusha 2:1"),
  ("yahusha-nun","Yahusha bin Nun","יְהוֹשֻׁעַ","Joshua (son of Nun)","warrior","old","Shemoth 17:9"),
  ("qaleb","Qaleḇ","כָּלֵב","Caleb","warrior","old","Bemidbar 13:6"),
  ("pinehas","Pineḥas","פִּינְחָס","Phinehas","priest","old","Shemoth 6:25"),
  ("eleazar","El'azar","אֶלְעָזָר","Eleazar","priest","old","Shemoth 6:23"),
  ("balaam","Bil'am","בִּלְעָם","Balaam","prophet","old","Bemidbar 22:5"),
  ("balaq","Balaq","בָּלָק","Balak","king","old","Bemidbar 22:2"),

  # ── JUDGES ────────────────────────────────────────────────────────────────
  ("othniel","Othniel","עָתְנִיאֵל","Othniel","judge","old","Shophetim 3:9"),
  ("ehud","Ehud","אֵהוּד","Ehud","judge","old","Shophetim 3:15"),
  ("shamgar","Shamgar","שַׁמְגַּר","Shamgar","judge","old","Shophetim 3:31"),
  ("devorah","Deḇorah","דְּבוֹרָה","Deborah","prophetess","old","Shophetim 4:4"),
  ("barak","Baraq","בָּרָק","Barak","judge","old","Shophetim 4:6"),
  ("yael","Ya'el","יָעֵל","Jael","other","old","Shophetim 4:17"),
  ("gideon","Gid'on","גִּדְעוֹן","Gideon","judge","old","Shophetim 6:11"),
  ("avimelekh","Aḇimelekh","אֲבִימֶלֶךְ","Abimelech","king","old","Shophetim 8:31"),
  ("yiphtah","Yiphtaḥ","יִפְתָּח","Jephthah","judge","old","Shophetim 11:1"),
  ("shimshon","Shimshon","שִׁמְשׁוֹן","Samson","judge","old","Shophetim 13:24"),
  ("delilah","Delilah","דְּלִילָה","Delilah","other","old","Shophetim 16:4"),
  ("ruth","Rut","רוּת","Ruth","other","both","Rut 1:4"),
  ("naomi","Na'omi","נָעֳמִי","Naomi","other","old","Rut 1:2"),
  ("boaz","Boaz","בֹּעַז","Boaz","other","both","Rut 2:1"),
  ("eli","Eli","עֵלִי","Eli","priest","old","Shemuel A 1:3"),
  ("shemuel","Shemuel","שְׁמוּאֵל","Samuel","prophet","old","Shemuel A 1:20"),
  ("hannah","Hannah","חַנָּה","Hannah","other","both","Shemuel A 1:2"),

  # ── UNITED KINGDOM ────────────────────────────────────────────────────────
  ("shaul-king","Sha'ul","שָׁאוּל","Saul (king)","king","old","Shemuel A 9:2"),
  ("yonathan","Yonathan","יוֹנָתָן","Jonathan","warrior","old","Shemuel A 13:2"),
  ("dawid","Dawid","דָּוִד","David","king","both","Shemuel A 16:13"),
  ("avigayil","Aḇigayil","אֲבִיגַיִל","Abigail","matriarch","old","Shemuel A 25:3"),
  ("avner","Aḇner","אַבְנֵר","Abner","warrior","old","Shemuel A 14:50"),
  ("yoav","Yo'aḇ","יוֹאָב","Joab","warrior","old","Shemuel A 26:6"),
  ("bathsheva","Bathsheḇa","בַּת־שֶׁבַע","Bathsheba","matriarch","old","Shemuel B 11:3"),
  ("uriyah","Uriyah","אוּרִיָּה","Uriah","warrior","old","Shemuel B 11:3"),
  ("avshalom","Aḇshalom","אַבְשָׁלוֹם","Absalom","other","old","Shemuel B 3:3"),
  ("natan","Natan","נָתָן","Nathan (prophet)","prophet","old","Shemuel B 7:2"),
  ("shelomoh","Shelomoh","שְׁלֹמֹה","Solomon","king","both","Shemuel B 12:24"),
  ("hiram","Hiram","חִירָם","Hiram of Tyre","king","old","Shemuel B 5:11"),
  ("tsadoq","Tsadoq","צָדוֹק","Zadok","priest","old","Shemuel B 8:17"),
  ("benayahu","Benayahu","בְּנָיָהוּ","Benaiah","warrior","old","Shemuel B 8:18"),

  # ── DIVIDED KINGDOM — ISRAEL ──────────────────────────────────────────────
  ("yarovam","Yaroḇ'am","יָרָבְעָם","Jeroboam I","king","old","Melakim A 11:26"),
  ("omri","Omri","עָמְרִי","Omri","king","old","Melakim A 16:16"),
  ("ahav","Aḥaḇ","אַחְאָב","Ahab","king","old","Melakim A 16:29"),
  ("izevel","Izeḇel","אִיזֶבֶל","Jezebel","queen","old","Melakim A 16:31"),
  ("eliyahu","EliYahu","אֵלִיָּהוּ","Elijah","prophet","both","Melakim A 17:1"),
  ("elisha","Elisha","אֱלִישָׁע","Elisha","prophet","old","Melakim A 19:16"),
  ("yehu","Yehu","יֵהוּא","Jehu","king","old","Melakim B 9:2"),
  ("naaman","Na'aman","נַעֲמָן","Naaman","warrior","old","Melakim B 5:1"),
  ("gehazi","Geḥazi","גֵּיחֲזִי","Gehazi","servant","old","Melakim B 4:12"),

  # ── DIVIDED KINGDOM — YAHUDAH ─────────────────────────────────────────────
  ("rehavam","Reḥaḇ'am","רְחַבְעָם","Rehoboam","king","old","Melakim A 11:43"),
  ("asa","Asa","אָסָא","Asa","king","old","Melakim A 15:9"),
  ("yehoshaphat","Yehoshaphat","יְהוֹשָׁפָט","Jehoshaphat","king","old","Melakim A 22:41"),
  ("hizkiyahu","Ḥizqiyahu","חִזְקִיָּהוּ","Hezekiah","king","old","Melakim B 18:1"),
  ("yeshayahu","YeshaYahu","יְשַׁעְיָהוּ","Isaiah","prophet","both","YeshaYahu 1:1"),
  ("menashsheh-king","Menashsheh (king)","מְנַשֶּׁה","Manasseh (king)","king","old","Melakim B 21:1"),
  ("yoshiyahu","Yoshiyahu","יֹאשִׁיָּהוּ","Josiah","king","old","Melakim B 22:1"),
  ("yirmeyahu","YirmeYahu","יִרְמְיָהוּ","Jeremiah","prophet","old","YirmeYahu 1:1"),
  ("hilqiyahu","Ḥilqiyahu","חִלְקִיָּהוּ","Hilkiah","priest","old","Melakim B 22:8"),
  ("tsidqiyahu","Tsidqiyahu","צִדְקִיָּהוּ","Zedekiah","king","old","Melakim B 24:17"),
  ("baruk","Baruk","בָּרוּךְ","Baruch","servant","old","YirmeYahu 32:12"),
  ("nebukadnetsar","Neḇukadnetstsar","נְבוּכַדְנֶאצַּר","Nebuchadnezzar","king","old","Melakim B 24:1"),

  # ── EXILE & RETURN ────────────────────────────────────────────────────────
  ("yehezqel","Yehezqel","יְחֶזְקֵאל","Ezekiel","prophet","old","Yehezqel 1:3"),
  ("daniyel","Daniyel","דָּנִיֵּאל","Daniel","prophet","both","Daniyel 1:6"),
  ("hananyah","Ḥananyah","חֲנַנְיָה","Hananiah (Shadrach)","other","old","Daniyel 1:6"),
  ("mishael","Misha'el","מִישָׁאֵל","Mishael (Meshach)","other","old","Daniyel 1:6"),
  ("azaryah","Azaryah","עֲזַרְיָה","Azariah (Abednego)","other","old","Daniyel 1:6"),
  ("koresh","Koresh","כּוֹרֶשׁ","Cyrus (the Great)","king","old","Dibre B 36:22"),
  ("daryavesh","Daryavesh","דָּרְיָוֶשׁ","Darius","king","old","Daniyel 5:31"),
  ("zerubbavel","Zerubbavel","זְרֻבָּבֶל","Zerubbabel","other","old","Ezra 2:2"),
  ("ezra","Ezra","עֶזְרָא","Ezra","priest","old","Ezra 7:1"),
  ("nehemyah","Nehemyah","נְחֶמְיָה","Nehemiah","other","old","Nehemyah 1:1"),
  ("ester","Ester","אֶסְתֵּר","Esther","queen","old","Ester 2:7"),
  ("mordekay","Mordekay","מָרְדֳּכַי","Mordecai","other","old","Ester 2:5"),
  ("haman","Haman","הָמָן","Haman","other","old","Ester 3:1"),
  ("sanvalat","Sanḇallat","סַנְבַלַּט","Sanballat","other","old","Nehemyah 2:10"),
  ("yeshua-hp","Yeshua (high priest)","יֵשׁוּעַ","Joshua (high priest)","priest","old","Ezra 2:2"),

  # ── MINOR PROPHETS ────────────────────────────────────────────────────────
  ("hoshea","Hoshea","הוֹשֵׁעַ","Hosea","prophet","old","Hoshea 1:1"),
  ("yoel","Yoel","יוֹאֵל","Joel","prophet","old","Yoel 1:1"),
  ("amos","Amos","עָמוֹס","Amos","prophet","old","Amos 1:1"),
  ("obadyah","Oḇadyah","עֹבַדְיָה","Obadiah","prophet","old","Oḇadyah 1:1"),
  ("yonah","Yonah","יוֹנָה","Jonah","prophet","both","Yonah 1:1"),
  ("mikah-prophet","Mikah","מִיכָה","Micah","prophet","old","Mikah 1:1"),
  ("nachum","Nachum","נַחוּם","Nahum","prophet","old","Nachum 1:1"),
  ("habaqquq","Ḥabaqquq","חֲבַקּוּק","Habakkuk","prophet","old","Ḥabaqquq 1:1"),
  ("tsephanyah","Tsephanyah","צְפַנְיָה","Zephaniah","prophet","old","Tsephanyah 1:1"),
  ("chaggai","Ḥaggai","חַגַּי","Haggai","prophet","old","Ḥaggai 1:1"),
  ("zekaryah","ZekarYah","זְכַרְיָה","Zechariah","prophet","both","ZekarYah 1:1"),
  ("malaki","Malaki","מַלְאָכִי","Malachi","prophet","old","Malaki 1:1"),

  # ── NEW COVENANT — LIFE OF YAHUSHA ────────────────────────────────────────
  ("yahuah","𐤉𐤄𐤅𐤄","𐤉𐤄𐤅𐤄","Yahuah — The Most High","divine","both","Bereshit 2:4"),
  ("ruach-haqodesh","Ruaḥ ha'Qodesh","רוּחַ הַקֹּדֶשׁ","The Set-Apart Spirit","divine","both","Bereshit 1:2"),
  ("yahusha-messiah","Yahusha","יְהוֹשֻׁעַ","Yahusha the Messiah","divine","both","MattithYahu 1:1"),
  ("el-shaddai","El Shaddai","אֵל שַׁדַּי","El Shaddai — the Almighty","divine","old","Bereshit 17:1"),
  ("aluahim","Aluahim","אֱלֹהִים","Aluahim — title of the Creator","divine","both","Bereshit 1:1"),
  ("miryam-mother","Miryam (mother)","מִרְיָם","Mary (mother of Yahusha)","matriarch","new","Luqas 1:27"),
  ("yoseph-husband","Yoseph (husband)","יוֹסֵף","Joseph (husband of Mary)","other","new","MattithYahu 1:16"),
  ("yahuchanan-immerser","Yahuchanan the Immerser","יוֹחָנָן","John the Baptist","prophet","new","MattithYahu 3:1"),
  ("zekharyah-priest","Zekharyah (priest)","זְכַרְיָה","Zacharias (priest)","priest","new","Luqas 1:5"),
  ("elisheva","Elisheva","אֱלִישֶׁבַע","Elizabeth","matriarch","new","Luqas 1:5"),
  ("herod","Herod","הוֹרְדוֹס","Herod the Great","king","new","MattithYahu 2:1"),
  ("herod-antipas","Herod Antipas","הוֹרְדוֹס","Herod Antipas","king","new","MattithYahu 14:1"),
  ("pilate","Pilate","פִּילָטוֹס","Pontius Pilate","other","new","MattithYahu 27:2"),

  # ── APOSTLES ──────────────────────────────────────────────────────────────
  ("kepha","Kepha (Shim'on)","כֵּיפָא","Peter (Simon)","apostle","new","Yahuchanan 1:42"),
  ("andreas","Andreas","אַנְדְרֵאָס","Andrew","apostle","new","MattithYahu 4:18"),
  ("yaaqob-zebedee","Yaaqob (son of Zebedee)","יַעֲקֹב","James (son of Zebedee)","apostle","new","MattithYahu 4:21"),
  ("yahuchanan-apostle","Yahuchanan (apostle)","יוֹחָנָן","John (apostle)","apostle","new","MattithYahu 4:21"),
  ("philippos","Philippos","פִּילִיפּוֹס","Philip","apostle","new","Yahuchanan 1:43"),
  ("bartholomew","Bar-Talmai","בַּר־תַּלְמַי","Bartholomew/Nathanael","apostle","new","MattithYahu 10:3"),
  ("mattithyahu","MattithYahu","מַתִּתְיָהוּ","Matthew (Levi)","apostle","new","MattithYahu 9:9"),
  ("toma","Toma","תּוֹמָא","Thomas","apostle","new","Yahuchanan 11:16"),
  ("yaaqob-alphaeus","Yaaqob (son of Alphaeus)","יַעֲקֹב","James (son of Alphaeus)","apostle","new","MattithYahu 10:3"),
  ("thaddaeus","Taddai","תַּדַּי","Thaddaeus/Judas","apostle","new","MattithYahu 10:3"),
  ("shimon-zealot","Shim'on the Zealot","שִׁמְעוֹן","Simon the Zealot","apostle","new","MattithYahu 10:4"),
  ("yahudah-iscariot","Yahudah of Qerioth","יְהוּדָה","Judas Iscariot","apostle","new","MattithYahu 10:4"),
  ("matthias","Mattityah","מַתִּתְיָה","Matthias","apostle","new","Ma'aseh 1:23"),

  # ── KEY NEW COVENANT FIGURES ──────────────────────────────────────────────
  ("lazarus","El'azar (Lazarus)","אֶלְעָזָר","Lazarus","other","new","Yahuchanan 11:1"),
  ("martha","Martha","מַרְתָּא","Martha","other","new","Luqas 10:38"),
  ("miryam-magdalene","Miryam of Magdala","מִרְיָם","Mary Magdalene","disciple","new","Luqas 8:2"),
  ("nicodemus","Niqodimos","נִיקוֹדֵמוֹס","Nicodemus","other","new","Yahuchanan 3:1"),
  ("yoseph-arimathea","Yoseph of Arimathea","יוֹסֵף","Joseph of Arimathea","other","new","MattithYahu 27:57"),
  ("zakkay","Zakkay","זַכַּי","Zacchaeus","other","new","Luqas 19:2"),
  ("stephanos","Stephanos","סְטֶפָנוֹס","Stephen","deacon","new","Ma'aseh 6:5"),
  ("philippos-deacon","Philippos (deacon)","פִּילִיפּוֹס","Philip (deacon)","deacon","new","Ma'aseh 6:5"),
  ("cornelius","Cornelius","קוֹרְנֵלִיּוֹס","Cornelius","other","new","Ma'aseh 10:1"),
  ("barnabas","Bar-Naḇa","בַּר־נָבָא","Barnabas","apostle","new","Ma'aseh 4:36"),
  ("shaul-apostle","Sha'ul (Paulus)","שָׁאוּל","Paul (Saul of Tarsus)","apostle","new","Ma'aseh 7:58"),
  ("silas","Silas","סִילָס","Silas/Silvanus","disciple","new","Ma'aseh 15:22"),
  ("timotheus","Timotheus","טִימוֹתֵאוּס","Timothy","disciple","new","Ma'aseh 16:1"),
  ("titos","Titos","טִיטוֹס","Titus","disciple","new","Galatiyim 2:1"),
  ("luqas","Luqas","לוּקָס","Luke","disciple","new","Qolasim 4:14"),
  ("markos","Markos","מַרְקוֹס","Mark (John Mark)","disciple","new","Ma'aseh 12:12"),
  ("priscilla","Priscilla","פְּרִיסְקִילָּה","Priscilla","disciple","new","Ma'aseh 18:2"),
  ("aquilas","Aquilas","עֲקִילָס","Aquila","disciple","new","Ma'aseh 18:2"),
  ("apollos","Apollos","אַפּוֹלּוֹס","Apollos","disciple","new","Ma'aseh 18:24"),
  ("lydia","Lydia","לִידִיָּה","Lydia","disciple","new","Ma'aseh 16:14"),
  ("onesimos","Onesimos","אוֹנֵסִימוֹס","Onesimus","servant","new","Philemon 1:10"),
  ("epaphras","Epaphras","אֶפַפְרָס","Epaphras","disciple","new","Qolasim 1:7"),
]

# ── ADDITIONAL PEOPLE (appended) ──────────────────────────────────────────────
PEOPLE += [
  # ── MORE JUDGES ────────────────────────────────────────────────────────────
  ("tola","Tola","תּוֹלָע","Tola","judge","old","Shophetim 10:1"),
  ("yair","Ya'ir","יָאִיר","Jair","judge","old","Shophetim 10:3"),
  ("ibzan","Ibzan","אִבְצָן","Ibzan","judge","old","Shophetim 12:8"),
  ("elon","Elon","אֵילוֹן","Elon","judge","old","Shophetim 12:11"),
  ("abdon","Abdon","עַבְדּוֹן","Abdon","judge","old","Shophetim 12:13"),

  # ── MORE PROPHETESSES ──────────────────────────────────────────────────────
  ("huldah","Ḥuldah","חֻלְדָּה","Huldah","prophetess","old","Melakim B 22:14"),
  ("noadyah","No'adyah","נוֹעַדְיָה","Noadiah","prophetess","old","Nehemyah 6:14"),
  ("anna","Ḥannah (Anna)","חַנָּה","Anna (prophetess)","prophetess","new","Luqas 2:36"),
  ("daughters-philip","Daughters of Philippos","בְּנוֹת פִּילִיפּוֹס","Daughters of Philip","prophetess","new","Ma'aseh 21:9"),

  # ── KINGS OF ISRAEL (NORTHERN) ────────────────────────────────────────────
  ("nadab","Nadaḇ","נָדָב","Nadab","king","old","Melakim A 15:25"),
  ("baasha","Ba'sha","בַּעְשָׁא","Baasha","king","old","Melakim A 15:27"),
  ("elah","Elah","אֵלָה","Elah","king","old","Melakim A 16:8"),
  ("zimri","Zimri","זִמְרִי","Zimri","king","old","Melakim A 16:9"),
  ("tivni","Tiḇni","תִּבְנִי","Tibni","king","old","Melakim A 16:21"),
  ("ahaziah-israel","Ahaziyah (Yisrael)","אֲחַזְיָה","Ahaziah (king of Israel)","king","old","Melakim A 22:40"),
  ("yehoram-israel","Yehoram (Yisrael)","יְהוֹרָם","Jehoram (king of Israel)","king","old","Melakim B 1:17"),
  ("yehoahaz-israel","Yehoahaz (Yisrael)","יְהוֹאָחָז","Jehoahaz (king of Israel)","king","old","Melakim B 10:35"),
  ("yehoash-israel","Yehoash (Yisrael)","יְהוֹאָשׁ","Jehoash (king of Israel)","king","old","Melakim B 13:10"),
  ("yarovam-ii","Yaroḇ'am II","יָרָבְעָם","Jeroboam II","king","old","Melakim B 14:23"),
  ("zekharyah-israel","Zekharyah (Yisrael)","זְכַרְיָה","Zechariah (king of Israel)","king","old","Melakim B 14:29"),
  ("shallum-king","Shallum","שַׁלּוּם","Shallum","king","old","Melakim B 15:10"),
  ("menahem-king","Menahem","מְנַחֵם","Menahem","king","old","Melakim B 15:14"),
  ("peqahyah","Peqaḥyah","פְּקַחְיָה","Pekahiah","king","old","Melakim B 15:23"),
  ("peqah","Peqaḥ","פֶּקַח","Pekah","king","old","Melakim B 15:25"),
  ("hoshea-king","Hoshea (king)","הוֹשֵׁעַ","Hoshea (last king of Israel)","king","old","Melakim B 15:30"),

  # ── KINGS OF YAHUDAH (SOUTHERN) ───────────────────────────────────────────
  ("aviyah","Aḇiyah","אֲבִיָּה","Abijah","king","old","Melakim A 14:31"),
  ("yehoram-judah","Yehoram (Yahudah)","יְהוֹרָם","Jehoram (king of Judah)","king","old","Melakim B 8:16"),
  ("ahaziyah-judah","Ahaziyah (Yahudah)","אֲחַזְיָה","Ahaziah (king of Judah)","king","old","Melakim B 8:25"),
  ("atalyah","Atalyah","עֲתַלְיָה","Athaliah (queen)","queen","old","Melakim B 11:1"),
  ("yoash-judah","Yo'ash (Yahudah)","יוֹאָשׁ","Joash (king of Judah)","king","old","Melakim B 11:2"),
  ("amaziyah","Amaziyah","אֲמַצְיָה","Amaziah","king","old","Melakim B 14:1"),
  ("uzziyah","Uzziyah","עֻזִּיָּה","Uzziah/Azariah","king","old","Melakim B 15:1"),
  ("yotham","Yotham","יוֹתָם","Jotham","king","old","Melakim B 15:32"),
  ("ahaz","Ahaz","אָחָז","Ahaz","king","old","Melakim B 16:1"),
  ("amon-judah","Amon","אָמוֹן","Amon","king","old","Melakim B 21:18"),
  ("yehoahaz-judah","Yehoahaz (Yahudah)","יְהוֹאָחָז","Jehoahaz (king of Judah)","king","old","Melakim B 23:31"),
  ("yehoyaqim","Yehoyaqim","יְהוֹיָקִים","Jehoiakim","king","old","Melakim B 23:34"),
  ("yehoyakin","Yehoyakin","יְהוֹיָכִין","Jehoiachin","king","old","Melakim B 24:6"),

  # ── DAVID'S MIGHTY MEN ────────────────────────────────────────────────────
  ("adino","Yosheḇ-Bassheḇeth","יֹשֵׁב בַּשֶּׁבֶת","Josheb-Basshebeth (Adino)","warrior","old","Shemuel B 23:8"),
  ("eleazar-mighty","El'azar ben Dodo","אֶלְעָזָר","Eleazar (David's mighty man)","warrior","old","Shemuel B 23:9"),
  ("shammah","Shammah ben Ageh","שַׁמָּה","Shammah (David's mighty man)","warrior","old","Shemuel B 23:11"),
  ("avishai","Aḇishai","אֲבִישַׁי","Abishai","warrior","old","Shemuel B 23:18"),
  ("asahel","Asahel","עֲשָׂהאֵל","Asahel","warrior","old","Shemuel B 2:18"),
  ("ittai","Ittai","אִתַּי","Ittai the Gittite","warrior","old","Shemuel B 15:19"),
  ("hushai","Ḥushai","חוּשַׁי","Hushai the Archite","servant","old","Shemuel B 15:32"),

  # ── MORE PRIESTS & SERVANTS ───────────────────────────────────────────────
  ("eliashib","Elyashib","אֶלְיָשִׁיב","Eliashib (high priest)","priest","old","Nehemyah 3:1"),
  ("uriyah-priest","Uriyah (priest)","אוּרִיָּה","Uriah (the priest)","priest","old","Melakim B 16:10"),
  ("yehoyada","Yehoyada","יְהוֹיָדָע","Jehoiada","priest","old","Melakim B 11:4"),
  ("obadyah-servant","Oḇadyah (servant)","עֹבַדְיָה","Obadiah (Ahab's servant)","servant","old","Melakim A 18:3"),
  ("doeg","Do'eg","דּוֹאֵג","Doeg the Edomite","other","old","Shemuel A 21:7"),
  ("ahithophel","Aḥithophel","אֲחִיתֹפֶל","Ahithophel","other","old","Shemuel B 15:12"),

  # ── WOMEN OF SCRIPTURE ─────────────────────────────────────────────────────
  ("deborah-nurse","Deḇorah (nurse)","דְּבוֹרָה","Deborah (Rebekah's nurse)","servant","old","Bereshit 35:8"),
  ("abigail-sister","Aḇigayil (sister)","אֲבִיגַיִל","Abigail (David's sister)","other","old","Dibre A 2:16"),
  ("merav","Meraḇ","מֵרַב","Merab (Saul's daughter)","other","old","Shemuel A 14:49"),
  ("mikhal","Mikhal","מִיכַל","Michal (Saul's daughter)","other","old","Shemuel A 14:49"),
  ("avishag","Aḇishag","אֲבִישַׁג","Abishag the Shunammite","other","old","Melakim A 1:3"),
  ("shulamit","Shulamit","שׁוּלַמִּית","The Shulamite (Song of Songs)","other","old","Shir 6:13"),
  ("rizpah","Ritspa","רִצְפָּה","Rizpah (Saul's concubine)","other","old","Shemuel B 3:7"),

  # ── WISDOM FIGURES ────────────────────────────────────────────────────────
  ("iyob","Iyoḇ","אִיּוֹב","Job","other","old","Iyoḇ 1:1"),
  ("eliphaz","Eliphaz","אֱלִיפַז","Eliphaz (Job's friend)","other","old","Iyoḇ 2:11"),
  ("bildad","Bildad","בִּלְדַּד","Bildad the Shuhite","other","old","Iyoḇ 2:11"),
  ("tsophar","Tsophar","צוֹפַר","Zophar the Naamathite","other","old","Iyoḇ 2:11"),
  ("elihu","Elihu","אֱלִיהוּ","Elihu ben Barachel","other","old","Iyoḇ 32:2"),
  ("agur","Agur","אָגוּר","Agur son of Jakeh","other","old","Mishle 30:1"),
  ("lemuel","Lemuel","לְמוּאֵל","King Lemuel","king","old","Mishle 31:1"),

  # ── MORE NEW COVENANT FIGURES ─────────────────────────────────────────────
  ("miryam-clopas","Miryam of Qlopas","מִרְיָם","Mary of Clopas","disciple","new","Yahuchanan 19:25"),
  ("salome","Shalomit","שָׁלוֹמִית","Salome (mother of James & John)","disciple","new","MattithYahu 27:56"),
  ("yoseph-barsabbas","Yoseph Barsabba","יוֹסֵף","Joseph Barsabbas","other","new","Ma'aseh 1:23"),
  ("ananias-high","Ḥananyah (kohen gadol)","חֲנַנְיָה","Ananias (high priest)","priest","new","Ma'aseh 23:2"),
  ("gamaliel","Gamliel","גַּמְלִיאֵל","Gamaliel","other","new","Ma'aseh 5:34"),
  ("agrippa","Agrippa","אַגְרִיפָּס","Herod Agrippa I","king","new","Ma'aseh 12:1"),
  ("agrippa-ii","Agrippa II","אַגְרִיפָּס","Herod Agrippa II","king","new","Ma'aseh 25:13"),
  ("bernice","Bernice","בֶּרְנִיקֵי","Bernice","queen","new","Ma'aseh 25:13"),
  ("drusilla","Drusilla","דְּרוּסִילָּה","Drusilla","other","new","Ma'aseh 24:24"),
  ("felix","Felix","פֵּלִיקְס","Felix (governor)","other","new","Ma'aseh 23:24"),
  ("festus","Festus","פֵּסְטוֹס","Festus (governor)","other","new","Ma'aseh 24:27"),
  ("eutychus","Eutychos","אֶוטוּכוֹס","Eutychus","other","new","Ma'aseh 20:9"),
  ("phoebe","Phoiḇe","פוֹיבֵה","Phoebe","deacon","new","Romiim 16:1"),
  ("junia","Yunia","יוּנִיָּה","Junia","apostle","new","Romiim 16:7"),
  ("andronicus","Andronicos","אַנְדְּרוֹנִיקוֹס","Andronicus","apostle","new","Romiim 16:7"),
  ("sosthenes","Sosthenes","סוֹסְתֵּנֵס","Sosthenes","disciple","new","Qorintim A 1:1"),
  ("tychicus","Tychicos","טוּכִיקוֹס","Tychicus","disciple","new","Ephesim 6:21"),
  ("epaphroditus","Epaphroditos","אֶפַפְרוֹדִיטוֹס","Epaphroditus","disciple","new","Philippim 4:18"),
  ("demas","Demas","דֵּמָס","Demas","disciple","new","Qolasim 4:14"),
  ("nympha","Nympha","נוּמְפָּא","Nympha","disciple","new","Qolasim 4:15"),
  ("archippus","Archippos","אַרְכִּיפּוֹס","Archippus","disciple","new","Qolasim 4:17"),
  ("lois","Lois","לוֹאִיס","Lois (Timothy's grandmother)","disciple","new","Timotheus B 1:5"),
  ("eunice","Eunice","אֶונִיקֵה","Eunice (Timothy's mother)","disciple","new","Timotheus B 1:5"),
  ("artemas","Artemas","אַרְטֵמָס","Artemas","disciple","new","Titos 3:12"),
  ("zenas","Zenas","זֵינָס","Zenas the lawyer","disciple","new","Titos 3:13"),
  ("philemon","Philemon","פִּילֵמוֹן","Philemon","disciple","new","Philemon 1:1"),
  ("apphia","Apphia","אַפְפִיָּה","Apphia","disciple","new","Philemon 1:2"),
  ("diotrephes","Diotrephos","דִּיוֹטְרֶפֵס","Diotrephes","other","new","Yahuchanan G 1:9"),
  ("demetrius","Demetrios","דֵּמֵטְרִיוֹס","Demetrius","disciple","new","Yahuchanan G 1:12"),

  # ── REVELATION FIGURES ────────────────────────────────────────────────────
  ("antipas","Antipas","אַנְטִיפָּס","Antipas (martyr of Pergamos)","other","new","Hazon 2:13"),
  ("balaam-nt","Bil'am (NT ref)","בִּלְעָם","Balaam (referenced in NT)","prophet","new","Hazon 2:14"),
  ("jezebel-nt","Izeḇel (NT ref)","אִיזֶבֶל","Jezebel (referenced in NT)","prophetess","new","Hazon 2:20"),

  # ── MORE OT FIGURES ───────────────────────────────────────────────────────
  ("sennacherib","Sancheriv","סַנְחֵרִיב","Sennacherib","king","old","Melakim B 18:13"),
  ("rabshakeh","Rab-Shaqeh","רַב־שָׁקֵה","Rabshakeh","other","old","Melakim B 18:17"),
  ("shebna","Shevna","שֶׁבְנָה","Shebna (secretary)","servant","old","Melakim B 18:18"),
  ("sargon","Sargon","סַרְגוֹן","Sargon II","king","old","YeshaYahu 20:1"),
  ("tiglath-pileser","Tiglath Pil'eser","תִּגְלַת פִּלְאֶסֶר","Tiglath-Pileser III","king","old","Melakim B 15:29"),
  ("belshazzar","Belshatsatstsar","בֵּלְשַׁאצַּר","Belshazzar","king","old","Daniyel 5:1"),
  ("artaxerxes","Artaḥshasta","אַרְתַּחְשַׁשְׂתָּא","Artaxerxes","king","old","Ezra 4:7"),
  ("tobiah","Toḇiyah","טוֹבִיָּה","Tobiah the Ammonite","other","old","Nehemyah 2:10"),
  ("geshem","Geshem","גֶּשֶׁם","Geshem the Arab","other","old","Nehemyah 2:19"),
  ("asaph","Asaph","אָסָף","Asaph (musician/psalmist)","other","old","Tehillim 50:1"),
  ("korah","Qoraḥ","קֹרַח","Korah (rebel)","other","old","Bemidbar 16:1"),
  ("datan","Datan","דָּתָן","Dathan","other","old","Bemidbar 16:1"),
  ("abiram","Aviram","אֲבִירָם","Abiram","other","old","Bemidbar 16:1"),
  ("zelophehad","Tselophḥad","צְלָפְחָד","Zelophehad","other","old","Bemidbar 26:33"),
  ("daughters-zelophehad","Daughters of Tselophḥad","בְּנוֹת צְלָפְחָד","Daughters of Zelophehad","other","old","Bemidbar 27:1"),
  ("shiphrah","Shiphrah","שִׁפְרָה","Shiphrah (midwife)","other","old","Shemoth 1:15"),
  ("puah","Pu'ah","פּוּעָה","Puah (midwife)","other","old","Shemoth 1:15"),
  ("bezalel","Betsalel","בְּצַלְאֵל","Bezalel (craftsman)","other","old","Shemoth 31:2"),
  ("oholiab","Oholiyaḇ","אָהֳלִיאָב","Oholiab (craftsman)","other","old","Shemoth 31:6"),
  ("ithamar","Ithamar","אִיתָמָר","Ithamar (Aaron's son)","priest","old","Shemoth 6:23"),
  ("nadab-priest","Nadaḇ (priest)","נָדָב","Nadab (Aaron's son)","priest","old","Shemoth 6:23"),
  ("abihu","Aḇihu","אֲבִיהוּא","Abihu (Aaron's son)","priest","old","Shemoth 6:23"),
  ("jethro-reuel","Reuel / Yithro","יִתְרוֹ","Jethro (also called Reuel)","other","old","Shemoth 2:18"),
  ("achsah","Achsah","עַכְסָה","Achsah (Caleb's daughter)","other","old","Yahusha 15:16"),
  ("othniel-judge","Othniel ben Qenaz","עָתְנִיאֵל","Othniel (first judge)","judge","old","Shophetim 3:9"),
  ("sisera","Sisera","סִיסְרָא","Sisera (Canaanite commander)","other","old","Shophetim 4:2"),
  ("abinadab","Aḇinadaḇ","אֲבִינָדָב","Abinadab (keeper of the Ark)","other","old","Shemuel A 7:1"),
  ("mephibosheth","Mephibosheth","מְפִיבֹשֶׁת","Mephibosheth (Jonathan's son)","other","old","Shemuel B 4:4"),
  ("ahimaaz","Aḥima'ats","אֲחִימַעַץ","Ahimaaz (Zadok's son)","other","old","Shemuel B 15:27"),
  ("shimei","Shim'i","שִׁמְעִי","Shimei (who cursed David)","other","old","Shemuel B 16:5"),
  ("ittai-gittite","Ittai the Gittite","אִתַּי","Ittai (loyal warrior)","warrior","old","Shemuel B 15:19"),
]

# ── EXTRA-CANONICAL PEOPLE ────────────────────────────────────────────────────
PEOPLE += [
  # ── ARCHANGELS — The 7 holy ones before Yahuah's throne ────────────────────
  ("uriel","Uriel","אוּרִיאֵל","Uriel — archangel of light and wisdom","angel","both","Ḥanok 9:1"),
  ("raphael","Rapha'el","רָפָאֵל","Raphael — archangel of healing","angel","both","Ḥanok 9:1"),
  ("raguel","Raguel","רַגוּאֵל","Raguel — takes vengeance on the world of luminaries","angel","old","Ḥanok 20:4"),
  ("saraqael","Saraqael","שָׂרָקָאֵל","Saraqael — set over spirits who sin","angel","old","Ḥanok 20:6"),
  ("remiel","Remiel","רֵמִיאֵל","Remiel — presides over those who rise","angel","old","Ḥanok 20:8"),
  ("phanuel","Phanu'el","פְּנוּאֵל","Phanu'el — 4th angel of the presence; repentance and hope","angel","old","Ḥanok 40:9"),
  ("sariel-arch","Sariel","שַׂרִיאֵל","Sariel — archangel; also listed among the Watchers","angel","old","Ḥanok 9:1"),

  # ── FALLEN WATCHERS — 200 who descended on Mount Hermon (Ḥanok 6) ─────────
  ("semyaza","Semyaza","שֶׁמְיַזָּה","Semyaza — chief Watcher who led the 200 in descent","angel","old","Ḥanok 6:3"),
  ("urakiba","Urakiba","אוּרָקִיבָא","Urakiba — Watcher leader","angel","old","Ḥanok 6:7"),
  ("rameel","Rameel","רַמְאֵל","Rameel — Watcher leader","angel","old","Ḥanok 6:7"),
  ("kokabel","Kokabel","כּוֹכַבְאֵל","Kokabel — taught star-signs and astrology","angel","old","Ḥanok 6:7"),
  ("tamiel","Tamiel","תַּמְאִיאֵל","Tamiel — taught astronomy","angel","old","Ḥanok 6:7"),
  ("danel-watcher","Danel","דָּנִאֵל","Danel — taught signs of the sun","angel","old","Ḥanok 6:7"),
  ("ezeqiel-watcher","Ezeqiel","יְחֶזְקֵאל","Ezeqiel — taught knowledge of clouds","angel","old","Ḥanok 6:7"),
  ("baraqijal","Baraqijal","בָּרָקִיאֵל","Baraqijal — taught astrology and signs of lightning","angel","old","Ḥanok 6:7"),
  ("azazel","Azazel","עֲזָאזֵל","Azazel — taught metalworking, weapons and cosmetics","angel","old","Ḥanok 8:1"),
  ("armaros","Armaros","אַרְמַרוֹס","Armaros — taught resolution of enchantments","angel","old","Ḥanok 6:7"),
  ("batariel","Batariel","בַּתַּרִיאֵל","Batariel — Watcher leader","angel","old","Ḥanok 6:7"),
  ("ananel","Ananel","עֲנָנְאֵל","Ananel — Watcher leader","angel","old","Ḥanok 6:7"),
  ("zaqiel","Zaqiel","זַקִּיאֵל","Zaqiel — Watcher leader","angel","old","Ḥanok 6:7"),
  ("samsaveel","Samsaveel","שַׁמְשִׁאֵל","Samsaveel — taught signs of the sun","angel","old","Ḥanok 6:7"),
  ("satarael","Satarael","שָׂטָרִיאֵל","Satarael — Watcher leader","angel","old","Ḥanok 6:7"),
  ("turel","Turel","תּוּרִיאֵל","Turel — Watcher leader","angel","old","Ḥanok 6:7"),
  ("jomjael","Jomjael","יוֹמְיָאֵל","Jomjael — Watcher leader","angel","old","Ḥanok 6:7"),
  ("asael-watcher","Asael","עֲשָׂהאֵל","Asael — taught metalworking; bound under the earth by Rapha'el","angel","old","Ḥanok 6:7"),
  ("sariel-watcher","Sariel (Watcher)","שַׂרִיאֵל","Sariel — both Watcher and archangel in different lists","angel","old","Ḥanok 6:7"),
  ("gadreel","Gadre'el","גַּדְרְאֵל","Gadre'el — led Ḥawwah astray; taught all weapons of war","angel","old","Ḥanok 69:6"),
  ("penemue","Pene'mue","פֶּנְמוּאֵ","Pene'mue — taught humanity writing and the bitter and sweet","angel","old","Ḥanok 69:8"),
  ("rumyal","Rum'yal","רוּמְיָאֵל","Rum'yal — taught writing to humans","angel","old","Ḥanok 69:9"),
  ("kasdeja","Kasdeja","כַּשְׁדְּיָה","Kasdeja — taught evil medicine and spirits of demons","angel","old","Ḥanok 69:12"),
  ("yequn","Yeqon","יֶקוּן","Yeqon — first to corrupt the sons of the holy angels","angel","old","Ḥanok 69:4"),
  ("asbeel","Asbeel","אַשְׁבֵּאל","Asbeel — gave evil counsel to the holy angels","angel","old","Ḥanok 69:5"),
  ("tabaet","Taba'et","תַּבַּעַט","Taba'et — resisted judgement; led astray children of men","angel","old","Ḥanok 69:11"),

  # ── OTHER ANGELS (Ḥanok visions) ─────────────────────────────────────────
  ("lamasiel","Lamasiel","לַמַּסִיאֵל","Lamasiel — angel in Ḥanok's visions","angel","old","Ḥanok 20:1"),
  ("naqiel","Naqiel","נָקִיאֵל","Naqiel — angel set over the abyss","angel","old","Ḥanok 20:2"),

  # ── FALLEN (Jubilees) ─────────────────────────────────────────────────────
  ("mastema","Mastema","מַשְׂטֵמָה","Mastema — prince of evil spirits; the accuser","angel","old","Yuḇilim 10:8"),
  ("prince-mastema","Sar Mastema","שַׂר מַשְׂטֵמָה","Prince Mastema","angel","old","Yuḇilim 17:16"),
  ("reuem","Re'em","רְאֵם","Re'em (giant)","other","old","Yobelim 29:9"),
  ("qenan","Qeynan ben Arphaxad","קֵינָן","Kenan son of Arphaxad","patriarch","old","Yobelim 8:1"),

  # ── JASHER (YASHAR) ───────────────────────────────────────────────────────
  ("zepho","Zepho","צְפוֹ","Zepho (Esau's grandson, king of Chittim)","king","old","Yashar 61:24"),
  ("angeas","Angeas","אַנְגְּאָס","Angeas (king of Africa)","king","old","Yashar 62:5"),
  ("turnus","Turnus","טוּרְנוּס","Turnus (king of Bibentu)","king","old","Yashar 62:5"),
  ("balaam-jasher","Bil'am (Yashar)","בִּלְעָם","Balaam as advisor to Pharaoh","other","old","Yashar 58:3"),
  ("reuel-esau","Reuel ben Esav","רְעוּאֵל","Reuel son of Esau","patriarch","old","Yashar 38:2"),
  ("janus","Yanus","יָנוּס","Janus (Chittim king)","king","old","Yashar 10:16"),
  ("yaneas","Yaneas","יַנְאָס","Yaneas (Chittim king)","king","old","Yashar 10:16"),

  # ── 1 MACCABEES ───────────────────────────────────────────────────────────
  ("mattityahu-maccabee","Mattityahu the Maccabee","מַתִּתְיָהוּ","Mattathias (father of the Maccabees)","priest","old","Maqqabim A 2:1"),
  ("yehudah-maccabee","Yehudah the Maccabee","יְהוּדָה","Judah Maccabee","warrior","old","Maqqabim A 2:4"),
  ("yonatan-maccabee","Yonatan Maccabee","יוֹנָתָן","Jonathan Maccabee","king","old","Maqqabim A 2:5"),
  ("shimon-maccabee","Shim'on Maccabee","שִׁמְעוֹן","Simon Maccabee","king","old","Maqqabim A 2:3"),
  ("yohanan-maccabee","Yohanan Maccabee","יוֹחָנָן","John Maccabee","warrior","old","Maqqabim A 2:2"),
  ("eleazar-maccabee","El'azar Maccabee","אֶלְעָזָר","Eleazar Maccabee (the Avaran)","warrior","old","Maqqabim A 2:5"),
  ("antiochus","Antiochos Epiphanes","אַנְטִיוֹכוֹס","Antiochus IV Epiphanes","king","old","Maqqabim A 1:10"),
  ("lysias","Lysias","לִיסִיָּאס","Lysias (Syrian general)","warrior","old","Maqqabim A 3:32"),
  ("nikanor","Nikanor","נִיקָנוֹר","Nicanor (Syrian general)","warrior","old","Maqqabim A 3:38"),
  ("apollonius","Apollonios","אַפּוֹלּוֹנִיּוֹס","Apollonius (Syrian commander)","warrior","old","Maqqabim A 3:10"),
  ("seron","Seron","סֵרוֹן","Seron (Syrian general)","warrior","old","Maqqabim A 3:13"),
  ("ptolemy-maccabee","Ptolemy ben Abubus","תּוֹלְמַי","Ptolemy son of Abubus","other","old","Maqqabim A 16:15"),
  ("john-hyrcanus","Yohanan Hyrqanos","יוֹחָנָן","John Hyrcanus","king","old","Maqqabim A 16:23"),
  ("jason-hp","Yason (high priest)","יָסוֹן","Jason (high priest)","priest","old","Maqqabim B 4:7"),
  ("menelaus","Menelaos","מְנֵלָאוֹס","Menelaus (high priest)","priest","old","Maqqabim B 4:23"),
  ("razis","Razis","רָזִיס","Razis (elder of Jerusalem)","other","old","Maqqabim B 14:37"),

  # ── TOBIT ─────────────────────────────────────────────────────────────────
  ("tobit","Toḇiyah (Tobit)","טוֹבִיָּה","Tobit (righteous man of Naphtali)","other","old","Tobiyah 1:1"),
  ("tobias","Toḇiyas","טוֹבִיָּס","Tobias (son of Tobit)","other","old","Tobiyah 1:9"),
  ("sarah-raguel","Sarah daughter of Raguel","שָׂרָה","Sarah daughter of Raguel","matriarch","old","Tobiyah 3:7"),
  ("edna","Edna","עֶדְנָה","Edna (wife of Raguel)","matriarch","old","Tobiyah 7:2"),
  ("raguel-tobit","Raguel (father of Sarah)","רַגוּאֵל","Raguel (Tobit's kinsman)","other","old","Tobiyah 3:7"),
  ("anna-tobit","Hannah (Anna)","חַנָּה","Anna (wife of Tobit)","matriarch","old","Tobiyah 1:9"),
  ("asmodeus","Asmodeus","אַשְׁמְדַאי","Asmodeus (the destroying demon)","other","old","Tobiyah 3:8"),

  # ── JUDITH ────────────────────────────────────────────────────────────────
  ("yehudit","Yehudit","יְהוּדִית","Judith (widow of Manasseh)","warrior","old","Yahudith 8:1"),
  ("holophernes","Holophernes","הוֹלוֹפֶּרְנֵס","Holofernes (Assyrian general)","warrior","old","Yahudith 2:4"),
  ("achior","Achior","אֲחִיאוֹר","Achior the Ammonite","other","old","Yahudith 5:5"),
  ("nebuchadnezzar-judith","Neḇukadnetstsar (Yahudith)","נְבוּכַדְנֶאצַּר","Nebuchadnezzar (as in Judith)","king","old","Yahudith 1:1"),
  ("bagoas","Bagoas","בַּגּוֹאַס","Bagoas (Holofernes' chamberlain)","servant","old","Yahudith 12:11"),
  ("ozias","Uzziyah (Yahudith)","עֻזִּיָּה","Uzziah (ruler of Bethulia)","other","old","Yahudith 6:15"),
  ("merari-judith","Merari","מְרָרִי","Merari (Judith's forefather)","patriarch","old","Yahudith 8:1"),

  # ── SIRACH (BEN SIRA) ─────────────────────────────────────────────────────
  ("ben-sira","Shim'on ben Yeshua ben Sira","שִׁמְעוֹן","Ben Sira (author of Sirach)","other","old","Sira prologue"),
  ("simon-hp-sira","Shim'on the High Priest","שִׁמְעוֹן","Simon II (praised in Sirach 50)","priest","old","Sira 50:1"),

  # ── TESTAMENTS OF THE 12 PATRIARCHS ──────────────────────────────────────
  ("potiphera","Potiphera","פּוֹטִי פֶרַע","Potiphera (priest of On, Asenath's father)","priest","old","Bereshit 41:45"),
  ("er","Er","עֵר","Er (Judah's firstborn, slain by Yahuah)","other","old","Bereshit 38:3"),
  ("onan","Onan","אוֹנָן","Onan (Judah's son)","other","old","Bereshit 38:4"),
  ("shelah","Shelah","שֵׁלָה","Shelah (Judah's third son)","patriarch","old","Bereshit 38:5"),

  # ── 1 ADAM AND HAWWAH ─────────────────────────────────────────────────────
  ("sammael","Sammael","סַמָּאֵל","Sammael (the serpent in Adam and Hawwah)","other","old","Adam-Hawwah A 16:4"),
  ("michael-adam","Mikael (in Adam-Hawwah)","מִיכָאֵל","Michael (guardian of Adam)","angel","old","Adam-Hawwah A 22:1"),

  # ── WISDOM OF SOLOMON ─────────────────────────────────────────────────────
  ("solomon-wisdom","Shelomoh (Ḥakmah)","שְׁלֹמֹה","Solomon as author of Wisdom","king","old","Ḥakmah 1:1"),

  # ── BARUCH ────────────────────────────────────────────────────────────────
  ("baruk-writer","Baruk ben Neriyahu","בָּרוּךְ","Baruch son of Neriah (writer)","servant","old","Baruk 1:1"),
  ("neriyahu","Neriyahu","נֵרִיָּה","Neriah (Baruch's father)","other","old","Baruk 1:1"),
]

# ── EXPANDED NAMES (systematic expansion) ───────────────────────────────────
PEOPLE += [
  ("yarobam-i","Yaroḇ'am I","יָרָבְעָם","Jeroboam I (first king of N. Israel)","king","old","Melakim A 11:26"),
  ("nadab-king","Naḏaḇ","נָדָב","Nadab (king of Israel)","king","old","Melakim A 15:25"),
  ("elah-king","Elah","אֵלָה","Elah (king of Israel)","king","old","Melakim A 16:6"),
  ("ahab","Aḥ'aḇ","אַחְאָב","Ahab (king of Israel)","king","old","Melakim A 16:29"),
  ("joram-israel","Yoram (Yisra'ĕl)","יוֹרָם","Joram (king of Israel)","king","old","Melakim B 1:17"),
  ("jehu","Yehu","יֵהוּא","Jehu (king; ended Ahab's line)","king","old","Melakim B 9:2"),
  ("joash-israel","Yo'ash (Yisra'ĕl)","יוֹאָשׁ","Joash (king of Israel)","king","old","Melakim B 13:10"),
  ("jeroboam-ii","Yaroḇ'am II","יָרָבְעָם","Jeroboam II (king of Israel)","king","old","Melakim B 14:23"),
  ("zechariah-king","Zekaryahu (king)","זְכַרְיָהוּ","Zechariah (last of Jehu's dynasty)","king","old","Melakim B 14:29"),
  ("menahem","Menaḥem","מְנַחֵם","Menahem (king of Israel)","king","old","Melakim B 15:14"),
  ("pekahiah","Peqaḥyah","פְּקַחְיָה","Pekahiah (king of Israel)","king","old","Melakim B 15:22"),
  ("pekah","Peqaḥ","פֶּקַח","Pekah (king of Israel)","king","old","Melakim B 15:25"),
  ("rehoboam","Reḥab'am","רְחַבְעָם","Rehoboam (first king of Judah)","king","old","Melakim A 11:43"),
  ("abijam","Aḇiyam","אֲבִיָּם","Abijam (king of Judah)","king","old","Melakim A 14:31"),
  ("jehoshaphat","Yahoshaphat","יְהוֹשָׁפָט","Jehoshaphat (king of Judah)","king","old","Melakim A 15:24"),
  ("amaziah","Amatzyah","אֲמַצְיָה","Amaziah (king of Judah)","king","old","Melakim B 14:1"),
  ("uzziah","Uzziyahu","עֻזִּיָּהוּ","Uzziah (king of Judah)","king","old","Melakim B 15:1"),
  ("jotham","Yotham","יוֹתָם","Jotham (king of Judah)","king","old","Melakim B 15:32"),
  ("hezekiah","Ḥizqiyahu","חִזְקִיָּהוּ","Hezekiah (king of Judah)","king","old","Melakim B 18:1"),
  ("manasseh-king","Menashsheh","מְנַשֶּׁה","Manasseh (most wicked king)","king","old","Melakim B 21:1"),
  ("amon-king","Amon","אָמוֹן","Amon (king of Judah)","king","old","Melakim B 21:19"),
  ("josiah","Yoshiyahu","יֹאשִׁיָּהוּ","Josiah (king; great reformer)","king","old","Melakim B 22:1"),
  ("jehoiakim","Yehoyaqim","יְהוֹיָקִים","Jehoiakim (king under Babylon)","king","old","Melakim B 23:34"),
  ("jehoiachin","Yehoyakin","יְהוֹיָכִין","Jehoiachin (king 3 months)","king","old","Melakim B 24:8"),
  ("zedekiah","Tsidqiyahu","צִדְקִיָּהוּ","Zedekiah (last king of Judah)","king","old","Melakim B 24:17"),
  ("pharaoh-general","Pharaoh","פַּרְעֹה","Pharaoh (title of Egyptian kings)","king","old","Bereshit 12:15"),
  ("shalmaneser","Shalmaneser","שַׁלְמַנְאֶסֶר","Shalmaneser V (exiled Israel)","king","old","Melakim B 17:3"),
  ("nebuchadnezzar","Neḇukadnetstsar","נְבוּכַדְנֶצַּר","Nebuchadnezzar (king of Babylon)","king","old","Melakim B 24:1"),
  ("evil-merodach","Evil-Merodak","אֱוִיל מְרֹדַךְ","Evil-merodach (freed Jehoiachin)","king","old","Melakim B 25:27"),
  ("cyrus","Koresh","כּוֹרֶשׁ","Cyrus the Great (released exiles)","king","old","Dibre B 36:22"),
  ("darius","Daryawesh","דָּרְיָוֶשׁ","Darius (the Mede / Persia)","king","old","Daniyel 5:31"),
  ("balak","Balaq","בָּלָק","Balak (king of Moab)","king","old","Bemidbar 22:2"),
  ("og-bashan","Og","עוֹג","Og (giant king of Bashan)","king","old","Bemidbar 21:33"),
  ("eglon-moab","Eglon","עֶגְלוֹן","Eglon (king of Moab; Ehud's target)","king","old","Shophetim 3:12"),
  ("jabin","Yaḇin","יָבִין","Jabin (king of Hazor)","king","old","Yahusha 11:1"),
  ("agag","Agag","אֲגַג","Agag (king of Amalek)","king","old","Shemuel A 15:8"),
  ("hiram-tyre","Ḥiram","חִירָם","Hiram (king of Tyre; Solomon's ally)","king","old","Melakim A 5:1"),
  ("shishak","Shishaq","שִׁישַׁק","Shishak (Egyptian pharaoh; plundered temple)","king","old","Melakim A 14:25"),
  ("ben-hadad","Ben-Hadad","בֶּן הֲדַד","Ben-Hadad (king of Aram)","king","old","Melakim A 15:18"),
  ("hazael","Ḥaza'el","חֲזָאֵל","Hazael (king of Aram)","king","old","Melakim A 19:15"),
  ("hosea-prophet","Hoshu'a / Hoshea","הוֹשֵׁעַ","Hosea (prophet of Ephraim)","prophet","old","Hoshua 1:1"),
  ("amos-prophet","Amos","עָמוֹס","Amos (shepherd-prophet of Tekoa)","prophet","old","Amos 1:1"),
  ("micah-prophet","Mikah","מִיכָה","Micah (prophet of Moresheth)","prophet","old","Mikah 1:1"),
  ("nahum-prophet","Naḥum","נַחוּם","Nahum (prophet against Nineveh)","prophet","old","Naḥum 1:1"),
  ("habakkuk-prophet","Ḥaḇaqquk","חֲבַקּוּק","Habakkuk (prophet)","prophet","old","Ḥaḇaqquk 1:1"),
  ("zephaniah-prophet","Tsephanyah","צְפַנְיָה","Zephaniah (prophet)","prophet","old","Tsephanyah 1:1"),
  ("haggai-prophet","Ḥaggai","חַגַּי","Haggai (post-exile prophet)","prophet","old","Ḥaggai 1:1"),
  ("zechariah-prophet","Zekaryah","זְכַרְיָה","Zechariah (post-exile prophet)","prophet","old","ZekarYah 1:1"),
  ("malachi-prophet","Malaki","מַלְאָכִי","Malachi (last OT prophet)","prophet","old","Malaki 1:1"),
  ("joel-prophet","Yo'el","יוֹאֵל","Joel (prophet)","prophet","old","Yoel 1:1"),
  ("obadiah-prophet","Oḇadyah","עֹבַדְיָה","Obadiah (prophet against Edom)","prophet","old","Oḇadyah 1:1"),
  ("micaiah","Mikayahu","מִיכָיְהוּ","Micaiah (prophet vs. Ahab)","prophet","old","Melakim A 22:8"),
  ("ahijah-prophet","Aḥiyah","אֲחִיָּה","Ahijah (prophet of Shiloh)","prophet","old","Melakim A 11:29"),
  ("shemaiah-prophet","Shemayah","שְׁמַעְיָה","Shemaiah (prophet to Rehoboam)","prophet","old","Melakim A 12:22"),
  ("baruch","Baruk","בָּרוּךְ","Baruch (Jeremiah's scribe)","prophet","old","YirmeYahu 32:12"),
  ("urijah","Uriyahu","אוּרִיָּהוּ","Urijah (martyr-prophet)","prophet","old","YirmeYahu 26:20"),
  ("hanani-seer","Ḥanani","חֲנָנִי","Hanani (seer to Asa)","prophet","old","Dibre B 16:7"),
  ("agabus","Agabus","אָגָבוֹס","Agabus (NT prophet)","prophet","new","Ma'aseh 11:28"),
  ("noadiah","No'adyah","נוֹעַדְיָה","Noadiah (false prophetess against Nehemiah)","prophetess","old","Nehemyah 6:14"),
  ("eli-priest","Eli","עֵלִי","Eli (high priest at Shiloh)","priest","old","Shemuel A 1:3"),
  ("hophni","Ḥophni","חָפְנִי","Hophni (corrupt son of Eli)","priest","old","Shemuel A 1:3"),
  ("phinehas-eli","Pineḥas (son of Eli)","פִּינְחָס","Phinehas (corrupt son of Eli)","priest","old","Shemuel A 1:3"),
  ("jehoiada","Yehoyadah","יְהוֹיָדָע","Jehoiada (high priest; hid Joash)","priest","old","Melakim B 11:4"),
  ("uriah-priest","Uriyah ha-Kohen","אוּרִיָּה","Uriah (priest under Ahaz)","priest","old","Melakim B 16:10"),
  ("hilkiah-priest","Ḥilqiyahu","חִלְקִיָּהוּ","Hilkiah (found the Torah scroll)","priest","old","Melakim B 22:8"),
  ("seraiah-priest","Serayah ha-Kohen","שְׂרָיָה","Seraiah (chief priest at Jerusalem's fall)","priest","old","Melakim B 25:18"),
  ("jeshua-priest","Yĕshua ben Yotsadaq","יֵשׁוּעַ","Jeshua ben Jozadak (post-exile high priest)","priest","old","Ezra 2:2"),
  ("jaddua","Yaddua","יַדּוּעַ","Jaddua (last OT high priest)","priest","old","Nehemyah 12:11"),
  ("phinehas-aaron","Pineḥas ben El'azar","פִּינְחָס","Phinehas son of Eleazar (zeal for Yahuah)","priest","old","Bemidbar 25:7"),
  ("ithamar-priest","Itamar","אִיתָמָר","Ithamar (youngest son of Aaron)","priest","old","Shemoth 6:23"),
  ("jashobeam","Yashoḇ'am","יָשָׁבְעָם","Jashobeam (first of David's mighty men)","warrior","old","Shemuel B 23:8"),
  ("shammah-mighty","Shammah","שַׁמָּה","Shammah (held ground in lentil field)","warrior","old","Shemuel B 23:11"),
  ("benaiah","Benayahu","בְּנָיָהוּ","Benaiah (killed lion in pit; Solomon's commander)","warrior","old","Shemuel B 23:20"),
  ("uriah-hittite","Uriyah ha-Ḥitti","אוּרִיָּה הַחִתִּי","Uriah the Hittite (faithful warrior)","warrior","old","Shemuel B 11:3"),
  ("joab","Yo'aḇ","יוֹאָב","Joab (David's general)","warrior","old","Shemuel A 26:6"),
  ("abishai","Aḇishai","אֲבִישַׁי","Abishai (Joab's brother; killed Goliath's brother)","warrior","old","Shemuel A 26:6"),
  ("sibbecai","Sibbekai","סִבְּכַי","Sibbecai (slew giant Saph)","warrior","old","Shemuel B 21:18"),
  ("maharai","Maharai","מַהֲרַי","Maharai (one of David's thirty)","warrior","old","Shemuel B 23:28"),
  ("naharai","Naḥaray","נַחֲרַי","Naharai (Joab's armourbearer)","warrior","old","Shemuel B 23:37"),
  ("jephthah","Yiphtaḥ","יִפְתָּח","Jephthah (judge; vow to Yahuah)","warrior","old","Shophetim 11:1"),
  ("abimelech-judge","Aḇimelek ben Giḏ'on","אֲבִימֶלֶךְ","Abimelech (Gideon's son; ruler of Shechem)","warrior","old","Shophetim 9:1"),
  ("tola-judge","Tola","תּוֹלָע","Tola (judge of Israel)","warrior","old","Shophetim 10:1"),
  ("jair-judge","Ya'ir","יָאִיר","Jair the Gileadite (judge)","warrior","old","Shophetim 10:3"),
  ("ibzan-judge","Ibzan","אִבְצָן","Ibzan (judge of Israel)","warrior","old","Shophetim 12:8"),
  ("elon-judge","Elon ha-Zeḇuloni","אֵילוֹן","Elon the Zebulonite (judge)","warrior","old","Shophetim 12:11"),
  ("abdon-judge","Abdon","עַבְדּוֹן","Abdon (judge of Israel)","warrior","old","Shophetim 12:13"),
  ("goliath","Golyath","גׇּלְיָת","Goliath (giant of Gath)","warrior","old","Shemuel A 17:4"),
  ("abner","Aḇner","אַבְנֵר","Abner (Saul's commander)","warrior","old","Shemuel A 14:50"),
  ("cain","Qayin","קַיִן","Cain (first murderer; son of Adam)","patriarch","old","Bereshit 4:1"),
  ("abel","Heḇel","הֶבֶל","Abel (first martyr; son of Adam)","patriarch","old","Bereshit 4:2"),
  ("seth","Shet","שֵׁת","Seth (third son of Adam; ancestor of Noah)","patriarch","old","Bereshit 4:25"),
  ("kenan","Qeynan","קֵינָן","Kenan (son of Enosh)","patriarch","old","Bereshit 5:9"),
  ("mahalalel","Mahalal'el","מַהֲלַלְאֵל","Mahalalel (son of Kenan)","patriarch","old","Bereshit 5:12"),
  ("jared","Yered","יֶרֶד","Jared (father of Enoch)","patriarch","old","Bereshit 5:15"),
  ("methuselah","Methushelaḥ","מְתוּשֶׁלַח","Methuselah (oldest man; 969 years)","patriarch","old","Bereshit 5:21"),
  ("lamech-noach","Lemek","לֶמֶךְ","Lamech (father of Noah)","patriarch","old","Bereshit 5:25"),
  ("japheth","Yepheth","יֶפֶת","Japheth (son of Noah; ancestor of nations)","patriarch","old","Bereshit 5:32"),
  ("eber","Eḇer","עֵבֶר","Eber (ancestor; source of 'Hebrew')","patriarch","old","Bereshit 10:21"),
  ("peleg","Peleg","פֶּלֶג","Peleg (earth divided in his days)","patriarch","old","Bereshit 10:25"),
  ("reu","Re'u","רְעוּ","Reu (son of Peleg)","patriarch","old","Bereshit 11:18"),
  ("serug","Serug","שְׂרוּג","Serug (son of Reu)","patriarch","old","Bereshit 11:20"),
  ("nahor-brother","Naḥor","נָחוֹר","Nahor (Abraham's brother)","patriarch","old","Bereshit 11:26"),
  ("terah","Teraḥ","תֶּרַח","Terah (father of Abraham)","patriarch","old","Bereshit 11:24"),
  ("ishmael","Yishma'el","יִשְׁמָעֵאל","Ishmael (son of Abraham and Hagar)","patriarch","old","Bereshit 16:11"),
  ("esau","Esav","עֵשָׂו","Esau (twin of Jacob; sold birthright)","patriarch","old","Bereshit 25:25"),
  ("laban","Laḇan","לָבָן","Laban (Jacob's uncle and father-in-law)","patriarch","old","Bereshit 24:29"),
  ("shelah-judah","Shelah ben Yahudah","שֵׁלָה","Shelah (son of Judah)","patriarch","old","Bereshit 38:5"),
  ("perez","Perets","פֶּרֶץ","Perez (twin son of Judah; ancestor of David)","patriarch","old","Bereshit 38:29"),
  ("zerah-twin","Zeraḥ","זֶרַח","Zerah (twin son of Judah)","patriarch","old","Bereshit 38:30"),
  ("hezron","Ḥetsron","חֶצְרוֹן","Hezron (son of Perez; ancestor of David)","patriarch","old","Bereshit 46:12"),
  ("amminadab","Amminadaḇ","עַמִּינָדָב","Amminadab (father of Nashon)","patriarch","old","Shemoth 6:23"),
  ("nashon","Nashon","נַחְשׁוֹן","Nashon (leader of Judah; first to cross Red Sea)","patriarch","old","Bemidbar 1:7"),
  ("salmon","Salmon","שַׂלְמוֹן","Salmon (son of Nashon; father of Boaz)","patriarch","old","Ruth 4:20"),
  ("jesse","Yishai","יִשַׁי","Jesse (father of David)","patriarch","old","Shemuel A 16:1"),
  ("obed","Oḇed","עוֹבֵד","Obed (son of Boaz and Ruth)","patriarch","old","Ruth 4:17"),
  ("jubal","Yuḇal","יוּבָל","Jubal (father of music)","patriarch","old","Bereshit 4:21"),
  ("jabal","Yaḇal","יָבָל","Jabal (father of tent-dwellers and livestock)","patriarch","old","Bereshit 4:20"),
  ("tubal-cain","Tuḇal-Qayin","תּוּבַל קַיִן","Tubal-cain (forger of bronze and iron)","patriarch","old","Bereshit 4:22"),
  ("abigail","Aḇigayil","אֲבִיגַיִל","Abigail (wife of David; wise woman)","matriarch","old","Shemuel A 25:3"),
  ("bathsheba","Bathsheḇa","בַּת שֶׁבַע","Bathsheba (mother of Solomon)","matriarch","old","Shemuel B 11:3"),
  ("michal","Mikal","מִיכַל","Michal (daughter of Saul; wife of David)","matriarch","old","Shemuel A 14:49"),
  ("merab","Meraḇ","מֵרַב","Merab (daughter of Saul)","matriarch","old","Shemuel A 14:49"),
  ("abishag","Aḇishag","אֲבִישַׁג","Abishag the Shunamite","matriarch","old","Melakim A 1:3"),
  ("peninnah","Peninnah","פְּנִנָּה","Peninnah (Hannah's rival wife)","matriarch","old","Shemuel A 1:2"),
  ("orpah","Orpah","עָרְפָּה","Orpah (Ruth's sister-in-law)","matriarch","old","Ruth 1:4"),
  ("mahlah","Maḥlah bat Tselopheḥad","מַחְלָה","Mahlah (daughter of Zelophehad)","matriarch","old","Bemidbar 27:1"),
  ("tirzah-zelophehad","Tirtsah bat Tselopheḥad","תִּרְצָה","Tirzah (daughter of Zelophehad)","matriarch","old","Bemidbar 27:1"),
  ("hoglah","Ḥoglah bat Tselopheḥad","חָגְלָה","Hoglah (daughter of Zelophehad)","matriarch","old","Bemidbar 27:1"),
  ("milcah-zelophehad","Milkah bat Tselopheḥad","מִלְכָּה","Milcah (daughter of Zelophehad)","matriarch","old","Bemidbar 27:1"),
  ("mary-magdalene","Miryam of Magdala","מִרְיָם הַמַּגְדָּלִית","Mary Magdalene","matriarch","new","Luqas 8:2"),
  ("mary-bethany","Miryam of Bĕyth Anyah","מִרְיָם","Mary of Bethany","matriarch","new","Yahuchanan 11:1"),
  ("joanna","Yohannah","יוֹחַנָּה","Joanna (supported Yahusha's ministry)","matriarch","new","Luqas 8:3"),
  ("susanna-disciple","Shoshannah","שׁוֹשַׁנָּה","Susanna (supported Yahusha's ministry)","matriarch","new","Luqas 8:3"),
  ("jochebed","Yokheḇed","יוֹכֶבֶד","Jochebed (mother of Moses, Aaron and Miriam)","matriarch","old","Shemoth 6:20"),
  ("silas-apostle","Silas / Silvanus","סִילָס","Silas (Paul's co-worker and companion)","apostle","new","Ma'aseh 15:22"),
  ("aquila","Aqila","עֲקִילָה","Aquila (tentmaker with Priscilla)","disciple","new","Ma'aseh 18:2"),
  ("zacchaeus","Zakkay","זַכַּי","Zacchaeus (tax collector; hosted Yahusha)","disciple","new","Luqas 19:2"),
  ("lazarus-bethany","El'azar of Bĕyth Anyah","אֶלְעָזָר","Lazarus (raised from the dead)","disciple","new","Yahuchanan 11:1"),
  ("joseph-arimathea","Yoseph of Arimathea","יוֹסֵף","Joseph of Arimathea (gave his tomb)","disciple","new","MattithYahu 27:57"),
  ("cleopas","Qeleopas","קְלֵיאוֹפָּס","Cleopas (met Yahusha on road to Emmaus)","disciple","new","Luqas 24:18"),
  ("ananias-damascus","Ananias of Dammesek","חֲנַנְיָה","Ananias (baptised Paul in Damascus)","disciple","new","Ma'aseh 9:10"),
  ("stephen-martyr","Stephanos","אֶסְטֵפָנוֹס","Stephen (first martyr)","deacon","new","Ma'aseh 6:5"),
  ("philip-evangelist","Philip the Evangelist","פִּילִיפּוֹס","Philip the Evangelist","deacon","new","Ma'aseh 6:5"),
  ("mnason","Mnason","מְנָסוֹן","Mnason of Cyprus (early disciple)","disciple","new","Ma'aseh 21:16"),
  ("onesimus","Onesimos","אוֹנֵסִימוֹס","Onesimus (runaway slave; letter of Philemon)","disciple","new","Philemon 1:10"),
  ("aristarchus","Aristarkhos","אֲרִיסְטַרְכוֹס","Aristarchus (fellow prisoner of Paul)","disciple","new","Ma'aseh 19:29"),
  ("sopater","Sopatros","סוֹפַּטְרוֹס","Sopater (from Berea; companion of Paul)","disciple","new","Ma'aseh 20:4"),
  ("gehazi-servant","Gĕḥazi","גֵּיחֲזִי","Gehazi (Elisha's servant; struck with leprosy)","servant","old","Melakim B 4:12"),
  ("obadiah-steward","Oḇadyahu ha-Sar","עֹבַדְיָהוּ","Obadiah (steward of Ahab; hid 100 prophets)","servant","old","Melakim A 18:3"),
  ("shaphan","Shaphan","שָׁפָן","Shaphan (scribe who read Torah to Josiah)","servant","old","Melakim B 22:3"),
  ("ebed-melech","Eḇed-Melek","עֶבֶד מֶלֶךְ","Ebed-Melech (Ethiopian; rescued Jeremiah)","servant","old","YirmeYahu 38:7"),
  ("nehemiah-cup","Neḥemyah","נְחֶמְיָה","Nehemiah (cupbearer; rebuilt Jerusalem walls)","servant","old","Nehemyah 1:1"),
  ("mordecai","Mordekai","מׇרְדֳּכַי","Mordecai (Esther's cousin; saved the Jews)","servant","old","Ester 2:5"),
  ("jezebel","Izeḇel","אִיזֶבֶל","Jezebel (wicked queen of Ahab)","other","old","Melakim A 16:31"),
  ("athaliah","Atalyah","עֲתַלְיָה","Athaliah (usurper queen of Judah)","other","old","Melakim B 8:26"),
  ("anak","Anaq","עֲנָק","Anak (ancestor of the Anakim giants)","other","old","Bemidbar 13:28"),
  ("abimelech-philistine","Aḇimelek (Gerar)","אֲבִימֶלֶךְ","Abimelech (king of Gerar; dealings with Abraham)","other","old","Bereshit 20:2"),
  ("dathan","Datan","דָּתָן","Dathan (rebel against Moses)","other","old","Bemidbar 16:1"),
  ("hiel","Ḥi'el","חִיאֵל","Hiel (rebuilt Jericho; lost sons)","other","old","Melakim A 16:34"),
  ("sheba-rebel","Sheḇa ben Bikhri","שֶׁבַע","Sheba (led rebellion against David)","other","old","Shemuel B 20:1"),
  ("tamar-david","Tamar bat Dawiḏ","תָּמָר","Tamar (daughter of David; violated by Amnon)","other","old","Shemuel B 13:1"),
  ("amnon","Amnon","אַמְנוֹן","Amnon (David's firstborn; violated Tamar)","other","old","Shemuel B 3:2"),
  ("absalom","Aḇshalom","אַבְשָׁלוֹם","Absalom (David's son; rebel prince)","other","old","Shemuel B 3:3"),
  ("adonijah","Adoniyahu","אֲדֹנִיָּהוּ","Adonijah (attempted to seize throne from Solomon)","other","old","Shemuel B 3:4"),
  ("ananias-sapphira","Ḥananyah and Shappirah","חֲנַנְיָה","Ananias and Sapphira (lied to Ruaḥ ha'Qodesh)","other","new","Ma'aseh 5:1"),
  ("shimei-cursed","Shim'i ben Gera","שִׁמְעִי","Shimei (cursed David; later pardoned)","other","old","Shemuel B 16:5"),
  ("naaman-syria","Na'aman","נַעֲמָן","Naaman (Syrian commander healed of leprosy)","other","old","Melakim B 5:1"),
  ("sanballat","Sanḇallat","סַנְבַּלַּט","Sanballat (opposed Nehemiah's rebuilding)","other","old","Nehemyah 2:10"),
]

ANGEL_TYPE_MAP: dict[str, str] = {
  "mikael": "archangel", "gabrael": "archangel", "raphael": "archangel",
  "uriel": "archangel", "saraqael": "archangel", "raguel": "archangel",
  "remiel": "archangel", "phanuel": "archangel", "sariel-arch": "archangel",
  "shatan": "fallen", "abaddon": "fallen", "mastema": "fallen",
  "prince-mastema": "fallen",
  "semyaza": "fallen_watcher", "urakiba": "fallen_watcher", "rameel": "fallen_watcher",
  "kokabel": "fallen_watcher", "tamiel": "fallen_watcher", "danel-watcher": "fallen_watcher",
  "ezeqiel-watcher": "fallen_watcher", "baraqijal": "fallen_watcher",
  "azazel": "fallen_watcher", "armaros": "fallen_watcher", "batariel": "fallen_watcher",
  "ananel": "fallen_watcher", "zaqiel": "fallen_watcher", "samsaveel": "fallen_watcher",
  "satarael": "fallen_watcher", "turel": "fallen_watcher", "jomjael": "fallen_watcher",
  "asael-watcher": "fallen_watcher", "sariel-watcher": "fallen_watcher",
  "gadreel": "fallen_watcher", "penemue": "fallen_watcher", "rumyal": "fallen_watcher",
  "kasdeja": "fallen_watcher", "yequn": "fallen_watcher", "asbeel": "fallen_watcher",
  "tabaet": "fallen_watcher",
  "kerubim": "cherub", "malak-yahuah": "messenger",
  "seraphim": "seraph", "michael-adam": "guardian",
  "lamasiel": "messenger", "naqiel": "other",
}

SYSTEM = """You are a biblical scholar. Generate content for biblical people/names.
Always use restored Hebrew names (Yahuah not LORD, Yahusha not Jesus, Mosheh not Moses, etc.)
Keep language reverent, scholarly, and accessible to all ages.
Return ONLY valid JSON, no markdown."""

def generate_batch(batch: list) -> list[dict]:
    items = [{"slug":p[0],"name_restored":p[1],"name_english":p[3],"category":p[4],"first_mention":p[6]} for p in batch]
    prompt = f"""Generate content for {len(batch)} biblical people. Return a JSON array, each object with:
- slug (from input)
- meaning_en: etymology/meaning of the name (1-2 sentences, start with meaning in quotes)
- meaning_nl: Dutch translation of meaning_en
- origin_en: 2-4 sentences on this person's story and background
- origin_nl: Dutch translation of origin_en
- significance_en: 2-3 sentences on their biblical/theological importance
- significance_nl: Dutch translation of significance_en
- age_at_death: integer (years lived) or null if unknown or not applicable (e.g. angels, divine)
- birthplace: restored Hebrew place name (e.g. "Ur of the Kasdim", "Bethlehem", "Yerushalayim") or null
- birthplace_slug: slug of the birthplace from the places table (e.g. "ur", "bethlehem", "yerushalayim") or null if unknown
- father: restored Hebrew name of biological father, or null
- father_slug: slug of the father from the people table (e.g. "abram", "yitsaq", "dawid") or null if unknown
- mother: restored Hebrew name of biological mother, or null
- mother_slug: slug of the mother from the people table (e.g. "sarah", "rachel", "miryam-mother") or null if unknown
- extra_info_en: 1-2 sentences of an interesting fact, notable deed, or unique role not covered above (null if nothing to add)
- extra_info_nl: Dutch translation of extra_info_en

For slug fields: use lowercase with hyphens, no special characters.
Known people slugs include: abram, sarah, yitsaq, ribqah, yaaqob, rachel, leah, yoseph, mosheh, dawid, shlomoh, etc.
Known place slugs include: ur, haran, beersheba, yerushalayim, bethlehem, mitsrayim, babel, etc.

People:
{json.dumps(items, ensure_ascii=False)}"""

    msg = claude.messages.create(
        model="claude-haiku-4-5-20251001",
        max_tokens=12000,
        system=SYSTEM,
        messages=[{"role":"user","content":prompt}],
    )
    raw = msg.content[0].text.strip()
    match = re.search(r'\[[\s\S]*\]', raw)
    if not match:
        print("  WARNING: no JSON array in response")
        return []
    return json.loads(match.group())

def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--resume", action="store_true", help="Skip slugs already in DB")
    parser.add_argument("--fill-meta", dest="fill_meta", action="store_true", help="Re-run only people where age_at_death IS NULL (backfill new fields)")
    parser.add_argument("--category", help="Only generate a specific category")
    parser.add_argument("--check", action="store_true", help="Show how many people still need meta. No generation.")
    args = parser.parse_args()

    if args.check:
        res = sb.table("people").select("category,slug").is_("age_at_death", "null").limit(10000).execute()
        if not res.data:
            print("✅ All people have meta info — nothing to generate.")
        else:
            from collections import Counter
            counts = Counter(r["category"] for r in res.data)
            print(f"⚠️  {len(res.data)} people not yet processed by fill-meta (age_at_death still NULL):")
            print("   (Note: after fill-meta, age=-1 means unknown/not applicable — that is fine)")
            for cat, n in sorted(counts.items(), key=lambda x: -x[1]):
                print(f"   {cat:15} {n}")
            print("\nRun: python scripts/generate_names.py --fill-meta")
        return

    people = PEOPLE
    if args.category:
        people = [p for p in PEOPLE if p[4] == args.category]

    def with_retry(fn, label="request"):
        for attempt in range(6):
            try:
                return fn()
            except Exception as e:
                msg = str(e)
                if "credit balance" in msg or "402" in msg or "400" in msg:
                    raise  # billing error — retrying won't help
                wait = 10 * (attempt + 1)
                print(f"  [retry {attempt+1}/6] {label} failed: {e}. Waiting {wait}s…")
                time.sleep(wait)
        raise RuntimeError(f"{label} failed after 6 retries — check your internet connection.")

    if args.resume:
        res = with_retry(lambda: sb.table("people").select("slug").limit(10000).execute(), "Supabase fetch")
        existing = {r["slug"] for r in res.data}
        people = [p for p in people if p[0] not in existing]
        print(f"Resuming: {len(people)} remaining (slug not yet in DB)")

    if args.fill_meta:
        res = with_retry(lambda: sb.table("people").select("slug").is_("age_at_death", "null").limit(10000).execute(), "Supabase fetch")
        null_slugs = {r["slug"] for r in res.data}
        people = [p for p in people if p[0] in null_slugs]
        print(f"Fill-meta: {len(people)} people with empty age_at_death")

    if not people:
        print("Nothing to generate.")
        return

    print(f"Generating content for {len(people)} biblical figures...")
    BATCH = 8
    done = 0

    for i in range(0, len(people), BATCH):
        batch = people[i:i+BATCH]
        print(f"\nBatch {i//BATCH+1}: {[p[1] for p in batch[:3]]}{'...' if len(batch)>3 else ''}")
        try:
            generated = with_retry(lambda b=batch: generate_batch(b), "Claude API")
        except Exception as e:
            print(f"  ERROR: {e}")
            time.sleep(5)
            continue

        gen_map = {g["slug"]: g for g in generated}
        rows = []
        for p in batch:
            g = gen_map.get(p[0], {})
        rows = []
        for p in batch:
            g = gen_map.get(p[0], {})
            rows.append({
                "slug":           p[0],
                "name_restored":  p[1],
                "name_hebrew":    p[2],
                "name_english":   p[3],
                "category":       p[4],
                "testament":      p[5],
                "first_mention":  p[6],
                "meaning_en":     g.get("meaning_en"),
                "meaning_nl":     g.get("meaning_nl"),
                "origin_en":      g.get("origin_en"),
                "origin_nl":      g.get("origin_nl"),
                "significance_en":g.get("significance_en"),
                "significance_nl":g.get("significance_nl"),
                "age_at_death":   g.get("age_at_death") if g.get("age_at_death") is not None else -1,  # -1 = generated but unknown/N/A
                "birthplace":     g.get("birthplace"),
                "father":         g.get("father"),
                "mother":         g.get("mother"),
                "extra_info_en":  g.get("extra_info_en"),
                "extra_info_nl":  g.get("extra_info_nl"),
                "angel_type":     ANGEL_TYPE_MAP.get(p[0]),
            })

        with_retry(
            lambda r=rows: sb.table("people").upsert(r, on_conflict="slug").execute(),
            "Supabase upsert"
        )
        done += len(rows)
        print(f"  ✓ {done} total upserted")
        time.sleep(2)

    print(f"\nDone — {done} people generated and upserted.")

if __name__ == "__main__":
    main()
