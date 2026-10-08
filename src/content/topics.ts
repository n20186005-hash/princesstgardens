export type TopicFaq = { question: string; answer: string };

export type TopicTable = {
  columns: string[];
  rows: string[][];
};

export type TopicSection = {
  heading: string;
  paragraphs?: string[];
  bullets?: string[];
  table?: TopicTable;
  note?: string;
};

export type Topic = {
  slug: string;
  navLabel: string;
  title: string;
  description: string;
  intro: string;
  updated: string;
  sections: TopicSection[];
  faq: TopicFaq[];
};

// Shared seasonal schedule (matches the homepage and the council timetable).
const HOURS_TABLE: TopicTable = {
  columns: ['Dates', 'Closing time', 'Gates start closing'],
  rows: [
    ['1 Jan – 29 Mar', '18:00', 'West 17:00 · East 17:15'],
    ['30 Mar – 26 Apr', '19:00', 'West 18:00 · East 18:15'],
    ['27 Apr – 31 May', '20:00', 'West 19:00 · East 19:15'],
    ['1 Jun – 30 Aug', '22:00', 'West 21:00 · East 21:15'],
    ['31 Aug – 27 Sep', '20:00', 'West 19:00 · East 19:15'],
    ['28 Sep – 25 Oct', '19:00', 'West 18:00 · East 18:15'],
    ['26 Oct – 31 Dec', '18:00', 'West 17:00 · East 17:15'],
  ],
};

export const topics: Record<string, Topic> = {
  'opening-hours': {
    slug: 'opening-hours',
    navLabel: 'Opening hours',
    title:
      'Princes Street Gardens Opening Hours 2026 | Seasonal Closing Times',
    description:
      'Princes Street Gardens opening hours: gates open at 07:00 daily, with closing times that change by season. Full City of Edinburgh Council timetable, gate closing times and winter closures.',
    intro:
      'Princes Street Gardens are free public gardens in the heart of Edinburgh, open every morning and closed by the council at a set time that shifts with the season. This page uses the official timetable published by the City of Edinburgh Council (Edinburgh Outdoors), checked on 8 October 2026.',
    updated: 'Last reviewed 8 October 2026',
    sections: [
      {
        heading: 'When do the gardens open?',
        paragraphs: [
          'The gates open at 07:00 every day, all year round. There is no ticket and no booking — you simply walk in from any public entrance along Princes Street or The Mound.',
        ],
      },
      {
        heading: 'Seasonal closing times',
        paragraphs: [
          'Closing time is set by the City of Edinburgh Council and changes through the year. The table below shows the published 2026 schedule.',
        ],
        table: HOURS_TABLE,
        note: 'Source: City of Edinburgh Council (Edinburgh Outdoors), checked 8 October 2026. Times can change for events, maintenance or bad weather — check the official page before you travel.',
      },
      {
        heading: 'Gate closing times',
        paragraphs: [
          'The gardens close gradually. The west gates start closing about one hour before the published closing time and the east gates about 45 minutes before, so the gardens can be cleared safely. If you are visiting late in the day, head for an exit before the gates begin to shut.',
        ],
      },
      {
        heading: 'Public toilets',
        paragraphs: [
          'Toilets are available at several points, though opening hours differ:',
        ],
        bullets: [
          'East Princes Street Gardens (The Mound) — 24-hour access, disabled only (RADAR key required).',
          'West Princes Street Gardens (The Mound) — 10:00–22:00, gents only, no disabled access.',
          'West Princes Street Gardens (Ross Band Stand) — 10:00–20:00 in summer only, disabled access.',
          'West Princes Street Gardens (West End) — 10:00–22:00, disabled access.',
        ],
      },
      {
        heading: 'Closures and planned changes',
        paragraphs: [
          'The gardens stay open through most events, but temporary fencing or earlier closures can happen for the Christmas market, concerts and maintenance. The entrance from Kings Stables Road is currently closed to pedestrians and vehicles; use St Cuthbert’s churchyard as an alternative way in.',
        ],
      },
    ],
    faq: [
      {
        question: 'What time do Princes Street Gardens close today?',
        answer:
          'Closing time changes through the year: 18:00 (1 Jan – 29 Mar), 19:00 (30 Mar – 26 Apr), 20:00 (27 Apr – 31 May), 22:00 (1 Jun – 30 Aug), 20:00 (31 Aug – 27 Sep), 19:00 (28 Sep – 25 Oct) and 18:00 (26 Oct – 31 Dec). The west gates begin closing about an hour earlier and the east gates about 45 minutes earlier.',
      },
      {
        question: 'Are Princes Street Gardens open in winter?',
        answer:
          'Yes. The gardens are open every day in winter, opening at 07:00 and closing at 18:00 between late October and late March. From late November the winter Edinburgh Christmas Market takes over part of the East Gardens.',
      },
      {
        question: 'Can you visit Princes Street Gardens at night?',
        answer:
          'No — the gardens are not open at night. They close at the published seasonal time and the gates are locked, so plan your visit for daylight hours.',
      },
      {
        question: 'Who looks after Princes Street Gardens?',
        answer:
          'The gardens are owned and maintained by the City of Edinburgh Council’s Parks and Greenspace Service, which also designs the annual Floral Clock planting.',
      },
      {
        question: 'Is it Princes or Princess Street Gardens?',
        answer:
          'The official name is Princes Street Gardens, after Princes Street. “Princess Street Gardens” is a common misspelling and refers to the same park.',
      },
    ],
  },

  'east-vs-west': {
    slug: 'east-vs-west',
    navLabel: 'East vs West',
    title:
      'East vs West Princes Street Gardens | What’s the Difference?',
    description:
      'What is the difference between the East and West Princes Street Gardens? Compare the Ross Fountain, Floral Clock, Scott Monument, entrances and the best side to visit.',
    intro:
      'Princes Street Gardens are split into two halves by The Mound, an artificial hill carrying roads between Edinburgh’s New Town and Old Town. The two sides feel quite different, so here is how to tell them apart and which to aim for.',
    updated: 'Last reviewed 8 October 2026',
    sections: [
      {
        heading: 'At a glance',
        table: {
          columns: ['West Princes Street Gardens', 'East Princes Street Gardens'],
          rows: [
            ['Larger half', 'Smaller half'],
            ['Ross Fountain', 'Scott Monument'],
            ['Ross Bandstand', 'Next to Waverley station'],
            ['Floral Clock (near Allan Ramsay Monument)', 'Winter Christmas Market'],
            ['Wide castle views from the lawn', 'Monuments and flower beds'],
          ],
        },
      },
      {
        heading: 'West Princes Street Gardens',
        paragraphs: [
          'The larger western half sits below the upper end of Princes Street and The Mound. It is home to the cast-iron Ross Fountain, the Ross Bandstand (the main event stage), and the Floral Clock, which stands near the Allan Ramsay Monument close to The Mound. Its open lawns give some of the most photographed views of Edinburgh Castle.',
        ],
      },
      {
        heading: 'East Princes Street Gardens',
        paragraphs: [
          'The smaller eastern half runs alongside Waverley station. Its centrepiece is the Scott Monument, the elaborate Victorian Gothic tower honouring Sir Walter Scott. In winter this side hosts the Edinburgh Christmas Market and the big wheel.',
        ],
      },
      {
        heading: 'How to walk between them',
        paragraphs: [
          'The two halves meet at The Mound. You can walk from one to the other in a few minutes: from the Scott Monument, head west along Princes Street Gardens past the Scottish National Gallery and up onto The Mound, then down into the West Gardens to reach the Floral Clock and Ross Fountain.',
        ],
      },
      {
        heading: 'Which side should I visit?',
        paragraphs: [
          'If you want castle photos, fountains and the Floral Clock, spend time in the West Gardens. If you are arriving by train at Waverley or visiting at Christmas, you will start in the East Gardens. Most visitors simply stroll through both.',
        ],
      },
    ],
    faq: [
      {
        question: 'Where is the Floral Clock?',
        answer:
          'The Floral Clock is in the West Princes Street Gardens, close to the Allan Ramsay Monument and The Mound — not in the East Gardens. It was first planted in 1903 and is re-planted each summer.',
      },
      {
        question: 'Is the Ross Fountain in the East or West Gardens?',
        answer:
          'The Ross Fountain is in the West Princes Street Gardens, near the centre of the park below Princes Street.',
      },
      {
        question: 'Where is the Scott Monument?',
        answer:
          'The Scott Monument stands in the East Princes Street Gardens, immediately beside Waverley station and Princes Street.',
      },
      {
        question: 'Can you walk from one side to the other?',
        answer:
          'Yes. The two halves connect at The Mound, and the walk between the Scott Monument and the Ross Fountain takes only a few minutes.',
      },
    ],
  },

  events: {
    slug: 'events',
    navLabel: 'Events',
    title:
      'Princes Street Gardens Events | What’s On and When',
    description:
      'What events happen in Princes Street Gardens? A seasonal guide to the Edinburgh Christmas Market, Hogmanay, summer concerts at the Ross Bandstand and the Floral Clock display.',
    intro:
      'Princes Street Gardens are not just a quiet park — they are one of Edinburgh’s main event spaces. Below is a seasonal overview of what typically happens there. This page lists recurring events, not a live calendar; always check the official organisers for current dates and tickets.',
    updated: 'Last reviewed 8 October 2026',
    sections: [
      {
        heading: 'What happens in the gardens',
        paragraphs: [
          'The Ross Bandstand in the West Gardens is the main performance space, while the East Gardens fill with market stalls in winter. The park is also a viewing point for fireworks over the castle.',
        ],
      },
      {
        heading: 'Winter: Edinburgh Christmas & Hogmanay',
        paragraphs: [
          'From late November to early January the East Gardens host the Edinburgh Christmas Market, the big wheel and festive attractions. Hogmanay (New Year) celebrations and castle fireworks often use the gardens and surrounding streets as viewpoints.',
        ],
      },
      {
        heading: 'Summer: concerts at the Ross Bandstand',
        paragraphs: [
          'In summer the Ross Bandstand stages live music, community events and seasonal shows. Exact programmes change each year, so check the City of Edinburgh Council and event organisers for what is on during your visit.',
        ],
      },
      {
        heading: 'The Floral Clock (summer display)',
        paragraphs: [
          'The Floral Clock is planted each spring and revealed in summer with a new design that commemorates a different theme every year. It is a free, always-open display rather than a ticketed event.',
        ],
      },
      {
        heading: 'Check before you go',
        paragraphs: [
          'Events can change opening hours, close entrances or add temporary fencing. Because some events charge for entry while the gardens themselves remain free, confirm whether you need a ticket before travelling.',
        ],
        note: 'This guide is reviewed periodically and does not replace official event listings. Verify dates and tickets with the event organisers.',
      },
    ],
    faq: [
      {
        question: 'What events are on at Princes Street Gardens today?',
        answer:
          'The gardens host the Christmas market and big wheel in winter, summer concerts at the Ross Bandstand, and castle fireworks for Hogmanay. There is no live listing on this site — check the City of Edinburgh Council and event organisers for today’s programme.',
      },
      {
        question: 'Are events in the gardens free?',
        answer:
          'Walking in the gardens and seeing the Floral Clock is free. Some events, such as concerts and the Christmas market attractions, sell separate tickets.',
      },
      {
        question: 'When is the Edinburgh Christmas Market?',
        answer:
          'The market typically runs from late November to early January in the East Princes Street Gardens. Exact dates change each year, so confirm with the official organiser before your visit.',
      },
      {
        question: 'Can you see Edinburgh Castle fireworks from the gardens?',
        answer:
          'Yes. The West Gardens lawn and the area near The Mound are popular (and free) viewpoints for castle fireworks during Hogmanay and festivals.',
      },
    ],
  },

  tickets: {
    slug: 'tickets',
    navLabel: 'Tickets & entry',
    title:
      'Princes Street Gardens Tickets & Entry | Is It Free?',
    description:
      'Are Princes Street Gardens free? Yes — entry is free and no ticket or booking is needed. This page explains what costs money nearby and what to book separately.',
    intro:
      'One of the best things about Princes Street Gardens is that they are completely free to visit. You can walk in, sit on the lawn and look at the castle without spending a penny. Here is what you do and do not need to pay for.',
    updated: 'Last reviewed 8 October 2026',
    sections: [
      {
        heading: 'Entry is free',
        paragraphs: [
          'There is no entrance fee, no ticket and no need to book. The gardens are public parkland owned by the City of Edinburgh Council and open to everyone during opening hours.',
        ],
      },
      {
        heading: 'What costs money nearby',
        paragraphs: [
          'The gardens themselves are free, but a few attractions around them charge separately:',
        ],
        bullets: [
          'Climbing the Scott Monument has a separate admission charge (paid at the monument).',
          'Edinburgh Castle sits above the gardens and is a paid, separately ticketed attraction.',
          'Some events at the Ross Bandstand, and the Christmas market attractions, sell their own tickets.',
        ],
      },
      {
        heading: 'Do I need to book?',
        paragraphs: [
          'No. For a normal visit you simply turn up during opening hours. Only specific paid events require advance tickets, and those are bought from the event organiser, not from the gardens.',
        ],
      },
      {
        heading: 'Accessibility',
        paragraphs: [
          'Paths through the gardens are mostly paved and step-free from the Princes Street and Mound entrances. The East Gardens are level with Waverley station. Accessible public toilets are available at the East Gardens (The Mound, 24-hour, RADAR key) and at points in the West Gardens.',
        ],
      },
    ],
    faq: [
      {
        question: 'Do you need tickets for Princes Street Gardens?',
        answer:
          'No. Entry to the gardens is free and there is no ticket or booking. Only specific events on site sell separate tickets.',
      },
      {
        question: 'How much does it cost to visit Princes Street Gardens?',
        answer:
          'Nothing — general entry is free. You only pay if you choose a charged attraction nearby, such as climbing the Scott Monument or visiting Edinburgh Castle.',
      },
      {
        question: 'Can I book Princes Street Gardens in advance?',
        answer:
          'A normal visit cannot and need not be booked. Book separately only for paid events or for Edinburgh Castle.',
      },
      {
        question: 'Is the Floral Clock free to see?',
        answer:
          'Yes. The Floral Clock is a free, open-air display in the West Gardens that you can view any time during opening hours.',
      },
    ],
  },

  'map-and-directions': {
    slug: 'map-and-directions',
    navLabel: 'Map & directions',
    title:
      'Princes Street Gardens Map, Entrances & Directions',
    description:
      'Where are Princes Street Gardens and how do you get there? Entrances, directions from Waverley station, tram and bus stops, parking and accessibility.',
    intro:
      'Princes Street Gardens sit in the valley between Edinburgh’s New Town (Princes Street) and Old Town (the castle rock). They are walkable from almost everywhere in the city centre. Here is how to find the entrances and get there.',
    updated: 'Last reviewed 8 October 2026',
    sections: [
      {
        heading: 'Where are the gardens?',
        paragraphs: [
          'The gardens run roughly east–west along the south side of Princes Street, below Edinburgh Castle and above Waverley station. The Mound divides the East and West Gardens and carries roads between the two halves of the city.',
        ],
      },
      {
        heading: 'Main entrances',
        bullets: [
          'From Princes Street (New Town side) — multiple ramped and stepped entrances along the length of the gardens.',
          'The Mound — central access between the East and West Gardens, step-free.',
          'Waverley station / East Princes Street — level access into the East Gardens.',
          'St Cuthbert’s churchyard — an alternative walkway into the West Gardens.',
        ],
      },
      {
        heading: 'From Waverley station',
        paragraphs: [
          'Waverley is right next to the East Gardens. Leave the station onto Princes Street or use the ramps by the Scott Monument; you are in the gardens within a couple of minutes on foot.',
        ],
      },
      {
        heading: 'By tram, bus and car',
        paragraphs: [
          'Edinburgh trams and most city buses run along Princes Street, with stops a short walk from the garden entrances. There is no parking inside the gardens; public car parks (such as those near the West End and St James) are a walk away, and the city centre is easiest to reach on foot or public transport.',
        ],
      },
      {
        heading: 'Accessibility & temporary closures',
        paragraphs: [
          'Step-free routes are available from Princes Street and The Mound. Note that the Kings Stables Road entrance is currently closed to pedestrians and vehicles — use St Cuthbert’s churchyard as an alternative way into the West Gardens.',
        ],
      },
    ],
    faq: [
      {
        question: 'How do I get to Princes Street Gardens?',
        answer:
          'The gardens are in Edinburgh city centre, along Princes Street. Walk in from Princes Street or The Mound, from Waverley station into the East Gardens, or via tram and bus stops on Princes Street.',
      },
      {
        question: 'Where is the best entrance for the castle view?',
        answer:
          'The West Gardens lawn, reached from Princes Street or The Mound, gives the classic open view up to Edinburgh Castle.',
      },
      {
        question: 'Is there parking at Princes Street Gardens?',
        answer:
          'There is no parking inside the gardens. Use city-centre public car parks and walk in, or travel by tram, bus or train to Waverley.',
      },
      {
        question: 'What is the postcode for Princes Street Gardens?',
        answer:
          'The gardens are on Princes St, Edinburgh, EH2 2HG — useful for maps and taxi drop-offs.',
      },
    ],
  },
};

export const TOPIC_SLUGS = Object.keys(topics);
