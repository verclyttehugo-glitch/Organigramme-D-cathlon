const ORG_DATA = {
    ceo: {
        name: "Javier LÓPEZ",
        title: "Chief Executive Officer",
        department: "DECATHLON MONDE",
        type: "ceo",
        children: [
            {
                name: "Marine GRAHAM",
                title: "Chief Value Chain Officer",
                department: "DECATHLON UNITED",
                type: "c-suite",
                axes: [
                    {
                        name: "1) AXE PROCESS",
                        description: "Engineering, Industrialisation, Tests, Labs, Supply",
                        type: "axis-process",
                        items: [
                            {
                                name: "Jean-Baptiste PRAUD",
                                title: "Laboratory Manager",
                                department: "COE ENGINEERING",
                                type: "process",
                                badge: "DECATHLON UNITED",
                                phone: "+33 X XX XX XX XX", // Non trouvé dans le fichier Excel
                                subLevel: [
                                    {
                                        name: "Christophe LERNOULD",
                                        title: "Team Manager",
                                        contact: "christophe.lernould@decathlon.com",
                                        phone: "+33 6 29 54 83 28",
                                        type: "team-manager"
                                    },
                                    {
                                        name: "Thibault LEMAITRE",
                                        title: "Laboratory Manager",
                                        type: "team-manager"
                                    },
                                    { name: "Antoine LOMBERTY", title: "Team Member", type: "process" },
                                    { name: "Clement DUBORPER", title: "Team Member", type: "process" },
                                    { name: "Gilles LAGANTE", title: "Team Member", type: "process" },
                                    { name: "Hard Equipment Lab", title: "Laboratory", type: "team-manager" },
                                    { name: "Kenn MAKOUANGOU", title: "Team Member", type: "process" },
                                    { name: "Simon HORB", title: "Team Member", type: "process" },
                                    { name: "Sophie DAVID", title: "Team Member", type: "process" },
                                    { name: "Vianney MOTTE", title: "Team Member", type: "process" },
                                    { name: "Vincent HERLEMONT", title: "Team Member", type: "process" }
                                ]
                            },
                            {
                                name: "Marc ROUSSEAU",
                                title: "Process Director",
                                department: "TEXTILE",
                                type: "process",
                                badge: "DOMYOS MARCQ",
                                teamInfo: "👥 14+ Managers",
                                subLevel: [
                                    { name: "Joseph HUARD", title: "Process Director", type: "process" },
                                    { name: "Julien LESCALIER", title: "Process Director", type: "process" },
                                    { name: "Aurelien CORBIER", title: "Technical Director", type: "process" },
                                    { name: "Bruno RECHICHE", title: "Technical Director", type: "process" },
                                    { name: "David LONCKE", title: "Process Director NOVADRY", type: "process" },
                                    { name: "Agnès SERILLE", title: "Technical Director", type: "process" },
                                    { name: "David VERDY", title: "Quality Director", type: "quality" },
                                    { name: "Mimoun AAMER", title: "Business Unit Manager", type: "manager" },
                                    { name: "Pauline GORLA", title: "Industrial Process Quality Manager", type: "quality" }
                                ]
                            },
                            {
                                name: "Sebastien DOLLET",
                                title: "Process Director",
                                department: "FOOTWEAR",
                                type: "process",
                                badge: "OFFICE FOOTWEAR",
                                teamInfo: "👥 15+ Managers",
                                subLevel: [
                                    { name: "Gauthier DESCAMPS", title: "Technical Director", type: "process" },
                                    { name: "Charlotte JOSEPH", title: "Process Director", type: "process" },
                                    { name: "Bastien GRISONNET", title: "Technical Director", type: "process" },
                                    { name: "Benjamin DELERUE", title: "Quality Director", type: "quality" },
                                    { name: "Brice BENOIT", title: "Innovation Director", type: "process" },
                                    { name: "Julian PETIT", title: "Technical Director", type: "process" },
                                    { name: "Elodie MOK", title: "Technical Director", type: "process" },
                                    { name: "Vianney EVRARD", title: "Global Purchasing Manager", type: "sourcing" }
                                ]
                            },
                            {
                                name: "Emilie FREJAVILLE",
                                title: "Process Director",
                                department: "SOFT EQUIPMENT",
                                type: "process",
                                badge: "KIPSTA",
                                teamInfo: "👥 8+ Managers",
                                subLevel: [
                                    { name: "Frederic SIMOND", title: "Innovation Manager", type: "manager" },
                                    { name: "Quentin SORGUE", title: "Technical Director", type: "process" },
                                    { name: "Thomas HOTTE", title: "Technical Director", type: "process" },
                                    { name: "Nicolas FALEWEE", title: "Process Director", type: "process" },
                                    { name: "Vincent VANHAMME", title: "Technical Director", type: "process" },
                                    { name: "Angelique THIBAULT", title: "Sustainability Director Product", type: "quality" },
                                    { name: "Giles LAGARTE", title: "Technical Manager", type: "manager" }
                                ]
                            },
                            {
                                name: "Mathilde PAYEN",
                                title: "Process Director",
                                department: "ELECTRONICS",
                                type: "process",
                                badge: "OFFICE BTWIN",
                                subLevel: [
                                    { name: "Thomas FREMAUX", title: "Process Director", type: "process" }
                                ]
                            }
                        ]
                    },
                    {
                        name: "2) AXE SPORTS / MARQUES",
                        description: "KIPSTA, TRIBORD, BTWIN, DOMYOS, etc.",
                        type: "axis-sports",
                        items: [
                            {
                                name: "KIPSTA",
                                title: "Sports Brand - Team Sports",
                                type: "sport",
                                badge: "KIPSTA STADIUM",
                                subLevel: [
                                    { name: "Équipe KIPSTA", title: "Category Specialists", type: "sport" }
                                ]
                            },
                            {
                                name: "QUECHUA",
                                title: "Sports Brand - Mountain",
                                type: "sport",
                                badge: "DOMANCY",
                                subLevel: [
                                    { name: "Équipe QUECHUA", title: "Category Specialists", type: "sport" }
                                ]
                            },
                            {
                                name: "TRIBORD",
                                title: "Sports Brand - Water Sports",
                                type: "sport",
                                badge: "HENDAYE",
                                subLevel: [
                                    { name: "Équipe TRIBORD", title: "Category Specialists", type: "sport" }
                                ]
                            },
                            {
                                name: "BTWIN / VAN RYSEL",
                                title: "Sports Brand - Cycling",
                                type: "sport",
                                badge: "BTWIN VILLAGE",
                                subLevel: [
                                    { name: "Équipe BTWIN", title: "Category Specialists", type: "sport" }
                                ]
                            },
                            {
                                name: "KIPRUN",
                                title: "Sports Brand - Running",
                                type: "sport",
                                badge: "RUNNING HUB",
                                subLevel: [
                                    { name: "Gaetan PITAVAL", title: "Sustainability Director", type: "quality" }
                                ]
                            }
                        ]
                    },
                    {
                        name: "3) AXE MÉTIERS TRANSVERSES",
                        description: "Qualité, Sustainability, Achats, Support",
                        type: "axis-transverse",
                        items: [
                            {
                                name: "QUALITÉ GLOBALE",
                                title: "Transverse Support",
                                type: "transverse",
                                badge: "VALUE CHAIN",
                                subLevel: [
                                    { name: "David VERDY", title: "Quality Director (Textile)", type: "quality" },
                                    { name: "Benjamin DELERUE", title: "Quality Director (Footwear)", type: "quality" },
                                    { name: "Pauline GORLA", title: "Industrial Process Quality Manager", type: "quality" }
                                ]
                            },
                            {
                                name: "SUSTAINABILITY / RSE",
                                title: "Transverse Support",
                                type: "transverse",
                                badge: "GLOBAL",
                                subLevel: [
                                    { name: "Isabelle GUYADER", title: "Global Sustainability Director", type: "sustainability" },
                                    { name: "John THOMAS", title: "Global Sustainability Director", type: "sustainability" },
                                    { name: "Nuno TINOCO", title: "Global Sustainability Director", type: "sustainability" },
                                    { name: "Arnaud FOSSARD", title: "Sustainability Director Process", type: "sustainability" },
                                    { name: "Angelique THIBAULT", title: "Sustainability Director Product", type: "sustainability" }
                                ]
                            },
                            {
                                name: "ACHATS & SOURCING",
                                title: "Transverse Support",
                                type: "transverse",
                                badge: "HUB ACHAT",
                                subLevel: [
                                    { name: "François PIERLOT", title: "Global Direct Purchasing Director", type: "sourcing" },
                                    { name: "Wilfried CORNET", title: "Supplier Relationship Director", type: "sourcing" },
                                    { name: "Sebastien LAROU-SUZINI", title: "Purchasing Risk Manager", type: "sourcing" },
                                    { name: "Vianney EVRARD", title: "Global Purchasing Manager", type: "sourcing" }
                                ]
                            },
                            {
                                name: "PACKAGING & RAW",
                                title: "Transverse Support",
                                type: "transverse",
                                badge: "PROCESS PACK",
                                subLevel: [
                                    { name: "Thierry MONNIAUX", title: "Process Director PACK", type: "packaging" },
                                    { name: "Antoine LEBAR", title: "Process Director RAW", type: "packaging" },
                                    { name: "Kevin POLTACKE", title: "Packaging Workshop Manager", type: "team-manager" }
                                ]
                            }
                        ]
                    }
                ]
            }
        ]
    }
};
