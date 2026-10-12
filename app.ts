/* ============ TYPES ============ */
type PointTag = 'rule' | 'watch' | 'tip';
interface TeachPoint { tag: PointTag; title: string; text: string; }
interface RefTable { title: string; headers: string[]; rows: string[][]; note?: string; }
interface Example { fr: string; en: string; }
interface QuizQuestion { q: string; opts: string[]; correct: number; explain: string; }
interface Challenge { prompt: string; answer: string; note: string; }
interface VocabItem { fr: string; en: string; }
interface CoreModule {
  id: string; num: number; fr: string; en: string; intro: string;
  points: TeachPoint[]; tables?: RefTable[]; examples: Example[];
  quiz: QuizQuestion[]; challenges?: Challenge[]; vocab: VocabItem[];
}
type SkillType = 'reading' | 'writing' | 'usoffrench' | 'dictee';
interface SkillSection { id: string; num: number; fr: string; en: string; type: SkillType; }
type Section = CoreModule | SkillSection;
interface SectionProgress {
  answers?: (number | null)[];
  correct?: number;
  total?: number;
  inputs?: string[];
}
type Progress = Record<string, SectionProgress>;

function $<T extends HTMLElement = HTMLElement>(id: string): T {
  return document.getElementById(id) as T;
}

/* ============ CONTENT DATA ============ */
const coreModules: CoreModule[] = [
  {
    id:'m1', num:1, fr:'Les Verbes I — Les Temps du Quotidien', en:'Verbs I — The Everyday Tenses',
    intro:"These are the tenses you'll use in literally every answer you write — get them fast and automatic, not just 'technically correct'.",
    points:[
      {tag:'rule', title:'Three verb families', text:"Every regular verb falls into one of three squads: -er (parle, parles, parle, parlons, parlez, parlent), -ir (finis, finis, finit, finissons, finissez, finissent), or -re (vends, vends, vend, vendons, vendez, vendent). Learn the pattern once and you've basically got hundreds of verbs sorted in one go."},
      {tag:'watch', title:'The usual suspects', text:"être (to be), avoir (to have), aller (to go), faire (to do/make), venir (to come), prendre (to take), mettre (to put), voir (to see), savoir (to know a fact or how to do something), pouvoir (to be able to/can), vouloir (to want), devoir (to have to/must) — these are the verbs you'll lean on in almost every sentence, and none of them play by the regular rules. Get them automatic, not just 'looked up when needed'."},
      {tag:'tip', title:"Spelling-change -er verbs aren't truly irregular", text:"espérer (to hope), préférer (to prefer), répéter (to repeat) (é → è) and essayer (to try), payer (to pay), employer (to use/employ) (y → i) look scary but are just regular -er verbs where the last vowel shifts before a silent ending. It only happens in je/tu/il/ils — nous and vous keep the original spelling because their endings are pronounced: j'espère (I hope) but nous espérons (we hope)."},
      {tag:'watch', title:'Boot verbs: the shape that explains the pattern', text:"Draw a line around just je, tu, il/elle/on and ils/elles on a present-tense table — skipping over nous and vous in the middle — and the shape you trace looks like a boot (une botte). That's not decoration: those four 'boot' forms very often share one stem, while nous and vous share a calmer, separate stem. Once you can see the boot, a huge chunk of French's so-called irregular present tense stops looking random."},
      {tag:'rule', title:'Stem-changing -er verbs are boot verbs too', text:"acheter (to buy) → j'achète, but nous achetons. appeler (to call) → j'appelle, but nous appelons. lever (to lift/raise) → je lève, but nous levons. payer (to pay) → je paie, but nous payons. Same mechanism as espérer and essayer above — a spelling change (an added accent, a doubled consonant, or a swapped letter) that only shows up inside the boot."},
      {tag:'tip', title:"You've already met irregular boot verbs", text:"Look back at the irregular tables above: venir (to come) — je viens... ils viennent, but nous venons; prendre (to take) — je prends... ils prennent, but nous prenons; devoir (to have to) — je dois... ils doivent, but nous devons; boire (to drink) — je bois... ils boivent, but nous buvons. Same boot shape, same logic — the stem changes for je/tu/il/ils and calms back down for nous/vous."},
      {tag:'rule', title:'What makes a verb reflexive', text:"A reflexive verb is one where the action bounces back onto the person doing it — the subject does something to or for themselves. se laver (to wash oneself) literally means the washer and the person being washed are the same person. You can spot one in a dictionary because its infinitive starts with se, or s' before a vowel: se laver, s'habiller (to get dressed), se lever (to get up)."},
      {tag:'rule', title:'The reflexive pronoun changes with the subject', text:"Each subject pronoun has its own matching reflexive pronoun: je↔me, tu↔te, il/elle/on↔se, nous↔nous, vous↔vous, ils/elles↔se. It sits directly in front of the verb and moves everywhere with it: je me lave (I wash myself), tu te laves (you wash yourself), elle se lave (she washes herself) — including in questions and negatives: tu ne te laves pas (you don't wash yourself), est-ce que tu te laves ? (do you wash yourself?)."},
      {tag:'watch', title:"Not every se-verb is literally reflexive", text:"Some pronominal verbs aren't truly 'doing it to themselves' — se souvenir de (to remember), s'appeler (to be called), se moquer de (to make fun of) just happen to use the same me/te/se pattern without a literal reflexive meaning. There's also a reciprocal use meaning 'each other': s'aimer (to love each other), se parler (to speak to each other) — only possible with a plural or nous/vous subject."},
      {tag:'tip', title:'Reflexive + perfect tense: a sharper look at agreement', text:"Every reflexive verb takes être in compound tenses, and the past participle normally agrees with the subject: elle s'est levée (she got up), ils se sont couchés (they went to bed). That agreement vanishes, though, if the reflexive pronoun is indirect rather than direct: elles se sont parlé (they spoke to each other) has no agreement, because parler à takes an indirect object — a genuinely advanced distinction worth having ready."},
      {tag:'rule', title:'Two flavours of future', text:"Futur proche (present tense of aller + infinitive) is for something about to happen: je vais partir. Futur simple (infinitive, or an irregular stem, + -ai, -as, -a, -ons, -ez, -ont) is for something further down the line: je parlerai, elle finira, nous vendrons."},
      {tag:'watch', title:"Aller doesn't follow its own rule", text:"Confusingly, aller's futur simple stem isn't built from its infinitive at all — it's the irregular ir-: j'irai, tu iras, elle ira. Sixteen common verbs do this; see the full stem table below."},
      {tag:'rule', title:'Perfect tense: pick your auxiliary', text:"Passé composé = avoir or être (in the present) + past participle. Most verbs go with avoir. A small squad of movement and state verbs, plus absolutely every reflexive verb, go with être instead — and once you use être, the participle has to agree with the subject: elle est allée, ils sont partis."},
      {tag:'watch', title:'Irregular past participles to bank', text:"être → été, avoir → eu, faire → fait, prendre → pris, mettre → mis, voir → vu, savoir → su, pouvoir → pu, vouloir → voulu, devoir → dû, venir → venu, ouvrir → ouvert, écrire → écrit, dire → dit, lire → lu, boire → bu, connaître → connu, courir → couru, croire → cru, recevoir → reçu, partir → parti. These show up constantly, so don't leave them to chance in the exam — the full conjugation table below drills the ones you'll use most."},
      {tag:'tip', title:"Imperfect: the 'used to' tense", text:"Take the nous-form of the present tense, drop the -ons, and add -ais, -ais, -ait, -ions, -iez, -aient. It's the tense for descriptions, habits and anything that was ongoing in the past: il faisait beau, nous jouions tous les jours. Almost every verb, however irregular in the present, behaves itself here — être is the one genuine exception, with the stem ét- instead of the somm- you'd expect from nous sommes."}
    ],
    tables:[
      {title:"Present tense: regular verb endings", headers:["","-er (parler — to speak)","-ir (finir — to finish)","-re (vendre — to sell)"], rows:[
        ["je","parle","finis","vends"],
        ["tu","parles","finis","vends"],
        ["il / elle / on","parle","finit","vend"],
        ["nous","parlons","finissons","vendons"],
        ["vous","parlez","finissez","vendez"],
        ["ils / elles","parlent","finissent","vendent"]
      ]},
      {title:"Present tense: essential irregular verbs", headers:["","être (to be)","avoir (to have)","aller (to go)","faire (to do/make)","venir (to come)","pouvoir (to be able to)","vouloir (to want)","devoir (to have to)"], rows:[
        ["je","suis","ai","vais","fais","viens","peux","veux","dois"],
        ["tu","es","as","vas","fais","viens","peux","veux","dois"],
        ["il / elle / on","est","a","va","fait","vient","peut","veut","doit"],
        ["nous","sommes","avons","allons","faisons","venons","pouvons","voulons","devons"],
        ["vous","êtes","avez","allez","faites","venez","pouvez","voulez","devez"],
        ["ils / elles","sont","ont","vont","font","viennent","peuvent","veulent","doivent"]
      ]},
      {title:"Present tense: more irregulars worth knowing cold", headers:["","savoir (to know)","voir (to see)","prendre (to take)","mettre (to put)","boire (to drink)"], rows:[
        ["je","sais","vois","prends","mets","bois"],
        ["tu","sais","vois","prends","mets","bois"],
        ["il / elle / on","sait","voit","prend","met","boit"],
        ["nous","savons","voyons","prenons","mettons","buvons"],
        ["vous","savez","voyez","prenez","mettez","buvez"],
        ["ils / elles","savent","voient","prennent","mettent","boivent"]
      ]},
      {title:"Present tense: and a few more", headers:["","dire (to say)","écrire (to write)","lire (to read)","connaître (to know/be familiar with)","croire (to believe)"], rows:[
        ["je","dis","écris","lis","connais","crois"],
        ["tu","dis","écris","lis","connais","crois"],
        ["il / elle / on","dit","écrit","lit","connaît","croit"],
        ["nous","disons","écrivons","lisons","connaissons","croyons"],
        ["vous","dites","écrivez","lisez","connaissez","croyez"],
        ["ils / elles","disent","écrivent","lisent","connaissent","croient"]
      ]},
      {title:"Present tense: yet more irregulars worth having ready", headers:["","ouvrir (to open)","partir (to leave)","recevoir (to receive)","courir (to run)"], rows:[
        ["je","ouvre","pars","reçois","cours"],
        ["tu","ouvres","pars","reçois","cours"],
        ["il / elle / on","ouvre","part","reçoit","court"],
        ["nous","ouvrons","partons","recevons","courons"],
        ["vous","ouvrez","partez","recevez","courez"],
        ["ils / elles","ouvrent","partent","reçoivent","courent"]
      ], note:"Ouvrir looks irregular but actually takes -er endings, not -ir ones — a common trap. Recevoir keeps its ç before a/o to preserve the soft sound: reçois, reçoit, reçoivent."},
      {title:"Present tense: -er verbs with a spelling change (not truly irregular)", headers:["","espérer (to hope, é → è)","essayer (to try, y → i)","envoyer (to send, y → i)"], rows:[
        ["je","espère","essaie","envoie"],
        ["tu","espères","essaies","envoies"],
        ["il / elle / on","espère","essaie","envoie"],
        ["nous","espérons","essayons","envoyons"],
        ["vous","espérez","essayez","envoyez"],
        ["ils / elles","espèrent","essaient","envoient"]
      ], note:"The change only happens where the ending is silent (je/tu/il/ils) — nous and vous keep the original spelling because their endings are pronounced. Préférer and répéter follow espérer's pattern; payer and employer follow essayer's. Envoyer looks like this group in the present but has its own irregular future: enverrai, not envoyerai."},
      {title:"Boot verbs: more stem-changing -er verbs in full", headers:["","acheter (to buy)","appeler (to call)","lever (to lift/raise)","payer (to pay)"], rows:[
        ["je","achète","appelle","lève","paie"],
        ["tu","achètes","appelles","lèves","paies"],
        ["il / elle / on","achète","appelle","lève","paie"],
        ["nous","achetons","appelons","levons","payons"],
        ["vous","achetez","appelez","levez","payez"],
        ["ils / elles","achètent","appellent","lèvent","paient"]
      ], note:"Notice the shape: je, tu, il/elle/on and ils/elles all take the changed stem (the 'boot'); nous and vous sit outside it and keep the plain, unaccented stem."},
      {title:"Reflexive verb in full: se laver (to wash oneself)", headers:["","se laver"], rows:[
        ["je","me lave"],
        ["tu","te laves"],
        ["il / elle / on","se lave"],
        ["nous","nous lavons"],
        ["vous","vous lavez"],
        ["ils / elles","se lavent"]
      ], note:"Every reflexive verb follows this exact pattern: reflexive pronoun, then the ordinary present-tense ending for its -er/-ir/-re family."},
      {title:"Imperfect tense: almost entirely regular — one real exception", headers:["verb (meaning)","stem (from nous-form)","je form"], rows:[
        ["avoir (to have)","av-","j'avais"],
        ["faire (to do/make)","fais-","je faisais"],
        ["aller (to go)","all-","j'allais"],
        ["venir (to come)","ven-","je venais"],
        ["pouvoir (to be able to)","pouv-","je pouvais"],
        ["vouloir (to want)","voul-","je voulais"],
        ["devoir (to have to)","dev-","je devais"],
        ["savoir (to know)","sav-","je savais"],
        ["boire (to drink)","buv-","je buvais"],
        ["connaître (to know/be familiar with)","connaiss-","je connaissais"],
        ["courir (to run)","cour-","je courais"],
        ["croire (to believe)","croy-","je croyais"],
        ["dire (to say)","dis-","je disais"],
        ["écrire (to write)","écriv-","j'écrivais"],
        ["lire (to read)","lis-","je lisais"],
        ["mettre (to put)","mett-","je mettais"],
        ["ouvrir (to open)","ouvr-","j'ouvrais"],
        ["partir (to leave)","part-","je partais"],
        ["prendre (to take)","pren-","je prenais"],
        ["recevoir (to receive)","recev-","je recevais"],
        ["voir (to see)","voy-","je voyais"],
        ["être (to be)","ét- (irregular — doesn't come from nous sommes)","j'étais"]
      ]},
      {title:"Être in full, imperfect — the one exception worth memorising", headers:["","imperfect"], rows:[
        ["je","étais"],
        ["tu","étais"],
        ["il / elle / on","était"],
        ["nous","étions"],
        ["vous","étiez"],
        ["ils / elles","étaient"]
      ]},
      {title:"Perfect tense (passé composé): key irregulars in full", headers:["","avoir (to have) → j'ai eu","être (to be) → j'ai été","faire (to do/make) → j'ai fait","aller (to go) → je suis allé(e)","partir (to leave) → je suis parti(e)"], rows:[
        ["je","ai eu","ai été","ai fait","suis allé(e)","suis parti(e)"],
        ["tu","as eu","as été","as fait","es allé(e)","es parti(e)"],
        ["il / elle","a eu","a été","a fait","est allé(e)","est parti(e)"],
        ["nous","avons eu","avons été","avons fait","sommes allé(e)s","sommes parti(e)s"],
        ["vous","avez eu","avez été","avez fait","êtes allé(e)(s)","êtes parti(e)(s)"],
        ["ils / elles","ont eu","ont été","ont fait","sont allé(e)s","sont parti(e)s"]
      ], note:"Partir is here alongside aller to show the être-agreement pattern isn't just an -er verb thing — it works exactly the same way whatever conjugation family the verb comes from."},
      {title:"Futur simple: regular endings (add straight to the infinitive)", headers:["","-er/-ir (parler — to speak/finir — to finish)","-re (vendre — to sell, drop the e)"], rows:[
        ["je","parlerai / finirai","vendrai"],
        ["tu","parleras / finiras","vendras"],
        ["il / elle / on","parlera / finira","vendra"],
        ["nous","parlerons / finirons","vendrons"],
        ["vous","parlerez / finirez","vendrez"],
        ["ils / elles","parleront / finiront","vendront"]
      ]},
      {title:"Futur simple: irregular stems (don't come from the infinitive)", headers:["verb (meaning)","stem","je form"], rows:[
        ["aller (to go)","ir-","j'irai"],
        ["avoir (to have)","aur-","j'aurai"],
        ["être (to be)","ser-","je serai"],
        ["faire (to do/make)","fer-","je ferai"],
        ["venir (to come)","viendr-","je viendrai"],
        ["tenir (to hold)","tiendr-","je tiendrai"],
        ["pouvoir (to be able to)","pourr-","je pourrai"],
        ["vouloir (to want)","voudr-","je voudrai"],
        ["devoir (to have to)","devr-","je devrai"],
        ["savoir (to know)","saur-","je saurai"],
        ["voir (to see)","verr-","je verrai"],
        ["envoyer (to send)","enverr-","j'enverrai"],
        ["courir (to run)","courr-","je courrai"],
        ["mourir (to die)","mourr-","je mourrai"],
        ["recevoir (to receive)","recevr-","je recevrai"],
        ["falloir (to be necessary)","faudr-","il faudra"],
        ["pleuvoir (to rain)","pleuvr-","il pleuvra"]
      ], note:"Every other verb in this module's tables — boire, connaître, croire, dire, écrire, lire, mettre, ouvrir, partir, prendre — builds its future completely regularly from the infinitive, so there's nothing extra to learn for them beyond the endings above."}
    ],
    examples:[
      {fr:"Je me lève à sept heures tous les matins.", en:"I get up at seven every morning."},
      {fr:"Elle est déjà partie au travail.", en:"She's already left for work."},
      {fr:"Quand j'étais petit, nous passions l'été chez mes grands-parents.", en:"When I was little, we used to spend the summer at my grandparents'."},
      {fr:"J'achète toujours mon pain à la même boulangerie.", en:"I always buy my bread from the same bakery."},
      {fr:"Comment tu t'appelles ? — Je m'appelle Lucas.", en:"What's your name? — My name's Lucas."},
      {fr:"Nous nous entendons très bien, mais nous nous disputons parfois.", en:"We get on really well, but we argue sometimes."}
    ],
    quiz:[
      {q:"Nous ___ (finir, present) nos devoirs avant le dîner.", opts:["finissons","finissez","finissont","finisons"], correct:0, explain:"-ir verbs: nous finissons."},
      {q:"Elle ___ (se lever, perfect) tôt ce matin.", opts:["s'est levé","s'est levée","s'a levée","est levée"], correct:1, explain:"Reflexive verbs take être, and the participle agrees with the feminine subject: s'est levée."},
      {q:"Demain, je ___ (aller au cinéma, futur proche).", opts:["vais aller","irai","allais","suis allé"], correct:0, explain:"Futur proche = present tense of aller + infinitive."},
      {q:"L'année prochaine, nous ___ (déménager, futur simple).", opts:["déménageons","déménagerons","déménagerions","avons déménagé"], correct:1, explain:"Futur simple: infinitive stem + -ons ending → déménagerons."},
      {q:"Il ___ (mettre, perfect) son manteau avant de sortir.", opts:["a mis","a mettu","est mis","a mit"], correct:0, explain:"Mettre's irregular past participle is mis: il a mis."},
      {q:"Quand nous étions enfants, nous ___ (jouer, imperfect) dans le jardin.", opts:["jouions","avons joué","jouâmes","jouerions"], correct:0, explain:"A repeated past habit takes the imperfect: nous jouions."},
      {q:"Nous ___ (acheter, present) des fruits au marché.", opts:["achetons","achètons","achètent","achetent"], correct:0, explain:"Nous sits outside the boot, so it keeps the plain stem: achetons, no accent."},
      {q:"Comment t'___ (appeler, present) -tu ?", opts:["appeles","appelles","appellez","appelais"], correct:1, explain:"Tu is inside the boot, so appeler doubles its consonant: tu t'appelles."},
      {q:"Which sentence correctly uses a reflexive verb in the perfect tense?", opts:["Elle a levée tôt.","Elle est levée tôt.","Elle s'est levée tôt.","Elle se levée tôt."], correct:2, explain:"Reflexives need both the reflexive pronoun AND être: elle s'est levée."}
    ],
    challenges:[
      {prompt:"Translate into French, choosing carefully between the perfect and the imperfect: 'It was raining when we arrived, so we stayed at home.'", answer:"Il pleuvait quand nous sommes arrivés, alors nous sommes restés à la maison.", note:"Il pleuvait sets the ongoing background (imperfect); arriver and rester are both single completed events, and both take être."}
    ],
    vocab:[
      {fr:"habiter", en:"to live (somewhere)"},
      {fr:"déménager", en:"to move house"},
      {fr:"se réveiller", en:"to wake up"},
      {fr:"se coucher", en:"to go to bed"},
      {fr:"rester", en:"to stay"},
      {fr:"devenir", en:"to become"},
      {fr:"grandir", en:"to grow up"},
      {fr:"réussir", en:"to succeed"},
      {fr:"rendre visite à", en:"to visit (a person)"},
      {fr:"emprunter", en:"to borrow"},
      {fr:"jouer", en:"to play"},
      {fr:"regarder", en:"to watch"},
      {fr:"trouver", en:"to find"},
      {fr:"parler", en:"to speak"},
      {fr:"porter", en:"to wear / carry"},
      {fr:"acheter", en:"to buy"},
      {fr:"écouter", en:"to listen (to)"},
      {fr:"aider", en:"to help"},
      {fr:"rencontrer", en:"to meet"},
      {fr:"travailler", en:"to work"},
      {fr:"manger", en:"to eat"},
      {fr:"voyager", en:"to travel"},
      {fr:"nager", en:"to swim"},
      {fr:"chercher", en:"to look for"},
      {fr:"arriver", en:"to arrive"},
      {fr:"commencer", en:"to begin"},
      {fr:"donner", en:"to give"},
      {fr:"montrer", en:"to show"},
      {fr:"choisir", en:"to choose"},
      {fr:"remplir", en:"to fill"},
      {fr:"attendre", en:"to wait (for)"},
      {fr:"vendre", en:"to sell"},
      {fr:"perdre", en:"to lose"},
      {fr:"répondre", en:"to answer"},
      {fr:"descendre", en:"to go down"},
      {fr:"s'habiller", en:"to get dressed"},
      {fr:"se doucher", en:"to shower"},
      {fr:"se brosser les dents", en:"to brush your teeth"},
      {fr:"s'amuser", en:"to have fun"},
      {fr:"s'ennuyer", en:"to get bored"},
      {fr:"se disputer", en:"to argue"},
      {fr:"se reposer", en:"to rest"},
      {fr:"se laver", en:"to wash oneself"},
      {fr:"se souvenir de", en:"to remember"},
      {fr:"s'appeler", en:"to be called"},
      {fr:"se moquer de", en:"to make fun of"},
      {fr:"s'entendre avec", en:"to get on with"},
      {fr:"se lever", en:"to get up"},
      {fr:"acheter", en:"to buy (boot verb)"},
      {fr:"appeler", en:"to call (boot verb)"},
      {fr:"lever", en:"to lift/raise (boot verb)"},
      {fr:"payer", en:"to pay (boot verb)"},
      {fr:"répéter", en:"to repeat (boot verb)"},
      {fr:"employer", en:"to use/employ (boot verb)"},
      {fr:"boire", en:"to drink"},
      {fr:"courir", en:"to run"},
      {fr:"dormir", en:"to sleep"},
      {fr:"lire", en:"to read"},
      {fr:"écrire", en:"to write"},
      {fr:"voir", en:"to see"},
      {fr:"connaître", en:"to know / be familiar with"},
      {fr:"croire", en:"to believe"},
      {fr:"mettre", en:"to put / put on"},
      {fr:"prendre", en:"to take"},
      {fr:"tenir", en:"to hold"},
      {fr:"ouvrir", en:"to open"},
      {fr:"partir", en:"to leave / depart"},
      {fr:"recevoir", en:"to receive"},
      {fr:"envoyer", en:"to send"},
      {fr:"espérer", en:"to hope"},
      {fr:"essayer", en:"to try"}
    ]
  },
  {
    id:'m2', num:2, fr:'Les Verbes II — Ordres, Questions et Durée', en:'Verbs II — Commands, Questions & Duration',
    intro:"Ordering people around, asking questions properly, and one sneaky present-tense trick English doesn't have.",
    points:[
      {tag:'rule', title:'Commands = present tense, no pronoun', text:"Drop the subject pronoun and the present-tense verb becomes the command. For -er verbs, also drop the final -s from the tu form: (tu) parles → Parle ! The nous form gives you 'let's': Finissons ça !"},
      {tag:'watch', title:'être and avoir go rogue', text:"They ditch their normal present-tense forms entirely for the imperative: sois, soyons, soyez / aie, ayons, ayez. No relation to je suis or j'ai — just memorise these as their own thing."},
      {tag:'rule', title:'Three ways to ask a question', text:"From most casual to most formal: rising intonation (Tu aimes ça ?), est-ce que (Est-ce que tu aimes ça ?), and inversion (Aimes-tu ça ?) — the version examiners most want to see in your writing."},
      {tag:'watch', title:'The sneaky -t-', text:"With il/elle after a verb ending in a vowel, French can't stand having two vowels crash into each other, so it slots in a -t-: Il aime → Aime-t-il ? Drop that hyphenated -t- and it reads wrong even if everything else is right."},
      {tag:'tip', title:'depuis breaks the English rule', text:"For something that started in the past and is still going on, French just stays in the present tense: J'habite ici depuis trois ans means 'I have lived here for three years', not 'I lived'. English switches tense here — French doesn't, and that mismatch trips people up constantly."}
    ],
    tables:[
      {title:"Imperative forms", headers:["","tu","nous","vous"], rows:[
        ["-er (parler — to speak)","Parle !","Parlons !","Parlez !"],
        ["-ir (finir — to finish)","Finis !","Finissons !","Finissez !"],
        ["-re (vendre — to sell)","Vends !","Vendons !","Vendez !"],
        ["être (to be)","Sois !","Soyons !","Soyez !"],
        ["avoir (to have)","Aie !","Ayons !","Ayez !"]
      ]}
    ],
    examples:[
      {fr:"Ferme la porte, s'il te plaît !", en:"Close the door, please!"},
      {fr:"Depuis quand apprends-tu le français ?", en:"How long have you been learning French?"},
      {fr:"Ne t'inquiète pas, tout va bien.", en:"Don't worry, everything's fine."}
    ],
    quiz:[
      {q:"___ (parler, tu imperative) moins fort !", opts:["Parles","Parle","Tu parles","Parler"], correct:1, explain:"-er verbs drop the final -s from the tu imperative: Parle."},
      {q:"Which is the correct inversion question for 'Do you like chocolate?'", opts:["Tu aimes le chocolat ?","Est-ce que tu aimes le chocolat ?","Aimes-tu le chocolat ?","Aime le chocolat tu ?"], correct:2, explain:"Inversion swaps the verb and subject pronoun, joined by a hyphen."},
      {q:"J'habite à Londres ___ cinq ans.", opts:["pendant","pour","depuis","dans"], correct:2, explain:"An ongoing action still true now uses depuis + the present tense."},
      {q:"Which is the correct 'let's' form for 'Let's finish this!'?", opts:["Finissons ça !","Finissez ça !","Finis ça !","Nous finissons ça !"], correct:0, explain:"The nous imperative drops nous and keeps the verb form: Finissons."},
      {q:"Turn this into a question with inversion, adding -t- where needed: Il aime le café.", opts:["Aime-t-il le café ?","Aime-il le café ?","Il aime-t-il le café ?","Aimet-il le café ?"], correct:0, explain:"Il after a vowel-ending verb needs -t- inserted: Aime-t-il ?"}
    ],
    challenges:[
      {prompt:"Write a polite negative command telling a friend not to worry, using the tu imperative and a reflexive verb.", answer:"Ne t'inquiète pas !", note:"The negative wraps around the reflexive pronoun and verb together: ne t'inquiète pas."}
    ],
    vocab:[
      {fr:"pourquoi", en:"why"},
      {fr:"comment", en:"how"},
      {fr:"combien", en:"how much / how many"},
      {fr:"lequel / laquelle", en:"which one"},
      {fr:"depuis quand", en:"since when"},
      {fr:"il y a", en:"ago"},
      {fr:"se dépêcher", en:"to hurry"},
      {fr:"patienter", en:"to be patient / wait a moment"},
      {fr:"oser", en:"to dare"},
      {fr:"quand", en:"when"},
      {fr:"où", en:"where"},
      {fr:"qui", en:"who"},
      {fr:"que / quoi", en:"what"},
      {fr:"quel / quelle", en:"which / what"},
      {fr:"est-ce que", en:"question marker (turns a statement into a question)"},
      {fr:"n'est-ce pas ?", en:"isn't that right? / don't you think?"},
      {fr:"tout de suite", en:"right away"},
      {fr:"immédiatement", en:"immediately"},
      {fr:"bientôt", en:"soon"},
      {fr:"maintenant", en:"now"},
      {fr:"tout à l'heure", en:"in a moment / a moment ago"},
      {fr:"écoute !", en:"listen! (command)"},
      {fr:"regarde !", en:"look! (command)"},
      {fr:"viens !", en:"come! (command)"},
      {fr:"arrête !", en:"stop! (command)"},
      {fr:"fais attention !", en:"be careful! / pay attention!"},
      {fr:"d'accord", en:"OK / agreed"},
      {fr:"ça suffit", en:"that's enough"},
      {fr:"qu'est-ce qu'il y a ?", en:"what's the matter?"},
      {fr:"à l'avance", en:"in advance"},
      {fr:"jusqu'à présent", en:"up until now"},
      {fr:"dès maintenant", en:"from now on"},
      {fr:"depuis peu", en:"since recently"}
    ]
  },
  {
    id:'m3', num:3, fr:'Le Subjonctif', en:'The Subjunctive',
    intro:"The move that separates an average script from a genuinely strong one. Most people can recognise it — you're going to actually use it.",
    points:[
      {tag:'rule', title:'The formation formula', text:"Take the ils/elles present-tense stem, add -e, -es, -e, -ions, -iez, -ent. finir → ils finissent → que je finisse, que nous finissions. Once you've got the pattern, you can build the subjunctive of almost any regular verb on the spot."},
      {tag:'watch', title:"The irregulars you can't skip", text:"être (sois, soit, soyons, soyez, soient), avoir (aie, aies, ait, ayons, ayez, aient), faire (fasse...), aller (aille, but allions/alliez), pouvoir (puisse...), vouloir (veuille, but voulions/vouliez), savoir (sache...), falloir (faille), pleuvoir (pleuve) — see the table below and learn these properly, since they're the ones that actually show up in strong scripts."},
      {tag:'rule', title:"It's triggered, not felt", text:"You don't reach for the subjunctive because a sentence 'feels' uncertain — it's summoned by specific structures: necessity (il faut que), wish (vouloir que, souhaiter que), doubt or emotion (douter que, avoir peur que, regretter que), and conjunctions like bien que, pour que, avant que, à condition que, jusqu'à ce que."},
      {tag:'tip', title:'The negation flip', text:"Opinion verbs like penser que (to think that) and croire que (to believe that) don't normally trigger the subjunctive when they're positive, but flip that to negative or questioned and they suddenly do: je pense qu'il a raison (I think he's right), but je ne pense pas qu'il ait raison (I don't think he's right). It's a genuinely advanced distinction — most people never learn it."},
      {tag:'tip', title:'Searching for someone who...', text:"Also used after an indefinite or negative antecedent — when the person or thing you're describing isn't (yet) a known, specific one: je cherche un ami qui puisse m'aider, versus je cherche mon ami qui peut m'aider (a specific person you already have in mind)."},
      {tag:'rule', title:'Same subject? Skip it.', text:"If the subject doesn't change between the two halves of the sentence, drop que and use the infinitive instead: je veux partir, not je veux que je parte. Que + subjunctive is reserved for when the subject genuinely switches."}
    ],
    tables:[
      {title:"Subjunctive: irregular stems (que je / tu / il / nous / vous / ils...)", headers:["","être (to be)","avoir (to have)","faire (to do/make)","aller (to go)","pouvoir (to be able to)","vouloir (to want)","savoir (to know)"], rows:[
        ["je","sois","aie","fasse","aille","puisse","veuille","sache"],
        ["tu","sois","aies","fasses","ailles","puisses","veuilles","saches"],
        ["il / elle / on","soit","ait","fasse","aille","puisse","veuille","sache"],
        ["nous","soyons","ayons","fassions","allions","puissions","voulions","sachions"],
        ["vous","soyez","ayez","fassiez","alliez","puissiez","vouliez","sachiez"],
        ["ils / elles","soient","aient","fassent","aillent","puissent","veuillent","sachent"]
      ], note:"falloir and pleuvoir are impersonal, so they only ever appear in the il form: qu'il faille, qu'il pleuve."}
    ],
    examples:[
      {fr:"Il faut que nous partions avant six heures.", en:"We have to leave before six."},
      {fr:"Je doute qu'il soit prêt à temps.", en:"I doubt he'll be ready in time."},
      {fr:"Bien qu'elle soit fatiguée, elle continue à travailler.", en:"Although she's tired, she keeps working."}
    ],
    quiz:[
      {q:"Il faut que tu ___ (faire) tes devoirs.", opts:["fais","fasses","feras","ferais"], correct:1, explain:"Il faut que triggers the subjunctive. Faire is irregular: que je fasse, que tu fasses..."},
      {q:"Je veux que vous ___ (être) à l'heure.", opts:["êtes","soyez","serez","seriez"], correct:1, explain:"Vouloir que triggers the subjunctive; être's vous form is fully irregular: soyez."},
      {q:"Bien qu'il ___ (pleuvoir), nous sortons.", opts:["pleut","pleuve","pleuvra","pleuvrait"], correct:1, explain:"Bien que ('although') is a classic trigger. Pleuvoir's subjunctive is (qu'il) pleuve."},
      {q:"Elle doute que nous ___ (avoir) raison.", opts:["avons","ayons","aurons","aurions"], correct:1, explain:"Douter que expresses doubt; avoir's nous form is ayons."},
      {q:"Avant qu'il ne ___ (partir), dis-lui au revoir.", opts:["part","parte","partira","partirait"], correct:1, explain:"Avant que triggers the subjunctive (this ne is expletive, not a negation). Partir → que je parte."},
      {q:"Je suis content que tu ___ (pouvoir) venir.", opts:["peux","puisses","pourras","pourrais"], correct:1, explain:"Être content que expresses emotion, which triggers the subjunctive. Pouvoir → puisse, puisses..."}
    ],
    challenges:[
      {prompt:"Translate, using the subjunctive: 'I don't think that's true.'", answer:"Je ne pense pas que ce soit vrai.", note:"Negated opinion verbs (ne pas penser que, ne pas croire que) trigger the subjunctive, even though the positive form (penser que) doesn't."}
    ],
    vocab:[
      {fr:"il est possible que", en:"it's possible that"},
      {fr:"il est important que", en:"it's important that"},
      {fr:"avoir peur que", en:"to be afraid that"},
      {fr:"souhaiter que", en:"to wish that"},
      {fr:"regretter que", en:"to regret that"},
      {fr:"il vaut mieux que", en:"it's better that"},
      {fr:"il est dommage que", en:"it's a shame that"},
      {fr:"à moins que", en:"unless"},
      {fr:"de peur que", en:"for fear that"},
      {fr:"il est nécessaire que", en:"it's necessary that"},
      {fr:"il semble que", en:"it seems that"},
      {fr:"il est possible/impossible que", en:"it's possible/impossible that"},
      {fr:"il n'est pas certain que", en:"it isn't certain that"},
      {fr:"exiger que", en:"to demand that"},
      {fr:"suggérer que", en:"to suggest that"},
      {fr:"préférer que", en:"to prefer that"},
      {fr:"être surpris(e) que", en:"to be surprised that"},
      {fr:"être content(e)/heureux(-euse) que", en:"to be happy that"},
      {fr:"être triste que", en:"to be sad that"},
      {fr:"s'attendre à ce que", en:"to expect that"},
      {fr:"quoi que", en:"whatever"},
      {fr:"qui que ce soit", en:"whoever it may be"},
      {fr:"où que", en:"wherever"},
      {fr:"pourvu que", en:"provided that"},
      {fr:"non que", en:"not that"},
      {fr:"de sorte que", en:"so that (subjunctive when purpose)"}
    ]
  },
  {
    id:'m4', num:4, fr:"Les Constructions à l'Infinitif", en:'Infinitive Constructions & Verb Forms',
    intro:"The flip side of the subjunctive: when nothing changes hands between subjects, most verbs just want a plain infinitive — plus two closely related constructions examiners come back to again and again.",
    points:[
      {tag:'rule', title:'No preposition needed', text:"aimer (to like/love), détester (to hate), préférer (to prefer), vouloir (to want), pouvoir (to be able to), devoir (to have to) + infinitive, no que, no preposition, nothing in between: Je voudrais partir (I'd like to leave). Elle déteste attendre (She hates waiting). Nous devons partir tôt (We have to leave early)."},
      {tag:'rule', title:'il faut, the general version', text:"Il faut + infinitive is the impersonal, 'one must' version — Il faut partir. Il faut que + subjunctive kicks in once you name a specific person: Il faut que tu partes."},
      {tag:'watch', title:'Verbs that need a linking word', text:"Some verbs refuse the bare infinitive and insist on a preposition first — worth learning as the exceptions to the pattern: commencer à (to start to), continuer à (to continue to), réussir à (to succeed in), apprendre à (to learn to); décider de (to decide to), essayer de (to try to), finir de (to finish doing), arrêter de (to stop doing)."},
      {tag:'tip', title:'After any preposition, infinitive wins', text:"Whenever a preposition comes before the verb — avant de, sans, pour — French always reaches for the infinitive, never the subjunctive: avant de partir, sans dire un mot, pour réussir."},
      {tag:'rule', title:"Past infinitive: après avoir/être + past participle", text:"Means 'after doing/having done something' — genuinely high-value, exam-favourite structure. Après avoir mangé, elle est partie (After eating, she left). Après être arrivé(e), il a téléphoné (After arriving, he called). Pick avoir or être exactly as you would for the perfect tense, and the participle still agrees when être is the auxiliary."},
      {tag:'watch', title:'Present participle: en + -ant', text:"Built from the nous-form of the present tense — drop -ons, add -ant. En + this form means 'while/by doing something': il écoutait la radio en faisant la vaisselle (he listened to the radio while doing the washing-up). être and avoir are irregular here: étant, ayant."}
    ],
    tables:[
      {title:"Present participle: formation", headers:["verb (meaning)","nous-form","present participle (en + ...)"], rows:[
        ["parler (to speak)","parlons","en parlant"],
        ["finir (to finish)","finissons","en finissant"],
        ["vendre (to sell)","vendons","en vendant"],
        ["faire (to do/make)","faisons","en faisant"],
        ["avoir (to have)","(irregular)","en ayant"],
        ["être (to be)","(irregular)","en étant"],
        ["savoir (to know)","(irregular)","en sachant"]
      ]}
    ],
    examples:[
      {fr:"Je préfère rester à la maison ce soir.", en:"I'd rather stay home tonight."},
      {fr:"Il faut réserver la table à l'avance.", en:"You need to book the table in advance."},
      {fr:"Elle a réussi à finir son projet avant la date limite.", en:"She managed to finish her project before the deadline."},
      {fr:"Après avoir fini ses devoirs, il a regardé un film.", en:"After finishing his homework, he watched a film."},
      {fr:"Elle chante en conduisant.", en:"She sings while driving."}
    ],
    quiz:[
      {q:"Nous voulons ___ (partir) tout de suite.", opts:["que partir","partir","de partir","à partir"], correct:1, explain:"Vouloir + infinitive takes no preposition when the subject doesn't change."},
      {q:"Il faut ___ (préparer) le dîner avant sept heures.", opts:["que tu prépares","préparer","que préparer","préparant"], correct:1, explain:"General il faut + infinitive, with no specific person named."},
      {q:"Elle a commencé ___ (apprendre) le piano à six ans.", opts:["apprendre","de apprendre","à apprendre","que apprendre"], correct:2, explain:"Commencer is one of the verbs that needs à before an infinitive."},
      {q:"J'ai décidé ___ (arrêter) de fumer.", opts:["arrêter","à arrêter","de arrêter","d'arrêter"], correct:3, explain:"Décider de + infinitive; de elides to d' before a vowel."},
      {q:"Avant ___ (partir), vérifie que tu as tes clés.", opts:["que tu partes","de partir","partir","que partir"], correct:1, explain:"Avant de + infinitive; avant que + subjunctive is only used when the subject changes."},
      {q:"___ (arriver, past infinitive) chez elle, il a tout de suite pris une douche.", opts:["Après avoir arrivé","Après être arrivé","Après arrivant","Après arriver"], correct:1, explain:"Arriver takes être, so the past infinitive is après être arrivé."},
      {q:"Il s'est cassé la jambe ___ (skier, present participle).", opts:["en skiant","skiant","en skier","skie"], correct:0, explain:"En + present participle expresses 'while doing': en skiant."}
    ],
    challenges:[
      {prompt:"Translate: 'You have to try to finish before Friday.'", answer:"Il faut essayer de finir avant vendredi.", note:"Il faut + bare infinitive (essayer), then essayer de + infinitive (finir) — the two patterns stack."},
      {prompt:"Translate, using the past infinitive: 'After watching the film, we went to bed.'", answer:"Après avoir regardé le film, nous sommes allés nous coucher.", note:"Regarder takes avoir; the past infinitive doesn't change that choice."}
    ],
    vocab:[
      {fr:"commencer à", en:"to start to"},
      {fr:"continuer à", en:"to continue to"},
      {fr:"apprendre à", en:"to learn to"},
      {fr:"s'amuser à", en:"to enjoy oneself doing"},
      {fr:"décider de", en:"to decide to"},
      {fr:"essayer de", en:"to try to"},
      {fr:"arrêter de", en:"to stop (doing)"},
      {fr:"oublier de", en:"to forget to"},
      {fr:"avoir envie de", en:"to feel like / want to"},
      {fr:"après avoir / être + past participle", en:"after doing / having done"},
      {fr:"en + present participle", en:"while / by doing"},
      {fr:"tout en + present participle", en:"while doing (emphatic)"},
      {fr:"finir de", en:"to finish (doing)"},
      {fr:"hésiter à", en:"to hesitate to"},
      {fr:"refuser de", en:"to refuse to"},
      {fr:"promettre de", en:"to promise to"},
      {fr:"proposer de", en:"to suggest / offer to"},
      {fr:"accepter de", en:"to agree to"},
      {fr:"demander à", en:"to ask to"},
      {fr:"aider à", en:"to help to"},
      {fr:"inviter à", en:"to invite to"},
      {fr:"s'attendre à", en:"to expect to"},
      {fr:"venir de", en:"to have just (done something)"},
      {fr:"être sur le point de", en:"to be about to"},
      {fr:"avoir le droit de", en:"to be allowed to / have the right to"},
      {fr:"avoir peur de", en:"to be afraid to"},
      {fr:"avoir besoin de", en:"to need to"}
    ]
  },
  {
    id:'m5', num:5, fr:'Le Conditionnel et le Conditionnel Passé', en:'Conditional & Conditional Perfect',
    intro:"Everything from a polite 'I'd like' to a full 'if I had known, I would have...' — this is the tense of hypotheticals.",
    points:[
      {tag:'rule', title:'Build it from the future stem', text:"Take the infinitive (dropping the final -e for -re verbs) and add the imperfect endings -ais, -ais, -ait, -ions, -iez, -aient. parler → je parlerais; vendre → je vendrais. Same stem as the futur simple, different endings."},
      {tag:'watch', title:'Same weird stems as futur simple', text:"The irregular stems carry straight over from the future tense: être→ser-, avoir→aur-, aller→ir-, faire→fer-, pouvoir→pourr-, vouloir→voudr-, devoir→devr-, venir→viendr-. Learn them once, use them in both tenses."},
      {tag:'rule', title:'The si-clause cheat sheet', text:"Si + present takes present or future in the main clause (a real, likely condition). Si + imperfect takes the conditional (a hypothetical). Si + pluperfect takes the conditional perfect (an unreal past — something that didn't happen)."},
      {tag:'tip', title:"Conditional perfect: the 'would have' combo", text:"Formed from the conditional of avoir or être plus the past participle: j'aurais fini, elle serait partie. It's what you reach for whenever English says 'would have done something'."}
    ],
    tables:[
      {title:"Conditional & futur simple: irregular stems (same stem, different endings)", headers:["verb (meaning)","stem","je (conditional)"], rows:[
        ["être (to be)","ser-","je serais"],
        ["avoir (to have)","aur-","j'aurais"],
        ["aller (to go)","ir-","j'irais"],
        ["faire (to do/make)","fer-","je ferais"],
        ["pouvoir (to be able to)","pourr-","je pourrais"],
        ["vouloir (to want)","voudr-","je voudrais"],
        ["devoir (to have to)","devr-","je devrais"],
        ["venir (to come)","viendr-","je viendrais"]
      ]}
    ],
    examples:[
      {fr:"Si j'étais riche, j'achèterais une maison en France.", en:"If I were rich, I'd buy a house in France."},
      {fr:"Si tu m'avais téléphoné, je t'aurais aidé.", en:"If you'd called me, I would have helped you."},
      {fr:"Nous voudrions réserver une table pour deux.", en:"We'd like to book a table for two."}
    ],
    quiz:[
      {q:"Si j'avais plus de temps, je ___ (voyager) davantage.", opts:["voyage","voyagerai","voyagerais","aurais voyagé"], correct:2, explain:"Si + imperfect (avais) takes the present conditional in the main clause."},
      {q:"Si elle ___ (avoir) su, elle serait venue plus tôt.", opts:["a","avait","aurait","ait"], correct:1, explain:"Pluperfect = imperfect of avoir (avait) + past participle (su), pairing with the conditional perfect (serait venue)."},
      {q:"Nous ___ (vouloir) partir plus tôt.", opts:["voulons","voudrons","voudrions","aurions voulu"], correct:2, explain:"Vouloir's conditional stem is voudr-, plus the imperfect endings: voudrions."},
      {q:"S'il pleuvait, nous ___ (rester) à la maison.", opts:["restons","resterons","resterions","serions restés"], correct:2, explain:"Si + imperfect (pleuvait) → conditional in the main clause: resterions."},
      {q:"Si tu avais étudié, tu ___ (réussir) l'examen.", opts:["réussis","réussirais","avais réussi","aurais réussi"], correct:3, explain:"Si + pluperfect (avais étudié) → conditional perfect: aurais réussi."}
    ],
    challenges:[
      {prompt:"Translate: 'If I had known, I would have told you.'", answer:"Si j'avais su, je te l'aurais dit.", note:"Si + pluperfect (avais su) pairs with the conditional perfect (aurais dit); savoir's irregular past participle is su."}
    ],
    vocab:[
      {fr:"je voudrais", en:"I would like"},
      {fr:"j'aimerais", en:"I would love/like"},
      {fr:"pourriez-vous ?", en:"could you? (polite)"},
      {fr:"si seulement", en:"if only"},
      {fr:"à ta place", en:"if I were you / in your place"},
      {fr:"au cas où", en:"in case"},
      {fr:"il vaudrait mieux", en:"it would be better"},
      {fr:"ce serait", en:"it/that would be"},
      {fr:"cela dépendrait de", en:"it would depend on"},
      {fr:"je pourrais", en:"I could / I would be able to"},
      {fr:"tu devrais", en:"you should"},
      {fr:"on pourrait", en:"we could"},
      {fr:"il/elle devrait", en:"he/she should"},
      {fr:"ça m'étonnerait", en:"that would surprise me"},
      {fr:"idéalement", en:"ideally"},
      {fr:"en théorie", en:"in theory"},
      {fr:"à condition que", en:"provided that / on condition that"},
      {fr:"sinon", en:"otherwise / if not"},
      {fr:"il vaudrait la peine de", en:"it would be worth it to"},
      {fr:"à vrai dire", en:"to tell the truth"},
      {fr:"en fait", en:"in fact / actually"},
      {fr:"dans ce cas", en:"in that case"},
      {fr:"normalement", en:"normally (in a hypothetical sense)"},
      {fr:"ça vaudrait mieux", en:"that would be better"},
      {fr:"il serait possible de", en:"it would be possible to"},
      {fr:"nous devrions", en:"we should"}
    ]
  },
  {
    id:'m6', num:6, fr:'Le Plus-que-parfait', en:'The Pluperfect',
    intro:"The 'had already happened' tense — for when your story needs a flashback within a flashback.",
    points:[
      {tag:'rule', title:'Same recipe as the perfect, one step back', text:"Take the imperfect of avoir or être and add the past participle: j'avais mangé, elle était partie, ils s'étaient levés. It's the perfect tense's auxiliary shifted one tense further into the past."},
      {tag:'rule', title:'Agreement rules carry over', text:"Nothing new to learn here — avoir-verbs agree with a preceding direct object, and être-verbs agree with the subject, exactly like they do in the ordinary perfect tense."},
      {tag:'tip', title:'Its job: sequencing the past', text:"Use it for something that had already happened before another past event kicks in — the flashback-within-a-flashback tense. It also pairs naturally with the conditional perfect in unreal-past sentences: si j'avais su, je te l'aurais dit."}
    ],
    examples:[
      {fr:"Quand je suis arrivé, elle était déjà partie.", en:"When I arrived, she had already left."},
      {fr:"Il avait fini son travail avant midi.", en:"He had finished his work before midday."},
      {fr:"Nous nous étions déjà rencontrés.", en:"We had already met."}
    ],
    quiz:[
      {q:"Quand nous sommes arrivés, le film ___ (commencer) déjà.", opts:["a commencé","avait commencé","commençait","aurait commencé"], correct:1, explain:"An action completed before another past action = pluperfect: avait commencé."},
      {q:"Elle ___ (partir) avant que je n'arrive.", opts:["est partie","partait","était partie","serait partie"], correct:2, explain:"Partir takes être; pluperfect = imperfect of être + parti(e): était partie."},
      {q:"Ils ___ (se lever) tôt ce matin-là.", opts:["se sont levés","se levaient","s'étaient levés","se lèveraient"], correct:2, explain:"Reflexive verbs take être; pluperfect + plural subject agreement: s'étaient levés."},
      {q:"Tu ___ (oublier) tes clés, alors tu es revenu.", opts:["as oublié","oubliais","avais oublié","aurais oublié"], correct:2, explain:"The forgetting happened before the returning — pluperfect: avais oublié."}
    ],
    challenges:[
      {prompt:"Translate: 'When she arrived, we had already eaten.'", answer:"Quand elle est arrivée, nous avions déjà mangé.", note:"Arriver (a single completed event) is perfect tense; the eating happened even earlier, so it's pluperfect."}
    ],
    vocab:[
      {fr:"déjà", en:"already"},
      {fr:"avant que", en:"before"},
      {fr:"la veille", en:"the day before"},
      {fr:"auparavant", en:"beforehand"},
      {fr:"entre-temps", en:"meanwhile"},
      {fr:"dès que", en:"as soon as"},
      {fr:"une fois que", en:"once (that)"},
      {fr:"le lendemain", en:"the next day"},
      {fr:"quelques instants plus tôt", en:"a few moments earlier"},
      {fr:"jusque-là", en:"up until then"},
      {fr:"à ce moment-là", en:"at that moment"},
      {fr:"depuis longtemps", en:"for a long time (already)"},
      {fr:"peu avant", en:"shortly before"},
      {fr:"peu après", en:"shortly after"},
      {fr:"avant-hier", en:"the day before yesterday"},
      {fr:"après-demain", en:"the day after tomorrow"},
      {fr:"de bonne heure", en:"early"},
      {fr:"la fois précédente", en:"the previous time"},
      {fr:"au préalable", en:"beforehand / first"},
      {fr:"jusqu'alors", en:"until then"},
      {fr:"il y a longtemps", en:"a long time ago"},
      {fr:"depuis lors", en:"since then"},
      {fr:"antérieurement", en:"previously"},
      {fr:"finalement", en:"finally / eventually"}
    ]
  },
  {
    id:'m7', num:7, fr:'La Voix Passive', en:'The Passive Voice',
    intro:"How to build it, and — more importantly — when native speakers quietly avoid it.",
    points:[
      {tag:'rule', title:'The formula', text:"être (in whatever tense you need) plus the past participle, which agrees with the subject in gender and number: la lettre est écrite par Marie, les fenêtres ont été fermées."},
      {tag:'tip', title:'Works in any tense', text:"est mangé (present), a été mangé (perfect), sera mangé (future), était mangé (imperfect) — just swap être's tense and keep the same participle."},
      {tag:'watch', title:'French often dodges it', text:"Native speech leans hard on active voice or on instead of the passive whenever it can — On parle français ici sounds far more natural than Le français est parlé ici. When in doubt, reach for on."},
      {tag:'rule', title:'Only works on transitive verbs', text:"The passive needs a verb that takes a direct object in the first place. If the active version has nothing to promote to subject, there's no passive to build."}
    ],
    examples:[
      {fr:"Le château a été construit au XVIIe siècle.", en:"The castle was built in the 17th century."},
      {fr:"Ce livre est lu par des millions de gens.", en:"This book is read by millions of people."},
      {fr:"On m'a dit que la réunion était annulée.", en:"I was told the meeting was cancelled."}
    ],
    quiz:[
      {q:"La maison ___ (construire, present passive) par cet architecte.", opts:["construit","est construite","a construit","construira"], correct:1, explain:"Present passive: être (est) + past participle agreeing with the feminine subject (construite)."},
      {q:"Les documents ___ (envoyer, perfect passive) hier.", opts:["ont envoyé","sont envoyés","ont été envoyés","avaient envoyé"], correct:2, explain:"Perfect passive: avoir été + past participle, agreeing with the plural subject: ont été envoyés."},
      {q:"Which is the more natural spoken French for 'French is spoken here'?", opts:["Le français est parlé ici.","On parle français ici.","Le français a été parlé ici.","Le français parle ici."], correct:1, explain:"French conversation strongly prefers on-constructions to the passive; le français se parle ici also works, but on parle is the most natural default."},
      {q:"Les lettres ___ (écrire, perfect passive).", opts:["ont écrit","ont été écrit","ont été écrites","sont écrit"], correct:2, explain:"Past participle agrees with the feminine plural subject lettres: écrites."}
    ],
    challenges:[
      {prompt:"Rewrite using on instead of the passive: 'Ce vin est bu froid.' (This wine is drunk cold.)", answer:"On boit ce vin froid.", note:"French conversation prefers on to the passive whenever the agent doesn't matter."}
    ],
    vocab:[
      {fr:"construire", en:"to build"},
      {fr:"fonder", en:"to found"},
      {fr:"découvrir", en:"to discover"},
      {fr:"créer", en:"to create"},
      {fr:"détruire", en:"to destroy"},
      {fr:"inventer", en:"to invent"},
      {fr:"publier", en:"to publish"},
      {fr:"produire", en:"to produce"},
      {fr:"réaliser", en:"to make / carry out (a film, project)"},
      {fr:"organiser", en:"to organise"},
      {fr:"fermer", en:"to close"},
      {fr:"ouvrir", en:"to open"},
      {fr:"vendre", en:"to sell"},
      {fr:"élire", en:"to elect"},
      {fr:"nommer", en:"to name / appoint"},
      {fr:"interdire", en:"to forbid"},
      {fr:"autoriser", en:"to authorise / allow"},
      {fr:"réparer", en:"to repair"},
      {fr:"remplacer", en:"to replace"},
      {fr:"traduire", en:"to translate"},
      {fr:"fonder", en:"to found / establish"},
      {fr:"annuler", en:"to cancel"},
      {fr:"voler", en:"to steal"},
      {fr:"attaquer", en:"to attack"},
      {fr:"blesser", en:"to injure"},
      {fr:"sauver", en:"to save / rescue"},
      {fr:"choisir", en:"to choose"}
    ]
  },
  {
    id:'m8', num:8, fr:'La Négation', en:'Negatives',
    intro:"Five negative words, how they stack, and one word-order rule that breaks the pattern everyone else follows.",
    points:[
      {tag:'rule', title:'The starter five', text:"ne...pas (not), ne...jamais (never), ne...rien (nothing), ne...plus (no longer/no more), ne...personne (nobody) — in simple tenses they all wrap around the verb the same way: je ne mange pas, je ne vois rien."},
      {tag:'watch', title:'personne breaks formation', text:"In compound tenses, pas, jamais, rien and plus wrap around the auxiliary, not the participle: je n'ai pas mangé, je n'ai rien vu. But personne is the rebel — it jumps AFTER the past participle instead: je n'ai vu personne."},
      {tag:'tip', title:'They stack', text:"You can combine them for extra punch: ne...plus jamais (never again), ne...jamais rien (never anything), ne...plus rien (nothing more)."},
      {tag:'watch', title:"ne...que isn't a real negative", text:"It actually means 'only' — je n'ai que deux euros — and unlike a genuine negation, it doesn't trigger the de-change before the noun that pas normally does."},
      {tag:'rule', title:'Negating an infinitive', text:"Both parts of ne pas stay glued together, right before the infinitive: il m'a dit de ne pas partir."}
    ],
    examples:[
      {fr:"Je ne bois plus jamais de café le soir.", en:"I never drink coffee in the evening anymore."},
      {fr:"Il n'a que vingt euros sur lui.", en:"He only has twenty euros on him."},
      {fr:"Je n'ai vu personne dans la rue.", en:"I didn't see anyone in the street."}
    ],
    quiz:[
      {q:"Je ne veux ___ sortir seul le soir.", opts:["plus jamais","jamais plus","pas jamais","plus pas"], correct:0, explain:"Combined negatives stack as plus jamais (never again)."},
      {q:"Il ___ dix euros dans son portefeuille.", opts:["n'a pas","n'a que","n'a rien","n'a jamais"], correct:1, explain:"Ne...que expresses a restriction ('only'), not a negation — no de-change follows."},
      {q:"Elle m'a conseillé de ___ répondre trop vite.", opts:["ne pas","pas ne","ne...pas","non pas"], correct:0, explain:"Before an infinitive, both negation words stay together, right before it: ne pas répondre."},
      {q:"Nous n'avons ___ mangé avant midi.", opts:["pas","jamais pas","ne pas","non"], correct:0, explain:"In a compound tense, pas wraps around the auxiliary: n'avons pas mangé."},
      {q:"Il n'a vu ___ dans la rue.", opts:["rien","jamais","personne","plus"], correct:2, explain:"Personne goes after the past participle, unlike the other negatives."}
    ],
    challenges:[
      {prompt:"Translate: 'Nobody ever says anything here anymore.'", answer:"Ici, personne ne dit plus jamais rien.", note:"Personne as the subject pairs with ne + verb; plus jamais rien stacks after it — a genuinely advanced negative sentence."}
    ],
    vocab:[
      {fr:"aucun / aucune", en:"no / none"},
      {fr:"nulle part", en:"nowhere"},
      {fr:"ni...ni", en:"neither...nor"},
      {fr:"sans", en:"without"},
      {fr:"guère", en:"hardly"},
      {fr:"plus rien", en:"nothing more"},
      {fr:"jamais", en:"never / ever"},
      {fr:"rien du tout", en:"nothing at all"},
      {fr:"non plus", en:"neither / not... either"},
      {fr:"pas du tout", en:"not at all"},
      {fr:"pas encore", en:"not yet"},
      {fr:"pas grand-chose", en:"not much"},
      {fr:"sans doute", en:"probably / no doubt"},
      {fr:"sans aucun doute", en:"without any doubt"},
      {fr:"cela ne fait rien / ça ne fait rien", en:"it doesn't matter"},
      {fr:"de rien", en:"you're welcome / don't mention it"},
      {fr:"aucune idée", en:"no idea"},
      {fr:"personne d'autre", en:"nobody else"},
      {fr:"rien à faire", en:"nothing to be done"},
      {fr:"ni l'un ni l'autre", en:"neither one nor the other"},
      {fr:"absolument pas", en:"absolutely not"},
      {fr:"en aucun cas", en:"under no circumstances"},
      {fr:"à aucun prix", en:"not for anything / at no price"},
      {fr:"jamais de la vie", en:"never in my life (emphatic)"},
      {fr:"refuser", en:"to refuse"},
      {fr:"impossible", en:"impossible"},
      {fr:"négatif / négative", en:"negative"},
      {fr:"nier", en:"to deny"}
    ]
  },
  {
    id:'m9', num:9, fr:'Les Noms et les Articles', en:'Nouns and Articles',
    intro:"The quiet accuracy points examiners actually notice — gender, plurals, and picking the right little word before a noun.",
    points:[
      {tag:'tip', title:'Gender clues (not guarantees)', text:"Gender is mostly arbitrary and has to be learned with the noun, but some endings are decent hints: usually masculine -age, -ment, -eau, -isme; usually feminine -tion, -sion, -té, -ette, -ance/-ence."},
      {tag:'watch', title:'Plural exceptions', text:"The default is just add -s, but nouns ending -eau or -eu add -x instead (un bateau → des bateaux), most ending -al switch to -aux (un animal → des animaux), and a few are just irregular (un œil → des yeux)."},
      {tag:'rule', title:'Three article families', text:"Definite articles (le/la/les, l' before a vowel) for specific or general things — j'aime le café. Indefinite (un/une/des) for 'a/an/some'. Partitive (du/de la/de l'/des) for 'some' of an uncountable amount: je voudrais du pain, de la confiture."},
      {tag:'watch', title:'Negation eats the article', text:"After a negation, du/de la/des/un/une usually all collapse down to de or d': j'ai un chat → je n'ai pas de chat; je mange des frites → je ne mange pas de frites. The same thing happens after an expression of quantity: beaucoup de, un kilo de, trop de."}
    ],
    tables:[
      {title:"Articles at a glance", headers:["type","masculine","feminine","plural"], rows:[
        ["Definite","le (l')","la (l')","les"],
        ["Indefinite","un","une","des"],
        ["Partitive","du (de l')","de la (de l')","des"],
        ["After negation / quantity","de (d')","de (d')","de (d')"]
      ]}
    ],
    examples:[
      {fr:"Les animaux du zoo mangent beaucoup de légumes.", en:"The zoo animals eat a lot of vegetables."},
      {fr:"Je voudrais de la confiture, s'il vous plaît.", en:"I'd like some jam, please."},
      {fr:"Il n'a pas d'argent en ce moment.", en:"He doesn't have any money at the moment."}
    ],
    quiz:[
      {q:"Which plural is correct for 'un cheval' (a horse)?", opts:["des chevals","des chevaux","des chevales","des cheval"], correct:1, explain:"Most -al nouns switch to -aux in the plural."},
      {q:"Je voudrais ___ eau, s'il vous plaît.", opts:["le","un","de l'","des"], correct:2, explain:"An uncountable amount of something takes the partitive: de l'eau."},
      {q:"Elle n'a pas ___ frères.", opts:["des","de","les","un"], correct:1, explain:"After a negation, des becomes de."},
      {q:"Which is the correct plural of 'un bateau'?", opts:["des bateaus","des bateaux","des bateaues","des bateau"], correct:1, explain:"Nouns ending -eau add -x in the plural."},
      {q:"Il y a beaucoup ___ monde ici ce soir.", opts:["de","du","des","de le"], correct:0, explain:"Expressions of quantity (beaucoup de) are followed by de, regardless of gender."}
    ],
    challenges:[
      {prompt:"Translate, choosing the right article throughout: 'I have some bread but I don't have any butter.'", answer:"J'ai du pain mais je n'ai pas de beurre.", note:"Partitive du in the positive; du collapses to de once the sentence is negated."}
    ],
    vocab:[
      {fr:"la fin", en:"the end"},
      {fr:"le début", en:"the beginning"},
      {fr:"une personne", en:"a person (always feminine, even for a man)"},
      {fr:"la moitié", en:"half"},
      {fr:"un problème", en:"a problem (masculine despite the -e)"},
      {fr:"un système", en:"a system (masculine despite the -e)"},
      {fr:"une image", en:"a picture / image"},
      {fr:"le silence", en:"silence"},
      {fr:"un/une élève", en:"a pupil (same word, either gender)"},
      {fr:"la plupart", en:"most / the majority"},
      {fr:"le/la ministre", en:"the minister (same word, either gender)"},
      {fr:"une chose", en:"a thing (always feminine)"},
      {fr:"un été", en:"a summer (masculine despite the -é)"},
      {fr:"une saison", en:"a season"},
      {fr:"un pays", en:"a country"},
      {fr:"un travail", en:"a job / piece of work"},
      {fr:"une voix", en:"a voice"},
      {fr:"un choix", en:"a choice"},
      {fr:"un groupe", en:"a group"},
      {fr:"un rôle", en:"a role"},
      {fr:"une région", en:"a region"},
      {fr:"un événement", en:"an event"},
      {fr:"un piège", en:"a trap (masculine, gender-tricky)"},
      {fr:"une dent", en:"a tooth (feminine, gender-tricky)"},
      {fr:"un incendie", en:"a fire (masculine despite -ie ending)"}
    ]
  },
  {
    id:'m10', num:10, fr:'Les Adjectifs — Panorama Complet', en:'Adjectives — The Full Picture',
    intro:"Agreement and position first, then the nuances — irregular forms, and the handful of adjectives that quietly change meaning depending on where you put them.",
    points:[
      {tag:'rule', title:'Basic agreement', text:"Add -e for feminine (grand → grande), -s for plural (grands), -es for feminine plural (grandes). Adjectives already ending in -e don't change for feminine at all: un jeune homme, une jeune femme."},
      {tag:'tip', title:'BAGS goes before the noun', text:"Most adjectives follow the noun (une voiture rouge), but a short, common set jumps in front of it instead — Beauty, Age, Goodness, Size: beau, joli, vieux, jeune, nouveau, bon, mauvais, grand, petit, gros. Everything else stays after the noun."},
      {tag:'watch', title:'Irregular agreement to memorise', text:"beau/bel/belle/beaux/belles, nouveau/nouvel/nouvelle, vieux/vieil/vieille (the middle 'bel/nouvel/vieil' form is used before a vowel-starting masculine noun: un bel homme); blanc/blanche, long/longue, doux/douce, gentil/gentille, heureux/heureuse."},
      {tag:'rule', title:'Possessives agree with the thing owned', text:"mon/ma/mes, ton/ta/tes, son/sa/ses, notre/nos, votre/vos, leur/leurs agree with the noun they describe, not with the owner. And before a vowel-starting feminine noun, mon/ton/son wins even for a female owner: mon amie."},
      {tag:'rule', title:'Demonstratives', text:"ce (masculine), cet (masculine before a vowel), cette (feminine), ces (plural) — ce livre, cet homme, cette femme, ces livres."},
      {tag:'tip', title:'Comparative & superlative', text:"Comparative: plus/moins/aussi + adjective + que (plus grand que). Superlative: le/la/les + plus/moins + adjective (le plus grand). Irregular in both: bon → meilleur → le meilleur."},
      {tag:'watch', title:'Position changes meaning', text:"A handful of adjectives quietly switch meaning depending on where they sit: ancien (before = former; after = ancient), propre (before = own; after = clean), cher (before = dear/beloved; after = expensive), dernier/prochain (before = final/next in a series; after = most recent/coming), seul (before = only; after = alone)."}
    ],
    tables:[
      {title:"Irregular adjective agreement", headers:["masculine (meaning)","masc. before vowel","feminine","masc. plural","fem. plural"], rows:[
        ["beau (beautiful/handsome)","bel","belle","beaux","belles"],
        ["nouveau (new)","nouvel","nouvelle","nouveaux","nouvelles"],
        ["vieux (old)","vieil","vieille","vieux","vieilles"],
        ["blanc (white)","—","blanche","blancs","blanches"],
        ["long (long)","—","longue","longs","longues"],
        ["gentil (kind)","—","gentille","gentils","gentilles"]
      ]},
      {title:"Possessive adjectives", headers:["owner","masc. singular","fem. singular","plural"], rows:[
        ["je","mon","ma (mon before a vowel)","mes"],
        ["tu","ton","ta (ton before a vowel)","tes"],
        ["il / elle","son","sa (son before a vowel)","ses"],
        ["nous","notre","notre","nos"],
        ["vous","votre","votre","vos"],
        ["ils / elles","leur","leur","leurs"]
      ]}
    ],
    examples:[
      {fr:"C'est un bel appartement avec une jolie vue.", en:"It's a lovely flat with a pretty view."},
      {fr:"Cette voiture est plus rapide que la mienne.", en:"This car is faster than mine."},
      {fr:"C'est mon ancien appartement, pas un bâtiment ancien.", en:"That's my former flat, not an ancient building."},
      {fr:"Sur la photo, je vois une fille sympathique et travailleuse qui porte un pull bleu.", en:"In the photo, I see a friendly, hardworking girl wearing a blue jumper — the kind of descriptive sentence exam boards reward at every level."}
    ],
    quiz:[
      {q:"Il a une ___ (nouveau) voiture rouge.", opts:["nouveau","nouvel","nouvelle","nouveaux"], correct:2, explain:"Nouveau agrees with the feminine noun voiture: nouvelle."},
      {q:"C'est un ___ (vieux) homme très sage.", opts:["vieux","vieil","vieille","vieil homme"], correct:1, explain:"Vieux becomes vieil before a vowel-starting masculine noun."},
      {q:"___ (mon, before feminine vowel-noun) amie habite à Lyon.", opts:["Ma","Mon","Ta","Sa"], correct:1, explain:"Before a vowel-starting feminine noun, use mon even though amie is feminine."},
      {q:"Elle chante ___ (bon, comparative) que moi.", opts:["plus bon","meilleure","mieux","plus meilleure"], correct:1, explain:"Bon's comparative adjective form is meilleur(e); mieux is the adverb form, used with verbs."},
      {q:"Choose the sentence meaning 'my own room' (not 'my clean room').", opts:["ma chambre propre","ma propre chambre","ma chambre est propre","propre ma chambre"], correct:1, explain:"Before the noun, propre means 'own'; after it, 'clean'."},
      {q:"___ (ce, before masculine noun) restaurant est excellent.", opts:["Ce","Cet","Cette","Ces"], correct:0, explain:"Ce is used before a masculine noun starting with a consonant."}
    ],
    challenges:[
      {prompt:"Translate, getting agreement and position both right: 'She bought a beautiful old house.'", answer:"Elle a acheté une belle vieille maison.", note:"Both beau and vieux are BAGS adjectives and go before the noun, in this order, both agreeing with the feminine maison."}
    ],
    vocab:[
      {fr:"intelligent(e)", en:"intelligent"},
      {fr:"sympathique / sympa", en:"nice / friendly"},
      {fr:"ennuyeux / ennuyeuse", en:"boring"},
      {fr:"passionnant(e)", en:"exciting"},
      {fr:"fier / fière", en:"proud"},
      {fr:"timide", en:"shy"},
      {fr:"bavard(e)", en:"talkative"},
      {fr:"déçu(e)", en:"disappointed"},
      {fr:"inquiet / inquiète", en:"worried"},
      {fr:"reconnaissant(e)", en:"grateful"},
      {fr:"agréable", en:"pleasant"},
      {fr:"désagréable", en:"unpleasant"},
      {fr:"amusant(e) / marrant(e)", en:"funny / amusing"},
      {fr:"drôle", en:"funny"},
      {fr:"casse-pieds", en:"annoying (invariable)"},
      {fr:"pénible", en:"tiresome / a pain"},
      {fr:"chouette", en:"great / cool (invariable)"},
      {fr:"génial(e)", en:"brilliant"},
      {fr:"nul(le)", en:"rubbish / useless"},
      {fr:"affreux / affreuse", en:"awful"},
      {fr:"horrible", en:"horrible"},
      {fr:"facile", en:"easy"},
      {fr:"difficile", en:"difficult"},
      {fr:"utile", en:"useful"},
      {fr:"inutile", en:"useless"},
      {fr:"honnête", en:"honest"},
      {fr:"paresseux / paresseuse", en:"lazy"},
      {fr:"travailleur / travailleuse", en:"hardworking"},
      {fr:"gentil / gentille", en:"kind"},
      {fr:"méchant(e)", en:"nasty / naughty"},
      {fr:"jaloux / jalouse", en:"jealous"},
      {fr:"égoïste", en:"selfish"},
      {fr:"généreux / généreuse", en:"generous"},
      {fr:"sensible", en:"sensitive"},
      {fr:"calme", en:"calm"},
      {fr:"stressant(e)", en:"stressful"},
      {fr:"fatigant(e)", en:"tiring"},
      {fr:"surprenant(e)", en:"surprising"},
      {fr:"étrange / bizarre", en:"strange"},
      {fr:"propre", en:"clean (after the noun)"},
      {fr:"sale", en:"dirty"},
      {fr:"vide", en:"empty"},
      {fr:"plein(e)", en:"full"},
      {fr:"bruyant(e)", en:"noisy"},
      {fr:"content(e)", en:"glad / pleased (OCR-confirmed)"},
      {fr:"faux / fausse", en:"wrong / false (OCR-confirmed)"},
      {fr:"formidable", en:"tremendous / fantastic (OCR-confirmed)"},
      {fr:"gratuit(e)", en:"free of charge (OCR-confirmed)"},
      {fr:"incroyable", en:"unbelievable (OCR-confirmed)"},
      {fr:"joyeux / joyeuse", en:"happy / joyful (OCR-confirmed)"},
      {fr:"laid(e)", en:"ugly (OCR-confirmed)"},
      {fr:"léger / légère", en:"light (weight) (OCR-confirmed)"},
      {fr:"lent(e)", en:"slow (OCR-confirmed)"},
      {fr:"magnifique", en:"magnificent (OCR-confirmed)"},
      {fr:"pâle", en:"pale (OCR-confirmed)"},
      {fr:"parfait(e)", en:"perfect (OCR-confirmed)"},
      {fr:"poli(e)", en:"polite (OCR-confirmed)"},
      {fr:"prêt(e)", en:"ready (OCR-confirmed)"},
      {fr:"privé(e)", en:"private (OCR-confirmed)"},
      {fr:"sûr(e)", en:"sure / certain (OCR-confirmed)"},
      {fr:"vrai(e)", en:"true / real (OCR-confirmed)"},
      {fr:"actuel(le)", en:"present / current (OCR-confirmed Higher)"},
      {fr:"impressionnant(e)", en:"impressive (OCR-confirmed Higher)"},
      {fr:"sourd(e)", en:"deaf (OCR-confirmed Higher)"},
      {fr:"têtu(e)", en:"stubborn (OCR-confirmed Higher)"},
      {fr:"tiède", en:"lukewarm (OCR-confirmed Higher)"}
    ]
  },
  {
    id:'m11', num:11, fr:'Les Adverbes — Panorama Complet', en:'Adverbs — The Full Picture',
    intro:"Turn almost any adjective into an adverb, dodge the exceptions, and know exactly where to drop it in a sentence.",
    points:[
      {tag:'rule', title:'The default recipe', text:"Take the feminine form of the adjective and add -ment: heureuse → heureusement, douce → doucement. If the masculine already ends in a vowel, just add -ment straight to that: vrai → vraiment, poli → poliment."},
      {tag:'watch', title:'The -ant/-ent switch', text:"Adjectives ending -ant or -ent don't follow the normal recipe: -ant → -amment (constant → constamment), -ent → -emment (récent → récemment). évident is a special case that keeps its é: évidemment."},
      {tag:'tip', title:'Irregulars that skip -ment entirely', text:"A few common adverbs don't come from -ment at all: bon → bien, mauvais → mal, meilleur → mieux (comparative), pire → plus mal/pis."},
      {tag:'rule', title:'Where it goes', text:"Short, everyday adverbs (bien, mal, déjà, encore, toujours, souvent) squeeze in between the auxiliary and the past participle in compound tenses — j'ai bien dormi. Longer ones, and most -ment adverbs, usually follow the whole verb instead: il a parlé calmement."}
    ],
    examples:[
      {fr:"Elle conduit prudemment sur cette route.", en:"She drives carefully on this road."},
      {fr:"J'ai déjà fini mes devoirs.", en:"I've already finished my homework."},
      {fr:"Il chante vraiment bien.", en:"He really sings well."},
      {fr:"Normalement, je fais mes devoirs tout de suite après l'école, mais aujourd'hui j'ai décidé de me reposer un peu d'abord.", en:"Normally I do my homework right after school, but today I decided to rest a bit first — the kind of opinion-plus-routine sentence that scores well in guided writing."}
    ],
    quiz:[
      {q:"Elle parle ___ (doux, adverb).", opts:["doucement","douxment","doucment","doucemment"], correct:0, explain:"Douce (feminine of doux) + ment → doucement."},
      {q:"Il conduit ___ (prudent, adverb).", opts:["prudentement","prudement","prudemment","prudament"], correct:2, explain:"Adjectives ending -ent form their adverb with -emment: prudent → prudemment."},
      {q:"Elle chante ___ que son frère.", opts:["bien","meilleur","mieux","meilleure"], correct:2, explain:"Bien's irregular comparative is mieux."},
      {q:"J'ai ___ fini mes devoirs.", opts:["déjà","vite","calmement","rapidement"], correct:0, explain:"Short adverbs like déjà sit between the auxiliary and the past participle."},
      {q:"Il a répondu ___ (poli, adverb) à la question.", opts:["poliement","poliment","polimment","politement"], correct:1, explain:"Poli already ends in a vowel, so just add -ment: poliment."}
    ],
    challenges:[
      {prompt:"Turn 'constant' into its adverb and use it in a sentence meaning 'She constantly checks her phone.'", answer:"Elle vérifie constamment son téléphone.", note:"Constant → constamment (the -ant → -amment pattern)."}
    ],
    vocab:[
      {fr:"souvent", en:"often"},
      {fr:"rarement", en:"rarely"},
      {fr:"parfois", en:"sometimes"},
      {fr:"presque", en:"almost"},
      {fr:"tout à fait", en:"completely"},
      {fr:"à peine", en:"barely / hardly"},
      {fr:"plutôt", en:"rather"},
      {fr:"vraiment", en:"really"},
      {fr:"heureusement", en:"fortunately"},
      {fr:"malheureusement", en:"unfortunately"},
      {fr:"très", en:"very"},
      {fr:"assez", en:"quite / enough"},
      {fr:"trop", en:"too / too much"},
      {fr:"beaucoup", en:"a lot"},
      {fr:"un peu", en:"a little"},
      {fr:"toujours", en:"always"},
      {fr:"jamais", en:"never"},
      {fr:"quelquefois", en:"sometimes"},
      {fr:"d'habitude", en:"usually"},
      {fr:"normalement", en:"normally"},
      {fr:"généralement", en:"generally"},
      {fr:"absolument", en:"absolutely"},
      {fr:"certainement", en:"certainly"},
      {fr:"probablement", en:"probably"},
      {fr:"facilement", en:"easily"},
      {fr:"lentement", en:"slowly"},
      {fr:"rapidement", en:"quickly"},
      {fr:"franchement", en:"frankly"},
      {fr:"personnellement", en:"personally"},
      {fr:"actuellement", en:"currently (false friend — not 'actually')"},
      {fr:"vite", en:"quickly / fast (AQA-confirmed, GCSE Unit 3)"},
      {fr:"tôt", en:"early (AQA-confirmed, GCSE Unit 5)"},
      {fr:"dur", en:"hard (also works as an adverb: travailler dur — AQA-confirmed)"},
      {fr:"directement", en:"directly (AQA-confirmed, GCSE Unit 2 Higher)"},
      {fr:"ensemble", en:"together (AQA-confirmed, GCSE Unit 1)"},
      {fr:"bientôt", en:"soon (OCR-confirmed)"},
      {fr:"encore", en:"still / yet (OCR-confirmed)"},
      {fr:"encore une fois", en:"once more / again (OCR-confirmed)"},
      {fr:"longtemps", en:"a long time (OCR-confirmed)"},
      {fr:"peut-être", en:"perhaps (OCR-confirmed)"},
      {fr:"récemment", en:"recently (OCR-confirmed)"},
      {fr:"soudain", en:"suddenly (OCR-confirmed)"},
      {fr:"tout à coup", en:"suddenly (OCR-confirmed)"},
      {fr:"surtout", en:"especially (OCR-confirmed)"},
      {fr:"tard", en:"late (OCR-confirmed)"},
      {fr:"volontiers", en:"willingly (OCR-confirmed)"},
      {fr:"aussitôt", en:"immediately (OCR-confirmed Higher)"},
      {fr:"couramment", en:"fluently (OCR-confirmed Higher)"}
    ]
  },
  {
    id:'m12', num:12, fr:'Les Pronoms — Panorama Complet', en:'Pronouns — The Full Picture',
    intro:"From the pronouns on autopilot to stacking two at once and picking the right relative pronoun under pressure.",
    points:[
      {tag:'tip', title:'on does a lot of heavy lifting', text:"Subject pronouns are je, tu, il/elle/on, nous, vous, ils/elles — and on pulls double duty. It's the everyday spoken word for 'we' (on va au cinéma), and it also means 'people in general' in broader statements (en France, on mange tard)."},
      {tag:'rule', title:'qui vs que', text:"qui replaces the subject of the clause (la fille qui chante), que replaces the object (le livre que je lis). Reflexive pronouns (me, te, se, nous, vous, se) follow the same 'right before the verb' rule: elle se lève, ils se parlent."},
      {tag:'watch', title:'The stacking order', text:"Direct object pronouns (me/te/le/la/nous/vous/les) and indirect object pronouns (me/te/lui/nous/vous/leur) both sit right before the verb — but when you need both at once, the order is fixed: me/te/se/nous/vous → le/la/les → lui/leur. Il me le donne. Je le lui offre."},
      {tag:'watch', title:"Verbs that secretly take à + person (so it's lui, not le/la)", text:"A whole set of common verbs put à in front of the person, which makes that person an indirect object — so they're replaced by lui/leur, never le/la/les, even though the English translation looks direct. parler à (to speak to), téléphoner à (to phone), répondre à (to answer), écrire à (to write to), donner à (to give to), demander à (to ask), envoyer à (to send to), prêter à (to lend to), conseiller à (to advise) and ressembler à (to resemble) are the classic set. Je téléphone à Marie becomes Je lui téléphone, not Je la téléphone — a mistake almost everyone makes at first."},
      {tag:'tip', title:'y and en are shortcuts', text:"y swaps in for à + a place or thing; en swaps in for de + a noun or quantity. Both combine with other pronouns too: il y en a beaucoup; elle m'en a parlé."},
      {tag:'watch', title:'Beyond qui/que', text:"dont replaces de + noun (possession, or verbs governed by de like avoir besoin de). lequel/laquelle/lesquels/lesquelles are used as the object of a preposition, for things. ce qui/ce que/ce dont refer to a whole idea rather than one specific noun."},
      {tag:'rule', title:'Disjunctive pronouns for emphasis', text:"moi, toi, lui, elle, nous, vous, eux, elles show up after a preposition (avec moi), for emphasis (Moi, je pense que...), in comparisons (plus grand que lui), and as standalone answers: Qui a fait ça ? — Moi."}
    ],
    tables:[
      {title:"Pronouns by person", headers:["person","subject","direct object","indirect object","disjunctive"], rows:[
        ["je","je","me","me","moi"],
        ["tu","tu","te","te","toi"],
        ["il / elle","il / elle","le / la","lui","lui / elle"],
        ["nous","nous","nous","nous","nous"],
        ["vous","vous","vous","vous","vous"],
        ["ils / elles","ils / elles","les","leur","eux / elles"]
      ]},
      {title:"Verbs that take à + person — always lui/leur, never le/la/les", headers:["verb","meaning"], rows:[
        ["parler à","to speak to"],
        ["téléphoner à","to phone"],
        ["répondre à","to answer"],
        ["écrire à","to write to"],
        ["donner à","to give to"],
        ["demander à","to ask"],
        ["envoyer à","to send to"],
        ["prêter à","to lend to"],
        ["conseiller à","to advise"],
        ["ressembler à","to resemble"]
      ], note:"Test it yourself: if you can rephrase the English as '...to someone' (speak to, write to, send to), it's almost always à + person in French too, which means lui/leur."}
    ],
    examples:[
      {fr:"C'est le livre dont je t'ai parlé.", en:"That's the book I told you about."},
      {fr:"Il me le donne demain.", en:"He's giving it to me tomorrow."},
      {fr:"Moi, je préfère rester à la maison.", en:"Me, I'd rather stay home."},
      {fr:"Je téléphone souvent à mes grands-parents. Je leur téléphone tous les dimanches.", en:"I often phone my grandparents. I phone them every Sunday."},
      {fr:"Tu ressembles beaucoup à ton père.", en:"You look a lot like your father."}
    ],
    quiz:[
      {q:"___ va au cinéma ce soir ? (informal 'we')", opts:["Nous","On","Ils","Vous"], correct:1, explain:"On is the everyday spoken French for 'we'."},
      {q:"La fille ___ chante est ma sœur.", opts:["que","qui","dont","laquelle"], correct:1, explain:"Qui replaces the subject of the relative clause."},
      {q:"Je donne le cadeau à Marie. → Je ___.", opts:["le lui donne","lui le donne","donne le lui","le donne lui"], correct:0, explain:"Direct object (le) comes before the third-person indirect object (lui): le lui donne."},
      {q:"Voici le stylo ___ j'ai besoin.", opts:["que","qui","dont","lequel"], correct:2, explain:"Avoir besoin de is governed by de, so the relative pronoun is dont."},
      {q:"Combien de pommes as-tu ? — J'___ ai trois.", opts:["y","en","le","leur"], correct:1, explain:"En replaces de + the noun after a quantity."},
      {q:"C'est le stylo avec ___ j'écris.", opts:["qui","que","dont","lequel"], correct:3, explain:"Object of a preposition referring to a thing takes lequel."},
      {q:"___, je pense que c'est une bonne idée.", opts:["Je","Moi","Me","Mon"], correct:1, explain:"Disjunctive pronouns like moi are used for emphasis at the start of a sentence."},
      {q:"J'écris à mes cousins chaque mois. → Je ___ écris chaque mois.", opts:["les","leur","eux","y"], correct:1, explain:"Écrire à is an indirect-object verb, so 'to my cousins' becomes leur, not les."},
      {q:"Elle téléphone à sa mère. → Elle ___ téléphone.", opts:["la","lui","elle","y"], correct:1, explain:"Téléphoner à always takes an indirect object pronoun: lui, not la."}
    ],
    challenges:[
      {prompt:"Translate, combining two pronouns: 'I'm going to give them to you tomorrow.' (them = les cadeaux)", answer:"Je vais te les donner demain.", note:"Te (indirect, 2nd person) comes before les (direct) — the 1st/2nd person group always precedes le/la/les."}
    ],
    vocab:[
      {fr:"quelqu'un", en:"someone"},
      {fr:"quelque chose", en:"something"},
      {fr:"chacun(e)", en:"each one"},
      {fr:"plusieurs", en:"several"},
      {fr:"certains / certaines", en:"some / certain ones"},
      {fr:"tout le monde", en:"everyone"},
      {fr:"n'importe qui", en:"anyone (at all)"},
      {fr:"n'importe quoi", en:"anything (at all) / nonsense"},
      {fr:"n'importe lequel", en:"any one (at all)"},
      {fr:"chacun pour soi", en:"every man for himself"},
      {fr:"soi-même", en:"oneself"},
      {fr:"lui-même / elle-même", en:"himself / herself"},
      {fr:"nous-mêmes", en:"ourselves"},
      {fr:"les autres", en:"the others / other people"},
      {fr:"l'un(e) l'autre", en:"one another"},
      {fr:"celui-ci / celle-ci", en:"this one"},
      {fr:"celui-là / celle-là", en:"that one"},
      {fr:"quelque part", en:"somewhere"},
      {fr:"n'importe", en:"it doesn't matter (Higher-tier idiom)"},
      {fr:"n'importe où", en:"anywhere (at all)"},
      {fr:"n'importe quand", en:"anytime (at all)"},
      {fr:"le sien / la sienne", en:"his / hers (possessive pronoun)"},
      {fr:"le mien / la mienne", en:"mine"},
      {fr:"le nôtre / la nôtre", en:"ours"},
      {fr:"ce dernier / cette dernière", en:"the latter"},
      {fr:"parler à", en:"to speak to"},
      {fr:"téléphoner à", en:"to phone"},
      {fr:"répondre à", en:"to answer"},
      {fr:"écrire à", en:"to write to"},
      {fr:"donner à", en:"to give to"},
      {fr:"demander à", en:"to ask"},
      {fr:"envoyer à", en:"to send to"},
      {fr:"prêter à", en:"to lend to"},
      {fr:"conseiller à", en:"to advise"},
      {fr:"ressembler à", en:"to resemble"}
    ]
  },
  {
    id:'m13', num:13, fr:'Prépositions et Conjonctions — Panorama Complet', en:'Prepositions and Conjunctions — The Full Picture',
    intro:"The small connector words — where, when, which preposition a verb secretly demands, and which conjunctions quietly summon the subjunctive.",
    points:[
      {tag:'rule', title:'Time prepositions', text:"à (at — à trois heures), en (in — en été, en 2024), pendant (during/for), depuis (since/for), avant/après (before/after), dans (in — as in 'in an hour's time', dans une heure)."},
      {tag:'rule', title:'Place & movement prepositions', text:"à, en, dans, sur, sous, devant, derrière, entre, chez (at someone's home or business), vers (towards), par (through/by)."},
      {tag:'watch', title:'Verbs with fixed prepositions', text:"penser à (think about), s'agir de (to be about), se souvenir de (remember), réussir à (succeed in), s'intéresser à (be interested in), avoir besoin de (need), profiter de (take advantage of) — these pairings are non-negotiable, so learn the verb and its preposition as one unit."},
      {tag:'tip', title:'Linking words for a strong essay', text:"et, mais, ou, donc, car cover the basics; for actually structuring an argument, reach for d'abord, ensuite, puis, cependant, enfin — they're what separates a list of sentences from a real piece of writing."},
      {tag:'watch', title:'Subjunctive-triggering conjunctions', text:"bien que, pour que, avant que, à condition que, jusqu'à ce que, sans que all trigger the subjunctive. parce que, depuis que, dès que, pendant que, tandis que don't — same 'que' shape, completely different mood that follows."}
    ],
    examples:[
      {fr:"Je pense souvent à mes vacances.", en:"I often think about my holidays."},
      {fr:"D'abord on mange, ensuite on part.", en:"First we eat, then we leave."},
      {fr:"Bien qu'il soit tard, nous continuons.", en:"Although it's late, we keep going."}
    ],
    quiz:[
      {q:"Je m'intéresse ___ la politique.", opts:["de","à","en","pour"], correct:1, explain:"S'intéresser à is a fixed pairing."},
      {q:"Il s'agit ___ un malentendu.", opts:["à","de","sur","avec"], correct:1, explain:"S'agir de is a fixed pairing."},
      {q:"Nous partons en vacances ___ juillet.", opts:["à","en","dans","sur"], correct:1, explain:"En is used before months: en juillet."},
      {q:"Je vais chez le médecin, puis ___ chez le dentiste.", opts:["chez","à","en","vers"], correct:0, explain:"Chez is used for 'at/to someone's place' generally, including a professional's."},
      {q:"Which conjunction requires the subjunctive?", opts:["parce que","bien que","depuis que","dès que"], correct:1, explain:"Bien que ('although') is a subjunctive trigger; the others take the indicative."},
      {q:"___ tu sois fatigué, il faut continuer.", opts:["Parce que","Bien que","Pendant que","Dès que"], correct:1, explain:"Bien que triggers the subjunctive (sois)."}
    ],
    challenges:[
      {prompt:"Translate, choosing prepositions and the right mood throughout: 'We'll leave before he arrives, although he'll be sad about it.'", answer:"Nous partirons avant qu'il n'arrive, bien qu'il soit triste à ce sujet.", note:"Avant que and bien que both trigger the subjunctive (arrive, soit); the ne here is expletive, not a true negation."}
    ],
    vocab:[
      {fr:"d'ailleurs", en:"besides / moreover"},
      {fr:"par contre", en:"on the other hand"},
      {fr:"en revanche", en:"however"},
      {fr:"de plus", en:"furthermore"},
      {fr:"grâce à", en:"thanks to"},
      {fr:"à cause de", en:"because of"},
      {fr:"malgré", en:"despite"},
      {fr:"afin de", en:"in order to"},
      {fr:"afin que", en:"so that (subjunctive)"},
      {fr:"alors", en:"so / then"},
      {fr:"donc", en:"so / therefore"},
      {fr:"cependant", en:"however"},
      {fr:"ensuite", en:"next"},
      {fr:"puis", en:"then"},
      {fr:"enfin", en:"finally / at last"},
      {fr:"d'abord", en:"first of all"},
      {fr:"autrefois", en:"formerly / in the past"},
      {fr:"quant à", en:"as for"},
      {fr:"quand même", en:"even so / all the same"},
      {fr:"non plus", en:"neither / not... either"},
      {fr:"également", en:"equally / also"},
      {fr:"par conséquent", en:"as a result / consequently"},
      {fr:"ainsi", en:"thus / so"},
      {fr:"environ", en:"around / about"},
      {fr:"tandis que", en:"whereas"},
      {fr:"au lieu de", en:"instead of"},
      {fr:"selon", en:"according to"},
      {fr:"autour de", en:"around"}
    ]
  },
  {
    id:'m14', num:14, fr:'Identité, Famille et Caractère', en:'Identity, Family & Personality',
    intro:"The absolute foundation topic — talking about yourself, your family, and what people are like. Every other topic on this site assumes you can already do this fluently.",
    points:[
      {tag:'rule', title:'The basics: name, age, birthday', text:"Je m'appelle... (I'm called...), j'ai [x] ans (I'm x years old — always avoir, never être, for age), mon anniversaire est le [date]. Né(e) le... gives the actual birth date."},
      {tag:'rule', title:'Family members', text:"le père/la mère, les parents, le frère/la sœur, les grands-parents, le grand-père/la grand-mère, l'oncle/la tante, le cousin/la cousine, le demi-frère/la demi-sœur (half-sibling), le beau-père/la belle-mère (step-parent)."},
      {tag:'tip', title:'Physical appearance uses avoir, not être', text:"Hair and eyes go with avoir: il a les cheveux bruns et les yeux verts (he has brown hair and green eyes) — a very common mistake is reaching for être here. Height and build do use être: il est grand, elle est de taille moyenne."},
      {tag:'watch', title:'Personality goes with être', text:"il/elle est + adjective (intelligent, sympa, timide...) — full agreement rules are in the Adjectives module, but this is where you'll use them most."}
    ],
    examples:[
      {fr:"Je m'appelle Thomas et j'ai treize ans.", en:"My name's Thomas and I'm thirteen."},
      {fr:"Mon père est grand et il a les cheveux gris.", en:"My dad is tall and has grey hair."},
      {fr:"J'ai une sœur aînée qui est très bavarde.", en:"I have an older sister who's very talkative."}
    ],
    quiz:[
      {q:"J'___ (avoir) douze ans.", opts:["suis","ai","es","a"], correct:1, explain:"Age always uses avoir in French: j'ai douze ans, never je suis douze."},
      {q:"Il ___ les yeux bleus.", opts:["est","a","es","ai"], correct:1, explain:"Eye and hair colour use avoir, not être."},
      {q:"Le frère de mon père est mon ___.", opts:["cousin","oncle","beau-père","grand-père"], correct:1, explain:"Your father's brother is your oncle (uncle)."},
      {q:"Elle ___ (être) très sympathique.", opts:["a","es","est","sont"], correct:2, explain:"Personality descriptions use être: elle est sympathique."}
    ],
    vocab:[
      {fr:"je m'appelle", en:"my name is / I'm called"},
      {fr:"j'ai ... ans", en:"I am ... years old"},
      {fr:"né(e) le", en:"born on"},
      {fr:"le père / la mère", en:"father / mother"},
      {fr:"les parents", en:"parents"},
      {fr:"le frère / la sœur", en:"brother / sister"},
      {fr:"les grands-parents", en:"grandparents"},
      {fr:"le grand-père / la grand-mère", en:"grandfather / grandmother"},
      {fr:"l'oncle / la tante", en:"uncle / aunt"},
      {fr:"le cousin / la cousine", en:"cousin"},
      {fr:"le demi-frère / la demi-sœur", en:"half-brother / half-sister"},
      {fr:"le beau-père / la belle-mère", en:"step-father / step-mother"},
      {fr:"les cheveux", en:"hair"},
      {fr:"les yeux", en:"eyes"},
      {fr:"frisé(e)", en:"curly"},
      {fr:"raide", en:"straight (hair)"},
      {fr:"de taille moyenne", en:"medium height"},
      {fr:"célibataire", en:"single"},
      {fr:"marié(e)", en:"married"},
      {fr:"fils unique / fille unique", en:"only child"},
      {fr:"divorcé(e)", en:"divorced"},
      {fr:"l'aîné(e)", en:"the eldest"},
      {fr:"le/la cadet(te)", en:"the youngest"},
      {fr:"s'appeler", en:"to be called"},
      {fr:"un(e) ami(e)", en:"a friend"},
      {fr:"un copain / une copine", en:"a mate / friend (informal)"},
      {fr:"un animal domestique", en:"a pet"},
      {fr:"ressembler à", en:"to look like / resemble"},
      {fr:"tenir de", en:"to take after (a relative)"},
      {fr:"bien s'entendre avec", en:"to get on well with"},
      {fr:"se disputer avec", en:"to argue with"},
      {fr:"chauve", en:"bald"},
      {fr:"barbu", en:"bearded"},
      {fr:"porter des lunettes", en:"to wear glasses"},
      {fr:"mignon(ne)", en:"cute"},
      {fr:"confiant(e)", en:"confident"},
      {fr:"la personnalité", en:"personality"}
    ]
  },
  {
    id:'m15', num:15, fr:'La Vie Scolaire', en:'School Life',
    intro:"School is the single most-tested topic at this level — subjects, opinions, timetables, and daily routine come up in reading, writing and speaking alike.",
    points:[
      {tag:'rule', title:'Naming subjects', text:"les maths, le français, l'anglais, les sciences, l'histoire-géo, l'EPS (PE), la technologie, l'informatique (IT). Most take le/la/les like any noun; remember the article even when English would drop it: j'aime les maths, not j'aime maths."},
      {tag:'tip', title:'Giving an opinion on a subject', text:"J'aime/Je n'aime pas/Je déteste/J'adore + subject, then justify it: parce que c'est intéressant/ennuyeux/difficile/facile. Examiners always want the reason, not just the opinion."},
      {tag:'watch', title:'School-day vocabulary', text:"la récré(ation) (break), la cantine (canteen/dinner hall), l'emploi du temps (timetable), une salle de classe (classroom), le/la prof (teacher, informal), l'uniforme scolaire (school uniform)."},
      {tag:'rule', title:'Exam & progress vocabulary', text:"passer un examen (to sit an exam — a classic false friend, not 'to pass'), réussir un examen (to pass), rater un examen (to fail), redoubler (to repeat a year)."}
    ],
    examples:[
      {fr:"Ma matière préférée est l'histoire parce que le prof est passionnant.", en:"My favourite subject is history because the teacher is fascinating."},
      {fr:"Je déteste les maths, c'est trop difficile.", en:"I hate maths, it's too difficult."},
      {fr:"On mange à la cantine à midi et quart.", en:"We eat in the canteen at quarter past twelve."}
    ],
    quiz:[
      {q:"J'aime ___ sciences.", opts:["le","la","les","l'"], correct:2, explain:"Sciences is plural: les sciences."},
      {q:"Je ___ (passer) un examen demain.", opts:["passe","réussis","rate","redouble"], correct:0, explain:"Passer un examen means 'to sit an exam' — a classic false friend, not 'to pass'."},
      {q:"Which word means 'to fail an exam'?", opts:["réussir","passer","rater","redoubler"], correct:2, explain:"Rater un examen = to fail an exam."},
      {q:"On mange à ___.", opts:["la récré","la cantine","l'emploi du temps","la salle de classe"], correct:1, explain:"La cantine is the canteen — where you eat lunch."}
    ],
    vocab:[
      {fr:"les maths", en:"maths"},
      {fr:"le français", en:"French"},
      {fr:"l'anglais", en:"English"},
      {fr:"les sciences", en:"science"},
      {fr:"l'histoire-géo", en:"history-geography"},
      {fr:"l'EPS", en:"PE"},
      {fr:"la technologie", en:"technology / DT"},
      {fr:"l'informatique", en:"IT / computing"},
      {fr:"la récré(ation)", en:"break time"},
      {fr:"la cantine", en:"canteen / dinner hall"},
      {fr:"l'emploi du temps", en:"timetable"},
      {fr:"une salle de classe", en:"a classroom"},
      {fr:"le/la prof", en:"teacher (informal)"},
      {fr:"le/la directeur/-trice", en:"head teacher"},
      {fr:"l'uniforme scolaire", en:"school uniform"},
      {fr:"les devoirs", en:"homework"},
      {fr:"la rentrée", en:"back-to-school (start of year)"},
      {fr:"le collège", en:"secondary school (11-15)"},
      {fr:"le lycée", en:"secondary school (15-18)"},
      {fr:"une note", en:"a mark / grade"},
      {fr:"un bulletin", en:"a report card"},
      {fr:"le trimestre", en:"the term"},
      {fr:"une punition", en:"a punishment / detention"},
      {fr:"lever la main", en:"to put your hand up"},
      {fr:"faire attention en classe", en:"to pay attention in class"},
      {fr:"bavarder", en:"to chat / talk in class"},
      {fr:"interdit(e)", en:"forbidden"},
      {fr:"obligatoire", en:"compulsory"},
      {fr:"redoubler", en:"to repeat a year"},
      {fr:"passer un examen", en:"to sit an exam"},
      {fr:"réussir / rater un examen", en:"to pass / fail an exam"}
    ]
  },
  {
    id:'m16', num:16, fr:'Le Temps Libre et les Loisirs', en:'Free Time & Hobbies',
    intro:"What you do when you're not at school — sport, screens, reading, going out. Simple content, but examiners expect real detail: how often, with whom, and why you like it.",
    points:[
      {tag:'rule', title:'Sports use jouer à or faire de', text:"jouer à + sport played against someone: jouer au foot, jouer au tennis. Faire de + activity you just do: faire de la natation (swimming), faire du vélo (cycling), faire de l'équitation (horse-riding)."},
      {tag:'tip', title:'Music and instruments use jouer de', text:"jouer de la guitare, jouer du piano, jouer de la batterie (drums) — de, not à, once an instrument is involved."},
      {tag:'watch', title:'Frequency words matter for detail', text:"tous les jours (every day), le week-end (at the weekend), une/deux fois par semaine (once/twice a week), de temps en temps (from time to time) — stacking these onto a hobby sentence is easy extra marks."},
      {tag:'rule', title:'Screen & social vocabulary', text:"les jeux vidéo (video games), les réseaux sociaux (social media), une série (a TV series), télécharger (to download), en ligne (online)."}
    ],
    examples:[
      {fr:"Je joue au foot tous les samedis avec mes copains.", en:"I play football every Saturday with my friends."},
      {fr:"Elle fait de la natation deux fois par semaine.", en:"She goes swimming twice a week."},
      {fr:"Le week-end, je préfère lire ou jouer aux jeux vidéo.", en:"At the weekend, I prefer reading or playing video games."}
    ],
    quiz:[
      {q:"Je joue ___ tennis le samedi.", opts:["à","au","de la","du"], correct:1, explain:"Jouer à + le contracts to au: jouer au tennis."},
      {q:"Elle joue ___ guitare depuis trois ans.", opts:["à la","au","de la","du"], correct:2, explain:"Instruments take jouer de: jouer de la guitare."},
      {q:"Il fait ___ vélo tous les jours.", opts:["au","du","de la","à"], correct:1, explain:"Faire de + le contracts to du: faire du vélo."},
      {q:"Which phrase means 'twice a week'?", opts:["de temps en temps","tous les jours","deux fois par semaine","le week-end"], correct:2, explain:"Deux fois par semaine = twice a week."}
    ],
    vocab:[
      {fr:"le foot(ball)", en:"football"},
      {fr:"le rugby", en:"rugby"},
      {fr:"la natation", en:"swimming"},
      {fr:"le vélo / le cyclisme", en:"cycling"},
      {fr:"l'équitation", en:"horse-riding"},
      {fr:"les échecs", en:"chess"},
      {fr:"jouer de la guitare / du piano", en:"to play guitar / piano"},
      {fr:"la lecture", en:"reading"},
      {fr:"dessiner", en:"to draw"},
      {fr:"les jeux vidéo", en:"video games"},
      {fr:"les réseaux sociaux", en:"social media"},
      {fr:"une série", en:"a TV series"},
      {fr:"un film", en:"a film"},
      {fr:"un concert", en:"a concert"},
      {fr:"sortir avec des amis", en:"to go out with friends"},
      {fr:"tous les jours", en:"every day"},
      {fr:"une/deux fois par semaine", en:"once/twice a week"},
      {fr:"de temps en temps", en:"from time to time"},
      {fr:"un passe-temps", en:"a hobby / pastime"},
      {fr:"la peinture", en:"painting"},
      {fr:"la danse", en:"dance"},
      {fr:"le théâtre", en:"drama / theatre"},
      {fr:"faire de la photographie", en:"to do photography"},
      {fr:"collectionner", en:"to collect"},
      {fr:"passionné(e) de", en:"keen on / passionate about"},
      {fr:"s'ennuyer", en:"to get bored"},
      {fr:"se détendre", en:"to relax"},
      {fr:"une équipe", en:"a team"},
      {fr:"un membre", en:"a member"},
      {fr:"gagner / perdre", en:"to win / lose"}
    ]
  },
  {
    id:'m17', num:17, fr:'La Maison et la Ville', en:'House, Home & Town',
    intro:"Describing where you live and finding your way around — rooms, town features, and giving directions.",
    points:[
      {tag:'rule', title:'Types of home', text:"une maison (house), un appartement (flat), une ferme (farmhouse) — habiter + dans/à: j'habite dans une maison; j'habite à Londres."},
      {tag:'tip', title:'Rooms of the house', text:"la cuisine (kitchen), le salon (living room), la chambre (bedroom), la salle de bains (bathroom), le jardin (garden), le grenier (attic), la cave (cellar)."},
      {tag:'watch', title:'Places in town', text:"la mairie (town hall), l'église (church), le marché (market), la piscine (swimming pool), le parc (park), la gare (station), l'arrêt de bus (bus stop)."},
      {tag:'rule', title:'Giving directions', text:"tout droit (straight ahead), à gauche/à droite (left/right), traverser (to cross), au coin de (at the corner of), continuer jusqu'à (continue until). Directions use the tu/vous imperative from Module 2: tournez à gauche, continuez tout droit."}
    ],
    examples:[
      {fr:"J'habite dans une petite maison avec un grand jardin.", en:"I live in a small house with a big garden."},
      {fr:"Ma chambre est au premier étage.", en:"My bedroom is on the first floor."},
      {fr:"Pour aller à la piscine, tournez à gauche puis continuez tout droit.", en:"To get to the swimming pool, turn left then continue straight ahead."}
    ],
    quiz:[
      {q:"J'habite ___ un appartement.", opts:["à","dans","en","au"], correct:1, explain:"Habiter dans + type of home: habiter dans un appartement."},
      {q:"On prépare le dîner dans ___.", opts:["le salon","la chambre","la cuisine","le jardin"], correct:2, explain:"La cuisine is the kitchen, where meals are prepared."},
      {q:"Which word means 'straight ahead'?", opts:["à droite","tout droit","au coin de","traverser"], correct:1, explain:"Tout droit means straight ahead."},
      {q:"Les trains partent de ___.", opts:["la mairie","l'église","la gare","le marché"], correct:2, explain:"La gare is the (railway) station."}
    ],
    vocab:[
      {fr:"une maison", en:"a house"},
      {fr:"un appartement", en:"a flat"},
      {fr:"la cuisine", en:"the kitchen"},
      {fr:"le salon", en:"the living room"},
      {fr:"la chambre", en:"the bedroom"},
      {fr:"la salle de bains", en:"the bathroom"},
      {fr:"le jardin", en:"the garden"},
      {fr:"la ville", en:"the town"},
      {fr:"le village", en:"the village"},
      {fr:"la banlieue", en:"the suburbs"},
      {fr:"la mairie", en:"the town hall"},
      {fr:"l'église", en:"the church"},
      {fr:"le marché", en:"the market"},
      {fr:"la piscine", en:"the swimming pool"},
      {fr:"le parc", en:"the park"},
      {fr:"la gare", en:"the station"},
      {fr:"l'arrêt de bus", en:"the bus stop"},
      {fr:"tout droit", en:"straight ahead"},
      {fr:"la salle à manger", en:"the dining room"},
      {fr:"le grenier", en:"the attic"},
      {fr:"la cave", en:"the cellar"},
      {fr:"le rez-de-chaussée", en:"the ground floor"},
      {fr:"un étage", en:"a floor / storey"},
      {fr:"les rideaux", en:"the curtains"},
      {fr:"le quartier", en:"the neighbourhood"},
      {fr:"le centre-ville", en:"town centre"},
      {fr:"la bibliothèque", en:"the library"},
      {fr:"l'hôtel de ville", en:"the town hall (alternative term)"},
      {fr:"le commissariat", en:"the police station"},
      {fr:"la zone piétonne", en:"the pedestrian zone"},
      {fr:"animé(e)", en:"lively / bustling"},
      {fr:"tranquille", en:"quiet / peaceful"},
      {fr:"à gauche / à droite", en:"left / right"},
      {fr:"traverser", en:"to cross"}
    ]
  },
  {
    id:'m18', num:18, fr:'La Nourriture et les Repas', en:'Food & Drink',
    intro:"Meals, food items, and eating out — a topic that leans heavily on the partitive articles from the Nouns module, so the two pair naturally.",
    points:[
      {tag:'rule', title:'The three meals', text:"le petit-déjeuner (breakfast), le déjeuner (lunch), le dîner (dinner) — all masculine, and all pair naturally with prendre: je prends le petit-déjeuner à sept heures."},
      {tag:'tip', title:'Hunger and thirst use avoir', text:"avoir faim (to be hungry), avoir soif (to be thirsty) — like age, these go with avoir, not être: j'ai faim, not je suis faim."},
      {tag:'watch', title:'Structuring a meal out', text:"une entrée (starter), un plat principal (main course), un dessert, l'addition (the bill — not 'addition' in the maths sense), commander (to order)."},
      {tag:'rule', title:'Taste and diet vocabulary', text:"sucré(e) (sweet), salé(e) (savoury/salty), végétarien(ne), végan(e), allergique à (allergic to)."}
    ],
    examples:[
      {fr:"Je prends toujours un café au petit-déjeuner.", en:"I always have a coffee at breakfast."},
      {fr:"J'ai très faim, on peut manger maintenant ?", en:"I'm really hungry, can we eat now?"},
      {fr:"Comme dessert, je voudrais une glace au chocolat.", en:"For dessert, I'd like a chocolate ice cream."}
    ],
    quiz:[
      {q:"J'___ (avoir) très soif.", opts:["suis","ai","es","a"], correct:1, explain:"Thirst uses avoir: j'ai soif, not je suis soif."},
      {q:"Which meal is 'le déjeuner'?", opts:["breakfast","lunch","dinner","a snack"], correct:1, explain:"Le déjeuner is lunch (le petit-déjeuner is breakfast)."},
      {q:"À la fin du repas, on demande ___.", opts:["l'entrée","le plat principal","l'addition","le dessert"], correct:2, explain:"L'addition is the bill, asked for at the end of the meal."},
      {q:"Elle ne mange pas de viande — elle est ___.", opts:["salée","sucrée","allergique","végétarienne"], correct:3, explain:"Not eating meat means végétarienne (vegetarian)."}
    ],
    vocab:[
      {fr:"le petit-déjeuner", en:"breakfast"},
      {fr:"le déjeuner", en:"lunch"},
      {fr:"le dîner", en:"dinner"},
      {fr:"avoir faim / soif", en:"to be hungry / thirsty"},
      {fr:"le pain", en:"bread"},
      {fr:"le fromage", en:"cheese"},
      {fr:"la viande", en:"meat"},
      {fr:"le poisson", en:"fish"},
      {fr:"les légumes", en:"vegetables"},
      {fr:"les fruits", en:"fruit"},
      {fr:"un repas", en:"a meal"},
      {fr:"une entrée", en:"a starter"},
      {fr:"un plat principal", en:"a main course"},
      {fr:"un dessert", en:"a dessert"},
      {fr:"l'addition", en:"the bill"},
      {fr:"commander", en:"to order"},
      {fr:"sucré(e)", en:"sweet"},
      {fr:"salé(e)", en:"savoury / salty"},
      {fr:"végétarien(ne)", en:"vegetarian"},
      {fr:"une boisson", en:"a drink"},
      {fr:"l'eau (minérale)", en:"(mineral) water"},
      {fr:"un jus de fruit", en:"a fruit juice"},
      {fr:"les œufs", en:"eggs"},
      {fr:"le poulet", en:"chicken"},
      {fr:"les pâtes", en:"pasta"},
      {fr:"le riz", en:"rice"},
      {fr:"une glace", en:"an ice cream"},
      {fr:"un gâteau", en:"a cake"},
      {fr:"avoir bon goût", en:"to taste good"},
      {fr:"un serveur / une serveuse", en:"a waiter / waitress"},
      {fr:"faire les courses", en:"to do the food shopping"},
      {fr:"cuisiner", en:"to cook"},
      {fr:"une recette", en:"a recipe"},
      {fr:"allergique à", en:"allergic to"}
    ]
  },
  {
    id:'m19', num:19, fr:'Les Vacances, la Météo et l\'Avenir', en:'Holidays, Weather & Future Plans',
    intro:"Three lighter topics that share a lot of overlap — talking about trips, the weather during them, and looking ahead to what comes next.",
    points:[
      {tag:'rule', title:'Weather uses il fait / il y a / impersonal verbs', text:"il fait beau/mauvais/chaud/froid (it's nice/bad/hot/cold weather), il y a du soleil/du vent (there's sun/wind), il pleut (it's raining), il neige (it's snowing) — all third-person singular, never conjugated for any other subject."},
      {tag:'tip', title:'Holiday vocabulary', text:"les vacances (holidays — always plural in French), partir en vacances (to go on holiday), à l'étranger (abroad), faire du camping, la plage (beach), la montagne (mountains)."},
      {tag:'watch', title:'Talking about the future', text:"Combine the futur proche and futur simple from Module 1 with future-specific vocabulary: l'année prochaine (next year), plus tard (later on), à l'avenir (in the future)."},
      {tag:'rule', title:'Jobs and ambitions', text:"un métier / une profession (a job), devenir + job (to become a...), je voudrais être... (I would like to be...) — job nouns often drop the article after être: il est médecin, not il est un médecin."}
    ],
    examples:[
      {fr:"L'été dernier, nous sommes partis en vacances en Espagne.", en:"Last summer, we went on holiday to Spain."},
      {fr:"Il faisait très chaud et il y avait du soleil tous les jours.", en:"It was very hot and there was sun every day."},
      {fr:"Plus tard, je voudrais devenir avocat.", en:"Later on, I'd like to become a lawyer."}
    ],
    quiz:[
      {q:"___ beau aujourd'hui.", opts:["Il a","Il fait","Il est","Il y a"], correct:1, explain:"Weather descriptions like this use il fait: il fait beau."},
      {q:"___ du vent ce matin.", opts:["Il fait","Il pleut","Il y a","Il neige"], correct:2, explain:"Il y a du vent — 'there's wind' — uses il y a, not il fait."},
      {q:"Elle est ___ (profession, no article).", opts:["une professeure","professeure","la professeure","de professeure"], correct:1, explain:"Job nouns after être normally drop the article: elle est professeure."},
      {q:"Nous partons ___ vacances demain.", opts:["à","en","au","dans les"], correct:1, explain:"Partir en vacances is the fixed phrase — en, not à."}
    ],
    vocab:[
      {fr:"les vacances", en:"the holidays"},
      {fr:"partir en vacances", en:"to go on holiday"},
      {fr:"à l'étranger", en:"abroad"},
      {fr:"faire du camping", en:"to go camping"},
      {fr:"la plage", en:"the beach"},
      {fr:"la montagne", en:"the mountains"},
      {fr:"il fait beau / mauvais", en:"the weather's nice / bad"},
      {fr:"il fait chaud / froid", en:"it's hot / cold"},
      {fr:"il pleut", en:"it's raining"},
      {fr:"il neige", en:"it's snowing"},
      {fr:"il y a du soleil / du vent", en:"it's sunny / windy"},
      {fr:"un métier / une profession", en:"a job / profession"},
      {fr:"devenir", en:"to become"},
      {fr:"je voudrais être", en:"I would like to be"},
      {fr:"l'année prochaine", en:"next year"},
      {fr:"un pays", en:"a country"},
      {fr:"un aéroport", en:"an airport"},
      {fr:"une valise", en:"a suitcase"},
      {fr:"un passeport", en:"a passport"},
      {fr:"réserver", en:"to book"},
      {fr:"un séjour", en:"a stay / trip"},
      {fr:"un souvenir", en:"a souvenir / a memory"},
      {fr:"bronzer", en:"to sunbathe / tan"},
      {fr:"les nuages", en:"clouds"},
      {fr:"le brouillard", en:"fog"},
      {fr:"la température", en:"the temperature"},
      {fr:"un orage", en:"a storm"},
      {fr:"un stage", en:"a work placement / course"},
      {fr:"gagner sa vie", en:"to earn a living"},
      {fr:"plus tard", en:"later on"},
      {fr:"à l'avenir", en:"in the future"}
    ]
  }
];

const skillSections: SkillSection[] = [
  {id:'s20', num:20, fr:'Compréhension', en:'Reading', type:'reading'},
  {id:'s21', num:21, fr:'Expression écrite', en:'Guided Writing', type:'writing'},
  {id:'s22', num:22, fr:'Maniement de la langue', en:'Use of French', type:'usoffrench'},
  {id:'s23', num:23, fr:'Dictée', en:'Dictation', type:'dictee'}
];

const readingText = "Depuis quelques années, de plus en plus de jeunes Français choisissent de quitter les grandes villes pour s'installer à la campagne. Ils recherchent un rythme de vie plus calme et un meilleur équilibre entre le travail et la vie personnelle. Ce phénomène, que les journalistes appellent « l'exode urbain », a été accéléré par le télétravail, qui permet à certains employés de travailler depuis n'importe où. Certains observateurs se demandent cependant si cet engouement pour la campagne n'est qu'un feu de paille, ou s'il annonce un changement plus durable dans la façon dont les Français choisissent de vivre.";
const readingQuiz: QuizQuestion[] = [
  {q:"What does « l'exode urbain » mean in this context?", opts:["Tourists arriving in the city","Young city-dwellers moving to the countryside","The building of new cities","Offices closing down"], correct:1, explain:"The text describes young French people leaving cities for the countryside — that departure is the 'urban exodus'."},
  {q:"According to the text, why has this trend accelerated?", opts:["Because of remote work (télétravail)","Because of housing prices","Because of climate change","Because of unemployment"], correct:0, explain:"The text names télétravail (remote work) as the accelerating factor."},
  {q:"According to the final sentence, what are observers unsure about?", opts:["Whether this shift is temporary or lasting","Whether more young people will leave Paris","Whether remote work will continue to exist","Whether the countryside has enough housing"], correct:0, explain:"The text asks whether the trend is 'un feu de paille' (a flash in the pan) or a more lasting change."}
];
const readingChallenges: Challenge[] = [
  {prompt:"Translate into English: 'Ce phénomène, que les journalistes appellent « l'exode urbain », a été accéléré par le télétravail.'", answer:"This phenomenon, which journalists call 'the urban exodus', has been accelerated by remote working.", note:""},
  {prompt:"Infer from context: what do you think « un feu de paille » means here, and why?", answer:"Literally 'a straw fire' — a blaze that flares up fast and dies out just as quickly, so figuratively something short-lived, a passing fad. The surrounding context (observers wondering if the trend is lasting or not) points the same way even without knowing the idiom.", note:"This is exactly the kind of inference the actual Challenge paper rewards: working out an unfamiliar phrase from its surrounding context rather than needing to already know it."}
];

const writingPrompt = "Write a message in French of around 100 words describing a trip or outing you went on recently. You must include each of the following at least once — tick them off as you use them:";
const writingModel = "Le week-end dernier, je suis allé à la plage avec ma famille quand il faisait très beau. Après avoir fait les valises, nous sommes partis tôt le matin pour éviter la circulation. Une fois arrivés, j'ai nagé dans la mer, qui était incroyablement froide au début ! Ensuite, nous avons mangé un pique-nique sur le sable avant de faire une longue promenade. Moi, j'ai adoré observer les oiseaux en marchant le long de la côte, parce que c'est quelque chose que je ne fais jamais en ville. C'était une journée parfaite que je n'oublierai jamais.";
const writingChecklist: string[] = [
  "QUAND (when)",
  "APRÈS AVOIR / APRÈS ÊTRE + past participle (after doing)",
  "PARCE QUE (because)",
  "QUI (relative pronoun)",
  "EN + present participle (while doing)",
  "AVANT DE (before doing)",
  "ENSUITE (then / next)",
  "MOI (emphasis — 'as for me')"
];
const writingExtensionPrompt = "For more of a challenge, try this instead: « Décrivez un changement que vous aimeriez voir dans votre ville, et expliquez pourquoi. » Aim for around 150 words, and use at least one subjunctive construction.";
const writingExtensionModel = "J'aimerais que ma ville investisse davantage dans les transports en commun. Actuellement, il faut souvent attendre longtemps avant qu'un bus n'arrive, ce qui décourage les gens d'abandonner leur voiture. Si les transports étaient plus fiables, je pense que beaucoup de personnes changeraient leurs habitudes. Il est important que nous réduisions la pollution en ville, surtout pour les générations futures. Bien que ce changement coûte cher au début, je suis convaincu qu'il vaudrait la peine à long terme. En résumé, je voudrais qu'on prenne ce problème plus au sérieux, avant qu'il ne soit trop tard.";

const useOfFrenchQuiz: QuizQuestion[] = [
  {q:"Il faut que je vais au marché. Which word is wrong?", opts:["Il","faut","que","vais"], correct:3, explain:"Il faut que triggers the subjunctive: vais should be aille."},
  {q:"Elle a manger une pomme ce matin. Which word is wrong?", opts:["Elle","a","manger","pomme"], correct:2, explain:"After avoir in the passé composé you need the past participle: manger should be mangé."},
  {q:"Les filles sont parti tôt. Which word is wrong?", opts:["Les","filles","sont","parti"], correct:3, explain:"With être, the past participle agrees with the subject: parti should be parties (les filles, feminine plural)."}
];
const useOfFrenchChallenges: Challenge[] = [
  {prompt:"Put the verb in brackets into the correct form: « Si j'___ (avoir) le temps, je te rendrais visite plus souvent. »", answer:"avais", note:"Si + imperfect (avais) pairs with the conditional (rendrais) in the main clause."},
  {prompt:"Put the verb in brackets into the correct form: « Je cherche un ami qui ___ (pouvoir) m'aider avec mes devoirs. »", answer:"puisse", note:"After chercher un/une... qui, when the person being sought isn't yet a specific known individual, French uses the subjunctive to express that uncertainty."},
  {prompt:"Put the verb in brackets into the correct form: « Après ___ (manger, past infinitive), elle est sortie se promener. »", answer:"avoir mangé", note:"Après + avoir/être + past participle is the past infinitive — 'after eating'. Manger takes avoir."},
  {prompt:"Put the verb in brackets into the correct form: « Il s'est coupé le doigt ___ (couper, present participle) les légumes. »", answer:"en coupant", note:"En + present participle (couper → coupant) expresses 'while doing'."},
  {prompt:"Put the verb in brackets into the correct form: « ___ (finir, tu imperative) tes devoirs avant de sortir ! »", answer:"Finis", note:"-ir verbs keep their -s in the tu imperative (unlike -er verbs): Finis, not Fini."}
];

const dicteeSentences: string[] = [
  "Il faut que nous soyons à l'heure.",
  "Elle a acheté une jolie robe rouge.",
  "Bien qu'il pleuve, ils sont sortis sans parapluie.",
  "Nous nous étions déjà rencontrés à Paris.",
  "Bien qu'elle soit fatiguée, elle a décidé de finir son travail avant de se coucher.",
  "Personne n'avait remarqué que les enfants étaient déjà partis."
];

const readingVocab: VocabItem[] = [
  {fr:"actuellement", en:"currently (NOT 'actually' — that's en fait)"},
  {fr:"assister à", en:"to attend (NOT 'to assist' — that's aider)"},
  {fr:"une librairie", en:"a bookshop (NOT 'library' — that's une bibliothèque)"},
  {fr:"sensible", en:"sensitive (NOT 'sensible' — the word you want is sensé)"},
  {fr:"rester", en:"to stay (NOT 'to rest' — that's se reposer)"},
  {fr:"une lecture", en:"a reading (NOT 'a lecture' — that's une conférence)"},
  {fr:"demander", en:"to ask (NOT 'to demand' — that's exiger)"},
  {fr:"attendre", en:"to wait for (NOT 'to attend' — that's assister à)"},
  {fr:"large", en:"wide (NOT 'large' in size — that's grand/gros)"},
  {fr:"blessé(e)", en:"hurt / injured (NOT 'blessed' — that's béni)"},
  {fr:"un coin", en:"a corner (NOT 'a coin' — that's une pièce)"},
  {fr:"le pain", en:"bread (NOT 'pain' — that's la douleur or le mal)"},
  {fr:"sensé(e)", en:"sensible / level-headed (the actual translation of the English 'sensible')"},
  {fr:"introduire", en:"to insert / bring in (NOT the general 'to introduce a person' — that's présenter)"},
  {fr:"user", en:"to wear out (NOT 'to use' — that's utiliser)"},
  {fr:"passer", en:"to spend (time), or to sit (an exam) — NOT always 'to pass'"},
  {fr:"une occasion", en:"an opportunity, or 'secondhand' in une voiture d'occasion (NOT 'occasion' as in event)"},
  {fr:"crier", en:"to shout"},
  {fr:"apercevoir", en:"to catch sight of"},
  {fr:"deviner", en:"to guess"},
  {fr:"se douter de", en:"to suspect"},
  {fr:"éprouver", en:"to feel / experience (an emotion)"}
];
const writingVocab: VocabItem[] = [
  {fr:"à mon avis", en:"in my opinion"},
  {fr:"je pense que / je trouve que", en:"I think that"},
  {fr:"d'une part... d'autre part", en:"on the one hand... on the other hand"},
  {fr:"cependant", en:"however"},
  {fr:"en revanche", en:"on the other hand"},
  {fr:"de plus", en:"furthermore"},
  {fr:"en conclusion / pour conclure", en:"in conclusion"},
  {fr:"il me semble que", en:"it seems to me that"},
  {fr:"selon moi / d'après moi", en:"according to me"},
  {fr:"en ce qui concerne", en:"as far as ... is concerned"},
  {fr:"pour ma part", en:"as for me / for my part"},
  {fr:"en outre / par ailleurs", en:"furthermore / moreover"},
  {fr:"toutefois", en:"however (more formal than cependant)"},
  {fr:"malgré tout", en:"despite everything"},
  {fr:"en fin de compte", en:"in the end / all things considered"},
  {fr:"en résumé", en:"in summary"},
  {fr:"tout d'abord", en:"first of all"},
  {fr:"par exemple", en:"for example"},
  {fr:"c'est-à-dire", en:"that is to say"},
  {fr:"en général", en:"in general"},
  {fr:"sans aucun doute", en:"without any doubt"},
  {fr:"il ne faut pas oublier que", en:"one mustn't forget that"},
  {fr:"grâce à cela", en:"thanks to that"},
  {fr:"par conséquent", en:"consequently"}
];
const useOfFrenchVocab: VocabItem[] = [
  {fr:"c'est vs il est", en:"c'est + noun/adjective standing alone; il est + adjective describing something already named"},
  {fr:"encore vs toujours", en:"encore = still/again (context-dependent); toujours = always/still"},
  {fr:"bon vs bien", en:"bon = good (adjective); bien = well (adverb)"},
  {fr:"savoir vs connaître", en:"savoir = to know facts/how to; connaître = to know/be familiar with people or places"},
  {fr:"partir vs sortir vs quitter", en:"partir = to leave (intransitive); sortir = to go out; quitter = to leave (+ a place/person, transitive)"},
  {fr:"amener vs apporter", en:"amener = to bring a person; apporter = to bring a thing"},
  {fr:"devoir", en:"three faces: devoir + infinitive = must/have to; un devoir = a duty/piece of homework; devoir + noun = to owe"},
  {fr:"arriver", en:"two faces: to arrive, but also arriver à + infinitive = to manage to"},
  {fr:"rendre", en:"two faces: to give something back, but also rendre + adjective = to make (someone/something) [adjective] — ça me rend heureux"},
  {fr:"sensible vs sensé", en:"sensible = sensitive; sensé = sensible/level-headed — a classic reversal trap"},
  {fr:"large vs grand", en:"large = wide; grand = big/tall — not interchangeable"},
  {fr:"emmener vs emporter", en:"emmener = to take a person somewhere; emporter = to take a thing away"},
  {fr:"tout vs tous", en:"tout (invariable, 'everything'/'all') vs tous (agrees, 'all of them' — masculine plural)"},
  {fr:"depuis vs pendant vs pour", en:"depuis = since/for (ongoing); pendant = during/for (a completed period); pour = for (a planned future duration)"},
  {fr:"an vs année", en:"an = the plain number of years; année = the year as a duration/experience — toute l'année, not tout l'an"}
];
const dicteeVocab: VocabItem[] = [
  {fr:"ou / où", en:"or / where"},
  {fr:"a / à", en:"has (avoir) / at, to"},
  {fr:"ces / ses / c'est / s'est", en:"these / his-her (plural) / it is / (reflexive) has"},
  {fr:"on / ont", en:"one/we / they have"},
  {fr:"son / sont", en:"his-her / they are"},
  {fr:"la / là / l'a", en:"the (fem.) / there / has it (l'a + past participle)"},
  {fr:"et / est", en:"and / is"},
  {fr:"quand / qu'en / quant", en:"when / that... in (rare) / as for (quant à)"},
  {fr:"sans / s'en / cent", en:"without / oneself... of it (reflexive + en) / hundred"},
  {fr:"ni / n'y", en:"nor / (negative) there/in it"},
  {fr:"mes / mais / met", en:"my (plural) / but / (he/she) puts"},
  {fr:"ce / se", en:"this/that / (reflexive) himself-herself-oneself"},
  {fr:"peu / peux / peut", en:"little / (I/you) can / (he/she) can"},
  {fr:"leur / leurs", en:"their (singular owned item) / their (plural owned items)"},
  {fr:"cet / cette / c'est", en:"this (masc. before vowel) / this (fem.) / it is"}
];

/* ============ PROGRESS ============ */
const PROGRESS_KEY = 'french-manuel-progress';
let progress: Progress = {};

function loadProgress(): void {
  try{
    const raw = localStorage.getItem(PROGRESS_KEY);
    progress = raw ? JSON.parse(raw) as Progress : {};
  }catch(e){
    progress = {};
  }
}

function saveProgress(): void {
  try{
    localStorage.setItem(PROGRESS_KEY, JSON.stringify(progress));
  }catch(e){ /* best effort */ }
}

/* Username/password sign-in. Only a hash of the login is stored here, but this is a
   page-side check — it hides nothing from someone who reads the source. */
const LOGIN_HASH = '03596e978763d3907f494638b97025db5d0ebded1bcffa74087dd6dcf5888cc0';
const SIGNED_IN_KEY = 'french-signed-in';

async function hashLogin(u: string, p: string): Promise<string> {
  const bytes = new TextEncoder().encode('westminster-french|' + u + '|' + p);
  const digest = await crypto.subtle.digest('SHA-256', bytes);
  return Array.from(new Uint8Array(digest)).map(b => b.toString(16).padStart(2,'0')).join('');
}

function isSignedIn(): boolean {
  try{ return localStorage.getItem(SIGNED_IN_KEY) === '1'; }catch(e){ return false; }
}

function showSignedIn(): void {
  const badge = $('ownerBadge');
  badge.textContent = 'Signed in as Shlok Kher';
  badge.hidden = false;
  $('signInBtn').hidden = true;
  $('signOutBtn').hidden = false;
  $('loginForm').hidden = true;
}

function showSignedOut(): void {
  $('ownerBadge').hidden = true;
  $('signInBtn').hidden = false;
  $('signOutBtn').hidden = true;
}

function setupLogin(): void {
  const form = $<HTMLFormElement>('loginForm');
  const err = $('loginError');
  $('signInBtn').addEventListener('click', () => {
    form.hidden = false;
    err.hidden = true;
    $<HTMLInputElement>('loginUser').focus();
  });
  $('loginCancel').addEventListener('click', () => { form.hidden = true; form.reset(); });
  form.addEventListener('submit', async (e: SubmitEvent) => {
    e.preventDefault();
    const u = $<HTMLInputElement>('loginUser').value.trim();
    const p = $<HTMLInputElement>('loginPass').value;
    let ok = false;
    try{ ok = (await hashLogin(u, p)) === LOGIN_HASH; }catch(e){ ok = false; }
    form.reset();
    if(!ok){ err.hidden = false; return; }
    try{ localStorage.setItem(SIGNED_IN_KEY, '1'); }catch(e){}
    showSignedIn();
  });
  $('signOutBtn').addEventListener('click', () => {
    try{ localStorage.removeItem(SIGNED_IN_KEY); }catch(e){}
    showSignedOut();
  });
  if(isSignedIn()) showSignedIn();
}

type Status = 'empty' | 'partial' | 'low' | 'high';

function statusFor(id: string, total: number): Status {
  const p = progress[id];
  if(!p || !p.answers) return 'empty';
  const answeredCount = p.answers.filter(a => a !== null && a !== undefined).length;
  if(answeredCount === 0) return 'empty';
  if(answeredCount < total) return 'partial';
  const ratio = (p.correct ?? 0) / (p.total || 1);
  return ratio >= 0.8 ? 'high' : 'low';
}

/* ============ NAV ============ */
const allSections: Section[] = [...coreModules, ...skillSections];

function isModule(s: Section): s is CoreModule {
  return 'quiz' in s;
}

function totalFor(s: Section): number {
  if(isModule(s)) return s.quiz.length;
  switch(s.type){
    case 'reading': return readingQuiz.length;
    case 'usoffrench': return useOfFrenchQuiz.length;
    case 'dictee': return dicteeSentences.length;
    default: return 1;
  }
}

function renderNav(): void {
  const navList = $('navList');
  navList.innerHTML = '';

  const grammarLabel = document.createElement('div');
  grammarLabel.className = 'nav-group-label';
  grammarLabel.textContent = 'Grammar';
  navList.appendChild(grammarLabel);
  coreModules.forEach(m => navList.appendChild(navButton(m)));

  const skillsLabel = document.createElement('div');
  skillsLabel.className = 'nav-group-label';
  skillsLabel.textContent = 'Exam skills';
  navList.appendChild(skillsLabel);
  skillSections.forEach(s => navList.appendChild(navButton(s)));
}

function navButton(s: Section): HTMLAnchorElement {
  const a = document.createElement('a');
  a.className = 'nav-item';
  a.href = '#/' + s.id;
  a.dataset.id = s.id;
  a.innerHTML = `
    <span class="nav-num">${s.num}</span>
    <span class="nav-text">
      <span class="nav-fr">${s.en}</span>
      <span class="nav-en">${s.fr}</span>
    </span>
    <span class="dot" data-status="${statusFor(s.id, totalFor(s))}"></span>
  `;
  return a;
}

function refreshNavStatus(): void {
  document.querySelectorAll<HTMLElement>('.nav-item').forEach(el => {
    const s = allSections.find(x => x.id === el.dataset.id);
    const dot = el.querySelector<HTMLElement>('.dot');
    if(s && dot) dot.dataset.status = statusFor(s.id, totalFor(s));
  });
}

/* ============ ROUTING ============ */
// Each section has its own address: #/m3, #/s20, ... and #/ for home.
function routeFromHash(): string {
  const id = location.hash.replace(/^#\/?/, '');
  return allSections.some(s => s.id === id) ? id : 'home';
}

function go(id: string): void {
  const target = id === 'home' ? '#/' : '#/' + id;
  if(location.hash !== target) location.hash = target; // triggers render()
  else render();
}

function render(): void {
  const id = routeFromHash();
  document.querySelectorAll<HTMLElement>('.nav-item').forEach(b => b.classList.toggle('active', b.dataset.id === id));
  const s = allSections.find(x => x.id === id);
  if(!s) renderHome();
  else if(isModule(s)) renderModule(s);
  else renderSkill(s);
  document.title = s ? `${s.en} · French: The Westminster Challenge` : 'French: The Westminster Challenge';
  window.scrollTo(0,0);
}

/* ============ HOME ============ */
function renderHome(): void {
  const el = $('content');
  const startedOrDone = allSections.filter(s => statusFor(s.id, totalFor(s)) !== 'empty').length;

  el.innerHTML = `
    <div class="home-hero">
      <h1>French: The Westminster Challenge</h1>
      <p class="lede">Every grammar point in the Westminster Challenge Core syllabus, built for a Year 8 candidate aiming at the King's Scholarship — thirteen grammar modules, six topic-vocabulary modules and the four exam-skill sections, with the inference, precision and free-production work the Challenge is known for. Work through them in order, or jump straight to what you need.</p>
      <button class="btn" id="startBtn">Start</button>
    </div>
    <div class="progress-summary">
      <h2>Your progress</h2>
      <p class="count">${startedOrDone} of ${allSections.length} sections started</p>
      <div class="progress-grid" id="progressGrid"></div>
    </div>
    <footer class="note">Your progress is saved automatically in this browser and picks up where you left off.</footer>
  `;

  const grid = $('progressGrid');
  allSections.forEach(s => {
    const card = document.createElement('div');
    card.className = 'progress-card';
    card.innerHTML = `<span class="nav-num" style="color:var(--rouge)">${s.num}</span><a href="#/${s.id}">${s.en}</a><span class="dot" data-status="${statusFor(s.id, totalFor(s))}"></span>`;
    grid.appendChild(card);
  });

  $('startBtn').addEventListener('click', () => {
    const next = allSections.find(s => statusFor(s.id, totalFor(s)) !== 'high') || allSections[0];
    go(next.id);
  });
}

/* ============ MODULE VIEW ============ */
function renderModule(mod: CoreModule): void {
  const el = $('content');
  el.innerHTML = `
    <div class="mod-eyebrow">
      <span class="mod-num">${mod.num}</span>
      <span class="mod-titleEn">${mod.fr}</span>
    </div>
    <h1 class="mod-title">${mod.en}</h1>
    <p style="font-size:16px;color:var(--ink-soft);max-width:60ch;">${mod.intro}</p>

    <p class="section-label">The Breakdown</p>
    <div class="teach-flow">${mod.points.map(p => `
      <p class="teach-point ${p.tag}"><span class="lead">${p.title}.</span> ${p.text}</p>
    `).join('')}</div>

    ${renderTablesHtml(mod.tables)}

    <p class="section-label">See It In Action</p>
    <ul class="examples">
      ${mod.examples.map(e => `<li><div class="ex-fr">${e.fr}</div><div class="ex-en">${e.en}</div></li>`).join('')}
    </ul>

    <p class="section-label">Your Turn</p>
    <p class="learn-then-quiz">Once the breakdown, tables and examples above make sense, work through these — they're here to check your learning, not to teach it.</p>
    <div class="quiz-score" id="scoreLabel"></div>
    <div id="quizWrap"></div>
    <div id="challengeWrap"></div>

    ${renderVocabHtml(mod.vocab)}
  `;
  renderQuiz(mod.id, mod.quiz, $('quizWrap'));
  renderChallenges($('challengeWrap'), mod.challenges);
}

/* ============ REFERENCE TABLES (part of the learning content, before any quiz) ============ */
function renderTablesHtml(tables?: RefTable[]): string {
  if(!tables || !tables.length) return '';
  return tables.map(t => `
    <div class="table-wrap">
      <table class="ref-table">
        <caption>${t.title}</caption>
        <thead><tr>${t.headers.map(h => `<th>${h}</th>`).join('')}</tr></thead>
        <tbody>
          ${t.rows.map(r => `<tr><th>${r[0]}</th>${r.slice(1).map(c => `<td>${c}</td>`).join('')}</tr>`).join('')}
        </tbody>
      </table>
    </div>
    ${t.note ? `<p class="table-note">${t.note}</p>` : ''}
  `).join('');
}

/* ============ VOCABULARY ROUND-UP (always last on the page) ============ */
function renderVocabHtml(vocab?: VocabItem[]): string {
  if(!vocab || !vocab.length) return '';
  return `
    <div class="vocab-section">
      <p class="section-label">Word Stash</p>
      <p class="learn-then-quiz">Words from this section worth having solid — you've already met them above in context.</p>
      <div class="vocab-grid">
        ${vocab.map(v => `
          <div class="vocab-item">
            <div class="vocab-fr">${v.fr}</div>
            <div class="vocab-en">${v.en}</div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

/* ============ CHALLENGE RENDER (free-response, self-checked) ============ */
function renderChallenges(container: HTMLElement, challenges?: Challenge[], tagLabel?: string): void {
  if(!challenges || !challenges.length) return;
  const label = document.createElement('p');
  label.className = 'section-label';
  label.textContent = 'Challenge';
  container.appendChild(label);
  challenges.forEach(c => {
    const block = document.createElement('div');
    block.className = 'challenge-block';
    block.innerHTML = `
      <span class="challenge-tag">${tagLabel || 'Challenge'}</span>
      <p class="challenge-prompt">${c.prompt}</p>
      <textarea class="dictee-input" placeholder="Try it yourself first..."></textarea>
      <div style="margin-top:10px;"><button class="btn secondary" data-action="reveal">Show answer</button></div>
      <div class="challenge-answer" style="display:none;">
        <div class="ans-fr">${c.answer}</div>
        ${c.note ? `<div class="challenge-note">${c.note}</div>` : ''}
      </div>
    `;
    const revealBtn = block.querySelector<HTMLElement>('[data-action="reveal"]')!;
    revealBtn.addEventListener('click', () => {
      block.querySelector<HTMLElement>('.challenge-answer')!.style.display = 'block';
      revealBtn.style.display = 'none';
    });
    container.appendChild(block);
  });
}

/* ============ GENERIC QUIZ RENDER ============ */
function renderQuiz(quizId: string, quizArr: QuizQuestion[], container: HTMLElement): void {
  const existing = progress[quizId];
  if(!existing || !existing.answers || existing.answers.length !== quizArr.length){
    progress[quizId] = {answers: new Array(quizArr.length).fill(null), correct:0, total:quizArr.length};
  }
  container.innerHTML = '';
  quizArr.forEach((q, i) => {
    const block = document.createElement('div');
    block.className = 'quiz-q';
    block.innerHTML = `
      <p class="prompt">${i+1}. ${q.q}</p>
      <div class="opts"></div>
      <div class="feedback" style="display:none;"></div>
    `;
    const optsWrap = block.querySelector<HTMLElement>('.opts')!;
    q.opts.forEach((optText, oi) => {
      const b = document.createElement('button');
      b.className = 'opt';
      b.textContent = optText;
      b.addEventListener('click', () => answerQuiz(quizId, quizArr, i, oi, block));
      optsWrap.appendChild(b);
    });
    container.appendChild(block);
    const prevAnswer = progress[quizId].answers![i];
    if(prevAnswer !== null && prevAnswer !== undefined){
      renderAnsweredState(block, q, prevAnswer);
    }
  });
  updateScoreLabel(quizId);
}

function renderAnsweredState(block: HTMLElement, q: QuizQuestion, selectedIdx: number): void {
  block.querySelectorAll<HTMLButtonElement>('.opt').forEach((b, oi) => {
    b.disabled = true;
    if(oi === q.correct) b.classList.add('correct');
    else if(oi === selectedIdx) b.classList.add('incorrect');
  });
  const fb = block.querySelector<HTMLElement>('.feedback')!;
  fb.style.display = 'block';
  const ok = selectedIdx === q.correct;
  fb.className = 'feedback ' + (ok ? 'ok' : 'no');
  fb.innerHTML = `<span class="verdict">${ok ? 'Correct!' : 'Not quite.'}</span>${q.explain}`;
}

function answerQuiz(quizId: string, quizArr: QuizQuestion[], qIndex: number, optIndex: number, block: HTMLElement): void {
  const p = progress[quizId];
  const answers = p.answers!;
  const alreadyAnswered = answers[qIndex];
  if(alreadyAnswered !== null && alreadyAnswered !== undefined) return;

  answers[qIndex] = optIndex;
  p.correct = answers.filter((a, idx) => a === quizArr[idx].correct).length;
  p.total = quizArr.length;

  renderAnsweredState(block, quizArr[qIndex], optIndex);
  updateScoreLabel(quizId);
  refreshNavStatus();
  saveProgress();
}

function updateScoreLabel(quizId: string): void {
  const label = document.getElementById('scoreLabel');
  if(!label) return;
  const p = progress[quizId];
  const answered = (p.answers || []).filter(a => a !== null && a !== undefined).length;
  if(answered === 0){ label.textContent = ''; return; }
  label.textContent = `Score: ${p.correct} / ${answered} answered so far (${p.total} total)`;
}

/* ============ SKILL SECTIONS ============ */
function renderSkill(skill: SkillSection): void {
  switch(skill.type){
    case 'reading': return renderReading(skill);
    case 'writing': return renderWriting(skill);
    case 'usoffrench': return renderUseOfFrench(skill);
    case 'dictee': return renderDictee(skill);
  }
}

function skillHeader(skill: SkillSection, introText: string): string {
  return `
    <div class="mod-eyebrow">
      <span class="mod-num">${skill.num}</span>
      <span class="mod-titleEn">${skill.fr}</span>
    </div>
    <h1 class="mod-title">${skill.en}</h1>
    <p style="font-size:16px;color:var(--ink-soft);max-width:60ch;">${introText}</p>
  `;
}

function renderReading(skill: SkillSection): void {
  $('content').innerHTML = `
    ${skillHeader(skill, "Read like a detective — the answers are all in there, you just have to dig a couple of them out. Reread as many times as you like.")}
    <p class="section-label">The Passage</p>
    <div class="writing-box"><p style="margin:0;font-size:15.5px;line-height:1.7;">${readingText}</p></div>
    <p class="section-label">Questions</p>
    <p class="learn-then-quiz">Read the passage closely — more than once if needed — before answering. Understanding it fully is the point; these questions just confirm it.</p>
    <div class="quiz-score" id="scoreLabel"></div>
    <div id="quizWrap"></div>
    <div id="challengeWrap"></div>
    ${renderVocabHtml(readingVocab)}
  `;
  renderQuiz(skill.id, readingQuiz, $('quizWrap'));
  renderChallenges($('challengeWrap'), readingChallenges, 'Translate & infer');
}

function renderWriting(skill: SkillSection): void {
  $('content').innerHTML = `
    ${skillHeader(skill, "Write it, mark it yourself, then see how a strong answer actually reads.")}
    <p class="section-label">The Task</p>
    <div class="writing-box">
      <p style="margin:0 0 14px;font-size:15.5px;">${writingPrompt}</p>
      <textarea class="dictee-input" style="min-height:140px;" placeholder="Write your response here..." aria-label="Your written response"></textarea>
      <ul class="checklist">
        ${writingChecklist.map((c,i) => `<li><input type="checkbox" id="wc${i}"><label for="wc${i}">${c}</label></li>`).join('')}
      </ul>
      <details class="model">
        <summary>See a model answer</summary>
        <div class="model-text">${writingModel}</div>
      </details>
    </div>
    <p class="section-label">Extension</p>
    <div class="challenge-block">
      <span class="challenge-tag extension">Extension</span>
      <p class="challenge-prompt">${writingExtensionPrompt}</p>
      <textarea class="dictee-input" style="min-height:140px;" placeholder="Write your response here..." aria-label="Your extension response"></textarea>
      <details class="model" style="margin-top:10px;">
        <summary>See a model answer</summary>
        <div class="model-text">${writingExtensionModel}</div>
      </details>
    </div>
    ${renderVocabHtml(writingVocab)}
  `;
}

function renderUseOfFrench(skill: SkillSection): void {
  $('content').innerHTML = `
    ${skillHeader(skill, "One sneaky mistake per sentence. Spot it, fix it, don't overthink it.")}
    <p class="section-label">Find the error</p>
    <div class="quiz-score" id="scoreLabel"></div>
    <div id="quizWrap"></div>
    <div id="challengeWrap"></div>
    ${renderVocabHtml(useOfFrenchVocab)}
  `;
  renderQuiz(skill.id, useOfFrenchQuiz, $('quizWrap'));
  renderChallenges($('challengeWrap'), useOfFrenchChallenges, 'Manipulate the verb');
}

function renderDictee(skill: SkillSection): void {
  $('content').innerHTML = `
    ${skillHeader(skill, "Hit play, listen hard, write exactly what you hear — accents and all. Replay as many times as you need.")}
    <p class="section-label">Sentences</p>
    <div id="dicteeWrap"></div>
    <p style="font-size:12.5px;color:var(--ink-soft);margin-top:8px;">Uses your browser's built-in speech synthesis. If you hear nothing, your browser may not support it.</p>
    ${renderVocabHtml(dicteeVocab)}
  `;
  const wrap = $('dicteeWrap');
  const stored: string[] = progress[skill.id]?.inputs ?? new Array(dicteeSentences.length).fill('');
  if(!progress[skill.id]) progress[skill.id] = {inputs: stored};
  dicteeSentences.forEach((sentence, i) => {
    const item = document.createElement('div');
    item.className = 'dictee-item';
    item.innerHTML = `
      <div class="dictee-controls">
        <button class="btn secondary" data-i="${i}" data-action="listen">Listen</button>
        <span style="font-size:13px;color:var(--ink-soft);">Sentence ${i+1}</span>
      </div>
      <textarea class="dictee-input" data-i="${i}" placeholder="Transcribe here..." aria-label="Your transcription of sentence ${i+1}">${stored[i] || ''}</textarea>
      <div style="margin-top:10px;">
        <button class="btn" data-i="${i}" data-action="check">Check</button>
      </div>
      <div class="dictee-result" data-i="${i}"></div>
    `;
    wrap.appendChild(item);
  });

  wrap.querySelectorAll<HTMLElement>('[data-action="listen"]').forEach(btn => {
    btn.addEventListener('click', () => speak(dicteeSentences[Number(btn.dataset.i)]));
  });
  wrap.querySelectorAll<HTMLElement>('[data-action="check"]').forEach(btn => {
    btn.addEventListener('click', () => {
      const i = Number(btn.dataset.i);
      const input = wrap.querySelector<HTMLTextAreaElement>(`textarea[data-i="${i}"]`)!.value;
      progress[skill.id].inputs![i] = input;
      showDicteeResult(wrap, i, input, dicteeSentences[i]);
      saveProgress();
      refreshNavStatus();
    });
  });

  // restore any previous results on load
  dicteeSentences.forEach((sentence, i) => {
    if(stored[i]) showDicteeResult(wrap, i, stored[i], sentence);
  });
}

function speak(text: string): void {
  if(!('speechSynthesis' in window)){
    alert("Speech synthesis isn't available in this browser.");
    return;
  }
  window.speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.lang = 'fr-FR';
  u.rate = 0.85;
  window.speechSynthesis.speak(u);
}

function showDicteeResult(wrap: HTMLElement, i: number, input: string, correct: string): void {
  const resultEl = wrap.querySelector<HTMLElement>(`.dictee-result[data-i="${i}"]`)!;
  const norm = (s: string) => s.trim().replace(/\s+/g,' ');
  if(norm(input) === norm(correct)){
    resultEl.innerHTML = `<span style="color:var(--green);font-weight:600;">Perfect!</span>`;
    return;
  }
  const inputWords = norm(input).split(' ');
  const correctWords = norm(correct).split(' ');
  const maxLen = Math.max(inputWords.length, correctWords.length);
  let diffHtml = '';
  for(let w=0; w<maxLen; w++){
    const iw = inputWords[w] || '';
    const cw = correctWords[w] || '';
    const match = iw.toLowerCase() === cw.toLowerCase() && iw !== '';
    diffHtml += `<span class="diff-word ${match ? 'match' : 'miss'}">${iw || '—'}</span>`;
  }
  resultEl.innerHTML = `
    <div>${diffHtml}</div>
    <div class="correct-sentence">${correct}</div>
  `;
}

/* ============ INIT ============ */
function init(): void {
  loadProgress();
  renderNav();
  window.addEventListener('hashchange', render);
  render();
  setupLogin();
}
init();
