export default async function handler(req, res) {
    const NOTION_API_KEY = process.env.NOTION_API_KEY;
    const NOTION_DATABASE_ID = process.env.NOTION_DATABASE_ID;

  if (!NOTION_API_KEY || !NOTION_DATABASE_ID) {
        return res.status(500).json({ error: 'Missing environment variables' });
  }

  try {
        const response = await fetch(
                `https://api.notion.com/v1/databases/${NOTION_DATABASE_ID}/query`,
          {
                    method: 'POST',
                    headers: {
                                Authorization: `Bearer ${NOTION_API_KEY}`,
                                'Notion-Version': '2022-06-28',
                                'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                                sorts: [{ property: '\u5e74', direction: 'descending' }],
                    }),
          }
              );

      if (!response.ok) {
export default async function handler(req, res) {
        const NOTION_API_KEY = process.env.NOTION_API_KEY;
        const NOTION_DATABASE_ID = process.env.NOTION_DATABASE_ID;
    
        if (!NOTION_API_KEY || !NOTION_DATABASE_ID) {
                    return res.status(500).json({ error: 'Missing environment variables' });
        }
    
        try {
                    const response = await fetch(
                                    `https://api.notion.com/v1/databases/${NOTION_DATABASE_ID}/query`,
                        {
                                            method: 'POST',
                                            headers: {
                                                                    Authorization: `Bearer ${NOTION_API_KEY}`,
                                                                    'Notion-Version': '2022-06-28',
                                                                    'Content-Type': 'application/json',
                                            },
                                            body: JSON.stringify({
                                                                    sorts: [{ property: '\u5e74', direction: 'descending' }],
                                            }),
                        }
                                );
            
                    if (!response.ok) {
                                    const err = await response.text();
                                    return res.status(response.status).json({ error: err });
                    }
            
                    const data = await response.json();
            
                    const works = data.results.map((page, index) => {
                                    const p = page.properties;
                                    const title = p['\u540d\u524d']?.title?.[0]?.plain_text ?? '';
                                    const imageUrl = p['\u753b\u50cfURL']?.rich_text?.[0]?.plain_text ?? '';
                                    const category = p['\u30ab\u30c6\u30b4\u30ea\u30fc']?.rich_text?.[0]?.plain_text ?? '';
                                    const year = p['\u5e74']?.rich_text?.[0]?.plain_text ?? '';
                                    const description = p['\u8aac\u660e']?.rich_text?.[0]?.plain_text ?? '';
                                    const backstoryRaw = p['\u30d0\u30c3\u30af\u30b9\u30c8\u30fc\u30ea\u30fc']?.rich_text?.map(t => t.plain_text).join('') ?? '';
                                    const backstory = backstoryRaw
                                                        ? '<p>' + backstoryRaw.split('\n').filter(s => s.trim()).join('</p><p>') + '</p>'
                                                        : null;
                        
                                    const key = title
                                                        .toLowerCase()
                                                        .replace(/\s+/g, '-')
                                                        .replace(/[^\w-]/g, '') || `work-${index + 1}`;
                        
                                    return {
                                                        key,
                                                        title,
                                                        tag: [category, year].filter(Boolean).join(' \u00b7 '),
                                                        num: String(index + 1).padStart(2, '0'),
                                                        imageUrl,
                                                        year,
                                                        type: description,
                                                        client: '',
                                                        location: '',
                                                        role: '',
                                                        backstory,
                                                        photos: 0,
                                    };
                    });
            
                    res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate=300');
                    return res.status(200).json(works);
        } catch (error) {
                    return res.status(500).json({ error: error.message });
        }
}export default async function handler(req, res) {
        const NOTION_API_KEY = process.env.NOTION_API_KEY;
        const NOTION_DATABASE_ID = process.env.NOTION_DATABASE_ID;
    
        if (!NOTION_API_KEY || !NOTION_DATABASE_ID) {
                    return res.status(500).json({ error: 'Missing environment variables' });
        }
    
        try {
                    const response = await fetch(
                                    `https://api.notion.com/v1/databases/${NOTION_DATABASE_ID}/query`,
                        {
                                            method: 'POST',
                                            headers: {
                                                                    Authorization: `Bearer ${NOTION_API_KEY}`,
                                                                    'Notion-Version': '2022-06-28',
                                                                    'Content-Type': 'application/json',
                                            },
                                            body: JSON.stringify({
                                                                    sorts: [{ property: '\u5e74', direction: 'descending' }],
                                            }),
                        }
                                );
            
                    if (!response.ok) {
                                    const err = await response.text();
                                    return res.status(response.status).json({ error: err });
                    }
            
                    const data = await response.json();
            
                    const works = data.results.map((page, index) => {
                                    const p = page.properties;
                                    const title = p['\u540d\u524d']?.title?.[0]?.plain_text ?? '';
                                    const imageUrl = p['\u753b\u50cfURL']?.rich_text?.[0]?.plain_text ?? '';
                                    const category = p['\u30ab\u30c6\u30b4\u30ea\u30fc']?.rich_text?.[0]?.plain_text ?? '';
                                    const year = p['\u5e74']?.rich_text?.[0]?.plain_text ?? '';
                                    const description = p['\u8aac\u660e']?.rich_text?.[0]?.plain_text ?? '';
                                    const backstoryRaw = p['\u30d0\u30c3\u30af\u30b9\u30c8\u30fc\u30ea\u30fc']?.rich_text?.map(t => t.plain_text).join('') ?? '';
                                    const backstory = backstoryRaw
                                                        ? '<p>' + backstoryRaw.split('\n').filter(s => s.trim()).join('</p><p>') + '</p>'
                                                        : null;
                        
                                    const key = title
                                                        .toLowerCase()
                                                        .replace(/\s+/g, '-')
                                                        .replace(/[^\w-]/g, '') || `work-${index + 1}`;
                        
                                    return {
                                                        key,
                                                        title,
                                                        tag: [category, year].filter(Boolean).join(' \u00b7 '),
                                                        num: String(index + 1).padStart(2, '0'),
                                                        imageUrl,
                                                        year,
                                                        type: description,
                                                        client: '',
                                                        location: '',
                                                        role: '',
                                                        backstory,
                                                        photos: 0,
                                    };
                    });
            
                    res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate=300');
                    return res.status(200).json(works);
        } catch (error) {
                    return res.status(500).json({ error: error.message });
        }
}const err = await response.text();
              return res.status(response.status).json({ error: err });
      }

      const data = await response.json();

      const works = data.results.map((page, index) => {
              const p = page.properties;
              const title = p['\u540d\u524d']?.title?.[0]?.plain_text ?? '';
              const imageUrl = p['\u753b\u50cfURL']?.rich_text?.[0]?.plain_text ?? '';
              const category = p['\u30ab\u30c6\u30b4\u30ea\u30fc']?.rich_text?.[0]?.plain_text ?? '';
              const year = p['\u5e74']?.rich_text?.[0]?.plain_text ?? '';
              const description = p['\u8aac\u660e']?.rich_text?.[0]?.plain_text ?? '';

                                           const key = title
                .toLowerCase()
                .replace(/\s+/g, '-')
                .replace(/[^\w-]/g, '') || `work-${index + 1}`;

                                           return {
                                                     key,
                                                     title,
                                                     tag: [category, year].filter(Boolean).join(' \u00b7 '),
                                                     num: String(index + 1).padStart(2, '0'),
                                                     imageUrl,
                                                     year,
                                                     type: description,
                                                     client: '',
                                                     location: '',
                                                     role: '',
                                                     backstory: null,
                                                     photos: 0,
                                           };
      });

      res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate=300');
        return res.status(200).json(works);
  } catch (error) {
        return res.status(500).json({ error: error.message });
  }
}
