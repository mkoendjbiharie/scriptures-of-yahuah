#!/usr/bin/env python3
"""
Generate comprehensive biblical places data using Claude Haiku
and import into Supabase places table.

Usage:
  python scripts/generate_places.py            # generate all
  python scripts/generate_places.py --batch cities   # one category
  python scripts/generate_places.py --resume         # skip already imported

Requires: ANTHROPIC_API_KEY and SUPABASE_SERVICE_ROLE_KEY in .env.local
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

# ── Complete list of biblical places ─────────────────────────────────────────
# Organised by type. Tuple: (slug, restored_name, hebrew, english, type, testament, first_mention)
PLACES = [
  # CITIES & TOWNS — Israel / Canaan
  ("yerushalayim","Yerushalayim","יְרוּשָׁלַיִם","Jerusalem","city","both","Bereshit 14:18"),
  ("beyth-lehem","Bĕyth Leḥem","בֵּית לֶחֶם","Bethlehem","city","both","Bereshit 35:19"),
  ("hebron","Hĕḇron","חֶבְרוֹן","Hebron","city","old","Bereshit 13:18"),
  ("beyth-el","Bĕyth El","בֵּית אֵל","Bethel","city","old","Bereshit 12:8"),
  ("shechem","Shekem","שְׁכֶם","Shechem","city","both","Bereshit 12:6"),
  ("shiloh","Shiloh","שִׁלֹה","Shiloh","city","old","Yahusha 18:1"),
  ("yeriho","Yeriho","יְרִיחוֹ","Jericho","city","both","Bemidbar 22:1"),
  ("beersheba","Be'ĕr Sheḇa","בְּאֵר שֶׁבַע","Beersheba","city","both","Bereshit 21:14"),
  ("dan","Dan","דָּן","Dan","city","old","Bereshit 14:14"),
  ("samaria","Shomeron","שֹׁמְרוֹן","Samaria","city","both","Melakim A 16:24"),
  ("natsareth","Natsareth","נָצְרַת","Nazareth","city","new","Luqas 1:26"),
  ("kapharnah","Kapharnah","כְּפַר נַחוּם","Capernaum","city","new","MattithYahu 4:13"),
  ("beyth-tsaida","Bĕyth Tsaida","בֵּית צַיְדָה","Bethsaida","city","new","Yahuchanan 1:44"),
  ("tsiyon","Tsiyon","צִיּוֹן","Zion","city","both","Shemuel B 5:7"),
  ("gibeah","Giḇah","גִּבְעָה","Gibeah","city","old","Shophetim 19:12"),
  ("gibeon","Giḇeon","גִּבְעוֹן","Gibeon","city","old","Yahusha 9:3"),
  ("ashdod","Ashdod","אַשְׁדּוֹד","Ashdod","city","old","Yahusha 11:22"),
  ("ashqelon","Ashqelon","אַשְׁקְלוֹן","Ashkelon","city","old","Shophetim 1:18"),
  ("azzah","Azzah","עַזָּה","Gaza","city","both","Bereshit 10:19"),
  ("ekron","Eqron","עֶקְרוֹן","Ekron","city","old","Yahusha 13:3"),
  ("gath","Gath","גַּת","Gath","city","old","Yahusha 11:22"),
  ("megiddo","Megiddo","מְגִדּוֹ","Megiddo","city","both","Yahusha 12:21"),
  ("hazor","Hatsor","חָצוֹר","Hazor","city","old","Yahusha 11:1"),
  ("laish","Layish","לַיִשׁ","Laish/Dan","city","old","Shophetim 18:7"),
  ("arad","Arad","עֲרָד","Arad","city","old","Bemidbar 21:1"),
  ("tirzah","Tirtsah","תִּרְצָה","Tirzah","city","old","Yahusha 12:24"),
  ("lachish","Lakhish","לָכִישׁ","Lachish","city","old","Yahusha 10:3"),
  ("gezer","Gezer","גֶּזֶר","Gezer","city","old","Yahusha 10:33"),
  ("ramah","Ramah","רָמָה","Ramah","city","both","Yahusha 18:25"),
  ("mizpah","Mitspah","מִצְפָּה","Mizpah","city","old","Bereshit 31:49"),
  ("gilgal","Gilgal","גִּלְגָּל","Gilgal","city","old","Yahusha 4:19"),
  ("anathoth","Anathoth","עֲנָתוֹת","Anathoth","city","old","Yahusha 21:18"),
  ("emmaus","Emmaus","עמאוס","Emmaus","city","new","Luqas 24:13"),
  ("caesarea","Qesaryah","קֵיסָרְיָה","Caesarea","city","new","Ma'aseh 8:40"),
  ("antioch","Antioch","אנטיוכיה","Antioch","city","new","Ma'aseh 11:19"),
  ("ephesus","Ephesos","אֶפֶסוֹס","Ephesus","city","new","Ma'aseh 18:19"),
  ("corinth","Qorinth","קורינת","Corinth","city","new","Ma'aseh 18:1"),
  ("rome","Rome","רֹמִי","Rome","city","new","Ma'aseh 2:10"),
  ("athens","Athens","אֲתֵינַי","Athens","city","new","Ma'aseh 17:15"),
  ("philippi","Philippi","פִילִיפִּי","Philippi","city","new","Ma'aseh 16:12"),
  ("thessalonica","Thessalonike","תֶּסָּלוֹנִיקֶה","Thessalonica","city","new","Ma'aseh 17:1"),
  ("damascus","Dammesek","דַּמֶּשֶׂק","Damascus","city","both","Bereshit 14:15"),
  ("sidon","Tsidon","צִידוֹן","Sidon","city","both","Bereshit 10:15"),
  ("tyre","Tsor","צוֹר","Tyre","city","both","Yahusha 19:29"),
  ("joppa","Yapho","יָפוֹ","Joppa/Jaffa","city","both","Yahusha 19:46"),
  ("nineveh","Ninewe","נִינְוֵה","Nineveh","city","old","Bereshit 10:11"),

  # REGIONS
  ("galil","Galil","גָּלִיל","Galilee","region","both","Yahusha 20:7"),
  ("yahudah-region","Yahudah","יְהוּדָה","Judah/Judea","region","both","Bereshit 29:35"),
  ("shomeron-region","Shomeron","שֹׁמְרוֹן","Samaria","region","both","Melakim A 13:32"),
  ("bashan","Bashan","בָּשָׁן","Bashan","region","old","Bemidbar 21:33"),
  ("gilead","Gilead","גִּלְעָד","Gilead","region","old","Bereshit 31:21"),
  ("negev","Negev","נֶגֶב","Negev","region","old","Bereshit 12:9"),
  ("shephelah","Shephelah","שְׁפֵלָה","Shephelah (Lowland)","region","old","Yahusha 9:1"),
  ("sharon","Sharon","שָׁרוֹן","Sharon","region","old","Yahusha 12:18"),
  ("jezreel","Yizreel","יִזְרְעֶאל","Jezreel","region","old","Yahusha 17:16"),
  ("perea","Perea","פֵּרֵאָה","Perea (Beyond Jordan)","region","new","MattithYahu 19:1"),
  ("decapolis","Decapolis","דֶּקָּפּוֹלִיס","Decapolis","region","new","MattithYahu 4:25"),
  ("arabia","Arabia","עֲרָב","Arabia","region","both","Melakim A 10:15"),
  ("moab","Moab","מוֹאָב","Moab","region","old","Bereshit 19:37"),
  ("edom","Edom","אֱדוֹם","Edom","region","old","Bereshit 25:30"),
  ("ammon","Ammon","עַמּוֹן","Ammon","region","old","Bereshit 19:38"),
  ("philistia","Pelesheth","פְּלֶשֶׁת","Philistia","region","old","Shemoth 15:14"),
  ("canaan","Kena'an","כְּנַעַן","Canaan","region","old","Bereshit 9:18"),
  ("goshen","Goshen","גֹּשֶׁן","Goshen","region","old","Bereshit 45:10"),
  ("midian","Midyan","מִדְיָן","Midian","region","old","Bereshit 25:2"),

  # COUNTRIES / KINGDOMS
  ("mitsrayim","Mitsrayim","מִצְרַיִם","Egypt","country","both","Bereshit 10:6"),
  ("babel","Baḇel","בָּבֶל","Babylon","country","both","Bereshit 10:10"),
  ("ashur","Ashur","אַשּׁוּר","Assyria","country","old","Bereshit 10:11"),
  ("persia","Paras","פָּרַס","Persia","country","old","Dibre B 36:20"),
  ("greece","Yawan","יָוָן","Greece","country","both","Bereshit 10:2"),
  ("ethiopia","Kush","כּוּשׁ","Ethiopia/Cush","country","both","Bereshit 2:13"),
  ("libya","Put","פּוּט","Libya/Put","country","old","Bereshit 10:6"),
  ("ur","Ur","אוּר","Ur of the Chaldees","city","old","Bereshit 11:28"),
  ("haran","Haran","חָרָן","Haran","city","old","Bereshit 11:31"),

  # MOUNTAINS
  ("sinai","Sinai","סִינַי","Sinai/Horeb","mountain","old","Shemoth 16:1"),
  ("moriah","Moriyah","מוֹרִיָּה","Moriah","mountain","old","Bereshit 22:2"),
  ("ararat","Ararat","אֲרָרַט","Ararat","mountain","old","Bereshit 8:4"),
  ("carmel","Karmel","כַּרְמֶל","Carmel","mountain","old","Yahusha 12:22"),
  ("hermon","Hermon","חֶרְמוֹן","Hermon","mountain","both","Debarim 3:8"),
  ("tabor","Taḇor","תָּבוֹר","Tabor","mountain","both","Shophetim 4:6"),
  ("gilboa","Gilboa","גִּלְבֹּעַ","Gilboa","mountain","old","Shemuel A 28:4"),
  ("ebal","Eval","עֵיבָל","Ebal","mountain","old","Debarim 11:29"),
  ("gerizim","Gerizim","גְּרִזִּים","Gerizim","mountain","both","Debarim 11:29"),
  ("nebo","Neḇo","נְבוֹ","Nebo","mountain","old","Debarim 32:49"),
  ("olivet","Har HaZetim","הַר הַזֵּיתִים","Mount of Olives","mountain","both","Melakim B 23:13"),
  ("pisgah","Pisgah","פִּסְגָּה","Pisgah","mountain","old","Debarim 3:27"),
  ("zaphon","Tsaphon","צָפוֹן","Zaphon","mountain","old","Tehillim 48:2"),

  # RIVERS
  ("yarden","Yarden","יַרְדֵּן","Jordan","river","both","Bereshit 13:10"),
  ("nile","Ye'or","יְאֹר","Nile","river","old","Bereshit 41:1"),
  ("euphrates","Perat","פְּרָת","Euphrates","river","both","Bereshit 2:14"),
  ("tigris","Ḥiddeqel","חִדֶּקֶל","Tigris","river","old","Bereshit 2:14"),
  ("jabbok","Yabboq","יַבֹּק","Jabbok","river","old","Bereshit 32:22"),
  ("kishon","Qishon","קִישׁוֹן","Kishon","river","old","Shophetim 4:7"),
  ("arnon","Arnon","אַרְנוֹן","Arnon","river","old","Bemidbar 21:13"),
  ("pishon","Pishon","פִּישׁוֹן","Pishon","river","old","Bereshit 2:11"),
  ("gihon-river","Gihon","גִּיחוֹן","Gihon (Eden river)","river","old","Bereshit 2:13"),

  # SEAS & LAKES
  ("yam-suph","Yam Suph","יַם סוּף","Sea of Reeds (Red Sea)","sea","old","Shemoth 10:19"),
  ("salt-sea","Yam HaMelah","יָם הַמֶּלַח","Salt Sea (Dead Sea)","sea","old","Bereshit 14:3"),
  ("galilee-sea","Yam Kinneret","יָם כִּנֶּרֶת","Sea of Galilee","lake","both","Bemidbar 34:11"),
  ("great-sea","Yam HaGadol","הַיָּם הַגָּדוֹל","Great Sea (Mediterranean)","sea","old","Bemidbar 34:6"),

  # DESERTS / WILDERNESS
  ("sinai-desert","Midbar Sinai","מִדְבַּר סִינַי","Wilderness of Sinai","desert","old","Shemoth 19:1"),
  ("paran","Paran","פָּארָן","Paran","desert","old","Bereshit 21:21"),
  ("zin","Tsin","צִן","Zin","desert","old","Bemidbar 13:21"),
  ("shur","Shur","שׁוּר","Shur","desert","old","Bereshit 16:7"),
  ("negev-desert","Negev (Wilderness)","נֶגֶב","Negev Wilderness","desert","old","Bereshit 12:9"),
  ("judah-wilderness","Midbar Yahudah","מִדְבַּר יְהוּדָה","Wilderness of Judah","desert","both","Shophetim 1:16"),

  # VALLEYS
  ("kidron","Naḥal Qidron","נַחַל קִדְרוֹן","Kidron Valley","valley","both","Shemuel B 15:23"),
  ("hinnom","Gei Ben Hinnom","גֵּיא בֶן הִנֹּם","Hinnom Valley","valley","both","Yahusha 15:8"),
  ("jezreel-valley","Emeq Yizreel","עֵמֶק יִזְרְעֶאל","Valley of Jezreel","valley","old","Shophetim 6:33"),
  ("elah","Emeq HaElah","עֵמֶק הָאֵלָה","Valley of Elah","valley","old","Shemuel A 17:2"),
  ("achor","Emeq Akor","עֵמֶק עָכוֹר","Valley of Achor","valley","old","Yahusha 7:24"),

  # WELLS & SPRINGS
  ("en-gedi","En Gedi","עֵין גֶּדִי","En Gedi","well","old","Yahusha 15:62"),
  ("en-rogel","En Rogel","עֵין רֹגֵל","En Rogel","well","old","Yahusha 15:7"),
  ("beerlahairoi","Be'er Laḥai Roi","בְּאֵר לַחַי רֹאִי","Beer-lahai-roi","well","old","Bereshit 16:14"),

  # GARDENS & SPECIAL PLACES
  ("eden","Eden","עֵדֶן","Garden of Eden","region","old","Bereshit 2:8"),
  ("gethsemane","Gat Shemen","גַּת שֶׁמֶן","Gethsemane","region","new","MattithYahu 26:36"),
  ("golgotha","Gulgolta","גֻּלְגֹּלְתָּא","Golgotha","region","new","MattithYahu 27:33"),
  ("gehenna","Gei Hinnom","גֵּיהִנֹּם","Gehenna","region","new","MattithYahu 5:22"),
]

# ── EXPANDED PLACES (systematic expansion) ─────────────────────────────────
PLACES += [
  ("beyth-anyah","Bĕyth Anyah","בֵּית עַנְיָה","Bethany","city","new","Yahuchanan 11:1"),
  ("qanah-galil","Qanah","קָנָה","Cana of Galilee","city","new","Yahuchanan 2:1"),
  ("magdala","Migdal","מִגְדָּל","Magdala","city","new","MattithYahu 15:39"),
  ("korazin","Korazin","כּוֹרָזִין","Chorazin","city","new","MattithYahu 11:21"),
  ("tiberyah","Tiḇeryah","טִיבֶרְיָה","Tiberias","city","new","Yahuchanan 6:23"),
  ("arimathea","Ramathayim","רָמָתַיִם","Arimathea","city","new","MattithYahu 27:57"),
  ("lydda","Lod","לוֹד","Lydda / Lod","city","new","Ma'aseh 9:32"),
  ("ha-ay","Ha-Ay","הָעַי","Ai","city","old","Yahusha 7:2"),
  ("libnah","Liḇnah","לִבְנָה","Libnah","city","old","Yahusha 10:29"),
  ("eglon","Eglon","עֶגְלוֹן","Eglon","city","old","Yahusha 10:34"),
  ("debir","Deḇir","דְּבִיר","Debir","city","old","Yahusha 10:38"),
  ("makkedah","Maqqedah","מַקֵּדָה","Makkedah","city","old","Yahusha 10:10"),
  ("aphek","Apheq","אֲפֵק","Aphek","city","old","Yahusha 12:18"),
  ("taanach","Ta'anak","תַּעֲנַךְ","Taanach","city","old","Yahusha 12:21"),
  ("beyth-shean","Bĕyth She'an","בֵּית שְׁאָן","Beth-Shean","city","old","Yahusha 17:11"),
  ("dor","Dor","דֹּאר","Dor","city","old","Yahusha 12:23"),
  ("beyth-shemesh","Bĕyth Shemesh","בֵּית שֶׁמֶשׁ","Beth-Shemesh","city","old","Yahusha 15:10"),
  ("zorah","Tsor'ah","צָרְעָה","Zorah","city","old","Yahusha 15:33"),
  ("eshtaol","Eshta'ol","אֶשְׁתָּאוֹל","Eshtaol","city","old","Yahusha 15:33"),
  ("lehi","Leḥi","לֶחִי","Lehi","city","old","Shophetim 15:9"),
  ("ophrah","Ophrah","עָפְרָה","Ophrah (of Gideon)","city","old","Shophetim 6:11"),
  ("penuel","Penu'el","פְּנוּאֵל","Penuel","city","old","Bereshit 32:30"),
  ("succoth","Sukkoth","סֻכּוֹת","Succoth","city","old","Bereshit 33:17"),
  ("jabesh-gilead","Yaḇesh Gil'ad","יָבֵשׁ גִּלְעָד","Jabesh-Gilead","city","old","Shophetim 21:8"),
  ("mahanaim","Maḥanayim","מַחֲנַיִם","Mahanaim","city","old","Bereshit 32:2"),
  ("ziklag","Tsiqlag","צִקְלַג","Ziklag","city","old","Yahusha 15:31"),
  ("nob","Noḇ","נֹב","Nob (city of priests)","city","old","Shemuel A 21:1"),
  ("keilah","Qe'ilah","קְעִילָה","Keilah","city","old","Shemuel A 23:1"),
  ("en-dor","En Dor","עֵין דֹּאר","En-dor","city","old","Shemuel A 28:7"),
  ("zarephath","Tsarephath","צָרְפַת","Zarephath","city","old","Melakim A 17:9"),
  ("avel-bet-maakah","Aḇel Beit Ma'akah","אָבֵל בֵּית מַעֲכָה","Abel-beth-maacah","city","old","Shemuel B 20:14"),
  ("tekoa","Teqoa","תְּקוֹעַ","Tekoa","city","old","Shemuel B 14:2"),
  ("ramoth-gilead","Ramoth Gil'ad","רָמֹת גִּלְעָד","Ramoth-Gilead","city","old","Melakim A 4:13"),
  ("golan","Golan","גּוֹלָן","Golan","city","old","Debarim 4:43"),
  ("kedesh","Qedesh","קֶדֶשׁ","Kedesh","city","old","Yahusha 19:37"),
  ("adoraim","Adorayim","עֲדוֹרַיִם","Adoraim","city","old","Dibre B 11:9"),
  ("mareshah","Mareshah","מָרֵשָׁה","Mareshah","city","old","Yahusha 15:44"),
  ("azekah","Azeqah","עֲזֵקָה","Azekah","city","old","Yahusha 10:10"),
  ("sokho","Sokhoh","שׂוֹכֹה","Sokho / Socoh","city","old","Yahusha 15:35"),
  ("gerar","Gerar","גְּרָר","Gerar","city","old","Bereshit 10:19"),
  ("kadesh-barnea","Qadesh Barne'a","קָדֵשׁ בַּרְנֵעַ","Kadesh-Barnea","city","old","Bemidbar 32:8"),
  ("hormah","Ḥormah","חָרְמָה","Hormah","city","old","Bemidbar 14:45"),
  ("tamar-city","Tamar","תָּמָר","Tamar (city in Negev)","city","old","Yehezqel 47:19"),
  ("ezion-geber","Etsyon Geḇer","עֶצְיֹן גֶּבֶר","Ezion-geber","city","old","Melakim A 9:26"),
  ("susa","Shushan","שׁוּשָׁן","Susa (Shushan)","city","old","Nehemyah 1:1"),
  ("on-egypt","On","אֹן","On (Heliopolis, Egypt)","city","old","Bereshit 41:45"),
  ("no-amon","No Amon","נֹא אָמוֹן","No-Amon (Thebes)","city","old","Naḥum 3:8"),
  ("byblos","Geḇal","גְּבַל","Byblos / Gebal","city","old","Yehezqel 27:9"),
  ("carchemish","Karkemish","כַּרְכְּמִישׁ","Carchemish","city","old","YirmeYahu 46:2"),
  ("beyth-phage","Bĕyth Phage","בֵּית פַּגֵּי","Bethphage","city","new","MattithYahu 21:1"),
  ("nain","Nayin","נַיִן","Nain","city","new","Luqas 7:11"),
  ("sychar","Shekhar","שְׁכָר","Sychar","city","new","Yahuchanan 4:5"),
  ("caesarea-philippi","Qesaryah Philippi","קֵיסָרְיָה פִילִיפִּי","Caesarea Philippi","city","new","MattithYahu 16:13"),
  ("tarsus","Tarsus","טַרְסוּס","Tarsus","city","new","Ma'aseh 9:11"),
  ("derbe","Derbe","דֶּרְבֶּה","Derbe","city","new","Ma'aseh 14:6"),
  ("lystra","Lustra","לוּסְטְרָה","Lystra","city","new","Ma'aseh 14:6"),
  ("iconium","Ikonion","אִיקוֹנִיּוֹן","Iconium","city","new","Ma'aseh 13:51"),
  ("troas","Troas","טְרוֹאָס","Troas","city","new","Ma'aseh 16:8"),
  ("miletus","Miletos","מִילֵטוֹס","Miletus","city","new","Ma'aseh 20:15"),
  ("patmos","Patmos","פַּטְמוֹס","Patmos","city","new","Hazon 1:9"),
  ("colossae","Qolasim","קוֹלוֹסַי","Colossae","city","new","Qolasim 1:2"),
  ("laodicea","Laodiqeia","לָאוֹדִיקֵיָה","Laodicea","city","new","Hazon 3:14"),
  ("smyrna","Smurna","סְמוּרְנָה","Smyrna","city","new","Hazon 2:8"),
  ("pergamum","Pergamos","פֶּרְגָּמוֹן","Pergamum","city","new","Hazon 2:12"),
  ("thyatira","Thuateira","תִּיאָטֵירָה","Thyatira","city","new","Hazon 2:18"),
  ("sardis","Sardeis","סַרְדֵּיס","Sardis","city","new","Hazon 3:1"),
  ("philadelphia-asia","Philadelphia","פִילָדֶלְפְיָה","Philadelphia (Asia Minor)","city","new","Hazon 3:7"),
  ("berea","Beroia","בֵּרוֹיָה","Berea","city","new","Ma'aseh 17:10"),
  ("malta","Melitah","מֶלִיטָה","Malta (Melita)","city","new","Ma'aseh 28:1"),
  ("puteoli","Potioloi","פּוּטֵאוֹלִי","Puteoli","city","new","Ma'aseh 28:13"),
  ("seleucia","Seleuqeia","סֶלֶיּוּקֵיָה","Seleucia","city","new","Ma'aseh 13:4"),
  ("paphos","Paphos","פָּפוֹס","Paphos (Cyprus)","city","new","Ma'aseh 13:6"),
  ("salamis","Salamis","סָלָמִיס","Salamis (Cyprus)","city","new","Ma'aseh 13:5"),
  ("perga","Perge","פֶּרְגֶּה","Perga","city","new","Ma'aseh 13:13"),
  ("nicopolis","Nikopolis","נִיקוֹפּוֹלִיס","Nicopolis","city","new","Titos 3:12"),
  ("rhodes","Rhodos","רוֹדוֹס","Rhodes","city","new","Ma'aseh 21:1"),
  ("cos","Qos","קוֹס","Cos","city","new","Ma'aseh 21:1"),
  ("babel-city","Baḇel (city)","בָּבֶל","Babylon (city)","city","both","Bereshit 11:9"),
  ("erech","Erek","אֶרֶךְ","Erech (Uruk)","city","old","Bereshit 10:10"),
  ("accad","Akkad","אַכַּד","Accad","city","old","Bereshit 10:10"),
  ("calneh","Kalneh","כַּלְנֵה","Calneh","city","old","Bereshit 10:10"),
  ("achzib","Akhziḇ","אַכְזִיב","Achzib","city","old","Yahusha 15:44"),
  ("idumea","Edom / Idumea","אֱדוֹם","Idumea","region","both","Marqus 3:8"),
  ("trachonitis","Trachonitis","טְרָכוֹנִיטִיס","Trachonitis","region","new","Luqas 3:1"),
  ("ituraea","Iturea","אִיטוּרֵאָה","Ituraea","region","new","Luqas 3:1"),
  ("abilene","Aḇilene","אֲבִילֵנֶה","Abilene","region","new","Luqas 3:1"),
  ("phoenicia","Phoinike","פוֹינִיקֶה","Phoenicia","region","both","Ma'aseh 11:19"),
  ("galatia","Galatia","גָּלַטְיָה","Galatia","region","new","Galatiyim 1:2"),
  ("bithynia","Bithynia","בִּיתֻנְיָה","Bithynia","region","new","Ma'aseh 16:7"),
  ("cappadocia","Kappadokia","כַּפַּדּוֹקְיָה","Cappadocia","region","new","Ma'aseh 2:9"),
  ("pontus","Pontos","פּוֹנְטוֹס","Pontus","region","new","Ma'aseh 2:9"),
  ("cilicia","Kiliqia","קִילִיקְיָה","Cilicia","region","new","Ma'aseh 6:9"),
  ("pamphylia","Pamphylia","פַּמְפוּלְיָה","Pamphylia","region","new","Ma'aseh 2:10"),
  ("pisidia","Pisidia","פִּיסִידִיָה","Pisidia","region","new","Ma'aseh 13:14"),
  ("lycaonia","Lukaonia","לוּקָאוֹנְיָה","Lycaonia","region","new","Ma'aseh 14:6"),
  ("mysia","Musia","מוּסְיָה","Mysia","region","new","Ma'aseh 16:7"),
  ("hauran","Ḥawran","חַוְרָן","Hauran","region","old","Yehezqel 47:16"),
  ("aram","Aram","אֲרָם","Aram (Syria)","region","old","Bereshit 10:22"),
  ("seir","Se'ir","שֵׂעִיר","Seir","region","old","Bereshit 14:6"),
  ("mount-seir","Har Se'ir","הַר שֵׂעִיר","Mount Seir","mountain","old","Bereshit 14:6"),
  ("mount-hor","Har Hor","הַר הֹר","Mount Hor","mountain","old","Bemidbar 20:22"),
  ("mount-ephraim","Har Ephrayim","הַר אֶפְרַיִם","Hill Country of Ephraim","mountain","old","Yahusha 17:15"),
  ("mount-paran","Har Paran","הַר פָּארָן","Mount Paran","mountain","old","Ḥaḇaqquk 3:3"),
  ("mount-zion","Har Tsiyon","הַר צִיּוֹן","Mount Zion","mountain","both","Tehillim 48:1"),
  ("mount-halak","Har HaḤalaq","הַר הֶחָלָק","Mount Halak","mountain","old","Yahusha 11:17"),
  ("mount-mizar","Har Mitsar","הַר מִצְעָר","Mount Mizar","mountain","old","Tehillim 42:6"),
  ("brook-cherith","Naḥal Kerith","נַחַל כְּרִית","Brook Cherith","river","old","Melakim A 17:3"),
  ("brook-besor","Naḥal Besor","נַחַל בְּשׂוֹר","Brook Besor","river","old","Shemuel A 30:9"),
  ("nahal-eshkol","Naḥal Eshkol","נַחַל אֶשְׁכֹּל","Nahal Eshcol","river","old","Bemidbar 13:23"),
  ("river-gozan","Nahar Gozan","נַהַר גּוֹזָן","River Gozan","river","old","Melakim B 17:6"),
  ("sihor","Shiḥor","שִׁיחוֹר","Shihor (eastern branch of Nile)","river","old","Yahusha 13:3"),
  ("jacobs-well","Be'er Ya'aqoḇ","בְּאֵר יַעֲקֹב","Jacob's Well","well","new","Yahuchanan 4:6"),
  ("pool-siloam","Berekat Shiloaḥ","בְּרֵכַת שִׁילֹחַ","Pool of Siloam","well","new","Yahuchanan 9:7"),
  ("pool-bethesda","Berekat Bet Ḥesda","בְּרֵכַת בֵּית חֶסְדָּא","Pool of Bethesda","well","new","Yahuchanan 5:2"),
  ("en-harod","En Ḥarod","עֵין חֲרֹד","En-harod","well","old","Shophetim 7:1"),
  ("marah","Marah","מָרָה","Marah (bitter waters)","well","old","Shemoth 15:23"),
  ("elim","Elim","אֵילִם","Elim (twelve springs)","well","old","Shemoth 15:27"),
  ("wilderness-etham","Midbar Etham","מִדְבַּר אֵתָם","Wilderness of Etham","desert","old","Shemoth 13:20"),
  ("wilderness-sin","Midbar Sin","מִדְבַּר סִין","Wilderness of Sin","desert","old","Shemoth 16:1"),
  ("rephidim","Rephidim","רְפִידִים","Rephidim","desert","old","Shemoth 17:1"),
  ("wilderness-maon","Midbar Ma'on","מִדְבַּר מָעוֹן","Wilderness of Maon","desert","old","Shemuel A 23:24"),
  ("valley-shaveh","Emeq Shaweh","עֵמֶק שָׁוֵה","Valley of Shaveh (King's Valley)","valley","old","Bereshit 14:17"),
  ("valley-rephaim","Emeq Repha'im","עֵמֶק רְפָאִים","Valley of Rephaim","valley","old","Yahusha 15:8"),
  ("armageddon","Har Megiddo","הַר מְגִדּוֹ","Armageddon (Har Megiddo)","valley","new","Hazon 16:16"),
  ("plain-of-dura","Biqa Dura","בִּקְעַת דוּרָא","Plain of Dura","valley","old","Daniyel 3:1"),
  ("upper-room","Aliyah","עֲלִיָּה","Upper Room (Pentecost)","region","new","Ma'aseh 1:13"),
  ("mishkan","Mishkan","מִשְׁכָּן","Mishkan (Tabernacle)","region","old","Shemoth 25:9"),
  ("temple-mount","Har HaBayit","הַר הַבַּיִת","Temple Mount","region","both","Dibre B 3:1"),
  ("praetorium","Praetorium","פְּרַיְטוֹרִיּוּם","Praetorium","region","new","Yahuchanan 18:28"),
  ("crete","Krete","כְּרֵטֶה","Crete","region","new","Ma'aseh 27:7"),
  ("cyprus","Kuppros","קֻפְּרוֹס","Cyprus","region","new","Ma'aseh 4:36"),
  ("media","Madai","מָדַי","Media","region","old","Bereshit 10:2"),
  ("elam","Elam","עֵילָם","Elam","region","old","Bereshit 10:22"),
  ("shinar","Shin'ar","שִׁנְעָר","Shinar (Mesopotamia)","region","old","Bereshit 10:10"),
  ("tarshish","Tarshish","תַּרְשִׁישׁ","Tarshish","region","old","Bereshit 10:4"),
  ("ophir","Ophir","אוֹפִיר","Ophir (source of gold)","region","old","Melakim A 9:28"),
  ("havila","Ḥawilah","חֲוִילָה","Havilah","region","old","Bereshit 2:11"),
]

# ── COMPREHENSIVE EXPANSION: all thin categories ─────────────────────────────
PLACES += [
  ("yisrael-nation","Yisra'ĕl","יִשְׂרָאֵל","Yisra'el (the nation)","country","both","Bereshit 32:28"),
  ("yahudah-kingdom","Yahudah","יְהוּדָה","Kingdom of Yahudah","country","old","Melakim A 12:20"),
  ("chaldea","Kasdim","כַּשְׂדִּים","Chaldea","country","old","Bereshit 11:28"),
  ("hamath","Ḥamath","חֲמָת","Hamath","country","old","Bemidbar 34:8"),
  ("aram-syria","Aram","אֲרָם","Aram (Syria)","country","old","Bereshit 10:22"),
  ("sheba-nation","Sheḇa","שְׁבָא","Sheba (kingdom of the queen)","country","old","Melakim A 10:1"),
  ("dedan","Dedan","דְּדָן","Dedan","country","old","Bereshit 10:7"),
  ("magog","Magog","מָגוֹג","Magog","country","both","Bereshit 10:2"),
  ("gomer-nation","Gomer","גֹּמֶר","Gomer","country","old","Bereshit 10:2"),
  ("togarmah","Togarmah","תּוֹגַרְמָה","Togarmah","country","old","Bereshit 10:3"),
  ("tubal-nation","Tuḇal","תֻּבַל","Tubal","country","old","Bereshit 10:2"),
  ("meshech","Meshek","מֶשֶׁךְ","Meshech","country","both","Bereshit 10:2"),
  ("javan","Yawan","יָוָן","Javan (Ionia / Greece)","country","old","Bereshit 10:2"),
  ("kittim","Kittim","כִּתִּים","Kittim (Cyprus / Rome)","country","both","Bereshit 10:4"),
  ("tiras","Tiras","תִּירָס","Tiras","country","old","Bereshit 10:2"),
  ("lud","Lud","לוּד","Lud (Lydia)","country","old","Bereshit 10:22"),
  ("aram-naharaim-country","Aram Naharayim","אֲרַם נַהֲרַיִם","Aram-Naharaim (Mesopotamia)","country","old","Bereshit 24:10"),
  ("rome-empire","Rome","רֹמִי","Roman Empire","country","new","Luqas 2:1"),
  ("pathros","Pathros","פַּתְרוֹס","Pathros (Upper Egypt)","country","old","YeshaYahu 11:11"),
  ("cush-nation","Kush","כּוּשׁ","Cush (Nubia/Sudan)","country","both","Bereshit 10:6"),
  ("put-nation","Put","פּוּט","Put (Libya)","country","old","Bereshit 10:6"),
  ("mizraim","Mitsrayim","מִצְרַיִם","Mizraim (Egypt — the people/land)","country","old","Bereshit 10:6"),
  ("canaan-nation","Kena'an","כְּנַעַן","Canaan (nation of Canaan)","country","old","Bereshit 9:22"),
  ("philistia-nation","Pelesheth","פְּלֶשֶׁת","Philistia (nation)","country","old","Shemoth 15:14"),
  ("edom-nation","Edom","אֱדוֹם","Edom (nation of Esau)","country","old","Bereshit 36:1"),
  ("moab-nation","Moaḇ","מוֹאָב","Moab (nation)","country","old","Bereshit 19:37"),
  ("ammon-nation","Ammon","עַמּוֹן","Ammon (nation)","country","old","Bereshit 19:38"),
  ("midian-nation","Midyan","מִדְיָן","Midian (nation)","country","old","Bereshit 25:2"),
  ("amalek","Amaleq","עֲמָלֵק","Amalek (nation; enemy of Israel)","country","old","Shemoth 17:8"),
  ("hivites","Ḥiwwi","חִוִּי","Hivites","country","old","Bereshit 10:17"),
  ("jebusites","Yeḇusi","יְבוּסִי","Jebusites (original inhabitants of Jerusalem)","country","old","Bereshit 10:16"),
  ("perizzites","Perizzi","פְּרִזִּי","Perizzites","country","old","Bereshit 13:7"),
  ("girgashites","Girgashi","גִּרְגָּשִׁי","Girgashites","country","old","Bereshit 10:16"),
  ("amorites","Emori","אֱמֹרִי","Amorites","country","old","Bereshit 10:16"),
  ("hittites","Ḥitti","חִתִּי","Hittites","country","old","Bereshit 10:15"),
  ("sidon-nation","Tsidon","צִידוֹן","Sidon (Phoenician nation)","country","old","Bereshit 10:15"),
  ("seba","Seḇa","סְבָא","Seba","country","old","Bereshit 10:7"),
  ("havilah-nation","Ḥawilah","חֲוִילָה","Havilah (nation of gold)","country","old","Bereshit 10:7"),
  ("sabtah","Saḇtah","סַבְתָּה","Sabtah","country","old","Bereshit 10:7"),
  ("raamah","Ra'mah","רַעְמָה","Raamah","country","old","Bereshit 10:7"),
  ("sabteca","Saḇteka","סַבְתְּכָא","Sabteca","country","old","Bereshit 10:7"),
  ("adriatic","Yam Adria","יָם אַדְרִיָּה","Adriatic Sea","sea","new","Ma'aseh 27:27"),
  ("sea-of-jazer","Yam Ya'zer","יָם יַעְזֵר","Sea of Jazer","sea","old","YirmeYahu 48:32"),
  ("sea-of-chinnereth","Yam Kinneret","יָם כִּנֶּרֶת","Sea of Chinnereth (Galilee)","sea","old","Bemidbar 34:11"),
  ("upper-sea","Yam HaAḥaron","הַיָּם הָאַחֲרוֹן","Upper/Western Sea","sea","old","Debarim 11:24"),
  ("sea-of-arabah","Yam HaAraḇah","יָם הָעֲרָבָה","Sea of the Arabah","sea","old","Debarim 3:17"),
  ("sea-of-reeds-east","Yam Suph (east)","יַם סוּף","Sea of Reeds — eastern branch","sea","old","Melakim A 9:26"),
  ("pontus-sea","Yam Pontos","יָם פּוֹנְטוֹס","Pontus (Black Sea)","sea","new","Kepha A 1:1"),
  ("lake-huleh","Yam Ḥuleh","יָם חוּלֶה","Lake Huleh (Waters of Merom)","lake","old","Yahusha 11:5"),
  ("waters-merom","Mei Merom","מֵי מֵרוֹם","Waters of Merom","lake","old","Yahusha 11:5"),
  ("lake-tiberias","Yam Tiḇeryah","יָם טִיבֶרְיָה","Lake Tiberias (Sea of Galilee)","lake","new","Yahuchanan 6:1"),
  ("mount-horeb","Ḥoreḇ","חֹרֵב","Horeb (Sinai; Elijah's mountain)","mountain","old","Shemoth 3:1"),
  ("mount-amana","Amana","אֲמָנָה","Amana","mountain","old","Shir 4:8"),
  ("mount-senir","Senir","שְׂנִיר","Senir (Amorite name for Hermon)","mountain","old","Debarim 3:9"),
  ("mount-zalmon","Tsalmon","צַלְמוֹן","Zalmon (dark mountain near Shechem)","mountain","old","Shophetim 9:48"),
  ("mount-gaash","Ga'ash","גַּעַשׁ","Gaash (Joshua's burial place)","mountain","old","Yahusha 24:30"),
  ("mount-heres","Ḥeres","חֶרֶס","Mount Heres","mountain","old","Shophetim 1:35"),
  ("mount-baalah","Ba'alah","בַּעֲלָה","Baalah (border of Judah)","mountain","old","Yahusha 15:11"),
  ("mount-jearim","Ye'arim","יְעָרִים","Mount Jearim","mountain","old","Yahusha 15:10"),
  ("mount-halakah","HaḤalaqah","הַחֲלָקָה","Mount Halakah (smooth mountain)","mountain","old","Yahusha 11:17"),
  ("mount-scopus","Har HaTsophim","הַר הַצּוֹפִים","Mount Scopus","mountain","both","Shemuel B 15:32"),
  ("mount-transfig","Har HaShikhlul","הַר הַהִשְׁתַּנּוּת","Mount of Transfiguration","mountain","new","MattithYahu 17:1"),
  ("mount-beatitudes","Har HaBerakoth","הַר הַבְּרָכוֹת","Mount of Beatitudes","mountain","new","MattithYahu 5:1"),
  ("mount-gerizim-nt","Har Gerizim","הַר גְּרִזִּים","Mount Gerizim (Samaritan worship)","mountain","both","Yahuchanan 4:20"),
  ("mount-bashan","Har Bashan","הַר בָּשָׁן","Mountain of Bashan","mountain","old","Tehillim 68:15"),
  ("mount-carmel-nt","Karmel","כַּרְמֶל","Carmel (NT reference)","mountain","both","Melakim A 18:19"),
  ("abana","Aḇanah","אֲבָנָה","Abana (river of Damascus)","river","old","Melakim B 5:12"),
  ("pharpar","Pharpar","פַּרְפַּר","Pharpar (river of Damascus)","river","old","Melakim B 5:12"),
  ("chebar","Keḇar","כְּבָר","Chebar (Ezekiel's visions in Babylon)","river","old","Yehezqel 1:1"),
  ("ulai","Ulai","אוּלַי","Ulai (river; Daniel's vision)","river","old","Daniyel 8:2"),
  ("wadi-zered","Naḥal Zered","נַחַל זֶרֶד","Wadi Zered","river","old","Bemidbar 21:12"),
  ("nahal-sorek","Naḥal Sorek","נַחַל שׂוֹרֵק","Nahal Sorek (Samson territory)","river","old","Shophetim 16:4"),
  ("river-egypt","Naḥal Mitsrayim","נַחַל מִצְרַיִם","River of Egypt (Wadi el-Arish)","river","old","Bereshit 15:18"),
  ("wadi-besor","Naḥal Besor","נַחַל בְּשׂוֹר","Wadi Besor","river","old","Shemuel A 30:9"),
  ("wadi-cherith","Naḥal Kerith","נַחַל כְּרִית","Wadi Cherith (Elijah)","river","old","Melakim A 17:3"),
  ("gihon-spring","Gihon (spring)","גִּיחוֹן","Gihon Spring (Jerusalem)","river","old","Melakim A 1:33"),
  ("wadi-eshcol","Naḥal Eshkol","נַחַל אֶשְׁכּוֹל","Wadi Eshcol","river","old","Bemidbar 13:23"),
  ("wadi-jabbok","Naḥal Yabboq","נַחַל יַבֹּק","Wadi Jabbok (Jacob wrestled Elohim)","river","old","Bereshit 32:22"),
  ("wilderness-beersheba","Midbar Be'er Sheḇa","מִדְבַּר בְּאֵר שֶׁבַע","Wilderness of Beer-sheba","desert","old","Bereshit 21:14"),
  ("wilderness-kedemoth","Midbar Qedemoth","מִדְבַּר קְדֵמוֹת","Wilderness of Kedemoth","desert","old","Debarim 2:26"),
  ("wilderness-edom","Midbar Edom","מִדְבַּר אֱדוֹם","Wilderness of Edom","desert","old","Melakim B 3:8"),
  ("wilderness-tekoa","Midbar Teqoa","מִדְבַּר תְּקוֹעַ","Wilderness of Tekoa","desert","old","Dibre B 20:20"),
  ("arabah","HaAraḇah","הָעֲרָבָה","The Arabah (Jordan Rift Valley)","desert","both","Debarim 1:1"),
  ("wilderness-horeb","Midbar Ḥoreḇ","מִדְבַּר חֹרֵב","Wilderness of Horeb","desert","old","Melakim A 19:8"),
  ("wilderness-judah-nt","Midbar Yahudah","מִדְבַּר יְהוּדָה","Wilderness of Judah (Yoḥanan's ministry)","desert","new","MattithYahu 3:1"),
  ("wilderness-temptation","Midbar HaNisayon","מִדְבַּר הַנִּסָּיוֹן","Wilderness of Temptation (40 days)","desert","new","MattithYahu 4:1"),
  ("valley-sorek","Emeq Sorek","עֵמֶק שׂוֹרֵק","Valley of Sorek (Samson and Delilah)","valley","old","Shophetim 16:4"),
  ("valley-eshcol","Emeq Eshkol","עֵמֶק אֶשְׁכּוֹל","Valley of Eshcol","valley","old","Bemidbar 13:23"),
  ("valley-salt","Gei HaMelaḥ","גֵּיא הַמֶּלַח","Valley of Salt","valley","old","Shemuel B 8:13"),
  ("valley-berachah","Emeq Berakah","עֵמֶק בְּרָכָה","Valley of Berachah (blessing)","valley","old","Dibre B 20:26"),
  ("valley-jehoshaphat","Emeq Yahoshaphat","עֵמֶק יְהוֹשָׁפָט","Valley of Jehoshaphat","valley","old","Yoel 3:2"),
  ("valley-decision","Emeq HaḤarutsim","עֵמֶק הֶחָרוּץ","Valley of Decision","valley","old","Yoel 3:14"),
  ("valley-ono","Biqat Ono","בִּקְעַת אוֹנוֹ","Plain of Ono","valley","old","Nehemyah 6:2"),
  ("plains-moab","Arvoth Moaḇ","עַרְבוֹת מוֹאָב","Plains of Moab","valley","old","Bemidbar 22:1"),
  ("valley-gibeon","Gib'on","גִּבְעוֹן","Valley of Gibeon","valley","old","YeshaYahu 28:21"),
  ("valley-craftsmen","Gei HaḤarashim","גֵּיא הַחֲרָשִׁים","Valley of Craftsmen","valley","old","Nehemyah 11:35"),
  ("plain-sharon","Biqat Sharon","בִּקְעַת שָׁרוֹן","Plain of Sharon","valley","old","Dibre A 5:16"),
  ("en-mishpat","En Mishpat","עֵין מִשְׁפָּט","En-mishpat (Kadesh)","well","old","Bereshit 14:7"),
  ("beer-numbers","Be'er","בְּאֵר","Beer (Yahuah's gift of water)","well","old","Bemidbar 21:16"),
  ("rehoboth-well","Reḥoḇoth","רְחֹבוֹת","Rehoboth (well of room)","well","old","Bereshit 26:22"),
  ("esek-well","Eseq","עֵשֶׂק","Esek (contention well)","well","old","Bereshit 26:20"),
  ("sitnah-well","Sitnah","שִׂטְנָה","Sitnah (opposition well)","well","old","Bereshit 26:21"),
  ("en-gannim","En Gannim","עֵין גַּנִּים","En-gannim (spring of gardens)","well","old","Yahusha 19:21"),
  ("en-tappuah","En Tappuaḥ","עֵין תַּפּוּחַ","En-tappuah (spring of the apple)","well","old","Yahusha 17:7"),
  ("en-rimmon","En Rimmon","עֵין רִמּוֹן","En-rimmon (pomegranate spring)","well","old","Yahusha 15:32"),
  ("miriam-well","Be'er Miryam","בְּאֵר מִרְיָם","Well of Miriam","well","old","Bemidbar 20:1"),
  ("cyprus-island","Kuppros","קֻפְּרוֹס","Cyprus","island","both","Ma'aseh 4:36"),
  ("crete-island","Krete","כְּרֵטֶה","Crete","island","new","Ma'aseh 27:7"),
  ("patmos-island","Patmos","פַּטְמוֹס","Patmos (where Hazon was revealed)","island","new","Hazon 1:9"),
  ("malta-island","Melitah","מֶלִיטָה","Malta (Paul shipwrecked)","island","new","Ma'aseh 28:1"),
  ("rhodes-island","Rhodos","רוֹדוֹס","Rhodes","island","new","Ma'aseh 21:1"),
  ("cos-island","Qos","קוֹס","Cos","island","new","Ma'aseh 21:1"),
  ("samothrace","Samothrace","סָמוֹתְרָקֶה","Samothrace","island","new","Ma'aseh 16:11"),
  ("chios","Khios","כִּיּוֹס","Chios","island","new","Ma'aseh 20:15"),
  ("samos","Samos","סָמוֹס","Samos","island","new","Ma'aseh 20:15"),
  ("cauda","Kauda","כַּאוּדָה","Cauda (Clauda)","island","new","Ma'aseh 27:16"),
  ("sheep-gate","Sha'ar HaTson","שַׁעַר הַצֹּאן","Sheep Gate (Jerusalem)","gate","both","Nehemyah 3:1"),
  ("fish-gate","Sha'ar HaDagim","שַׁעַר הַדָּגִים","Fish Gate (Jerusalem)","gate","old","Nehemyah 3:3"),
  ("valley-gate","Sha'ar HaGai","שַׁעַר הַגַּיְא","Valley Gate (Jerusalem)","gate","old","Nehemyah 3:13"),
  ("dung-gate","Sha'ar HaAshpoth","שַׁעַר הָאַשְׁפֹּת","Dung Gate (Jerusalem)","gate","old","Nehemyah 3:14"),
  ("fountain-gate","Sha'ar HaAyin","שַׁעַר הָעַיִן","Fountain Gate (Jerusalem)","gate","old","Nehemyah 3:15"),
  ("water-gate","Sha'ar HaMayim","שַׁעַר הַמַּיִם","Water Gate (Jerusalem)","gate","old","Nehemyah 3:26"),
  ("horse-gate","Sha'ar HaSusim","שַׁעַר הַסּוּסִים","Horse Gate (Jerusalem)","gate","old","Nehemyah 3:28"),
  ("east-gate","Sha'ar HaMizraḥ","שַׁעַר הַמִּזְרָח","East Gate (Jerusalem)","gate","old","Nehemyah 3:29"),
  ("inspection-gate","Sha'ar HaMiphqad","שַׁעַר הַמִּפְקָד","Inspection Gate (Jerusalem)","gate","old","Nehemyah 3:31"),
  ("beautiful-gate","Sha'ar HaYapheh","שַׁעַר הַיָּפֶה","Beautiful Gate (Temple)","gate","new","Ma'aseh 3:2"),
  ("golden-gate","Sha'ar HaZahaḇ","שַׁעַר הַזָּהָב","Golden Gate (Eastern Temple Gate)","gate","both","Yehezqel 44:1"),
  ("nicanor-gate","Sha'ar Niqanor","שַׁעַר נִיקָנוֹר","Nicanor Gate (inner Temple)","gate","new","Ma'aseh 3:2"),
]

SYSTEM_PROMPT = """You are a biblical scholar specialising in Hebrew language, ancient geography, and Scripture.
Generate detailed, accurate content for biblical places. Keep it reverent, scholarly, and accessible.
Always use the restored Hebrew name (e.g. Yahuah not LORD, Yahusha not Jesus, Mosheh not Moses, Yisra'el not Israel).
Return ONLY valid JSON — no markdown, no prose outside the JSON."""

# ── EXTRA-CANONICAL PLACES ───────────────────────────────────────────────────
PLACES += [
  # ── MACCABEES ────────────────────────────────────────────────────────────
  ("modein","Modein","מוֹדִעִין","Modein (Mattathias' hometown)","city","old","Maqqabim A 2:1"),
  ("emmaus","Emmaus","עֵמָּאוּס","Emmaus (site of Maccabean battle)","city","both","Maqqabim A 3:40"),
  ("antioch","Antioch","אַנְטִיּוֹכְיָה","Antioch (Seleucid capital)","city","both","Maqqabim A 3:37"),
  ("beth-zur","Beit Tsur","בֵּית צוּר","Beth-Zur (Maccabean fortress)","city","old","Maqqabim A 4:29"),
  ("beth-horon","Beit Ḥoron","בֵּית חוֹרוֹן","Beth-Horon (battle site)","city","old","Maqqabim A 3:16"),
  ("mizpah-mac","Mitspa (Maccabees)","מִצְפָּה","Mizpah (assembly site)","city","old","Maqqabim A 3:46"),
  ("ptolemais","Ptolemais","תּוֹלְמַיִס","Ptolemais (Acco / Acre)","city","both","Maqqabim A 5:15"),
  ("gazara","Gazara","גָּזָרָה","Gazara (Gezer, Maccabean fortress)","city","old","Maqqabim A 4:15"),
  ("akra","Akra","אַקְרָא","Akra (Seleucid citadel in Jerusalem)","city","old","Maqqabim A 1:33"),

  # ── JUDITH ───────────────────────────────────────────────────────────────
  ("bethulia","Bethulia","בֵּית אֵלָה","Bethulia (city Judith defended)","city","old","Yahudith 4:6"),
  ("betomesthaim","Betomesthaim","בֵּית מֵישְׁתַּיִם","Betomesthaim (near Esdraelon)","city","old","Yahudith 4:6"),
  ("nineveh-judith","Nineveh","נִינְוֵה","Nineveh (Holofernes' base)","city","old","Yahudith 1:1"),
  ("ecbatana","Ecbatana","אֶקְבָּטָנָה","Ecbatana (Median capital)","city","old","Yahudith 1:1"),

  # ── TOBIT ────────────────────────────────────────────────────────────────
  ("nineveh-tobit","Nineveh (Toḇiyah)","נִינְוֵה","Nineveh (where Tobit lived in exile)","city","old","Tobiyah 1:3"),
  ("rages","Rages","רָגֵס","Rages of Media (where Gabael lived)","city","old","Tobiyah 1:14"),
  ("ecbatana-tobit","Ecbatana (Toḇiyah)","אֶקְבָּטָנָה","Ecbatana (where Raguel lived)","city","old","Tobiyah 3:7"),

  # ── ENOCH ────────────────────────────────────────────────────────────────
  ("mount-hermon","Har Ḥermon","הַר חֶרְמוֹן","Mount Hermon (where Watchers descended)","mountain","old","Ḥanok 6:6"),
  ("abil-main","Aḇel Mayin","אָבֵל מַיִם","Abel-Main (where Enoch mourned)","city","old","Ḥanok 13:9"),
  ("paradise-enoch","Gan Eden","גַּן עֵדֶן","Garden of Eden / Paradise (Enoch's vision)","region","old","Ḥanok 32:3"),
  ("sheol-enoch","She'ol","שְׁאוֹל","Sheol (realm of the dead, Enoch's vision)","region","old","Ḥanok 22:1"),

  # ── JUBILEES ─────────────────────────────────────────────────────────────
  ("mount-sinai-jub","Har Sinai (Yobelim)","הַר סִינַי","Mount Sinai (where Jubilees was revealed)","mountain","old","Yobelim 1:1"),
  ("eden-jub","Gan Eden (Yobelim)","גַּן עֵדֶן","Garden of Eden (Jubilees narrative)","region","old","Yobelim 2:7"),
  ("mount-lubar","Har Lubar","הַר לוּבָר","Mount Lubar (where Noah's ark rested)","mountain","old","Yobelim 5:28"),
  ("tower-babel-jub","Migdal Baḇel","מִגְדַּל בָּבֶל","Tower of Babel (in Jubilees account)","city","old","Yobelim 10:18"),

  # ── SIRACH / WISDOM ──────────────────────────────────────────────────────
  ("alexandria","Alexandria","אֲלֶכְסַנְדְּרִיָּה","Alexandria (where Sirach was translated)","city","old","Sira prologue"),
  ("memphis","Memphis","נֹף","Memphis / Noph (mentioned in Wisdom)","city","old","Ḥakmah 19:3"),

  # ── TESTAMENTS OF THE PATRIARCHS ─────────────────────────────────────────
  ("aram-naharaim","Aram Naharayim","אֲרַם נַהֲרַיִם","Aram-Naharaim (homeland of the Patriarchs)","region","old","Bereshit 24:10"),
  ("luz-bethel","Luz / Beit El","לוּז","Luz (renamed Bethel by Jacob)","city","old","Bereshit 28:19"),
  ("dothan","Dothan","דֹּתָן","Dothan (where Joseph was sold)","city","old","Bereshit 37:17"),
  ("timnah","Timnah","תִּמְנָה","Timnah (Samson's wife, also Judah's story)","city","old","Bereshit 38:12"),
  ("adullam","Adullam","עֲדֻלָּם","Adullam (Judah's friend's city; David's cave)","city","old","Bereshit 38:1"),

  # ── 1 & 2 ESDRAS ─────────────────────────────────────────────────────────
  ("casiphia","Kasiphia","כָּסִפְיָא","Casiphia (where Levites were found)","city","old","Ezra 8:17"),
  ("ahava","Ahava","אַהֲוָא","Ahava (river; gathering point for return)","city","old","Ezra 8:15"),
]

def generate_place_data(batch: list) -> list[dict]:
    """Generate EN and NL content for a batch of places."""
    place_list = []
    for p in batch:
        place_list.append({
            "slug": p[0],
            "name_restored": p[1],
            "name_hebrew": p[2],
            "name_english": p[3],
            "type": p[4],
            "first_mention": p[6],
        })

    prompt = f"""Generate content for these {len(batch)} biblical places. Return a JSON array where each object has:
- slug (from input)
- location_en: 1-2 sentences on geographical location in ancient times
- location_nl: Dutch translation of location_en
- meaning_en: meaning/etymology of the name (start with the meaning in quotes, then explanation)
- meaning_nl: Dutch translation of meaning_en
- origin_en: 2-4 sentences on the place's biblical history and origin
- origin_nl: Dutch translation of origin_en
- significance_en: 2-3 sentences on theological/prophetic significance
- significance_nl: Dutch translation of significance_en
- modern_name: the modern name of this place or feature. Examples by type — city: "Jericho / Ariha"; mountain: "Mount Hermon"; river: "Jordan River"; country: "Iraq"; region: "Sinai Peninsula"; sea: "Dead Sea". Use null ONLY if the site is completely lost/unknown.
- modern_country: the modern country or countries where it is located (e.g. "Israel", "Turkey", "Iraq", "Syria/Lebanon/Israel border") or null if unknown
- modern_location: 1-2 sentences on where this place exists today. ALL types (cities, mountains, rivers, regions, seas, deserts) should have this. Be specific. Use phrases like "Confirmed as...", "Widely identified as...", "Traditionally located at...", "Debated — possibly..." or "Location unknown — possibly..."
- location_certainty: one of exactly: "confirmed" (archaeologically or geographically verified), "likely" (strong scholarly consensus), "uncertain" (debated among scholars), "symbolic" (mythical/heavenly, no physical site)
- archaeology: 1-2 sentences on notable archaeological findings or excavations. For natural features (rivers, mountains, seas) note any relevant inscriptions or ancient references that confirm identification. Use null only if truly nothing notable.

Places:
{json.dumps(place_list, ensure_ascii=False, indent=2)}"""

    msg = claude.messages.create(
        model="claude-haiku-4-5-20251001",
        max_tokens=8000,
        system=SYSTEM_PROMPT,
        messages=[{"role": "user", "content": prompt}],
    )
    raw = msg.content[0].text.strip()

    # Extract JSON array
    match = re.search(r'\[[\s\S]*\]', raw)
    if not match:
        print(f"  WARNING: no JSON array found in response")
        return []
    return json.loads(match.group())


def generate_place_meta(batch: list) -> list[dict]:
    """Lightweight prompt: only the 5 new meta fields. Keeps response small to avoid truncation."""
    import json as _json, re as _re
    place_list = [{"slug": p[0], "name_restored": p[1], "name_english": p[3], "type": p[4]} for p in batch]
    prompt = (
        f"For each place below return a JSON array. Each object has ONLY these 6 fields:\n"
        "- slug (unchanged from input)\n"
        "- modern_name: current name (e.g. city: \"Jericho / Ariha\"; mountain: \"Mount Hermon\"; river: \"Jordan River\"; sea: \"Dead Sea\"; country: \"Iraq\"; region: \"Sinai Peninsula\"). null only if truly lost.\n"
        "- modern_country: current country/countries. null if unknown.\n"
        "- modern_location: 1-2 sentences where it exists today. ALL types must have this. Use \"Confirmed as...\", \"Widely identified as...\", \"Traditionally located at...\", \"Debated — possibly...\" or \"Location unknown — possibly...\".\n"
        "- location_certainty: one of exactly: confirmed / likely / uncertain / symbolic\n"
        "- archaeology: 1-2 sentences on notable findings or ancient inscriptions. null if none.\n"
        "Return ONLY valid JSON array, no markdown.\n\n"
        f"Places:\n{_json.dumps(place_list, ensure_ascii=False)}"
    )
    msg = claude.messages.create(
        model="claude-haiku-4-5-20251001",
        max_tokens=3000,
        system=SYSTEM_PROMPT,
        messages=[{"role": "user", "content": prompt}],
    )
    raw = msg.content[0].text.strip()
    match = _re.search(r'\[[\s\S]*\]', raw)
    if not match:
        print("  WARNING: no JSON array found in meta response")
        return []
    try:
        return _json.loads(match.group())
    except Exception as e:
        print(f"  WARNING: JSON parse error: {e}")
        return []


def upsert_places(rows: list[dict]):
    sb.table("places").upsert(rows, on_conflict="slug").execute()


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--batch", help="Only run a specific type: city|mountain|river|sea|desert|region|country|valley|well")
    parser.add_argument("--resume", action="store_true", help="Skip already-imported slugs")
    parser.add_argument("--fill-meta", dest="fill_meta", action="store_true", help="Re-run only places where modern_name is NULL")
    parser.add_argument("--check", action="store_true", help="Show how many places still need meta, grouped by type. No generation.")
    args = parser.parse_args()

    if args.check:
        res = sb.table("places").select("type,slug").is_("modern_name", "null").limit(10000).execute()
        if not res.data:
            print("✅ All places have meta info — nothing to generate.")
        else:
            from collections import Counter
            counts = Counter(r["type"] for r in res.data)
            print(f"⚠️  {len(res.data)} places still missing modern_name:")
            for t, n in sorted(counts.items(), key=lambda x: -x[1]):
                print(f"   {t:15} {n}")
            print("\nRun: python scripts/generate_places.py --fill-meta")
        return

    # Filter by type if requested
    places = PLACES
    if args.batch:
        places = [p for p in PLACES if p[4] == args.batch]
        print(f"Filtered to {len(places)} places of type '{args.batch}'")

    # Get already-imported slugs if resuming
    existing = set()
    if args.resume:
        res = sb.table("places").select("slug").limit(10000).execute()
        existing = {r["slug"] for r in res.data}
        places = [p for p in places if p[0] not in existing]
        print(f"Resuming: {len(places)} places remaining (slug not yet in DB)")

    # --fill-meta: only re-run places where new meta columns are still NULL
    if args.fill_meta:
        res = sb.table("places").select("slug").is_("modern_name", "null").limit(10000).execute()
        null_slugs = {r["slug"] for r in res.data}
        places = [p for p in places if p[0] in null_slugs]
        print(f"Fill-meta: {len(places)} places with empty modern_name")

    if not places:
        print("Nothing to generate.")
        return

    # Hardcoded meta for symbolic/lost places that Haiku correctly returns null for
    SYMBOLIC_META = {
        "eden":            {"modern_name": "Symbolic / Heavenly", "modern_country": None, "modern_location": "The Garden of Eden is described as a primordial paradise. Its physical location is unknown and likely symbolic — no archaeological site has been identified.", "location_certainty": "symbolic", "archaeology": None},
        "paradise-enoch":  {"modern_name": "Symbolic / Heavenly", "modern_country": None, "modern_location": "Paradise as described in Ḥanok is a heavenly or eschatological realm, not a physical location on earth.", "location_certainty": "symbolic", "archaeology": None},
        "eden-jub":        {"modern_name": "Symbolic / Heavenly", "modern_country": None, "modern_location": "As in Yobelim (Jubilees), the Garden of Eden is treated as a sacred primordial realm. No physical location is identified.", "location_certainty": "symbolic", "archaeology": None},
        "sheol-enoch":     {"modern_name": "Symbolic / Spiritual realm", "modern_country": None, "modern_location": "She'ol in Ḥanok refers to the realm of the dead — a spiritual dimension, not a geographic location.", "location_certainty": "symbolic", "archaeology": None},
        "pishon":          {"modern_name": "Unknown", "modern_country": None, "modern_location": "The Pishon is one of the four rivers of Eden. Its location is unknown and debated — proposed identifications include the Ganges, the Indus, or a now-dry Arabian river channel.", "location_certainty": "uncertain", "archaeology": None},
        "ophir":           {"modern_name": "Unknown", "modern_country": None, "modern_location": "Ophir's location is one of the great biblical mysteries — proposals include southern Arabia, Somalia, India, and Zimbabwe. No identification has been confirmed.", "location_certainty": "uncertain", "archaeology": None},
        "sea-of-jazer":    {"modern_name": "Unknown", "modern_country": "Jordan (likely)", "modern_location": "The Sea of Jazer is mentioned only once and its location is uncertain. It was likely a lake or marshland near the city of Yazer in the Gilead region of modern Jordan.", "location_certainty": "uncertain", "archaeology": None},
        "perizzites":      {"modern_name": "Ancient Kena'an (dispersed)", "modern_country": "Israel / West Bank", "modern_location": "The Perizzites were one of the seven nations of Kena'an. They had no fixed territory and lived scattered through the hill country. No distinct archaeological marker identifies them.", "location_certainty": "uncertain", "archaeology": None},
        "girgashites":     {"modern_name": "Ancient Kena'an (dispersed)", "modern_country": "Israel / West Bank", "modern_location": "The Girgashites are listed among the seven nations of Kena'an but their specific territory is unknown. They disappear from the historical record after the conquest.", "location_certainty": "uncertain", "archaeology": None},
        "sabtah":          {"modern_name": "Unknown", "modern_country": "Yemen or East Africa (proposed)", "modern_location": "Sabtah (son of Kush) represents a nation or people whose location is uncertain. Proposed identifications include Shabwah in Yemen or a site in East Africa.", "location_certainty": "uncertain", "archaeology": None},
        "havila":          {"modern_name": "Unknown", "modern_country": "Arabia or East Africa (proposed)", "modern_location": "Havilah is associated with the region encircled by the Pishon river in Bereshit 2. Its exact location is unknown — proposals include the Arabian Peninsula, the Horn of Africa, or a now-lost region.", "location_certainty": "uncertain", "archaeology": None},
    }

    is_meta_only = args.fill_meta
    BATCH_SIZE = 5 if is_meta_only else 10
    # Apply hardcoded symbolic/unknown meta directly, remove from API batch
    if is_meta_only:
        stubborn = [p for p in places if p[0] in SYMBOLIC_META]
        places   = [p for p in places if p[0] not in SYMBOLIC_META]
        for p in stubborn:
            meta = SYMBOLIC_META[p[0]]
            sb.table("places").update(meta).eq("slug", p[0]).execute()
            print(f"  ✓ Hardcoded meta for {p[0]}")

    print(f"Generating {'meta-only' if is_meta_only else 'full content'} for {len(places)} places (batch={BATCH_SIZE})...")
    total_imported = 0

    for i in range(0, len(places), BATCH_SIZE):
        batch = places[i:i+BATCH_SIZE]
        slugs = [p[0] for p in batch]
        print(f"\nBatch {i//BATCH_SIZE + 1}: {', '.join(slugs[:3])}{'...' if len(slugs)>3 else ''}")

        try:
            generated = generate_place_meta(batch) if is_meta_only else generate_place_data(batch)
        except Exception as e:
            print(f"  ERROR generating: {e}")
            time.sleep(5)
            continue

        gen_map = {g["slug"]: g for g in generated}
        rows = []
        for p in batch:
            slug = p[0]
            g = gen_map.get(slug, {})
            if is_meta_only:
                if not g:
                    continue  # skip failed — don't overwrite with nulls
                rows.append({
                    "slug":               slug,
                    "modern_name":        g.get("modern_name"),
                    "modern_country":     g.get("modern_country"),
                    "modern_location":    g.get("modern_location"),
                    "location_certainty": g.get("location_certainty"),
                    "archaeology":        g.get("archaeology"),
                })
            else:
                rows.append({
                    "slug":               slug,
                    "name_restored":      p[1],
                    "name_hebrew":        p[2],
                    "name_english":       p[3],
                    "type":               p[4],
                    "testament":          p[5],
                    "first_mention":      p[6],
                    "location_en":        g.get("location_en",""),
                    "location_nl":        g.get("location_nl",""),
                    "meaning_en":         g.get("meaning_en",""),
                    "meaning_nl":         g.get("meaning_nl",""),
                    "origin_en":          g.get("origin_en",""),
                    "origin_nl":          g.get("origin_nl",""),
                    "significance_en":    g.get("significance_en",""),
                    "significance_nl":    g.get("significance_nl",""),
                    "modern_name":        g.get("modern_name"),
                    "modern_country":     g.get("modern_country"),
                    "modern_location":    g.get("modern_location"),
                    "location_certainty": g.get("location_certainty"),
                    "archaeology":        g.get("archaeology"),
                })

        if rows:
            if is_meta_only:
                # UPDATE only — avoids NOT NULL constraint on name_restored etc.
                for row in rows:
                    slug = row.pop("slug")
                    sb.table("places").update(row).eq("slug", slug).execute()
            else:
                upsert_places(rows)
        total_imported += len(rows)
        pct = min((i + BATCH_SIZE) / len(places) * 100, 100)
        print(f"  [{pct:.0f}%] {total_imported} places processed")
        time.sleep(1.5)

    print(f"\nDone — {total_imported} places stored.")


if __name__ == "__main__":
    main()
