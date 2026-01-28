export const gemstones = [
    {
        slug: "sapphire",
        title: "Sapphire",
        subtitle: "The Celestial Stone",
        description: "Known as the gem of the heavens, Sapphire represents wisdom, virtue, and good fortune. Our collection features rare Kashmir and Burmese sapphires, renowned for their velvety 'cornflower' blue hues.",
        details: {
            hardness: "9 Mohs",
            origin: "Kashmir, Burma, Sri Lanka",
            color: "Royal Blue to Cornflower",
            rarity: "Exceptional"
        },
        images: [
            "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&q=80&w=2000",
            "https://images.unsplash.com/photo-1617058999920-5326c9c64700?auto=format&fit=crop&q=80&w=2000"
        ]
    },
    {
        slug: "ruby",
        title: "Ruby",
        subtitle: "The King of Gems",
        description: "Burning with an inner fire, the Ruby is a symbol of passion and power. We specialize in unheated Pigeon Blood rubies from Mogok, the rarest and most coveted of all colored gemstones.",
        details: {
            hardness: "9 Mohs",
            origin: "Burma (Myanmar), Mozambique",
            color: "Pigeon Blood Red",
            rarity: "Ultra-Rare"
        },
        images: [
            "https://images.unsplash.com/photo-1620215175664-cb4a14c67bc7?auto=format&fit=crop&q=80&w=2000",
            "https://images.unsplash.com/photo-1600003014605-4c07d391aa57?auto=format&fit=crop&q=80&w=2000"
        ]
    },
    {
        slug: "emerald",
        title: "Emerald",
        subtitle: "The Jewel of Kings",
        description: "With its lush, verdant green, the Emerald evokes the eternal rebirth of nature. Sourced from the legendary mines of Muzo, Colombia, our emeralds possess an unmatched depth and vitality.",
        details: {
            hardness: "7.5 - 8 Mohs",
            origin: "Colombia, Zambia",
            color: "Vivid Green",
            rarity: "High"
        },
        images: [
            "https://images.unsplash.com/photo-1615655114865-4cc1bda5901e?auto=format&fit=crop&q=80&w=2000",
            "https://images.unsplash.com/photo-1598556856353-5d51d1825227?auto=format&fit=crop&q=80&w=2000"
        ]
    }
];

// Data Definitions
export interface OriginData {
    slug: string;
    title: string;
    subtitle: string;
    heroImage: string;
    intro: {
        heading: string;
        text: string;
    };
    sections: {
        title: string;
        content: string;
        image?: string;
        imageCaption?: string;
        layout?: 'text-left' | 'text-right' | 'full-width';
    }[];
    stats: { label: string; value: string }[];
    coordinates: string;
    cta: {
        text: string;
        href: string;
    };
}

export const origins: OriginData[] = [
    {
        slug: "brazil",
        title: "Brazil",
        subtitle: "Vibrant Splendour",
        heroImage: "https://images.unsplash.com/photo-1518385633465-98516d2ca2a7?auto=format&fit=crop&q=80&w=2000",
        intro: {
            heading: "The Verdant Expanse",
            text: "Brazil, a continental masterpiece of biodiversity and geological wonder, stands as the crown jewel of South America. From the enigmatic depths of the Amazon to the mineral-rich heart of Minas Gerais, this is a land where the earth itself bleeds vivid colour. It is here, amidst jungles and ancient rock, that nature hides her most eclectic treasures."
        },
        sections: [
            {
                title: "The Gemstones of Brazil",
                content: "Brazil is a lithological kaleidoscope, unearthing a spectrum of stones unmatched in variety. It is the sole provenance of the ethereal Imperial Topaz and the neon-electric Paraiba Tourmaline. From the hypnotic depths of its Quartz varieties to the lushness of its Emeralds, Brazil offers a geology of pure emotion. The legendary Dom Pedro aquamarine, a monolith of blue, owes its existence to these fertile grounds.",
                layout: 'text-left'
            },
            {
                title: "The Geology of Minas Gerais",
                content: "Minas Gerais—literally 'General Mines'—is a testament to tectonic providence. A 17th-century gold rush may have defined its history, but it is the pegmatite fields that define its legacy. These granitic intrusions serve as nature's vault, safeguarding Emeralds, Aquamarines, Rubellites, and Alexandrites. It is a region where history is written not in ink, but in the faceting of rare minerals.",
                image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&q=80&w=2000",
                layout: 'text-right'
            },
            {
                title: "The Legacy of Amethyst",
                content: "Once revered by royalty alongside the Sapphire and Ruby, Amethyst found a new chapter in the mines of Rio Grande do Sul. The sheer volume of these 19th-century discoveries democratized the violet stone, yet demand for its regal hue remains undiminished. It stands as a reminder that true beauty, regardless of abundance, commands eternal admiration.",
                layout: 'full-width'
            }
        ],
        coordinates: "14.2350° S, 51.9253° W",
        stats: [
            { label: "Focus", value: "Tourmaline, Topaz, Emerald" },
            { label: "Legacy", value: "17th Century Gold Rush" },
            { label: "Distinction", value: "Paraiba & Imperial Topaz" }
        ],
        cta: {
            text: "Explore Brazilian Gems",
            href: "/gemstones/all?origin=brazil"
        }
    },
    {
        slug: "burma",
        title: "Burma",
        subtitle: "The Crimson Valley",
        heroImage: "https://images.unsplash.com/photo-1528642474498-1af0c17fd8c3?auto=format&fit=crop&q=80&w=2000",
        intro: {
            heading: "A King Amongst Kings",
            text: "Myanmar, the ancient land of Burma, is a realm steeped in mystique and shadow. It is the undisputed throne of the Ruby, the King of Gems. In the twilight of the Mogok Valley, north of Mandalay, the earth yields stones of such fire and intensity that they have captivated empires for millennia."
        },
        sections: [
            {
                title: "The Burmese Ruby",
                content: "A Burmese Ruby is not merely a stone; it is an event of light. Distinguished by a saturated bluish-red body colour and a unique red fluorescence, these gems possess an inner fire that glows even in darkness. The presence of 'silk'—microscopic rutile inclusions—scatters light, creating a velvety softness that softens the stone while amplifying its colour. It is a signature of geological nobility.",
                layout: 'text-left'
            },
            {
                title: "History & Rarity",
                content: "While fine rubies have surfaced in Mozambique, the Burmese pedigree remains unrivalled. The term 'Pigeon Blood' originated here, a descriptor reserved for stones of absolute perfection. Sinking yields and a history stretching back 800 years ensure that a true Burmese Ruby is not just a purchase, but an inheritance of history.",
                image: "https://images.unsplash.com/photo-1627885011925-5e042784562c?auto=format&fit=crop&q=80&w=2000",
                layout: 'text-right'
            },
            {
                title: "The Mogok Region",
                content: "Mogok is the beating heart of the ruby trade. It is a place where markets shimmer with red and blue, from the dust of artisanal mines to the high tables of Yangon auctions. Beyond the ruby, Mogok blesses the world with Spinels, Peridots, and Blue Sapphires of Royal intensity, proving that this valley is truly touched by the divine.",
                layout: 'full-width'
            }
        ],
        coordinates: "22.9160° N, 96.5029° E",
        stats: [
            { label: "Focus", value: "Ruby, Sapphire, Spinel" },
            { label: "Legacy", value: "800+ Years" },
            { label: "Distinction", value: "Pigeon Blood Red" }
        ],
        cta: {
            text: "Acquire Burmese Rubies",
            href: "/gemstones/ruby"
        }
    },
    {
        slug: "colombia",
        title: "Colombia",
        subtitle: "The Emerald Heart",
        heroImage: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=2000",
        intro: {
            heading: "The Eternal Spring",
            text: "Colombia is a synonym for the Emerald. Nestled within the Andes, this land provides the world with green gems of an intensity that defies logic. From the pre-Columbian rituals of the Muzo people to the crowns of European royalty, the Colombian Emerald has always been the ultimate talisman of nature's rebirth."
        },
        sections: [
            {
                title: "Historic Mining Locations",
                content: "Long before the Spanish Galleons, the indigenous people of Boyacá revered the emerald as sacred. The mines of Muzo, Chivor, and Coscuez are legendary names in gemology. Unlike emeralds formed in igneous rock, Colombian stones are born from hydrothermal veins in sedimentary rock, a unique genesis that grants them their unparalleled size, clarity, and saturation.",
                layout: 'text-left'
            },
            {
                title: "The Colombian Character",
                content: "A fine Colombian emerald exudes a deep bluish-green, a colour so viscous and rich it feels alive. This 'velvety' quality is the hallmark of the region. Identifying these stones was once a matter of spotting three-phase inclusions, but today, science and provenance combine to certify these treasures. To own one is to own a fragment of the lush Andean spirit.",
                image: "https://images.unsplash.com/photo-1595276632463-745a371c26c1?auto=format&fit=crop&q=80&w=2000",
                layout: 'text-right'
            }
        ],
        coordinates: "5.5725° N, 74.3275° W",
        stats: [
            { label: "Focus", value: "Emerald" },
            { label: "Legacy", value: "Pre-Columbian" },
            { label: "Distinction", value: "Hydrothermal Formation" }
        ],
        cta: {
            text: "View Colombian Emeralds",
            href: "/gemstones/emerald"
        }
    },
    {
        slug: "kashmir",
        title: "Kashmir",
        subtitle: "The Velvet Blue",
        heroImage: "https://images.unsplash.com/photo-1620215175664-cb4a14c67bc7?auto=format&fit=crop&q=80&w=2000",
        intro: {
            heading: "Himalayan Legend",
            text: "In the pantheon of gemstones, Kashmir stands alone. Located at the northern tip of the Indian subcontinent, amidst the unforgiving grandeur of the Himalayas, lies a remote valley that changed the world of Sapphires forever. The discoveries made here between 1879 and 1887 set a benchmark for beauty that has never been surpassed."
        },
        sections: [
            {
                title: "The Old Mine",
                content: "The original 'Old Mine' was exhausted in mere decades, a fleeting moment of geological perfection. Mining was only possible during short summer months, adding to the mystique. While newer deposits have been found, none rival the legendary material of the late 19th century. A Kashmir Sapphire is a finite resource, a piece of vanished history.",
                layout: 'text-left'
            },
            {
                title: "Cornflower Blue",
                content: "The term 'Cornflower Blue' is the poetry used to describe the Kashmir hue—a vivid, fully saturated violet-blue that retains its intensity under any light. Combined with microscopic inclusions that scatter light, these stones possess a sleepy, velvety softness that is unmistakably Kashmir. They are the rarest of the rare.",
                image: "https://images.unsplash.com/photo-1617058999920-5326c9c64700?auto=format&fit=crop&q=80&w=2000",
                layout: 'text-right'
            }
        ],
        coordinates: "33.2778° N, 75.3412° E",
        stats: [
            { label: "Focus", value: "Sapphire" },
            { label: "Legacy", value: "1880s Discovery" },
            { label: "Distinction", value: "Velvety 'Cornflower' Blue" }
        ],
        cta: {
            text: "Inquire About Kashmir",
            href: "/contact"
        }
    },
    {
        slug: "madagascar",
        title: "Madagascar",
        subtitle: "The Island Ark",
        heroImage: "https://images.unsplash.com/photo-1576759163032-4e4b78c858bd?auto=format&fit=crop&q=80&w=2000",
        intro: {
            heading: "Evolution in Isolation",
            text: "Separated from Africa for 88 million years, Madagascar is an evolutionary ark. This isolation allowed flora, fauna, and geology to develop in singular ways. Once a quiet island, a gemstone boom in the 1990s revealed it to be a geological sleeping giant, now recognized as a premier source of Sapphires and Rubies."
        },
        sections: [
            {
                title: "Ilakaka: The Capital",
                content: "From a dusty hamlet to a bustling boomtown of 60,000, Ilakaka is the sapphire capital of Madagascar. It is a place of raw energy and discovery. While famous for pink sapphires, the region yields a spectrum of blue, purple, yellow, and orange corundum. It is a modern gold rush, a testament to the earth's enduring capacity to surprise us.",
                layout: 'text-left'
            },
            {
                title: "A Diversity of Riches",
                content: "Madagascar does not specialize; it overwhelms. Beyond the Sapphire, it gifts the world with Rubies, Emeralds, Aquamarines, and Tourmalines. Mining remains artisanal, a pursuit of individuals hunting for the gifts of mother earth in remote, untouched corners of this biodiversity hotspot.",
                image: "https://images.unsplash.com/photo-1598556856353-5d51d1825227?auto=format&fit=crop&q=80&w=2000",
                layout: 'text-right'
            }
        ],
        coordinates: "22.3506° S, 45.1983° E",
        stats: [
            { label: "Focus", value: "Sapphire, Ruby" },
            { label: "Legacy", value: "Modern Discovery (1990s)" },
            { label: "Distinction", value: "High Diversity" }
        ],
        cta: {
            text: "Discover Madagascan Gems",
            href: "/gemstones/all?origin=madagascar"
        }
    },
    {
        slug: "sri-lanka",
        title: "Sri Lanka",
        subtitle: "The Island of Gems",
        heroImage: "https://images.unsplash.com/photo-1589146162383-7be982e07172?auto=format&fit=crop&q=80&w=2000",
        intro: {
            heading: "Rathna-Dweepa",
            text: "Sri Lanka, the 'Island of Gems', is a tropical paradise where the soil itself seems saturated with colour. Known by the ancients as Rathna-Dweepa, this island south of India is likely the oldest and most sustainable source of Sapphires in history, with a lineage traced back to Etruscan and Roman jewelry."
        },
        sections: [
            {
                title: "The Padparadscha",
                content: "While renowned for Royal Blue sapphires, Sri Lanka is the spiritual home of the Padparadscha. Named after the lotus blossom, this rare sapphire marries the energy of sunset orange with the delicacy of lotus pink. To look into a Padparadscha is to view a Sri Lankan sunrise captured in stone.",
                layout: 'text-left'
            },
            {
                title: "A Tradition of Heat",
                content: "Sri Lanka is not just a source; it is an atelier. The island is famous for its 'burners', artisans skilled in the ancient alchemy of heat treatment, enhancing the natural beauty of corundum. From the gem markets of Ratnapura to the cutting wheels that polish diamonds, Sri Lanka is a holistic center of the gem world.",
                image: "https://images.unsplash.com/photo-1615655114865-4cc1bda5901e?auto=format&fit=crop&q=80&w=2000",
                layout: 'text-right'
            }
        ],
        coordinates: "7.8731° N, 80.7718° E",
        stats: [
            { label: "Focus", value: "Sapphire, Padparadscha" },
            { label: "Legacy", value: "2000+ Years" },
            { label: "Distinction", value: "Oldest Source" }
        ],
        cta: {
            text: "Explore Ceylon Sapphires",
            href: "/gemstones/sapphire"
        }
    }
];



