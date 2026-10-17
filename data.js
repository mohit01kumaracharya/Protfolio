// ==========================================================
// PLACEHOLDER DATA replace image/audio paths & text with your own
// ==========================================================

/*GAMES PART*/
const GAMES = [
  {
    id: "rdr2",
    name: "Red Dead Redemption 2",
    studio: "~ Rockstar Games",
    trailerUrl: "https://youtu.be/eaW0tYpxyp0",
    img: "https://imgs.search.brave.com/zK6YcviLbeYeSr-ZKOwhxlW5np29kAepDybHjWYGf6Q/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pLnBp/bmltZy5jb20vb3Jp/Z2luYWxzLzRlL2E5/L2EwLzRlYTlhMDE2/YzhmM2FlNTNmMmQ4/MWFlNTQ2MDk2OTI4/LmpwZw",
    desc: "Red Dead Redemption 2 is more than just a game, it is an unforgettable journey filled with loyalty, loss, and the harsh realities of the Wild West. With its breathtaking world and Arthur Morgan's story, it leaves a mark that stays with you long after the ride ends.",
    color: 25
  },
  {
    id: "sekiro",
    name: "Sekiro: Shadows Die Twice",
    studio: "~ FromSoftware",
    trailerUrl: "https://youtu.be/rXMX4YJ7Lks",
    img: "https://i.pinimg.com/1200x/bc/5e/11/bc5e11517bcb33e8d868ea77477f96ac.jpg",
    desc: "Sekiro: Shadows Die Twice is a brutal test of patience, precision, and determination. With intense sword fights, unforgiving bosses, and the way of the shinobi, every victory feels earned and every defeat teaches a lesson.",
    color: 355
  },
  {
    id: "tlou",
    name: "The Last of Us",
    studio: "~ Naughty Dog",
    trailerUrl: "https://youtu.be/WxjeV10H1F0",
    img: "https://i.pinimg.com/1200x/12/1c/7e/121c7e0ab80d424e86f59a37d9df040a.jpg",
    desc: "The Last of Us is an emotional journey through a world where survival comes at a cost and humanity is tested at every turn. With its unforgettable characters, powerful storytelling, and the bond between Joel and Ellie, it proves that even in a broken world, some connections are worth fighting for.",
    color: 40
  },
  {
    id: "ghost",
    name: "Ghost of Tsushima",
    studio: "~ Sucker Punch Productions",
    trailerUrl: "https://youtu.be/iqysmS4lxwQ",
    img: "https://i.pinimg.com/736x/c0/7f/3c/c07f3cc5d3b57387515cce0ac30df9a2.jpg",
    desc: "Ghost of Tsushima is a beautiful tale of honor, sacrifice, and the struggle between tradition and survival. With breathtaking landscapes, intense katana duels, and Jin Sakai's journey, every moment feels like stepping into a samurai legend.",
    color: 15
  },
  {
    id: "spiderman2",
    name: "Spiderman 2",
    studio: "~ Insomniac Games",
    trailerUrl: "https://youtu.be/bgqGdIoa52s",
    img: "https://i.pinimg.com/736x/8a/0d/c9/8a0dc928d63f36f5d6d7db5f8d802bf3.jpg",
    desc: "Marvel’s Spiderman 2 is an incredible mix of action, emotion, and the thrill of being a hero. Switching between Peter Parker and Miles Morales, swinging through New York, and facing powerful enemies makes every moment feel like living inside a Spiderman story.",
    color: 210
  },
  {
    id: "detroit",
    name: "Detroit: Become Human",
    studio: "~ Quantic Dream",
    trailerUrl: "https://youtu.be/_gJtihSt6a4",
    img: "https://i.pinimg.com/736x/b6/b2/22/b6b2224be54caaebe041852f495fef63.jpg",
    desc: "Detroit: Become Human is a thought provoking journey that explores humanity, freedom, and the choices that shape our future. With its branching storylines and unforgettable characters, every decision matters, making you question what it truly means to be human.",
    color: 195
  }
];

/*MOVIES PART*/
const MOVIES = [{
    id: "TSR",
    name: "The Shawshank Redemption",
    studio: "~ Castle Rock Entertainment",
    trailerUrl: "https://youtu.be/P9mwtI82k6E",
    img: "https://i.pinimg.com/1200x/9a/7c/3b/9a7c3b314ffb88781e69688622886895.jpg",
    desc: "The Shawshank Redemption is a powerful story of hope, patience, and the strength of the human spirit. It reminds us that even in the darkest moments, hope can keep us going and freedom begins with never giving up.",
    color: 25
  },
  {
    id: "FC",
    name: "Fight Club",
    studio: "~ 20th Century Fox",
    trailerUrl: "https://youtu.be/O1nDozs-LxI",
    img: "https://i.pinimg.com/736x/38/2e/b3/382eb34fabaa665bc9c4369410d75146.jpg",
    desc: "Fight Club is a mind-bending story that challenges identity, consumerism, and the meaning of freedom. With its dark atmosphere, unpredictable twists, and thought provoking philosophy, it leaves you questioning reality and the person you truly are.",
    color: 355
  },
  {
    id: "GF",
    name: "GOOD FELLAS",
    studio: "~ Warner Bros.",
    trailerUrl: "https://youtu.be/WVVxGJ7juj0",
    img: "https://i.pinimg.com/1200x/56/68/35/56683560bb2b008977d430604c951c9b.jpg",
    desc: "Goodfellas is a gripping dive into the world of organized crime, where loyalty, ambition, and power come with a dangerous price. With its iconic storytelling, unforgettable characters, and rise and fall journey, it shows how the dream of living like a gangster can turn into a nightmare.",
    color: 40
  },
  {
    id: "SI",
    name: "Shutter Island",
    studio: "~ Paramount Pictures",
    trailerUrl: "https://youtu.be/5iaYLCiq5RM",
    img: "https://i.pinimg.com/736x/25/6b/70/256b7098eef3e9071e766e74dbf1eda1.jpg",
    desc: "Shutter Island is a psychological thriller that blurs the line between reality and illusion. With its haunting atmosphere, unsettling mysteries, and mind bending twists, it keeps you questioning everything until the very end.",
    color: 15
  },
  {
    id: "TD",
    name: "The Godfather",
    studio: "~ Paramount Pictures",
    trailerUrl: "https://youtu.be/UaVTIH8mujA",
    img: "https://i.pinimg.com/736x/27/16/ee/2716ee42d6eac041f5d4e1a8630b3dc0.jpg",
    desc: "The Godfather is a timeless tale of power, loyalty, family, and the price of ambition. With its unforgettable characters, iconic dialogue, and masterful storytelling, it shows how power can shape a man and how protecting family can blur the line between love and darkness.",
    color: 210
  },
  {
    id: "interstellar",
    name: "Interstellar",
    studio: "~ Paramount Pictures",
    trailerUrl: "https://youtu.be/zSWdZVtXT7E",
    img: "https://i.pinimg.com/736x/ac/0d/4e/ac0d4edf91e59fe2c588b9417782886f.jpg",
    desc: "Interstellar is a breathtaking journey through space, time, and the power of human love. With its mind bending science, stunning visuals, and emotional story, it reminds us that even across galaxies and beyond time, some bonds are strong enough to transcend everything.",
    color: 195
  }
];

/*WEB-SERIES PART*/
const SERIES = [{
    id: "BB",
    name: "Breaking Bad",
    studio: "~ Sony Pictures Television",
    trailerUrl: "https://youtu.be/VFkjBy2b50Q",
    img: "https://i.pinimg.com/736x/3f/cb/47/3fcb474229a46b866e6a078686cd9407.jpg",
    desc: "Breaking Bad is a gripping journey of ambition, desperation, and the transformation of an ordinary man into someone unrecognizable. With brilliant storytelling, unforgettable characters, and morally complex choices, it shows how far a person can go when power and pride take control.",
    color: 25
  },
  {
    id: "BCS",
    name: "Better Call Saul",
    studio: "~ Sony Pictures Television",
    trailerUrl: "https://youtu.be/PjElOuIECdE",
    img: "https://i.pinimg.com/736x/dd/e5/f2/dde5f2d2331ac0efe9b5cdc62826b894.jpg",
    desc: "Better Call Saul is a brilliant story of ambition, moral compromises, and the making of a man who slowly loses himself along the way. With sharp dialogue, complex characters, and masterful storytelling, it shows how one small decision can change the course of an entire life.",
    color: 355
  },
  {
    id: "DARK",
    name: "Dark",
    studio: "~ Netflix",
    trailerUrl: "https://youtu.be/810CHvSdXOo",
    img: "https://i.pinimg.com/1200x/34/1d/2a/341d2a6ad5ec862da04ebb4d01807e55.jpg",
    desc: "Dark is a mind bending journey through time, secrets, and the endless connections between past, present, and future. With its complex mysteries, haunting atmosphere, and shocking revelations, it makes you question whether we control our destiny or are simply trapped in an endless loop.",
    color: 40
  },
  {
    id: "GOT",
    name: "Game of Thrones",
    studio: "~ Home Box Office",
    trailerUrl: "https://youtu.be/HvVkBlEGj7M",
    img: "https://i.pinimg.com/1200x/59/33/0b/59330b5db51a38322a2548ba5e2ef108.jpg",
    desc: "Game of Thrones is an epic tale of power, betrayal, loyalty, and the endless struggle for the Iron Throne. With unforgettable characters, ruthless politics, and a world where no one is truly safe, it proves that in the game of power, every choice comes with a price.",
    color: 15
  },
  {
    id: "radiation",
    name: "Chernobyl",
    studio: "~ Home Box Office",
    trailerUrl: "https://youtu.be/s9APLXM9Ei8",
    img: "https://i.pinimg.com/1200x/95/e9/a3/95e9a3c14a68d503875cfaf12eadf323.jpg",
    desc: "Chernobyl is a haunting portrayal of a real-life disaster that reveals the devastating cost of lies, negligence, and human error. With its chilling atmosphere and powerful storytelling, it shows how the truth can be buried, but the consequences of hiding it can be catastrophic.",
    color: 210
  },
  {
    id: "sopranos",
    name: "The Sopranos",
    studio: "~ Home Box Office",
    trailerUrl: "https://youtu.be/mJpNmYeooQE",
    img: "https://i.pinimg.com/1200x/8b/28/98/8b289875b10dc008cec6587b4f36551c.jpg",
    desc: "The Sopranos is a gripping blend of crime, family, and the psychological struggles of a man living two very different lives. With complex characters, dark humor, and raw storytelling, it explores the thin line between power, loyalty, and the demons we carry within ourselves.",
    color: 195
  }
];

/*ANIME PART*/
const ANIME = [{
    id: "AOT",
    name: "Attack on Titan",
    studio: "~ Wit Studio / MAPPA",
    trailerUrl: "https://youtu.be/sBLsE-NKEoI",
    img: "https://i.pinimg.com/736x/92/7f/34/927f34ddf723c727a838c4b25bb9b2f6.jpg",
    desc: "Attack on Titan is a dark, emotional journey filled with freedom, sacrifice, and the brutal reality of war. With unforgettable twists, complex characters, and a world full of secrets, it challenges the meaning of right and wrong and shows how far humanity can go for freedom.",
    color: 25
  },
  {
    id: "Monster",
    name: "Monster",
    studio: "~ Madhouse",
    trailerUrl: "https://youtu.be/m3Bsyozf_8I",
    img: "https://i.pinimg.com/1200x/58/aa/1c/58aa1c45febab8cb8663cf3c06448edd.jpg",
    desc: "Monster is a chilling psychological thriller that explores the darkest corners of human nature and the true meaning of evil. With its slow burning suspense, morally complex characters, and the terrifying presence of Johan Liebert, it leaves you questioning whether monsters are born or created by the world around them.",
    color: 355
  },
  {
    id: "Dragon Ball",
    name: "Dragon Ball",
    studio: "~ Toei Animation",
    trailerUrl: "https://youtu.be/W9W5CLUGjbU",
    img: "https://i.pinimg.com/736x/0f/40/ba/0f40baf73e08fa9e898491702df6679c.jpg",
    desc: "Dragon Ball is an iconic adventure fueled by epic battles, limitless growth, and the never ending pursuit of becoming stronger. From Goku’s cheerful spirit to legendary transformations, it reminds us that no matter how strong we become, there’s always another limit to break and another challenge to face.",
    color: 40
  },
  {
    id: "Naruto",
    name: "Naruto",
    studio: "~ Studio Pierrot",
    trailerUrl: "https://youtu.be/-G9BqkgZXRA",
    img: "https://i.pinimg.com/1200x/5f/c0/2b/5fc02b541b8496712a488759fb63ad28.jpg",
    desc: "Naruto is an inspiring journey of loneliness, friendship, and the relentless pursuit of one's dreams. Through Naruto's struggles, sacrifices, and determination to never give up, it teaches us that our past doesn't define us and that even the loneliest person can earn the world's respect.",
    color: 15
  },
  {
    id: "Bleach",
    name: "Bleach",
    studio: "~ Studio Pierrot",
    trailerUrl: "https://youtu.be/7B4rg4rotY0",
    img: "https://i.pinimg.com/736x/89/36/31/893631ffbab32ba3e0d288a81b7a8dda.jpg",
    desc: "Bleach is a thrilling blend of supernatural battles, inner strength, and the constant struggle to protect the people who matter most. With Ichigo's journey, iconic transformations, and unforgettable sword fights, it proves that true strength comes from having something worth fighting for.",
    color: 210
  },
  {
    id: "One Piece",
    name: "One Piece",
    studio: "~ Toei Animation",
    trailerUrl: "https://youtu.be/kGl_4NHa6uw",
    img: "https://i.pinimg.com/1200x/55/69/05/556905c203149521cdfc3445b0fbb974.jpg",
    desc: "One Piece is an unforgettable adventure about freedom, friendship, and chasing dreams no matter how impossible they seem. With Luffy’s fearless spirit, a crew that feels like family, and a world full of mysteries, it reminds us that the greatest treasure is the journey and the people we share it with.",
    color: 195
  }
];

/*CARTOON PART*/
const CARTOON = [{
    id: "Doraemon",
    name: "Doraemon",
    studio: "~ Shin-Ei Animation",
    trailerUrl: "https://youtu.be/rb5-4BMT4Ew",
    img: "https://i.pinimg.com/736x/d8/0e/a8/d80ea86b357d643d655183f8ed50ab2b.jpg",
    desc: "Doraemon is a heartwarming blend of childhood nostalgia, hilarious adventures, and futuristic gadgets that make every problem feel a little easier. From Nobita’s innocent struggles to Doraemon’s endless pocket of wonders, it reminds us of the simple joys, friendships, and dreams that make childhood unforgettable.",
    color: 25
  },
  {
    id: "shinchan",
    name: "Shinchan",
    studio: "~ Shin-Ei Animation",
    trailerUrl: "https://youtu.be/MBuFbWneTyk",
    img: "https://i.pinimg.com/736x/ec/51/4e/ec514e4927b24eb383afcbe63aa9fb0a.jpg",
    desc: "Shinchan is a hilarious mix of childhood nostalgia, innocent mischief, and comedy that never gets old. From his cheeky attitude to his crazy adventures with friends and family, he reminds us that sometimes, life is better when we stop taking everything so seriously and just enjoy the moment.",
    color: 355
  },
  {
    id: "B10",
    name: "Ben 10",
    studio: "~ Cartoon Network Studios",
    trailerUrl: "https://youtu.be/-PrnNgI3aOA",
    img: "https://i.pinimg.com/1200x/3b/25/74/3b2574313c4a257191fd4a3bf6537284.jpg",
    desc: "Ben 10 is a nostalgic adventure filled with alien transformations, thrilling battles, and the excitement of being a hero. With the Omnitrix unlocking incredible powers, Ben’s journey reminds us that being a hero isn’t just about having abilities, but knowing how to use them when it matters most.",
    color: 40
  },
  {
    id: "T&J",
    name: "Tom and Jerry",
    studio: "~ Hanna-Barbera",
    trailerUrl: "https://youtu.be/yvdPsHLbQRg",
    img: "https://i.pinimg.com/736x/86/23/59/862359e8d5bd074e50223cd45a7f2a21.jpg",
    desc: "Tom and Jerry is a timeless classic filled with hilarious chases, clever tricks, and endless chaos between a cat and a mouse. With their never ending rivalry and unforgettable comedy, they prove that sometimes the simplest stories create the happiest childhood memories.",
    color: 15
  },
  {
    id: "DOG",
    name: "Courage The Cowardly Dog",
    studio: "~ Cartoon Network Studios",
    trailerUrl: "https://youtu.be/zxz5_OlpbUI",
    img: "https://i.pinimg.com/736x/fe/30/09/fe3009b5f40751ef183bd8b6da63b4ef.jpg",
    desc: "Courage the Cowardly Dog is a strange yet unforgettable mix of childhood nostalgia, creepy mysteries, and dark humor. Despite being terrified of everything, Courage always finds the strength to protect Muriel, proving that true bravery isn’t about having no fear, but facing it for the ones you love.",
    color: 210
  },
  {
    id: "Fg",
    name: "Family Guy",
    studio: "~ 20th Television Animation",
    trailerUrl: "https://youtu.be/WJOAvttDJ-Q",
    img: "https://i.pinimg.com/1200x/99/72/b8/9972b8993268cc2e838378c2bec3112d.jpg",
    desc: "Family Guy is a wild mix of dark humor, absurd situations, and unapologetically chaotic comedy. With Peter’s ridiculous antics, Stewie’s twisted genius, and countless unexpected moments, it turns everyday life into something hilariously unpredictable.",
    color: 195
  }
];

/*MANGA PART*/
const MANGA = [{
    id: "20th Century Boys",
    name: "20th Century Boys",
    studio: "~ Shogakukan",
    trailerUrl: "https://youtu.be/1XvfZG642HY",
    img: "https://i.pinimg.com/736x/5d/9d/33/5d9d334e0a7e03df2f1accd38ad433d5.jpg",
    desc: "20th Century Boys is a gripping mystery that weaves childhood memories, conspiracy, and a terrifying vision of the future into one unforgettable story. With its layered plot, haunting secrets, and the mysterious figure known as Friend, it shows how the smallest childhood ideas can grow into something that changes the world.",
    color: 25
  },
  {
    id: "vagabond",
    name: "Vagabond",
    studio: "~ Kodansha",
    trailerUrl: "https://youtu.be/RZIR4G8IbHc",
    img: "https://i.pinimg.com/736x/18/98/5e/18985eeea7b97a3f31276561a7252425.jpg",
    desc: "Vagabond is a profound journey of self discovery, inner conflict, and the true meaning of strength. Through Musashi’s path from a ruthless warrior to a man seeking peace, it explores the idea that the greatest battle is not against others, but against the person we are within.",
    color: 355
  },
  {
    id: "Berserk",
    name: "Berserk",
    studio: "~ Hakusensha",
    trailerUrl: "https://youtu.be/H6dkuEdzaFY",
    img: "https://i.pinimg.com/736x/d1/87/f8/d187f86de135e0220597156a9a180464.jpg",
    desc: "Berserk is a dark and haunting tale of suffering, ambition, betrayal, and the relentless struggle against fate. Through Guts’ brutal journey, it explores the strength of the human spirit and the will to keep fighting, even when the world gives you every reason to break.",
    color: 40
  },
  {
    id: "Billy Bat",
    name: "Billy Bat",
    studio: "~ Kodansha",
    trailerUrl: "https://youtu.be/Mekj_DQ8Ppk",
    img: "https://i.pinimg.com/736x/71/9d/27/719d27739804da44fbf3a015d837b878.jpg",
    desc: "Billy Bat is a mind bending mystery that weaves conspiracy, history, and the hidden forces shaping humanity into one complex story. With its cryptic symbols, unexpected twists, and questions about truth and power, it makes you wonder how much of history is real and how much is carefully written.",
    color: 15
  },
  {
    id: "Pluto",
    name: "Pluto",
    studio: "~ Shogakukan",
    trailerUrl: "https://youtu.be/-o8T4c3oQ9s",
    img: "https://i.pinimg.com/736x/6a/9f/59/6a9f59445d9ab9aa53c7a46a030767bf.jpg",
    desc: "Pluto is a hauntingly beautiful story that explores humanity, artificial intelligence, and the true nature of hatred. With its gripping mystery, emotional depth, and thought provoking themes, it reminds us that even in a world filled with violence, the power to understand and forgive can be stronger than the desire for revenge.",
    color: 210
  },
  {
    id: "Fullmetal Alchemist",
    name: "Fullmetal Alchemist",
    studio: "~ Square Enix",
    trailerUrl: "https://youtu.be/-GoNo0DGroU",
    img: "https://i.pinimg.com/1200x/5d/08/8b/5d088b18e9d565e4243a371852ea76b6.jpg",
    desc: "Fullmetal Alchemist is a powerful journey of sacrifice, brotherhood, and the consequences of human ambition. Through Edward and Alphonse Elric’s quest to restore what they’ve lost, it explores the true cost of equivalent exchange and reminds us that some things are worth more than any price.",
    color: 20
  },
];

/*SPORTS PART*/
const SPORTS = [
  { id: "cricket", 
    name: "Cricket", 
    studio: "~ International Cricket Council",
    trailerUrl: "https://youtu.be/pQ5xEiZ-5IE",
    img: "https://i.pinimg.com/736x/9d/f1/f1/9df1f1ff0be5a876d9874dd927bc3118.jpg",  
    desc: "Cricket is more than just a sport; it’s a game of passion, patience, and unforgettable moments. From the thrill of a last over finish to the pride of representing a team, every match reminds us that one moment can change everything." ,
    color: 45
  },
  { id: "football", 
    name: "Football", 
    studio: "~ Federation Internationale de Football Association",
    trailerUrl: "https://youtu.be/JIodScTevto",
    img: "https://i.pinimg.com/736x/7a/b1/5b/7ab15bd731a215d7be21987ce3041775.jpg",  
    desc: "Football is a game of passion, skill, and moments that can turn an entire match upside down. From the roar of the crowd to the magic of a last minute goal, it’s a sport that brings people together and proves that every second on the pitch matters." ,
    color: 120
  },
  { id: "kabaddi",
    name: "Kabaddi", 
    studio: "~ International Kabaddi Federation",
    trailerUrl: "https://youtu.be/uunEiYArZds",
    img: "https://i.pinimg.com/736x/26/a6/7f/26a67fd2dd5a608a5e72d1995f07966a.jpg", 
    desc: "Kabaddi is a game of raw strength, sharp strategy, and fearless determination. Every raid and tackle is a battle of courage and teamwork, where a single move can change the game and every breath counts." ,
    color: 30
  },
  { id: "hockey",
    name: "Hockey", 
    studio: "~ Federation Internationale de Hockey",
    trailerUrl: "https://youtu.be/D7cjLJrCZ90",
    img: "https://i.pinimg.com/736x/39/33/d6/3933d6ef7c217e20c3d3d6df70e8a77a.jpg",  
    desc: "Hockey is a fast paced game of skill, teamwork, and relentless determination. Every pass, tackle, and goal reflects the spirit of the players, making it a sport where speed, precision, and fighting till the final whistle define the game." ,
    color: 240
  },
  { id: "motorsports",
    name: "Motorsports", 
    studio: "~ Federation Internationale de l'Automobile",
    trailerUrl: "https://youtu.be/BL2cPQ5L4Qw",
    img: "https://i.pinimg.com/736x/29/61/05/29610589e64e92d1138dc3cb2c5446d5.jpg", 
    desc: "Motorsports is the perfect blend of speed, precision, and adrenaline, where every second and every corner can make the difference. From the roar of the engines to the thrill of wheel to wheel battles, it celebrates the courage, skill, and relentless pursuit of victory." ,
    color: 150
  },
  { id: "wwe",
    name: "WWE", 
    studio: "~ World Wrestling Entertainment",
    trailerUrl: "https://youtu.be/MazCdAr6s04",
    img: "https://i.pinimg.com/736x/5f/a9/fe/5fa9fe0969f087ba902af7ef18a3ba31.jpg", 
    desc: "WWE is more than just wrestling it’s a spectacle of larger than life superstars, intense rivalries, and unforgettable moments. From jaw dropping moves to legendary entrances, it blends athleticism, drama, and entertainment into a show where every fight tells a story." ,
    color: 0
  }
];

/*HOBBIES PART*/
const HOBBIES = [
  { id: "gaming", 
    name: "Competitive Gaming", 
    img: "https://i.pinimg.com/1200x/2d/37/90/2d37905b7559a39e4841a396c226fa3e.jpg", 
    desc: "Competitive matches push my heart rate past 160 BPM in crunch moments whatever it takes, because I love the adrenaline in my veins. That rush is what keeps me hooked, and it has quietly taught me to stay calm and sharp under pressure." 
  },
  { id: "ideas", 
    name: "Wild Ideas & Imagination", 
    img: "https://i.pinimg.com/1200x/7d/31/9c/7d319cfc4e317c0a85e1e7f6861802fe.jpg", 
    desc: "I like exploring the random ideas and imaginative concepts that pop into my head. Some I research further just to see where they lead, and on occasion I let my intrusive thoughts take things forward always within limits." 
  },
  { id: "space", 
    name: "Space & Physics", 
    img: "https://i.pinimg.com/736x/c2/59/76/c25976b5f6f6c6a8a8615b2a3350d89c.jpg", 
    desc: "I'm genuinely curious about how the universe works from the mysteries of space down to everyday physics concepts. I'm no expert, but that curiosity keeps me reading and exploring a little more every day." 
  },
  { id: "comedy", 
    name: "Satirical Comedy", 
    img: "https://i.pinimg.com/736x/c4/fb/92/c4fb926b05e1a9ed0797b8b974e1b7b8.jpg", 
    desc: "I love listening to satirical humour as much as I enjoy delivering it. Satire is my natural way of looking at everyday situations finding the clever, funny angle in things most people scroll past." 
  },
  { id: "english", 
    name: "Language Self-Practice", 
    img: "https://i.pinimg.com/736x/7a/de/06/7ade0666808c9e485f7253cb8df33d0b.jpg", 
    desc: "I talk to myself in whichever language I'm learning, creating scenarios and full conversations in my head. It's a self-made practice, and it keeps steadily improving my fluency and communication." 
  },
  { id: "travelling", 
    name: "Travelling", 
    img: "https://i.pinimg.com/1200x/29/ad/b3/29adb3d01648148b2c4b2326db4e7ab8.jpg", 
    desc: "New roads, unfamiliar places and stories waiting to be found travelling resets my mind like nothing else. Every trip, planned or spontaneous, sends me back home with fresh energy and a head full of new ideas." 
  },
];

/* Per-title cinematic accent (verse opening animation + detail glow). */
const VERSE_THEMES = {
  "rdr2": "#d07843",
  "sekiro": "#c93a3a",
  "tlou": "#7a9a63",
  "ghost": "#d9b36c",
  "spiderman2": "#e23636",
  "detroit": "#4fa3d1",
  "TSR": "#7fa9c9",
  "FC": "#c94f5f",
  "GF": "#c9a227",
  "SI": "#6c7fd1",
  "TD": "#d9c05a",
  "interstellar": "#5a8fd9",
  "BB": "#3d8f5f",
  "BCS": "#d9a441",
  "DARK": "#8f9fb3",
  "GOT": "#a34d3d",
  "radiation": "#d9b13b",
  "sopranos": "#b3854f",
  "AOT": "#5f8f5a",
  "Monster": "#7f95a8",
  "Dragon Ball": "#f2b01e",
  "Naruto": "#f2762d",
  "Bleach": "#4fc3d9",
  "One Piece": "#d94f3d",
  "Doraemon": "#3d9fd1",
  "shinchan": "#f2c11e",
  "B10": "#5fa83d",
  "T&J": "#e0a63d",
  "DOG": "#a34dc9",
  "Fg": "#c94f4f",
  "20th Century Boys": "#c96f3d",
  "vagabond": "#8f7a4f",
  "Berserk": "#b3342e",
  "Billy Bat": "#d9b13b",
  "Pluto": "#6fb3c9",
  "Fullmetal Alchemist": "#d9642d",
  "cricket": "#4f8fb3",
  "football": "#3d8f5f",
  "kabaddi": "#c96f3d",
  "hockey": "#4f6fb3",
  "motorsports": "#d13434",
  "wwe": "#d9b13b"
};
