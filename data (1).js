// ==========================================
// 🌳 DATA.JS - ORGANIGRAMME DECATHLON
// 542 Collaborateurs - Classification par Axes
// ==========================================

const orgData = {
    // 🔵 DIRECTION GÉNÉRALE
    direction: [
        {
            id: "leclercq-j",
            name: "Julien LECLERCQ",
            title: "Decathlon United President",
            team: "DIRECTION",
            phone: "",
            email: "",
            children: ["lopez-j"]
        },
        {
            id: "lopez-j",
            name: "Javier LOPEZ",
            title: "Chief Executive Officer",
            team: "DIRECTION",
            phone: "",
            email: "",
            children: ["graham-m"]
        },
        {
            id: "graham-m",
            name: "Marine GRAHAM",
            title: "Chief Value Chain Officer",
            team: "VALUE CHAIN",
            phone: "",
            email: "",
            children: []
        }
    ],

    // 🏭 AXE PROCESS & ENGINEERING (270+ postes)
    process: [
        // === PROCESS DIRECTORS ===
        {
            id: "briere-m",
            name: "Matthieu BRIERE",
            title: "Process Director",
            team: "PROCESS",
            department: "PROCESS",
            phone: "",
            email: ""
        },
        {
            id: "frejaville-e",
            name: "Emilie FREJAVILLE",
            title: "Process Director",
            team: "SOFT EQUIPMENT",
            department: "PROCESS",
            phone: "",
            email: ""
        },
        {
            id: "riviere-jb",
            name: "Jean Baptiste RIVIERE",
            title: "Process Director",
            team: "DECATHLON MONDE",
            department: "PROCESS",
            phone: "",
            email: ""
        },
        {
            id: "rousseau-m",
            name: "Marc ROUSSEAU",
            title: "Process Director",
            team: "DECATHLON MONDE",
            department: "PROCESS",
            phone: "",
            email: ""
        },
        {
            id: "dollet-s",
            name: "Sebastien DOLLET",
            title: "Process Director",
            team: "FOOTWEAR",
            department: "PROCESS",
            phone: "",
            email: ""
        },
        {
            id: "monniaux-t",
            name: "Thierry MONNIAUX",
            title: "Process Director",
            team: "PROCESS PACK",
            department: "PROCESS",
            phone: "",
            email: ""
        },
        {
            id: "fremaux-t",
            name: "Thomas FREMAUX",
            title: "Process Director",
            team: "ELECTRONICS",
            department: "PROCESS",
            phone: "",
            email: ""
        },
        {
            id: "mbodj-y",
            name: "Yerim MBODJ",
            title: "Process Director",
            team: "PROCESS PC FOAM",
            department: "PROCESS",
            phone: "",
            email: ""
        },
        {
            id: "baillivet-r",
            name: "Romain BAILLIVET",
            title: "Process Director",
            team: "METAL & BIKES",
            department: "PROCESS",
            phone: "",
            email: ""
        },

        // === PLASTIC COMPOSITE COMMUNITY ===
        {
            id: "hespel-f",
            name: "Francois HESPEL",
            title: "Process Director",
            team: "PLASTIC COMPOSITE COMMUNITY",
            department: "PLASTIC COMPOSITE",
            phone: "",
            email: ""
        },
        {
            id: "tarrin-g",
            name: "Gilles TARRIN",
            title: "Process Director",
            team: "PROTECTION",
            department: "PLASTIC COMPOSITE",
            phone: "",
            email: ""
        },
        {
            id: "schmitt-h",
            name: "Helene SCHMITT",
            title: "Process Director",
            team: "PROCESS PC FOAM",
            department: "PLASTIC COMPOSITE",
            phone: "",
            email: ""
        },
        {
            id: "polus-d",
            name: "Dorian POLUS",
            title: "Innovation Manager",
            team: "PLASTIC COMPOSITE COMMUNITY",
            department: "PLASTIC COMPOSITE",
            phone: "",
            email: ""
        },
        {
            id: "chauvel-a",
            name: "Aurélie CHAUVEL",
            title: "Emission Factor Manager",
            team: "PLASTIC COMPOSITE COMMUNITY",
            department: "PLASTIC COMPOSITE",
            phone: "",
            email: ""
        },
        {
            id: "marchand-s",
            name: "Sebastien MARCHAND",
            title: "Emission Factor Manager",
            team: "PLASTIC COMPOSITE COMMUNITY",
            department: "PLASTIC COMPOSITE",
            phone: "",
            email: ""
        },

        // === ENGINEERING TEAMS ===
        {
            id: "zatta-a",
            name: "Alessandro ZATTA",
            title: "Methods Engineer",
            team: "ENGINEERING",
            department: "PROCESS",
            phone: "",
            email: ""
        },
        {
            id: "redoute-a",
            name: "Anais REDOUTE",
            title: "Component and Tech Engineer",
            team: "ENGINEERING",
            department: "PROCESS",
            phone: "",
            email: ""
        },
        {
            id: "guermonprez-c",
            name: "Christian GUERMONPREZ",
            title: "Component and Tech Engineer",
            team: "ENGINEERING",
            department: "PROCESS",
            phone: "",
            email: ""
        },
        {
            id: "fontaine-c",
            name: "Christophe FONTAINE",
            title: "Global Purchasing Manager",
            team: "ENGINEERING",
            department: "PROCESS",
            phone: "",
            email: ""
        },
        {
            id: "imbert-c",
            name: "CLAIRE IMBERT",
            title: "Methods Engineer",
            team: "ENGINEERING",
            department: "PROCESS",
            phone: "",
            email: ""
        },
        {
            id: "beaumont-c",
            name: "Clémentine BEAUMONT",
            title: "Component and Tech Engineer",
            team: "ENGINEERING",
            department: "PROCESS",
            phone: "",
            email: ""
        },
        {
            id: "coelho-f",
            name: "Filipe COELHO",
            title: "Supply Chain Manager Industry",
            team: "ENGINEERING",
            department: "PROCESS",
            phone: "",
            email: ""
        },
        {
            id: "deliniere-h",
            name: "Helene DELINIERE",
            title: "Component and Tech Engineer",
            team: "ENGINEERING",
            department: "PROCESS",
            phone: "",
            email: ""
        },
        {
            id: "pouchard-j",
            name: "JEREMY POUCHARD",
            title: "Product Engineer",
            team: "ENGINEERING",
            department: "PROCESS",
            phone: "",
            email: ""
        },
        {
            id: "maas-k",
            name: "Katherine MAAS",
            title: "Project Manager",
            team: "ENGINEERING",
            department: "PROCESS",
            phone: "",
            email: ""
        },
        {
            id: "dony-l",
            name: "Lucien DONY",
            title: "Product Engineer",
            team: "ENGINEERING",
            department: "PROCESS",
            phone: "",
            email: ""
        },
        {
            id: "bhavsar-m",
            name: "Mishika BHAVSAR",
            title: "Product Engineer",
            team: "ENGINEERING",
            department: "PROCESS",
            phone: "",
            email: ""
        },
        {
            id: "fonteneau-t",
            name: "Tom FONTENEAU",
            title: "Product Engineer",
            team: "ENGINEERING",
            department: "PROCESS",
            phone: "",
            email: ""
        },
        {
            id: "bony-t",
            name: "Tristan BONY",
            title: "Product Engineer",
            team: "ENGINEERING",
            department: "PROCESS",
            phone: "",
            email: ""
        },

        // === PACK & PACKAGING TEAM (89 postes) ===
        {
            id: "leman-a",
            name: "Antoine LEMAN",
            title: "Process Director",
            team: "RAW MATERIALS PAPER",
            department: "PACK",
            phone: "",
            email: ""
        },
        {
            id: "deveaux-b",
            name: "Bruno DEVEAUX",
            title: "Process Director",
            team: "PROCESS ACCESSORIES",
            department: "PACK",
            phone: "",
            email: ""
        },
        {
            id: "lagant-f",
            name: "Florent LAGANT",
            title: "Component Offer Director",
            team: "ART & DATA",
            department: "PACK",
            phone: "",
            email: ""
        },
        {
            id: "pype-j",
            name: "Jeremie PYPE",
            title: "Design Director",
            team: "DIRECTION ARTISTIQUE PACK",
            department: "PACK",
            phone: "",
            email: ""
        },
        {
            id: "tapissier-l",
            name: "Lou TAPISSIER",
            title: "Process Director",
            team: "PROCESS PRODUCT ID",
            department: "PACK",
            phone: "",
            email: ""
        },
        {
            id: "taconet-m",
            name: "Marine TACONET",
            title: "Chief Sustainability Officer",
            team: "SUSTAINABILITY PACK",
            department: "PACK",
            phone: "",
            email: ""
        },
        {
            id: "rochefort-m",
            name: "Marion ROCHEFORT",
            title: "Business Unit Manager",
            team: "ENGINEERING CENTER PACK",
            department: "PACK",
            phone: "",
            email: ""
        },
        {
            id: "bielaire-r",
            name: "Romain BIELAIRE",
            title: "Global Purchasing Manager",
            team: "PACK INDUSTRIAL TEAM",
            department: "PACK",
            phone: "",
            email: ""
        },

        // === ELECTRONICS TEAM (36 postes) ===
        {
            id: "hatton-a",
            name: "Alexandra HATTON",
            title: "Technical Director",
            team: "ELECTRONICS PROCESS",
            department: "ELECTRONICS",
            phone: "",
            email: ""
        },
        {
            id: "melchior-c",
            name: "Constant MELCHIOR",
            title: "Design Director",
            team: "DIRECTION DESIGN LIGHTING",
            department: "ELECTRONICS",
            phone: "",
            email: ""
        },
        {
            id: "parent-ma",
            name: "Marc antoine PARENT",
            title: "Global Purchasing Manager",
            team: "ELECTRONICS PROCURMENT",
            department: "ELECTRONICS",
            phone: "",
            email: ""
        },
        {
            id: "crunelle-r",
            name: "Romain CRUNELLE",
            title: "Technical Director",
            team: "ELECTRONICS",
            department: "ELECTRONICS",
            phone: "",
            email: ""
        },

        // === METAL & BIKES TEAM (90+ postes) ===
        {
            id: "lorenzi-a",
            name: "Andrew LORENZI",
            title: "Business Unit Manager",
            team: "BIKES DESIGN & STRUCTURE",
            department: "METAL & BIKES",
            phone: "",
            email: ""
        },
        {
            id: "cochet-a",
            name: "Antoine COCHET",
            title: "Global Purchasing Manager",
            team: "BIKES PROCUREMENT",
            department: "METAL & BIKES",
            phone: "",
            email: ""
        },
        {
            id: "delatour-g",
            name: "Guillaume DELATOUR",
            title: "Technical Director",
            team: "TRANSMISSION & BRAKES",
            department: "METAL & BIKES",
            phone: "",
            email: ""
        },
        {
            id: "bloch-j",
            name: "Julien BLOCH",
            title: "Technical Director",
            team: "CARRY & PROTECT",
            department: "METAL & BIKES",
            phone: "",
            email: ""
        },
        {
            id: "simon-l",
            name: "Laurent SIMON",
            title: "Process Director",
            team: "METAL ACHAT",
            department: "METAL & BIKES",
            phone: "",
            email: ""
        },
        {
            id: "lebeurre-r",
            name: "Remi LEBEURRE",
            title: "Technical Director",
            team: "BIKES PROCESS E-BOOST",
            department: "METAL & BIKES",
            phone: "",
            email: ""
        },
        {
            id: "guillon-r",
            name: "RENAUD GUILLON",
            title: "Business Unit Manager",
            team: "BIKES PROCESS E-BOOST",
            department: "METAL & BIKES",
            phone: "",
            email: ""
        },
        {
            id: "gossart-v",
            name: "VINCENT GOSSART",
            title: "Component Offer Director",
            team: "METAL & BIKES",
            department: "METAL & BIKES",
            phone: "",
            email: ""
        },

        // === TEXTILE TEAM (60+ postes) ===
        {
            id: "corbier-a",
            name: "Aurelien CORBIER",
            title: "Technical Director",
            team: "DIRECTION TEXTILE",
            department: "TEXTILE",
            phone: "",
            email: ""
        },
        {
            id: "loncke-d",
            name: "David LONCKE",
            title: "Process Director",
            team: "NOVADRY",
            department: "TEXTILE",
            phone: "",
            email: ""
        },
        {
            id: "verdy-d",
            name: "David VERDY",
            title: "Quality Director",
            team: "SK DIRECTION",
            department: "TEXTILE",
            phone: "",
            email: ""
        },
        {
            id: "mauffet-e",
            name: "Emilie MAUFFET",
            title: "Process Director",
            team: "SUSTAINABILITY",
            department: "TEXTILE",
            phone: "",
            email: ""
        },
        {
            id: "grasso-g",
            name: "Giannino GRASSO",
            title: "Process Director",
            team: "YTP OFFER DESIGN AND INNO",
            department: "TEXTILE",
            phone: "",
            email: ""
        },
        {
            id: "louboutin-g",
            name: "Guillaume LOUBOUTIN",
            title: "Process Director",
            team: "DIRECTION TEXTILE",
            department: "TEXTILE",
            phone: "",
            email: ""
        },
        {
            id: "arnould-j",
            name: "Julie ARNOULD",
            title: "Process Director",
            team: "NATURAL YARN",
            department: "TEXTILE",
            phone: "",
            email: ""
        },
        {
            id: "guillaume-k",
            name: "Kevin GUILLAUME",
            title: "Process Director",
            team: "PROCESS WOVEN",
            department: "TEXTILE",
            phone: "",
            email: ""
        },

        // === FOOTWEAR TEAM (55+ postes) ===
        {
            id: "benoit-b",
            name: "Brice BENOIT",
            title: "Innovation Director",
            team: "FOOTWEAR",
            department: "FOOTWEAR",
            phone: "",
            email: ""
        },
        {
            id: "roberts-e",
            name: "Edward ROBERTS",
            title: "Business Unit Manager",
            team: "EC - ALL CONDITIONS SHOES",
            department: "FOOTWEAR",
            phone: "",
            email: ""
        },
        {
            id: "bricout-a",
            name: "Anna BRICOUT",
            title: "Technical Director",
            team: "EC - ATHLETICS & FEDERATED SPORTS",
            department: "FOOTWEAR",
            phone: "",
            email: ""
        },
        {
            id: "bousquet-a",
            name: "Audrey BOUSQUET EL MOUJOUD",
            title: "Global Purchasing Manager",
            team: "PURCHASE & SUPPLY",
            department: "FOOTWEAR",
            phone: "",
            email: ""
        },
        {
            id: "delerue-b",
            name: "Benjamin DELERUE",
            title: "Quality Director",
            team: "QUALITY - METHODS",
            department: "FOOTWEAR",
            phone: "",
            email: ""
        },

        // === SOFT EQUIPMENT TEAM (45+ postes) ===
        {
            id: "pacaud-f",
            name: "Franck PACAUD",
            title: "Process Director",
            team: "BALLON",
            department: "SOFT EQUIPMENT",
            phone: "",
            email: ""
        },
        {
            id: "remond-f",
            name: "Frederic REMOND",
            title: "Innovation Manager",
            team: "SOFT EQUIPMENT",
            department: "SOFT EQUIPMENT",
            phone: "",
            email: ""
        },
        {
            id: "huard-j",
            name: "Joseph HUARD",
            title: "Process Director",
            team: "ROBOOST",
            department: "SOFT EQUIPMENT",
            phone: "",
            email: ""
        },
        {
            id: "lescalier-j",
            name: "Julien LESCALIER",
            title: "Process Director",
            team: "PROCESS TENTS",
            department: "SOFT EQUIPMENT",
            phone: "",
            email: ""
        },
        {
            id: "payen-m",
            name: "Mathilde PAYEN",
            title: "Process Director",
            team: "BAGS LILLE",
            department: "SOFT EQUIPMENT",
            phone: "",
            email: ""
        },
        {
            id: "falewee-n",
            name: "Nicolas FALEWEE",
            title: "Process Director",
            team: "WELDING",
            department: "SOFT EQUIPMENT",
            phone: "",
            email: ""
        },

        // === ENGINEERING COE (40+ postes) ===
        {
            id: "deschamps-am",
            name: "Andre Marc DESCHAMPS",
            title: "Project Manager",
            team: "DECATHLON MONDE",
            department: "COE ENGINEERING",
            phone: "",
            email: ""
        },
        {
            id: "laouilleau-e",
            name: "Emeline LAOUILLEAU",
            title: "Project Manager",
            team: "COE ENGINEERING",
            department: "COE ENGINEERING",
            phone: "",
            email: ""
        },
        {
            id: "prou-jb",
            name: "Jean Baptiste PROU",
            title: "Laboratory Manager",
            team: "TREKKING",
            department: "COE ENGINEERING",
            phone: "",
            email: ""
        },
        {
            id: "cuminal-jb",
            name: "Jean-Baptiste CUMINAL",
            title: "Project Manager",
            team: "COE ENGINEERING",
            department: "COE ENGINEERING",
            phone: "",
            email: ""
        },
        {
            id: "roget-m",
            name: "Maud ROGET",
            title: "Project Manager",
            team: "COE ENGINEERING",
            department: "COE ENGINEERING",
            phone: "",
            email: ""
        },
        {
            id: "beny-n",
            name: "Nicolas BENY",
            title: "Technical Manager",
            team: "Tech Off Conception",
            department: "COE ENGINEERING",
            phone: "",
            email: ""
        },
        {
            id: "billion-o",
            name: "Olivier BILLION",
            title: "Project Manager",
            team: "DECATHLON ENGINEERING",
            department: "COE ENGINEERING",
            phone: "",
            email: ""
        },
        {
            id: "carreira-rp",
            name: "Rui Pedro CARREIRA",
            title: "Technical Manager",
            team: "Tech Off Conception",
            department: "COE ENGINEERING",
            phone: "",
            email: ""
        },
        {
            id: "roussel-s",
            name: "Stephanie ROUSSEL",
            title: "Project Manager",
            team: "COE ENGINEERING",
            department: "COE ENGINEERING",
            phone: "",
            email: ""
        },
        {
            id: "vanhamme-v",
            name: "Vincent VANHAMME",
            title: "Technical Director",
            team: "DECATHLON ENGINEERING",
            department: "COE ENGINEERING",
            phone: "",
            email: ""
        }
    ],

    // 🏂 AXE SPORTS / MARQUES (50+ postes)
    sports: [
        {
            id: "lanigan-c",
            name: "CAROLINE LANIGAN",
            title: "Innovation Manager",
            team: "DOMYOS DIRECTION",
            department: "SPORTS",
            phone: "",
            email: ""
        },
        {
            id: "lebozec-y",
            name: "YVAN LE BOZEC",
            title: "Business Unit Manager",
            team: "SPORTS",
            department: "SPORTS",
            phone: "",
            email: ""
        },
        {
            id: "devilder-a",
            name: "Arnaud DEVILDER",
            title: "Designer Leader",
            team: "SPORTS",
            department: "SPORTS",
            phone: "",
            email: ""
        },
        {
            id: "bhutani-v",
            name: "Vishesh BHUTANI",
            title: "Business Unit Manager",
            team: "SPORTS",
            department: "SPORTS",
            phone: "",
            email: ""
        },
        {
            id: "aamer-m",
            name: "Mimoun AAMER",
            title: "Business Unit Manager",
            team: "SPORTS",
            department: "SPORTS",
            phone: "",
            email: ""
        }
    ],

    // 🔄 MÉTIERS TRANSVERSES (220+ postes)
    transverse: [
        // === SUSTAINABILITY (78 postes) ===
        {
            id: "tinoco-n",
            name: "Nuno TINOCO",
            title: "Global Sustainability Director",
            team: "SUSTAINABILITY",
            department: "SUSTAINABILITY",
            isTeamManager: true,
            phone: "",
            email: ""
        },
        {
            id: "arnaud-s",
            name: "Sandra ARNAUD",
            title: "Sustainability Director Process",
            team: "SD IN LOG & TRANSPORT",
            department: "SUSTAINABILITY",
            phone: "",
            email: ""
        },
        {
            id: "louis-t",
            name: "Tristan LOUIS",
            title: "Sustainability Director Production",
            team: "EQUIPE DVT DURABLE",
            department: "SUSTAINABILITY",
            phone: "",
            email: ""
        },
        {
            id: "wei-a",
            name: "Anthony WEI",
            title: "Sustainability Director Production",
            team: "SUSTAINABILITY",
            department: "SUSTAINABILITY",
            phone: "",
            email: ""
        },
        {
            id: "vandyvyver-ph",
            name: "PIERRE HENRI VAN DE VYVER",
            title: "Sustainability Director Production",
            team: "SUSTAINABILITY",
            department: "SUSTAINABILITY",
            phone: "",
            email: ""
        },
        {
            id: "gelineau-s",
            name: "Samuel GELINEAU",
            title: "Sustainability Director Production",
            team: "SUSTAINABILITY",
            department: "SUSTAINABILITY",
            phone: "",
            email: ""
        },
        {
            id: "fossard-a",
            name: "Arnaud FOSSARD",
            title: "Sustainability Director Process",
            team: "ENVIRONMENTAL SKATES",
            department: "SUSTAINABILITY",
            phone: "",
            email: ""
        },
        {
            id: "duby-r",
            name: "Raffaele DUBY",
            title: "Process Organizational Manager",
            team: "SUSTAINABILITY ECO DESIGN",
            department: "SUSTAINABILITY",
            phone: "",
            email: ""
        },
        {
            id: "mappus-r",
            name: "Raphaelle MAPPUS",
            title: "Sustainability Director Retail",
            team: "SUSTAINABILITY",
            department: "SUSTAINABILITY",
            phone: "",
            email: ""
        },
        {
            id: "thebault-a",
            name: "Angelique THEBAULT",
            title: "Sustainability Director Product",
            team: "NPU* KALENJI BUG JOG",
            department: "SUSTAINABILITY",
            phone: "",
            email: ""
        },
        {
            id: "jeulin-b",
            name: "Benoit JEULIN",
            title: "Sustainability Director Product",
            team: "HIKING SPORTS",
            department: "SUSTAINABILITY",
            phone: "",
            email: ""
        },
        {
            id: "cardock-c",
            name: "Candice CARDOCK",
            title: "Sustainability Director Product",
            team: "SUSTAINABILITY COMMUNICATION",
            department: "SUSTAINABILITY",
            phone: "",
            email: ""
        },
        {
            id: "bigarani-c",
            name: "Cedric BIGARANI",
            title: "Sustainability Director Product",
            team: "SUSTAINABLE & CIRCULAR CYCLING",
            department: "SUSTAINABILITY",
            phone: "",
            email: ""
        },
        {
            id: "dudore-e",
            name: "Edouard DU DORE",
            title: "Sustainability Director Product",
            team: "SUSTAINABILITY",
            department: "SUSTAINABILITY",
            phone: "",
            email: ""
        },
        {
            id: "snowden-f",
            name: "Fern SNOWDEN",
            title: "Sustainability Director Product",
            team: "EQUIPE BOOSTER DD",
            department: "SUSTAINABILITY",
            phone: "",
            email: ""
        },
        {
            id: "pitaval-g",
            name: "Gaetan PITAVAL",
            title: "Sustainability Director Product",
            team: "KIPRUN",
            department: "SUSTAINABILITY",
            phone: "",
            email: ""
        },
        {
            id: "brizard-m",
            name: "Manon BRIZARD",
            title: "Sustainability Director Product",
            team: "Sports Sustainability Team",
            department: "SUSTAINABILITY",
            phone: "",
            email: ""
        },
        {
            id: "ribolzi-m",
            name: "Maxime RIBOLZI",
            title: "Sustainability Director Product",
            team: "SPORT PRODUCTS SUSTAINABILITY",
            department: "SUSTAINABILITY",
            phone: "",
            email: ""
        },
        {
            id: "laboussole-o",
            name: "Olivier LABOUSSOLE",
            title: "Sustainability Director Product",
            team: "SPORT PRODUCTS SUSTAINABILITY",
            department: "SUSTAINABILITY",
            phone: "",
            email: ""
        },
        {
            id: "francois-p",
            name: "Pierre FRANCOIS",
            title: "Sustainability Director Product",
            team: "DIRECTION GENERALE FRANCE",
            department: "SUSTAINABILITY",
            phone: "",
            email: ""
        },
        {
            id: "dienne-s",
            name: "Suzanne DIENNE",
            title: "Sustainability Director Product",
            team: "SPORT PRODUCTS SUSTAINABILITY",
            department: "SUSTAINABILITY",
            phone: "",
            email: ""
        },

        // === GLOBAL PURCHASING (15+ postes) ===
        {
            id: "pierlot-f",
            name: "Francois PIERLOT",
            title: "Global Direct Purchasing COE Director",
            team: "VALUE CHAIN",
            department: "PURCHASING",
            isTeamManager: true,
            phone: "",
            email: ""
        },
        {
            id: "larousserie-s",
            name: "Sebastien LAROUSSERIE",
            title: "Global Purchasing Risk Manager",
            team: "HUB ACHAT STRATEGIQUE",
            department: "PURCHASING",
            phone: "",
            email: ""
        },
        {
            id: "cornet-w",
            name: "Wilfried CORNET",
            title: "Global Supplier Relationship Director",
            team: "HUB ACHAT STRATEGIQUE",
            department: "PURCHASING",
            phone: "",
            email: ""
        },

        // === QUALITY ===
        {
            id: "matt-s",
            name: "Stephane MATT",
            title: "Industrial Process Quality Manager",
            team: "QUALITY METHODS & CO",
            department: "QUALITY",
            isTeamManager: true,
            phone: "",
            email: ""
        },

        // === SUPPORT & ASSISTANTS ===
        {
            id: "prudhomme-a",
            name: "Amandine PRUDHOMME",
            title: "Office Manager",
            team: "SUPPORT",
            department: "SUPPORT",
            phone: "",
            email: ""
        },
        {
            id: "callens-f",
            name: "Florence CALLENS",
            title: "Executive Assistant",
            team: "SUPPORT",
            department: "SUPPORT",
            phone: "",
            email: ""
        },
        {
            id: "briffa-m",
            name: "Mathilde BRIFFA",
            title: "Executive Assistant",
            team: "SUPPORT",
            department: "SUPPORT",
            phone: "",
            email: ""
        },
        {
            id: "lecocq-a",
            name: "Anne LECOCQ",
            title: "Office Manager",
            team: "PROCESS PACK",
            department: "SUPPORT",
            phone: "",
            email: ""
        },
        {
            id: "dumetz-v",
            name: "Valerie DUMETZ FRANCOIS",
            title: "Office Manager",
            team: "ELECTRONICS",
            department: "SUPPORT",
            phone: "",
            email: ""
        },
        {
            id: "lugez-d",
            name: "Domitille LUGEZ",
            title: "Office Manager",
            team: "DIRECTION TEXTILE",
            department: "SUPPORT",
            phone: "",
            email: ""
        },
        {
            id: "bauduin-f",
            name: "Flavie BAUDUIN",
            title: "Office Manager",
            team: "METAL & BIKES",
            department: "SUPPORT",
            phone: "",
            email: ""
        },
        {
            id: "carballo-m",
            name: "Manon CARBALLO DIAZ",
            title: "Office Manager",
            team: "FOOTWEAR",
            department: "SUPPORT",
            phone: "",
            email: ""
        },

        // === DIGITAL & IT ===
        {
            id: "lemay-j",
            name: "Jerome LEMAY",
            title: "Process Director",
            team: "PROCESS",
            department: "DIGITAL",
            isTeamManager: true,
            phone: "",
            email: ""
        },
        {
            id: "sanii-a",
            name: "Amir SANII",
            title: "Digital Product Manager",
            team: "DIGITAL",
            department: "DIGITAL",
            phone: "",
            email: ""
        },
        {
            id: "vandewoorde-a",
            name: "Aymeric VANDEWOORDE",
            title: "Business Intelligence Engineer",
            team: "DIGITAL",
            department: "DIGITAL",
            phone: "",
            email: ""
        },
        {
            id: "fargeix-c",
            name: "Christophe FARGEIX",
            title: "Software Development Engineer",
            team: "DIGITAL",
            department: "DIGITAL",
            phone: "",
            email: ""
        },
        {
            id: "williatte-c",
            name: "Corentin WILLIATTE",
            title: "IT Service provider onsite",
            team: "DIGITAL",
            department: "DIGITAL",
            phone: "",
            email: ""
        },
        {
            id: "degobert-e",
            name: "Elisa DEGOBERT",
            title: "Software Development Engineer",
            team: "DIGITAL",
            department: "DIGITAL",
            phone: "",
            email: ""
        },
        {
            id: "dronkert-f",
            name: "Fabien DRONKERT",
            title: "Project Manager",
            team: "DIGITAL",
            department: "DIGITAL",
            phone: "",
            email: ""
        },
        {
            id: "bette-j",
            name: "Jérémy BETTE",
            title: "Software Development Engineer",
            team: "DIGITAL",
            department: "DIGITAL",
            phone: "",
            email: ""
        },
        {
            id: "devin-j",
            name: "Jonathan DEVIN",
            title: "IT Service provider onsite",
            team: "DIGITAL",
            department: "DIGITAL",
            phone: "",
            email: ""
        },
        {
            id: "sabos-j",
            name: "Julian SABOS",
            title: "IS Engineer",
            team: "DIGITAL",
            department: "DIGITAL",
            phone: "",
            email: ""
        },
        {
            id: "faby-m",
            name: "Marine FABY",
            title: "IS Engineer",
            team: "DIGITAL",
            department: "DIGITAL",
            phone: "",
            email: ""
        },
        {
            id: "fauchoit-m",
            name: "Mélyne FAUCHOIT",
            title: "IT Service provider onsite",
            team: "DIGITAL",
            department: "DIGITAL",
            phone: "",
            email: ""
        },
        {
            id: "hild-n",
            name: "Nicolas HILD",
            title: "Software Development Engineer",
            team: "DIGITAL",
            department: "DIGITAL",
            phone: "",
            email: ""
        },
        {
            id: "lebever-p",
            name: "Pierre LE BEVER",
            title: "Digital Product Manager",
            team: "DIGITAL",
            department: "DIGITAL",
            phone: "",
            email: ""
        },
        {
            id: "fremy-s",
            name: "Stanislas FREMY",
            title: "Digital Product Manager",
            team: "DIGITAL",
            department: "DIGITAL",
            phone: "",
            email: ""
        },
        {
            id: "hernandez-t",
            name: "Tania HERNANDEZ",
            title: "Digital Product Designer",
            team: "DIGITAL",
            department: "DIGITAL",
            phone: "",
            email: ""
        },
        {
            id: "deramchi-y",
            name: "Yousra DERAMCHI",
            title: "Digital Product Manager",
            team: "DIGITAL",
            department: "DIGITAL",
            phone: "",
            email: ""
        }
    ]
};

// ==========================================
// CONFIGURATION & METADATA
// ==========================================

const orgConfig = {
    version: "2.0",
    lastUpdate: "2025-01-03",
    totalEmployees: 542,
    departments: {
        process: 270,
        sports: 50,
        transverse: 220
    },
    axes: {
        process: "🏭 Process & Engineering",
        sports: "🏂 Sports / Marques",
        transverse: "🔄 Métiers Transverses"
    }
};

// Export pour utilisation dans app.js
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { orgData, orgConfig };
}
